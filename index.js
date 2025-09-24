import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer"

const app=express();
const port=3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("home.ejs");
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


app.post("/submit",(req,res)=>{
  var name=req.body["name"];
  var mail=req.body["email"];
  var cont=req.body["content"];
  console.log(name);
  console.log(mail);
  console.log(cont);
  
   
   const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "karthiksecond96@gmail.com",          // acc details aan sukshikanam
      pass: "vqrk zdxb qtmr kqjx"             
    }
   });


 const mailOptions = {
    from: mail,  // sender (user’s email from form)
    to: "karthiksecond96@gmail.com", // your inbox
    subject: "Enquiery from your portfolio page",
    text: `You got a new message from ${name} (${mail}):\n\n${cont}`
  };



 const mailOptions2 = {
    from:  "karthiksecond96@gmail.com",  // sender (user’s email from form)
    to: mail, // your inbox
    subject: "Thanks",
    text: `Thank you for visiting my portfolio ${name} `
  };



  // ✅ Send the email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
      res.send(" Error sending email.");
    } else {
      console.log(" Email sent:", info.response);
      
    }
  });

  transporter.sendMail(mailOptions2, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
      res.send(" Error sending email");
    } else {
      console.log(" Email sent:", info.response);
      
    }
  });

   
res.render("contact.ejs");

   

});

app.listen(process.env.PORT||port,"0.0.0.0",()=>{
  console.log("server is live on port "+port);
});