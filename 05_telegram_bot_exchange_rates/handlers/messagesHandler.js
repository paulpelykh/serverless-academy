import { getExchangeRate } from '../utils/getExchangeRate.js';

export const messagesHandler = async (bot, chatId, text) => {
  try {
    if (text === '/start') {
      bot.sendMessage(chatId, 'Welcome', {
        'reply_markup': {
          'keyboard': [['Exchange rates']],
        },
      });
    } else if (text === 'Exchange rates') {
      bot.sendMessage(chatId, 'Choose currency', {
        'reply_markup': {
          'keyboard': [['USD', 'EUR']],
        },
      });
    } else if (text === 'USD' || text === 'EUR') {
      const rates = await getExchangeRate(text);
      bot.sendMessage(
        chatId,
        `Monobank ${text}\nBuy: ${rates.mono.buy} UAH\nSell: ${rates.mono.sell} UAH`
      );
      bot.sendMessage(
        chatId,
        `Privatbank ${text}\nBuy : ${rates.privat.buy} UAH\nSell: ${rates.privat.sell} UAH`
      );
    } else {
      bot.sendMessage(chatId, 'Sorry, I did not understand');
    }
  } catch (error) {
    console.log('Error during message handling', error);
  }
};
