<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <button class="close-btn" @click.stop.prevent="clickCancel">
              <img src="../assets/X.png" alt="" />
            </button>
            <h4 class="title">編輯個人資料</h4>
          </div>

          <form
            class="modal-body"
            @submit.stop.prevent="handleSubmit"
            novalidate
          >
            <div class="cover-edit">
              <img
                :src="user.cover | emptyImage"
                alt="cover"
                class="cover-edit__picture"
              />
              <div class="upload-cover">
                <div class="upload-cover__upload">
                  <label
                    for="cover_uploads"
                    class="upload-cover__upload__label"
                  >
                    <img src="./../assets/icon_uploadPhoto.png" alt="upload" />
                  </label>
                  <input
                    type="file"
                    class="cover"
                    id="cover_uploads"
                    name="cover_uploads"
                    accept=".jpg, .jpeg, .png"
                    @change="handleCoverFileChange"
                  />
                </div>
                <div class="upload-cover__cancel">
                  <img
                    src="./../assets/icon_delete.png"
                    alt="delete"
                    class="upload-cover__cancel__icon"
                    @click.stop.prevent="cancelCover"
                  />
                </div>
              </div>
            </div>
            <div class="user-avatar-edit">
              <img
                :src="user.avatar"
                alt="avatar"
                class="user-avatar-edit__picture"
              />
              <div class="user-avatar-edit__upload">
                <label for="avatar_uploads">
                  <img src="./../assets/icon_uploadPhoto.png" alt="upload" />
                </label>
                <input
                  type="file"
                  id="avatar_uploads"
                  class="avatar"
                  name="avatar_uploads"
                  accept=".jpg, .jpeg, .png"
                  @change="handleAvatarFileChange"
                />
              </div>
            </div>
            <div class="user-name-edit">
              <label for="name">名稱</label>

              <input
                type="text"
                id="name"
                name="name"
                size="50"
                v-model="user.name"
                :class="{ invalid: error.name || error.nameLength }"
                required
              />
              <div class="input-limit">{{ inputNameLength }}/50</div>
              <div v-if="error.name" class="invalid-message--name">
                名稱不可為空！
              </div>
              <div v-if="error.nameLength" class="invalid-message--length">
                字數超出上限！
              </div>
            </div>
            <div class="user-description-edit">
              <label for="story">自我介紹</label>
              <textarea
                id="introduction"
                name="introduction"
                v-model="user.introduction"
                :class="{ invalid: error.introLength }"
              >
              </textarea>
              <div class="input-limit">{{ inputIntroLength }}/160</div>
              <div v-if="error.introLength" class="invalid-message">
                字數超出上限！
              </div>
            </div>
            <button class="save-btn" type="submit" :disabled="isProcessing">
              儲存
            </button>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
export default {
  name: "ProfileEditModal",
  mixins: [emptyImageFilter],
  props: {
    show: Boolean,
    initialUser: {
      type: Object,
      required: true,
    },
    isProcessing: Boolean,
  },
  created() {
    this.fetchuser();
  },
  data() {
    return {
      user: {
        name: "",
        avatar: "",
        introduction: "",
        cover: "",
      },
      inputForm: {},
      error: {
        name: false,
        nameLength: false,
        introLength: false,
      },
    };
  },
  methods: {
    fetchuser() {
      const { name, avatar, cover } = { ...this.initialUser };
      this.user = {
        name,
        avatar,
        cover,
      };
    },
    clickCancel() {
      this.inputForm = {};
      this.$emit("close");
    },
    checkForm() {
      const { name, introduction } = { ...this.user };
      const { username, nameLength, introLength } = {
        username: name,
        nameLength: name ? name.length : 0,
        introLength: introduction ? introduction.length : 0,
      };
      if (!username) {
        this.error.name = true;
        return true;
      } else {
        this.error.name = false;
      }

      if (nameLength > 50) {
        this.error.nameLength = true;
        return true;
      } else {
        this.error.nameLength = false;
      }

      if (introLength > 160) {
        this.error.introLength = true;
        return true;
      } else {
        this.error.introLength = false;
      }
      return false;
    },
    handleSubmit() {
      if (this.checkForm()) return;
      this.inputForm = {
        ...this.initialUser,
        ...this.user,
      };
      const formData = this.inputForm;
      this.$emit("after-submit", formData);
    },
    // 沒有用?
    handleCoverFileChange(e) {
      console.log(e.target);
      const { files } = e.target;
      console.log(files);
      if (files.length === 0) {
        this.user.cover = "";
        return;
      } else {
        const coverImageURL = window.URL.createObjectURL(files[0]);
        this.user.cover = coverImageURL;
        console.log("cover", coverImageURL);
      }
    },
    handleAvatarFileChange(e) {
      const { files } = e.target;

      if (files.length === 0) {
        this.user.avatar = "";
        return;
      } else {
        const ImageURL = window.URL.createObjectURL(files[0]);
        this.user.avatar = ImageURL;
      }
    },

    cancelCover() {
      this.user.cover = "";
      this.$emit("after-cancel-cover");
    },
  },
  watch: {
    show() {
      this.fetchuser();
    },
    user: {
      handler() {
        const { name, introduction } = { ...this.user };
        const { username, nameLength, introLength } = {
          username: name,
          nameLength: name ? name.length : 0,
          introLength: introduction ? introduction.length : 0,
        };
        if (!username) {
          this.error.name = true;
        } else {
          this.error.name = false;
        }

        if (nameLength > 50) {
          this.error.nameLength = true;
        } else {
          this.error.nameLength = false;
        }

        if (introLength > 160) {
          this.error.introLength = true;
        } else {
          this.error.introLength = false;
        }
      },
      deep: true,
    },
  },
  computed: {
    inputNameLength: function () {
      return this.user.name.length;
    },
    inputIntroLength: function () {
      return this.user.introduction ? this.user.introduction.length : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../styles/variables.scss";

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  height: 657px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  margin-top: 0;
  display: flex;
  align-items: center;
  line-height: 60px;
  position: relative;
  .close-btn {
    margin-left: 20px;
  }
  .title {
    font: {
      weight: 700;
      size: 19px;
    }
    margin-left: 44px;
  }
}

.modal-body {
  position: relative;
}
.cover-edit {
  position: relative;
  width: 598px;
  height: 200px;
  &__picture {
    opacity: 0.5;
  }
  .upload-cover {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 100px;
    transform: translateY(-50%);
    &__upload {
      &__label {
        width: 20px;
        height: 20px;
        position: relative;
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
          position: absolute;
          top: 0;
        }
      }
      input {
        display: none;
      }
    }
    &__cancel {
      width: 20px;
      height: 20px;
      margin-left: 37px;
      position: relative;
      cursor: pointer;
      &:hover::before {
        position: absolute;
        width: 80px;
        top: -20px;
        left: 1px;
        text-align: center;
        opacity: 0.7;
        color: $white;
        font-size: 13px;
        background: $orange;
        padding: 1px;
        border-radius: 5px;
        content: "取消封面相片";
      }
    }
  }
}
.user-avatar-edit {
  widows: 120px;
  height: 120px;
  position: absolute;
  top: 140px;
  left: 14px;
  background-color: $white;
  border-radius: 50%;
  &__picture {
    border: 4px solid $white;
    border-radius: 50%;
    opacity: 0.5;
  }
  &__upload {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    label {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateX(-50%);
      width: 24px;
      height: 24px;
      cursor: pointer;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 24px;
        height: 24px;
      }
    }
    input {
      display: none;
    }
  }
}
.user-name-edit {
  position: relative;
  margin : {
    top: 80px;
    left: 15px;
  }
  width: 570px;
  height: 54px;
  background-color: #f5f8fa;
  border-radius: 4px;
  .input-limit {
    position: absolute;
    bottom: -20px;
    right: 0;
    font: {
      weight: 500;
      size: 15px;
    }
    color: $secondaryTextColor;
  }
  .invalid-message {
    &--name,
    &--length {
      position: absolute;
      bottom: -20px;
      left: 0;
      font: {
        weight: 500;
        size: 15px;
      }
      color: #fc5a5a;
    }
  }
}
.user-description-edit {
  margin : {
    top: 42px;
    left: 15px;
  }
  width: 570px;
  height: 150px;
  background-color: #f5f8fa;
  border-radius: 4px;
  position: relative;
  .input-limit {
    position: absolute;
    bottom: -22px;
    right: 0;
    font: {
      weight: 500;
      size: 15px;
    }
    color: $secondaryTextColor;
  }
  .invalid-message {
    position: absolute;
    bottom: -22px;
    left: 0;
    font: {
      weight: 500;
      size: 15px;
    }
    color: #fc5a5a;
  }
}
label {
  font: {
    weight: 500;
    size: 15px;
  }
  color: $secondaryTextColor;
  margin-bottom: 4px;
  margin-left: 15px;
  height: 22px;
}
input,
textarea {
  width: 100%;
  padding-left: 15px;
  border: 0;
  display: inline-block;
  vertical-align: middle;
  background: none;
  resize: none;
  font-size: 19px;

  border-bottom: 2px solid #657786;
  &:focus,
  &:hover {
    border-bottom: 2px solid #50b5ff;
  }
}
textarea {
  font-family: "Noto Sans TC";
  height: 128px;
}

.save-btn {
  width: 66px;
  height: 28px;
  background-color: $orange;
  border-radius: 100px;
  font-weight: 500;
  font-size: 18px;
  color: $white;
  position: absolute;
  right: 15px;
  top: -43px;
}
.invalid {
  border-bottom: 2px solid #fc5a5a;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

/* .modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
} */
</style>