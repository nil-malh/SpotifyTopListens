console.log('change mode loaded');
const icon = document.querySelector('.icon');
const classDocument = document.querySelector('.mode');


function changeMode() {

    if (icon.classList.contains('fa-lightbulb')) {
    
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-lightbulb');
        classDocument.classList.toggle('dark');
        classDocument.classList.toggle('light');

    } else {

        icon.classList.toggle('fa-lightbulb'); 
        icon.classList.toggle('fa-moon');
        classDocument.classList.toggle('dark');
        classDocument.classList.toggle('light');
         
    }

}

icon.addEventListener('click', () => changeMode());