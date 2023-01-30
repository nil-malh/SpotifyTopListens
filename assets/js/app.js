const body = document.querySelector('.visible');
const loader = document.querySelector('.loader');
const formContainer = document.querySelector('.login-container');



function onLoading() {
    body.classList.add('loader-invisible');
    formContainer.classList.add('loader-invisible');

    loader.classList.remove('loader-invisible');
    loader.classList.add('loader-visible');
}
function afterLoading() {
    formContainer.classList.remove('loader-invisible');
    body.classList.remove('loader-invisible');
    loader.classList.add('loader-invisible');
}
setTimeout(afterLoading, 2000);   

window.addEventListener('load', ()=> onLoading());


