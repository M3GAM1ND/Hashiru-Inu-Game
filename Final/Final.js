import {Player} from "./player.js";
import {InputHandler} from "./input.js";
import {Background} from "./Background.js";
import {FlyingEnemy, ClimbingEnemy, GroundEnemy, EnemyHorde} from "./Enemy.js";
import {Utility} from "./utility.js";
window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 500;
    const canvas2 = document.getElementById("canvas2");
    const ctx2 = canvas2.getContext("2d");
    canvas2.width = 1000;
    canvas2.height = 500;
    // let i=1;
    ctx.drawImage(black,1,1);
    ctx.drawImage(title,-75,-60);
    ctx.drawImage(enter,-50,125);
    ctx.drawImage(m3,0,0);
    window.addEventListener("keypress" , e =>{
        if(e.key == "Enter"){
    class Game {
        constructor(width, height){
        this.width = width;
        this.height = height;
        this.groundMargin = 40 ;
        this.speed = 0;
        this.maxSpeed=4;
        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.UI = new Utility(this);
        this.enemies=[];
        this.particles=[];
        this.collisions =[];
        this.floatingMsg = [];
        this.enemyHorde=[];
        this.enemyTimer=0;
        this.enemyInterval = 1000;
        this.debug = false;
        this.score = 0;
        this.enemiesKilled=0;
        this.energy = 500;
        this.fontColor = "black"
        this.time = 0; //m3
        this.hordeTime = 0;
        this.maxTime =1000;//m3
        this.gameOver=false;//m3
        this.lives=5;//m3
        this.player.currentState = this.player.states[0];
        this.player.currentState.enter();
        this.continue=false;
        this.alpha=1;
        }
        update(deltaTime){
            this.time += deltaTime; //m3
            if (this.lives == -1) this.gameOver=true;//m3
            this.background.update();
            this.player.update(this.input.keys,deltaTime);
            //enemies
            if (this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer =0;
                this.enemyInterval -= 10;
                if (this.enemyInterval <= 250) this.enemyInterval = 250;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            });
            this.enemyHorde.forEach(horde => {
                horde.update(deltaTime);
            });
            //msg
            this.floatingMsg.forEach(msg => {
                msg.update();
            });
            //particle
            this.particles.forEach((particle, index) =>{
                particle.update();
            });
            if(this.particles.length > 50){
                this.particles = this.particles.slice(0,200);
            }
            //collision
            this.collisions.forEach((collision, index)=>{
                collision.update(deltaTime);
            });
            if(this.player.currentState === this.player.states[5] || this.player.currentState === this.player.states[4])
            {this.energy--;
                if (this.energy < 0)
                {this.energy=0;
                }
            } else if(this.player.currentState === this.player.states[0] ){
                this.energy++;
                this.hordeTime++;
                if(this.energy > 500)
                    this.energy = 500;
            } else {this.hordeTime = 0;
            }
            this.floatingMsg=this.floatingMsg.filter(msg => !msg.markedForDeletion);
            this.enemies=this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.particles=this.particles.filter(particle => !particle.markedForDeletion);
            this.collisions=this.collisions.filter(collision => !collision.markedForDeletion);
            if(this.gameOver)
            this.alpha -= 0.003;
        }
        draw(context,context2){
            this.background.draw(context);
            this.player.draw(context,context2);
            // enemies
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            //horde
            this.enemyHorde.forEach(horde => {
                horde.draw(context,context2);
            });
            //msg
            this.floatingMsg.forEach(msg => {
                msg.draw(context);
            });
            //particle
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            //collison
            this.collisions.forEach(collision => {
               collision.draw(context);
            });
            this.UI.draw(context,context2);
        }
        addEnemy(){
            if(this.speed >0 && Math.random() < 0.5)
            this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0)
            this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
            if(this.hordeTime > 250)
            this.continue = true;
            if(this.continue == true){
            for(let x=0 ; x <40 ; x++){
            this.enemyHorde.push(new EnemyHorde(this)); }
            }
        }
    }
    const game = new Game(canvas.width,canvas.height);
    let lastTime = 0; 
    const audio = document.getElementById("game_audio");
    function animate(timeStamp){
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx2.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx, ctx2); 
        if(!game.gameOver)
        audio.play();
        // else
        //  audio.pause();
        requestAnimationFrame(animate);
    }
    animate(0);
}
    });
});