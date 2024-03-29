const log = (module.exports = {})
const log4js = require('log4js')
const utils = require('./utils')

log4js.configure({
  appenders: {
    err: {
      type: 'stderr',
      layout: {
        type: 'pattern',
        pattern: '%[%d %p %c%] %x{plain}%x{schema}',
        tokens: {
          plain: (logEvent) => logEvent.data[0],
          schema: (logEvent) => {
            if (!logEvent.data[1]) {
              return ''
            }
            return '\n' + utils.inspector(logEvent.data[1])
          },
        },
      },
    },
  },
  categories: {
    default: {
      appenders: ['err'],
      level: 'ERROR',
    },
  },
})

const logger = log4js.getLogger()

// Allow log level to be changed in development
logger.level = process.env.LOG_LEVEL || 'info'

log.logger = logger
