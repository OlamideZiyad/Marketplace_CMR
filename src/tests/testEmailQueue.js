const emailQueue = require("../queues/email.queue");

(async () => {
  await emailQueue.add("orderPaid", {
    email: "client@email.com",
    orderId: 123,
  });

  console.log("Test job added to emailQueue");
  process.exit(0);
})();
