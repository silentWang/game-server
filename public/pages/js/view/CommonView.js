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
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var CommonView = /** @class */ (function (_super) {
        __extends(CommonView, _super);
        function CommonView() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        CommonView.prototype.init = function () {
            this.playLoopEff();
            this.confirmBtn.once("click", this, this.clkHandler);
        };
        CommonView.prototype.clkHandler = function (e) {
            this.titleTxt.changeText("我被改变了");
        };
        CommonView.prototype.playLoopEff = function () {
            var _this = this;
            Laya.Tween.to(this.effImg, { rotation: 360 }, 5000, null, Laya.Handler.create(this, function () {
                _this.effImg.rotation = 0;
                _this.playLoopEff();
            }));
        };
        CommonView.prototype.destroy = function () {
            Laya.Tween.clearTween(this.effImg);
            _super.prototype.destroy.call(this);
        };
        return CommonView;
    }(ui.CommonViewUI));
    view.CommonView = CommonView;
})(view || (view = {}));
//# sourceMappingURL=CommonView.js.map