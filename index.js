import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer"
import pkg from "pg";
const { Pool } = pkg;
const app=express();
const port=3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const db = new Pool({
  user:"postgres",
  host:"localhost",
  database:"message",
  password:"karthik123",
  port:5432,

});

app.get("/",async(req,res)=>{
    res.render("home.ejs");
  const result = await db.query("SELECT * FROM msg");
  res.render("index", { users: result.rows });
  console.log(result.rows);
});

app.get("/home",(req,res)=>{
    res.render("home.ejs");
});

app.get("/about",(req,res)=>{
    res.render("about.ejs");
});

app.get("/contact",(req,res)=>{
  res.render("contact.ejs");
});


app.post("/submit",async(req,res)=>{
  var name=req.body["name"];
  var mail=req.body["email"];
  var cont=req.body["content"];
  console.log(name);
  console.log(mail);
  console.log(cont);

  await db.query(
    "INSERT INTO msg (name, mail, text) VALUES ($1, $2, $3)",
  [name, mail, cont]
  );

 
  
   res.render("contact.ejs");
    
   const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "karthiksecond96@gmail.com",          // acc details aan sukshikanam
      pass: "bmqw snmr ylxx hgsb"             
    }
   });


 const mailOptions = {
    from: mail,  // sender (user’s email from form)
    to: "karthiksecond96@gmail.com", // your inbox
    subject: "Enquiery from your portfolio page",
    text: `You got a new message from ${name} (${mail}):\n\n${cont}`
  };



 const mailOptions2 = {
    from:  "smithakp4@gmail.com",  // sender (user’s email from form)
    to: "karthikmanoj798m@gmail.com", // your inbox
    subject: "Thanks",
    text: `Thank you for visiting my portfolio ${name} `
  };



  // ✅ Send the email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
      res.send("❌ Error sending email.");
    } else {
      console.log("✅ Email sent:", info.response);
      
    }
  });

  transporter.sendMail(mailOptions2, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
      res.send("❌ Error sending email.");
    } else {
      console.log("✅ Email sent:", info.response);
      
    }
  });

   


   

});

app.listen(process.env.PORT||port,()=>{
  console.log("server is live on port "+port);
});
