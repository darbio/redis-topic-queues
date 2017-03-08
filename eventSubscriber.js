var NRP = require('node-redis-pubsub');
var Queue = require('bull');
var _ = require('lodash');

var config = {
    url: process.env.REDIS_URL
};

var nrp = new NRP(config);

var registrations = [
  {
    eventName: 'domain.events.created',
    queueName: 'domain.events.created$sendEmail'
  },
  {
    eventName: 'domain.events.created',
    queueName: 'domain.events.created$sendSms'
  }
];

nrp.on('domain.events.*', function(data, channel) {
  console.log(`Event received event on ${channel}`);

  // Get registrations
  var eventRegistrations = _.filter(registrations, (a) =>{
    return a.eventName == channel;
  });
  console.log(`There are ${eventRegistrations.length} listeners for this event.`)

  for (var index in eventRegistrations) {
    var registration = eventRegistrations[index];

    console.log(`Publishing received event to ${registration.queueName}`);

    var queue = Queue(registration.queueName);
    queue.add(data);
    queue.close();
  }
});
