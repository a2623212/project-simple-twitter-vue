<template>
  <div class="profile-main">
    <ProfileCard :user="user" v-on="$listeners" />
    <ProfileTabs :status="status" />
    <UserTweetsPosts :tweets="tweets" v-on="$listeners" />
  </div>
</template>

<script>
import ProfileCard from "./ProfileCard.vue";
import ProfileTabs from "./ProfileTabs.vue";
import UserTweetsPosts from "./UserTweetsPosts.vue";

export default {
  name: "UserTweets",
  props: {
    user: {
      type: Object,
      required: true,
    },

    tweets: {
      type: Array,
      required: true,
    },
  },
  components: {
    ProfileCard,
    ProfileTabs,
    UserTweetsPosts,
  },
  data() {
    return {
      status: {
        tweets: true,
        replies: false,
        likes: false,
      },
    };
  },
};
</script>