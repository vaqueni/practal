const steps = document.getElementById("steps");
const saveBtn = document.getElementById("save");
const forward = document.getElementById("forward");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const MAX = 800;
const side = 700;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = 1;
ctx.lineCap = "round";

let clicked = false;

function dot(x, y){
    ctx.fillRect(x, y, 1, 1);
}
class Point{
    constructor(PointX, PointY){
        // console.log(PointX, PointY);
        this.PointX = PointX;
        this.PointY = PointY;
    }

}
//  CANVAS_HEIGHT-(PointY)
let OriArray = Array(new Point(10,CANVAS_HEIGHT - 10));
OriArray.push(new Point(710 , CANVAS_HEIGHT - 10));
OriArray.push(new Point(side * Math.cos(Math.PI/3), CANVAS_HEIGHT - side * Math.sin(Math.PI/3)));
for(let i = 0 ; i < OriArray.length ; i++){
    ctx.fillRect(OriArray[i].PointX - 1, OriArray[i].PointY - 1, 3, 3);
}

let PointArray  = Array();

function onClick(event){
    if(!clicked){
        dot(event.offsetX, event.offsetY);
        PointArray.push(new Point(event.offsetX, event.offsetY))
    }
    clicked = true;
}


function onFileChange(event){
    // console.dir(event.target);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(url); //브라우저의 메모리 주소를 출력한다.
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
        fileInput.value = null;
    }
}

function onSaveClick(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}
let step = 10;
function onStepsChange(event){
    step = event.target.value;
}

function onForward(){
    if(clicked){
        for(let a = 0 ; a < step ; a++){
        const OriIdx = Math.floor(Math.random() * 3);
        const PointIdx = Math.floor(Math.random() * PointArray.length);
        
        const newX = (OriArray[OriIdx].PointX + PointArray[PointIdx].PointX)/2; 
        const newY = (OriArray[OriIdx].PointY + PointArray[PointIdx].PointY)/2;
        dot(newX, newY);
        PointArray.push(new Point(newX, newY));
        }
        
    }
   
}    





canvas.addEventListener("click", onClick);
saveBtn.addEventListener("click", onSaveClick);
forward.addEventListener("click", onForward);
steps.addEventListener("change", onStepsChange);