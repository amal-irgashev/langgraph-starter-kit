(()=>{var e={};e.id=276,e.ids=[276],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3797:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>f,routeModule:()=>p,serverHooks:()=>h,workAsyncStorage:()=>d,workUnitAsyncStorage:()=>l});var s={};t.r(s),t.d(s,{POST:()=>c});var o=t(2706),n=t(8203),a=t(5994),i=t(9187),u=t(7421);async function c(e){try{let r=await e.json();(0,u.sv)(r,["thread_id","message"]);let{thread_id:t,message:s,update_state:o=!1}=r,n=(0,u._6)(),a=o?`threads/${t}/state`:`threads/${t}/messages`,c=await fetch(`${n}/${a}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify((0,u.WT)(s))});if(!c.ok){let e=await c.text();throw Error(`Failed to send message: ${e}`)}return i.NextResponse.json({success:!0})}catch(e){return(0,u.WX)(e,"MESSAGE_SEND_FAILED")}}let p=new o.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/chat/route",pathname:"/api/chat",filename:"route",bundlePath:"app/api/chat/route"},resolvedPagePath:"/Users/sherahmedov/Dev/Portfolio/langgraph-starter-kit/frontend/app/api/chat/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:d,workUnitAsyncStorage:l,serverHooks:h}=p;function f(){return(0,a.patchFetch)({workAsyncStorage:d,workUnitAsyncStorage:l})}},6487:()=>{},8335:()=>{},7421:(e,r,t)=>{"use strict";t.d(r,{WT:()=>i,WX:()=>n,_6:()=>o,sv:()=>a});var s=t(9187);function o(){let e="http://localhost:2024";if(!e)throw Error("LangGraph API URL is not configured");return e}function n(e,r,t=500){return console.error(`API Error [${r}]:`,e),s.NextResponse.json({error:e instanceof Error?e.message:"An unexpected error occurred",code:r,details:e instanceof Error?e.stack:void 0},{status:t})}function a(e,r){let t=r.filter(r=>!e[r]);if(t.length>0)throw Error(`Missing required fields: ${t.join(", ")}`)}function i(e){return{messages:[{role:"user",content:e}]}}}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[638,452],()=>t(3797));module.exports=s})();