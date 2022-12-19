const COLLISION_TYPE = {
    SQUARES: 0,
    CIRCLE: 1,
    POLYGON: 2
};
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
        const managerPhysic = cc.director.getPhysicsManager();
        managerPhysic.gravity = cc.v2 (0, 0);
        managerPhysic.enabled = true;
        managerPhysic.debugDrawFlags = 1;
        manager.enabled = true;
        manager.enabledDrawBoundingBox = true;
        manager.enabledDebugDraw = true;

        this.setupCollidableLayer();
    },

    setupCollidableLayer(){
        this._layerCollidable = this.mapTmx.getObjectGroup("ColliderObject");
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
        cc.log("::Create Collider Polygon::", object);
        const listPoints = [...object.points];
        const nodeCollider = cc.instantiate(this.colliderZonePrefab);
        const colliderComp = nodeCollider.addComponent(cc.PhysicsPolygonCollider);
        const RBcomp = nodeCollider.getComponent(cc.RigidBody);
        this._layerCollidable.node.addChild(nodeCollider);
        nodeCollider.setPosition(cc.v2(object.offset.x, -object.offset.y));
        RBcomp.type = 0;
        // Change Object to Vector
        for(let i = 0; i < listPoints.length; i++){
            listPoints[i] = cc.v2(listPoints[i].x, listPoints[i].y);
        }
        colliderComp.points = listPoints;
        colliderComp.apply();
    },

    createSquaresCollider(object){
        cc.log("::Create Collider Squares::", object);
        const width = object.width;
        const height = object.height;
        const nodeCollider = cc.instantiate(this.colliderZonePrefab);
        const colliderComp = nodeCollider.addComponent(cc.PhysicsBoxCollider);
        const RBcomp = nodeCollider.getComponent(cc.RigidBody);
        this._layerCollidable.node.addChild(nodeCollider);
        nodeCollider.setPosition(cc.v2(object.offset.x + width/2, - (object.offset.y + height / 2)));
        colliderComp.size.width = width;
        colliderComp.size.height = height;
        RBcomp.type = 0;
        colliderComp.apply();
    },

    // createCircleCollider(object){
       
    // },
});
