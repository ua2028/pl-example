const sleep = require('await-sleep')
const { expect } = require('@playwright/test')

class sideBar {
  constructor(page) {
    this.page = page
  }

  sidebarOptionLiSelector = `.sidebar ul li >> visible=true`;
  sidebarActiveLiSelector = `.sidebar ul li.active >> visible=true`;

  async listSideBarOptions(){
    return await this.page.$$(this.sidebarOptionLiSelector);
  }

  async returnLi(option){
    let sidebarOptionSelector = `.sidebar ul li:has-text("${option}") >> visible=true`;
    return li = await this.page.$(sidebarOptionSelector);
  }

  async returnActiveLi(){
    return await this.page.$(this.sidebarActiveLiSelector);
  }

  async clickSidebarOption(option){
    console.log(`Click sidebar option for '${option}'`);
    let sidebarOptionSelector = `.sidebar ul li:has-text("${option}") >> visible=true`;
    await this.page.waitForSelector(sidebarOptionSelector, {timeout:30000});
    let li = await this.page.locator(sidebarOptionSelector);
    await li.click();
  }

  async assertSidebarOptionIsSelected(option){
    console.log(`Assert side bar option with text '${option}' is selected`);
    let sidebarOptionSelector = `.sidebar ul li:has-text("${option}") >> visible=true`;
    await this.page.waitForSelector(sidebarOptionSelector, {timeout:30000});
    let li = await this.page.locator(sidebarOptionSelector);
    console.log("Expect li to have class of 'active'")
    expect(li).toHaveClass("active")
  }

  async assertSelectedSidebarOptionHrefMatchesUrl(option){
    console.log(`Assert current url has href for selected sidebar option with text '${option}'`);
    let sidebarOptionSelector = `.sidebar ul li a:has-text("${option}") >> visible=true`;
    await this.page.waitForSelector(sidebarOptionSelector, {timeout:30000});
    let li = await this.page.locator(sidebarOptionSelector);
    let href = await li.getAttribute("href");
    console.log(`Expect current url to contain href of: ${href}`)
    await expect(this.page).toHaveURL(new RegExp(href));
  }
}

module.exports = sideBar

