import {Command} from "./command.class";
import {Markup, Telegraf} from "telegraf";
import {IBotContext} from "../context/context.interface";

export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.start((context) => {
            console.log(context.session);
            context.reply("Welcome", Markup.inlineKeyboard([
                Markup.button.callback("!!!", "like"),
                Markup.button.callback("???", "dislike"),
            ]));
        });

        this.bot.action("like", (context) => {
            context.session.like = true;
            context.editMessageText('Cool');
        });

        this.bot.action("dislike", (context) => {
            context.session.like = false;
            context.editMessageText('Not Cool');
        });
    }

}