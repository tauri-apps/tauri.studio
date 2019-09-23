(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["0a2cdd0c"],{2514:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"full-width q-pa-md"},[o("q-page-sticky",{directives:[{name:"scroll",rawName:"v-scroll",value:t.scrolled,expression:"scrolled"}],staticClass:"page-header fixed-top shadow-8 scroll-determined",staticStyle:{position:"fixed!important"},attrs:{expand:""}},[o("q-chip",{staticClass:"claim text-weight-light text-black bg-cyan-1 shadow-8",staticStyle:{top:"84%"},attrs:{outline:"",dense:"",square:"",icon:"star","icon-right":"star"}},[t._v("Build more secure native apps with fast, tiny binaries.")]),o("div",{staticClass:"bg-container scroll-determined q-pa-md q-ml-lg"}),o("div",[o("router-link",{attrs:{to:"/"}},[o("img",{staticClass:"tauri-name scroll-determined",staticStyle:{cursor:"pointer"},attrs:{src:"statics/tauri-wordmark.png"}})]),t.buttons?o("div",{staticClass:"row",staticStyle:{"margin-top":"90px"}},[o("q-btn",{staticClass:"btn",attrs:{dense:"",size:"small",to:"/docs/quickstart",label:"Quick Start","no-caps":"",color:"yellow-2","text-color":"black"}}),o("q-btn",{staticClass:"btn",attrs:{dense:"",size:"small",to:"/docs/patterns",label:"Patterns","no-caps":"",color:"yellow-2","text-color":"black"}}),t.showDocs?o("q-btn",{staticClass:"btn",attrs:{dense:"",size:"small",to:"/docs",label:"Docs","no-caps":"",color:"yellow-2","text-color":"black"}}):t._e()],1):o("div",{staticClass:"absolute-right",staticStyle:{margin:"18px 35px 0 0"}},[o("q-btn-dropdown",{staticClass:"q-mr-lg",attrs:{dense:"",color:"yellow-2",label:t.current,"no-caps":"","text-color":"black"}},[o("q-list",{attrs:{color:"yellow-2"}},[t.showDocs?o("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",to:"/docs"},on:{click:function(e){t.current="Docs"}}},[o("q-item-section",[o("q-item-label",[t._v("Docs")])],1)],1):t._e(),o("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",to:"/docs/quickstart"}},[o("q-item-section",[o("q-item-label",[t._v("Quick Start")])],1)],1),o("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",to:"/docs/patterns"}},[o("q-item-section",[o("q-item-label",[t._v("Patterns")])],1)],1),o("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",to:"/docs/environment"}},[o("q-item-section",[o("q-item-label",[t._v("Environment")])],1)],1)],1)],1)],1)],1)],1),o("main",{staticClass:"flex flex-start justify-center"},[o("div",{staticClass:"q-pa-sm col-12-sm col-10-md col-8-lg",staticStyle:{"max-width":"1024px",width:"100%"}},[t._t("default")],2)])],1)},n=[],s={name:"Hero",data:function(){return{buttons:!0,current:"Menu",height:270,heightName:140,heightPic:250,heightClaim:100,rightDrawerOpen:this.$q.platform.is.desktop}},mounted:function(){},computed:{showDocs:function(){var t=this.$route.meta.showDocslink;return"undefined"===typeof t||t}},methods:{scrolled:function(t){var e=t/4;this.height=270-e,this.heightName=140-e,this.heightPic=250-e,this.heightClaim=220-e,e>=50&&!1!==this.buttons?(this.buttons=!1,document.getElementsByClassName("scroll-determined")[0].setAttribute("style","height: 70px"),document.getElementsByClassName("scroll-determined")[1].setAttribute("style","height: 55px;width: 55px;transform: rotate(".concat(t,"deg)")),document.getElementsByClassName("tauri-name")[0].setAttribute("style","\n      height: 35px;\n      "),document.getElementsByClassName("q-drawer__content")[0].setAttribute("style","background-color: #FDFADE;margin-top: 60px;padding-top:20px"),document.getElementById("scrollHolder").setAttribute("style","height: calc(100% - 132px)"),document.getElementById("padding").setAttribute("style","height: 40px")):!1===this.buttons?document.getElementsByClassName("scroll-determined")[1].setAttribute("style","height: 55px;width: 55px;transform: rotate(".concat(t,"deg)")):document.getElementsByClassName("scroll-determined")[1].setAttribute("style","transform: rotate(".concat(t,"deg)"))}}},i=s,r=(o("42ef"),o("2877")),c=Object(r["a"])(i,a,n,!1,null,null,null);e["a"]=c.exports},"42ef":function(t,e,o){"use strict";var a=o("efb7"),n=o.n(a);n.a},cc1d:function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("hero",[o("div",{staticStyle:{"padding-top":"260px"},attrs:{id:"padding"}}),o("q-markdown",{attrs:{src:t.markdown,toc:""},on:{data:t.onToc}}),o("q-page-scroller",{attrs:{position:"bottom-right","scroll-offset":150,offset:[18,18]}},[o("q-btn",{attrs:{fab:"",icon:"keyboard_arrow_up",color:"primary"}})],1)],1)},n=[],s=o("2514"),i='## Sustainability\nOne of the main goals of the organizational structure of Tauri is to guarantee the sustainability of Tauri and the health and well-being of its contributors. The world of Open Source is fraught with peril and discord, and we have taken measures to ensure the longevity of Tauri. This document explains how we go about doing so.\n\n### Organizational Structure\nTauri apps is governed by the community and work is done in the context of public working groups. Each working group has a dedicated channel on the Discord server as well as a Team on GitHub. Other than that, each WG is free to use whatever type of organizational model it chooses.\n \n The current working groups are: \n- WG Governance & Guidance\n- WG Tech\n- WG Education\n- WG Media\n- WG Security\n\nWith the exception of the security working group, which is by invite only and convenes privately, all other working groups are public and open to any and all participants.\n\nPlease visit [this repository](https://github.com/tauri-apps/governance-and-guidance) to get more information.\n\n### Code of Conduct\nEveryone participating in the Tauri commnunity is expected to follow a code of conduct that you can at the [Governance and Guidance:Code of Conduct](https://github.com/tauri-apps/governance-and-guidance/blob/master/CODE_OF_CONDUCT.md).\n\n### Social Contract\nWe have a Social Contract that informs our decision making and organization. You can read about it here: [Governance and Guidance:Social Contract](https://github.com/tauri-apps/governance-and-guidance/blob/master/SOCIAL_CONTRACT.md).\n\n### Licensing\nWe, the contributors to Tauri Apps, use the MIT and Apache licenses for all code content. Images and bodies of text, unless otherwise noted are CC-BY-ND-NC.\n\n### Trademark\nIt is a permissible use of the name "Tauri App" or the Tauri logo to show that a project uses Tauri. Any language that gives the impression that the Tauri Apps organization approves, authorizes or otherwise supports a project, person or company is not permissible without written authorization from the Guidance and Governance Working Group.\n\n### Sourcecred\nWe use sourcecred for tracking contributions, and once we have enough funding to cover our operational costs, we will use it to distribute funds fairly amongst contributors.\n\nYou can have a look here:  https://sourcecred.teamopen.dev/prototype/tauri-apps\n',r={name:"Governance",components:{Hero:s["a"]},data:function(){return{markdown:i}},computed:{toc:{get:function(){return this.$store.state.common.toc},set:function(t){this.$store.commit("common/toc",t)}}},methods:{onToc:function(t){this.toc=t}}},c=r,l=o("2877"),u=Object(l["a"])(c,a,n,!1,null,null,null);e["default"]=u.exports},efb7:function(t,e,o){}}]);