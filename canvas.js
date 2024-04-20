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

        //context data may need to be moved to new methods
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
        }
    }

    clear(){
        if(confirm("Are you sure you want to clear the canvas?")){
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
    }

    setTool(selectedTool){
        this.tool = selectedTool;
        console.log(selectedTool);
    }

    setColor(color){
        this.ctx.fillStyle = color;
    }

    save(){
        //save image of canvas
    }

}

function promptWidth(){
    var canvasWidth = parseInt(prompt("Enter Width in pixels", 16));

    if(isNaN(canvasWidth) || canvasWidth > 50 || canvasWidth <= 0){
        alert("Width must be an Integer no higher than 50");
        canvasWidth = promptWidth();
    }

    return canvasWidth;
}

function promptHeight(){
    var canvasHeight = parseInt(prompt("Enter Height in pixels", 16));

    if(isNaN(canvasHeight) || canvasHeight > 50 || canvasHeight <= 0){
        alert("Height must be an Integer no higher than 50");
        canvasHeight = promptHeight();
    }

    return canvasHeight;
}

//prompt for canvas height and width first
var columns = promptWidth();
var rows = promptHeight();

//Initialize canvas and relevant variables
var myCanvas = new canvas(document.getElementById("canvas"), 500, 500, rows, columns); //500 is hard coded in html. I know this is bad.

var mouseDownFlag = false;

//myCanvas event listener initializations
myCanvas.object.addEventListener("mousedown", function(e){
    mouseDownFlag = true;
    myCanvas.useTool(e.offsetX, e.offsetY);
})

addEventListener("mouseup", function(){
    mouseDownFlag = false;
});

myCanvas.object.addEventListener("mousemove", function(e){
    if (mouseDownFlag){
        myCanvas.useTool(e.offsetX, e.offsetY);
    }
});