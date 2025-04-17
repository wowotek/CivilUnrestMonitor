import { relations, type InferSelectModel } from "drizzle-orm";
import { int, varchar, decimal, mysqlTable, datetime, text, boolean } from "drizzle-orm/mysql-core";


export type TUser = InferSelectModel<typeof user>;
export type TTopic = InferSelectModel<typeof topic>;
export type TChat = InferSelectModel<typeof chat>;
export type TVote = InferSelectModel<typeof vote>;
export type TNews = InferSelectModel<typeof news>;

export const tblDef_default = {
    id: int().autoincrement().primaryKey(),
    created_at: datetime().notNull().$default(() => new Date()),
    updated_at: datetime().notNull().$default(() => new Date()),
    deleted_at: datetime(),
    is_deleted: boolean().$default(() => false),
};

export const tblDef_user = {
    ...tblDef_default,
    username: varchar({ length: 255 }).unique().notNull(),
    password: varchar({ length: 255 }).notNull(),
    is_admin: boolean().$default(() => false),
};

export const tblDef_userSession = {
    ...tblDef_default,
    user_id: int().notNull().references(() => user.id),
    token: varchar({ length: 255 }).notNull().$default(() => {
        const uuid = Bun.randomUUIDv7();
        const rs = String(Math.random() * 1000000) + String(Math.random() * 1000000) + String(Math.random() * 1000000) + randomString + String(new Date()) + String(new Date().getTime());
        
        const sha = new Bun.SHA256();
        sha.update(uuid + rs);

        const token = sha.digest("hex");
        return token;
    }),
    expires_at: datetime().notNull().$default(() => {
        const created = new Date();
        created.setDate(created.getDate() + 14);
        return created;
    }),
    is_expired: boolean().$default(() => false),
}

export const tblDef_topic = {
    ...tblDef_default,
    title: varchar({ length: 255 }).notNull(),
    vote_aligned_count: int({ unsigned: true}).$default(() => 0),
    vote_opposed_count: int({ unsigned: true}).$default(() => 0),
};

// {
//     user_id: 1,
//     topic_id: 1,
//     is_on_aligned: true,
//     message: "I don't agree with @supporter88, I think we should do this instead.",
//     embeds: [
//         {
//             type: "user.username",
//             value: "supporter88"
//         }
//     ]
// }
// TODO: implement this in version 2 or something
export const tblDef_chat = {
    ...tblDef_default,
    user_id: int().notNull().references(() => user.id),
    topic_id: int().notNull().references(() => topic.id),
    is_on_aligned: boolean().$default(() => true),
    message: text().notNull(),
};

export const tblDef_vote = {
    ...tblDef_default,
    user_id: int().notNull().references(() => user.id),
    topic_id: int().notNull().references(() => topic.id),
    is_aligned: boolean().notNull(),
};

export const tblDef_news = {
    ...tblDef_default,
    topic_id: int().notNull().references(() => topic.id),
    title: varchar({ length: 255 }).notNull(),
    content: text().notNull(),
    category: varchar({ length: 255 }).notNull(),
    is_published: boolean().$default(() => false),
};

export const user = mysqlTable('user', tblDef_user);
export const userSession = mysqlTable('user_session', tblDef_userSession);
export const topic = mysqlTable('topic', tblDef_topic);
export const chat = mysqlTable('chat', tblDef_chat);
export const vote = mysqlTable('vote', tblDef_vote);
export const news = mysqlTable('news', tblDef_news);

export const relation_userToX = relations(user, ({ one, many }) => ({
    chat: many(chat),
    vote: many(vote),
    userSession: many(userSession)
}));

export const relation_userSessionToX = relations(userSession, ({ one, many }) => ({
    user: one(user, { fields: [userSession.user_id], references: [user.id] })
}));

export const relation_topicToX = relations(topic, ({ one, many }) => ({
    chat: many(chat),
    vote: many(vote),
    news: many(news)
}));

export const relation_chatToX = relations(chat, ({ one, many }) => ({
    user: one(user, { fields: [chat.user_id], references: [user.id] }),
    topic: one(topic, { fields: [chat.topic_id], references: [topic.id] })
}));

export const relation_voteToX = relations(vote, ({ one, many }) => ({
    user: one(user, { fields: [vote.user_id], references: [user.id] }),
    topic: one(topic, { fields: [vote.topic_id], references: [topic.id] }),
}));

export const relation_newsToX = relations(news, ({ one, many }) => ({
    topic: one(topic, { fields: [news.topic_id], references: [topic.id] }),
}));