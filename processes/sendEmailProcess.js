var Queue = require('bull');

var queue = Queue('domain.events.created$sendEmail');

queue.process((job, done) => {
  console.log("Sending email for job");
  done();

  queue.clean(24 * 60 * 60 * 1000); // Clean up jobs from the past day which have completed
});
