<template>
  <div id="popular-users">
    <p class="title">Popular</p>
    <div class="users-list">
      <div class="item" v-for="user in topUsers" :key="user.id">
        <!-- 點頭像可以連結至該使用者頁面 -->
        <router-link
          :to="{ name: 'user', params: { id: user.id } }"
          class="image"
        >
          <!-- 缺少頭像 -->
          <img :src="user.avatar | emptyImage" alt="avatar" />
        </router-link>
        <div class="info">
          <p class="name">{{ user.name }}</p>
          <span class="account">@{{ user.account }}</span>
        </div>

        <button
          class="following-btn"
          v-if="user.isFollowing"
          @click.stop.prevent="removeFollowing(user.id)"
        >
          正在跟隨
        </button>
        <button
          class="follow-btn"
          v-else
          @click.stop.prevent="addFollowing(user.id)"
        >
          跟隨
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helper";
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "PopularUsers",
  mixins: [emptyImageFilter],
  created() {
    this.fetchTopUsers();
  },
  data() {
    return {
      topUsers: [],
    };
  },
  methods: {
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
    async removeFollowing(userId) {
      try {
        const { data } = await usersAPI.removeFollowship({ userId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.topUsers = this.topUsers.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowing: false,
            };
          }
          return user;
        });
        this.$emit("after-remove-pop", userId);
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試",
        });
      }
    },
    async addFollowing(userId) {
      try {
        const { data } = await usersAPI.addFollowship({ userId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.topUsers = this.topUsers.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowing: true,
            };
          }
          return user;
        });
        this.$emit("after-add-pop", userId);
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法新增追蹤，請稍後再試",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../styles/variables.scss";
#popular-users {
  min-width: 350px;
  width: 350px;
  height: auto;
  background-color: $formBgColor;
  border-radius: 14px;
  margin-top: 15px;
  margin-left: 30px;
  padding: 10px 15px;
  .title {
    font-weight: 700;
  }
  .users-list {
    margin-top: 20px;
  }
  .item {
    margin-top: 10px;
    width: 100%;
    height: 70px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e6ecf0;
    .image {
      display: inline-block;
      width: 50px;
      height: 50px;
      img {
        border-radius: 50%;
      }
    }
    .info {
      position: absolute;
      top: 18px;
      left: 60px;
      font-size: 15px;
      line-height: 15px;
      font-weight: 700;
      .account {
        color: $secondaryTextColor;
      }
    }
    .following-btn {
      width: 90px;
      height: 35px;
      background-color: $orange;
      border-radius: 100px;
      color: $white;
      font-size: 15px;
      font-weight: 700;
    }
    .follow-btn {
      width: 60px;
      height: 35px;
      border: 1px solid $orange;
      border-radius: 100px;
      color: $orange;
      font-size: 15px;
      font-weight: 700;
    }
  }
}
</style>
