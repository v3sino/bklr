# prerekvizity
-node - testovane na verzii 10 a 16.14.0<br>
-npm - testovane na 8.3.1<br>
-puppeteer - testovana verzia 13.3.2<br>
```
npm i puppeteer
``` 
# nasadenie
```
node init.js
```
postupovat podla terminal promptu - zadat meno projektu a url stranky/stranok na scrapovanie<br>
**testovaci priklad:**
```
https://www.flashscore.sk/;https://www.rtvs.sk/
```
vznikne adresar s nazvom projektu - vstupit dovnutra<br>
potrebne dopisat scraper funkcie - subory scraper0.js, scraper1.js, ... (podla toho kolko stranok scrapujeme)<br>
optional - zmenit formater funkcie - subory formater0.js, ... (ak nebudu zmenene bude na vystupe nenaformatovany json)<br>

**testovaci priklad:**<br>
(subor scraper0.js - flashscore)
```
const teams = await page.evaluate(() => Array.from(document.querySelectorAll("div.event__participant")).map( (team) => team.innerText )); 
const scores = await page.evaluate(() => Array.from(document.querySelectorAll("div.event__score")).map( (team) => team.innerText ));
for (let i=0; i<10; i+=2){
  result[i/2] = teams[i] + '   ' + scores[i] + ':' + scores[i+1] + '   ' + teams[i+1];
}
```
(subor scraper1.js - rtvs)
```
const results = await page.evaluate(() => Array.from(document.querySelectorAll("div.media__body > h6")).map( (res) => res.innerText ));
result["jednotka"] = {}; result["dvojka"] = {}; result["sport"] = {};
result["jednotka"]["teraz"] = results[0];
result["jednotka"]["nasleduje"] = results[1];
result["dvojka"]["teraz"] = results[2].slice(5,-5);
result["dvojka"]["nasleduje"] = results[3].slice(5,-5);
result["sport"]["teraz"] = results[6].slice(5,-5);
result["sport"]["nasleduje"] = results[7].slice(5,-5);
```
(subor formater0.js - flashscore - optional)
```
result += "</div class=\"0\">" + "<h2>Flashscore - first 5 results</h2>"; 
data = JSON.parse(data);
for(let i=0; i<5; i++){
    let teams = data[i].split('   ');
    result += "<p style=\"font-size: 20px;\">";
    if(parseInt(teams[1][0]) > parseInt(teams[1][2])){
        result += "<span style=\"background-color:#B2FF33 ;\">"+teams[0]+"</span> "+teams[1]+" "+teams[2];
    }
    else if(parseInt(teams[1][0]) < parseInt(teams[1][2])){
        result += teams[0]+" "+teams[1]+" <span style=\"background-color:#B2FF33 ;\">"+teams[2]+"</span>";
    }
    else{
        result += data[i];
    }
    result += "</p>";
}
result +="</div>";
```
(subor formater1.js - rtvs - optional)
```
result += "</div class=\"1\">" + "<h2 style=\"margin-top: 100px\">Program RTVS</h2>"; 
data = JSON.parse(data);
result += "<table style=\"font-size: 30px;border: 1px solid black;width:50%;margin-left: auto;margin-right: auto;\"><tr><th style=\"background-color:#FF0000;\">Kanál</th><th style=\"background-color:#FF0000;\">Teraz</th><th style=\"background-color:#FF0000;\">Nasleduje</th></tr>";
result += "<tr><td style=\"border: 1px solid black;\">Jednotka</td><td style=\"border: 1px solid black;\">"+data["jednotka"]["teraz"]+"</td><td style=\"border: 1px solid black;\">"+data["jednotka"]["nasleduje"]+"</td></tr>";
result += "<tr><td style=\"border: 1px solid black;\">Dvojka</td><td style=\"border: 1px solid black;\">"+data["dvojka"]["teraz"]+"</td><td style=\"border: 1px solid black;\">"+data["dvojka"]["nasleduje"]+"</td></tr>";
result += "<tr><td style=\"border: 1px solid black;\">Sport</td><td style=\"border: 1px solid black;\">"+data["sport"]["teraz"]+"</td><td style=\"border: 1px solid black;\">"+data["sport"]["nasleduje"]+"</td></tr></table>";
result +="</div>";
```
nasledne uz len vnutri v adresari "projektu" spustit main
```
node main.js
```
terminal nechat bezat - na localhost:8080 by mal byt vysledok<br>
data sa refreshuju kazdu hodinu - asi dorobim aby to bolo nastavitelne - pripadne to staci prepisat v setInterval() funkcii v main.js<br>
zistil som ze na eve to nasadit nepojde - chromium nepodporuje freebsd tj. nefunguje tam puppeteer<br>
***update:*** funkcny refresh button, bolo to lahsie nez som cakal<br>
jednoduchy sposob ako projekt "nasadit" z localhostu aj na internet je napriklad localtunnel:
```
npm install -g localtunnel
lt --port 8080
```
