import { and, desc, eq, gte, or } from 'drizzle-orm';
import DBC from '../database';

import * as Schema from "../database/schemas";
import { APIError, DBError } from '../__basic';
import { getUserByUsername } from './user';


async function newToken(randomString: string = "") {
    
}

const SESSIONS = new Array<{user_id: number, token: string, expires_at: Date}>();
const SESSION_USER_ID_INDEX = new Map<number, number>();
const SESSION_USERNAME_INDEX = new Map<string, number>();
const SESSION_TOKENS_INDEX = new Map<string, number>();

export async function getSessionByUserId(user_id: number) {
    const __current_date = new Date();
    const __cache = SESSION_USER_ID_INDEX.get(user_id);
    if (__cache) {
        if (SESSIONS[__cache].expires_at < __current_date) {
            return null;
        }
        return SESSIONS[__cache];
    }

    const session = await DBC.select()
        .from(Schema.userSession)
        .where(
            and(
                eq(Schema.userSession.user_id, user_id),
                or(
                    gte(Schema.userSession.expires_at, __current_date),
                    eq(Schema.userSession.is_expired, false)
                )
            )
        )
        .orderBy(desc(Schema.userSession.created_at))
        .limit(1)
        .then(sessions => sessions.length > 0 ? sessions[0] : null)
        .catch((err: Error) => {
            throw new DBError("select_user_session", err.message);
        });

    if (!session) {
        throw new APIError("invalid_session", "");
    }

    return {
        user_id: session.user_id,
        token: session.token,
        expires_at: session.expires_at
    };
}

export async function login(
    username: string,
    password: string
) {
    const user = await getUserByUsername(username);
    if (!user) {
        throw new APIError("invalid_username", "");
    }

    const isMatch = await Bun.password.verify(password, user.password);
    if (!isMatch) {
        throw new APIError("invalid_password", "");
    }

    const created = new Date();
    created.setDate(created.getDate() + 14);

    const newSession = await DBC.insert(Schema.userSession)
        .values({
            user_id: user.id,
            token: await newToken()
        });


}