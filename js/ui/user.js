class UserUI {
    constructor() {
        this._cover = document.querySelector('.user-cover');
        this._userAvatar = document.querySelector('.user-ava');
        this._userName = document.querySelector('.user-name');
    }

    renderUserInfo({avatar, cover, full_name}) {
        this.setCover(cover);
        this.setAvatar(avatar);
        this.setName(full_name);
    }

    setCover(url) {
        this._cover.style.background = `url("${url}") no-repeat center / cover`;
    }

    setAvatar(url) {
        const template = `<img src="${url}" alt=""`;
        this._userAvatar.insertAdjacentHTML('afterbegin', template);
    }

    setName(name) {
        this._userName.textContent = name;
    }
}