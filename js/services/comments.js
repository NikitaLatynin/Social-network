class CommentService {
    /**
     * Добавить комментарий
     * @param {string} photos - к какой фото добавить комментарий
     * @returns {object}
     */
    addComment(imgId, comment) {
        return new Promise((resolve, reject) => {
			// Get token
            const token = localStorage.getItem("social_user_token");

            if (!token) return reject("Error. Unauthorized.");

			fetch(`${env.apiUrl}/public/users/comment/${imgId}`, {
			    method: 'POST',
			    body: JSON.stringify({
			      comment_text: comment
			    }),
			    headers: {
			    	"Content-type": "application/json",
			    	"x-access-token": token
			    }
			})
			.then(response => response.json())
			.then(data => resolve(data))
			.then(error => reject(error));
        });
    }

    /**
     * Удалить комментарий
     * @param {string} commentId - идентификатор коментария
     * @param {string} imageId - идентификатор изображения
     * @returns {object}
     */
    removeComment(commentId, imageId) {
        const token = localStorage.getItem("social_user_token");

        if (!token) return reject("Error. Unauthorized.");

        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/users/comment/${commentId}`, {
                method: "DELETE",
                body: JSON.stringify({
                    image_id: imageId
                }),
                headers: {
                    "Content-type": "application/json",
                    "x-access-token": token
                }
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        });
    }

    /**
     * Изменить комментарий
     * @param {string} commentId - идентификатор коментария
     * @param {string} commentText - текст коментария
     * @returns {object}
     */
    updateComment(commentId, commentText) {
        // Get token
        const token = localStorage.getItem("social_user_token");

        if (!token) return reject("Error. Unauthorized.");

        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/users/comment/${commentId}`, {
                method: "PUT",
                body: JSON.stringify({
                    comment_text: commentText
                }),
                headers: {
                    "Content-type": "application/json",
                    "x-access-token": token
                }
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        });
    }
}