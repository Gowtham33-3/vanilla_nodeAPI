module.exports = async(request) => {
    return new Promise((resolve, reject) => {
      try{
        let body = "";
        request.on("data", (chunk) => {
          body += chunk;
        });
        request.on("end", () => {
         const parsedBody = JSON.parse(body);
         resolve(parsedBody);
        });
      }catch(err){
        console.log(err);
        reject(err);
      }
      
    });
  };
  