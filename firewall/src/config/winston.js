const path = require('path');

const { createLogger, format, transports } = require('winston');

const {
  combine, timestamp, label, printf, json,
} = format;

const logFormat = printf(({
  level, message, label, timestamp, stack,
}) => `${timestamp}  [${label}] ${level}: ${stack || message}`);

const logger = createLogger({
  format: format.combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    json(),
    logFormat,
  ),
  defaultMeta: { service: 'http-service' },
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json(),
        logFormat,
      ),
    }),
    new transports.File({
      filename: path.join(__dirname, '..', '..', 'logs', 'logs.log'),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 1,
    }),
  ],
});

logger.stream = {
  write(message) {
    logger.info(message, { label: 'http-service' });
  },
};

module.exports = logger;
