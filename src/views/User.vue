<template>
  <div class="container">
    <div class="navbar">
      <Navbar
        :current-status="currentStatus"
        @after-create-tweet-modal="afterCreateTweetModal"
      />
    </div>
    <div class="main">
      <header class="header">
        <button>
          <router-link
            :to="{ name: 'user', params: { id: this.$route.params.id } }"
            ><img
              src="./../assets/arrow.png"
              alt="backarrow"
              class="previous-btn"
            />
          </router-link>
        </button>
        <div class="title">
          <p class="user-name">{{ user.name }}</p>
          <p class="user-tweet">{{ tweets.length }} 推文</p>
        </div>
      </header>
      <div class="user-page-body">
        <router-view
          :user="user"
          :tweets="tweets"
          :likes="likes"
          :followers="Followers"
          :followings="Followings"
          :replies="replyTweets"
          @after-like="handleAddLike"
          @after-delete-like="handleDeleteLike"
          @after-update="handleUpdate"
          @after-delete-on-like="handleDeleteLikePost"
          @after-remove-followship="handleRemoveFollowship"
          @after-add-followship="handleAddFollowship"
          @after-del-followship="handleDelFollowship"
          @after-cancel-cover="handleCancelCover"
        />
      </div>
    </div>
    <div class="popular-users">
      <PopularUsers
        :change-top-user="topUsers"
        @after-remove-pop="handleRemovePop"
        @after-add-pop="handleAddPop"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import PopularUsers from "../components/PopularUsers.vue";
import usersAPI from "./../apis/users";
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helper";
import { mapState } from "vuex";

export default {
  name: "User",

  components: {
    Navbar,
    PopularUsers,
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    const userId = this.$route.params.id;
    this.fetchUser(userId);
    this.fetchTweets(userId);
    this.fetchLikes(userId);
    this.fetchReplies(userId);
    this.fetchFollowers(userId);
    this.fetchFollowings(userId);
    this.$watch(
      () => this.$route.params,
      (newV, oldV) => {
        if (newV.id === oldV.id) {
          return;
        } else {
          const userId = newV.id;
          this.fetchUser(userId);
          this.fetchTweets(userId);
          this.fetchLikes(userId);
          this.fetchReplies(userId);
          this.fetchFollowers(userId);
          this.fetchFollowings(userId);
        }
      }
    );
  },

  data() {
    return {
      currentStatus: {
        isIndex: false,
        isUser: true,
        isSetting: false,
      },
      user: {
        id: -1,
        name: "",
        avatar: "",
        introduction: "",
        account: "",
        cover: "",
        followersLength: 0,
        followingsLength: 0,
      },
      tweets: [],
      replyTweets: [],
      likes: [],
      Followers: [],
      Followings: [],
      topUsers: [],
      isLoading: true,
    };
  },
  methods: {
    async fetchUser(userId) {
      try {
        this.isLoading = true;
        const { data } = await usersAPI.get({ userId });
        if (data.status === "error") {
          console.log("error", data.message);
          Toast.fire({
            icon: "error",
            title: "無法取得該使用者資料，請稍後再試",
          });
        }
        const {
          id,
          name,
          avatar,
          introduction,
          account,
          cover,
          Followers,
          Followings,
        } = data;
        this.user = {
          id,
          name,
          avatar,
          introduction,
          account,
          cover,
          followersLength: Followers ? Followers.length : 0,
          followingsLength: Followings ? Followings.length : 0,
        };
        this.isLoading = false;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得該使用者資料，請稍後再試",
        });
      }
    },
    async fetchTweets(userId) {
      try {
        const { data } = await usersAPI.getTweets({ userId });
        if (data.status === "error") {
          console.log("error", data.message);
          Toast.fire({
            icon: "error",
            title: "無法取得該使用者推文資料，請稍後再試",
          });
        }
        this.tweets = data;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得該使用者推文資料，請稍後再試",
        });
      }
    },
    async fetchReplies(userId) {
      try {
        const { data } = await usersAPI.getReplies({ userId });
        if (data.status === "error") {
          console.log("error", data.message);
          Toast.fire({
            icon: "error",
            title: "無法取得該使用者回覆資料，請稍後再試",
          });
        }
        this.replyTweets = data;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得該使用者回覆資料，請稍後再試",
        });
      }
    },
    async fetchLikes(userId) {
      try {
        const { data } = await usersAPI.getLikes({ userId });
        if (data.status === "error") {
          console.log("error", data.message);
          Toast.fire({
            icon: "error",
            title: "無法取得該使用者喜愛資料，請稍後再試",
          });
        }
        this.likes = data;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得該使用者喜愛資料，請稍後再試",
        });
      }
    },
    async fetchFollowers(userId) {
      try {
        const { data } = await usersAPI.getFollowers({ userId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.Followers = data;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得該Followers資料，請稍後再試",
        });
      }
    },
    async fetchFollowings(userId) {
      try {
        const { data } = await usersAPI.getFollowings({ userId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.Followings = data;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得該Followings資料，請稍後再試",
        });
      }
    },
    async fetchTopUsers() {
      try {
        const { data } = await usersAPI.getTopUser();
        this.topUsers = data;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得Top使用者資料，請稍後再試",
        });
      }
    },
    async handleAddLike(tweetId) {
      try {
        const { data } = await tweetsAPI.addLike({ tweetId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.tweetId === tweetId) {
            return {
              ...tweet,
              LikesCount: tweet.LikesCount + 1,
              isLiked: true,
            };
          }
          return tweet;
        });
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法新增喜歡，請稍後再試",
        });
      }
    },
    async handleDeleteLike(tweetId) {
      try {
        const { data } = await tweetsAPI.deleteLike({ tweetId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.tweetId === tweetId) {
            return {
              ...tweet,
              LikesCount: tweet.LikesCount - 1,
              isLiked: false,
            };
          }
          return tweet;
        });
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取消喜歡，請稍後再試",
        });
      }
    },
    async handleDeleteLikePost(tweetId) {
      try {
        const { data } = await tweetsAPI.deleteLike({ tweetId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.likes = this.likes.filter((like) => {
          return like.TweetId !== tweetId;
        });
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取消喜歡，請稍後再試",
        });
      }
    },
    async handleRemoveFollowship(userId) {
      try {
        const { data } = await usersAPI.removeFollowship({ userId });
        if (data.status === "error") {
          throw new Error(data.message);
        }

        // 從Followings清單中移除相同id的人
        this.Followings = this.Followings.filter((user) => {
          return user.followingId !== userId;
        });
        // 正在追蹤人數變少
        this.followingsLength - 1;
        // 重整topuser資料
        this.fetchTopUsers();
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試",
        });
      }
    },
    async handleAddFollowship(userId) {
      try {
        const formData = { id: userId };
        const { data } = await usersAPI.addFollowship({ formData });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        // 對原本沒有追蹤的人追蹤
        this.Followers = this.Followers.map((user) => {
          if (user.followerId === userId) {
            return {
              ...user,
              isFollowed: true,
            };
          }
          return user;
        });
        this.fetchFollowings(this.user.id);
        // 追蹤人數加1
        this.followingsLength + 1;
        // 重整topuser資料
        this.fetchTopUsers();
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法新增追蹤，請稍後再試",
        });
      }
    },
    async handleDelFollowship(userId) {
      try {
        const { data } = await usersAPI.removeFollowship({ userId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        // 改變追蹤的狀態
        this.Followers = this.Followers.map((user) => {
          if (user.followerId === userId) {
            return {
              ...user,
              isFollowed: false,
            };
          }
          return user;
        });
        // 正在追蹤人數變少
        this.followingsLength - 1;
        // 重整topuser資料
        this.fetchTopUsers();
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試",
        });
      }
    },
    handleUpdate(formData) {
      const { name, avatar, cover, introduction } = formData;
      this.user = {
        ...this.user,
        name,
        avatar,
        cover,
        introduction,
      };
      this.fetchTweets(this.user.id);
    },
    handleRemovePop() {
      this.user.followingsLength - 1;
    },
    handleAddPop() {
      this.user.followingsLength + 1;
    },
    afterCreateTweetModal(payload) {
      const {
        UserId,
        name,
        image,
        account,
        description,
        createdAt,
        LikesCount,
        RepliesCount,
      } = payload;
      const createaData = {
        createdAt,
        description,
        image,
        LikesCount,
        RepliesCount,
        User: {
          id: UserId,
          name,
          account,
          avatar: image,
        },
        isLiked: false,
      };
      this.tweets.unshift(createaData);
    },
    handleCancelCover() {
      this.user.cover = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.container {
  display: grid;
  grid-template-columns: 210px 600px 350px;
  column-gap: 30px;
}
.main {
  width: 100%;
  height: auto;
}
.header {
  width: 100%;
  height: 55px;
  display: flex;
  align-content: center;
  border: {
    left: 1px solid #e6ecf0;
    right: 1px solid #e6ecf0;
  }
  .previous-btn {
    width: 17px;
    height: 14px;
    margin: 20px;
  }
  .title {
    margin-left: 1rem;
    .user-name {
      font-weight: 900;
      font-size: 19px;
    }
    .user-tweet {
      font-weight: 500;
      font-size: 13px;
      color: $secondaryTextColor;
    }
  }
}
</style>