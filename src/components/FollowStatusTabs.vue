<template>
  <div class="main">
    <ul class="tabs">
      <router-link
        :to="{
          name: 'user-followers',
          params: { id: this.$route.params.id },
        }"
      >
        <li class="tabs__followers" :class="{ active: status.followers }">
          跟隨者
        </li>
      </router-link>
      <router-link
        :to="{
          name: 'user-followings',
          params: { id: this.$route.params.id },
        }"
      >
        <li class="tabs__following" :class="{ active: status.followings }">
          正在跟隨
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FollowStatusTabs",
  props: {
    status: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../styles/variables.scss";
.main {
  width: 100%;
  margin-top: 1rem;
  border: {
    left: 1px solid #e6ecf0;
    right: 1px solid #e6ecf0;
  }
  .tabs {
    display: flex;
    li {
      width: 130px;
      height: 3rem;
      text-align: center;
      line-height: 3rem;
      font: {
        size: 15px;
        weight: 700;
      }
      color: $secondaryTextColor;
    }
    .active {
      border-bottom: 2px solid $orange;
      color: $orange;
    }
  }
}
</style>
