import { apiHelper } from "../utils/helper";
const getToken = () => localStorage.getItem('token')

export default {
  //main.vue首頁拿所有推文的api
  getTweets() {
    return apiHelper.get('/tweets',
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
  },
  //取得一篇tweet內容及其回覆清單
  getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`,
      {
        headers: { Authorization: `Bearer ${getToken()} ` }
      })
  },
  //新增一則推文 
  createTweet({ image, description }) {
    return apiHelper.post('/tweets', { image, description }, {
      headers: {
        Authorization: `Bearer ${getToken()} `
      }
    })
  },
  //推文可以加入like
  addLike({ tweetId }) {
    return apiHelper.post(`tweets/${tweetId}/like`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  //推文可以移除like
  deleteLike({ tweetId }) {
    return apiHelper.post(`tweets/${tweetId}/unlike`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}