var GameView = /** @class */ (function () {
    function GameView() {
    }
    GameView.instance = function () {
        if (this._instance == null) {
            this._instance = new GameView();
        }
        return this._instance;
    };
    GameView.prototype.pushUI = function (ui) {
        if (!this.uiArray) {
            this.uiArray = [];
        }
        this.uiArray.push(ui);
    };
    //打开ui(模态)
    GameView.prototype.openView = function (uiName, isBg) {
        if (isBg === void 0) { isBg = true; }
        if (this.uiArray) {
            for (var _i = 0, _a = this.uiArray; _i < _a.length; _i++) {
                var ui_1 = _a[_i];
                ui_1.removeSelf();
                ui_1.destroy();
            }
        }
        var ui;
        if (uiName == GameView.COMMON_VIEW) {
            ui = new view.CommonView();
            ui.x = SpriteUtil.stageCenterX - ui.width / 2;
            ui.y = SpriteUtil.stageCenterY - ui.height / 2;
        }
        if (ui != undefined) {
            this.pushUI(ui);
            if (!this.bgAlpha) {
                this.bgAlpha = SpriteUtil.createRect(SpriteUtil.stageWidth, SpriteUtil.stageHeight, "#000000");
                this.bgAlpha.alpha = 0.7;
                this.bgAlpha.size(SpriteUtil.stageWidth, SpriteUtil.stageHeight);
                this.bgAlpha.on("click", this, this.closeView);
            }
            if (isBg) {
                Game.instance().addMiddle(this.bgAlpha);
                Game.instance().addMiddle(ui);
            }
        }
    };
    //
    GameView.prototype.closeView = function () {
        for (var _i = 0, _a = this.uiArray; _i < _a.length; _i++) {
            var ui = _a[_i];
            ui.removeSelf();
            ui.destroy();
        }
        if (this.bgAlpha) {
            this.bgAlpha.removeSelf();
        }
    };
    GameView.prototype.showDemoView = function () {
        if (!this._demoView) {
            this._demoView = new view.CommonView();
        }
        Game.instance().addMiddle(this._demoView);
    };
    GameView._instance = null;
    GameView.COMMON_VIEW = "commonView";
    return GameView;
}());
//# sourceMappingURL=GameView.js.map