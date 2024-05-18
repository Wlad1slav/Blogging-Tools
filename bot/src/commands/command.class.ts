import {Telegraf} from "telegraf";
import {IBotContext} from "../context/context.interface";
import {IConfigService} from "../config/config.interface";

export abstract class Command {
    protected readonly isAdmin: boolean = false;

    protected constructor(public bot: Telegraf<IBotContext>, protected readonly configService: IConfigService) {}

    protected hasAccess(context: any): boolean {
        if (this.isAdmin) {
            if (context.from.username !== this.configService.get('BOT_ACCESS')) {
                context.reply('You do not have access to this command.');
                return false;
            }
        }
        return true;
    }

    abstract handle(): void;
}