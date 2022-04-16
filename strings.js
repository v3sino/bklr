module.exports = {

    formaterString : `module.exports = {
        format : function(data){    
            result = "";
            
            /* change this code to have nicely parsed output html data - put all the html into the result string */
            result += "</div class=\\"0\\">" + "<h2>Output of ... </h2>"; 
            x = JSON.parse(data);
            result += "<pre>" + JSON.stringify(x,null,2) + "</pre>" + "</div>";
                
            return result;
            }        
    }`,

    scraperString : `module.exports = {
        scrape : async function(page){            
            let result = {}; 
            //insert your scraper code here...
            return(result);
            }        
    }`,

    html : `\`<!DOCTYPE html>
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
    </html>\``


}

