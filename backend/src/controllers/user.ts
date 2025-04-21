import { and, eq } from 'drizzle-orm';
import DBC from '../database';

import * as Schema from "../database/schemas";


export async function getUserByUsername(
    username: string,
    includeDeleted: boolean = false
) {
    const user = await DBC.select()
        .from(Schema.user)
        .where(
            includeDeleted ?
                eq(Schema.user.username, username) :
                and(
                    eq(Schema.user.username, username),
                    eq(Schema.user.is_deleted, false)
                )
        )
        .limit(1)
        .catch(err => {
            throw err;
        });
    

    return user.length > 0 ? user[0] : null;
}

export async function getUserById(
    id: number
) {
    const user = await DBC.select()
        .from(Schema.user)
        .where(
            eq(Schema.user.id, id)
        )
        .limit(1)
        .catch(err => {
            throw err;
        });

    return user.length > 0 ? user[0] : null;
}

export async function createUser(
    username: string,
    password: string,
    isAdmin: boolean
) {
    // check if username exist
    const userExist = await getUserByUsername(username);
    
    if (userExist) {
        throw new Error("Username already exist");
    }

    const user = await DBC.insert(Schema.user)
        .values({
            username,
            password,
            is_admin: isAdmin,
        })
        .$returningId()
        .then(async ids => await getUserById(ids[0].id))
        .catch(err => {
            throw err;
        });
    
    return user;
};

