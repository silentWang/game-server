//app客户端协议（ios和android）
var AppCenter = /** @class */ (function () {
    function AppCenter() {
    }
    //andorid 还是 ios
    AppCenter.isAndroidOrIos = function () {
        if (GameData.isLocal)
            return 0;
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid)
            return 1;
        if (isiOS)
            return 2;
        return 0;
    };
    //是否是iphonex
    AppCenter.isIphoneX = function () {
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isIOS) {
            if (screen.height == 812 && screen.width == 375) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    //是否是乐视手机
    AppCenter.isLeShiPhone = function () {
        var u = navigator.userAgent;
        var isSBLeshi = !!u.match(/(Le|Letv) X(\d)+/);
        if (isSBLeshi) {
            return true;
        }
        return false;
    };
    //app调接口 callback 是挂在window下得字符串
    AppCenter.sendNativeRequest = function (url, params, callback, needEncryptRequest, needDecryptResult, host) {
        if (callback === void 0) { callback = ""; }
        if (needEncryptRequest === void 0) { needEncryptRequest = true; }
        if (needDecryptResult === void 0) { needDecryptResult = true; }
        if (host === void 0) { host = ""; }
        var data = GameData.baseData;
        var ver = parseInt(data["ver"].split(".").join(""));
        //版本大于253 用v3协议 否则用原始的v协议
        if (ver >= 253) { //临时不掉v3(实际是253)
            this.sendNativeRequestV3(url, params, callback, needEncryptRequest, needDecryptResult, host);
        }
        else {
            this.sendNativeRequestV2(url, params, callback, false, host);
        }
    };
    //原始v2协议
    AppCenter.sendNativeRequestV2 = function (url, params, callback, needDecrypt, host) {
        if (callback === void 0) { callback = ""; }
        if (needDecrypt === void 0) { needDecrypt = false; }
        if (host === void 0) { host = ""; }
        var bool = this.isAndroidOrIos();
        var data = HttpServer.getBaseData();
        params["ver"] = data["version"];
        var ip = host == "" ? GameData.IP : host;
        if (bool == 1) {
            // andriod
            window["JSToNative"].postMessage(JSON.stringify({
                method: 'nativeRequest',
                url: ip + url,
                params: params,
                needDecrypt: needDecrypt,
                callback: callback //
            }));
        }
        if (bool == 2) {
            //ios 数组特殊处理
            var site = params.site;
            var str = JSON.stringify(site);
            params.site = str;
            var buy_list = params.buy_list;
            var bstr = JSON.stringify(buy_list);
            params.buy_list = bstr;
            // ios
            window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                method: 'nativeRequest',
                url: ip + url,
                params: params,
                needDecrypt: needDecrypt,
                callback: callback //
            });
        }
    };
    //V3协议
    AppCenter.sendNativeRequestV3 = function (url, params, callback, needEncryptRequest, needDecryptResult, host) {
        if (callback === void 0) { callback = ""; }
        if (needEncryptRequest === void 0) { needEncryptRequest = false; }
        if (needDecryptResult === void 0) { needDecryptResult = false; }
        if (host === void 0) { host = ""; }
        var bool = this.isAndroidOrIos();
        var data = HttpServer.getPublicParams();
        for (var key in data) {
            params[key] = data[key];
        }
        var ip = host == "" ? GameData.IP_V3 : host;
        if (bool == 1) {
            // andriod
            window["JSToNative"].postMessage(JSON.stringify({
                method: 'nativeRequest_v3',
                url: ip + url,
                params: params,
                needEncryptRequest: needEncryptRequest,
                needDecryptResult: needDecryptResult,
                callback: callback
            }));
        }
        if (bool == 2) {
            //ios 数组特殊处理
            var site = params.site;
            var str = JSON.stringify(site);
            params.site = str;
            var buy_list = params.buy_list;
            var bstr = JSON.stringify(buy_list);
            params.buy_list = bstr;
            // ios
            window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                method: 'nativeRequest_v3',
                url: ip + url,
                params: params,
                needEncryptRequest: needEncryptRequest,
                needDecryptResult: needDecryptResult,
                callback: callback
            });
        }
    };
    //退出上一页
    AppCenter.exitGame = function () {
        var bool = this.isAndroidOrIos();
        if (bool == 1) {
            window["JSToNative"].postMessage(JSON.stringify({
                method: 'goback'
            }));
        }
        else if (bool == 2) {
            window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                method: 'goback'
            });
        }
    };
    //新开一个webview
    AppCenter.toNewWebPage = function (url) {
        var bool = this.isAndroidOrIos();
        if (bool == 1) {
            window["JSToNative"].postMessage(JSON.stringify({
                method: 'ToNewWebPage',
                url: url
            }));
        }
        else if (bool == 2) {
            window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                method: 'ToNewWebPage',
                url: url
            });
        }
    };
    //获取基础数据
    AppCenter.getParameters = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        return new Promise(function (resolve, reject) {
            var bool = _this.isAndroidOrIos();
            var func = "getLogParameter" + Math.random().toString().slice(2);
            window[func] = function (res) {
                GameData.baseData = bool == 2 ? res : JSON.parse(String(res));
                console.log(GameData.baseData);
                resolve();
            };
            if (bool == 1) {
                // andriod
                window["JSToNative"].postMessage(JSON.stringify({
                    method: 'getLogParameter',
                    callback: func
                }));
            }
            else if (bool == 2) {
                // ios
                window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                    method: 'getLogParameter',
                    callback: func
                });
            }
            else {
                GameUtil.showTips("获取基础数据失败");
            }
        });
    };
    //热更新判断
    AppCenter.isForbitPlay = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var bool = _this.isAndroidOrIos();
            var func = "getTinkerPatchTime" + Math.random().toString().slice(2);
            window[func] = function (response) {
                var res = JSON.parse(response);
                var time = res.patchTime;
                var ptime = 0;
                if (!time) {
                    ptime = 0;
                }
                else {
                    ptime = parseInt(String(time).split("-").join(""));
                }
                var ver = parseInt(res.versionName.split(".").join(""));
                //产品下发的时间
                var producetime = 201901301000;
                var full = window.location.href;
                var fullVersionName = res.fullVersionName;
                if (ver < 249) {
                    if (ptime < producetime && !fullVersionName) {
                        GameUtil.showTips("活动暂未开启，敬请期待");
                        return;
                    }
                }
                resolve();
            };
            if (bool == 1) {
                window["JSToNative"].postMessage(JSON.stringify({
                    method: 'getTinkerPatchTime',
                    callback: func
                }));
            }
            else if (bool == 2) {
                var ver = parseInt(GameData.baseData.ver.split(".").join(""));
                if (ver < 249) {
                    GameUtil.showTips("活动暂未开启，敬请期待");
                    return;
                }
                resolve();
            }
        });
    };
    //跳到登陆
    AppCenter.gotoLogin = function () {
        var bool = this.isAndroidOrIos();
        if (bool == 1) {
            window["JSToNative"].postMessage(JSON.stringify({
                method: 'goToViewLogin',
            }));
        }
        else if (bool == 2) {
            window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                method: 'goToViewLogin',
            });
        }
    };
    //分享前置条件
    AppCenter.readyToShare = function () {
        var bool = this.isAndroidOrIos();
        if (bool == 1) {
            window["JSToNative"].postMessage(JSON.stringify({
                method: 'interactionMessage',
                params: {
                    type: 3,
                    activeFrom: 254
                }
            }));
        }
        else if (bool == 2) {
            window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                method: 'interactionMessage',
                params: {
                    type: 3,
                    activeFrom: 254
                }
            });
        }
    };
    //分享  type 0 wx好友 1 qq 3是朋友圈
    AppCenter.shareToWX = function (sharetype) {
        if (sharetype === void 0) { sharetype = 0; }
        var bool = this.isAndroidOrIos();
        if (bool == 1) {
            window["JSToNative"].postMessage(JSON.stringify({
                method: 'shareInviteFrom',
                type: sharetype,
                from: 254
            }));
        }
        else if (bool == 2) {
            window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                method: 'shareInviteFrom',
                type: sharetype,
                from: 254
            });
        }
    };
    //推送通知
    AppCenter.pushNotification = function (remainingTime, title, des) {
        if (remainingTime === void 0) { remainingTime = 0; }
        if (title === void 0) { title = "作物已成熟"; }
        if (des === void 0) { des = "您的农场植物已成熟，赶快来收获吧，最高可得140金币！"; }
        // AppCenter.upToSevver(1520013,"entry","click");
        var bool = this.isAndroidOrIos();
        var url = "";
        //农场例子
        if (GameData.isTestMode) {
            url = "https://resources.dftoutiao.com/appfe__test/dfttapp-farm/index.html?activityPathId=5010&isfullscreen=1&isstatusbar=1&touming=1&forbidDialog=1";
        }
        else {
            url = "https://resources.dftoutiao.com/appfe/dfttapp-farm/index.html?activityPathId=5010&isfullscreen=1&isstatusbar=1&touming=1&forbidDialog=1";
        }
        if (bool == 1) {
            window["JSToNative"].postMessage(JSON.stringify({
                method: 'localPushNotification',
                params: {
                    title: title,
                    des: des,
                    url: url,
                    remainingTime: remainingTime,
                    "cancelPush": "0",
                    "notify_id": 900001,
                    "requst_code": 900001,
                    "actentryid": "1540041",
                    "actid": "farmgame" //上报活动id
                }
            }));
        }
        else if (bool == 2) {
            window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                method: 'localPushNotification',
                params: {
                    title: title,
                    des: des,
                    url: url,
                    remainingTime: remainingTime,
                    "cancelPush": "0",
                    "notify_id": 900001,
                    "requst_code": 900001,
                    "actentryid": "1540041",
                    "actid": "farmgame" //上报活动id
                }
            });
        }
    };
    //上报
    AppCenter.upToSevver = function (actentryid, acttype, type, materialid) {
        if (materialid === void 0) { materialid = ""; }
        if (GameData.isLocal)
            return;
        var bool = this.isAndroidOrIos();
        if (bool == 2) {
            // ios
            window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                method: 'uploadGameActivityLog',
                thisurl: '',
                actentryid: actentryid,
                gameid: 'farmgame',
                materialid: materialid,
                type: type,
                acttype: acttype,
                buttonid: ''
            });
        }
        else if (bool == 1) {
            // andriod
            window["JSToNative"].postMessage(JSON.stringify({
                method: 'uploadGameActivityLog',
                thisurl: '',
                actentryid: actentryid,
                gameid: 'farmgame',
                materialid: materialid,
                type: type,
                acttype: acttype,
                buttonid: ''
            }));
        }
    };
    //客户端存
    AppCenter.setLocalCache = function (value, key) {
        if (key === void 0) { key = ""; }
        if (!key)
            return;
        var bool = this.isAndroidOrIos();
        if (bool == 2) {
            window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                method: "setCache",
                key: key,
                value: value
            });
        }
        else if (bool == 1) {
            window["JSToNative"].postMessage(JSON.stringify({
                method: "setCache",
                key: key,
                value: value
            }));
        }
    };
    //取
    AppCenter.getLocalCache = function (key) {
        var _this = this;
        if (key === void 0) { key = ""; }
        return new Promise(function (resolve, reject) {
            if (!key) {
                resolve(0);
            }
            else {
                var bool = _this.isAndroidOrIos();
                var func = "setInfoPigGameUserData" + Math.random().toString().slice(2);
                window[func] = function (result) {
                    var time = result["value"];
                    resolve(time);
                };
                if (bool == 2) {
                    window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                        method: "getCache",
                        key: key,
                        callback: func
                    });
                }
                else if (bool == 1) {
                    window["JSToNative"].postMessage(JSON.stringify({
                        method: "getCache",
                        key: key,
                        callback: func
                    }));
                }
            }
        });
    };
    //base64 
    AppCenter.getBase64Img = function (url, callback) {
        var func = "getBase64Img" + Math.random().toString().slice(2);
        window[func] = function (res) {
            callback(res.img);
        };
        var bool = this.isAndroidOrIos();
        if (bool == 1) {
            window["JSToNative"].postMessage(JSON.stringify({
                method: 'getBase64Img',
                params: {
                    "url": url
                },
                callback: func
            }));
        }
        else if (bool == 2) {
            window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                method: 'getBase64Img',
                params: {
                    "url": url
                },
                callback: func
            });
        }
    };
    //激励视频广告
    AppCenter.showVideoAd = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var func = "showVideoAd" + Math.random().toString().slice(2);
            window[func] = function (res) {
                if (res && res.hasOwnProperty("code")) {
                    resolve(res.code);
                }
                else {
                    GameUtil.showTips("获取视频异常");
                }
            };
            var bool = _this.isAndroidOrIos();
            if (bool == 1) {
                window["JSToNative"].postMessage(JSON.stringify({
                    method: 'excitationVideo',
                    params: {
                        type: "dftt_farmgame",
                    },
                    callback: func
                }));
            }
            else if (bool == 2) {
                window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                    method: 'excitationVideo',
                    params: {
                        type: "dftt_farmgame",
                    },
                    callback: func
                });
            }
        });
    };
    //服务器端下发的需要反查安装状态的包名集合
    AppCenter.toGetAppInstallStatus = function (callback, pakages) {
        var bool = this.isAndroidOrIos();
        var func = "toGetAppInstallStatus" + Math.random().toString().slice(2);
        window[func] = function (res) {
            var data = bool == 1 ? res.and : res.ios;
            callback(data);
        };
        if (bool == 1) {
            window["JSToNative"].postMessage(JSON.stringify({
                method: 'ToGetAppInstallStatus',
                package_list_and: pakages,
                installStatusCb: func //回调方法
            }));
        }
        else if (bool == 2) {
            window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                method: 'ToGetAppInstallStatus',
                package_list_ios: pakages,
                installStatusCb: func //回调方法
            });
        }
    };
    //唤醒第三方app
    AppCenter.toOpenApp = function (url, awakenId, callback) {
        if (callback === void 0) { callback = null; }
        var bool = this.isAndroidOrIos();
        var func = "toOpenAppForPig" + Math.random().toString().slice(2);
        window[func] = function (res) {
            callback(res);
        };
        if (bool == 1) {
            window["JSToNative"].postMessage(JSON.stringify({
                method: 'ToOpenAppForPig',
                url: url,
                awakenId: awakenId,
                callback: func
            }));
        }
        else if (bool == 2) {
            window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                method: 'ToOpenAppForPig',
                url: url,
                awakenId: awakenId,
                callback: func
            });
        }
    };
    //大图广告
    AppCenter.loadAd = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var func = "loadAd" + Math.random().toString().slice(2);
            var bool = _this.isAndroidOrIos();
            window[func] = function (res) {
                // console.log(res);
                if (res.adPosition) {
                    // 客户端请求失败，返回百度 Js 广告 注意百度js广告是个div 所以要在index.html添加一个div容器 并通过css定好位置
                    var id_1 = res.adPosition.positionId;
                    Laya.timer.callLater(this, function () {
                        var container = document.getElementById("baidujsAd");
                        (window["slotbydup"] = window["slotbydup"] || []).push({ id: id_1, container: container });
                        var head = document.getElementsByTagName('head')[0]; //动态加载 js
                        var js = document.createElement('script');
                        js.setAttribute('type', 'text/javascript');
                        js.setAttribute('src', '//cpro.baidustatic.com/cpro/ui/cm.js');
                        head.appendChild(js);
                        GameUtil.showBaiduJS();
                    });
                }
                else {
                    // 成功返回原生广告
                    resolve(res);
                }
            };
            if (bool == 1) {
                window["JSToNative"].postMessage(JSON.stringify({
                    method: 'loadAd',
                    params: {
                        position: 'dftt_farmgame',
                        index: 0,
                        type: "dftt_answer",
                    },
                    callback: func
                }));
            }
            else if (bool == 2) {
                window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                    method: 'loadAd',
                    params: {
                        position: 'dftt_farmgame',
                        index: 0,
                        type: "dftt_answer",
                    },
                    callback: func
                });
            }
        });
    };
    //展示load广告
    AppCenter.showLoadAd = function (params) {
        var bool = this.isAndroidOrIos();
        if (bool == 1) {
            window["JSToNative"].postMessage(JSON.stringify({
                method: 'handleExposure',
                params: params
            }));
        }
        else if (bool == 2) {
            window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                method: 'handleExposure',
                params: params
            });
        }
    };
    //点击load的广告  params:{position,rowkey}
    AppCenter.handleClickLoadAd = function (params) {
        var bool = this.isAndroidOrIos();
        if (bool == 1) {
            window["JSToNative"].postMessage(JSON.stringify({
                method: 'handleClick',
                params: params
            }));
        }
        else if (bool == 2) {
            window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                method: 'handleClick',
                params: params
            });
        }
    };
    //通用弹窗广告
    AppCenter.openAppAdDiaLog = function (params) {
        var bool = this.isAndroidOrIos();
        if (bool == 1) {
            window["JSToNative"].postMessage(JSON.stringify({
                method: 'openAppAdDiaLog',
                params: {
                    gametype: "3",
                    type: "dftt_answer",
                    params: params
                },
            }));
        }
        else if (bool == 2) {
            window["webkit"].messageHandlers.JSToNative_iOS.postMessage({
                method: 'openAppAdDiaLog',
                params: {
                    gametype: "3",
                    type: "dftt_answer",
                    params: params
                }
            });
        }
    };
    //get config 由于服务器加载config有问题
    AppCenter.initGameConfig = function () {
        GameData.gameConfig = [];
    };
    //本地死数据测试
    AppCenter.runLocalGame = function () {
        GameData.userData = {
            "level": 1,
            "score": 0,
            "max_score": 100
        };
        GameData.baseData = {
            "ime": "860209042909016",
            "appqid": "xiaomi181113",
            "deviceid": "1d58795af05cb928",
            "ttaccid": "1000006349",
            "apptypeid": "DFTT",
            "ver": "2.3.6",
            "softname": "DFTTAndroid",
            "softtype": "TouTiao",
            "os": "Android8.1.0",
            "position": "上海",
            "network": "wifi",
            "androidId": "1d58795af05cb928",
            "istourists": "0",
            "logintype": "1",
            "is_share_install": "-1",
            "login_token": "dHZWQnlHOUlzVUwvOUpFU1J0bnprMUZmTk9aa0JLMWJUaG00MW12elJYQThYbm1UOERESmE5bXA1dURxcTBONEwrNll5d3RTMVZOVmF6WE5xejY1Q0cvajRPVko3RzFqTE9NNndudnJraldyN2s3ZW5LQmZId2RLQ0UyNWRLMUxrb3N4VDVUUkJTdkdoY2M4OEUrMHE4OS9qTGt2L0ZZN0pUYUZDK3hRTnIwPQ==", "shortVideo": "1"
        };
    };
    return AppCenter;
}());
//# sourceMappingURL=AppCenter.js.map