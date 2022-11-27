const COLLISION_TYPE = {
    CIRCLE: 0,
    SQUARES: 1,
    POLYGON: 2
}
cc.Class({
    extends: cc.Component,

    properties: {
        mapTmx: cc.TiledMap,
        colliderZonePrefab: cc.Prefab,
        _listColliderLayer: [],
        _layerCollidable: null
    },

    onLoad(){
        const manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        
        this.setupCollidableLayer();
    },

    setupCollidableLayer(){
        this._layerCollidable = this.mapTmx.getObjectGroup("ColliderObject")
        if(!this._layerCollidable){
            cc.error("No Layer Collidable");
            return;
        }
        this._layerCollidable.node.anchorX = 0;
        this._layerCollidable.node.anchorY = 1;
        const posX = -this._layerCollidable.node.width / 2;
        const posY = this._layerCollidable.node.height / 2;
        this._layerCollidable.node.setPosition(posX, posY);
        this.createCollision();
    },

    createCollision(){
        const listCollisions = this._layerCollidable.getObjects();
        for(let i = 0; i < listCollisions.length; i++){
            switch(listCollisions[i].type){
                case COLLISION_TYPE.CIRCLE:
                    this.createCircleCollider(listCollisions[i]);
                    break;
                case COLLISION_TYPE.SQUARES:
                    this.createSquaresCollider(listCollisions[i]);
                    break;
                case COLLISION_TYPE.POLYGON:
                    this.createPolygonCollider(listCollisions[i]);
                    break;
            }
        }
    },

    createPolygonCollider(object){
        const listPoints = object.points;
        const nodeCollider = cc.instantiate(this.colliderZonePrefab);
        this._layerCollidable.node.addChild(nodeCollider);
        nodeCollider.setPosition(cc.v2(object.offset.x, -object.offset.y));
        const colliderComp = nodeCollider.addComponent(cc.PolygonCollider);
        colliderComp.points = listPoints;
    },

    createSquaresCollider(object){
        cc.warn(object);
    },

    createCircleCollider(object){
        cc.warn(object);
    },

});
