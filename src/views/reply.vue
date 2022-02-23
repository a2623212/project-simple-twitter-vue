<template>
  <div class="container">
    <Navbar />
    <div>
      <div class="previous-page">
        <img src="./../assets/arrow.png" alt="" />
        <h1>推文</h1>
      </div>
      <Post />
      <ReplyList />
    </div>
    <Popular />
  </div>
</template>

<script>
import Post from "../components/Post.vue";
import ReplyList from "../components/ReplyList.vue";
import Navbar from "../components/Navbar.vue";
import Popular from "../components/PopularUsers.vue";

export default {
  components: {
    Post,
    ReplyList,
    Navbar,
    Popular,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  width: 600px;
  .previous-page {
    display: flex;
    align-items: center;
    padding: 10px;
    img {
      width: 17px;
      height: 14px;
      margin-right: 2.5rem;
    }
    h1 {
      margin-right: 5rem;
      font-size: 18px;
    }
  }
}
</style>
