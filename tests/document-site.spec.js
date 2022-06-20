const tb = require("../base/test-base");
const sleep = require("await-sleep");
const { expect } = require("@playwright/test");

tb.test.describe("document site", () => {

  tb.test.beforeEach(async ({useBrowserNoTearDown}) => {
    console.log("Load main page");
    await tb.goToPage('mainPage');
  });

  tb.test.afterEach(async ({ closeContext }) => {
    console.log("Close context");
  });


  for (const pageData of tb.data.pages) {

    tb.test(`Navigate to page in sidebar: ${pageData.sidebarTitle}`, async ({ sideBar }) => {

      console.log("Click side bar option");
      await tb.sideBar.clickSidebarOption(pageData.sidebarTitle);

      console.log("Assert side bar option is selected");
      await tb.sideBar.assertSidebarOptionIsSelected(pageData.sidebarTitle);

      console.log("Assert sidebar option href matches url");
      await tb.sideBar.assertSelectedSidebarOptionHrefMatchesUrl(pageData.sidebarTitle)
    }); 

    tb.test(`Check search and select for ${pageData.sidebarTitle}`, async ({ search, sideBar }) => {

      console.log("Fill in search input");
      await tb.search.fillInSearch(pageData.sidebarTitle);

      console.log("Select search option from dropdown");
      await tb.search.clickSearchOption(pageData.sidebarTitle);
      
      console.log("Assert side bar option is selected");
      await tb.sideBar.assertSidebarOptionIsSelected(pageData.sidebarTitle);
      
      console.log("Assert sidebar option href matches url");
      await tb.sideBar.assertSelectedSidebarOptionHrefMatchesUrl(pageData.sidebarTitle)
    });
  }

  tb.test("Navigate from first page to last one by arrows", async ({ sideBar, documentContainer }) => {

    for (let i = 0; i < tb.data.pages.length; i++){

      console.log("Get current page data");
      let pages = await getPrevCurrentNextPages(tb.data.pages, i)

      console.log("Assert page is selected in sidebar");
      await tb.sideBar.assertSidebarOptionIsSelected(pages.current.sidebarTitle);

      console.log("Assert current URL match the current HREF of current selected page");
      await tb.sideBar.assertSelectedSidebarOptionHrefMatchesUrl(pages.current.sidebarTitle);
      
      console.log("Assert document H1 matches");
      await tb.documentContainer.assertDocumentTitleMatches(pages.current)

      console.log("Assert previous arrow has correct data");
      await tb.documentContainer.assertPreviousArrowData(pages.prev);

      console.log("Assert next arrow has correct data");
      let nextArrow = await tb.documentContainer.assertNextArrowData(pages.next);

      if (nextArrow){
        console.log("Click arrow for next page");
        await nextArrow.click()
        console.log("After click arrow for next page");
      }

      console.log("Wait 500 millisecond for page to load (as arrow disappears)")
      await sleep(500);
    };
  });
})


// helpers
async function getPrevCurrentNextPages(pages, i){
  let currentPageData = pages[i];

  console.log("Get next page data, if it is the last one value is set to undefined")
  let nextPageData = undefined;
  if (i==pages.length){
    console.log("Current page, if it is the last page there would be no next page data");
  }else{
    nextPageData = pages[i+1];
  };
  
  console.log("Get previous page data, if no previous data set it to undefined");
  let previousPageData = undefined;
  if (i > 0){
    previousPageData = pages[i-1];
  };
  return {"current": currentPageData, "next": nextPageData, "prev": previousPageData} 
}