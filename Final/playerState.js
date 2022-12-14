import {Dust, Fire, Splash} from "./Particle.js";
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const dead = document.getElementById("dead");
const fire = document.getElementById("fire_sound");
const dive = document.getElementById("dive");

const states = {
    SITTING : 0 ,
    RUNNING : 1 ,
    JUMPING : 2 ,
    FALLING : 3 ,
    ROLLING : 4 ,
    DIVING : 5,
    HIT : 6,
    DEAD : 7
}

class State{
    constructor(state , game){
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends State {
    constructor(game){
        super("SITTING", game);
    }
    enter(){
        this.game.player.frameX=0;
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 5;
        // ctx.globalAlpha=1;
        // this.game.player.maxFrame = 11;
        // this.game.player.frameY = 8;
    }
    handleInput(input){
        if (input.includes("ArrowLeft") || input.includes("ArrowRight")){
            this.game.player.setState(states.RUNNING,1);
        } 
        else if (input.includes("s") && this.game.energy > 0){
            this.game.player.setState(states.ROLLING,2);
        }else if (this.game.lives == 0){
            this.game.player.setState(states.DEAD,0); 
        }
    }
}
export class Running extends State {
    constructor(game){
        super("RUNNING", game);
    }
    enter(){
        this.game.player.frameX=0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 3;
    }
    handleInput(input){
        this.game.particles.unshift(new Dust(this.game,this.game.player.x,this.game.player.y));
        if (input.includes("ArrowDown")){
            this.game.player.setState(states.SITTING,0);
        }
        else if (input.includes("ArrowUp")){
            this.game.player.setState(states.JUMPING,1);
        }else if (input.includes("s") && this.game.energy > 0){
            this.game.player.setState(states.ROLLING,2);
        }else if (this.game.lives == 0){
            this.game.player.setState(states.DEAD,0); 
        }
    }
}
export class Jumping extends State {
    constructor(game){
        super("JUMPING",game);
    }
    enter(){
        if (this.game.player.onGround()) this.game.player.vy -= 27;
        this.game.player.frameX=0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 1;
    }
    handleInput(input){
        if (this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING,1);
        }else if (input.includes("s") && this.game.energy > 0){
            this.game.player.setState(states.ROLLING,2);
        }
        else if (input.includes("ArrowDown") && this.game.energy > 0){
            this.game.player.setState(states.DIVING,0);
        }else if (this.game.lives == 0){
            this.game.player.setState(states.DEAD,0); 
        }
    }
}
export class Falling extends State {
    constructor(game){
        super("FALLING" , game);
    }
    enter(){
        this.game.player.frameX=0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 2;  
    }
    handleInput(input){
        if (this.game.player.onGround()){
            this.game.player.setState(states.RUNNING,1);
        }
        else if (input.includes("ArrowDown")&& this.game.energy > 0){
            this.game.player.setState(states.DIVING,0);
        }else if (this.game.lives == 0){
            this.game.player.setState(states.DEAD,0); 
        }
    }
}
export class Rolling extends State {
    constructor(game){
        super("ROLLING", game);
    }
    enter(){
        this.game.player.frameX=0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6; 
    }
    handleInput(input){
        if(this.game.energy > 0){
            fire.loop = true;
            fire.play();
        this.game.particles.unshift(new Fire(this.game,this.game.player.x + this.game.player.width *0.5,this.game.player.y + this.game.player.height *0.5));
        if (!input.includes("s") && this.game.player.onGround()){
            fire.loop=false;
            fire.pause();
            this.game.player.setState(states.RUNNING,1);
        } else if (!input.includes("s") && !this.game.player.onGround()){
            fire.loop=false;
            this.game.player.setState(states.FALLING,1);
        } else if (input.includes("s") && this.game.player.onGround() && input.includes("ArrowUp")){
            this.game.player.vy -=27
        }
        else if (input.includes("ArrowDown") && !this.game.player.onGround() && this.game.energy > 0){
            fire.loop=false;
            this.game.player.setState(states.DIVING,0);
        }
      }else{ this.game.player.setState(states.RUNNING,1);
        fire.loop=false;}
    }
}
export class Diving extends State {
    constructor(game){
        super("DIVING", game);
    }
    enter(){
        this.game.player.frameX=0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6; 
        this.game.player.vy = 15; 
    }
    handleInput(input){
        this.game.particles.unshift(new Fire(this.game,this.game.player.x + this.game.player.width *0.5,this.game.player.y + this.game.player.height *0.5));
        if (this.game.player.onGround()){
            dive.cloneNode(true).play();
            this.game.player.setState(states.SITTING,0);
            for (let i = 0; i < 30; i++){
            this.game.particles.unshift(new Splash(this.game,this.game.player.x + this.game.player.width * 0.5,this.game.player.y +this.game.player.height ));
            }
        } 
        else if (input.includes("s") && this.game.player.onGround()){
            this.game.player.setState(states.ROLLING,2);
        }
    }
}
export class Hit extends State {
    constructor(game){
        super("HIT", game);
    }
    enter(){
        this.game.player.frameX=0;
        this.game.player.maxFrame = 10;
        this.game.player.frameY = 4;
        hit.play();
    }
    handleInput(input){
        fire.pause();
        this.game.particles.unshift(new Dust(this.game,this.game.player.x,this.game.player.y));
        if(this.game.player.frameX >= 10 && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING,1);
        }else if (this.game.player.frameX >= 10 && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING,1);
        }else if (this.game.lives <= 0){
            this.game.player.setState(states.DEAD,0); 
        }
    }
}
export class Dead extends State {
    constructor(game){
        super("DEAD", game);
    }
    enter(){
        this.game.player.frameX=0;
        this.game.player.maxFrame = 11;
        this.game.player.frameY = 8;
        dead.play();
        dead.volume=0.5;
    }
    handleInput(input){
        if(this.game.player.frameX == 11){
            this.game.player.frameX=11
            if(this.game.gameOver)
            this.game.continue=true;
            ctx.globalAlpha=this.game.alpha;
        }
        // this.game.particles.unshift(new Dust(this.game,this.game.player.x,this.game.player.y));
        // if(this.game.player.frameX >= 10 && this.game.player.onGround()){
        //     this.game.player.setState(states.RUNNING,1);
        // }else if (this.game.player.frameX >= 10 && !this.game.player.onGround()){
        //     this.game.player.setState(states.FALLING,1);
        // }
    }
}