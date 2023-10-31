import TelegramBot from 'node-telegram-bot-api';
import { messagesHandler } from './handlers/handleMessages.js';

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('polling_error', (error) => {
  console.log(error);
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  await messagesHandler(bot, chatId, text);
});
