module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/nodetdd',
  tokenSecret: process.TOKEN_SECRET || 'secret',
  port: process.env.port || '3000'
}
