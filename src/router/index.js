import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "@/views/NotFound.vue";
import BlankPage from "@/views/BlankPage.vue";
import adminLogin from "../views/admin.vue";

Vue.use(VueRouter);

const routes = [
  // 跟目錄
  {
    path: "/",
    name: "root",
    redirect: "/login",
  },
  // 首頁
  // main
  {
    path: "/main",
    name: "main",
    component: () => import("../views/main.vue"),
  },
  // 首頁發推特
  {
    path: "/main/tweet",
    name: "mainTweet",
    component: BlankPage,
  },
  // navbar推文按鈕的的modal
  {
    path: "/tweet",
    name: "tweet",
    component: () => import("../components/TweetModal.vue"),
  },
  {
    path: "/reply/modal",
    name: "reply/modal",
    component: () => import("../components/UserTweets.vue"),
  },
  {
    // 單一推文
    // reply
    path: "/reply/:id",
    name: "reply",
    component: () => import("../views/reply.vue"),
  },

  // Settings
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register"),
  },
  // user
  {
    path: "/user/:id",
    name: "user",
    component: () => import("@/views/User.vue"),
    redirect: "/user/:id/tweets",
    children: [
      // 推文 tab
      {
        path: "tweets",
        name: "user-tweets",
        component: () => import("@/components/UserTweets.vue"),
      },
      // 推文與回覆 tab
      {
        path: "replies",
        name: "user-replies",
        component: () => import("@/components/UserReplies.vue"),
      },
      // 喜歡的內容 tab
      {
        path: "likes",
        name: "user-likes",
        component: () => import("@/components/UserLikes.vue"),
      },
      // 跟隨者
      {
        path: "followers",
        name: "user-followers",
        component: () => import("@/components/Followers.vue"),
      },
      // 正在跟隨者
      {
        path: "followings",
        name: "user-followings",
        component: () => import("@/components/Followings.vue"),
      },
    ],
  },
  // user setting
  {
    path: "/profile/setting",
    name: "setting",
    component: () => import("../views/setting.vue"),
  },
  // admin
  {
    path: "/admin",
    name: "admin-root",
    redirect: "/admin/signin",
  },
  {
    path: "/admin/signin",
    name: "admin-signin",
    component: adminLogin,
  },
  {
    path: "/admin/main",
    name: "admin-main",
    component: BlankPage,
    //     component: () => import('../views/adminTweet.vue')
  },
  {
    path: "/admin/users",
    name: "admin-users",
    component: BlankPage,
    //       component: () => import('../views/adminUser.vue')
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;