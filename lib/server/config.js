var env = process.env;

module.exports = {
  app: {
    environment: env.NODE_ENV || "development",
    port: env.PORT
  },

  redis: {
    url: env.REDISCLOUD_URL ? env.REDISCLOUD_URL : "localhost:6379"
  },

  mongodb: {
    url: env.MONGODB_URI ? env.MONGODB_URI : "mongodb://localhost:27017/",
    setting: env.MONGODB_URI ? { w : 1} : { safe: true },
    dbName: env.MONGODB_URI ? "" : env.DBNAME || "api-test"
  }
};
