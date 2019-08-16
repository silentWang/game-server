//游戏工具类
var GameUtil = /** @class */ (function () {
    function GameUtil() {
    }
    //tips toast
    GameUtil.showTips = function (str, time) {
        var _this = this;
        if (str === void 0) { str = ""; }
        if (time === void 0) { time = 800; }
        if (!str)
            return;
        if (!this.toastSprite) {
            var bg = SpriteUtil.createRoundRect(480, 100, 16, "#000000");
            bg.alpha = 0.7;
            var sprite = new Laya.Sprite();
            sprite.x = SpriteUtil.stageCenterX - 225;
            sprite.y = SpriteUtil.stageCenterY - 160;
            sprite.addChild(bg);
            var txt = SpriteUtil.createText(str, 32, "#ffffff", "center");
            txt.width = 480;
            txt.name = "txtstr";
            txt.y = 50 - txt.height / 2;
            sprite.addChild(txt);
            this.toastSprite = sprite;
        }
        Laya.Tween.clearTween(this.toastSprite);
        this.toastSprite.y = SpriteUtil.stageCenterY - 100;
        this.toastSprite.alpha = 0.01;
        this.toastSprite.getChildByName("txtstr")["text"] = str;
        Game.instance().addTop(this.toastSprite);
        var tween = Laya.Tween.to(this.toastSprite, { alpha: 1 }, 200, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(_this.toastSprite, { alpha: 0.01 }, 400, null, Handler.create(_this, function () {
                Laya.Tween.clearTween(_this.toastSprite);
                if (_this.toastSprite && _this.toastSprite.parent) {
                    _this.toastSprite.parent.removeChild(_this.toastSprite);
                }
            }), time);
        }));
    };
    //
    GameUtil.flowIn = function (view) {
        view.y = SpriteUtil.stageHeight;
        Laya.Tween.to(view, { y: SpriteUtil.stageHeight - view.height + 40 }, 200, null, Laya.Handler.create(this, function () {
            Laya.Tween.clearTween(view);
        }));
    };
    GameUtil.flowOut = function (view, callback) {
        if (callback === void 0) { callback = null; }
        Laya.Tween.to(view, { y: SpriteUtil.stageHeight }, 200, null, Laya.Handler.create(this, function () {
            Laya.Tween.clearTween(view);
            if (callback) {
                callback();
            }
        }));
    };
    //淡入淡出
    GameUtil.fadeIn = function (view) {
        view.alpha = 0;
        Laya.Tween.to(view, { alpha: 1 }, 200, null, Handler.create(this, function () {
            Laya.Tween.clearTween(view);
        }));
    };
    GameUtil.fadeOut = function (view, callback) {
        if (callback === void 0) { callback = null; }
        var alpha = 0;
        Laya.Tween.to(view, { alpha: alpha }, 200, null, Laya.Handler.create(this, function () {
            Laya.Tween.clearTween(view);
            if (callback) {
                callback();
            }
        }));
    };
    //呼吸动画
    GameUtil.playBreathAnim = function (spr, sobj, tobj, time, times) {
        var _this = this;
        if (time === void 0) { time = 800; }
        if (times === void 0) { times = 0; }
        Laya.Tween.clearTween(spr);
        if (!sobj || !tobj)
            return;
        Laya.Tween.to(spr, tobj, time, null, Handler.create(this, function () {
            Laya.Tween.to(spr, sobj, time, null, Handler.create(_this, function () {
                if (times == 0) {
                    _this.playBreathAnim(spr, sobj, tobj, time);
                }
                else {
                    Laya.Tween.clearTween(spr);
                }
            }));
        }));
    };
    //灰显滤镜 滤镜比较耗性能 注意合理使用
    // private static grayFilter;
    // static getGrayFilter(){
    //     if(!this.grayFilter){
    //         let colorMatrix = [
    //             0.3,0.6,0,0,0,
    //             0.3,0.6,0,0,0,
    //             0.3,0.6,0,0,0,
    //             0,0,0,1,0
    //         ];
    //         let colorFliter = new Laya.ColorMatrixFilter(colorMatrix);
    //         this.grayFilter = colorFliter;
    //     }
    //     return [this.grayFilter];
    // }
    //获取path
    GameUtil.getURLPath = function () {
        var pathname = window.location.pathname;
        var path = pathname.substring(0, pathname.lastIndexOf("/") + 1);
        return window.location.protocol + "//" + window.location.host + path;
    };
    //imgLoader加载同源图片
    GameUtil.getDynamicImage = function (path, callback) {
        if (path === void 0) { path = ""; }
        if (callback === void 0) { callback = null; }
        var image = new Laya.Image();
        image.skin = "http://img.redocn.com/sheji/20141219/zhongguofengdaodeliyizhanbanzhijing_3744115.jpg";
        return image;
    };
    //get image by url base64
    // static getUrlImage(url = "",callback = null){
    //     AppCenter.getBase64Img(url,(base64url)=>{
    //         var saveImage:HTMLImageElement = new Image;
    //         saveImage.crossOrigin = '*';
    //         saveImage.onload=()=>{
    //             saveImage.onload = null;
    //             var texture = new Laya.Texture();
    //             callback(texture);
    //         }
    //         saveImage.src = "data:image/jpeg;base64,"+base64url;
    //     });
    // }
    //url参数
    GameUtil.getUrlValueByKey = function (key) {
        if (key === void 0) { key = ""; }
        if (!key)
            return "";
        var url = window.location.href;
        var str = url.split("?")[1];
        var val = "";
        if (str) {
            var arr = str.split("&");
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var qst = arr_1[_i];
                if (qst.search(key) >= 0) {
                    if (qst.search("=") >= 0) {
                        val = qst.split("=")[1];
                    }
                    else {
                        val = "default";
                    }
                    break;
                }
            }
        }
        return val;
    };
    //是否显示百度js
    GameUtil.showBaiduJS = function (isshow) {
        if (isshow === void 0) { isshow = true; }
        var doc = document.getElementById("baidujsAd");
        if (isshow) {
            doc.style.display = "block";
        }
        else {
            doc.style.display = "none";
        }
    };
    return GameUtil;
}());
//# sourceMappingURL=GameUtil.js.map