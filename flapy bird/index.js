const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const score = document.querySelector('score');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight

function getRandomint(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max - min)+ min);
}

const birdimg = new Image();
birdimg.src = 'kus.png';
let bird ={
    x:50,
    y:150,
    w:50,
    h:35,
    dy:2,
}

document.addEventListener("keydown",(e)=> {
    if(e.keyCode === 32){
        birdMove();
    }
})
function birdMove(){
    bird.y -= 50;
}
function birdGravity(){
    bird.y += bird.dy;
}


function renderBird(){
    ctx.drawImage(birdimg, bird.x, bird.y, bird.w, bird.h);

}
const pipe1img = new Image();
pipe1img.src = 'pipe1.png';
const pipe2img = new Image();
pipe2img.src = 'pipe2.png';

let pipesArr=[];
let timer = 0;

function renderpipes(){
    timer++;
    if(timer %100 === 0){

        pipesArr.push({
            x: 900,
            y: getRandomint(150,300),
            w: 80,
            h: 350,
        })

    }
        for(let i in pipesArr) {
            ctx.drawImage(pipe1img, pipesArr[i].x, pipesArr[i].y, pipesArr[i].w, pipesArr[i].h);
            ctx.drawImage(pipe2img, pipesArr[i].x, pipesArr[i].y - 470, pipesArr[i].w, pipesArr[i].h);
    }
    updatePipes();
    deletePipes();
    birdCollision();


    
    }
function updatePipes(){
    for(let i in pipesArr){
        pipesArr[i].x -= 5;
    }
}
function deletePipes(){
    for(let i in pipesArr){
        if(pipesArr[i].x <= -50){
            pipesArr.splice(i,1);
        }
            
        
    }

}
function birdCollision(){
    for(let i in pipesArr){
        if(pipesArr[i].x <= bird.x + bird.w
            && pipesArr[i].y <= bird.y + bird.h){
                location.reload();
        }

    }
}
let scoreValue = 0;

function updateScore() {
    score.innerHTML = scoreValue;
    for(let i in pipesArr) {
        if(pipesArr[i].x === 0) {
            scoreValue++;
        }
    }
}


function game(){
    update();
    render();
    requestAnimationFrame(game)
   
    

}
requestAnimationFrame(game)

function update(){
    birdGravity();
    
}
function render(){
ctx.clearRect(0, 0,canvas.width, canvas.height);
ctx.beginPath();
renderBird();
renderpipes();
ctx.closePath();


}
