class canvas{

    constructor(object, height, width){
        this.object = object; //object is the html canvas
        this.height = height;
        this.width = width;
        this.pixelHeight = this.height / 8;
        this.pixelWidth = this.width / 8;
        this.tool = "draw";
        this.mouseX;
        this.mouseY;

        //context data may need to be moved to new methods
        this.ctx = document.getElementById("canvas").getContext("2d");
        this.ctx.fillStyle = "red";
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

    setTool(selectedTool){
        this.tool = selectedTool;
    }

    save(){
        //save image of canvas
    }

}


var myCanvas = new canvas(document.getElementById("canvas"), 320, 320); //myCanvas initialization
var mouseDownTimer;
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

