<template>
  <div>
    <FollowStatusTabs :status="status" />
    <FollowCards :followers="followers" :status="status" v-on="$listeners" />
  </div>
</template>
<script>
import FollowStatusTabs from "./FollowStatusTabs.vue";
import FollowCards from "./FollowCards.vue";

export default {
  name: "Followers",
  components: {
    FollowStatusTabs,
    FollowCards,
  },
  props: {
    followers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      status: {
        followings: false,
        followers: true,
      },
    };
  },
};
</script>
