//variables for the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
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
let enemyCoords ={
    x:50,
    y:50,
    dx:0,
    dy:0
}
// This basically has the main game logic
function gameLogic() {
    ctx.clearRect (0, 0, canvas.width, canvas.height);
    drawCharacter();
    drawEnemy();
    enemyCoords.x += enemyCoords.dx;
    enemyCoords.y += enemyCoords.dy;
    characterCoords.x += characterCoords.dx;
    characterCoords.y += characterCoords.dy;
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
        console.log(characterCoords.x);
    }
    if (characterCoords.y < 0){
        characterCoords.y = 0;
    }
    if (characterCoords.y > 595){
        characterCoords.y = 595;
        console.log(characterCoords.y);
    }
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.rect(characterCoords.x, characterCoords.y, 5, 5);
    ctx.stroke();
}
// Same thing as drawCharacter but with the enemy
function drawEnemy (){
    enemylogic();
    if (enemyCoords.x < 0){
        enemyCoords.x = 0;
    }
    if (enemyCoords.x > 795){
        characterCoords.x = 795;
    }
    if (enemyCoords.y < 0){
        enemyCoords.y = 0;
    }
    if (enemyCoords.y > 595){
        enemyCoords.y = 595;
    }
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.rect(enemyCoords.x, enemyCoords.y, 5, 5);
    ctx.fill();
    ctx.closePath();
}
// Contains the main enemy AI
function enemylogic(){
    if(characterCoords.x > enemyCoords.x){
        enemyCoords.dx = .5;
    }
    if(characterCoords.x < enemyCoords.x){
        enemyCoords.dx = -.5;
    }
    if (characterCoords.y < enemyCoords.y){
        enemyCoords.dy = -.5;
    }
    if (characterCoords.y > enemyCoords.y){
        enemyCoords.dy = .5;
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









