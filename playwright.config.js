const config = {
  timeout: 60000,
  globalTimeout: 60000,
  testDir: "./tests",
  use: { 
    retries: 1,
    headless: true
   }
};

module.exports = config;
