import { NextResponse } from "next/server";
import { File } from "buffer";
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });

export const POST = async (req) => {
    try {
        const formData = await req.formData();

        const file = formData.get("file");
        const type = formData.get("type");

        if (!file || !(file instanceof File)) {
            return new NextResponse(JSON.stringify({ error: "No files received." }), { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + file.name.replaceAll(" ", "_");
        const filePath = `/${type}/` + filename;

        const cloudinaryUpload = () => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.v2.uploader.upload_stream((error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });

                uploadStream.end(buffer);
            });
        };

        const data = await cloudinaryUpload();

        return new NextResponse(JSON.stringify({ file_path: data.url }), { status: 200 });
    } catch (error) {
        console.log("Error occurred", error);
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
};


// export const DELETE = async (req) => {
//     try {
//         cloudinary.v2.api
//         .delete_resources(['r5xorkwhzcqmircfokam'], 
//             { type: 'upload', resource_type: 'image' })
//         .then(console.log);

//         return NextResponse.json("Image deleted", { status : 200 })
//     } catch (error) {
//         console.log("Error occured ", error);
//         return NextResponse.json({ Message: "Failed"}, {status: 500} );
//     }
// }