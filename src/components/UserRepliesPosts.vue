<template>
  <div class="main">
    <router-link
      class="router-to-reply"
      tag="div"
      :to="{ name: 'reply', params: { id: reply.Tweet.tweetId } }"
      v-for="reply in replies"
      :key="reply.replyId"
    >
      <div class="container">
        <div class="avatar">
          <router-link :to="{ name: 'user', params: { id: reply.User.id } }">
            <img
              :src="reply.User.avatar | emptyImage"
              alt=""
              class="avatar__pic"
            />
          </router-link>
        </div>
        <div class="tweet-content">
          <div class="title">
            <router-link
              :to="{ name: 'user', params: { id: reply.User.id } }"
              class="title__name"
              >{{ reply.User.name }}</router-link
            >
            <router-link
              :to="{ name: 'user', params: { id: reply.User.id } }"
              class="title__id"
              >@{{ reply.User.account }}</router-link
            >
            <div class="title__formNow">．{{ reply.createdAt | fromNow }}</div>
          </div>

          <div class="hashtag">
            <span class="hashtag__reply">回覆</span>
            <router-link
              :to="{ name: 'user', params: { id: reply.Tweet.TweetUserId } }"
              class="hashtag__userid"
              >@{{ reply.Tweet.TweetUserAccount }}</router-link
            >
          </div>
          <p class="description">{{ reply.comment }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
import moment from "moment";
import { emptyImageFilter } from "./../utils/mixins";
//換moment語言到中文
moment.locale("zh-tw");
export default {
  name: "UserRepliesPosts",
  mixins: [emptyImageFilter],
  props: {
    replies: {
      type: Array,
      required: true,
    },
  },
  filters: {
    fromNow(dateTime) {
      return dateTime ? moment(dateTime).fromNow() : "-";
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  border-bottom: 1px solid #e6ecf0;
}
.container {
  width: 600px;
  min-height: 100px;
  display: flex;
  border: {
    left: 1px solid #e6ecf0;
    right: 1px solid #e6ecf0;
    top: 1px solid #e6ecf0;
  }
  padding-bottom: 5px;
  .description {
    font-size: 15px;
  }
  .tweet-content {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    .title {
      margin-bottom: 6px;
      font-size: 15px;
      display: flex;
      &__name {
        color: #1c1c1c;
        margin-right: 5px;
        font-weight: bold;
      }
      &__id,
      &__formNow {
        color: #657786;
        font-weight: 500;
      }
    }
  }
  .avatar {
    .avatar__pic {
      margin-right: 10px;
      margin-top: 15px;
      margin-left: 10px;
      height: 50px;
      width: 50px;
      border-radius: 100%;
    }
  }
  .hashtag {
    font-size: 15px;
    margin: 0 0 5px 0;
    &__reply {
      color: #657786;
    }
    &__userid {
      color: #ff6600;
    }
  }
}
</style>
