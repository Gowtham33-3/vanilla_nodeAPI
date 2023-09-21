
const random = require('random-string-alphanumeric-generator');
const requestBodyParser= require("../utils/body-parser");
const writeToFile = require("../utils/write-to-file");
module.exports= async (req,res)=>{
    if(req.url==="/api/movies"){
        try{
            let body = await requestBodyParser(req)
            body.imdbID=random.randomLetters(2,"lowercase")+random.randomNumber(7);
            req.movies.push(body);
            writeToFile(req.movies);
            res.writeHead(201,{"Content-type":"application/json",});
            res.end()  
        }catch(err){
            console.log(err);
            res.writeHead(400,{"Content-Type":"application/json"});
            res.end(JSON.stringify({title:"Validation failed",message:"Request body is not valid"}))         
        }
    }
}