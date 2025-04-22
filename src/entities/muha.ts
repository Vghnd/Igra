import { Entity } from "./entity";
import { SPRITES } from "../utils/constants";
export class Muha extends Entity{
    textureKey: string;
        constructor(scene: Phaser.Scene, x: number, y: number,texture: string, type?: string){
            super(scene,x,y,texture,SPRITES.MUHA)
}


update(delta: number) {
    const keys = Phaser.Math.Between(0, 3);
    if(keys === 0){
        this.setPosition(this.x,this.y - delta* 0.1 )
        
    }else if(keys === 1){
       
        this.setPosition(this.x,this.y + delta* 0.1)
    }else if(keys === 2){
        
        this.setPosition(this.x - delta* 0.1,this.y)
    }else if(keys === 3){
        
        this.setPosition(this.x + delta* 0.1,this.y)
    }

   
}

}


