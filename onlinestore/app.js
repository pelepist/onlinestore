const express=require('express');
const app=express();
const PORT=3000;
const productsRouter=require('./routes/products');

app.use(express.json());

app.get('/',function(request, response){
    response.send("Online store API")
});


app.use('/products',productsRouter);

app.listen(PORT,function(){
    console.log("Server listening to port: "+PORT)
});



module.exports=app;