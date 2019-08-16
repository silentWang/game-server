/*
* name;
*/
var GameModel = /** @class */ (function () {
    function GameModel() {
        //
        this.words = "天地玄黄宇宙洪荒日月盈仄辰宿列张金生丽水玉出昆钢寒来暑往秋收冬藏";
        //球的半径
        this.radius = 25;
        //节拍
        this.count = 128;
        this.minTime = 250;
    }
    Object.defineProperty(GameModel.prototype, "curTime", {
        set: function (tm) {
            this._curTime = tm;
        },
        enumerable: true,
        configurable: true
    });
    GameModel.prototype.getDuration = function () {
        var now = new Date().getTime();
        var mid = (now - this._curTime) / 1000;
        var m = ~~(mid / 60);
        var s = (mid - m * 60);
        console.log("\u8BAD\u7EC3\u65F6\u95F4 " + m + ":" + s);
    };
    //左右运动
    GameModel.prototype.getXMoveData = function () {
        var arr = [];
        var mid = this.count / 2;
        for (var i = 0; i < this.count; i++) {
            var x = i % 2 ? SpriteUtil.stageWidth - this.radius : this.radius;
            var y = this.radius + (SpriteUtil.stageHeight - this.radius) * Math.random();
            var time = Math.abs(mid - i) / mid * 500 + this.minTime;
            var point = { x: x, y: y };
            var word = this.words.charAt(~~(this.words.length * Math.random()));
            arr.push({ point: point, time: time, word: word });
        }
        return arr;
    };
    //上下运动
    GameModel.prototype.getYMoveData = function () {
        var arr = [];
        var mid = this.count / 2;
        for (var i = 0; i < this.count; i++) {
            var y = i % 2 ? SpriteUtil.stageHeight - this.radius : this.radius;
            var x = this.radius + (SpriteUtil.stageWidth - this.radius) * Math.random();
            var time = Math.abs(mid - i) / mid * 500 + this.minTime;
            var point = { x: x, y: y };
            var word = this.words.charAt(~~(this.words.length * Math.random()));
            arr.push({ point: point, time: time, word: word });
        }
        return arr;
    };
    //上下左右运动
    GameModel.prototype.getXYMoveData = function () {
        var arr = [];
        var mid = this.count / 2;
        var avdw = (SpriteUtil.stageWidth - 2 * this.radius) / this.count;
        for (var i = 0; i < this.count; i++) {
            var x = i < mid ? this.radius + i * avdw * 2 : SpriteUtil.stageWidth - (i - mid) * avdw * 2 - this.radius;
            var y = i % 2 == 0 ? this.radius : SpriteUtil.stageHeight - this.radius;
            var time = i < mid ? Math.abs(mid / 2 - i) / (mid / 2) * 500 + this.minTime : Math.abs(i - 3 * mid / 2) / (mid / 2) * 500 + this.minTime;
            var point = { x: x, y: y };
            var word = this.words.charAt(~~(this.words.length * Math.random()));
            arr.push({ point: point, time: time, word: word });
        }
        return arr;
    };
    //左右上下运动
    GameModel.prototype.getYXMoveData = function () {
        var arr = [];
        var mid = this.count / 2;
        var avdh = (SpriteUtil.stageHeight - 2 * this.radius) / this.count;
        for (var i = 0; i < this.count; i++) {
            var x = i % 2 == 0 ? this.radius : SpriteUtil.stageWidth - this.radius;
            var y = i < mid ? this.radius + i * avdh * 2 : SpriteUtil.stageHeight - (i - mid) * avdh * 2 - this.radius;
            var time = i < mid ? Math.abs(mid / 2 - i) / (mid / 2) * 500 + this.minTime : Math.abs(i - 3 * mid / 2) / (mid / 2) * 500 + this.minTime;
            var point = { x: x, y: y };
            var word = this.words.charAt(~~(this.words.length * Math.random()));
            arr.push({ point: point, time: time, word: word });
        }
        return arr;
    };
    //左上
    GameModel.prototype.getPMoveData = function () {
        var arr = [];
        var spt = { x: this.radius, y: this.radius };
        var mid = this.count / 2;
        var avdw = (SpriteUtil.stageWidth - 2 * this.radius) / this.count;
        var avdh = (SpriteUtil.stageHeight - 2 * this.radius) / this.count;
        for (var i = 0; i < this.count; i++) {
            var x = 0;
            var y = 0;
            if (i < mid) {
                x = i % 2 == 0 ? this.radius : i * avdw * 2 + this.radius;
                y = i % 2 == 0 ? this.radius + i * avdh * 2 : this.radius;
            }
            else {
                x = i % 2 == 0 ? this.radius + (i - mid) * avdw * 2 : SpriteUtil.stageWidth - spt.x;
                y = i % 2 == 0 ? SpriteUtil.stageHeight - spt.y : this.radius + (i - mid) * avdh * 2;
            }
            var point = { x: x, y: y };
            var time = this.minTime + 300 * Math.random();
            var word = this.words.charAt(~~(this.words.length * Math.random()));
            arr.push({ point: point, time: time, word: word });
        }
        return arr;
    };
    //右上
    GameModel.prototype.getNMoveData = function () {
        var arr = [];
        var spt = { x: this.radius, y: this.radius };
        var mid = this.count / 2;
        var avdw = (SpriteUtil.stageWidth - 2 * this.radius) / this.count;
        var avdh = (SpriteUtil.stageHeight - 2 * this.radius) / this.count;
        for (var i = 0; i < this.count; i++) {
            var x = 0;
            var y = 0;
            if (i < mid) {
                x = i % 2 == 0 ? SpriteUtil.stageWidth - avdw * i * 2 - this.radius : SpriteUtil.stageWidth - spt.x;
                y = i % 2 == 0 ? this.radius : i * avdh * 2 + this.radius;
            }
            else {
                x = i % 2 == 0 ? this.radius : SpriteUtil.stageWidth - (i - mid) * avdw * 2 - this.radius;
                y = i % 2 == 0 ? (i - mid) * avdh * 2 + this.radius : SpriteUtil.stageHeight - spt.y;
            }
            var point = { x: x, y: y };
            var time = this.minTime + 300 * Math.random();
            var word = this.words.charAt(~~(this.words.length * Math.random()));
            arr.push({ point: point, time: time, word: word });
        }
        return arr;
    };
    return GameModel;
}());
//# sourceMappingURL=GameModel.js.map