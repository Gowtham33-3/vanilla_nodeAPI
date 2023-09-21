module.exports= (req,res)=>{
let baseUrl= req.url.substring(0,req.url.lastIndexOf("/")+1);
let id=req.url.split("/")[3];
const regex=new RegExp(/^[a-z]{2}[0-9]{7}$/);


    if(req.url === "/api/movies"){
    res.statusCode=200;
    res.setHeader("Content-Type","application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
    }else if(!regex.test(id)){
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({title:"Validation",message:"Invali Id"}));
    }else if(baseUrl==="/api/movies/" && regex.test(id)){
      res.statusCode=200;
      res.setHeader("Content-Type","application/json");
      let filteredMovie=req.movies.filter((movie)=>{
        return movie.imdbID===id;
      });
if(filteredMovie.length>0){
   res.statusCode=200;
   res.write(JSON.stringify(filteredMovie));
   res.end();

}else{
    res.writeHeade(404,{title:"not found",message:"movie not founnd"});
    res.end();
     }
 }
 else{
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({title:"Not Found",message:"Route not found"}));
    }
    
}
