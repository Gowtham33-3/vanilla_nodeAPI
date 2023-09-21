const requestBodyparser = require("../utils/body-parser");
const writeToFile =require("../utils/write-to-file");

module.exports= async (req,res)=>{

    const baseurl=req.url.substring(0,req.url.lastIndexOf("/")+1);
    const imdbID=req.url.split("/")[3];
    const regex =new RegExp(/^[a-z]{2}[0-9]{7}$/);

try{
    if(!regex.test(imdbID)){
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({title:"Validation",message:"Invali Id"}));
    }else if( baseurl==="/api/movies/" && regex.test(imdbID)){
        let body = await requestBodyparser(req);
         const index=req.movies.findIndex((movie)=> {
            return movie.imdbID===imdbID;
         })
        //  if(index===-1){
        //     res.writeHead(404,{"Content-Type":"application/json"});
        //     res.end(JSON.stringify({title:"not found",message:"Not Found"}));
        //  }else{
           
        //     let body = await bodyParser(req);
        //     req.movies[index]={id,...body};
        //     writeToFile(req.movies);
        //     res.writeHead(200,{"Content-Type":"application/json"});
        //     res.end(JSON.stringyfy(req.movies[index]));

        //  }
        if (index === -1) {
            res.statusCode = 404;
            res.write(
              JSON.stringify({ title: "Not Found", message: "Movie not found" })
            );
            res.end();
          } else {
            req.movies[index] = { imdbID, ...body };
            writeToFile(req.movies);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(req.movies[index]));
          }
    }

}catch(err){
    console.log(err);

}

    

    
}