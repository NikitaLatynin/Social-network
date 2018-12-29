//Init AuthService
const auth = new AuthService();
//Init Message Module
const message = new Message();
message.init();

//Login UI
const form = document.forms['loginForm'];
const emailInput = form.elements['email'];
const passwordInput = form.elements['password'];

//Login Handler
function submitHandler(e) {
    e.preventDefault();

    const validation = new Validation(form);
    validation.init();

    if(!validation.check()) return console.error('Validation error.');

    auth.login(emailInput.value, passwordInput.value)
        .then((res) => {
            if (!res.error) {
                localStorage.setItem('social_user_id', res.id);
                localStorage.setItem('social_user_token', res.token);
                window.location = 'index.html';
            } else {
                message.show({text: res.message, error: res.error});
            }
        });
}

form.addEventListener('submit', submitHandler);

//Reset Password
//UI 
const resetForm = document.forms['resetForm'];
const resetInput = resetForm.elements['reset-email'];
const modalClose = document.querySelector('.close');

/**
 * ф-ия сброса пароля
 * @param {*} e - событие
 */
function resetPasswordHandler(e) {
    e.preventDefault();

    auth.resetPassword(resetInput.value) 
        .then((res) => {
            if (!res.error) {
                message.show({text: res.message});
                modalClose.click();
                resetInput.value = '';  
            } else {
                message.show({text: res.message, error: res.error});
            }
        });
}

resetForm.addEventListener('submit', resetPasswordHandler);