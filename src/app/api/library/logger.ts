import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

// Crear el logger con configuración común
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug', // Nivel según entorno
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      ({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`,
    ),
  ),
})

// Configuración específica por entorno
if (process.env.NODE_ENV === 'production') {
  // En producción, rotar logs en archivo y no saturar la consola
  logger.add(
    new DailyRotateFile({
      dirname: 'logs',
      filename: 'app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d', // Mantener los últimos 30 días
    }),
  )
} else {
  // En desarrollo, mostrar logs en la consola
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Colores para mejor visibilidad
        winston.format.simple(), // Formato simple para la consola
      ),
    }),
  )
}

export default logger
