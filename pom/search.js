const sleep = require('await-sleep')
const { expect } = require('@playwright/test')

class search {
  constructor(page) {
    this.page = page
  }

  searchInputSelector = '[type="search"]';

  async fillInSearch(search) {
    console.log("Fill in search with: ",search);
    await this.page.waitForSelector(this.searchInputSelector, {timeout: 6000});
    await this.page.fill(this.searchInputSelector, search);
  }

  async clickSearchOption(option){
    console.log(`Click option for '${option}' in search dropdown`);
    let dropdownOptionSelector = `.nextra-search ul li:has-text("${option}")`;
    console.log("dropdownOptionSelector: ",dropdownOptionSelector);
    await this.page.waitForSelector(dropdownOptionSelector, {timeout:30000});
    let li = await this.page.$(dropdownOptionSelector);
    await li.click();
  }
}

module.exports = search

