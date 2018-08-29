
cc.Class({
    extends: cc.Component,

    properties: {
        bg : {
            type:cc.Sprite,
            default:null
        },
        joystickPrefab:
        {
            type:cc.Prefab,
            default:null
        },
        testInfo:{
            type: cc.Label,
            default: null 
        }
    },

    // LIFE-CYCLE CALLBACKS:
    _initJoyStick:function(){
        this.joyStick = cc.instantiate(this.joystickPrefab);
        this.joyStick.parent = this.node;
        this.joyStick.x = 0;
        this.joyStick.y = 0;
        this.joyStick.active = false;
        this.joyStick.getComponent("JoyStick").game = this;
    },
    _initTouchEvent:function() {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
                self._touchStartEvent(event);
        });
        self.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                self._touchMoveEvent(event);
        });
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
                self._touchEndEvent(event);
        });
        self.node.on(cc.Node.EventType.TOUCH_END, function (event) {
                self._touchEndEvent(event);
        });
    },
    _touchStartEvent:function(event) {
        var pt = event.getLocation();
		var pos = this.node.convertToNodeSpaceAR(pt); 
		this.joyStick.setPosition(pos);
		this.joyStick.active = true;
		this.joyStick.getComponent("JoyStick").moveStart();
    },
    _touchMoveEvent:function(event) {
        var pt = event.getLocation();
		var pos2 = this.joyStick.convertToNodeSpaceAR(pt); 
		this.joyStick.getComponent("JoyStick").setInPos(pos2);
    },
    _touchEndEvent:function(event) {
        this.joyStick.getComponent("JoyStick").moveEnd();
        this.joyStick.active = false;
    },

    onLoad:function () {
        this._initJoyStick();  
        this._initTouchEvent();
    },

    start:function () {

    },

    onJoyStick:function(event){
        cc.log("event ", JSON.stringify(event));

        this.testInfo.string  = JSON.stringify(event);
    }

    // update (dt) {},
});
