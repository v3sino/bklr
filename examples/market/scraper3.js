module.exports = {
    scrape : async function(page){            
        let result = {}; 
        //insert your clicker and scraper code here...
        let rows = await page.evaluate(() => Array.from(document.querySelectorAll('#crypto_currencies_189 tr')).map( (row) => row.innerText ));
        let row = rows[1].split('\t');
        result[0] = 'Bitcoin;'+ row[3] + ';' + row[7];
        rows = await page.evaluate(() => Array.from(document.querySelectorAll('#crypto_currencies_195 tr')).map( (row) => row.innerText ));
        row = rows[1].split('\t');
        result[1] = 'Ethereum;'+ row[3] + ';' + row[7];
        rows = await page.evaluate(() => Array.from(document.querySelectorAll('#crypto_currencies_1995 tr')).map( (row) => row.innerText ));
        row = rows[1].split('\t');
        result[2] = 'Solana;'+ row[3] + ';' + row[7];

        return(result);
        }        
}