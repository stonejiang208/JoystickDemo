

cc.Class({
    extends: cc.Component,

    properties: {
        outSprite : {
            type: cc.Sprite,
            default: null
        },
        inSprite : {
            type: cc.Sprite,
            default: null
        }
    },

    start:function () {

    },
    moveStart:function(){
      
    },
    moveEnd:function(){
        this.inSprite.node.setPosition(cc.Vec2.ZERO);
        this.game.onJoyStick({angle:"0",speed:"0"});
    },
    setInPos:function(pos){
        var angle = Math.atan2(pos.y,pos.x);  
	    var radius = Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2));
        var maxRadius = this.outSprite.node.width / 2;
        if(radius >  maxRadius) {
            radius = maxRadius;
        }

        var posX = Math.cos(angle) * radius;
        var posY = Math.sin(angle) * radius;  
     
        this.inSprite.node.setPosition(posX,posY);
        var speed = radius/maxRadius;
        var action = {angle:angle.toFixed(6),speed:speed.toFixed(6)};
        this.game.onJoyStick(action);
    }
    // update (dt) {},
});
