<template>
  <div class="container">
    <h1 class="home-page">首頁</h1>
    <form action="" class="form">
      <img src="https://i.imgur.com/aVE1Jo0.png" alt="" class="avatar" />
      <textarea
        name="tweet"
        id=""
        cols="30"
        rows="10"
        placeholder="有什麼新鮮事?"
        class="textarea"
      ></textarea>
      <button type="submit" class="btn-tweet">推文</button>
    </form>
    <div class="divide"></div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 600px;
  h1 {
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
    position: relative;
    border: 1px solid #e6ecf0;
    width: 600px;
    height: 120px;
    display: flex;
    .avatar {
      width: 50px;
      height: 50px;
      position: relative;
      margin-top: 10px;
      margin-left: 15px;
    }
    textarea {
      margin-top: 20px;
      margin-left: 5px;
      resize: none;
      width: 600px;
      height: 94px;
      border: none;
    }
    textarea::-webkit-input-placeholder {
      font-size: 18px;
      font: #9197a3;
    }
    .btn-tweet {
      position: absolute;
      height: 38px;
      width: 66px;
      font-size: 18px;
      color: #ffffff;
      background-color: #ff6600;
      border-radius: 100px;
      left: 520px;
      top: 70px;
    }
  }
  .divide {
    height: 10px;
    width: 600px;
    background-color: #e6ecf0;
  }
}
</style>
