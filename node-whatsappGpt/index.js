import { create } from 'venom-bot'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai"

dotenv.config()

create({
    session: 'Whatsapp-Bot-GPT',
    multidevice: true
})
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });

const configuration = new Configuration({
    organization: process.env.ORGANIZATION_ID,
    apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const getDavinciResponse = async (clientText) => {
    const options = {
        model: "text-davinci-003", 
        prompt: clientText, 
        temperature: 1, 
        max_tokens: 4000 
    }

    try {
        const response = await openai.createCompletion(options)
        let botResponse = ""
        response.data.choices.forEach(({ text }) => {
            botResponse += text
        })
        return `From GPT 🤖:\n ${botResponse.trim()}`
    } catch (e) {
        return `Error: ${e.response.data.error.message}`
    }
}

const getDalleResponse = async (clientText) => {
    const options = {
        prompt: clientText, 
        n: 1, 
        size: "1024x1024", 
    }

    try {
        const response = await openai.createImage(options);
        return response.data.data[0].url
    } catch (e) {
        return `Error: ${e.response.data.error.message}`
    }
}

const commands = (client, message) => {
    const iaCommands = {
        davinci3: "/bot",
        dalle: "/img"
    }

    let firstWord = message.text.substring(0, message.text.indexOf(" "));

    switch (firstWord) {
        case iaCommands.davinci3:
            const question = message.text.substring(message.text.indexOf(" "));
            getDavinciResponse(question).then((response) => {
                client.sendText(message.from === process.env.BOT_NUMBER ? message.to : message.from, response)
            })
            break;

        case iaCommands.dalle:
            const imgDescription = message.text.substring(message.text.indexOf(" "));
            getDalleResponse(imgDescription, message).then((imgUrl) => {
                client.sendImage(
                    message.from === process.env.BOT_NUMBER ? message.to : message.from,
                    imgUrl,
                    imgDescription,
                    'From IA DALL-E 🤖'
                )
            })
            break;
    }
}

async function start(client) {
    client.onAnyMessage((message) => commands(client, message));
}