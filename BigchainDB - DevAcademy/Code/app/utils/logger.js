'use strict'

const winston = require('winston')

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/err-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: false
    })
  ],
  exitOnError: false
})

module.exports = logger

module.exports.stream = {
  write: function (message, encoding) {
    logger.info(message)
  }
}
