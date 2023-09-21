const writeToFile = require("../utils/write-to-file");

module.exports=(req,res)=>{
    const baseurl= req.url.substring(0,req.url.lastIndexOf("/")+1);
    const id=req.url.split("/")[3];
    const regex = new RegExp(/^[a-z]{2}[0-9]{7}$/);
    console.log(id);
    try{
        if(!regex.test(id)){
            res.writeHead(404,{"Content-Type":"application/json"});
            res.end(JSON.stringify({title:"Validation",message:"Invali Id"}));
        }else if(regex.test(id) && baseurl==="/api/movies/"){
           const index=req.movies.findIndex((movie)=> {
             return movie.imdbID === id;
           })
           console.log(index)
           if (index === -1) {
            res.statusCode = 404;
            res.write(
              JSON.stringify({ title: "Not Found", message: "Movie not found" })
            );
            res.end();
          } else {
            req.movies.splice(index, 1);
            writeToFile(req.movies);
            res.writeHead(204, { "Content-Type": "application/json" });
            res.end(JSON.stringify(req.movies));
          }

        }

    }catch(err){
      console.log(err);
    }

}