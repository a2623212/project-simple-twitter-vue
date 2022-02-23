<template>
  <div id="popular-users">
    <p class="title">Popular</p>
    <div class="users-list">
      <div class="item">
        <!-- 點頭像可以連結至該使用者頁面 -->
        <router-link to="#" class="image">
          <img src="https://fakeimg.pl/50/" alt="" />
        </router-link>
        <div class="info">
          <p class="name">Pizza Hut</p>
          <span class="account">@pizzahut</span>
        </div>
        <button class="follow-btn d-none">跟隨</button>
        <button class="following-btn">正在跟隨</button>
      </div>
      <div class="item">
        <router-link to="#" class="image">
          <img src="https://fakeimg.pl/50/" alt="" />
        </router-link>
        <div class="info">
          <p class="name">McDonald's</p>
          <span class="account">@McDonalds</span>
        </div>
        <button class="follow-btn">跟隨</button>
        <button class="following-btn d-none">正在跟隨</button>
      </div>
      <div class="item">
        <router-link to="#" class="image">
          <img src="https://fakeimg.pl/50/" alt="" />
        </router-link>
        <div class="info">
          <p class="name">McDonald's</p>
          <span class="account">@McDonalds</span>
        </div>
        <button class="follow-btn">跟隨</button>
        <button class="following-btn d-none">正在跟隨</button>
      </div>
      <div class="item">
        <router-link to="#" class="image">
          <img src="https://fakeimg.pl/50/" alt="" />
        </router-link>
        <div class="info">
          <p class="name">McDonald's</p>
          <span class="account">@McDonalds</span>
        </div>
        <button class="follow-btn">跟隨</button>
        <button class="following-btn d-none">正在跟隨</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PopularUsers",
};
</script>

<style lang="scss" scoped>
@import "./../styles/variables.scss";
#popular-users {
  min-width: 350px;
  width: 350px;
  height: 756px;
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
