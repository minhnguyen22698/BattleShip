
cc.Class({
    extends: cc.Component,

    properties: {
        mapTmx: cc.TiledMap,
        _listColliderLayer: [],
        _layerCollidable: null
    },

    onLoad(){
        const manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        
        this._layerCollidable = this.mapTmx.getObjectGroup("ColliderObject")
        
        // cc.warn(this.mapTmx);
        // cc.warn(this._layerCollidable);
    },

    start(){
        this.getCollidableLayer();
    },

    getCollidableLayer(){
        const listCollisions = this._layerCollidable.getObjects();
        for(let i = 0; i < listCollisions.length; i++){
            this.createCollision(listCollisions[i]);
        }
    },

    createCollision(object){
        cc.warn("object:", object)
        const listPoints = object.points;
        const listWorldPoints = [];
        const listNodePoints = [];
        for(let i = 0; i < listPoints.length; i++){
            listPoints[i].z = 0;
            const newPoint = this.node.convertToWorldSpaceAR(listPoints[i]);
            listWorldPoints.push(newPoint);
        }
        for(let i = 0; i < listWorldPoints.length; i++){
            const newPoint = this._layerCollidable.node.convertToNodeSpaceAR(listPoints[i]);
            listNodePoints.push(newPoint);
        }
        const colliderComp = this._layerCollidable.node.addComponent(cc.PolygonCollider);
        colliderComp.points = listNodePoints;
        cc.warn("listWorldPoints:", listNodePoints);
    }

});
