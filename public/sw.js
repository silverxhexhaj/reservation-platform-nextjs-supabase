if(!self.define){let s,e={};const t=(t,a)=>(t=new URL(t+".js",a).href,e[t]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=t,s.onload=e,document.head.appendChild(s)}else s=t,importScripts(t),e()})).then((()=>{let s=e[t];if(!s)throw new Error(`Module ${t} didn’t register its module`);return s})));self.define=(a,n)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let c={};const r=s=>t(s,i),x={module:{uri:i},exports:c,require:r};e[i]=Promise.all(a.map((s=>x[s]||r(s)))).then((s=>(n(...s),c)))}}define(["./workbox-e9849328"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"29391f9cfd45fbd6d3f1dfe0855accf7"},{url:"/_next/static/chunks/1099-2e9f56e24f18ad67.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/1450-cc2457e9b5c59b04.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/2299-8f42c2b780ee87c4.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/2722-1ea6de385bf161f5.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/3556-f068746ea0e2635d.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/3620-2980a34d0e6f851c.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/3764-2f132bc318aa77bd.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/437-217bf2a4bd4a4965.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/44150630-213b54396b53a989.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/4806-25685de462ec37c1.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/4948-5d835e8527a0e3ee.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/528-f9f8b0e94bfad30f.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/55393f3c-7b70f628a46d0278.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/5907-d7b5a780cda5dc90.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/6262.c70ab269b2b1c8f4.js",revision:"c70ab269b2b1c8f4"},{url:"/_next/static/chunks/6465-c0de62ed56dab101.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/7051-02d21ede8abd190b.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/7066-faaf064b0398be38.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/7156-fc30e37077b5f255.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/722-2d08e92839eb14d7.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/7546-744ecfb02c034674.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/8371-d10a59a39ec19f58.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/8591-cc17fe6d188432a5.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/8819-46644b4aa2813c33.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/8947-d630553f9aefdb60.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/9300-9fc22bc3fd0e08a9.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/9373-dae754dddb2329fd.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/9408-44dfd39e3d3aaa1a.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/_not-found/page-aed760b25aaadd76.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/layout-52a3267943c23f2d.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/page-8a182c172eb4a5a3.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/dashboard/%5Bid%5D/page-4a7c0d5ceba70e20.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/dashboard/create/page-de93f3998396e2f6.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/partner/calendar-beta/page-c00bc48f45cbfa97.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/partner/calendar/page-ed6ffe773025451f.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/partner/catalog/page-d2a88dfd9794d81d.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/partner/clients/page-6e7cbfa80d0085bf.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/partner/create/page-abe632c1591d588d.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/partner/dashboard/page-8f1b2563b9939a69.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/partner/layout-2797f96895207729.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/partner/marketing/page-81671da3afa200bb.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/partner/page-6355dd65056857d9.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/partner/payment/page-cd6269ad4473e587.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/partner/payments/page-58949b3f8ad2ab3e.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/partner/reports/page-363be4be00624f5c.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/partner/sales/page-d194ffee30efea5a.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/partner/settings/page-a86d189c3a50b83b.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/business/partner/team/page-8ae6cc253d76e38c.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/private/client/deals/page-3344dbe4b6b72f7a.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/public/explore/%5Bcategory%5D/page-06c978e79a4d63bd.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/public/explore/page-fdeeb6cdd613a84b.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/public/login/page-82eeef9039df8754.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/public/pricing/page-6fa4cc595fb0d27f.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/public/signin/page-0ba1a16ef38445df.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/public/signup/business/page-698cbe8b072795b0.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/public/signup/customer/page-40a62cd3b37a5e03.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/public/signup/page-2999814a8081230b.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/app/pages/public/who-we-are/page-b67a08e18ede4201.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/f15d478b-726bac44571d160f.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/framework-63a5d844a3662ade.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/main-aa76fb2bf8082469.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/main-app-3f8a9390a3f3096b.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/pages/_app-7f7792b6a8d95adb.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/pages/_error-3df26fce6bd4b294.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-60a15400e11b5df8.js",revision:"ksWEStRxtEBxg_ShT5JBO"},{url:"/_next/static/css/4837687c375a3220.css",revision:"4837687c375a3220"},{url:"/_next/static/css/f2c25ce2c488bbe9.css",revision:"f2c25ce2c488bbe9"},{url:"/_next/static/css/fe52ab87511767d6.css",revision:"fe52ab87511767d6"},{url:"/_next/static/ksWEStRxtEBxg_ShT5JBO/_buildManifest.js",revision:"f23d47948dc01a5c16c93e5bf7d1c9dc"},{url:"/_next/static/ksWEStRxtEBxg_ShT5JBO/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/86667d917ceb322f-s.p.woff2",revision:"3573ad0e84951b46a7fa54feda3727ef"},{url:"/_next/static/media/8be698a80cb51f2b-s.woff2",revision:"68af33ad2a3aa3cbce6f3ff72120b5c0"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:t,state:a})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
