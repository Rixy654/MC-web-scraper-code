import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';
import websites from './data/websites.json';
import keywords from './data/keywords.json';

const app = express();
const port = process.env.PORT || 3001;
app.use(cors({ origin: true, credentials: true }));

async function scrapeUrl(website) {
  try {
  let data = [];
  const browser = await puppeteer.launch({headless: 'new'}); 
  const page = await browser.newPage();

  await page.goto(website.url);

  await page.setViewport({width: 1080, height: 1024});

  let elements = await page.$$(website.xPath);

  let linkIds = [];

  for (let i = 0; i < 20; i++) {
    const id = await(await elements[i].getProperty(website.linkSelector)).jsonValue();
    linkIds.push(id);
  }

  for (let linkId of linkIds) {
    await page.goto(website.url);
     await page.click(`#${linkId}`);
     try {
      await page.waitForSelector(website.searchSelector, { timeout: 1000 });
       let desc = await page.$(website.searchSelector);
       let descValue = await page.evaluate(d => d.textContent, desc);
       let foundKeywords = await keywords.filter(keyword =>
        descValue.toLowerCase().includes(keyword.toLowerCase())
      );
      if (foundKeywords.length) {
        await page.waitForSelector(website.titleSelector, { timeout: 1000 });
        let title = await page.$(website.titleSelector);
        let value = await page.evaluate(t => t.textContent, title);
        let url = await page.evaluate(() => document.location.href);
        data.push({
          title: value, 
          url: url,
          keywords: foundKeywords
        });
      }
     }
    catch(searchErr) {
      console.log("Login required for page");
    }
  }

  await browser.close();

  return { 
    websiteTitle: website.title,
    url: website.url,
    keywords: data
  };

  } catch (error) {
    console.error(`Error scraping ${website.url}: ${error.message}`);
    return {
      websiteTitle: website.title,
      url: website.url,
      error: error.message
    };
  }
}

app.get('/scrape', async (req, res) => {
  const results = await Promise.all(websites.map(website => scrapeUrl(website)));
  res.json(results);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
