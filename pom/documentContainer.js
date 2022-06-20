const sleep = require('await-sleep')
const { expect } = require('@playwright/test')

class documentContainer {
  constructor(page) {
    this.page = page
  }

  docContainer = '.docs-container';
  arrowsSelector = 'a[title] >> visible=true';
  classForRotate = 'svg[class*="rotate-180"]';



  async getArrows(){
    let arrows = {"prev": undefined,"next": undefined}
    let arrowsElems = await this.page.$$(this.arrowsSelector);
    for (let index in arrowsElems){
      let arrowElem = arrowsElems[index];
      let arrowElemText = await arrowElem.innerText()
      let gotRotate = await arrowElem.$$(this.classForRotate);
      let booli = gotRotate.length > 0;
      if (gotRotate.length > 0){
        arrows.prev = arrowElem
      }else{
        arrows.next = arrowElem
      };
    };
    return arrows
  }

  async assertNextArrowExist(){
    let arrows = await this.getArrows()
    console.log("Assert next arrow exist");
    await expect(arrows.next, "Expected arrow to next page to exist but it does not").not.toEqual(undefined);
  }

  async assertPrevArrowExist(){
    let arrows = await this.getArrows()
    console.log("Assert previous arrow exist");
    await expect(arrows.prev, "Expected arrow to previous page to exist but it does not").not.toEqual(undefined);
  }

  async getPreviousArrow(){
    let arrows = await this.getArrows();
    return arrows.prev;
  }

  async getNextArrow(){
    let arrows = await this.getArrows();
    return arrows.next;
  }

  async getArrowByTitle(title){
    let arrow = await this.page.$(`a[title="${title}"]`);
    return arrow
  }

  async assertDocumentTitleMatches(pageData){
    let h1Elem = await this.page.$(`${this.docContainer} h1`);
    let h1ElemText = await h1Elem.innerText();
    console.log(`Assert H1 text matches expected title of '${pageData.titleH1}'`)
    expect(h1ElemText).toEqual(pageData.titleH1);
  }

  async assertPreviousArrowData(previousPageData){
    if (previousPageData){
      await this.assertPrevArrowExist()

      console.log("Get previous arrow element");
      let prevArrow = await this.getPreviousArrow();

      console.log(`Assert arrow for previous page match correct text of: ${previousPageData.sidebarTitle}`);
      let prevArrowText = await prevArrow.innerText();
      expect(prevArrowText).toEqual(previousPageData.sidebarTitle);
    };    
  }

 async assertNextArrowData(nextPageData){
    if (nextPageData){
      await this.assertNextArrowExist()

      console.log("Get previous arrow element");
      let nextArrow = await this.getNextArrow();

      console.log(`Assert arrow for next page match correct text of: ${nextPageData.sidebarTitle}`);
      let nextArrowText = await nextArrow.innerText();
      expect(nextArrowText).toEqual(nextPageData.sidebarTitle);
      return await this.getNextArrow();
    }else{
      return undefined
    }
  }  
}

module.exports = documentContainer

