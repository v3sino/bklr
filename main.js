const formaterString = `module.exports = {
    format : function(data){    
        result = "";
        
        /* change this code to have nicely parsed output html data - put all the html into the result string */
        result += "</div class=\\"0\\">" + "<h2>Output of ... </h2>"; 
        x = JSON.parse(data);
        result += "<pre>" + JSON.stringify(x,null,2) + "</pre>" + "</div>";
            
        return result;
        }        
}`;
const scraperString = `module.exports = {
    scrape : async function(page){            
        let result = {}; 
        //insert your clicker and scraper code here...
        return(result);
        }        
}`;
const html = `\`<!DOCTYPE html>
<title>Scraper project</title>
<meta name="viewport" content="width=device-width,initial-scale=1" charset="utf-8">
<body>
<form action="" method="post">
<button name="refresh" value="refresh" onclick="rfrsh()">Refresh</button>
</form>
<div class="data">
 \${formatedData}
</div>
</body>
<script>
if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}
function rfrsh(){
    document.getElementsByName('refresh')[0].innerHTML = 'Wait';
    document.getElementsByName('refresh')[0].style.opacity = 0.3;
}
</script>
</html>\``;

const readline = require('readline');
const fs = require('fs');
const { exit } = require('process');

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
            fs.appendFileSync('./'+name+'/scraper'+x+'.js' ,scraperString, function(err) { if(err) { return console.log(err); } });
            fs.appendFileSync('./'+name+'/formater'+x+'.js' ,formaterString, function(err) { if(err) { return console.log(err); } });
            fs.appendFileSync('./'+name+'/results/result'+x+'.json' ,'{}', function(err) { if(err) { return console.log(err); } });
        }
        const mainString = `
        const fs = require('fs');
        
        function scrape(){ 
        require('child_process').execSync('node '+__dirname+'/runner.js');
        
        //put the data into index.html
        
        const url = '${url}';
        const urls = url.split(';');
        let data = {};
        let formatedData = "";
        for(const i in urls){
            data[i] = fs.readFileSync(__dirname+'/results/result'+i+'.json', 'utf8');
            let formater = require('./formater'+i+'.js');
            formatedData += formater.format(data[i]);
        }
        
        const html = ${html};
        
        fs.writeFile(__dirname+'/index.html', html, (err) => { if (err) { return console.log(err); } });
        }
        
        scrape();
        setInterval(scrape,60*60*1000); //refresh every hour
        
        //run html on localhost
        var http = require('http');
        const PORT=8080; 
        http.createServer(function(request, response) {
            if (request.method === 'POST') {    //post request means user wants a force refresh
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
        }).listen(8080);

        console.log('Project is running on http://localhost:8080');
        `;
        const runnerString = `const puppeteer = require('puppeteer');
const url = '${url}';
const urls = url.split(';');
const fs = require('fs');
(async() => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  for(const i in urls){
    await Promise.all([
      page.goto(urls[i]),
      page.waitForNavigation({ waitUntil: 'networkidle0' })
    ]);
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

        console.log('Project created :)');
        r1.close();
    });
});

