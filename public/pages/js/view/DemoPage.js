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
    var DemoPage = /** @class */ (function (_super) {
        __extends(DemoPage, _super);
        function DemoPage() {
            return _super.call(this) || this;
        }
        DemoPage.prototype.show = function () {
            _super.prototype.show.call(this);
            Game.instance().addTop(this);
        };
        return DemoPage;
    }(ui.DemoPageUI));
    view.DemoPage = DemoPage;
})(view || (view = {}));
//# sourceMappingURL=DemoPage.js.map