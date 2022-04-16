const readline = require('readline');
const fs = require('fs');
const { exit } = require('process');
const strings = require('./strings.js');

r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  
r1.question('Hello, insert the name of your project: ', name => {

    if (fs.existsSync('./'+name)){
        console.log('Project with this name already exists!');
        exit(1);
    }
    else{
        fs.mkdirSync('./'+name);
        fs.mkdirSync('./'+name+'/results');
    }
    
    r1.question('\nInsert one or more URL(s) that you want to scrape\nDivide them with semicolon and no spaces:\n', url => {
        let urls = url.split(';');
        let len = urls.length;
        
        for(const x in urls){
            fs.appendFileSync('./'+name+'/url.txt' ,x+': '+urls[x]+'\n', function(err) { if(err) { return console.log(err); } });
            fs.appendFileSync('./'+name+'/scraper'+x+'.js' ,strings.scraperString, function(err) { if(err) { return console.log(err); } });
            fs.appendFileSync('./'+name+'/formater'+x+'.js' ,strings.formaterString, function(err) { if(err) { return console.log(err); } });
            fs.appendFileSync('./'+name+'/results/result'+x+'.json' ,'{}', function(err) { if(err) { return console.log(err); } });
        }
        const mainString = `const fs = require('fs');
        
function scrape(){ 
    require('child_process').execSync('node '+__dirname+'/runner.js');
    const url = '${url}';
    const urls = url.split(';');
    let data = {};
    let formatedData = "";
    for(const i in urls){
        data[i] = fs.readFileSync(__dirname+'/results/result'+i+'.json', 'utf8');
        let formater = require('./formater'+i+'.js');
        formatedData += formater.format(data[i]);
    }
    const html = ${strings.html};
    fs.writeFile(__dirname+'/index.html', html, (err) => { if (err) { return console.log(err); } });
}

scrape();
setInterval(scrape,60*60*1000); 
        
var http = require('http');
const PORT=8080; 
http.createServer(function(request, response) {
    if (request.method === 'POST') {    //user forcing refresh
        console.log("refresh requested");
        scrape();
        fs.readFile('index.html', function(err, html) {
            response.writeHeader(200, {"Content-Type": "text/html"});  
            response.write(html);  
            response.end();  
        });
    }
    else{
        fs.readFile('index.html', function(err, html) {
            response.writeHeader(200, {"Content-Type": "text/html"});  
            response.write(html);  
            response.end();  
        });
    }
}).listen(PORT);
console.log('Project is running on http://localhost:'+PORT);`;

        const runnerString = `const puppeteer = require('puppeteer');
const url = '${url}';
const urls = url.split(';');
const fs = require('fs');
(async() => {
  const browser = await puppeteer.launch({defaultViewport: {width: 1000, height: 1000}, headless: true });
  const page = await browser.newPage();
  for(const i in urls){
    await Promise.all([
        page.goto(urls[i]),
        page.waitForNavigation({ waitUntil: 'networkidle0' })
    ]);
    await page.waitForTimeout(1000);
    let scraper = require('./scraper'+i+'.js');
    let result = await scraper.scrape(page);
    json = JSON.stringify(result);
    fs.writeFile(__dirname+'/results/result'+i+'.json', json, (err) => { if (err) { return console.log(err); } });
  }
  await browser.close();
})();
`;

        fs.appendFileSync('./'+name+'/runner.js' ,runnerString, function(err) { if(err) { return console.log(err); } });
        fs.appendFileSync('./'+name+'/main.js' ,mainString, function(err) { if(err) { return console.log(err); } });

        console.log('\nProject created :)');
        r1.close();
    });
});

