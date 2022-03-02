<template>
  <div class="container">
    <Navbar :current-status="currentStatus" :current-user="currentUser" />
    <div>
      <a @click="$router.go(-1)" class="previous-page">
        <img src="./../assets/arrow.png" alt="" />
        <h4>推文</h4>
      </a>
      <Post
        :initial-tweet="reply"
        @after-create-reply-modal="afterCreateReplyModal"
      />
      <ReplyList
        :name="reply.name"
        :reply="item"
        v-for="item in reply.Replies"
        :key="item.replyId"
      />
    </div>
    <Popular />
  </div>
</template>

<script>
const dummyCurrentUser = {
  id: 14,
  name: "user1",
  email: "user1@example.com",
  avatar: "https://loremflickr.com/140/140/people?random=100",
  introduction:
    "Sint amet reprehenderit et eligendi est harum. Quis facere placeat. Quia molestiae error optio dolor",
  role: "",
  account: "user1",
  cover: "https://loremflickr.com/600/200/nature?random=100",
  createdAt: "2022-02-26T03:59:35.000Z",
  updatedAt: "2022-02-26T03:59:35.000Z",
};

import Post from "../components/post.vue";
import ReplyList from "../components/replyList.vue";
import Navbar from "../components/Navbar.vue";
import Popular from "../components/PopularUsers.vue";
import tweetAPI from "./../apis/tweets.js";
import { Toast } from "./../utils/helper";
// import replyAPI from "./../apis/reply.js";

export default {
  components: {
    Post,
    ReplyList,
    Navbar,
    Popular,
  },
  data() {
    return {
      currentUser: dummyCurrentUser,
      reply: {},
      currentStatus: {
        isIndex: true,
        isUser: false,
        isSetting: false,
      },
    };
  },
  created() {
    const tweetId = this.$route.params.id;
    this.fetchReply(tweetId);
  },
  methods: {
    async fetchReply(tweetId) {
      try {
        const { data } = await tweetAPI.getTweet({ tweetId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.reply = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "目前無法取得貼文資訊",
        });
      }
    },
    async afterCreateReplyModal(payload) {
      const { tweetId, comment } = payload;
      this.reply.Replies.unshift({
        UserId: this.currentUser.id,
        comment,
        createdAt: new Date(),
        tweetId,
        name: this.currentUser.name,
        account: this.currentUser.account,
        avatar: this.currentUser.avatar,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  width: 600px;
  .previous-page {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    img {
      width: 17px;
      height: 14px;
      margin-right: 2.5rem;
    }
    h4 {
      margin-right: 5rem;
      font-size: 18px;
      // font-weight: bold;
    }
  }
}
</style>