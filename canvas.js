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
        this.backupStack = [];

        // resize html object to match specs
        this.object.height = height;
        this.object.width = width;

        //context data
        this.context = document.getElementById("canvas").getContext("2d");
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
        console.log("fill method called. Still not working");
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


    //functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    clear(){
        if(confirm("Are you sure you want to clear the canvas?")){
            this.saveState();
            this.context.clearRect(0, 0, this.width, this.height);
        }
    }

    setTool(selectedTool){
        this.tool = selectedTool;
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
        this.backupStack.push(this.context.getImageData(0, 0, this.width, this.height));
    }

    loadState(){
        if(this.backupStack.length > 0){
            this.context.putImageData(this.backupStack.pop(), 0, 0);
        }
    }

    getRGB(x, y){
        var pixelData = this.context.getImageData(x, y, 1, 1);
        //pixelData.data[red, green, blue, alpha]
        return [pixelData.data[0], pixelData.data[1], pixelData.data[2]];
    }

    //a1 & a2 must be arrays
    compareArrays(array1, array2){
        return JSON.stringify(array1) == JSON.stringify(array2);
    }

}