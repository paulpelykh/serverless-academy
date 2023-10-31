import { getForecast } from '../utils/getForecast.js';

export const messagesHandler = async (bot, chatId, text) => {
  const town = 'Lviv';

  try {
    if (text === '/start') {
      bot.sendMessage(chatId, 'Welcome', {
        'reply_markup': {
          'keyboard': [['Forecast']],
        },
      });
    } else if (text === 'Forecast') {
      bot.sendMessage(chatId, 'Select interval ', {
        'reply_markup': {
          'keyboard': [['at intervals of 3 hours', 'at intervals of 6 hours']],
        },
      });
    } else if (text === 'at intervals of 3 hours') {
      // send message every 3 hours
      setInterval(async () => {
        const temp = await getForecast(town);
        bot.sendMessage(chatId, temp);
      }, 1000 * 60 * 180);
    } else if (text === 'at intervals of 6 hours') {
      // send message every 6 hours
      setInterval(async () => {
        const temp = await getForecast(town);
        bot.sendMessage(chatId, temp);
      }, 1000 * 60 * 360);
    } else {
      bot.sendMessage(chatId, 'Sorry, I did not understand');
    }
  } catch (error) {
    console.log('Error during message handling', error);
  }
};
