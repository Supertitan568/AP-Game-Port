//variables for the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let i = 0;
//variables and event listeners for the arrow keys
let upPressed = false;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// These are describing the info about the character and the enemy
let characterCoords ={
    x:25,
    y:25,
    dx:0,
    dy:0
} 
class enemy {
    constructor(rn, rn2){
        this.x = rn;
        this.y = rn2;
        this.dx = 0;
        this.dy = 0;
    }
}
let allEnemies = [new enemy(Math.round(Math.random() * 1000),(Math.round(Math.random() * 1000)))];
console.log(allEnemies[i].x);
// This basically has the main game logic
function gameLogic() {
    ctx.clearRect (0, 0, canvas.width, canvas.height);
    drawCharacter();
    drawEnemy();
    
}
// This one is pretty self-explanitory
function drawCharacter() {
    if (rightPressed == true){
        characterCoords.dx = 1;
    }
    else if (leftPressed == true){
        characterCoords.dx = -1
    }
    else if (downPressed == true){
        characterCoords.dy = 1;
    }
    else if (upPressed == true){
        characterCoords.dy = -1;
    }
    if (characterCoords.x < 0){
        characterCoords.x = 0;
    }
    if (characterCoords.x > 795){
        characterCoords.x = 795;
    }
    if (characterCoords.y < 0){
        characterCoords.y = 0;
    }
    if (characterCoords.y > 595){
        characterCoords.y = 595;
    }
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.rect(characterCoords.x, characterCoords.y, 5, 5);
    ctx.stroke();
    characterCoords.x += characterCoords.dx;
    characterCoords.y += characterCoords.dy;
}
// Same thing as drawCharacter but with the enemy
function drawEnemy (){
    for (i = 0; i < allEnemies.length; i++){
        if (allEnemies[i].x < 0){
            allEnemies[i].x = 0;
        }
        if (allEnemies[i].x > 795){
            allEnemies[i].x = 795;
        }
        if (allEnemies[i].y < 0){
            allEnemies[i].y = 0;
        }
        if (allEnemies[i].y > 595){
            allEnemies[i].y = 595;
        }
        if(characterCoords.x > allEnemies[i].x){
            allEnemies[i].dx = .5;
        }
        if(characterCoords.x < allEnemies[i].x){
            allEnemies[i].dx = -.5;
        }
        if (characterCoords.y < allEnemies[i].y){
            allEnemies[i].dy = -.5;
        }
        if (characterCoords.y > allEnemies[i].y){
            allEnemies[i].dy = .5;
        }
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "black";
        ctx.rect(allEnemies[i].x, allEnemies[i].y, 5, 5);
        ctx.fill();
        ctx.closePath();
        allEnemies[i].x += allEnemies[i].dx;
        allEnemies[i].y += allEnemies[i].dy;
    }
}
//These next two functions contain the keyboard logic
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if(e.key =="Down" || e.key == "ArrowDown"){
        downPressed = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = false;
    }
}
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key =="Down" || e.key == "ArrowDown"){
        downPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = true;
    }
}
//Repeats draw every 10 miliseconds
setInterval(gameLogic, 10);









