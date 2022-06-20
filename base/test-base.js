require("dotenv").config();
const base = require("@playwright/test");
const playwright = require('playwright');
const { expect } = require("@playwright/test");
const sleep = require("await-sleep");

// data
const urls = require("../data/urls.js");
const data = require("../data/data.js");

// pages & components
const search = require("../pom/search");
const sideBar = require("../pom/sideBar");
const documentContainer = require("../pom/documentContainer");

class TestBase {

  constructor() {
    this.baseUrls = urls;
    this.data = data;
    
    console.log("Test enviroment: ",process.env.STAGE);
    if (process.env.STAGE){
      this.stage = process.env.STAGE;      
    }else{
      this.stage = "production";
    };
  };

  test = base.test.extend({
    testSetUp: [
      async ({}, use, testInfo) => {
        this.testTile = testInfo.title;
        console.log(`RUNNING TEST WITH NAME: ${this.testTile}`);
        await use();
      },
      { auto: true },
    ],

    useBrowserNoTearDown: async ({ }, use, testInfo) => {
      console.log("Running test: ", testInfo.title);
      await this.launch_browser();
      await use();
    },

    closeContext: async ({ },use, testInfo) =>{
      await use();
      console.log("tear down");

      const escapedTestTitle = this.testTile.replace(/[^a-zA-Z ]/g, "");
      if (testInfo.status == "failed"){
      } 
      console.log("----> CLOSE CONTEXT <----");
      await this.context.close();
    },

    search: async({}, use) =>{
      this.search = new search(this.page);      
      await use();
    },

    sideBar: async({}, use) =>{
      this.sideBar = new sideBar(this.page);      
      await use();
    },

    documentContainer: async({}, use) =>{
      this.documentContainer = new documentContainer(this.page);      
      await use();
    },
  });

  async launch_browser() {
      let contextParams = {
        viewport: {width: 1880, height: 1000},
        locale: 'en-GB'
      };
    this.browser = await playwright.chromium.launch({headless: process.env.HEADLESS ? true: false});
    this.context = await this.browser.newContext(contextParams);
    this.page = await this.context.newPage();
  }
  
  async goToPage(urlName, page){
    // use page if you are not using default page. e.g.: new tab
    let usePage;
    if (page){
      usePage = page;
    }else{
      usePage = this.page;
    }
    console.log(`Go to page: ${urlName}, stage: ${this.stage}`)
    let baseUrl = this.baseUrls[this.stage][urlName];
    console.log("this.stage: ",this.stage);
    console.log("Navigate to page: ",baseUrl);
    return usePage.goto(baseUrl);
  }

  async sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = new TestBase();
