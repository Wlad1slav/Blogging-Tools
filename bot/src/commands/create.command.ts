import { Command } from "./command.class";
import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { message } from "telegraf/filters";
import axios from "axios";

interface RequestData {
    key: string,
    title: string,
    content: string
}

export class CreateCommand extends Command {
    // A request to the API, through which the post will be created
    private readonly request: string;

    // Where data is stored, which is sent to the server to create a new post
    private requestData: RequestData;

    // A string with all the information about the post
    private summary: string = '';

    constructor(bot: Telegraf<IBotContext>, request: string, apiKey: string) {
        super(bot);

        // Api request
        this.request = request;

        // Data for api request
        this.requestData = {
            key: apiKey,
            title: '',
            content: ''
        }
    }

    handle(): void {

        // Reaction to the command /create
        this.bot.command('create', async (context) => {
            // Setting the status of processing information about a new post
            context.session.state = 'WAITING_FOR_TITLE';

            // Proposal to write a title
            await context.reply('Please provide the *title* of the post.', { parse_mode: 'Markdown' });
        });

        // Reaction to text input after entering a command /create
        this.bot.on(message('text'), async (context) => {

            // If it is waiting to store a title
            if (context.session.state === 'WAITING_FOR_TITLE') {
                // The inputted text is stored in the session
                context.session.title = context.message.text;

                // If the title is equal to "-", then null is stored in the data
                this.requestData.title = context.message.text === '-' ? '' : context.message.text;

                context.session.state = 'WAITING_FOR_CONTENT';

                // Proposal to write a content
                await context.reply('Please provide the *text* of the post.', { parse_mode: 'Markdown' });
            }

            // If it is waiting to store a content
            else if (context.session.state === 'WAITING_FOR_CONTENT') {
                // The inputted text is stored in the session
                context.session.content = context.message.text;

                // The inputted text is stored in the data for content
                this.requestData.content = context.message.text;

                context.session.state = 'DONE'; // All data was stored

                this.summary = `*Title:* ${this.requestData.title}\n\n*Content:* ${this.requestData.content}`;

                // Output of previously entered data with a button to confirm it
                await context.reply(
                    this.summary,
                    Markup.inlineKeyboard([Markup.button.callback('✅', `confirm`)])
                );
            }
        });

        // The action to pressing the accept button to save the post in the database
        this.bot.action("confirm", (context) => {
            axios.post(this.request, this.requestData)
                .then(async response => {
                    // After successfully saving the post, a note that
                    // the post is saved is added to the previously sent message
                    context.editMessageText(this.summary + '\n\n\n✅ *SAVED*', { parse_mode: 'Markdown' });
                })
                .catch(error => {
                    console.log(error);
                    context.reply('Error saving post.');
                });
        });
    }
}
