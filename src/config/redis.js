const {createClient} =  require('redis');

const redisClient = createClient({
    username: 'default',
    password:  process.env.PASSWORD,
    socket: {
        host: 'income-trick-sound-97273.db.redis.io',
        port: 15795
    }
});

module.exports = redisClient ; 