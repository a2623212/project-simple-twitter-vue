import { apiHelper } from "../utils/helper";
const getToken = () => localStorage.getItem('token')

export default {
  // 取得User的資料 (需要user ID)
  get({userId}){
    return apiHelper.get(`/users/${userId}`,{headers:{Authorization:`Bearer ${getToken()}`}})
  },
  // 取得User的推文資料 (需要user ID)
  getTweets({userId}){
    return apiHelper.get(`/users/${userId}/tweets`, {headers:{Authorization:`Bearer ${getToken()}`}})
  },
  // 取得User的回覆資料  (需要user ID)
  getReplies({userId}){
    return apiHelper.get(`/users/${userId}/replied_tweets`, {headers:{Authorization:`Bearer ${getToken()}`}})
  },
  // 取得User的喜愛內容 (需要user ID)
  getLikes({userId}){
    return apiHelper.get(`/users/${userId}/likes`, {headers:{Authorization:`Bearer ${getToken()}`}})
  },
  // 取得topUser的資料 
  getTopUser(){
    return apiHelper.get('/users/top', {headers:{Authorization:`Bearer ${getToken()}`}} )
  },
  // 取得follower的資料
  getFollowers({userId}){
    return apiHelper.get(`/users/${userId}/followers`, {headers:{Authorization:`Bearer ${getToken()}`}} )
  },
  //取得following的資料
  getFollowings({userId}){
    return apiHelper.get(`/users/${userId}/followings`, {headers:{Authorization:`Bearer ${getToken()}`}} )
  },
  // 上傳個人資料更新
  update({userId,formData}){
    return apiHelper.put(`/users/${userId}`, formData, {headers:{Authorization:`Bearer ${getToken()}`}})
  },
  // 取消追蹤
  removeFollowship({userId}){
    return apiHelper.delete(`/followships/${userId}`,{headers:{Authorization:`Bearer ${getToken()}`}})
  },
  // 新增追蹤
  addFollowship({userId}){
    return apiHelper.post(`/followships/${userId}`,null,{headers:{Authorization:`Bearer ${getToken()}`}})
  }
}