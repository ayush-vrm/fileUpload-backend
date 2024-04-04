const mongoose = require("mongoose");
const nodemailer = require("nodemailer");


const fileSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    imageUrl :{
        type : String,
    },
    tags :{
        type : String,
    },
    email : {
        type : String,
        required : true,
    }
});

//post model
fileSchema.post("save", async function(doc){
    try{
        console.log("DOC", doc);
        // transporter 
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth :{
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            },
        })
        // send mail
        let info = await transporter.sendMail({
            from : `Vermas`,
            to : doc.email,
            subject : "New file uploaded in clouinary",
            html : `<h2>NAMASTE </h2> <p> FILE Uploaded View Here : <a href="${doc.imageUrl}>$(doc.imageUrl)</a> </p>`
        })
        console.log("INFO:", info);
    }

    catch(error){
        console.error(error);
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;