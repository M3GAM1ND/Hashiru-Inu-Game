class Enemy{
    constructor(){
        this.frameX = 0;
        this.framey = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion=false;
    }
    update(deltaTime){
        this.x -= this.speedX + this.game.speed ;
        this.y += this.speedY;
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX=0;
        } else {
            this.frameTimer += deltaTime;
        }
        // if(this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context){
        if(this.game.debug) context.strokeRect (this.x, this.y, this.drawWidth, this.drawHeight);
        context.drawImage(this.image,this.frameX*this.width,0,this.width,this.height, this.x, this.y, this.drawWidth,this.drawHeight)
    }
}

export class FlyingEnemy extends Enemy{
    constructor(game,enemy){
        super();
        this.game = game;
        this.width =this.drawWidth= 60;
        this.height = this.drawHeight=44;
        this.x =this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() *2;
        this.speedY=0;
        this.maxFrame=5;
        this.image= enemy_fly;
        this.angle = 0;
        this.va = Math.random() * 0.05 + 0.01;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class GroundEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = this.drawWidth= 60;
        this.height = this.drawHeight= 87;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = enemy_plant;
        this.speedX=0;
        this.speedY=0;
        this.maxFrame = 1;
    }
}

export class EnemyHorde extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 213;
        this.height = 212;
        this.drawWidth = this.width*0.3;
        this.drawHeight = this.height*0.3;
        this.x = 0 - Math.random() * this.game.width-this.drawWidth*0.5;
        // this.y = this.game.height - Math.random() * this.game.height - 2*this.drawHeight;
        this.y = Math.random()*(this.game.height-this.drawHeight);
        this.image = enemy_spinner;
        if(!this.game.gameOver)
        this.speedX=-3;
        else
        this.speedX= -2;
        this.speedY= Math.random()*10 - 5;
        this.maxFrame = 8;
        // this.angle = 0;
        // this.va = Math.random() * 0.5 + 0.5;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.x -= this.speedX ;
        // this.angle += this.va;
        // this.y += Math.sin(this.angle);
        if(this.y < 0|| this.y > this.game.height-this.drawHeight)
        this.speedY = -this.speedY;
    }
    draw(context,context2){
        if(this.game.debug) context.strokeRect (this.x, this.y, this.drawWidth, this.drawHeight);
        context2.drawImage(this.image,this.frameX*this.width,0,this.width,this.height, this.x, this.y, this.drawWidth,this.drawHeight)
    }
}

export class ClimbingEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 310;
        this.height = 175;
        this.drawWidth = this.width*0.3;
        this.drawHeight = this.height*0.3;
        this.x = this.game.width;
        this.y = Math.random()* this.game.height *0.5;
        this.image = enemy_spider_big;
        this.speedX=0;
        this.speedY=Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5;
    }
    update(deltaTime){
        super.update(deltaTime);
        if(this.y > this.game.height - this.height - this.game.groundMargin)
        this.speedY = -1;
        if(this.y < -this.height) this.markedForDeletion = true;
    }
    draw(context){
        super.draw(context);
        context.beginPath();
        context.moveTo(this.x + this.drawWidth*0.5,0)
        context.lineTo(this.x + this.drawWidth*0.5, this.y +10);
        context.stroke();
    }
}