import {Context} from "telegraf";

export interface SessionData {
    content: string;
    title: string;
    state: string;
    like: boolean;
}

export interface IBotContext extends Context {
    session: SessionData;
}