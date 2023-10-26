# CLI: TELEGRAM CONSOLE SENDER

> Note: `before runnning change TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID values in app.js.`

```js
const TELEGRAM_BOT_TOKEN = 'your telegram bot token';
const TELEGRAM_CHAT_ID = 'your telegram chat id';
```

# Run

```js
node app.js <commands>
```

## Commands

```js
send-message|m <message>
```

Send a message to Telegram Bot

```js
send-photo|p <path>
```

Send a photo to Telegram Bot. Just drag and drop it console after p-flag.

```js
help[command];
```

display help for command

# Help

```js
node app.js --help
```
