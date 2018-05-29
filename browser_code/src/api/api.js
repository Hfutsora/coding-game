import axios from 'axios';

const getMapMsg = url => {
  return axios.get(url);
};

const postThroughMap = params => {
  return axios.post('/v1/game/throughStandardMap', {
    params
  });
};

const getFreeMaps = params => {
  return axios.get('/v1/game/getCustomGame', {
    params: params
  });
};

const getPassMsg = playerId => {
  return axios.get(`/v1/game/getGameScore/${playerId}`);
};

const logOut = () => {
  return axios.get(`/v1/game/logout`);
};

const cancelMap = params => {
  return axios.post('/v1/game/collectionMap', {
    params: params
  });
};

const getCollection = (userId, params) => {
  return axios.get(`/v1/game/getCollection/${userId}`, {
    query: params
  });
};

const getCustomeGame = (userId, params) => {
  return axios.get(`/v1/game/getCustomeGame/${userId}`, {
    query: params
  });
};

const getGameScore = userId => {
  return axios.get(`/v1/game/getGameScore/${userId}`);
};

const getPlayer = userId => {
  return axios.get(`/v1/game/getPlayer/${userId}`);
};

const recharge = playerId => {
  return axios.post(`/v1/game/recharge`, {
    playerId: playerId
  });
};

const getMap = playerId => {
  return axios.post('v1/game/map', {
    id: playerId
  });
};

const getStandardMapDetail = (mapId, params) => {
  return axios.get(`v1/game/getStandardMapDetail/${mapId}`, {
    params
  });
};

const throughStandardMap = params => {
  return axios.post('/v1/game/throughStandardMap', params);
};

const getCustomMapDetail = mapId => {
  return axios.get(`/v1/game/getCustomMapDetail/${mapId}`);
};

const saveCustomGame = (playerId, params) => {
  return axios.post(`/v1/game/saveCustomGame/${playerId}`, params);
};

const testCustomGame = params => {
  return axios.post(`/v1/game/testCustomGame`, params);
};

const publishCustomGame = params => {
  return axios.post(`/v1/game/publishCustomGame`, params);
};

export {
  getMapMsg,
  postThroughMap,
  getFreeMaps,
  getPassMsg,
  logOut,
  cancelMap,
  getCollection,
  getCustomeGame,
  getGameScore,
  getPlayer,
  recharge,
  getMap,
  getStandardMapDetail,
  throughStandardMap,
  getCustomMapDetail,
  saveCustomGame,
  testCustomGame,
  publishCustomGame
};
