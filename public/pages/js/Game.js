var Game = /** @class */ (function () {
    function Game() {
    }
    Game.instance = function () {
        if (this._instance == null) {
            this._instance = new Game();
        }
        return this._instance;
    };
    Game.prototype.setStage = function (stage) {
        this._stage = stage;
        SpriteUtil.stageWidth = stage.designWidth;
        SpriteUtil.stageHeight = stage.designHeight;
        SpriteUtil.stageCenterX = SpriteUtil.stageWidth / 2;
        SpriteUtil.stageCenterY = SpriteUtil.stageHeight / 2;
        this._bottom = new Laya.Sprite();
        stage.addChild(this._bottom);
        this._middle = new Laya.Sprite();
        stage.addChild(this._middle);
        this._top = new Laya.Sprite();
        stage.addChild(this._top);
        this.gotoGame();
    };
    Object.defineProperty(Game.prototype, "chickenFarm", {
        get: function () {
            return this._gameDemo;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.addBottom = function (display) {
        if (this._bottom.contains(display))
            return;
        this._bottom.addChild(display);
    };
    Game.prototype.addMiddle = function (display) {
        if (this._middle.contains(display))
            return;
        this._middle.addChild(display);
    };
    Game.prototype.addTop = function (display) {
        if (this._top.contains(display))
            return;
        this._top.addChild(display);
    };
    //
    Game.prototype.gotoGame = function () {
        if (!this._gameDemo) {
            this._gameDemo = new GameDemo();
            this.addBottom(this._gameDemo);
        }
        this._gameDemo.gotoGame();
    };
    Game._instance = null;
    return Game;
}());
//# sourceMappingURL=Game.js.map