module.exports = {
    format : function(data){    
        result = "";
        
        /* change this code to have nicely parsed output html data - put all the html into the result string */
        result += "<div class=\"Comodities\">" + "<h2>Comodities</h2>"; 
        x = JSON.parse(data);
        result += "<table><tr><th>Comodity</th><th>Price</th><th>24H Change</th></tr>";
        for(let i=0; i < 3; i++){
            let row = x[i].split(';');
            result += "<tr><td>"+row[0]+"</td><td>"+row[1]+"</td><td>"+row[2]+"</td></tr>";
        }
        result += "</table>";
        result += "</div>";
            
        return result;
        }        
}
