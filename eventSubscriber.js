var Queue = require('bull');
var _ = require('lodash');

var queue = Queue('domain.events');

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

queue.process((job, done) => {
  console.log(`Event received event on 'domain.events'`);

  var event = job.data;

  // Get registrations
  var eventRegistrations = _.filter(registrations, (a) =>{
    return a.eventName == event.eventName;
  });
  console.log(`There are ${eventRegistrations.length} listeners for this event.`)

  for (var index in eventRegistrations) {
    var registration = eventRegistrations[index];

    console.log(`Publishing received event to ${registration.queueName}`);

    var queue = Queue(registration.queueName);
    queue.add(event);
    queue.close();
  }

  done();
});
