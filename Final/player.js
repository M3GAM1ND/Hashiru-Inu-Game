import { Sitting,Running,Jumping,Falling,Rolling,Diving,Hit,Dead } from "./playerState.js";
import { Collision } from "./collision.js";
import { FloatingMsg } from "./utility.js";
export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height  = 91.3;
        this.x=0;
        this.y=this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = player;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        // this.restrict = false;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game)
        , new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game),new Dead(this.game)];
    }
    update(input,deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        //x axis
        this.x += this.speed;
        if (input.includes("ArrowRight") && (this.currentState !== this.states[6]) && (this.currentState !== this.states[7])) 
        this.speed= this.maxSpeed;
        else if (input.includes("ArrowLeft") && (this.currentState !== this.states[6]) && (this.currentState !== this.states[7]))
         this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x<0) this.x = 0;
        if (this.x > this.game.width-this.width) this.x = this.game.width-this.width;
        // y axis
        // if (input.includes("ArrowUp") && this.onGround()) this.vy -=20;
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy=0;
        if(this.y > this.game.height - this.height - this.game.groundMargin)
        this.y = this.game.height - this.height - this.game.groundMargin
        // animation
        if(this.frameTimer >this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++ ;
            else if(this.currentState !== this.states[7]) this.frameX = 0;
        }else if(this.currentState !== this.states[7]){
            this.frameTimer += deltaTime;
        } else {this.frameTimer += deltaTime *0.3}
        
    }
    draw(context,context2){
        if(this.game.debug) context.strokeRect (this.x, this.y, this.width, this.height);
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height, this.x, this.y, this.width, this.height);
        if(this.game.gameOver)
        context2.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height, this.x, this.y, this.width, this.height);
    } 
    onGround(){
        return this.y >= this.game.height-this.height- this.game.groundMargin;
    }
    setState(state , speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollision(){
        if(this.game.lives > 0){
        this.game.enemies.forEach(enemy => {
            if(
                enemy.x < this.x + this.width &&
                enemy.x + enemy.drawWidth > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.drawHeight > this.y
            ){  
                enemy.markedForDeletion = true;
                this.game.collisions.push(new Collision(this.game, enemy.x + enemy.drawWidth * 0.5,
                    enemy.y + enemy.drawHeight * 0.5));
                if(this.currentState === this.states[4] || this.currentState === this.states[5] ){
                    this.game.enemiesKilled++;
                    this.game.energy -= 5 ;
                        if(this.game.energy < 0) 
                        this.game.energy = 0 ;
                    this.game.floatingMsg.push(new FloatingMsg("+1 Kill", enemy.x,enemy.y,90,40));
                }else{
                    this.setState(6,0);
                    this.game.lives--;
                    if(this.game.lives <= 0) this.game.gameOver = true;
                }
                
            }
        });
        this.game.enemyHorde.forEach(enemy => {
            if(
                enemy.x < this.x + this.width &&
                enemy.x + enemy.drawWidth > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.drawHeight > this.y 
            ){  
                // enemy.markedForDeletion = true;
                // this.game.collisions.push(new Collision(this.game, enemy.x + enemy.drawWidth * 0.5,
                //     enemy.y + enemy.drawHeight * 0.5));
                if(this.currentState === this.states[4] || this.currentState === this.states[5] ){
                    // this.game.enemiesKilled++;
                    this.game.energy -= 5 ;
                        if(this.game.energy < 0) 
                        this.game.energy = 0 ;
                    // this.game.floatingMsg.push(new FloatingMsg("+1 Kill", enemy.x,enemy.y,90,40));
                }else{
                    this.setState(6,0);
                    this.game.lives--;
                    if(this.game.lives <= 0) this.game.gameOver = true;
                }
                
            }
        });
    }
}
}