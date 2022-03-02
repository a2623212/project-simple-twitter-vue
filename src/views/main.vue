<template>
  <div class="container">
    <Navbar
      @after-create-tweet-modal="afterCreateTweetModal"
      :current-status="currentStatus"
    />
    <div class="main-page">
      <Tweet @after-create-tweet="afterCreateTweet" />
      <Posts :initial-post="post" v-for="post in posts" :key="post.tweetId" />
    </div>
    <Popular />
  </div>
</template>

<script>
import Tweet from "../components/tweet.vue";
import Posts from "../components/posts.vue";
import Navbar from "../components/Navbar.vue";
import Popular from "../components/PopularUsers.vue";
import tweetsAPI from "../apis/tweets.js";
import { Toast } from "./../utils/helper";
import { mapState } from "vuex";

export default {
  //main是保留字，會報錯
  // name: "main",
  components: {
    Tweet,
    Posts,
    Navbar,
    Popular,
  },

  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  data() {
    return {
      posts: [],
      currentStatus: {
        isIndex: true,
        isUser: false,
        isSetting: false,
      },
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const { data } = await tweetsAPI.getTweets();
        if (data.status === "error") {
          console.log("error", data.message);
        }
        this.posts = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得該推文資料，請稍後再試",
        });
      }
    },
    //後端無法接收資料，原因未知
    async afterCreateTweet(payload) {
      const {
        UserId,
        name,
        image,
        account,
        description,
        RepliesCount,
        LikesCount,
        createdAt,
      } = payload;
      this.posts.unshift({
        UserId,
        name,
        image,
        account,
        description,
        RepliesCount,
        LikesCount,
        createdAt,
      });
    },
    async afterCreateTweetModal(tweet) {
      try {
        const { data } = await tweetsAPI.createTweet({ tweet });
        console.log(data);
        const {
          tweetId,
          UserId,
          name,
          image,
          account,
          description,
          RepliesCount,
          LikesCount,
          createdAt,
        } = tweet;
        this.posts.unshift({
          tweetId,
          UserId,
          name,
          image,
          account,
          description,
          RepliesCount,
          LikesCount,
          createdAt,
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "目前無法推文，請稍後再試",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>