var NRP = require('node-redis-pubsub');

var config = {
    url: process.env.REDIS_URL
};

var nrp = new NRP(config);

setInterval(() => {
  nrp.emit('domain.events.created', {
    eventName : 'domain.events.created'
  });
}, 5000);
