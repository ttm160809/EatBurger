import{_ as l,m as u,o as c,b as m,d as s,h as p,j as a,l as d}from"./index-CgHBEOTy.js";import{s as f}from"./sweetAlertStore-w7mpYN6A.js";var _={VITE_URL:"https://vue3-course-api.hexschool.io",VITE_NAME:"eatburgertest",BASE_URL:"/EatBurger/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:h}=_,b={data(){return{user:{username:"eatburger@test.com",password:"eatburgertest"}}},methods:{...u(f,["errorToast"]),login(){this.$http.post(`${h}/v2/admin/signin`,this.user).then(r=>{const{token:e,expired:n}=r.data;document.cookie=`hexToken=${e};expired=${new Date(n)}`,this.$router.push("/admin/products")}).catch(()=>{this.errorToast("お手数ですが、もう一度やり直してください")})}}},w={class:"container pt-5 d-flex justify-content-center"},g={class:"row justify-content-center"},v=s("h2",{class:"fs-1 fw-bold my-3"},"バックグラウンド管理",-1),E={class:"login col-8"},x={class:"form-floating mb-3"},V=s("label",{for:"username"},"Email address",-1),y={class:"form-floating"},T=s("label",{for:"password"},"Password",-1),k=s("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit"}," ログイン ",-1);function B(r,e,n,D,o,i){return c(),m("div",w,[s("div",g,[v,s("div",E,[s("form",{id:"form",class:"form-signin",onSubmit:e[2]||(e[2]=p((...t)=>i.login&&i.login(...t),["prevent"]))},[s("div",x,[a(s("input",{type:"email",class:"form-control",id:"username","onUpdate:modelValue":e[0]||(e[0]=t=>o.user.username=t),required:"",autofocus:"",disabled:""},null,512),[[d,o.user.username]]),V]),s("div",y,[a(s("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":e[1]||(e[1]=t=>o.user.password=t),required:"",disabled:""},null,512),[[d,o.user.password]]),T]),k],32)])])])}const U=l(b,[["render",B]]);export{U as default};
