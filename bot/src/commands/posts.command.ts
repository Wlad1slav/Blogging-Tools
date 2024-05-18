import {Command} from "./command.class";
import {Markup, Telegraf} from "telegraf";
import {IBotContext} from "../context/context.interface";
import axios from "axios";
import {IConfigService} from "../config/config.interface";
import {IApiRequest} from "./request.interface";

interface Post {
    id: number;
    created_at: string;
    title: string;
    text: string;
    images: Array<string>;
}

export class PostsCommand extends Command implements IApiRequest {
    private posts: any;
    readonly request: string;

    constructor(bot: Telegraf<IBotContext>, protected readonly configService: IConfigService) {
        super(bot, configService);
        this.request = this.configService.get('API_BASE_URL') + '/posts';
    }

    query(context: any): void {
        // Database query
        axios.get(this.request)
            .then(async response => {

                // Receiving all posts in the form of an array of objects
                this.posts = response.data;

                // An array with buttons to display a specific post
                let markups: Array<ReturnType<typeof Markup.button.callback>> = [];

                for (const post of this.posts) {
                    // Creating an array with all posts
                    markups.push(Markup.button.callback(`(${post.id.toString()}) ${new Date(post.created_at).toLocaleString()}`, `post_${post.id}`));
                }

                // Sending posts
                context.reply('All posts 🙋‍♀️', Markup.inlineKeyboard(markups));
            })
            .catch(() => {
                context.reply('Error fetching posts.');
            });
    }

    handle(): void {
        this.bot.command('posts', (context) => this.query(context));

        this.bot.action(/post_(\d+)/, (context) => {
            // A function for outputting a specific post
            // The action is triggered when one of the buttons is clicked,
            // each of which contains the id of the post that is called

            const postId = context.match[1];
            const post = this.posts.find((p: Post) => p.id.toString() === postId);

            if (post) {
                // All information about the post
                let reply: string = `💡 *Post ID:* ${post.id}\n\n`;
                reply += `🗓 *Date:* ${new Date(post.created_at).toLocaleString()}\n\n`;
                reply += post.title ? `📌 *Title:* ${post.title}\n\n` : '';
                reply += `📖 *CONTENT*\n${post.text}\n\n`;
                reply += post.images ? `🖼 *Images:* ${post.images}` : '';

                context.reply(reply, {parse_mode: 'Markdown'});
            } else {
                context.reply('Post not found.');
            }
        });

    }

}