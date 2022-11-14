export class Utility{
    constructor(game){
        this.game = game;
        this.fontSize = 25 ;
        this.fontFamily = "Eater";
        this.lives = lives;
    }
    draw(context,context2){
        context2.save();
        context2.shadowOffsetX=2;
        context2.shadowOffsety=2;
        context2.shadowColor="White";
        context2.shadowBlur=0; 
        context2.font = this.fontSize + "px " + this.fontFamily;
        context2.textAlign = "left";
        context2.fillStyle = this.game.fontColor;
        context2.fillText("Kills: " + this.game.enemiesKilled, 22, 40);
        //m3
        //timer
        // context2.font=this.fontSize + "px " + this.fontFamily;
        // context2.fillText("Time: " + (this.game.time*0.001).toFixed(0), 20, 65);
        //energy
        context2.font=this.fontSize + "px " + this.fontFamily;
        context2.fillText("Energy: " + (this.game.energy), 20, 80);
        for(let i=0; i<this.game.lives;i++){
            context2.drawImage(this.lives,25*i+20,100,25,25);
        }//m3
        if(this.game.gameOver){
            context2.textAlign = "center";
            context2.font = this.fontSize * 3 + "px "+this.fontFamily;
            if(this.game.gameOver){
                context2.fillText("Yare Yare Daze", this.game.width * 0.5, this.game.height *0.5 - 20);
                context2.font = this.fontSize  + "px " + this.fontFamily;
                context2.fillText("Score :  " +this.game.enemiesKilled, this.game.width * 0.5, this.game.height *0.5 +40);
                context2.fillText("Refresh to Try Agian", this.game.width * 0.5, this.game.height *0.5 +80);
            }
        }
        context2.restore();
    }
}
export class FloatingMsg{
    constructor(value,x,y,targetX , targetY){
        this.value = value;
        this.x=x;
        this.y=y;
        this.targetX=targetX;
        this.targetY=targetY;
        this.markedForDeletion = false;
        this.timer = 0;
    }
    update(){
        this.x +=(this.targetX-this.x) *0.03;
        this.y +=(this.targetY-this.y) *0.03;
        this.timer++;
        if(this.timer > 100)this.markedForDeletion = true;
    }
    draw(context){
        context.font ="20px Eater";
        context.fillStyle="black";
        context.fillText(this.value,this.x,this.y);
        context.fillStyle="white";
        context.fillText(this.value,this.x + 2,this.y + 2);
    }
}