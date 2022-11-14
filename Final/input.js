export class InputHandler{
    constructor(game){
    this.game = game;
    this.keys=[];
    window.addEventListener("keydown",e =>{
        if((e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "s"
        )&& this.keys.indexOf(e.key)=== -1){
            if(e.key === "ArrowDown"){
            this.keys.splice(0,2)
            this.keys.push("ArrowDown");}
            else if (!this.keys.includes("ArrowDown"))
            this.keys.push(e.key);
        } else if (e.key === 'd') this.game.debug = !this.game.debug;
        console.log(this.keys);
    });
    window.addEventListener("keyup",e =>{
        if(e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "s"
        ){
            this.keys.splice(this.keys.indexOf(e.key),1);
        }
        console.log(this.keys);
    });
  }
}