'use strict';

const themeButton = document.querySelector('.btn');
const pixel = document.querySelector('.pixel')


themeButton.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    const className = document.body.className;
    if (className == "light-theme"){
        this.textContent = "Dark";
    } else {
        this.textContent = "Light";
    }
});

pixel.addEventListener('click', function() {
    console.log("pixel here");
});

