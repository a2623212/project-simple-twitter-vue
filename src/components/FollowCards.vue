<template>
  <div class="main">
    <div v-if="status.followings">
      <div v-if="!followings[0]" class="empty">目前沒有追蹤者</div>
      <div
        class="container"
        v-for="user in followings"
        :key="user.followingId"
        v-else
      >
        <router-link :to="{ name: 'user', params: { id: user.followingId } }">
          <div class="avatar">
            <img :src="user.avatar | emptyImage" alt="" class="avatar__pic" />
          </div>
        </router-link>
        <div class="tweet-content">
          <div class="title">
            <h4 class="title__name">{{ user.name }}</h4>
            <h4 class="title__id">@{{ user.account }}</h4>
          </div>
          <p class="description">
            {{ user.introduction }}
          </p>
          <div class="follow-btn">
            <button
              class="follow-btn__follow"
              @click.stop.prevent="removeFollowship(user.followingId)"
              v-show="user.isFollowed"
            >
              正在跟隨
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="status.followers">
      <div v-if="!followers[0]" class="empty">目前沒有跟隨者</div>
      <div
        class="container"
        v-for="user in followers"
        :key="user.followerId"
        v-else
      >
        <router-link :to="{ name: 'user', params: { id: user.followerId } }">
          <div class="avatar">
            <img :src="user.avatar" alt="" class="avatar__pic" />
          </div>
        </router-link>
        <div class="tweet-content">
          <div class="title">
            <h4 class="title__name">{{ user.name }}</h4>
            <h4 class="title__id">@{{ user.account }}</h4>
          </div>
          <p class="description">
            {{ user.introduction }}
          </p>
          <div class="follow-btn">
            <button
              class="follow-btn__follow"
              v-if="user.isFollowed"
              @click.stop.prevent="deleteFollowship(user.followerId)"
            >
              正在跟隨
            </button>
            <button
              class="follow-btn__unfollow"
              v-else
              @click.stop.prevent="addFollowship(user.followerId)"
            >
              跟隨
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
export default {
  name: "FollowCards",
  props: {
    followings: {
      type: Array,
      default: null,
    },
    followers: {
      type: Array,
      default: null,
    },
    status: {
      type: Object,
      required: true,
    },
  },
  mixins: [emptyImageFilter],
  methods: {
    removeFollowship(userId) {
      this.$emit("after-remove-followship", userId);
    },
    deleteFollowship(userId) {
      this.$emit("after-del-followship", userId);
    },
    addFollowship(userId) {
      this.$emit("after-add-followship", userId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../styles/variables.scss";
.main {
  border: {
    left: 1px solid #e6ecf0;
    right: 1px solid #e6ecf0;
    bottom: 1px solid #e6ecf0;
  }
}
.empty {
  height: 2rem;
  border: {
    top: 1px #e6ecf0 solid;
    right: 1px #e6ecf0 solid;
    left: 1px #e6ecf0 solid;
  }
  text-align: center;
  font-size: 15px;
  line-height: 2rem;
}
.container {
  width: 600px;
  min-height: 100px;
  display: flex;
  border-top: 1px #e6ecf0 solid;
  margin-bottom: 5px;
  position: relative;
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
      &__name {
        margin-right: 5px;
        font-weight: bold;
      }
      &__id {
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
  .follow-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    &__follow {
      width: 90px;
      height: 25px;
      border-radius: 100px;
      background-color: $orange;
      font: {
        weight: 700;
        size: 15px;
      }
      color: $white;
      text-align: center;
    }
    &__unfollow {
      width: 62px;
      height: 25px;
      border-radius: 100px;
      border: 1px solid $orange;
      font: {
        weight: 700;
        size: 15px;
      }
      color: $orange;
      text-align: center;
    }
  }
}
</style>