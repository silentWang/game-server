var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RatItem = /** @class */ (function (_super) {
    __extends(RatItem, _super);
    function RatItem() {
        var _this = _super.call(this) || this;
        _this.isShow = false;
        _this.autoSize = true;
        _this.mouseEnabled = true;
        _this.init();
        return _this;
    }
    RatItem.prototype.init = function () {
        var blank = SpriteUtil.createCircle(100, "#000000");
        var full = SpriteUtil.createSheetImage("demo/mouse.png");
        var mask = SpriteUtil.createRect(210, 180);
        full.y = 150;
        this.addChild(blank);
        this.addChild(full);
        var hm = SpriteUtil.createSheetImage("demo/hg.png");
        hm.y = -50;
        this.addChild(hm);
        this.heamer = hm;
        hm.visible = false;
        mask.x = 0;
        mask.y = -300;
        full.mask = mask;
        this.ratMask = mask;
        this.rat = full;
        this.hitArea = new Laya.Rectangle(-100, -100, 200, 200);
    };
    RatItem.prototype.show = function () {
        var _this = this;
        if (this.isShow)
            return;
        this.isShow = true;
        this.rat.y = 150;
        Laya.Tween.clearTween(this.rat);
        Laya.Tween.clearTween(this.ratMask);
        Laya.Tween.to(this.rat, { y: 0 }, 300);
        Laya.Tween.to(this.ratMask, { y: 0 }, 300);
        Laya.timer.once(2000, this, function () {
            Laya.Tween.clearTween(_this.rat);
            if (_this.isShow) {
                Laya.Tween.to(_this.ratMask, { y: -_this.rat.height - 50 }, 300);
                Laya.Tween.to(_this.rat, { y: 150 }, 300, null, Laya.Handler.create(_this, function () {
                    _this.isShow = false;
                    Laya.Tween.clearTween(_this.rat);
                }));
            }
        });
    };
    RatItem.prototype.hitIt = function () {
        var _this = this;
        if (!this.isShow)
            return;
        this.heamer.visible = true;
        this.heamer.rotation = 0;
        GameData.userData.score++;
        // GameSound.instance().playSound();
        Laya.Tween.to(this.heamer, { rotation: -90 }, 200, null, Laya.Handler.create(this, function () {
            _this.isShow = false;
            Laya.Tween.clearTween(_this.heamer);
            Laya.Tween.clearTween(_this.rat);
            Laya.Tween.clearTween(_this.ratMask);
            _this.heamer.visible = false;
            _this.ratMask.y = -_this.rat.height - 50;
            _this.rat.y = 150;
        }));
        // GameLoader.newInstance().loaderMc("bombeff",(mc:egret.MovieClip)=>{
        //     mc.x = -80;
        //     mc.y = -90;
        //     this.addChild(mc);
        //     mc.addEventListener(egret.Event.COMPLETE,()=>{
        //         if(mc.parent){
        //             mc.parent.removeChild(mc);
        //         }
        //         mc.stop();
        //         mc = null;
        //     },this);
        //     mc.play(1);
        // });
    };
    return RatItem;
}(Laya.Sprite));
//# sourceMappingURL=RatItem.js.map