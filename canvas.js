class canvas{

    constructor(object, height, width){
        this.object = object; //object is the html canvas
        this.height = height;
        this.width = width;
        this.rows = 8;
        this.columns = 8;
        this.tool = "draw";

        //context data may need to be moved to new methods
        this.ctx = document.getElementById("canvas").getContext("2d");
        this.ctx.fillStyle = "red";
    }

    draw(x, y){
        //fillRect(mouseX, mouseY, width, height)
        this.ctx.fillRect(x, y, 20, 20);
    }

    erase(x, y){
        //clearRect(x, y, width, height)
        this.ctx.clearRect(x, y, 20, 20);
    }

    useTool(x, y){
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

var myCanvas = new canvas(document.getElementById("canvas"), 16, 16); //myCanvas initialization

//myCanvas event listener initialization
myCanvas.object.addEventListener("click", function(e){
    //myCanvas.draw(e.offsetX, e.offsetY);
    myCanvas.useTool(e.offsetX, e.offsetY);
});
