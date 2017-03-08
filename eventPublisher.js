var Queue = require('bull');

var queue = Queue('domain.events');

setInterval(() => {
  queue.add({
    eventName : 'domain.events.created'
  });
}, 5000);
