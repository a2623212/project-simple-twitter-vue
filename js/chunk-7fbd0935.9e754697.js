(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7fbd0935","chunk-61c6196e"],{"1e84":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM2SURBVHgB7ZlLThtBEIYL20gRDwnEBgkQkxvADewTROyyizlB4ATgG2SbFWaZHTlBnBuYXXbphS17FyPbC8uv/L/jWIk10109D0Mif9LIzXRNd//d1TXVg8iaNYnIS0bsgYODg7c7OztBr9f7JhmxIRlwdHRUzuVyN9PpNJh1srFhJpNJpdlsViVlUhVwfHxcxM8NrmJoZxkISUWAa+Ah1Eaj0WW73TaSkEQCDg8Pg0KhcCf6gf8FXKw6Ho8rSYTEEsANuru7Sx+/khRIIsRLAAeOqPIeRQ58T9LnFq517yNELQB+Th/PauALfDe6U8BySFwVWiGRAmJElkygELjVdavVegitX77xUgYeQmjoXQhgSMzn8zdQXJYXzHLEWgg4OTn5vmo/jwvdqtvtnndAjjewUc/+lcETjnV7eztgeSZgc3PT4Kb5w6ZGlZIQtrnUbirtsIzoVGd5JsAY04FflVBxjT9LjUajhBD2VWIw7+waKfQ+OnnNi2Xcu4wrBpP5yHbwe8G2+/3++aIu6iFEo1v5FY18Bn+Pxq/om2H1QRDsDYfDDxjIO/Gjgkm9DasoSPRgDDoSLbCvY5bKNhuuNH7KmJxT8QjT8I56VF3O8lxdPEAnFx7mFQ9bQXjvRNVFCuDGFj01nwQM7lDjM1p77CH/FZgvd6TyJR7FH+0znag9RWwuRIwoOxF/tM9YXdkqABtTNUvY7KfiCdrWPvNkq7QK8HiZFcUTpOhFpWmiFTCigK/2eRargmcMbepiC6HEtQfUoRSrdceM1mVHGx6QRIkthBKrAJ9QyhmF/RebCCaNtPFJHG0hlDhftXCNH+J5DmbOjlzqM2baYMCdwWBwhvKbGGeNDt4Z+zaDgrgxuM7EAw4US19mGacouoHExOnCrj2gDqUZ8eQycApI41yQgFRWwMgz4QqhxClAPLPSNHGFUOIU4JmVpoorhBKnAM+sNE2sWehvNC5EjKweleuqBDxTKHWGUKISgM208o2MSXvQ2KkEIA2oygr3AUM3QmhNY6sSwI2MRkuyGhHs40J7xlYnKfgW2d7a2vqEN/M+rgC3Xkm6cOAf+QUan9Iz+7/ymjX/Gz8BDJO12uOTf7IAAAAASUVORK5CYII="},2708:function(t,e,s){"use strict";s.d(e,"a",(function(){return a}));const a={filters:{emptyImage(t){return t||"https://via.placeholder.com/350x220/DFDFDF?text=No+Image"}}}},4287:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t._self._c;return t.show?e("div",{staticClass:"modal-mask"},[e("div",{staticClass:"modal-wrapper"},[e("form",{staticClass:"modal-container",on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.handleSubmit.apply(null,arguments)}}},[e("div",{staticClass:"modal-header"},[e("button",{attrs:{name:"header"},on:{click:function(e){return t.$emit("close")}}},[e("img",{attrs:{src:s("aac3"),alt:""}})])]),e("div",{staticClass:"modal-body"},[e("img",{staticClass:"avatar",attrs:{src:t._f("emptyImage")(t.currentUser.avatar),alt:""}}),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],staticClass:"tweet",attrs:{name:"tweet",id:"",cols:"30",rows:"10",placeholder:"有什麼新鮮事?"},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}})]),e("div",{staticClass:"modal-footer"},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.textToMuch,expression:"textToMuch"}],staticClass:"warn"},[t._v("字數不可超過140字")]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.noSpace,expression:"noSpace"}],staticClass:"warn__2"},[t._v("內容不可空白")]),e("button",{staticClass:"modal-default-button",attrs:{disabled:t.isLoading}},[t._v(" 推文 ")])])])])]):t._e()},r=[],i=(s("d9e2"),s("6783")),o=s("c968"),n=s("2f62"),c=s("2708"),l={mixins:[c["a"]],props:{show:Boolean},data(){return{text:"",isLoading:!1,textToMuch:!1,noSpace:!1}},computed:{...Object(n["b"])(["currentUser","isAuthenticated"])},methods:{async handleSubmit(){if(this.isLoading=!0,this.text.trim().length>140)return this.isLoading=!1,this.noSpace=!1,this.textToMuch=!0;if(0===this.text.trim().length)return this.textToMuch=!1,this.isLoading=!1,this.noSpace=!0;try{const{data:t}=await i["a"].createTweet({image:this.currentUser.avatar,description:this.text});if(o["a"].fire({title:"推文發送成功"}),this.$emit("after-create-tweet-modal",{userAvatar:this.currentUser.avatar,UserId:this.currentUser.id,name:this.currentUser.name,image:this.currentUser.avatar,account:this.currentUser.account,description:this.text,RepliesCount:0,LikesCount:0,createdAt:new Date}),this.textToMuch=!1,this.noSpace=!1,this.text="",this.$emit("close"),this.isLoading=!1,"error"===t.status)throw this.isLoading=!1,new Error(t.message)}catch(t){Object(o["b"])({title:"目前無法推文"})}}}},A=l,u=(s("4b81"),s("2877")),d=Object(u["a"])(A,a,r,!1,null,"5b46823d",null);e["default"]=d.exports},4293:function(t,e,s){},"44cf":function(t,e,s){"use strict";s("487c")},"44e1":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJASURBVHgB7ZmLbdswEIa/dgJvUHYCOxOUG9QbVN0gGyQbtBvEnSDNBFYnaDOBlQncTtDwIhk4yY4kPvQAog/4ARogrTvyRB5PsLAQxTvSs3LaOq2rtvDX6dEpdyqYKWLsN6ej0/8W3TkZZoZxOtBuuNaBRE6kCCHjtKduUO70QBk6gqzOZyer+hROV6rPZEhInGZWwmfb0jejHmL3TIyhHhrbHmNsY4xlQvTs33mM26lx35kQ/eJaj3GWethNwibSCP0ufCCQ94RjVPsP/uSqfUUgqRx4xJ9/qr0ikBgH9END9vJCtQ2BxDgwC2Ic0LMeEgKxK/hCjAOFaq/xZ/3Kf42GzKA+UY3HWBMxNil7/DNMQ/0A9DnBz4jNRuUwEyd0POdOvyjjWsf2uupvG//xkYkvORn97wFax2rsLDDUw6lL0ndDAlLfiQ2lYaJmfvNEGSo/mcElZiEVQ5RVTiG0ol5WKSqFZK6DIkZmlC9mV0nltPvcM4MdSAy/oZ/RbeWVGyIIDSHL6wWqgjJMZNfRZRXZlTYtY75Sv+QMhszYpbC4pX8qcc3lQljUavShafyxMiaUjHNHBnOiafyeNFmk4fwUT+7EtvGAHenZMWDBSy/znuFopufBl31Nhn/OH4oYrLflWxKgZz9jeK5JWLWz1Gd/LPQq2LaOXZd6XW3OGY8fXLbhjC4HdOXggfHIVdu0dexy4Em1PzEO8iJ/Ub8LIrCEJ2qp1OejSSs7YCrjk338yJx+w2iGH4jLsRYW3gzPczpIIlWW9TAAAAAASUVORK5CYII="},"487c":function(t,e,s){},"4b81":function(t,e,s){"use strict";s("4293")},"58f6":function(t,e,s){"use strict";s("5bb8")},"5bb8":function(t,e,s){},"657c":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMMSURBVHgB7VnRcdswDH3N9T/pBGY3cCcoO0E8gjaoN7A2sDuBtIGSCZxOkG5gd4KkE6TiRTpBEAFSFu04F7873FkmHwgRIABJwAUXTMInHAdZLbe13DTXz7Xc11LizOEMfqzlRZBHdDd1liggG99KgTOF21lq6KYW20jOxt7MC7aWZWOQ9Yy1Bm49XBpaC0Hv0qM3CW4ao3g47GoxzRwaPr4wKcn4uvnPCHoLJPRS6GA6eWLXC48eG+Ac7cBXGO5OqSy8UXSFeHx8i4mwTGFOxgz67nc7uozQmeE19KiRloznbE2LCcgRl/4OcfUNZF4J/6YN8Bnx+KeMPWM8NM4LEsEioTsjYVKvSeN88qEaud4uNDmmmTNM0ReEQ8ZxXCqdNdd/a7mrZR/guTPxRK6/RnCiQHO2dmAN/IWplQpd4ZP4NKtNgjPU7eIacS6dI1ycWsPmih6qo8DrGRiV5dzkSlg8FzgGQ+OdJ9r+pvLchBF0LSF3sVE3IrUNpcKhBjov+XbYYFjAJGwgtxcqMg+hdaMEwzhGmTtnc2fKXBe+JYZnKlM4vZ3MEQfq8ruI+dSgmNbDYSOtccUm0hh7QBzMSM69wNVAjb6mA1d45+A3QAvULeKwH8n5LnBjOVpPNjjELl7dIV4oHMM48xFzjTLXNmvzrJghACmNrhUOPZg7wbA5+mm0UvQVODCNOriDXAoKpKxhMCxkFbpCxlOhVsgyTCxk9EYsuxmtP0nVSlAvufS5QIJnY2rYTJlnILch7ZkyCp++W4pq5o7dTpvmeo83bKdj+5dU2KZczyI+7aWCZWtabXKoElvyu0Sip6MAHmr5Bb8NA6RoJbTXIyGehGskgkXfnSs2xgtYFqHzJ/pZjWemFUaEUAx4ESrQf8wcU7E1XoFhBa6QAIe83LUePYsAx9c2JH1DXUIvTPSho/DooLvb7qzj7gS9UcaP/chn0bUBf9B/gFkQw9zYN8bdovPMD8bV9J4M/BPTCt0nJh77yUIjNbQ+SAuvs8HJP7Oe6kP3vpbfeAcfui/4cPgP3DPsRt9uv/kAAAAASUVORK5CYII="},6783:function(t,e,s){"use strict";var a=s("c968");const r=()=>localStorage.getItem("token");e["a"]={getTweets(){return a["c"].get("/tweets",{headers:{Authorization:"Bearer "+r()}})},getTweet({tweetId:t}){return a["c"].get("/tweets/"+t,{headers:{Authorization:`Bearer ${r()} `}})},createTweet({image:t,description:e}){return a["c"].post("/tweets",{image:t,description:e},{headers:{Authorization:`Bearer ${r()} `}})},addLike({tweetId:t}){return a["c"].post(`tweets/${t}/like`,null,{headers:{Authorization:"Bearer "+r()}})},deleteLike({tweetId:t}){return a["c"].post(`tweets/${t}/unlike`,null,{headers:{Authorization:"Bearer "+r()}})}}},"6d23":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACbSURBVHgBvZThDcAQEIVfOoERbvN2A93AKEYwgmp6ElEOUX3J++X5DjkHPKJgE+yCfcOa81VRJyi1k6CaQ0ewgizinOcbFRWrEvqkklOKwNqJLLt3T3WRGOTxBpaKiEDKYIQB5UCagZWAFmMtlNpuWKDlV56G/tI2OXSoseNgaP3jtIgINLy4o/1WinN3/pQqfjq+IlR3gowEuwDXfn/CSY55ogAAAABJRU5ErkJggg=="},"79d9":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container",attrs:{id:"setting"}},[e("div",{staticClass:"navbar"},[e("Navbar",{attrs:{"current-status":t.currentStatus}})],1),e("div",{staticClass:"setting-account"},[t._m(0),e("form",{staticClass:"setting-form",attrs:{novalidate:""},on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.formSubmit()}}},[e("div",{staticClass:"form-label-group"},[e("label",{attrs:{for:"account"}},[t._v("帳號")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.account,expression:"account"}],staticClass:"form-control",class:{invalid:t.error.account},attrs:{id:"account",type:"text",required:""},domProps:{value:t.account},on:{input:function(e){e.target.composing||(t.account=e.target.value)}}}),t.error.account?e("div",{staticClass:"invalid-message"},[t._v("帳號不得空白！")]):t._e()]),e("div",{staticClass:"form-label-group"},[e("label",{attrs:{for:"name"}},[t._v("名稱")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",class:{invalid:t.error.name},attrs:{id:"name",type:"text",required:""},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}}),t.error.name?e("div",{staticClass:"invalid-message"},[t._v("名稱不得空白！")]):t._e()]),e("div",{staticClass:"form-label-group"},[e("label",{attrs:{for:"email"}},[t._v("Email")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",class:{invalid:t.error.email.length||t.error.email.style},attrs:{id:"email",type:"text",required:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t.error.email.length?e("div",{staticClass:"invalid-message"},[t._v(" Email 不得空白！ ")]):t._e(),t.error.email.style?e("div",{staticClass:"invalid-message"},[t._v(' email沒有"@"！ ')]):t._e()]),e("div",{staticClass:"form-label-group"},[e("label",{attrs:{for:"password"}},[t._v("密碼")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",class:{invalid:t.error.password},attrs:{id:"password",type:"password",required:""},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t.error.password?e("div",{staticClass:"invalid-message"},[t._v(" 密碼不得空白！ ")]):t._e()]),e("div",{staticClass:"form-label-group"},[e("label",{attrs:{for:"password-check"}},[t._v("密碼確認")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.checkPassword,expression:"checkPassword"}],staticClass:"form-control",class:{invalid:t.error.checkPassword},attrs:{id:"password-check",type:"password",required:""},domProps:{value:t.checkPassword},on:{input:function(e){e.target.composing||(t.checkPassword=e.target.value)}}}),t.error.pwchecked?e("div",{staticClass:"invalid-message"},[t._v(" 確認密碼不得空白！ ")]):t._e()]),e("div",{staticClass:"setting-block"},[e("button",{staticClass:"btn",attrs:{type:"submit",disabled:t.isProcessing}},[t._v(" 儲存 ")])])])])])},r=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"title"},[e("h1",[t._v("帳戶設定")])])}],i=s("d178"),o=s("c968");const n=()=>localStorage.getItem("token");var c={setUser({userId:t,formData:e}){return o["c"].put(`/users/${t}/setting`,e,{headers:{Authorization:"Bearer "+n()}})}},l=s("2f62"),A={name:"setting",components:{Navbar:i["a"]},computed:{...Object(l["b"])(["currentUser","isAuthenticated"])},created(){this.mapCurrentUser()},data(){return{account:"",name:"",email:"",password:"",checkPassword:"",isProcessing:!1,currentStatus:{isIndex:!1,isUser:!1,isSetting:!0},error:{account:!1,name:!1,email:{length:!1,style:!1},password:!1,checkPassword:!1,count:0}}},methods:{async formSubmit(){if(!this.validiation())try{const t={account:this.account?this.account:this.currentUser.account,name:this.name?this.name:this.currentUser.name,email:this.email?this.email:this.currentUser.email,password:this.password,checkPassword:this.checkPassword};this.isProcessing=!0;const{data:e}=await c.setUser({userId:this.currentUser.id,formData:t});if(this.isProcessing=!1,"Error: email 已重複註冊！"===e.message)return void o["b"].fire({title:"Email已重覆註冊"});if("Error: account 已重複註冊！"===e.message)return void o["b"].fire({title:"帳號已重覆註冊"});if("Error: Passwords do not match!"===e.message)return void o["b"].fire({title:"密碼不一致，請再試一次"});o["a"].fire({title:"成功更新帳戶資料！"})}catch(t){this.isProcessing=!1,console.log("error",t),o["b"].fire({title:"無法設定帳戶資料，請稍後再試"})}},mapCurrentUser(){const{account:t,name:e,email:s}=this.currentUser;this.name=e,this.account=t,this.email=s},validiation(){return this.error.count=0,this.account.trim()||(this.error.account=!0,this.error.count+=1),this.name.trim()||(this.error.name=!0,this.error.count+=1),this.email.trim()||(this.error.email.length=!0,this.error.count+=1),this.password.trim()||(this.error.password=!0,this.error.count+=1),this.checkPassword.trim()||(this.error.checkPassword=!0,this.error.count+=1),-1===this.email.trim().indexOf("@")&&(this.error.email.style=!0,this.error.count+=1),this.password.trim()!==this.checkPassword.trim()&&(this.error.count+=1,o["b"].fire({title:"密碼不一致"})),!!this.error.count}}},u=A,d=(s("44cf"),s("2877")),m=Object(d["a"])(u,a,r,!1,null,"52a47460",null);e["default"]=m.exports},aac3:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACvSURBVHgBpZPLEcMgDER3qYRW0omP6SJt+JhO3EoqCTGCJHwkYMa6wIx4D4RGDHd4vLHB4ckdLyxEyTjZAI9zPSSxBh+Z2Vy0gHKzn0kK2AsTX/1LhDMRBI6JW1tOBzOdYXXAkFhwzLG7pZFIwoA7gSpJocKqQJHAgmM4WBGMfRN6CWXNSeBhdIdDmPkTBy3mCK7aaEg4g6sLFAlX4JHkO0xTWJ6753/5z87Gq+P8AWvcmeyQzGyUAAAAAElFTkSuQmCC"},d178:function(t,e,s){"use strict";var a=function(){var t=this,e=t._self._c;return e("nav",[e("div",{attrs:{id:"logo"}},[e("router-link",{attrs:{to:"/main"}},[e("img",{attrs:{src:s("bca0"),alt:"logo"}})])],1),e("div",{staticClass:"menu"},[e("ul",[e("li",{class:{active:t.currentStatus.isIndex}},[e("router-link",{staticClass:"menu__item",attrs:{to:"/main"}},[e("img",{staticClass:"index",attrs:{src:s("1e84"),alt:"index"}}),e("span",{staticClass:"menu__item__title"},[t._v("首頁")])])],1),e("li",{class:{active:t.currentStatus.isUser}},[e("router-link",{staticClass:"menu__item",attrs:{to:{name:"user",params:{id:t.currentUser.id}}}},[e("img",{staticClass:"user",attrs:{src:s("44e1"),alt:"index"}}),e("span",{staticClass:"menu__item__title"},[t._v("個人資料")])])],1),e("li",{class:{active:t.currentStatus.isSetting}},[e("router-link",{staticClass:"menu__item",attrs:{to:"/profile/setting"}},[e("img",{staticClass:"setting",attrs:{src:s("657c"),alt:"index"}}),e("span",{staticClass:"menu__item__title"},[t._v("設定")])])],1)])]),e("button",{staticClass:"twit-button",on:{click:function(e){t.showModal=!0}}},[t._v("推文")]),e("Modal",{attrs:{show:t.showModal},on:{close:function(e){t.showModal=!1},"after-create-tweet-modal":t.afterCreateTweetModal}}),e("div",{attrs:{id:"log-out"},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.logOut.apply(null,arguments)}}},[t._m(0),e("p",[t._v("登出")])])],1)},r=[function(){var t=this,e=t._self._c;return e("div",[e("img",{staticClass:"icon",attrs:{src:s("6d23"),alt:"logoOut"}})])}],i=(s("14d9"),s("4287")),o=s("2f62"),n={name:"Navbar",components:{Modal:i["default"]},computed:{...Object(o["b"])(["currentUser","isAuthenticated"])},props:{currentStatus:{type:Object,required:!0}},data(){return{showModal:!1}},methods:{afterCreateTweetModal(t){this.$emit("after-create-tweet-modal",t)},logOut(){localStorage.removeItem("token"),this.$router.push("/login")}}},c=n,l=(s("58f6"),s("2877")),A=Object(l["a"])(c,a,r,!1,null,"3a59062b",null);e["a"]=A.exports}}]);
//# sourceMappingURL=chunk-7fbd0935.9e754697.js.map