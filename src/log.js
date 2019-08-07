const log = module.exports = {}

const log4js = require('log4js')

log4js.configure({
  appenders: { err: { type: 'stderr' } },
  categories: { default: { appenders: ['err'], level: 'ERROR' } }
})

const logger = log4js.getLogger()

// Allow log level to be changed in development
logger.level = process.env.LOG_LEVEL || 'info'

log.logger = logger
