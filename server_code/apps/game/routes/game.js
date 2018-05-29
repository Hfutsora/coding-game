const kexpress = require('kexpress');
const Router = kexpress.core.router.Router;
const router = new Router();
const actions = require('../actions/game');

router.post('/login', actions.actionLogin);
router.post('/loginPasswd', actions.actionLoginPasswd);
router.put('/register', actions.actionRegister);
router.get('/veriCode/:tel', actions.actionGetVerifyCode);
router.get('/getPlayer/:playerId', actions.actionGetPlayer);
router.post('/modifyInformation/:playerId', actions.actionModifyInfo);
router.post('/modifyPortrait/:playerId', actions.actionModifyPortrait);
router.get('/getGameScore/:playerId', actions.actionGetStages);
router.get('/getCollection/:playerId', actions.actionGetCollections);
router.get('/getCustomeGame/:playerId', actions.actionGetCustomGames);
router.post('/praiseMap', actions.actionPraise);
router.post('/collectionMap', actions.actionCollectGame);
router.post('/deleteCustomMap', actions.actionDelCustomGame);
router.get('/getStages/:playerId', actions.actionStageList);
router.get('/getStandardMapDetail/:mapId', actions.actionGetDetailStandard);
router.get('/getCustomMapDetail/:mapId', actions.actionGetDetailCustom);
router.post('/throughStandardMap', actions.actionThroughStage);
router.post('/checkPay', actions.actionAliPay);
router.post('/recharge', actions.actionRecharge);
router.get('/getCustomGame', actions.actionGetAllCustomGames);
router.post('/saveCustomGame/:playerId', actions.actionSaveCustomGame);
router.post('/testCustomGame', actions.actionTestCustomGame);
router.post('/publishCustomGame', actions.actionPublishCustomGame);
router.post('/scoreCustomGame', actions.actionScoreCustomGame);
router.get('/logout', actions.actionLogout);

module.exports = {
    router: router
};
