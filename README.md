# Discord Bot Templates

A simple Discord bot template using Node.js.

---

## Requirements

- Node.js
- npm
- Discord bot token

---

## Installation

```bash
npm install
````

---

## Configuration

1. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set your bot token:

   ```env
	DISCORD_TOKEN=your_bot_token_here
	DISCORD_CLIENT_ID=your_client_id_here
	LOG_LEVEL=INFO
   ```

---

## Run the Bot

```bash
npm start
```

---

## Notes

* Do not commit your `.env` file
* Make sure the bot has the required intents enabled in Discord Developer Portal
