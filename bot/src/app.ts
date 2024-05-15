import {ConfigService} from "./config/config.service";
import {IConfigService} from "./config/config.interface";
import {IBotContext} from "./context/context.interface";
import {Command} from "./commands/command.class";
import {StartCommand} from "./commands/start.command";

import {Telegraf} from "telegraf";
import LocalSession from "telegraf-session-local";
import {PostsCommand} from "./commands/posts.command";
import {CreateCommand} from "./commands/create.command";

class Bot {
    bot: Telegraf<IBotContext>;
    commands: Command[] = [];

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'));
        this.bot.use((new LocalSession({ database: "sessions.json" })).middleware());
    }

    init() {
        this.commands = [
            new StartCommand(this.bot),
            new PostsCommand(this.bot, this.configService.get('API_BASE_URL') + '/posts'),
            new CreateCommand(this.bot, this.configService.get('API_BASE_URL') + '/post/create', '-')
        ];
        for (const command of this.commands) {
            command.handle();
        }
        this.bot.launch();
    }
}

const bot = new Bot(new ConfigService());
bot.init()
