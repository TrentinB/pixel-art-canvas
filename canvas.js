class canvas{

    constructor(object, height, width){
        this.object = object; //object is the html canvas
        this.height = height;
        this.width = width;

        //context data may need to be moved to new methods
        this.ctx = document.getElementById("canvas").getContext("2d");
        this.ctx.fillStyle = "red";
    }

    draw(x, y){
        //fillRect(x, y, width, height)
        this.ctx.fillRect(x, y, 20, 20);
    }

    erase(x, y){
        //clearRect(x, y, width, height)
        this.ctx.clearRect(x, y, 20, 20);
    }

    save(){
        //save image of canvas
    }

}

var myCanvas = new canvas(document.getElementById("canvas"), 16, 16); //myCanvas initialization

//myCanvas event listener initialization
myCanvas.object.addEventListener("click", function(e){
    let mouseX = e.offsetX;  // Horizontal
    let mouseY = e.offsetY;  // Vertical
    console.log(mouseX, mouseY);
    myCanvas.draw(mouseX, mouseY);
});
