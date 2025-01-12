const ImageToBase64 = async (image: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(image);

    const url = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })

    return url;
}

export default ImageToBase64;