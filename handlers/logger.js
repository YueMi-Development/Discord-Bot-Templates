const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

const logLevels = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

class Logger {
  constructor(name, level = 'INFO') {
    this.name = name;
    this.level = logLevels[level] || logLevels.INFO;
    this.logsDir = path.join(__dirname, '../logs');

    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }

    this.logFile = path.join(this.logsDir, `${new Date().toISOString().split('T')[0]}.log`);
  }

  /**
   * Get formatted timestamp
   */
  getTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Write to log file
   */
  writeToFile(level, message) {
    const timestamp = this.getTimestamp();
    const logEntry = `[${timestamp}] [${level}] [${this.name}] ${message}\n`;
    
    try {
      fs.appendFileSync(this.logFile, logEntry);
    } catch (error) {
      console.error('Failed to write to log file:', error.message);
    }
  }

  /**
   * Format console output with colors
   */
  formatConsoleOutput(level, message, levelNum) {
    const timestamp = this.getTimestamp();
    const levelColors = {
      ERROR: colors.red,
      WARN: colors.yellow,
      INFO: colors.green,
      DEBUG: colors.cyan,
    };

    const color = levelColors[level] || colors.reset;
    return `${colors.gray}[${timestamp}]${colors.reset} ${color}[${level}]${colors.reset} ${color}[${this.name}]${colors.reset} ${message}`;
  }

  /**
   * Log error
   */
  error(message, error = null) {
    if (this.level >= logLevels.ERROR) {
      const fullMessage = error ? `${message} | ${error.message}` : message;
      console.error(this.formatConsoleOutput('ERROR', fullMessage, logLevels.ERROR));
      this.writeToFile('ERROR', fullMessage);
    }
  }

  /**
   * Log warning
   */
  warn(message) {
    if (this.level >= logLevels.WARN) {
      console.warn(this.formatConsoleOutput('WARN', message, logLevels.WARN));
      this.writeToFile('WARN', message);
    }
  }

  /**
   * Log info
   */
  info(message) {
    if (this.level >= logLevels.INFO) {
      console.log(this.formatConsoleOutput('INFO', message, logLevels.INFO));
      this.writeToFile('INFO', message);
    }
  }

  /**
   * Log debug
   */
  debug(message) {
    if (this.level >= logLevels.DEBUG) {
      console.debug(this.formatConsoleOutput('DEBUG', message, logLevels.DEBUG));
      this.writeToFile('DEBUG', message);
    }
  }

  /**
   * Set log level
   */
  setLevel(level) {
    this.level = logLevels[level] || logLevels.INFO;
  }
}

module.exports = Logger;
