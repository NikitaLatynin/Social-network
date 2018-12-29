class AuthService {
    /**
     * login - метод для авторизации пользователя на сайте 
     * @param {string} email - адрес электронной почты
     * @param {string} password - пароль пользователя
     * @returns {object}
     */
    login(email, password) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/auth/login`, {
                method: "POST",
                body: JSON.stringify({email, password}),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }
    
    /**
     * signUp - метод для регистрации пользователя на сайте 
     * @param {string} email - адрес электронной почты
     * @param {string} password - пароль пользователя
     * @param {string} nickName - 
     * @param {string} fName - имя
     * @param {string} lName - фамилия
     * @param {string} phone - номер телефона
     * @param {string} gender - пол
     * @param {string} city - город
     * @param {string} country - страна
     * @param {string} birthDay - дата рождения (день)
     * @param {string} birthMonth - дата рождения (месяц)
     * @param {string} birthYear - дата рождения (год)
     * @returns {object}
     */
    signUp(email, password, nickName, fName, lName, phone, gender, city, country, birthDay, birthMonth, birthYear) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/auth/signup`, {
                method: "POST",
                body: JSON.stringify({
                    email, 
                    password,
                    nickname: nickName,
                    first_name: fName,
                    last_name: lName,
                    phone,
                    gender_orientation: gender,
                    city,
                    country,
                    date_of_birth_day: birthDay,
                    date_of_birth_month: birthMonth,
                    date_of_birth_year: birthYear
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }

    /**
     * resetPassword - метод для сброса пароля пользователя на сайте 
     * @param {string} email - адрес электронной почты
     * @returns {object}
     */
    resetPassword(email) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/auth/reset-password`, {
                method: "POST",
                body: JSON.stringify({email}),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }
}