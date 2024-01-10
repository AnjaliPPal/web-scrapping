const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/scrape', async (req, res) => {
  try {
    const asin = req.body.asin;
    const amazonURL = `https://www.amazon.ae/gp/product/${asin}`;

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(amazonURL, { waitUntil: 'domcontentloaded' });
 

    const html = await page.content();

    const $ = cheerio.load(html); // Load the HTML into Cheerio for easy manipulation

    const price = $('.a-offscreen').text().trim();
    const title = $('span #aod-offer-shipsFrom ').text().trim();
    const seller = $('#aod-offer-shipsFrom .a-size-small.a-color-tertiary').text().trim();
    const link = $('#aod-offer-heading a.a-size-small.a-link-normal').attr('href');

    const scrapedData = { title, price, seller, link };



    

    await browser.close();
 // Create a new workbook and worksheet
 const workbook = new exceljs.Workbook();
 const worksheet = workbook.addWorksheet('ScrapedData');

 // Add headers to the worksheet
 worksheet.columns = [
   { header: 'Title', key: 'title', width: 30 },
   { header: 'Price', key: 'price', width: 15 },
   { header: 'Description', key: 'description', width: 50 },
   { header: 'Link', key: 'link', width: 50 },
 ];

 // Add scraped data to the worksheet
 scrapedData.forEach((data) => {
   worksheet.addRow(data);
 });

 // Set response headers for downloading the Excel file
 res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
 res.setHeader('Content-Disposition', 'attachment; filename=scraped_data.xlsx');

//  Write the Excel file to the response
     await workbook.xlsx.write(res);
    

    console.log("scrapedData", scrapedData);
    res.json({ scrapedData });
  } catch (error) {
    console.error('Scraping failed:', error.stack);
    res.status(500).json({ error: 'Scraping failed' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});













