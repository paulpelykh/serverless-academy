const TelegramBot = require('node-telegram-bot-api');
const { Command } = require('commander');
const fs = require('fs');

process.noDeprecation = true;

const program = new Command();

// before runnning change TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID values
const TELEGRAM_BOT_TOKEN = 'your telegram bot token';
const TELEGRAM_CHAT_ID = 'your telegram chat id';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

program
  .command('send-message <message>')
  .alias('m')
  .description('Send a message to Telegram Bot')
  .action(async (message) => {
    try {
      await bot.sendMessage(TELEGRAM_CHAT_ID, message);
      process.exit(0);
    } catch (error) {
      console.log('Erorr sending message', error);
    }
  });

program
  .command('send-photo <path>')
  .alias('p')
  .description(
    'Send a photo to Telegram Bot. Just drag and drop it console after p-flag.'
  )
  .action(async (path) => {
    try {
      const photo = fs.readFileSync(path);
      await bot.sendPhoto(TELEGRAM_CHAT_ID, photo);
      process.exit(0);
    } catch (error) {
      console.log('Error sending photo', error);
    }
  });

program.parse();
