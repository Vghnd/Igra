import mapJSON from '../assets/map.json'
import { TILES,SIZES, LAYERS, SPRITES } from '../utils/constants';
import {Player} from '../entities/player'

import { Muha } from '../entities/muha';

export class Map extends Phaser.Scene{
    private player?: Player;
    private muha?: Muha;
    private muhaText?: Phaser.GameObjects.Text;
    private victoryText?: Phaser.GameObjects.Text;
    private xKey?: Phaser.Input.Keyboard.Key;
    constructor(){
        super('MapScene');
    }
    preload(){
        this.load.image(TILES.MAP,'src/assets/Winter_Tiles.png')
        this.load.tilemapTiledJSON('map1','src/assets/map.json')
        this.load.spritesheet(SPRITES.PLAYER,"src/assets/characters/alliance.png",{
            frameWidth:SIZES.Player.WIDTH,
            frameHeight:SIZES.Player.HEIGHT
        })
       
        this.load.spritesheet(SPRITES.MUHA,"src/assets/characters/muha.gif",{
            frameWidth:SIZES.Muha.WIDTH,
            frameHeight:SIZES.Muha.HEIGHT
        })
    }
    create(){
        const map = this.make.tilemap({key: "map1"});
        const tileset = map.addTilesetImage(mapJSON.tilesets[0].name,TILES.MAP,SIZES.TILE,SIZES.TILE);
        const ledLayer = map.createLayer(LAYERS.LED,tileset,0,0);
        const wallsLayer = map.createLayer(LAYERS.WALLS,tileset,0,0);

        this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        
       

        this.player = new Player(this,400,250,SPRITES.PLAYER)
       
        this.muha = new Muha(this,400,250,SPRITES.MUHA)
       
        this.matter.world.add(this.player); 
        
        this.matter.world.add(this.muha); 
        
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.muhaText = this.add.text(this.muha.x, this.muha.y - 50, 'Нажмите X', { fontSize: '16px' }).setOrigin(0.5);
        this.muhaText.setVisible(false);
        this.victoryText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Победа', { fontSize: '32px' }).setOrigin(0.5);
        this.victoryText.setVisible(false);

        this.xKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        

        
    }


    update(time: number, delta: number): void {
        this.player.update(delta);
        
        this.muha.update(delta);
        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.muha.x, this.muha.y);
        
        if (distance < 100) { 
            this.muhaText.setVisible(true);
        } else {
            this.muhaText.setVisible(false);
            this.victoryText.setVisible(false); 
        }

        
        if (this.xKey && this.xKey.isDown && distance < 100) {
            this.victoryText.setVisible(true); 
        }
    }
    
}

