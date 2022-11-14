export class Collision{
    constructor(game, x,y){
        this.game=game;
        this.image = boom;
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.sizeModifier = Math.random()+0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width *0.5;
        this.y = y - this.height *0.5;
        this.farmeX = 0;
        this.maxFrame = 4;
        this.markedForDeletion = false;
        this.fps = Math.random() * 10 + 5;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }
    draw(context){
        context.drawImage(this.image, this.farmeX * this.spriteWidth,0,this.spriteHeight,this.spriteWidth,
            this.x,this.y,this.width,this.height);
    }
    update(deltaTime){
        this.x -= this.game.speed;
        if(this.frameTimer > this.frameInterval){
            this.farmeX++;
        }else{
            this.frameTimer += deltaTime;
        }
        
        if(this.farmeX > this.maxFrame)
        this.markedForDeletion = true;
    }
}
