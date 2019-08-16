//一个简单的实现
var SocketServer = /** @class */ (function () {
    function SocketServer() {
        this.ip = "localhost";
        this.host = 8090;
        this.initSocket();
    }
    SocketServer.prototype.initSocket = function () {
        this.connectSocket();
    };
    //链接socket
    SocketServer.prototype.connectSocket = function () {
        var socket = new Laya.Socket();
        socket.endian = Laya.Socket.BIG_ENDIAN;
        socket.connectByUrl(this.getUrl());
        this.output = socket.output;
        this.socket = socket;
        socket.on(Laya.Event.OPEN, this, this.onOpen);
        socket.on(Laya.Event.CLOSE, this, this.onClose);
        socket.on(Laya.Event.MESSAGE, this, this.onData);
        socket.on(Laya.Event.ERROR, this, this.onError);
    };
    SocketServer.prototype.getUrl = function () {
        var url = "ws://" + this.ip + ":" + this.host;
        return url;
    };
    SocketServer.prototype.onError = function (e) {
        throw e;
    };
    SocketServer.prototype.sendMsg = function (data) {
        if (!this.socket.connected) {
            console.log("socket未连接...");
        }
        for (var key in data) {
            this.output.writeByte(data[key]);
        }
        this.socket.flush();
    };
    SocketServer.prototype.onOpen = function () {
        console.log("socket connected...");
    };
    SocketServer.prototype.onClose = function () {
        console.log("socket closed");
    };
    SocketServer.prototype.onData = function (msg) {
        console.log(msg);
        this.socket.input.clear();
        // EventCenter.instance().dispatchEvent("socketData",msg);
    };
    return SocketServer;
}());
//# sourceMappingURL=SocketServer.js.map