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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var CommonViewUI = /** @class */ (function (_super) {
        __extends(CommonViewUI, _super);
        function CommonViewUI() {
            return _super.call(this) || this;
        }
        CommonViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.CommonViewUI.uiView);
        };
        CommonViewUI.uiView = { "type": "View", "props": { "width": 600, "height": 700 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "demo/uibg.png" } }, { "type": "Image", "props": { "y": 329, "x": 305, "var": "effImg", "skin": "demo/effect.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 148, "x": 136, "skin": "demo/mostlevel.png" } }, { "type": "Button", "props": { "y": 576, "x": 146, "var": "confirmBtn", "stateNum": 1, "skin": "demo/bigbtn.png", "labelSize": 40, "labelColors": "#ffffff", "labelBold": true, "label": "确定" } }, { "type": "Label", "props": { "y": 49, "x": 0, "width": 600, "var": "titleTxt", "text": "这是标题", "height": 42, "fontSize": 42, "color": "#00ff00", "bold": true, "align": "center" } }] };
        return CommonViewUI;
    }(View));
    ui.CommonViewUI = CommonViewUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map