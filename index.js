require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const CommandHandler = require('./handlers/commandHandler');
const Logger = require('./handlers/logger');

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds] 
});

const logger = new Logger('Bot', process.env.LOG_LEVEL || 'INFO');
const commandHandler = new CommandHandler(client);

client.once('clientReady', async () => {
  logger.info(`Bot logged in as ${client.user.tag}`);
  
  await commandHandler.loadCommands();
  await commandHandler.registerCommands();
});

client.on('interactionCreate', async interaction => {
  await commandHandler.handleInteraction(interaction);
});

client.login(process.env.DISCORD_TOKEN);