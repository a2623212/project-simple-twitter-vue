<template>
  <div>
    <router-link
      class="router-to-reply"
      tag="div"
      :to="{ name: 'reply', params: { id: post.tweetId } }"
    >
      <div class="container">
        <router-link
          class="avatar"
          :to="{ name: 'user-tweets', params: { id: post.UserId } }"
        >
          <img :src="post.image | emptyImage" alt="" class="avatar__pic" />
        </router-link>
        <div class="tweet-content">
          <div class="title">
            <router-link
              :to="{ name: 'user-tweets', params: { id: post.UserId } }"
              class="title__name"
              >{{ post.name }}</router-link
            >
            <router-link
              :to="{ name: 'user-tweets', params: { id: post.UserId } }"
              class="title__id"
              >@{{ post.account }}．</router-link
            >
            <h4 class="title__formNow">{{ post.createdAt | fromNow }}</h4>
          </div>
          <p class="description">
            {{ post.description }}
          </p>
          <div class="icon">
            <router-link to="/">
              <img
                src="../assets/reply2.png"
                class="icon__reply"
                alt=""
                @click="showModal = true"
              />
              <Modal
                :show="showModal"
                :post="post"
                @close="showModal = false"
                @after-create-reply-modal="afterCreateReplyModal"
              />
            </router-link>
            <h5>{{ post.RepliesCount }}</h5>
            <img
              src="../assets/likedx2.png"
              class="icon__like"
              alt=""
              v-if="post.isLiked"
              @click.stop.prevent="deleteLike(post.tweetId)"
            />
            <img
              src="../assets/like2.png"
              class="icon__like"
              alt=""
              v-else
              @click.stop.prevent="addLike(post.tweetId)"
            />
            <h5>{{ post.LikesCount }}</h5>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import moment from "moment";
import Modal from "./ReplyModal.vue";
import { Toast } from "./../utils/helper";
import tweetsAPI from "./../apis/tweets";
import { emptyImageFilter } from "./../utils/mixins";

export default {
  components: {
    Modal,
  },
  mixins: [emptyImageFilter],
  props: {
    initialPost: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      post: this.initialPost,
      showModal: false,
    };
  },
  watch: {
    initialPost() {
      this.post = this.initialPost;
    },
  },
  methods: {
    afterCreateReplyModal() {
      this.post.RepliesCount += 1;
    },
    async addLike(tweetId) {
      try {
        const { data } = await tweetsAPI.addLike({ tweetId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.post = {
          ...this.post,
          isLiked: true,
        };
        this.post.LikesCount += 1;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "目前無法加入愛心",
        });
      }
    },
    async deleteLike(tweetId) {
      try {
        const { data } = await tweetsAPI.deleteLike({ tweetId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.post = {
          ...this.post,
          isLiked: false,
        };
        this.post.LikesCount -= 1;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "目前無法移除愛心",
        });
      }
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
.router-to-reply {
  z-index: -1;
  cursor: pointer;
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
    word-break: break-all;
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
        &:hover {
          text-decoration: underline;
        }
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
    display: flex;
    position: relative;
    margin-bottom: 5px;
    h5 {
      font-size: 13px;
      margin-left: 5px;
      margin-right: 50px;
      z-index: 5;
    }
    &__reply,
    &__like {
      &:hover {
        background-color: rgb(189, 189, 189);
      }
      z-index: 5;
      height: 15px;
      width: 15px;
      margin-top: 3px;
      margin-right: 10px;
    }
  }
}
</style>