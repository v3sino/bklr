module.exports = {
    scrape : async function(page){            
        let result = {}; 
        
        const rows = await page.$$eval('[data-test="price-row"]', (rows)  => rows.map( (row) => row.innerText ));
        let row = rows[1].split('\t');
        result[0] ='S&P 500;' + row[2] + ';' + row[6];
        row = rows[2].split('\t');
        result[1] = 'Nasdaq;' + row[2] + ';' + row[6];
        row = rows[11].split('\t');
        result[2] = 'Euro Stoxx 50;' + row[2] + ';' + row[6];

        return(result);
        }        
}
