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
        console.log("I am drawing");

        //fillRect(x, y, width, height)
        this.ctx.fillRect(0, 0, 150, 75);
    }

    erase(x, y){
        //erase method
    }

    save(){
        //save image of canvas
    }

}

var myCanvas = new canvas(document.getElementById("canvas"), 16, 16); //myCanvas initialization

//myCanvas event listener initialization
myCanvas.object.addEventListener("click", function(){
    myCanvas.draw(0,0);
});
