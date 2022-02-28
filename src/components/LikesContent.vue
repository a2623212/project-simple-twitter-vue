<template>
  <div class="main">
    <router-link
      class="router-to-reply"
      tag="div"
      :to="{ name: 'reply', params: { id: like.TweetId } }"
      v-for="like in likes"
      :key="like.TweetId"
    >
      <div class="container">
        <router-link
          class="avatar"
          :to="{ name: 'user', params: { id: like.Tweet.User.id } }"
        >
          <img
            :src="like.Tweet.image | emptyImage"
            alt=""
            class="avatar__pic"
          />
        </router-link>
        <div class="tweet-content">
          <div class="title">
            <router-link
              :to="{ name: 'user', params: { id: like.Tweet.User.id } }"
              class="title__name"
              >{{ like.Tweet.User.name }}</router-link
            >
            <router-link
              :to="{ name: 'user', params: { id: like.Tweet.User.id } }"
              class="title__id"
              >@{{ like.Tweet.User.account }}．</router-link
            >
            <h4 class="title__formNow">{{ like.Tweet.createdAt | fromNow }}</h4>
          </div>
          <p class="description">
            {{ like.Tweet.description }}
          </p>
          <div class="icon">
            <router-link
              :to="{ name: 'user-likes', params: { id: like.userId } }"
            >
              <img
                src="../assets/reply2.png"
                class="icon__reply"
                alt=""
                @click="showModal = true"
              />
              <Modal
                :show="showModal"
                @close="showModal = false"
                @after-create-reply-modal="afterCreateReplyModal"
              />
            </router-link>
            <h5>{{ like.Tweet.repliesCount }}</h5>

            <img
              src="../assets/icon_heart_pk.png"
              class="icon__like"
              alt=""
              @click.stop.prevent="deleteLike(like.TweetId)"
            />
            <h5 class="icon__quantity">{{ like.Tweet.likesCount }}</h5>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import moment from "moment";
import Modal from "./ReplyModal.vue";
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "LikesContent",
  mixins: [emptyImageFilter],
  components: {
    Modal,
  },
  props: {
    likes: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    afterCreateReplyModal(payload) {
      console.log(payload);
    },
    deleteLike(tweetId) {
      this.$emit("after-delete-on-like", tweetId);
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
.router-to-reply {
  z-index: 1;
}
.container {
  &:hover {
    background-color: rgb(240, 240, 240);
  }
  width: 600px;
  min-height: 100px;
  display: flex;
  border-top: 1px #e6ecf0 solid;
  border-right: 1px #e6ecf0 solid;
  border-left: 1px #e6ecf0 solid;
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
        margin-right: 5px;
        font-weight: bold;
        &:hover {
          text-decoration: underline;
        }
      }
      &__id {
        color: #657786;
        font-weight: 500;
      }
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
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .icon {
    margin-top: 0.5rem;
    margin-bottom: 8px;
    display: flex;
    position: relative;
    h5 {
      font-size: 13px;
      margin-left: 5px;
      margin-right: 50px;
      z-index: 5;
    }
    &__reply,
    &__like {
      &:hover {
        filter: invert(4%) sepia(4%) saturate(6670%) hue-rotate(22deg)
          brightness(89%) contrast(88%);
      }
      z-index: 5;
      height: 15px;
      width: 15px;
      margin-top: 3px;
      margin-right: 10px;
    }
    &__quantity {
      color: #e0245e;
    }
  }
}
</style>