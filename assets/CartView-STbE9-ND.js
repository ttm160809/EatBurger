import{_ as T,m as h,a as u,r as f,o as a,b as n,d as t,e as d,w as i,f as c,F as y,k as g,t as b,j as m,l as v,v as V}from"./index-CgHBEOTy.js";import{c as r}from"./cartStore-CcZ1MGtz.js";import{s as w}from"./sweetAlertStore-w7mpYN6A.js";var E={VITE_URL:"https://vue3-course-api.hexschool.io",VITE_NAME:"eatburgertest",BASE_URL:"/EatBurger/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:x,VITE_NAME:k}=E,$={methods:{...h(r,["getCarts"]),...h(r,["deleteAllCart"]),...h(r,["deleteCart"]),...h(r,["changeCartQty"]),...h(w,["successToast"]),...h(w,["errorToast"]),useCoupon(s){const o={code:s};this.carts.length>0?this.$http.post(`${x}/v2/api/${k}/coupon`,{data:o}).then(()=>{this.getCarts(),this.coupon="",this.successToast("クーポンを使用しました")}).catch(()=>{this.coupon="",this.errorToast("クーポンコードが正しくありません")}):this.errorToast("現在カートには商品がございません")},checkTotal(){const s={code:"OPEN30"};for(let o=0;o<this.carts.length;o+=1)this.carts[o].coupon===void 0&&this.final_total!==this.total&&this.$http.post(`${x}/v2/api/${k}/coupon`,{data:s}).then(()=>{this.getCarts()}).catch(()=>{this.coupon=""})},checkCart(){this.carts.length>0?this.$router.push("/cartInfo"):this.errorToast("現在カートには商品がございません")}},mounted(){this.checkTotal()},computed:{...u(r,["carts"]),...u(r,["final_total"]),...u(r,["total"])}},A={class:"container pt-5"},S={class:"d-flex flex-column d-md-none align-items-center mb-5"},U={class:"border border-primary bg-primary w-100 text-center py-2"},D=t("div",{class:"d-flex align-items-center"},[t("i",{class:"bi bi-caret-down-fill fs-1 text-primary"})],-1),R={class:"border border-primary w-100 text-center py-2"},j=t("div",{class:"d-flex align-items-center"},[t("i",{class:"bi bi-caret-down fs-1 text-primary"})],-1),L={class:"border border-primary w-100 text-center py-2"},M={class:"d-none d-md-flex justify-content-center mb-5"},N={class:"border border-primary bg-primary px-5 py-4"},B=t("div",{class:"d-flex align-items-center mx-2"},[t("i",{class:"bi bi-caret-right-fill fs-1 text-primary"})],-1),I={class:"border border-primary px-5 py-4"},O=t("div",{class:"d-flex align-items-center mx-2"},[t("i",{class:"bi bi-caret-right fs-1 text-primary"})],-1),q={class:"border border-primary px-5 py-4"},F={class:"row"},P={class:"col-md-8"},Q={class:"bg-white p-3 mb-3 mb-md-0"},z={class:"d-flex justify-content-between mb-3"},G=t("h2",null,"カート内の商品",-1),H=["disabled"],J=t("i",{class:"cart-delete bi bi-trash3-fill rounded me-1 fs-6"},null,-1),K={key:0,class:"text-center mb-4"},W=t("i",{class:"bi bi-cart-x-fill fs-8r text-secondary"},null,-1),X=t("h3",{class:"mb-4 text-secondary"},"現在カートには商品がございません",-1),Y=t("button",{type:"button",class:"btn btn-primary fs-3 py-2 px-5"},[t("span",{class:"text-white"},"注文する")],-1),Z={key:1,class:"cart-list table align-middle"},tt={class:"me-3"},st=["onClick","disabled"],et=t("i",{class:"cart-delete bi bi-trash3-fill rounded fs-6"},null,-1),ot=[et],at={class:"d-flex flex-column-reverse d-md-block"},nt=["src"],lt={class:"text-primary fw-bold fs-6 ms-0 ms-md-3"},dt={class:"text-end text-change fw-bold fs-5"},it={class:"d-md-flex"},ct=["onUpdate:modelValue","onChange"],rt=["value"],_t={class:"w-100 ms-0 ms-md-5 align-middle"},ht={class:"col-md-4"},bt=t("div",{class:"bg-dark p-2"},[t("h2",{class:"text-center text-white"},"ご注文概要")],-1),pt={class:"bg-white p-3"},ut={key:0,class:"d-flex justify-content-between align-items-end mb-4"},mt=t("h3",{class:"fw-bold"},"合計",-1),ft={class:"text-danger fw-bold fs-5"},yt={key:1},gt={class:"d-flex justify-content-between align-items-end mb-1"},vt=t("h3",{class:"fw-bold fs-5"},[t("del",null,"合計")],-1),wt={class:"text-danger fw-bold fs-6"},xt={class:"d-flex justify-content-between align-items-end mb-4"},kt=t("h4",{class:"fw-bold fs-4"},"クーポン適用後合計",-1),Ct={class:"text-danger fw-bold fs-4"},Tt={key:2,class:"input-group mb-3"},Vt=["disabled"],Et={key:3,class:"input-group mb-3"},$t=t("button",{class:"btn btn-dark",type:"button",id:"button-addon2",disabled:""}," 適用 ",-1),At=t("span",{class:"text-warning fw-bold fs-5"},"ご購入手続きへ進む",-1),St=[At];function Ut(s,o,Dt,Rt,jt,p){const _=f("sapn"),C=f("RouterLink");return a(),n("div",A,[t("div",S,[t("div",U,[d(_,{class:"fs-4 text-white"},{default:i(()=>[c("1.カート")]),_:1})]),D,t("div",R,[d(_,{class:"fs-4"},{default:i(()=>[c("2.ご購入手続き")]),_:1})]),j,t("div",L,[d(_,{class:"fs-4"},{default:i(()=>[c("3.ご注文完了")]),_:1})])]),t("div",M,[t("div",N,[d(_,{class:"fs-4 text-white"},{default:i(()=>[c("1.カート")]),_:1})]),B,t("div",I,[d(_,{class:"fs-4"},{default:i(()=>[c("2.ご購入手続き")]),_:1})]),O,t("div",q,[d(_,{class:"fs-4"},{default:i(()=>[c("3.ご注文完了")]),_:1})])]),t("div",F,[t("div",P,[t("div",Q,[t("div",z,[G,t("button",{class:"btn btn-outline-danger",type:"button",onClick:o[0]||(o[0]=(...e)=>s.deleteAllCart&&s.deleteAllCart(...e)),disabled:s.carts.length===0},[J,c(" 全て削除 ")],8,H)]),s.carts.length===0?(a(),n("div",K,[W,X,d(C,{to:"/products"},{default:i(()=>[Y]),_:1})])):(a(),n("table",Z,[t("tbody",null,[(a(!0),n(y,null,g(s.carts,e=>(a(),n("tr",{key:e.id,class:"my-1"},[t("td",tt,[t("button",{class:"btn btn-outline-danger",type:"button",onClick:l=>s.deleteCart(e),disabled:s.carts.length===0},ot,8,st)]),t("td",at,[t("img",{src:e.product.imageUrl,class:"cart-list-img rounded-0",alt:"..."},null,8,nt),t("span",lt,b(e.product.title),1)]),t("td",dt,[t("div",it,[m(t("select",{name:"",id:"",class:"form-select mb-3 mb-md-0","onUpdate:modelValue":l=>e.qty=l,onChange:l=>s.changeCartQty(e)},[(a(),n(y,null,g(20,l=>t("option",{value:l,key:l},b(l),9,rt)),64))],40,ct),[[V,e.qty]]),t("span",_t,"¥ "+b(e.total),1)])])]))),128))])]))])]),t("div",ht,[bt,t("div",pt,[s.final_total===s.total?(a(),n("div",ut,[mt,t("span",ft,"¥ "+b(s.total),1)])):(a(),n("div",yt,[t("div",gt,[vt,t("span",wt,[t("del",null,"¥ "+b(s.total),1)])]),t("div",xt,[kt,t("span",Ct,"¥ "+b(Math.round(s.final_total)),1)])])),s.final_total===s.total?(a(),n("div",Tt,[m(t("input",{type:"text",class:"form-control",placeholder:"クーポンコードを入力","onUpdate:modelValue":o[1]||(o[1]=e=>s.coupon=e),"aria-label":"クーポンコードを入力","aria-describedby":"button-addon",disabled:s.carts.final_total!==s.carts.total},null,8,Vt),[[v,s.coupon]]),t("button",{class:"btn btn-dark",type:"button",id:"button-addon",onClick:o[2]||(o[2]=e=>p.useCoupon(s.coupon))}," 適用 ")])):(a(),n("div",Et,[m(t("input",{type:"text",class:"form-control",placeholder:"クーポンが適用されました","onUpdate:modelValue":o[3]||(o[3]=e=>s.coupon=e),"aria-label":"クーポンが適用されました","aria-describedby":"button-addon2",disabled:""},null,512),[[v,s.coupon]]),$t]))]),t("button",{type:"button",class:"btn btn-primary w-100 py-3 rounded-0",onClick:o[4]||(o[4]=(...e)=>p.checkCart&&p.checkCart(...e))},St)])])])}const Bt=T($,[["render",Ut]]);export{Bt as default};
