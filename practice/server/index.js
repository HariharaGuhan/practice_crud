const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const mycon=require("mysql");

const app=express();

app.use(cors());
app.use(express.static("public"));
// app.use(mycon());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

const db=mycon.createConnection({
    host:"localhost",
    user:"root",
    password:"Msd@007,",
    database:"practice"
})

db.connect(function(error){
    if(error){
        console.log(error);
    }
    else{
        console.log("Database connected successfully");
    }
})

app.post("/register",(req,res)=>{
    const {user_name,email}=req.body;
    const sql="insert into crud_app (user_name,email) values (?,?)";

    db.query(sql,[user_name,email],(err,result)=>{
        if (err){
            console.log({msg:"error",err });
        }else{
            console.log({status:"data inserted successfully",result});
        }
    })
})

app.get("/getdata",(req,res)=>{
   
    const sql="select * from crud_app";

    db.query(sql,(err,result)=>{
        if (err){
            console.log({msg:"error",err });
        }else{
            console.log({Msg:"getting inserted data",result});
            res.status(200).json({ msg: "sucess", result });
        }
    })
})

app.delete("/register/:id",(req,res)=>{
   const id=req.params.id;
    const sql="delete from crud_app where id=?";

    db.query(sql,[id],(err,result)=>{
        if (err){
            console.log({msg:"error",err });
        }else{
            console.log({msg:"deleting data",result});
        }
    })
})

app.put("/register/:id",(req,res)=>{
    const{user_name,email}=req.body;
    const id=req.params.id;
     const sql="update crud_app SET user_name=? ,email=? where id=? ";
 
     db.query(sql,[user_name,email,id],(err,result)=>{
         if (err){
             console.log({msg:"error",err });
         }else{
             console.log({msg:"updating data",result});
             res.status(200).json({status:"success",updated:result})
         }
     })
 })






app.listen(3004,()=>{
    console.log("Server running on 3003");
})
