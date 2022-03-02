<template>
  <div id="setting" class="container">
    <div class="navbar">
      <Navbar :current-status="currentStatus" />
    </div>
    <div class="setting-account">
      <div class="title">
        <h1>帳戶設定</h1>
      </div>
      <!--       form block -->
      <form class="setting-form" @submit.stop.prevent="formSubmit()">
        <div class="form-label-group">
          <label for="account">帳號</label>
          <input
            id="account"
            v-model="account"
            type="text"
            class="form-control"
            required
          />
        </div>
        <div class="form-label-group">
          <label for="name">名稱</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="form-control"
            required
          />
        </div>
        <div class="form-label-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="text"
            class="form-control"
            required
          />
        </div>
        <div class="form-label-group">
          <label for="password">密碼</label>
          <input
            id="password"
            v-model="password"
            type="text"
            class="form-control"
            required
          />
        </div>
        <div class="form-label-group">
          <label for="password-check">密碼確認</label>
          <input
            id="password-check"
            v-model="checkPassword"
            type="text"
            class="form-control"
            required
          />
        </div>
        <div class="setting-block">
          <button class="btn" type="submit" :disabled="isProcessing">
            儲存
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import settingAPI from "./../apis/setting";
import { Toast } from "./../utils/helper";
import { mapState } from "vuex";

export default {
  name: "setting",
  components: {
    Navbar,
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    this.mapCurrentUser();
  },
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      checkPassword: "",
      isProcessing: false,
      currentStatus: {
        isIndex: false,
        isUser: false,
        isSetting: true,
      },
    };
  },
  methods: {
    async formSubmit() {
      if (
        !this.account.trim() ||
        !this.name.trim() ||
        !this.email.trim() ||
        !this.password.trim() ||
        !this.checkPassword.trim()
      ) {
        return Toast.fire({
          icon: "error",
          message: "不得留白",
        });
      }
      if (this.password.trim() !== this.checkPassword.trim()) {
        return Toast.fire({
          icon: "error",
          message: "密碼錯誤",
        });
      }
      if (this.email.trim().indexOf("@") === -1) {
        return Toast.fire({
          icon: "error",
          message: "email沒有@",
        });
      }
      try {
        const formData = {
          account: this.account ? this.account : this.currentUser.account,
          name: this.name ? this.name : this.currentUser.name,
          email: this.email ? this.email : this.currentUser.email,
          password: this.password,
          checkPassword: this.checkPassword,
        };
        this.isProcessing = true;
        console.log(formData);
        const { data } = await settingAPI.setUser({
          userId: this.currentUser.id,
          formData,
        });
        this.isProcessing = false;
        if (data.status === "error") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "成功更新帳戶資料！",
        });
      } catch (error) {
        this.isProcessing = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法設定帳戶資料，請稍後再試",
        });
      }
    },
    mapCurrentUser() {
      const { account, name, email } = this.currentUser;
      this.name = name;
      this.account = account;
      this.email = email;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../styles/variables.scss";
#setting {
  display: grid;
  grid-template-columns: 210px auto;
  column-gap: 30px;
}

.title {
  border-bottom: 1px solid $borderColor;
  height: 55px;
  line-height: 55px;
}

h1 {
  color: $mainColor;
  font-size: 19px;
  padding-left: 1rem;
}

.setting-account {
  border-left: 1px solid $borderColor;
}

.setting-form {
  padding: 1.875rem 25.3125rem 0 1rem;
  margin-bottom: 40rem;
  position: relative;
}
.form-label-group {
  position: relative;
  label {
    position: absolute;
    left: 0.625rem;
    top: 0.313rem;
    color: $secondaryTextColor;
    font-size: 15px;
    font-weight: 500;
    line-height: 15px;
  }
  input {
    width: 642px;
    height: 52px;
    border-radius: 4px;
    background-color: $formBgColor;
    padding: 1.25rem 0 0.25rem 0.625rem;
    margin-bottom: 1.875rem;
    color: $mainColor;
    font-size: 19px;
    font-weight: 500;
    border: none;
    border-bottom: 2px solid $secondaryTextColor;
    &:focus,
    &:hover {
      border-bottom: 2px solid #50b5ff;
    }
    .invalid-message {
      position: absolute;
      top: 50px;
      left: 2px;
      font: {
        weight: 500;
        size: 15px;
      }
      color: #fc5a5a;
    }
  }
  .invalid {
    border-bottom: 2px solid #fc5a5a;
  }
}
.setting-block {
  width: 642px;
  position: relative;
}
.btn {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50px;
  background-color: $orange;
  font-size: 18px;
  font-weight: 700;
  color: $white;
  margin-top: 0.625rem;
  padding: 0.625rem 2.5rem;
  border: none;
}
</style>