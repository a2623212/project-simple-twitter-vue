<template>
  <div>
    <div class="container">
      <router-link
        class="avatar"
        :to="{ name: 'user-tweets', params: { id: tweet.UserId } }"
      >
        <img :src="tweet.image | emptyImage" alt="" class="avatar__pic" />
        <div class="title">
          <h4 class="title__name">{{ tweet.name }}</h4>
          <h4 class="title__id">@{{ tweet.account }}</h4>
        </div>
      </router-link>
      <div class="tweet-content">
        <p class="description">
          {{ tweet.description }}
        </p>
        <h5 class="create-time">{{ tweet.createdAt | fromNow }}</h5>
        <div class="count">
          <div class="count__number">{{ tweet.RepliesCount }}</div>
          <div class="count__unit">回覆</div>
          <div class="count__number">{{ tweet.LikesCount }}</div>
          <div class="count__unit">喜歡次數</div>
        </div>
        <div class="icon">
          <img
            src="./../assets/reply2.png"
            class="icon__reply"
            alt=""
            @click="showModal = true"
          />
          <Modal
            :show="showModal"
            :post="tweet"
            @close="showModal = false"
            @after-create-reply-modal="afterCreateReplyModal"
          />
          <img
            v-if="tweet.isLiked"
            src="./../assets/likedx2.png"
            class="icon__like"
            alt=""
            @click.stop.prevent="deleteLike(tweet.tweetId)"
          />
          <img
            v-else
            src="./../assets/like2.png"
            class="icon__like"
            alt=""
            @click.stop.prevent="addLike(tweet.tweetId)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "./ReplyModal.vue";
import moment from "moment";
import tweetAPI from "./../apis/tweets.js";
import { Toast } from "./../utils/helper";
import { emptyImageFilter } from "../utils/mixins";
//換moment語言到中文
moment.locale("zh-tw");

export default {
  mixins: [emptyImageFilter],
  props: {
    initialTweet: {
      type: Object,
      required: true,
    },
  },
  components: {
    Modal,
  },
  data() {
    return {
      showModal: false,
      tweet: this.initialTweet,
    };
  },
  watch: {
    initialTweet(newValue) {
      this.tweet = {
        ...this.tweet,
        ...newValue,
      };
    },
  },
  //格式化時間用
  filters: {
    fromNow(dateTime) {
      return dateTime ? moment(dateTime).format("aLT．LL") : "-";
    },
  },
  methods: {
    afterCreateReplyModal(payload) {
      this.$emit("after-create-reply-modal", payload);
      this.tweet.RepliesCount += 1;
    },
    async addLike(tweetId) {
      try {
        const { data } = await tweetAPI.addLike({ tweetId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.tweet = {
          ...this.tweet,
          isLiked: true,
        };
        this.tweet.LikesCount += 1;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "目前無法like",
        });
      }
    },
    async deleteLike(tweetId) {
      try {
        const { data } = await tweetAPI.deleteLike({ tweetId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.tweet = {
          ...this.tweet,
          isLiked: false,
        };
        this.tweet.LikesCount -= 1;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "目前無法unlike",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
  width: 600px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  border-top: 1px #e6ecf0 solid;
  margin-bottom: 5px;
  .description {
    word-break: break-all;
    font-size: 1.3rem;
    font-weight: 500;
    line-height: 34px;
  }
  .tweet-content {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
  }
  .avatar {
    display: flex;
    width: auto;
    max-width: 110px;
    .avatar__pic {
      margin-right: 10px;
      height: 50px;
      width: 50px;
      border-radius: 100%;
    }
    .title {
      margin-top: 5px;
      &__name {
        width: 200px;
        font-size: 15px;
        font-weight: bold;
      }
      &__id {
        width: 200px;
        font-weight: 500;
        font-size: 15px;
        color: #657786;
      }
    }
  }
  .create-time {
    color: #657786;
    margin: 1rem 0 1rem 0;
    font-weight: 500;
  }
  .count {
    display: flex;
    align-items: center;
    border-top: 1px #e6ecf0 solid;
    border-bottom: 1px #e6ecf0 solid;
    height: 68px;
    &__number {
      margin-right: 5px;
      font-weight: bold;
      font-size: 19px;
      color: #000000;
    }
    &__unit {
      margin-right: 20px;
      font-weight: bold;
      color: #657786;
    }
  }
  .icon {
    margin-top: 0.5rem;
    display: flex;
    &__reply,
    &__like {
      margin-right: 8rem;
      height: 25px;
      width: 25px;
      margin-top: 3px;
    }
  }
}
</style>