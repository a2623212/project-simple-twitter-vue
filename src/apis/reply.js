import { apiHelper } from "../utils/helper";
const getToken = () => localStorage.getItem('token')

export default {
  //新增一則貼文  failure
  createReply({ tweetId, comment }) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, { tweetId, comment }, {
      headers: {
        Authorization: `Bearer ${getToken()} `
      }
    })
  },
}