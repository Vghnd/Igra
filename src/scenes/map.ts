import mapJSON from '../assets/map.json'
import { TILES,SIZES, LAYERS, SPRITES } from '../utils/constants';
import {Player} from '../entities/player'
export class Map extends Phaser.Scene{
    private player?: Player;
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
    }
    create(){
        const map = this.make.tilemap({key: "map1"});
        const tileset = map.addTilesetImage(mapJSON.tilesets[0].name,TILES.MAP,SIZES.TILE,SIZES.TILE);
        const ledLayer = map.createLayer(LAYERS.LED,tileset,0,0);
        const wallsLayer = map.createLayer(LAYERS.WALLS,tileset,0,0);


        this.player = new Player(this,400,250,SPRITES.PLAYER)
    }


    update(time: number, delta: number): void {
        this.player.update(delta);
    }
}

