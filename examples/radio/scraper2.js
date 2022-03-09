module.exports = {
    scrape : async function(page){            
        let result = {}; 
        //insert your clicker and scraper code here...
        let rows = await page.evaluate(() => Array.from(document.querySelectorAll('#energy tr')).map( (row) => row.innerText ));
        let row = rows[2].split('\t');
        result[0] = 'Crude Oil;'+ row[3] + ';' + row[8];
        rows = await page.evaluate(() => Array.from(document.querySelectorAll('#metals tr')).map( (row) => row.innerText ));
        row = rows[1].split('\t');
        result[1] = 'Gold;'+ row[3] + ';' + row[8];
        row = rows[2].split('\t');
        result[2] = 'Silver;'+ row[3] + ';' + row[8];

        return(result);
        }        
}