const { Worker } = require("bullmq");
const redis = require("../config/redis");

console.log("📡 Email worker started and waiting for jobs...");


new Worker(
  "emailQueue",
  async (job) => {
    console.log("Sending email to:", job.data.email);
    console.log("Payload:", job.data);
  },
  { connection: redis }
);
