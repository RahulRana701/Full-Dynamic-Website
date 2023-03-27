const a=require("express");
const app=a();
const path = require("path");
const fs = require("fs");
const port = 8000;
const mongoose = require('mongoose');
const bodyparser = require('body-parser'); 
app.use(a.urlencoded()); 
app.use(a.static("Website")); // to serve css files as well and js and images and all

// this res.send is used to run inline html , to run proper html we have to use
// res.sendfile and give proper path to before our html(which to be served)
// we have to put all our project file like html and css vagera in one folder
// but this way out html file will be read not css and other hence to do that
//  we have to use app.use(static wali cheez);

mongoose.set('strictQuery', true);
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/jatt'); 
}

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {  
  console.log("we are connected");
});

const contactSchema = new mongoose.Schema({
    // jo cheeza form ke name mei hai vo daal di yaha
    name: String,
    email: String,
    number: String,
    suggestions: String
  });
//   after schema created we made a model
  const Contact = mongoose.model('sidhu', contactSchema);




app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/Website/index.html"));
})
app.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname,"/Website/contact.html"));
})
app.post("/contact",(req,res)=>{
    // name2 = req.body.name
    // maila = req.body.email
    // gall = req.body.number
    // suggest = req.body.suggestions
    // let outputToWrite = `the name of the client is ${name2}, ${maila} years old, ${gall}, residing at ${suggest}`
    // fs.writeFileSync('output.txt', outputToWrite)

    var mydata=new Contact(req.body);
    mydata.save().then(()=>{
        res.send("your details got saved");
    }).catch(()=>{
        res.status(400).send("data was not saved");
    });
})

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});