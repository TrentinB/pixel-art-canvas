class canvas{

    constructor(object, height, width, rows, columns){
        this.object = object; //object is the html canvas
        this.height = height;
        this.width = width;
        this.pixelHeight = this.height / rows;
        this.pixelWidth = this.width / columns;
        this.tool = "draw";
        this.mouseX;
        this.mouseY;

        // resize html object to match specs
        this.object.height = height;
        this.object.width = width;

        //context data
        this.ctx = document.getElementById("canvas").getContext("2d");
        this.ctx.fillStyle = "black";
    }

    draw(x, y){
        //fillRect(mouseX, mouseY, width, height)
        this.ctx.fillRect(x, y, this.pixelWidth, this.pixelHeight);
    }

    erase(x, y){
        //clearRect(x, y, width, height)
        this.ctx.clearRect(x, y, this.pixelWidth, this.pixelHeight);
    }

    fill(){
        //fill(x, y, width, height)
        this.ctx.fill(x, y, this.pixelWidth, this.pixelHeight);
    }

    useTool(x, y){
        
        //truncates coordinates to nearest pixel
        x = x - (x % this.pixelWidth);
        y = y - (y % this.pixelHeight);

        switch(this.tool){
            case "draw":
                this.draw(x, y);
                break;
            case "erase":
                this.erase(x, y);
                break;
            default:
                console.log("Error in canvas.useTool(): Unexpected value in this.tool");
        }
    }

    clear(){
        if(confirm("Are you sure you want to clear the canvas?")){
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
    }

    setTool(selectedTool){
        this.tool = selectedTool;
    }

    setColor(color){
        this.ctx.fillStyle = color;
        document.getElementById("currentColor").textContent = "Current Color: " + color;
    }

    save(){
        if(confirm("Save Image?")){
            // anchor for image. Emulates a link click since js apparently struggles with native downloading
            let image = document.createElement("a");
            image.href = this.object.toDataURL();
            image.download = "pixelArtImage";
            image.click();
            image.remove();
        }
    }

}

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

//prompt for canvas height and width first
var columns = promptWidth();
var rows = promptHeight();

const PixelHeight = 25;
const PixelWidth = 25;

//Initialize canvas and relevant variables
var myCanvas = new canvas(document.getElementById("canvas"), (rows * PixelHeight), (columns * PixelWidth), rows, columns);

var mouseDownFlag = false;

//myCanvas event listener initializations
myCanvas.object.addEventListener("mousedown", function(e){
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
document.getElementById("colorPicker").addEventListener("change", function(e){
    myCanvas.setColor(e.target.value);
});