class canvas{

    constructor(object, height, width){
        this.object = object; //object is the html canvas
        this.height = height;
        this.width = width;
    }

    draw(x, y){
        console.log("I am drawing");
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
