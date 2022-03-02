<template>
  <div class="profile-main">
    <ProfileCard :user="user" />
    <ProfileTabs :status="status" />
    <UserRepliesPosts :replies="replies" />
  </div>
</template>

<script>
import ProfileCard from "./ProfileCard.vue";
import ProfileTabs from "./ProfileTabs.vue";
import UserRepliesPosts from "./UserRepliesPosts.vue";

export default {
  name: "UserReplies",
  components: {
    ProfileCard,
    ProfileTabs,
    UserRepliesPosts,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },

    replies: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      status: {
        tweets: false,
        replies: true,
        likes: false,
      },
    };
  },
};
</script>