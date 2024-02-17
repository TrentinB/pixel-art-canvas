'use strict';

const colorButton = document.querySelector('.btn');

colorButton.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    const className = document.body.className;
    if (className == "light-theme"){
        this.textContent = "Dark";
    } else {
        this.textContent = "Light";
    }

    console.log(className);
});