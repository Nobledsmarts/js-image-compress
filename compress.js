
/*
*  (c) Richard franklin c
*
*/
let compressImage = (event) => {
    const file = event.currentTarget.files[0];
    //original file size (in kiloBytes);
    size1.textContent = Math.round(file.size / 1024);

    const reader = new FileReader();
    //the new image quality minimum = 0, maximum = 1;
    const REDUCE_RATIO = reduceRatio || 0.1;
    reader.addEventListener('loadend', (event) => {
        const image = new Image();
        image.src = event.target.result;
        preview1.src = image.src;
        setTimeout(() => {
            const canvas = document.createElement('canvas');
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            ctx.canvas.toBlob((blob) => {
                const newFile = new File([blob], file.name, {
                    type : 'image/jpeg',
                    lastModified : Date.now(),
                });
                // new file size (in kiloBytes)
                size2.textContent = Math.round(newFile.size / 1024);
                const reader2 = new FileReader();
                reader2.addEventListener('loadend', (e) => {
                    const newFileSrc = e.target.result;
                    preview2.src = newFileSrc;
                });
                reader2.readAsDataURL(newFile);
            }, 'image/jpeg', REDUCE_RATIO);
        });
    });
    reader.readAsDataURL(file);
}