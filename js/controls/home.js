//Init User Service
const user = new UserService();
//Init User UI
const userUI = new UserUI();

//Init Image UI
const imageUI = new ImageUI();

//Init Image Service
const imageService = new ImageService();

//Init Image Modal
const imageModal = new ImageModal();

//Init Comments Service
const commentService = new CommentService();

//UI Elements
const inputCover = document.getElementById('coverImg');
const inputUploadImage = document.getElementById('userPhotos');
const imgWrap = document.querySelector('.images-wrap');
const addCommentForm = document.forms["addCommentForm"];
const currentImgTag = document.querySelector(".current-image img");
const commentContainer = document.querySelector(".current-image-comments-wrap");

function onLoad(e) {
    user.getInfo()
        .then((data) => {
            userUI.renderUserInfo(data);
            return data;
        })
        .then((data) => {
            imageUI.clearContainer();
            data.my_images.forEach((img) => imageUI.addImage(img));
        })
        .catch((error) => {
            console.error(error);
        });
}

function onCoverUpload(e) {
    if (inputCover.files.length) {
        const [newCover] = inputCover.files;
        user.uploadCover(newCover)
            .then(user.getInfo)
            .then((data) => userUI.setCover(data.cover))
            .catch((error) => console.log(error));
    }
}

/**
 * ф-ия загрузки файла и добавления в разметку
 * @param {*} e событие
 */
function uploadImageHandler(e) {
    if (inputUploadImage.files.length) {
        const [... photos] = inputUploadImage.files;
        imageService.uploadImage(photos) 
            .then(user.getInfo)
            .then((data) => {
                imageUI.clearContainer();
                data.my_images.forEach((img) => imageUI.addImage(img));
            })
            .catch((error) => console.log(error));
    }
}

function deleteImageHandler(e) {
    if (e.target.classList.contains('fa-trash-alt')) {
        if (!confirm('Do you really want to delete this photo?')) return;

        const imgWrapper = e.target.closest(".img-wrap");
        const imageId = imgWrapper.dataset.imgId;
        const imageUrl = imgWrapper.querySelector("img").src.split('/').splice(-2).join('/');

        imageService.deleteImage(imageId, imageUrl)
            .then(res => {
                if (!res.error) imageUI.removeImage(imgWrapper);
            })
            .then(user.getInfo)
            .then((data) => {
                imageUI.clearContainer();
                data.my_images.forEach((img) => imageUI.addImage(img));
            })
            .catch((error) => console.log(error));
    }
}

function commentsContainerClickHandler(e) {
    // обработчик работы с удалением и редактированием комметнариев
    if (e.target.classList.contains("fa-trash-alt") || e.target.classList.contains("fa-edit")) { 
        const commentWrapper = e.target.closest("[data-comment-id]");
        const commentId = commentWrapper.dataset.commentId;
        const currImgId = currentImgTag.dataset.imgId;

        if (!commentId) return console.log("Error. Please provide correct comment`s Id.");
        if (!currImgId) return console.log("Error. Please provide current image Id.");

        // удаление
        if (e.target.classList.contains("fa-trash-alt")) {
            if (!confirm("Are you sure you want to delete this comment?")) return;

            commentService.removeComment(commentId, currImgId)
            .then(res => {
                message.show({text: res.message, error: res.error});
                if (!res.error) imageModal.removeComment(commentWrapper);
            })
            .catch(error => console.log(error));

        } else if (e.target.classList.contains("fa-edit")) {
            // редактирование
            const commentItemInfo = commentWrapper.querySelector(".comment-item-info")
            if (!commentItemInfo) return console.log("Error. Container for displaying comment`s info is not defined.");

            // форма для редактирования комментария
            const form = imageModal.setCommentToEdit(commentItemInfo);
            if (form) {
                // Обработчик события "submit"
                form.addEventListener("submit", (e) => {
                    e.preventDefault();

                    commentService.updateComment(commentId, form.elements[0].value)
                    .then(res => {
                        message.show({text: res.message, error: res.error})
                        if (!res.error) imageService.getInfo(currImgId)
                            .then((data) => imageModal.renderInfo(data))
                            .then(imageModal.loaderToggle())
                            .catch(error => console.log(error));
                    })
                    .catch(error => console.log(error));
                });

                form.addEventListener("reset", (e) => {
                    e.preventDefault();
                    imageService.getInfo(currImgId)
                    .then((data) => imageModal.renderInfo(data))
                    .then(imageModal.loaderToggle())
                    .catch(error => console.log(error));
                });
            } 
        }
    }
}

/**
 * функция- обработчик отправки комментария
 * @param {object} e 
 * @returns {void}
 */
function addCommentHandler(e) {
    e.preventDefault();
    const comment = addCommentForm.elements["comment"].value;
    const currImgId = currentImgTag.dataset.imgId;

    if (!comment) return console.log("Error.");
    if (!currImgId) return console.log("Error.");

    commentService.addComment(currImgId, comment)
    .then(res => {
        if (!res.error) imageService.getInfo(currImgId)
            .then((data) => imageModal.renderInfo(data))
            .then(imageModal.loaderToggle())
            .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
    e.target.reset();
}

//Events
window.addEventListener('load', onLoad);
inputCover.addEventListener('change', onCoverUpload);
inputUploadImage.addEventListener('change', uploadImageHandler);
imgWrap.addEventListener('click', deleteImageHandler);

imgWrap.addEventListener('click', (e) => {
    if (e.target.classList.contains('on-hover')) {
        const id = e.target.closest('[data-img-id]').dataset.imgId;
        $('#imageModal').modal('toggle');
        imageService.getInfo(id)
            .then((data) => {
                imageModal.renderInfo(data);
            })
            
            .catch((error) => console.log(error));
    }
});
addCommentForm.addEventListener("submit", addCommentHandler);
commentContainer.addEventListener("click", commentsContainerClickHandler);


//remove Loader
$('#imageModal').on('hidden.bs.modal', (e) => imageModal.loaderToggle());