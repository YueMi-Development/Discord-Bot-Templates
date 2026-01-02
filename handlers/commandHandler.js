const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
const Logger = require('./logger');

class CommandHandler {
  constructor(client) {
    this.client = client;
    this.commands = new Map();
    this.logger = new Logger('CommandHandler', process.env.LOG_LEVEL || 'INFO');
  }

  /**
   * Load all commands from the commands directory
   */
  async loadCommands() {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    this.logger.info(`Loading ${commandFiles.length} command(s)...`);

    for (const file of commandFiles) {
      try {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if (!command.data || !command.execute) {
          this.logger.warn(`Command file "${file}" is missing required 'data' or 'execute' property. Skipping...`);
          continue;
        }

        this.commands.set(command.data.name, command);
        this.logger.debug(`Loaded command: ${command.data.name}`);
      } catch (error) {
        this.logger.error(`Failed to load command from "${file}"`, error);
      }
    }

    this.logger.info(`Successfully loaded ${this.commands.size} command(s).`);
  }

  /**
   * Register all loaded commands with Discord
   */
  async registerCommands() {
    const commandData = Array.from(this.commands.values()).map(cmd => cmd.data.toJSON());

    try {
      this.logger.info(`Registering ${commandData.length} command(s) with Discord...`);

      const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

      await rest.put(
        Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
        { body: commandData }
      );

      this.logger.info(`Successfully registered ${commandData.length} command(s) globally.`);
    } catch (error) {
      this.logger.error('Failed to register commands', error);
    }
  }

  /**
   * Handle command interactions
   */
  async handleInteraction(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = this.commands.get(interaction.commandName);

    if (!command) {
      this.logger.warn(`Command "${interaction.commandName}" not found.`);
      await interaction.reply({ content: 'Unknown command.', ephemeral: true });
      return;
    }

    try {
      this.logger.debug(`Executing command: ${interaction.commandName} by ${interaction.user.tag}`);
      await command.execute(interaction);
    } catch (error) {
      this.logger.error(`Error executing command "${interaction.commandName}"`, error);
      const errorMessage = { content: 'There was an error executing this command.', ephemeral: true };
      
      if (interaction.replied) {
        await interaction.followUp(errorMessage);
      } else if (interaction.deferred) {
        await interaction.editReply(errorMessage);
      } else {
        await interaction.reply(errorMessage);
      }
    }
  }

  /**
   * Get a command by name
   */
  getCommand(name) {
    return this.commands.get(name);
  }

  /**
   * Get all commands
   */
  getAllCommands() {
    return Array.from(this.commands.values());
  }
}

module.exports = CommandHandler;
