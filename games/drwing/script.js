var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var toolbtn = document.querySelectorAll(".tool");
var fillbtn = document.querySelector("#fill-color");
var sizeSlider = document.querySelector("#size-slider");
var colorBtns = document.querySelectorAll(".colors .draw-option");
var colorPicker = document.querySelector("#color-picker");
var clearCanvas = document.querySelector(".clear-canvas");
var saveImg = document.querySelector(".save-img");


var isDrawing = false;
var brushwidth = 5;
var mouseX;
var mouseY;
var selectedTool = "bruch";
var snapshot;
var selectedColor = "#000";
var setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
}
window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

var startDrawing = (e) => {
    isDrawing = true;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    ctx.beginPath();
    ctx.lineWidth = brushwidth;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);

}
var drawing = (e) => {

    // if (snapshot) {
    //     ctx.putImageData(snapshot , 0, 0);
    //     console.log('hi');
    // }
    // ctx.putImageData( snapshot,0,0);
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);
    if (selectedTool === "Rectangle") {
        drawRectangle(e);
    }
    else if (selectedTool === "bruch" || selectedTool === "Eraser") {
        selectedTool === "Eraser" ? ctx.strokeStyle = "#fff" : strokeStyle = selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

    }
    else if (selectedTool === "Circle") {
        drawCircle(e);

    } else if (selectedTool === "Traingle") {
        drawTraingle(e);

    }else if (selectedTool === "line") {
        drawLine(e);

    }else if (selectedTool==="heart"){
        drawHeart();
    }
}
var drawRectangle = (e) => {
    // ctx.strokeRect(e.offsetX, e.offsetY,mouseX - e.offsetX, mouseY - e.offsetY)
    if (!fillbtn.checked) {
        return ctx.strokeRect(Math.min(mouseX, e.offsetX), Math.min(mouseY, e.offsetY), Math.abs(mouseX - e.offsetX), Math.abs(mouseY - e.offsetY));
    }
    ctx.fillRect(
        Math.min(mouseX, e.offsetX),
        Math.min(mouseY, e.offsetY),
        Math.abs(mouseX - e.offsetX),
        Math.abs(mouseY - e.offsetY)
    )
}
var drawCircle = (e) => {
    var radise = Math.sqrt(Math.pow((mouseX - e.offsetX), 2) + Math.pow((mouseY - e.offsetY), 2));
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, radise, 0, 2 * Math.PI);
    fillbtn.checked ? ctx.fill() : ctx.stroke();

}
var drawTraingle = (e) => {

    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(mouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    // ctx.stroke();
    fillbtn.checked ? ctx.fill() : ctx.stroke();

}
var drawLine=(e) => {

    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.closePath();
    // ctx.stroke();
    ctx.stroke();

}


toolbtn.forEach(btn => {
    btn.addEventListener("click", () => {
        var activeTool = document.querySelector(".active");
        if (activeTool) {
            activeTool.classList.remove("active");
        } else {
            console.log("No active tool found.");
        }
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
        // console.log(typeof(selectedTool));
    });

}
);
sizeSlider.addEventListener("change", () => {
    brushwidth = sizeSlider.value;
})

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        var activeTool = document.querySelector(".selected");
        if (activeTool) {
            activeTool.classList.remove("selected");
        } else {
            console.log("No selected tool found.");
        }
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
}
)
colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
})
clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBackground();
})
saveImg.addEventListener("click", () => {
    var link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
})

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mousemove", drawing);
