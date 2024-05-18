import { Command } from "./command.class";
import {Markup, Telegraf} from "telegraf";
import { IBotContext } from "../context/context.interface";
import { message } from "telegraf/filters";
import axios from "axios";
import * as fs from 'fs';
import * as path from 'path';
import {IConfigService} from "../config/config.interface";
import {IApiRequest} from "./request.interface";

interface RequestData {
    key: string,
    title: string,
    content: string,
    images: Array<string>;
}

export class CreateCommand extends Command implements IApiRequest {
    // Where data is stored, which is sent to the server to create a new post
    private requestData: RequestData;

    // A string with all the information about the post
    private summary: string = '';

    protected readonly isAdmin: boolean = true;

    readonly request: string;

    constructor(bot: Telegraf<IBotContext>, protected readonly configService: IConfigService) {
        super(bot, configService);

        // Data for api request
        this.requestData = {
            key: this.configService.get('API_KEY'),
            title: '',
            content: '',
            images: []
        }

        // The link on which the request will be query
        this.request = this.configService.get('API_BASE_URL') + '/post/create';
    }

    query(context: any): void {
        if (this.hasAccess(context)) {
            axios.post(this.request, this.requestData)
                .then(async response => {
                    // After successfully saving the post, a note that
                    // the post is saved is added to the previously sent message

                    context.editMessageText(this.summary);
                    context.reply('✅ *SAVED*', {parse_mode: 'Markdown'});

                })
                .catch(error => {
                    console.log(error);
                    context.reply('Error saving post.');
                });
        }
    }

    handle(): void {

        // Reaction to the command /create
        this.bot.command('create', async (context) => {
            // Setting the status of processing information about a new post
            context.session.state = 'WAITING_FOR_TITLE';

            // Cleaning the image array
            this.requestData.images = [];

            // Proposal to write a title
            await context.reply('Please provide the *title* of the post.', { parse_mode: 'Markdown' });
        });

        // Reaction to the command /save
        this.bot.command('save', async (context) => {
            this.finish(context);
        });

        // Reaction to text input after entering a command /create
        this.bot.on([message('text'), message('photo')], async (context) => {
            await this.input(context);
        });

        // The action to pressing the accept button to save the post in the database
        this.bot.action("confirm", (context) => this.query(context));
    }

    private async input(context: any): Promise<void> {
        // If it is waiting to store a title
        if (context.session.state === 'WAITING_FOR_TITLE') {
            await this.inputTitle(context);
        }

        // If it is waiting to store a content
        else if (context.session.state === 'WAITING_FOR_CONTENT') {
            await this.inputContent(context);
        }

        // If it is waiting to store a image
        else if (context.session.state === 'WAITING_FOR_IMAGE') {
            await this.inputImage(context);
        }
    }

    private async inputTitle(context: any): Promise<void> {
        // If the title is equal to "-", then null is stored in the data
        this.requestData.title = context.message.text === '-' ? '' : context.message.text;

        context.session.state = 'WAITING_FOR_CONTENT';

        // Proposal to write a content
        await context.reply('Please provide the *text* of the post.', {parse_mode: 'Markdown'});
    }

    private async inputContent(context: any): Promise<void> {
        // The inputted text is stored in the data for content
        this.requestData.content = context.message.text;

        context.session.state = 'WAITING_FOR_IMAGE';

        // Proposal to write a content
        await context.reply('Please provide the *image* of the post.', {parse_mode: 'Markdown'});
    }

    private async inputImage(context: any): Promise<void> {
        if (context.message.text !== '-' && this.hasAccess(context)) {

            try {
                const photos = context.message.photo;
                const largestPhoto = photos[photos.length - 1];
                const fileId = largestPhoto.file_id;

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
                    // The path by which the image will be available
                    this.requestData.images.push(`${process.env.STORAGE_LINK}/${uniqueFileName}`);

                    // Output of the entire content of the post with a button for confirmation
                    // this.finish(context);

                });
                writer.on('error', (err) => {
                    console.error('Error saving file:', err);
                });

            } catch (e) {
                console.log(e);
            }
        }

        context.reply('Want to /save ?');
        context.session.state = 'DONE';
    }

    private finish(context: any): void {
        context.session.state = 'DONE'; // All data was stored

        // Declare imageLinks variable outside the try-catch block
        let imageLinks: string[] = [];

        // Create a string with links to all images in the post
        try {
            imageLinks = this.requestData.images.map(image => {
                return `${this.configService.get('DOMAIN')}/${image}\n`;
            });
        } catch (e) {
            imageLinks = [];
        }

        this.summary = `Title: ${this.requestData.title}`
            + `\n\nContent: ${this.requestData.content}`
            + (imageLinks.length > 0 ? `\n\nIMAGES\n${imageLinks.join('')}` : '');

        // Output of previously entered data with a button to confirm it
        context.reply(
            this.summary,
            Markup.inlineKeyboard([Markup.button.callback('✅', `confirm`)])
        );
    }
}
