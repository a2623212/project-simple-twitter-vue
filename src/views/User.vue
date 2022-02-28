<template>
  <div class="container">
    <div class="navbar">
      <Navbar
        :current-status="currentStatus"
        :current-user="currentUser"
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
          :current-user="currentUser"
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
        />
      </div>
    </div>
    <div class="popular-users">
      <PopularUsers />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import PopularUsers from "../components/PopularUsers.vue";
import usersAPI from "./../apis/users";
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helper";

const dummyUser = {
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

export default {
  name: "User",
  components: {
    Navbar,
    PopularUsers,
  },
  created() {
    const userId = this.$route.params.id;
    this.fetchUser(userId);
    this.fetchTweets(userId);
    this.fetchLikes(userId);
    this.fetchReplies(userId);
    this.fetchFollowers(userId);
    this.fetchFollowings(userId);
    this.fetchCurrentUser();
  },
  //這不是一個好方法
  beforeRouteUpdate(to, from, next) {
    const id = to.params.id;
    this.fetchUser(id);
    this.fetchTweets(id);
    this.fetchLikes(id);
    this.fetchReplies(id);
    this.fetchFollowers(id);
    this.fetchFollowings(id);
    next();
  },
  data() {
    return {
      currentUser: {},
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
    };
  },
  methods: {
    fetchCurrentUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyUser,
      };
    },
    async fetchUser(userId) {
      try {
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
        this.Followings = this.Followings.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowed: false,
            };
          }
          return user;
        });
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
        const { data } = await usersAPI.addFollowship({ userId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.Followers = this.Followers.map((user) => {
          if (user.followerId === userId) {
            return {
              ...user,
              isFollowed: true,
            };
          }
          return user;
        });
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
        this.Followers = this.Followers.map((user) => {
          if (user.followerId === userId) {
            return {
              ...user,
              isFollowed: false,
            };
          }
          return user;
        });
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
