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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var GameDemo = /** @class */ (function (_super) {
    __extends(GameDemo, _super);
    function GameDemo() {
        var _this = _super.call(this) || this;
        _this.rotationAngle = 0;
        _this.directionPt = { x: 1, y: 1, s: 1 };
        _this.speed = { x: 5, y: 6 };
        //旋转
        _this.angleSpeed = 0.001;
        _this.rotSpeed = 0.1;
        _this.isPlaying = false;
        _this.init();
        return _this;
    }
    GameDemo.prototype.init = function () {
        var circle = SpriteUtil.createCircle(25, "#C7EDCC");
        this.addChild(circle);
        this.myEye = circle;
        circle.x = SpriteUtil.stageCenterX;
        circle.y = SpriteUtil.stageCenterY;
        this.rollPt = { x: 25, y: SpriteUtil.stageCenterY };
        this.zeroPt = { x: 25, y: 25 };
        var text = SpriteUtil.createText("眼", 40, "#ff0000", "center", true);
        text.width = 50;
        text.x = -25;
        text.y = -16;
        circle.addChild(text);
        circle.autoSize = true;
        circle.on("click", this, this.startGame);
        this.showMenu();
    };
    GameDemo.prototype.showMenu = function () {
        var txt = SpriteUtil.createText("此项目仅用于训练眼球灵活度\n准备工作\n1、端正姿势眼睛平视前方\n2、眼睛盯住小球尽量看清楚球里面的字\n3、头保持静止", 48, "#00ff00", "left", true);
        txt.leading = 10;
        txt.x = 100;
        txt.y = 200;
        this.myEye.scale(5, 5);
        this.addChild(txt);
        this.descTxt = txt;
    };
    GameDemo.prototype.startGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isPlaying)
                            return [2 /*return*/];
                        this.descTxt.visible = false;
                        this.model.curTime = new Date().getTime();
                        this.isPlaying = true;
                        return [4 /*yield*/, this.play({ scaleX: 1, scaleY: 1 }, 800)];
                    case 1:
                        _a.sent();
                        Laya.timer.frameLoop(1, this, this.rollAction);
                        return [2 /*return*/];
                }
            });
        });
    };
    GameDemo.prototype.gotoGame = function () {
        this.model = new GameModel();
        // this.playNow();
        // Laya.timer.frameLoop(1,this,this.rollAction);
    };
    //旋转
    GameDemo.prototype.rollAction = function () {
        this.rotationAngle += this.angleSpeed;
        this.rollPt.x += this.rotSpeed;
        var angle = this.rotationAngle * 180 / Math.PI;
        if (this.rollPt.x >= (SpriteUtil.stageCenterX - 100)) {
            this.angleSpeed = -0.001;
            this.rotSpeed = -0.1;
        }
        else if (this.rollPt.x < 25) {
            Laya.timer.clear(this, this.rollAction);
            this.playNow();
            return;
        }
        var x1 = this.rollPt.x;
        var y1 = this.rollPt.y;
        this.myEye.x = (x1 - SpriteUtil.stageCenterX) * Math.cos(angle) - (y1 - SpriteUtil.stageCenterY) * Math.sin(angle) + SpriteUtil.stageCenterX;
        this.myEye.y = (y1 - SpriteUtil.stageCenterY) * Math.cos(angle) + (x1 - SpriteUtil.stageCenterX) * Math.sin(angle) + SpriteUtil.stageCenterY;
    };
    //开始播放
    GameDemo.prototype.playNow = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.play({ x: SpriteUtil.stageCenterX, y: SpriteUtil.stageCenterY })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.moveNow(1)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.play({ x: SpriteUtil.stageCenterX, y: SpriteUtil.stageCenterY })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.moveNow(2)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.play({ x: SpriteUtil.stageCenterX, y: SpriteUtil.stageCenterY })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.moveNow(3)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.play({ x: SpriteUtil.stageCenterX, y: SpriteUtil.stageCenterY })];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.moveNow(4)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.play({ x: SpriteUtil.stageCenterX, y: SpriteUtil.stageCenterY })];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.moveNow(5)];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, this.play({ x: SpriteUtil.stageCenterX, y: SpriteUtil.stageCenterY })];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, this.moveNow(6)];
                    case 12:
                        _a.sent();
                        Laya.timer.frameLoop(1, this, this.playRandom);
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    GameDemo.prototype.playRandom = function () {
        if (this.myEye.x <= this.zeroPt.x || this.myEye.x >= SpriteUtil.stageWidth - this.zeroPt.x) {
            this.directionPt.x *= -1;
        }
        if (this.myEye.y <= this.zeroPt.y || this.myEye.y >= SpriteUtil.stageHeight - this.zeroPt.y) {
            this.directionPt.y *= -1;
        }
        this.myEye.x += this.directionPt.x * this.speed.x;
        this.myEye.y += this.directionPt.y * this.speed.y;
        if (this.speed.x > 50) {
            this.directionPt.s *= -1;
            this.speed.x = 30;
        }
        else if (this.speed.x < 5) {
            this.speed.x = 10;
            this.directionPt.s *= -1;
        }
        else {
            this.speed.x += this.directionPt.s * 0.06;
        }
        if (this.speed.y > 50) {
            this.directionPt.s *= -1;
            this.speed.y = 30;
        }
        else if (this.speed.y < 5) {
            this.speed.y = 10;
            this.directionPt.s *= -1;
        }
        else {
            this.speed.y += this.directionPt.s * 0.05;
        }
        this.model.getDuration();
    };
    //左右运动
    GameDemo.prototype.moveNow = function (type) {
        if (type === void 0) { type = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var arr, len, i, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arr = [];
                        if (type == 1) {
                            arr = this.model.getXMoveData();
                        }
                        else if (type == 2) {
                            arr = this.model.getYMoveData();
                        }
                        else if (type == 3) {
                            arr = this.model.getPMoveData();
                        }
                        else if (type == 4) {
                            arr = this.model.getNMoveData();
                        }
                        else if (type == 5) {
                            arr = this.model.getXYMoveData();
                        }
                        else if (type == 6) {
                            arr = this.model.getYXMoveData();
                        }
                        len = arr.length;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < len)) return [3 /*break*/, 4];
                        obj = arr[i];
                        return [4 /*yield*/, this.play(obj.point, obj.time, obj.word)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //通用
    GameDemo.prototype.play = function (tobj, time, word, ease) {
        if (time === void 0) { time = 2000; }
        if (word === void 0) { word = "眼"; }
        if (ease === void 0) { ease = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.myEye.getChildAt(0)["text"] = word;
                        Laya.Tween.to(_this.myEye, tobj, time, ease, Laya.Handler.create(_this, function () {
                            resolve();
                        }));
                    })];
            });
        });
    };
    return GameDemo;
}(Laya.Sprite));
//# sourceMappingURL=GameDemo.js.map