import { Hono } from 'hono';
import z from 'zod';
import { zValidator } from '@hono/zod-validator'
import * as Controllers from '../controllers';


const route_v1 = new Hono();


route_v1.post(
    '/user', 
    zValidator('json',z.object({
        username: z.string(),
        password: z.string(),
    })),
    async c => {
        const { username, password } = c.req.valid("json");
        const user = await Controllers.createUser(username, password, false);

        //@ts-ignore
        delete user.password;

        return c.json(user, 201);
    }
);

route_v1.post(
    "/login",
    zValidator('json', z.object({
        username: z.string(),
        password: z.string(),
    })),
    async c => {
        const { username, password } = c.req.valid("json");
        const user = await Controllers.login(username, password);

        //@ts-ignore
        delete user.password;

        return c.json(user);
    }
)