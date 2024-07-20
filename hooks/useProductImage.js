import axios from "axios";

export const storeImage = async (images) => {
    try {
    const list = [];

    for(const image of images){
        console.log(image);
            const formData = new FormData();
            formData.append('file', image.image);
            formData.append('type', "products" );            // Send a POST request to the /upload-image endpoint
            const { data  } = await axios.post('/api/file-upload', formData);
            console.log(data);
            // Parse the response JSON and log the path to the saved file
            list.push({ image : data});
    }
    
    return list;        
    } catch (error) {
        console.log(error)
    }
}