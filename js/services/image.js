class ImageService {

    /**
     * метод загрузки фото на сервер
     * @param {*} photo - файлы
     */
    uploadImage(photo) {
        return new Promise((resolve,reject) => {
            const formData = new FormData();
            photo.forEach((photo) => {
                formData.append('userPhotos', photo);
            });

            //Get token
            const token = localStorage.getItem('social_user_token');
            //Get user id
            const id = localStorage.getItem('social_user_id');

            if (!token || !id) return reject('Error. Unauthored');

            fetch(`${env.apiUrl}/public/users/upload-photos/${id}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'x-access-token': token
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }

    /**
     * метод удаления картинки
     * @param {*} imageId - id картинки
     * @param {*} imageUrl - url картинки
     */
     deleteImage(imageId, imageUrl) {
        return new Promise ((resolve, reject) => {
            //Get token
            const token = localStorage.getItem('social_user_token');
            //Get user id
            const id = localStorage.getItem('social_user_id');

            if (!token || !id) return reject('Error. Unauthored');

            fetch(`${env.apiUrl}/public/users/remove-photo/${id}`, {
                method: 'DELETE',
                body: JSON.stringify({
                    image_id: imageId,
                    image_url: imageUrl
                }),
                headers: {
                    'Content-type' : 'application/json',
                    'x-access-token': token
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
     }

     getInfo(id) {
         return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/users/image-info/${id}`)
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
         });
     }
}