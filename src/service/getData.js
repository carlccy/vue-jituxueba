import http from './http'
import {getStore} from './mUtils'

/**
 * 获取首页Banner
 */
export const getBanner = () => http.post('/Banner/bannerList')

/**
 * 获取用户个人信息
 */
export const getUser = () => http.post('/User/userMyInfo', {
  token: getStore('token'),
  uid: getStore('uid')
})

/**
 * 获取频道列表
 */
export const getChannelList = () => http.get('/Channel/channelList')

/**
 * 获取我的关注（频道内容）
 * @param {*string} token 
 * @param {*string} uid 
 * @param {*int} type 0、全部，1、视频，2、图文，3、音频
 * @param {*int} page 页码默认为1
 */
export const getMyFollow = (token,uid,type,page) => http.post('/User/myFollowContent', {
  token: token,
  uid: uid,
  v: "1.0.1",
  page_num: page,
  show_row: 10,
  contentType: type
})

/**
 * 频道内容(新)
 * @param {*string} token 
 * @param {*string} uid 
 * @param {*int} id 频道id
 * @param {*int} type 0、全部，1、视频，2、图文，3、音频
 * @param {*int} page 页码默认为1
 */
export const getChannelDetail = (token,uid,id,type,page) => http.post('/ContentList', {
  token: token,
  uid: uid,
  channelId: id,
  content_type: type,
  page: page
})

/**
 * 获取首页banner
 */
export const getBannerList = () => http.post('/Banner/bannerList', {
  deviceType: 1
})

/**
 * 获取首页热门推荐
 * @param {*int} page 页码
 */
export const getHotContentList = (page = 1) => http.post('/BoothPageHot/hotContentList', {
  currentPage: page,
  count: 10
})

/**
 * 获取图文详情
 * @param {*string} token 
 * @param {*string} uid 
 * @param {*int} textId 图文id
 */
export const getTextDetail = (token, uid, textId) => http.post('/Text/textDetail', {
  token: token,
  uid: uid,
  textId: textId,
  clientType: 3, // H5
  v: '1.0.0'
})

/**
 * 获取视频详情
 * @param {*string} uid 
 * @param {*int} videoId 视频id
 */
export const getVideoDetail = (uid, videoId) => http.post('/Video/detail', {
  user_id: uid,
  id: videoId,
})

/**
 * 
 * @param {*string} token 
 * @param {*string} uid 
 * @param {*int} voice_id 音频id
 */
export const getAudioDetail = (token, uid, voice_id) => http.post('/Voice/getVoiceMsg', {
  token: token,
  uid: uid,
  voice_id: voice_id,
  play_device: 3 // H5
})

/**
 * 获取评论列表
 * @param {*string} token 
 * @param {*string} uid 
 * @param {*int} objId 图文音视频id
 * @param {*int} commentType 1、视频，2、图文，3、音频
 * @param {*int} page 页码默认1
 */
export const getCommentList = (token, uid, objId, commentType, page) => http.post('/Comment/comentList', {
  token: token,
  uid: uid,
  objId: objId,
  commentType: commentType,
  page: page,
  cutpage: 10
})

/**
 * 相关推荐换一换
 * @param {*int} contentId 图文音视频id
 * @param {*int} contentType 1、视频，2、图文，3、音频
 */
export const getRecommendContent = (contentId, contentType) => http.post('/Content/recommendContent', {
  contentId: contentId,
  contentType: contentType
})
