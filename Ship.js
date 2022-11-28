cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad(){
        this.isMoving = false;
        this.isRotatingLeft = false;
        this.isRotatingRight = false;
        this.bindEvents();
    },

    bindEvents(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    start () {

    },

    onKeyDown: function(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.w:
                {
                    this.isMoving = true;   
                    break;
                }     
            case cc.macro.KEY.a:
                {
                    this.isRotatingLeft = true;
                    break;
                }
            case cc.macro.KEY.d:        
                {
                    this.isRotatingRight = true;
                    break;
                }
            default:{}
        }
    },

    onKeyUp: function(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.w:
                {
                    this.isMoving = false;   
                    break;
                }     
            case cc.macro.KEY.a:
                {
                    this.isRotatingLeft = false;
                    break;
                }
            case cc.macro.KEY.d:        
                {
                    this.isRotatingRight = false;
                    break;
                }
            default:{}
        }
    },

    update(delta){
        if(this.isMoving){
            this.node.y +=1;
        }

        if(this.isRotatingLeft && !this.isRotatingRight){
            this.node.angle +=0.1;
        }
        
        if(this.isRotatingRight && !this.isRotatingLeft){
            this.node.angle -=0.1;
        }
    }

});
