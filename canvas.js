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
        this.undoStack = [];
        this.redoStack = [];

        // resize html object to match specs
        this.object.height = height;
        this.object.width = width;

        //context data
        this.context = document.getElementById("canvas").getContext("2d", {willReadFrequently: true});
        this.context.fillStyle = "black";
    }


    //drawing tools~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    draw(x, y){
        //fillRect(mouseX, mouseY, width, height)
        this.context.fillRect(x, y, this.pixelWidth, this.pixelHeight);
    }

    erase(x, y){
        //clearRect(x, y, width, height)
        this.context.clearRect(x, y, this.pixelWidth, this.pixelHeight);
    }

    fill(x, y){
        var startColor = this.getRGBA(x, y);

        this.draw(x, y);

        //if startColor is fillstyle, do nothing further
        if(this.compareArrays(startColor, this.getRGBA(x, y))){
            return;
        }

        //compare startColor to next pixel (if applicable)
        if( y > 0 && 
            this.compareArrays(startColor, this.getRGBA(x, y-this.pixelHeight)))
        {
            //if match: recurse on next pixel
            this.fill(x, y-this.pixelHeight);
        }

        //repeat for right
        if( x < (this.width - this.pixelWidth) && 
            this.compareArrays(startColor, this.getRGBA(x+this.pixelWidth, y)))
        {
            this.fill(x + this.pixelWidth, y);
        }

        //down
        if( y < this.height - this.pixelHeight && 
            this.compareArrays(startColor, this.getRGBA(x, y+this.pixelHeight)))
        {
            this.fill(x, y+this.pixelHeight);
        }

        //left
        if( x > 0 && 
            this.compareArrays(startColor, this.getRGBA(x-this.pixelWidth, y)))
        {
            this.fill(x - this.pixelWidth, y);
        }
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
            case "fill":
                this.fill(x, y);
                break;
            default:
                console.log("Error in canvas.useTool(): Unexpected value in this.tool");
        }
    }

    //other tools~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    clear(){
        if(confirm("Are you sure you want to clear the canvas?")){
            this.saveState();
            this.context.clearRect(0, 0, this.width, this.height);
        }
    }

    setTool(selectedTool){
        this.tool = selectedTool;
    }

    //tool is the button that needs depressed. It should be a number
    depressTool(tool){
        var buttons = document.getElementsByClassName("material-icons");

        for(var i = 0; i < buttons.length; i++){
            buttons[i].style.borderStyle = 'outset';
        }
        buttons[tool].style.borderStyle = 'inset';
    }

    setColor(color){
        this.context.fillStyle = color;
        document.getElementById("currentColor").textContent = "Current Color: " + color;
    }

    saveImage(){
        if(confirm("Save Image?")){
            // anchor for image. Emulates a link click since js apparently struggles with native downloading
            let image = document.createElement("a");
            image.href = this.object.toDataURL();
            image.download = "pixelArtImage";
            image.click();
            image.remove();
        }
    }

    saveState(){
        this.undoStack.push(this.context.getImageData(0, 0, this.width, this.height));
        this.redoStack = [];
    }

    undo(){
        if(this.undoStack.length > 0){
            this.redoStack.push(this.context.getImageData(0, 0, this.width, this.height));
            this.context.putImageData(this.undoStack.pop(), 0, 0);
        }
    }

    redo(){
        if(this.redoStack.length > 0){
            this.undoStack.push(this.context.getImageData(0, 0, this.width, this.height));
            this.context.putImageData(this.redoStack.pop(), 0, 0);
        }
    }

    getRGBA(x, y){
        var pixelData = this.context.getImageData(x, y, 1, 1);
        //pixelData.data[red, green, blue, alpha]
        return [pixelData.data[0], pixelData.data[1], pixelData.data[2], pixelData.data[3]];
    }

    //a1 & a2 must be arrays
    compareArrays(array1, array2){
        return JSON.stringify(array1) == JSON.stringify(array2);
    }

}