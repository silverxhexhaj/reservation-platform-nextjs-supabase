if(!self.define){let e,s={};const t=(t,a)=>(t=new URL(t+".js",a).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(a,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>t(e,i),u={module:{uri:i},exports:c,require:r};s[i]=Promise.all(a.map((e=>u[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"02c44f907892303de8b432359d946c47"},{url:"/_next/static/24BjuswlGeQPtQ6wblA_L/_buildManifest.js",revision:"b222cbf4d8e1f47e27a8925222733e53"},{url:"/_next/static/24BjuswlGeQPtQ6wblA_L/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1444-d728e1a051d5f649.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/153-d715740698d726a9.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/1775-34fb540d60c7802e.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/231-1d4cd76308914a65.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/2529-fd1085c4709b4903.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/2588-90ee08e9b00e58a3.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/265-6bc0ec1b91e4db57.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/2998-ff716e356b50ccac.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/3085-64ec01cad0d3d666.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/3162-770abb50aa405d4e.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/4026-647e9b2ce4aeb8cf.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/4593-32ac2e64856a7efc.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/4868-8992f193d304e473.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/4e6af11a-d4d045b8ba08494b.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/5096-9b4cd18c5f7f9b7f.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/5360-70836b06ebe48410.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/5887-621d2d584eeba816.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/6343-f95f17aa3cf3236b.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/7023-0c5df4d2b031a856.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/7026-b114caec17079ca0.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/7035.cb726032edead13d.js",revision:"cb726032edead13d"},{url:"/_next/static/chunks/773-79194228a87e632d.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/904-f1d1e8010a398ef8.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/9397-3b349fcc26eba577.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/965-832a6baa074f262d.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/_not-found/page-085415d3a4d9d314.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/layout-b53a9cb7b272435a.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/page-f17eddbc4044b7e5.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/business/dashboard/%5Bid%5D/page-348f3bc9058af427.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/business/dashboard/create/page-13379cd804944ed2.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/business/partner/calendar/page-2fc9f2aeebc80f29.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/business/partner/catalog/page-d2714e6bfe1bd88e.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/business/partner/clients/page-6ef90613f2fc7d6e.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/business/partner/create/page-532cae62a925fb7e.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/business/partner/dashboard/page-61bbb90c8522f1b1.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/business/partner/layout-422ca4a17f5bfb9b.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/business/partner/marketing/page-729aa6bfa62d1ca8.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/business/partner/page-bbf01abc8b5fe5c3.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/business/partner/payment/page-5f53952dc65979e3.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/business/partner/payments/page-cdd5ecfc816a9ece.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/business/partner/reports/page-c3b8edbb97189ec3.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/business/partner/sales/page-d148bdb56049ec31.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/business/partner/settings/page-6a1f8f652ddeddb4.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/business/partner/team/page-84ec2a624648225a.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/private/client/deals/page-c4ea8ce4695d5049.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/public/explore/%5Bcategory%5D/page-b67e1434f30a7558.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/public/explore/page-ec8d857f5c157091.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/public/login/page-0e02e198bc32ddd7.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/public/pricing/page-823045d329a84b90.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/public/signin/page-5119a022251ff680.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/public/signup/page-c7bcfb771ea73aab.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/app/pages/public/who-we-are/page-19d91c355be920cf.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/fd9d1056-656f72973dfbc437.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/framework-a63c59c368572696.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/main-app-4c2fef1dfc08a161.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/main-bdd5690ccfa90bd5.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/pages/_app-00b74eae5e8dab51.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/pages/_error-c72a1f77a3c0be1b.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-7299b8c8aabd66b0.js",revision:"24BjuswlGeQPtQ6wblA_L"},{url:"/_next/static/css/0647f5824895d52f.css",revision:"0647f5824895d52f"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
