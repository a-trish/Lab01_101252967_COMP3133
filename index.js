// Create node project name Lab01_ StudentID_COMP3133
// Add required modules to the project
// npm install --save csv-parser

// Download given input_countries.csv file to read data and perform following task
// Delete canada.txt and usa.txt if already exist using fs module 
// Filter data of Canada and write data to canada.txt
// Filter data of United States and write data to usa.txt


// Submission

// Upload the ZIP file and screenshot showing your source code and output
// Also Provide your GitHub link in the comment

// Sample Output of canada.txt file
// country,year,population
// canada,1985,23456778
// canada,1986,23457589
// ...

// const fs = require('fs')

// var readStream = fs.createReadStream('input_countries.csv')
// console.log("START_1")
// fs.readFile('input_countries.csv',(err,data) => {
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log(data.toString())
// })

// console.log("END_1")

// //Delete File
// fs.unlink('canada.txt.txt', (err) => {
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log("File Deleted")
// })

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


    