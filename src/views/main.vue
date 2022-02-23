<template>
  <div class="container">
    <Navbar />
    <div class="main-page">
      <Tweet />
      <Posts />
    </div>
    <Popular />
  </div>
</template>

<script>
import Tweet from "../components/Tweet.vue";
import Posts from "../components/Posts.vue";
import Navbar from "../components/Navbar.vue";
import Popular from "../components/PopularUsers.vue";

export default {
  components: {
    Tweet,
    Posts,
    Navbar,
    Popular,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
