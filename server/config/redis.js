import redis from 'redis';

let redisHost, redisPort, redisKey;

if (process.env.NODE_ENV === 'production') {
  redisHost = process.env.REDIS_HOST;
  redisPort = process.env.REDIS_PORT;
  redisKey = process.env.REDIS_PASSWORD;
} else {
  redisHost = '127.0.0.1';
  redisPort = '6379';
  redisKey = '';
}

const client = redis.createClient(redisPort, redisHost, { 'auth_pass': redisKey });

export default client;