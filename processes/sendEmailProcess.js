var Queue = require('bull');

var queue = Queue('domain.events.created$sendEmail');

queue.process((job, done) => {
  console.log("Sending email for job");
  done();
});
