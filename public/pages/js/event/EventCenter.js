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
var EventCenter = /** @class */ (function (_super) {
    __extends(EventCenter, _super);
    function EventCenter() {
        return _super.call(this) || this;
    }
    EventCenter.instance = function () {
        if (this._instance == null) {
            this._instance = new EventCenter();
        }
        return this._instance;
    };
    //派发事件
    EventCenter.prototype.dispatchEvent = function (eventName, args) {
        if (args === void 0) { args = null; }
        this.event(eventName, args);
    };
    //监听
    EventCenter.prototype.addEventListener = function (eventName, caller, listener, args) {
        if (args === void 0) { args = null; }
        this.on(eventName, caller, listener, args);
    };
    EventCenter._instance = null;
    return EventCenter;
}(Laya.EventDispatcher));
//# sourceMappingURL=EventCenter.js.map