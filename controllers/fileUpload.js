const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//local file upload ka handler function create krna h

exports.localFileUpload = async(req,res) =>{
    try{

        //fetch file from request
        const file = req.files.file;
        console.log("FIle contains ->", file);

        // create path where file needs to be stored in sever 
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH ->", path);

        //add path to the move function
        file.mv(path, (err)=>{
            console.log(err);
        });

        // create a successful response
        res.json({
            success : true,
            message : "local file uploaded successfully"
        })
    }
    catch(error){
        console.log(error);
    }
}
function isFileTypeSupported (type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder, quality){
    const options = {folder};
    console.log("temp file path:" , file.tempFilePath);

    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// image upload ka handler 
exports.imageUpload = async(req,res) =>{
    try{
        // data fetch
        const{name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "png", "jpeg", "mp4", "mov"];
        const fileType =  file.name.split('.')[1].toLowerCase();
        console.log("file:",fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success : false,
                message : "file format not supported",
            })
        }

        // file format supported hai to 
        const response = await uploadFileToCloudinary(file, "Verma");
        console.log(response);

        // db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl : response.secure_url,
        });

        res.json({
            success : true,
            imageUrl : response.secure_url,
            message : "Image Successfully Uploaded",
        })

    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success : false,
            message : "something went wrong",
        })
    }
}

// video upload ka handler
exports.videoUpload = async(req,res)=>{
    try{
        // data fetch
        const{name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;

        // validation
        const supportedTypes = ["mp4", "mov"];
        const fileType =  file.name.split('.')[1].toLowerCase();
        console.log("file:",fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success : false,
                message : "file format not supported",
            })
        }

        // file format supported hai to 
        const response = await uploadFileToCloudinary(file, "Verma");
        console.log(response);

        // db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl : response.secure_url,
        });

        res.json({
            success : true,
            imageUrl : response.secure_url,
            message : "Video Successfully Uploaded",
        })

    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success : false,
            message : "something went wrong",
        })
    }
}


// image size reducer ka handler
exports.imageSizeReducer = async(req,res) =>{
    try{
        // data fetch
        const{name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "png", "jpeg", "mp4", "mov"];
        const fileType =  file.name.split('.')[1].toLowerCase();
        console.log("file:",fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success : false,
                message : "file format not supported",
            })
        }

        // file format supported hai to 
        const response = await uploadFileToCloudinary(file, "Verma", 30);
        console.log(response);

        // db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl : response.secure_url,
        });

        res.json({
            success : true,
            imageUrl : response.secure_url,
            message : "Image Successfully Uploaded",
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success : false,
            message : "something went wrong",
        })
    }
}