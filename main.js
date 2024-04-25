function promptWidth(){
    var canvasWidth = parseInt(prompt("Enter Width in pixels", 20));

    if(isNaN(canvasWidth) || canvasWidth > 50 || canvasWidth <= 0){
        alert("Width must be an Integer no higher than 50");
        canvasWidth = promptWidth();
    }

    return canvasWidth;
}

function promptHeight(){
    var canvasHeight = parseInt(prompt("Enter Height in pixels", 20));

    if(isNaN(canvasHeight) || canvasHeight > 50 || canvasHeight <= 0){
        alert("Height must be an Integer no higher than 50");
        canvasHeight = promptHeight();
    }

    return canvasHeight;
}

//start of execution
var columns = promptWidth();
var rows = promptHeight();

//the height and width of a user pixel, measured in real pixels. I'm sorry this naming convention sucks. My bad. 
const PixelHeight = 25;
const PixelWidth = 25;

//Initialize canvas and relevant variables
var myCanvas = new canvas(document.getElementById("canvas"), (rows * PixelHeight), (columns * PixelWidth), rows, columns);
var mouseDownFlag = false;

//myCanvas event listener initializations
myCanvas.object.addEventListener("mousedown", function(e){
    //save state for undo function
    myCanvas.saveState();

    //this should only work on a left click
    if(e.button == 0){
        mouseDownFlag = true;
        myCanvas.useTool(e.offsetX, e.offsetY);
    }
})

addEventListener("mouseup", function(){
    mouseDownFlag = false;
});

myCanvas.object.addEventListener("mousemove", function(e){
    if (mouseDownFlag){
        myCanvas.useTool(e.offsetX, e.offsetY);
    }
});

//color picker even listener initialization and function
document.getElementById("colorPicker").addEventListener("mousedown", function(e){
    myCanvas.setColor(e.target.value);
});

document.getElementById("colorPicker").addEventListener("input", function(e){
    myCanvas.setColor(e.target.value);
});