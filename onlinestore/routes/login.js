const express=require('express');
const customers=require('../models/customers_model')
const bcrypt=require('bcryptjs');
const router=express.Router();
const jwt=require('jsonwebtoken');

router.post('/',function(request,response){
    const username=request.body.username;
    const password=request.body.password;
    if(username && password){
        customers.checkLogin(username,function(err,result){
            if(err){
                response.send(err);
            }
            else{
                if(result.length>0){
                    bcrypt.compare(password,result[0].password,function(err,compareResult){
                        if(err){
                            response.send(err);
                        }
                        else{
                            if(compareResult){
                                response.json("OK");
                            }
                            else{
                                console.log("Wrong password")
                                response.status(403).json("Username and password dont match")
                            }
                        }
                    })
                }
                else{
                    console.log("No user found")
                    response.status(403).json("Username and password dont match")
                }
            }
        })
    }
    else{
        console.log("Username or password needed")
        response.status(403).json("Username and password dont match")
    }
});

function createToken(username){
    return jwt.sign({username},process.env.MY_TOKEN);
}

module.exports=router