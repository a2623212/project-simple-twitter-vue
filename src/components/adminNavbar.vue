<template>
  <nav>
    <div id="logo">
      <router-link to="/login">
        <img src="../assets/Logo.png" alt="logo" />
      </router-link>
    </div>
    <div class="menu">
      <div class="adminItem index">
        <div class="menu__item">
          <img
            v-if="tweets"
            src="../assets/icon_atIndex.png"
            alt="index"
            class="index"
          />
          <img v-else src="../assets/index.png" alt="index" class="index" />
        </div>
        <button class="menu__item__title">
          <router-link to="/admin/tweets">
            <p :class="{ active: tweets }" id="routerTweets">推文清單</p>
          </router-link>
        </button>
      </div>
      <div class="adminItem userProfile">
        <div class="menu__item">
          <img
            v-if="users"
            src="../assets/icon_atUser.png"
            alt="index"
            class="user"
          />
          <img v-else src="../assets/user.png" alt="index" class="user" />
        </div>
        <button class="menu__item__title">
          <router-link to="/admin/user">
            <p :class="{ active: users }" id="routerUsers">使用者列表</p>
          </router-link>
        </button>
      </div>
    </div>
    <div id="log-out">
      <div>
        <img src="./../assets/Vector.png" alt="logoOut" class="icon" />
      </div>
      <p>登出</p>
    </div>
  </nav>
</template>
<script>
export default {
  name: "adminNavbar",
  created() {
    const location = this.$route.path.split("/")[2];
    this.setCurrentLocation(location);
  },
  data() {
    return {
      tweets: false,
      users: false,
    };
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/admin/singin");
    },
    setCurrentLocation(location) {
      console.log("location: " + location);
      if (location === "tweets") {
        this.tweets = true;
        this.users = false;
      } else {
        this.tweets = false;
        this.users = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./../styles/variables.scss";
nav {
  margin-right: 2rem;
  margin-top: 0.7rem;
  position: relative;
  // width:378px;
  height: 100%;
  #logo {
    width: 50px;
    height: 50px;
  }
  .menu {
    margin-top: 47.78px;
    &__item {
      display: flex;
      align-items: center;
      color: $mainColor;
      font-weight: 700;
      margin-top: 35px;
      &__title {
        margin-left: 20px;
      }
    }
  }
  .adminItem .menu_item_title .active p {
    color: $orange;
  }

  .index,
  .user {
    width: 22.75px;
  }

  #log-out {
    position: fixed;
    bottom: 1rem;
    display: flex;
    justify-content: center;
    cursor: pointer;
    .icon {
      display: inline-block;
      width: 18px;
      height: 16px;
    }
    p {
      margin-left: 23px;
      font-weight: 700;
    }
  }
}
</style>