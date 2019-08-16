//通信类
var HttpServer = /** @class */ (function () {
    function HttpServer() {
    }
    //IP地址
    HttpServer.setIP = function () {
        if (GameData.isTestMode) {
            //测试环境
            GameData.IP = "https://test-farm.dftoutiao.com/";
            GameData.IP_V3 = "https://test-farm.dftoutiao.com/farmup/";
        }
        else {
            //生产环境
            GameData.IP = "https://farm.dftoutiao.com/";
            GameData.IP_V3 = "https://farm.dftoutiao.com/farmup/";
        }
    };
    HttpServer.getBaseData = function () {
        if (!this.baseData) {
            var data = {};
            var bdata = GameData.baseData;
            var ver = parseInt(bdata["ver"].split(".").join(""));
            if (ver >= 253) { //临时不掉v3(实际是250)
                data["ime"] = "__ime__"; //imei号，ios传idfv
                data["appqid"] = "__appqid__"; //App渠道号（appstore151203）
                data["deviceid"] = "__deviceid__"; //安卓传安卓唯一androidId，ios传idfa
                data["accid"] = "__ttaccid__"; //App用户的注册id
                data["lt"] = "__lt__"; //用的token信息
                data["phonenum"] = "__phonenum__"; //用户手机号码
                data["apptypeid"] = "__apptypeid__"; //App应用的软件类别id（DFTT
                data["ver"] = "__ver__"; //App版本号（如：1.7.1）
                data["softtype"] = "__softtype__"; //软件类别（如：TouTiao）
                data["softname"] = "__softname__"; //软件名（如：DFTTIOS\DFTTAndroid）
                data["position"] = "__position__"; //客户端的定位位置（省）（如：上海、北京......）
                data["city"] = "__city__"; //客户端的定位位置（市）（如：南京、苏州......）
                data["citypos"] = "__citypos__"; //城市
                data["sublocal"] = "__sublocal__"; //二级地域
                data["hispos"] = "__hispos__"; //历史地域
                data["appver"] = "__appver__"; //App版本号 （如：010101）
                data["os"] = "__os__"; //操作系统(如:Android)
                data["osver"] = "__osver__"; //操作系统版本号(如:Android 4.4)
                data["cleanappqid"] = "__cleanappqid__"; //APP渠道号（去除日期）
                data["device"] = "__device__"; //手机型号(如：SM-N9108V)
                data["devicefactory"] = "__devicefactory__"; //手机生产厂商（如:HUAWEI）
                data["network"] = "__network__"; //network
                data["macaddr"] = "__macaddr__"; //mac地址
                data["screendisplay"] = "__screendisplay__"; //屏幕分辨率（如1080*1920）
                data["systemver"] = "__systemver__"; //操作系统版本号(如:4.4)
            }
            else {
                data["ime"] = bdata["ime"]; //imei号，ios传idfv
                data["appqid"] = bdata["appqid"]; //App渠道号（appstore151203）
                data["accid"] = bdata["ttaccid"]; //App用户的注册id
                data["lt"] = bdata["login_token"]; //用的token信息
                data["logintype"] = bdata["logintype"]; //用的token信息
                data["apptypeid"] = bdata["apptypeid"]; //App应用的软件类别id（DFTT
                data["ver"] = bdata["ver"]; //App版本号（如：1.7.1）
                data["tsid"] = bdata["tsid"];
                data["softtype"] = bdata["softtype"]; //软件类别（如：TouTiao）
                data["softname"] = bdata["softname"]; //软件名（如：DFTTIOS\DFTTAndroid）
                data["position"] = bdata["position"]; //客户端的定位位置（省）（如：上海、北京......）
                data["appver"] = bdata["appver"]; //App版本号 （如：010101）
                data["os"] = bdata["os"]; //操作系统(如:Android)
                data["device"] = bdata["device"]; //手机型号(如：SM-N9108V)
                data["deviceid"] = bdata["deviceid"];
                data["shortVideo"] = bdata["shortVideo"];
                data["is_share_install"] = bdata["is_share_install"];
                data["istourists"] = bdata["istourists"]; //1是游客
                data["network"] = bdata["network"];
            }
            this.baseData = data;
        }
        return this.baseData;
    };
    //获取公共参数（仅协议这些）而且v3
    HttpServer.getPublicParams = function () {
        var data = {};
        data["ime"] = "__ime__"; //imei号，ios传idfv
        data["appqid"] = "__appqid__"; //App渠道号（appstore151203）
        data["apptypeid"] = "__apptypeid__"; //App应用的软件类别id（DFTT
        data["appver"] = "__appver__"; //App版本号 （如：010101）
        data["device"] = "__device__"; //手机型号(如：SM-N9108V)
        data["deviceid"] = "__deviceid__"; //安卓传安卓唯一androidId，ios传idfa
        data["network"] = "__network__"; //network
        data["os"] = "__os__"; //操作系统(如:Android)
        data["position"] = "__position__"; //客户端的定位位置（省）（如：上海、北京......）
        data["softname"] = "__softname__"; //软件名（如：DFTTIOS\DFTTAndroid）
        data["softtype"] = "__softtype__"; //软件类别（如：TouTiao）
        data["lt"] = "__lt__"; //用的token信息
        return data;
    };
    //通用回调
    HttpServer.setCallBackHandle = function (key, resolve, isShowError) {
        if (isShowError === void 0) { isShowError = true; }
        //超时
        var isTimeout = true;
        var idx = Laya.timer.once(15 * 1000, this, function () {
            if (isTimeout && isShowError) {
                GameUtil.showTips("请求超时");
                HttpServer.isRequesting = false;
            }
        });
        window[key] = function (res) {
            isTimeout = false;
            HttpServer.isRequesting = false;
            if (!res) {
                GameUtil.showTips("网络错误");
                return;
            }
            if (res && res.code == 0) {
                resolve(res.data);
            }
            else if (isShowError) {
                GameUtil.showTips(res.message);
            }
            console.log("----------" + key + "---------");
            console.log(res);
        };
    };
    //获取用户信息
    HttpServer.getUserData = function () {
        var _this = this;
        if (HttpServer.isRequesting) {
            GameUtil.showTips("请求频繁");
            return;
        }
        HttpServer.isRequesting = true;
        return new Promise(function (resolve, reject) {
            var data = _this.getBaseData();
            var info = {};
            info["lt"] = data["lt"];
            var func = "getUserData" + Math.random().toString().slice(2);
            _this.setCallBackHandle(func, resolve);
            AppCenter.sendNativeRequest("farm/index", info, func);
        });
    };
    HttpServer.isRequesting = false;
    HttpServer.baseData = null;
    return HttpServer;
}());
//# sourceMappingURL=HttpServer.js.map