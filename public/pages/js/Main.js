var Handler = Laya.Handler;
var Loader = Laya.Loader;
var WebGL = Laya.WebGL;
Laya.init(1334, 750, WebGL);
Laya.stage.bgColor = "#000000";
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
Laya.stage.screenMode = "horizontal";
//性能面板
// Laya.DebugPanel.init();
// Laya.DebugTool.init();
function beginLoad() {
    var resArr = [
        { url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS },
    ];
    Laya.loader.load(resArr, Handler.create(null, onLoaded));
}
function onLoaded() {
    Game.instance().setStage(Laya.stage);
}
//# sourceMappingURL=Main.js.map