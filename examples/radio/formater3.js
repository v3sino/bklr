module.exports = {
    format : function(data){    
        result = "";
        
        /* change this code to have nicely parsed output html data - put all the html into the result string */
        result += "<div class=\"Crypto\">" + "<h2>Cryptocurrencies</h2>"; 
        x = JSON.parse(data);
        result += "<table><tr><th>Crypto</th><th>Price</th><th>24H Change</th></tr>";
        for(let i=0; i < 3; i++){
            let row = x[i].split(';');
            result += "<tr><td>"+row[0]+"</td><td>"+row[1]+"</td><td>"+row[2]+"</td></tr>";
        }
        result += "</table>";
        result += "</div>";

        //css for all the tables
        result += "<style> body{background-color: cyan;} table{border: 1px solid black; width: 25%;margin-left: 20px;}";
        result+= "th{background-color: #FF0000; margin-left: 40px;} td{border: 1px solid black; padding-left: 4px;padding-right: 4px;} </style>";
            
        return result;
        }        
}