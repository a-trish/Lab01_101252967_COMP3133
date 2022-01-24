const cv = require('csv-parser')
const fs = require('fs')
const inputs = [];


//Parse csv file
fs.createReadStream('input_countries.csv')
    .on('error', (err) => {
        console.log (`Error : ${err}`)
    })
    .pipe(cv())
    .on('data', (data) => {
        inputs.push(data) 
    })

    .on('end', function () {
        const header = ["country,year,population"];
        const Canada = [];
        const USA = [];
        
        //Filter data of Canada and USA
        inputs.forEach((input) => {
            if (input.country == "Canada")
                Canada.push(`${input.country},${input.year},${input.population}`)
            if (input.country == "United States")
                USA.push(`${input.country},${input.year},${input.population}`);
        });
            
        // Write the data of Canada into canada.txt
        fs.writeFile("canada.txt", header.concat(Canada).join("\n"), (err) => {
            if (err) {
                console.log("Error writing to canada.txt file", err);
            }else {
                console. log('Data for Canada is saved as canada.txt');
            }
        });
        
        //Write the data of United States into usa.txt
        fs.writeFile("usa.txt", header.concat(USA).join('\n'), (err) => {
            if (err) {
                console.log("Error writing to usa.txt file", err);
            } else {
                console.log('Data for USA is saved as usa.txt');
            }
        });
      })
    
    //Delete canada.txt file if it exists
    fs.unlink('canada.txt', (err) => {
        if(err){
            console.log(err)
            return
        }
        console.log("canada.txt file is deleted")
    })

    //Delete usa.txt file if it exists
    fs.unlink('usa.txt', (err) => {
        if(err){
            console.log(err)
            return
        }
        console.log("usa.txt file is deleted")
    })


    