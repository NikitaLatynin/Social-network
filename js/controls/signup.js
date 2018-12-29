// Init Authservice
const auth = new AuthService();
//Init Message Module
const message = new Message();
message.init();

//SignUp UI
const form = document.forms['signUpForm'];
const firstNameInput = form.elements['first_name'];
const lastNameInput = form.elements['last_name'];
const nickNameInput = form.elements['nick_name'];
const birthDayInput = form.elements['day_of_birth'];
const birthMonthInput = form.elements['month_of_birth'];
const birthYearInput = form.elements['year_of_birth'];
const countryInput = form.elements['country'];
const cityInput = form.elements['city'];
const genderInput = form.elements['gender'];
const emailInput = form.elements['email'];
const phoneInput = form.elements['phone'];
const passwordInput = form.elements['password'];

//SignUp Handler
/**
 * ф-ия обаботки запроса регистрации
 * @param {*} e - событие
 */
function signUpHandler(e) {
    e.preventDefault();

    const validation = new Validation(form);
    validation.init();

    if (!validation.check()) return console.error('Validation error.');

    auth.signup(emailInput.value, passwordInput.value, nickNameInput.value, firstNameInput.value, lastNameInput.value, phoneInput.value
    	, genderInput.value, cityInput.value, countryInput.value, birthDayInput.value, birthMonthInput.value, birthYearInput.value)
        .then((response) => {
            if (!response.error) {
                window.location = 'login.html';
            } else {
                message.show({text: response.message, error: response.error});
            }
        });
}

form.addEventListener('submit', signUpHandler);