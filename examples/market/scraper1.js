module.exports = {
    scrape : async function(page){            
        let result = {}; 
        //insert your clicker and scraper code here...
        const rows = await page.evaluate(() => Array.from(document.querySelectorAll('#resultsTable tr')).map( (row) => row.innerText ));
        let row = rows[1].split('\t');
        result[0] = 'Apple;'+ row[4] + ';' + row[5];
        row = rows[2].split('\t');
        result[1] = 'Microsoft;'+ row[4] + ';' + row[5];
        row = rows[6].split('\t');
        result[2] = 'Tesla;'+ row[4] + ';' + row[5];

        return(result);
        }        
}