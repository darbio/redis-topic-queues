var Queue = require('bull');

var queue = Queue('domain.events.created$sendSms');

queue.process((job, done) => {
  console.log("Sending SMS for job");
  done();
});
