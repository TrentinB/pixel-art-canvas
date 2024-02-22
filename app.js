// this file is now redundant and unused. Delete once code has been relocated

'use strict';

var canvas= document.getElementById("canvas");

canvas.addEventListener("mousemove", MouseEvent => { 
    if (this.active) { 
        var rect = canvas.getBoundingClientRect(); //gets the canvas rectangle dimensions and locations
        var x = MouseEvent.clientX - rect.left; //gets mouse x coordinate relative to canvas
        var y = MouseEvent.clientY - rect.top; //gets mouse y coordinate relative to canvas

        //rounds coordinates down to nearest pixel coordinate 
        x = Math.floor(this.width * x / canvas.clientWidth);
        y = Math.floor(this.height * y / canvas.clientHeight); 

        this.draw(x, y);
    } 
});