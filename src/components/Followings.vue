<template>
  <div>
    <FollowStatusTabs :status="status" />
    <FollowCards :followings="followings" :status="status" v-on="$listeners" />
  </div>
</template>

<script>
import FollowStatusTabs from "./FollowStatusTabs.vue";
import FollowCards from "./FollowCards.vue";

export default {
  name: "Following",
  components: {
    FollowStatusTabs,
    FollowCards,
  },
  props: {
    followings: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      status: {
        followings: true,
        followers: false,
      },
    };
  },
};
</script>
