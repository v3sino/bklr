module.exports = {
    format : function(data){    
        result = "";
        
        /* change this code to have nicely parsed output html data - put all the html into the result string */
        result += "</div class=\"Stocks\">" + "<h2>Stocks</h2>"; 
        x = JSON.parse(data);
        result += "<table><tr><th>Stock</th><th>Price</th><th>24H Change</th></tr>";
        for(let i=0; i < 3; i++){
            let row = x[i].split(';');
            if(row[2][0] != '-') row[2] = '+'+row[1];
            result += "<tr><td>"+row[0]+"</td><td>"+row[1]+"</td><td>"+row[2]+"%</td></tr>";
        }
        result += "</table>";
        result += "</div>";
            
        return result;
        }        
}