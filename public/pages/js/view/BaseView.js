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
var view;
(function (view) {
    var BaseView = /** @class */ (function (_super) {
        __extends(BaseView, _super);
        function BaseView() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        BaseView.prototype.init = function () {
        };
        BaseView.prototype.onInit = function () {
        };
        BaseView.prototype.open = function () {
            this.x = SpriteUtil.stageCenterX - this.width / 2;
            this.y = SpriteUtil.stageCenterY - this.height / 2;
            Game.instance().addBottom(this);
        };
        return BaseView;
    }(laya.ui.Component));
    view.BaseView = BaseView;
})(view || (view = {}));
//# sourceMappingURL=BaseView.js.map