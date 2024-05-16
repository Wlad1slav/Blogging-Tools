import { Command } from "./command.class";
import {Context, Markup, Telegraf} from "telegraf";
import { IBotContext } from "../context/context.interface";
import { message } from "telegraf/filters";
import axios from "axios";
import * as fs from 'fs';
import * as path from 'path';
import {IConfigService} from "../config/config.interface";
import {strict} from "assert";

interface RequestData {
    key: string,
    title: string,
    content: string,
    images: Array<string>;
}

export class CreateCommand extends Command {
    // Where data is stored, which is sent to the server to create a new post
    private requestData: RequestData;

    // A string with all the information about the post
    private summary: string = '';

    constructor(bot: Telegraf<IBotContext>, private readonly configService: IConfigService) {
        super(bot);

        // Data for api request
        this.requestData = {
            key: this.configService.get('API_KEY'),
            title: '',
            content: '',
            images: []
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
        this.bot.on([message('text'), message('photo')], async (context) => {
            await this.input(context);
        });

        // The action to pressing the accept button to save the post in the database
        this.bot.action("confirm", (context) => {
            axios.post(this.configService.get('API_BASE_URL') + '/post/create', this.requestData)
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

    private async input(context: any): Promise<void> {
        // If it is waiting to store a title
        if (context.session.state === 'WAITING_FOR_TITLE') {

            // If the title is equal to "-", then null is stored in the data
            this.requestData.title = context.message.text === '-' ? '' : context.message.text;

            context.session.state = 'WAITING_FOR_CONTENT';

            // Proposal to write a content
            await context.reply('Please provide the *text* of the post.', {parse_mode: 'Markdown'});
        }

        // If it is waiting to store a content
        else if (context.session.state === 'WAITING_FOR_CONTENT') {

            // The inputted text is stored in the data for content
            this.requestData.content = context.message.text;

            context.session.state = 'WAITING_FOR_IMAGE';

            // Proposal to write a content
            await context.reply('Please provide the *image* of the post.', {parse_mode: 'Markdown'});
        }

        else if (context.session.state === 'WAITING_FOR_IMAGE') {

            const photos = context.message.photo;
            const largestPhoto = photos[photos.length - 1];
            const fileId = largestPhoto.file_id;

            try {
                // Get the URL to download the file
                const fileUrl = await context.telegram.getFileLink(fileId);

                // Setting a unique path to save the file
                const uniqueFileName = `${fileId}_${Date.now()}.webp`;

                // Setting the path to save the file
                const filePath = path.join(this.configService.get('STORAGE_DIRECTORY'), uniqueFileName);

                // Downloading a file
                const response = await axios({
                    url: fileUrl.href,
                    method: 'GET',
                    responseType: 'stream'
                });

                // Save the file
                const writer = fs.createWriteStream(filePath);
                response.data.pipe(writer);

                // Waiting for the file to finish writing
                writer.on('finish', async () => {
                    console.log('Файл збережено:', filePath);

                    // The path by which the image will be available
                    this.requestData.images.push(`${process.env.STORAGE_LINK}/${uniqueFileName}`);

                    if (context.session.state !== 'DONE') {
                        // Output of the entire content of the post with a button for confirmation
                        this.finish(context);
                    }

                    context.session.state = 'DONE'; // All data was stored
                });
                writer.on('error', (err) => {
                    console.error('Помилка при збереженні файлу:', err);
                });

            } catch (e) {
                console.log(e);
            }


        }

    }

    private finish(context: any) {

        this.summary = `*Title:* ${this.requestData.title}\n\n*Content:* ${this.requestData.content}\n\n${this.configService.get('DOMAIN')}/${this.requestData.images[0]}`;

        // Output of previously entered data with a button to confirm it
        context.reply(
            this.summary,
            Markup.inlineKeyboard([Markup.button.callback('✅', `confirm`)])
        );
    }
}
