import axios from "axios";

export const storeImage = async (images) => {
    try {
    const list = [];

    for(const image of images){
            const formData = new FormData();
            formData.append('image', image.image);
            // Send a POST request to the /upload-image endpoint
            const { data  } = await axios.post('https://peachy.ng/images/products.php', formData);
            // Parse the response JSON and log the path to the saved file
            list.push({ image : data.file_path});
    }
    
    return list;        
    } catch (error) {
        console.log(error)
    }
}