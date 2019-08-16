//显示对象相关util类
var SpriteUtil = /** @class */ (function () {
    function SpriteUtil() {
    }
    //创建文本
    SpriteUtil.createText = function (str, size, color, align, bold, stroke, strokeColor) {
        if (size === void 0) { size = 20; }
        if (color === void 0) { color = "#ffffff"; }
        if (align === void 0) { align = "left"; }
        if (bold === void 0) { bold = false; }
        if (stroke === void 0) { stroke = 0; }
        if (strokeColor === void 0) { strokeColor = "#000000"; }
        var text = new Laya.Text();
        text.changeText(str);
        text.fontSize = size;
        text.color = color;
        text.bold = bold;
        text.align = align;
        if (stroke > 0) {
            text.stroke = stroke;
            text.strokeColor = strokeColor;
        }
        return text;
    };
    //创建圆
    SpriteUtil.createCircle = function (radius, color) {
        if (color === void 0) { color = "#ffffff"; }
        var circle = new Laya.Sprite();
        circle.graphics.drawCircle(0, 0, radius, color);
        return circle;
    };
    //创建矩形
    SpriteUtil.createRect = function (width, height, color, lineWidth, lineColor) {
        if (color === void 0) { color = "#ffffff"; }
        if (lineWidth === void 0) { lineWidth = 0; }
        if (lineColor === void 0) { lineColor = "#000000"; }
        var rect = new Laya.Sprite();
        if (lineWidth > 0) {
            rect.graphics.drawRect(0, 0, width, height, color, lineColor, lineWidth);
        }
        else {
            rect.graphics.drawRect(0, 0, width, height, color);
        }
        return rect;
    };
    //圆角矩形
    SpriteUtil.createRoundRect = function (w, h, r, c, border, borderColor) {
        if (r === void 0) { r = w > h ? h / 2 : w / 2; }
        if (c === void 0) { c = "#ffffff"; }
        if (border === void 0) { border = 0; }
        if (borderColor === void 0) { borderColor = "#000000"; }
        var sp = new Laya.Sprite();
        var graphics = sp.graphics;
        var sw = w - r * 2;
        var sh = h - r * 2;
        var paths = [
            ["moveTo", r, 0],
            ["lineTo", r + sw, 0],
            ["arcTo", w, 0, w, r, r],
            ["lineTo", w, r + sh],
            ["arcTo", w, h, sw + r, h, r],
            ["lineTo", r, h],
            ["arcTo", 0, h, 0, sh + r, r],
            ["lineTo", 0, r],
            ["arcTo", 0, 0, r, 0, r],
        ];
        graphics.drawPath(0, 0, paths, { fillStyle: c }, { strokeStyle: borderColor, lineWidth: border });
        return sp;
    };
    //创建图像
    SpriteUtil.createImage = function (url, isCenter) {
        if (isCenter === void 0) { isCenter = true; }
        var img = new Laya.Image(url);
        if (isCenter) {
            img.anchorX = 0.5;
            img.anchorY = 0.5;
        }
        return img;
    };
    //创建图像
    SpriteUtil.createSheetImage = function (key, isCenter) {
        if (isCenter === void 0) { isCenter = true; }
        var sprite = new Laya.Sprite();
        var texture = Laya.loader.getRes(key);
        sprite.graphics.drawTexture(texture);
        sprite.size(texture.width, texture.height);
        if (isCenter) {
            sprite.pivot(sprite.width / 2, sprite.height / 2);
        }
        return sprite;
    };
    return SpriteUtil;
}());
//# sourceMappingURL=SpriteUtil.js.map