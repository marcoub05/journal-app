export const fileUpload = async (file) => {

    if(!file) throw new Error('No existe un archivo para subir');
    const cloudUrl = 'https://api.cloudinary.com/v1_1/ddbupnipu/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'journal-app');
    formData.append('file', file);

    try{
        const res = await fetch(cloudUrl,{
            method:'POST',
            body:formData
        })

        if(!res.ok){
            throw new Error('No se logro subir la imagen')
        }

        const cloudRes = await res.json();

        return cloudRes.secure_url;
    }
    catch(error){
        throw new Error(error.message);
    }
}
