<template>
  <div class="container">
    <div class="avatar">
      <img :src="tweet.user.avatar | emptyImage" alt="" />
    </div>
    <div class="tweet-info">
      <div class="title__formNow">
        <span>{{ tweet.user.name }}</span> @{{ tweet.user.account }}・{{
          tweet.createdAt | fromNow
        }}
      </div>
      <p>
        {{ tweet.description | slice }}
      </p>
    </div>
    <div class="delete" @click.stop.prevent="handleDeleteButtonClick(tweet.id)">
      <img src="../assets/delete_list.png" alt="" class="delete__list" />
    </div>
  </div>
</template>
<script>
import { fromNowFilter } from "../utils/mixins";
import { emptyImageFilter } from "../utils/mixins";
import { Toast } from "../utils/helpers";
export default {
  name: "AdminTweetItem",
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    Tweet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tweet: this.Tweet,
    };
  },
  methods: {
    async handleDeleteButtonClick(tweetId) {
      try {
        this.$emit("after-delete-tweet", tweetId);
        Toast.fire({
          icon: "success",
          title: "刪除成功！",
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳移除最愛，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
  filters: {
    slice(description) {
      if (!description) return "-";
      return description.slice(0, 50);
    },
  },
};
</script>