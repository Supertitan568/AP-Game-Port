//variables for the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let i = 0;
let score = 0;
//variables and event listeners for the arrow keys
let upPressed = false;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;
let ePressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// These are describing the info about the character and the enemy
let characterCoords ={
    x:25,
    y:25,
    dx:0,
    dy:0
}
let characterPower = false;
class item {
    constructor(rn, rn2){
        this.x = rn;
        this.y = rn2;
    }
}
class enemy {
    constructor(rn, rn2){
        this.x = rn;
        this.y = rn2;
        this.is = Math.random();
        this.dx = 0;
        this.dy = 0;
    }
}
let xdiff;
let ydiff;
let allItems = new Array(new item((Math.round(Math.random()) * 780), Math.round(Math.random() * 600)));
let allEnemies = new Array (new enemy(Math.round(Math.random() * 1000),(Math.round(Math.random() * 1000))));
if (allEnemies[allEnemies.length - 1].is > .8){
    allEnemies[allEnemies.length - 1].is = allEnemies[allEnemies.length - 1].is - .2;
}
if (allEnemies[allEnemies.length - 1].is < .2) {
    allEnemies[allEnemies.length - 1].is = allEnemies[allEnemies.length - 1].is + .2;
}
// This just has the main game logic
function gameLogic() {
    ctx.clearRect (0, 0, canvas.width, canvas.height);
    drawCharacter();
    drawItem();
    drawEnemy();
    drawItem();
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
function drawItem (){
    if(allItems[0] != undefined){
        for(i = 0; i < allItems.length; i++)
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "yellow";
        ctx.rect(allItems[i-1].x, allItems[i-1].y, 5, 5);
        ctx.stroke();
        despawnItem(i-1);
    }
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
            allEnemies[i].dx = allEnemies[i].is;
        }
        if(characterCoords.x < allEnemies[i].x){
            allEnemies[i].dx = -allEnemies[i].is;
        }
        if (characterCoords.y < allEnemies[i].y){
            allEnemies[i].dy = -allEnemies[i].is;
        }
        if (characterCoords.y > allEnemies[i].y){
            allEnemies[i].dy = allEnemies[i].is;
        }
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "black";
        ctx.rect(allEnemies[i].x, allEnemies[i].y, 5, 5);
        ctx.fill();
        ctx.closePath();
        allEnemies[i].x += allEnemies[i].dx;
        allEnemies[i].y += allEnemies[i].dy;
        despawnEnemy(i);
    }
}
function spawnItem (){
    allItems.push(new item(Math.round(Math.random() * 800),(Math.round(Math.random() * 600))));
    characterPower = false;
}
function spawnEnemy (){
    allEnemies.push(new enemy(Math.round(Math.random() * 1000),(Math.round(Math.random() * 1000))));
    if (allEnemies[allEnemies.length - 1].is > .8){
        allEnemies[allEnemies.length - 1].is = allEnemies[allEnemies.length - 1].is - .2;
    }
    if (allEnemies[allEnemies.length - 1].is < .2) {
        allEnemies[allEnemies.length - 1].is = allEnemies[allEnemies.length - 1].is + .2;
    }
}
function despawnItem (i){
    xdiff = characterCoords.x - allItems[i].x;
    ydiff = characterCoords.y - allItems[i].y;
    if (xdiff < 5 && ydiff < 5 && xdiff > -5 && ydiff > -5){
        characterPower = true;
        setTimeout(spawnItem,5000);
        allItems.splice(i,1);
    }
}
function scorecounter (){
    document.getElementById("scorecounter").innerHTML = "Score: " + score;
}
function despawnEnemy (i) {
    let xdiff = characterCoords.x - allEnemies[i].x;
    let ydiff = characterCoords.y - allEnemies[i].y;
    if (characterPower == true && xdiff < 5 && ydiff < 5 && xdiff > -5 && ydiff > -5){
        score ++;
        scorecounter();
        allEnemies.splice(i,1);
        for(let t = 0; t < 2; t++){
            spawnEnemy();
        }
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
    else if(e.key == "e" || e.key == "KeyE"){
        spawnEnemy();
    }
}
//Repeats gameLogic every 10 miliseconds
setInterval(gameLogic, 10);