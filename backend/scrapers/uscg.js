const axios = require('axios');
const cheerio = require('cheerio');
const crypto = require('crypto');

async function scrapeUSCG() {
  console.log("Scraping USCG...");
  const url = 'https://www.dco.uscg.mil/';
  const response = await axios.get(url, { 
    timeout: 15000,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const $ = cheerio.load(response.data);
  
  const articles = [];
  
  // Find article links
  const links = [];
  // USCG DCO portal has a very specific structure.
  $('a').each((i, el) => {
    if (links.length >= 5) return;
    const title = $(el).text().replace(/\s+/g, ' ').trim();
    let href = $(el).attr('href');
    
    if (title && title.length > 15 && href && href.length > 10 && !href.startsWith('#') && 
        !href.toLowerCase().match(/(login|search|about|contact|member|committee|statistic|report|category|google|map|download|pdf|mailto:|list)/) &&
        href.toLowerCase().match(/(news|press|media|article|post|update|release|campaign|cic|\d{4}\/\d{2}|pages|content|publication)/)) {
      
      let fullUrl = href;
      if (!href.startsWith('http')) {
        const domainMatch = url.match(/https?:\/\/[^\/]+/);
        const domain = domainMatch ? domainMatch[0] : '';
        fullUrl = domain + (href.startsWith('/') ? '' : '/') + href;
      }
      
      if (!links.find(l => l.url === fullUrl)) {
        links.push({ title, url: fullUrl });
      }
    }
  });

  if (links.length === 0) {
    throw new Error("No articles found on USCG index page.");
  }

  // Fetch full text for each link
  for (const link of links) {
    try {
      let fullText = "";
      const artRes = await axios.get(link.url, { 
        timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      
        if (artRes.headers['content-type'] && artRes.headers['content-type'].includes('application/pdf')) {
          fullText = "This article is a PDF document. Please click the 'Visit Official Portal' link to view the original file.";
        } else {
          const art$ = cheerio.load(artRes.data);
      // Remove junk tags to clean up the text payload
        art$('script, style, nav, header, footer, noscript, iframe, svg, img, form, .sidebar, .menu, .nav, .footer, .header').remove();
        
        fullText = art$('article').text() || art$('main').text() || art$('.content').text() || art$('.entry-content').text() || art$('.field-type-text-with-summary').text();
        
        if (!fullText || fullText.trim().length < 50) {
          fullText = art$('body').text();
        }
        
        fullText = fullText.replace(/\s+/g, ' ').trim();
        
        if (!fullText || fullText.length < 50) { fullText = "Could not extract full text for this article."; }
        }

      const id = 'uscg-' + crypto.createHash('md5').update(link.title).digest('hex').substring(0, 8);
      articles.push({
        id,
        title: link.title,
        source: "USCG",
        category: "Security",
        convention: "USCG",
        impact: "High",
        publishDate: new Date().toISOString().split('T')[0],
        implementationDate: new Date().toISOString().split('T')[0],
        sourceUrl: link.url,
        fullText: fullText.substring(0, 5000)
      });
    } catch (e) {
      console.error(`Failed to fetch full text for USCG article ${link.url}`, e.message);
    }
  }

  return articles;
}

module.exports = { scrapeUSCG };
