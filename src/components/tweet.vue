<template>
  <div class="container">
    <h1 class="home">首頁</h1>
    <form action="" class="form" @submit.stop.prevent="handleSubmit">
      <img :src="currentUser.image | emptyImage" alt="" class="avatar" />
      <div class="right-place">
        <textarea
          name="tweet"
          id=""
          cols="30"
          rows="10"
          placeholder="有什麼新鮮事?"
          class="textarea"
          v-model="text"
        ></textarea>
        <div class="submit-group">
          <div class="warn" v-show="textToMuch">字數不可超過140字</div>
          <div class="warn__2" v-show="noSpace">內容不可空白</div>
          <button type="submit" class="btn-tweet" :disabled="isLoading">
            推文
          </button>
        </div>
      </div>
    </form>
    <div class="divide"></div>
  </div>
</template>

<script>
import tweetsAPI from "../apis/tweets.js";
import { Toast } from "./../utils/helper";
import { mapState } from "vuex";
import { emptyImageFilter } from "../utils/mixins";

export default {
  mixins: [emptyImageFilter],
  data() {
    return {
      text: "",
      isLoading: false,
      textToMuch: false,
      noSpace: false,
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      if (this.text.trim().length > 140) {
        this.isLoading = false;
        this.noSpace = false;
        return (this.textToMuch = true);
      }
      if (this.text.trim().length === 0) {
        this.textToMuch = false;
        this.isLoading = false;
        return (this.noSpace = true);
      }
      try {
        const { data } = await tweetsAPI.createTweet({
          image: this.currentUser.avatar,
          description: this.text,
        });
        this.isLoading = false;
        if (data.status === "error") {
          this.isLoading = false;
          throw new Error(data.message);
        }
        this.$emit("after-create-tweet", {
          UserId: this.currentUser.id,
          name: this.currentUser.name,
          image: this.currentUser.avatar,
          account: this.currentUser.account,
          description: this.text,
          RepliesCount: 0,
          LikesCount: 0,
          createdAt: new Date(),
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法推文",
        });
      }
      this.text = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 600px;
  display: flex;
  flex-direction: column;
  .home {
    opacity: 0.9;
    z-index: 995;
    position: fixed;
    top: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    width: 600px;
    height: 55px;
    font-size: 18px;
    border: 1px solid #e6ecf0;
    margin: 0;
    padding-left: 10px;
    font-weight: bold;
  }
  .form {
    margin-top: 55px;
    position: relative;
    border: 1px solid #e6ecf0;
    width: 600x;
    height: 120px;
    display: flex;
    .avatar {
      width: 50px;
      height: 50px;
      position: relative;
      margin-top: 10px;
      margin-left: 15px;
      border-radius: 100%;
    }
    .right-place {
      display: flex;
      flex-direction: column;
      textarea {
        margin-top: 20px;
        margin-left: 5px;
        resize: none;
        width: 530px;
        height: 94px;
        border: none;
        font-size: 25px;
      }
      textarea::-webkit-input-placeholder {
        font-size: 18px;
        font: #9197a3;
        font-family: "Noto Sans TC";
      }
    }
    .submit-group {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-right: 20px;
      margin-bottom: 10px;
      .warn {
        margin-right: 10px;
        margin-top: 8px;
        width: 138px;
        height: 15px;
        font-size: 15px;
        color: #fc5a5a;
        font-weight: 500;
      }
      .warn__2 {
        margin-right: 10px;
        margin-top: 8px;
        width: 100px;
        height: 15px;
        font-size: 15px;
        color: #fc5a5a;
        font-weight: 500;
      }
      .btn-tweet {
        // position: absolute;
        height: 38px;
        width: 66px;
        font-size: 18px;
        color: #ffffff;
        background-color: #ff6600;
        border-radius: 100px;
        // left: 520px;
        // top: 70px;
      }
    }
  }
  .divide {
    height: 10px;
    width: 600px;
    background-color: #e6ecf0;
  }
}
</style>