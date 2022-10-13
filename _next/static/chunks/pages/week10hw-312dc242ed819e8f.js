(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[345],{9707:function(e,t,a){"use strict";a.d(t,{Z:function(){return c}});var l=a(7462),n=a(3366),i=a(9766),o=a(5578);let r=["sx"],s=e=>{let t={systemProps:{},otherProps:{}};return Object.keys(e).forEach(a=>{o.Gc[a]?t.systemProps[a]=e[a]:t.otherProps[a]=e[a]}),t};function c(e){let{sx:t}=e,a=(0,n.Z)(e,r),{systemProps:o,otherProps:c}=s(a),u;return u=Array.isArray(t)?[o,...t]:"function"==typeof t?(...e)=>{let a=t(...e);return(0,i.P)(a)?(0,l.Z)({},o,a):o}:(0,l.Z)({},o,t),(0,l.Z)({},c,{sx:u})}},2804:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/week10hw",function(){return a(8640)}])},5898:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var l=a(5893),n=a(9597),i=[{name:"Australia",loc:[134,-28],scale:1200},{name:"New South Wales",loc:[147,-33],scale:4500},{name:"Northern Territory",loc:[133,-19],scale:3e3},{name:"Queensland",loc:[144,-20],scale:2400},{name:"South Australia",loc:[136,-32.5],scale:3e3},{name:"Tasmania",loc:[146,-41.5],scale:7e3},{name:"Victoria",loc:[145,-36.5],scale:6700},{name:"Western Australia",loc:[121,-25],scale:2e3},],o={$schema:"https://vega.github.io/schema/vega-lite/v5.json",title:{text:"Household solar installations in Australia",fontSize:24,subtitle:"30 June 2022, by LGA"},width:1200,height:900,params:[{name:"center",value:i[0],bind:{name:"Center on: ",input:"select",options:i,labels:i.map(function(e){return e.name})}},],projection:{type:"mercator",scale:{expr:"center.scale"},center:{expr:"center.loc"}},layer:[{data:{url:"map.json",format:{type:"topojson",feature:"LGA_2022_AUST_GDA2020"}},transform:[{lookup:"properties.LGA_CODE22",from:{data:{url:"lgas_11e2.csv"},key:"LGA",fields:["dwellings_lga","instals_lga"]}},{calculate:"datum.instals_lga / datum.dwellings_lga",as:"installs_per_dwelling"},],mark:{type:"geoshape",stroke:"black",strokeWidth:.3},encoding:{tooltip:[{field:"properties.LGA_NAME22",title:"Name"},{field:"installs_per_dwelling",title:"% of dwellings with solar",format:".1%"},{field:"dwellings_lga",title:"Estimated dwellings"},],color:{field:"installs_per_dwelling",type:"quantitative",scale:{type:"threshold",scheme:"oranges",domain:[.15,.3,.45,.6]},legend:{title:"% of dwellings with solar",titleLimit:200,direction:"horizontal",format:".0%",titleFontSize:16,labelFontSize:14}}}},{data:{url:"map.json",format:{type:"topojson",feature:"STE_2021_AUST_GDA2020"}},mark:{type:"geoshape",stroke:"black",fill:null,strokeWidth:.8}},]};function r(){return(0,l.jsx)(n.Z,{spec:o})}},9403:function(e,t,a){"use strict";a.d(t,{$l:function(){return s},H7:function(){return l},L2:function(){return i},bC:function(){return n},dS:function(){return r},jo:function(){return o}});var l={field:"date",timeUnit:"yearmonthdate",title:"Year",type:"ordinal",axis:{format:"%Y",labelAngle:0,labelOverlap:!1,labelColor:{condition:{test:{timeUnit:"monthdate",field:"value",equal:{month:1,date:1}},value:"black"},value:null},tickColor:{condition:{test:{timeUnit:"monthdate",field:"value",oneOf:[{month:1,date:1},{month:4,date:1},{month:7,date:1},{month:10,date:1},]},value:"black"},value:null}}},n=function(e,t,a){var l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"true";return{data:[{}],encoding:{x:{datum:Number(new Date(e)),type:"ordinal"},y:{datum:t},opacity:{condition:{test:l,value:1},value:0}},mark:{type:"text",align:"left",baseline:"bottom",text:a}}},i=["Australia","New South Wales + ACT","Northern Territory","Queensland","South Australia","Tasmania","Victoria","Western Australia",],o={lookup:"state",from:{key:"state",data:{values:["aus","nsw+act","nt","qld","sa","tas","vic","wa"].map(function(e,t){return{state:e,label:i[t]}})},fields:["label"]},as:"stateLabel"},r=["Less than 4.5 kW","4.5 to 9.5 kW","9.5 to 25 kW","25 to 100 kW","100 kW to 30 MW","More than 30 MW",],s={lookup:"size",from:{key:"size",data:{values:r.map(function(e,t){return{size:t,label:e}})},fields:["label"]},as:"sizeLabel"}},8640:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return j}});var l=a(5893),n=a(3189),i=a(3366),o=a(7462),r=a(7294),s=a(5408),c=a(8700),u=a(9707),d=a(9766),m=a(1719),p=a(8884);let f=["component","direction","spacing","divider","children"],h=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],y=({ownerState:e,theme:t})=>{let a=(0,o.Z)({display:"flex",flexDirection:"column"},(0,s.k9)({theme:t},(0,s.P$)({values:e.direction,breakpoints:t.breakpoints.values}),e=>({flexDirection:e})));if(e.spacing){let l=(0,c.hB)(t),n=Object.keys(t.breakpoints.values).reduce((t,a)=>(("object"==typeof e.spacing&&null!=e.spacing[a]||"object"==typeof e.direction&&null!=e.direction[a])&&(t[a]=!0),t),{}),i=(0,s.P$)({values:e.direction,base:n}),r=(0,s.P$)({values:e.spacing,base:n});"object"==typeof i&&Object.keys(i).forEach((e,t,a)=>{let l=i[e];if(!l){let n=t>0?i[a[t-1]]:"column";i[e]=n}});let u=(t,a)=>({"& > :not(style) + :not(style)":{margin:0,[`margin${h(a?i[a]:e.direction)}`]:(0,c.NA)(l,t)}});a=(0,d.Z)(a,(0,s.k9)({theme:t},r,u))}return(0,s.dt)(t.breakpoints,a)},g=(0,m.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>[t.root]})(y),v=r.forwardRef(function(e,t){let a=(0,p.Z)({props:e,name:"MuiStack"}),n=(0,u.Z)(a),{component:s="div",direction:c="column",spacing:d=0,divider:m,children:h}=n,y=(0,i.Z)(n,f);return(0,l.jsx)(g,(0,o.Z)({as:s,ownerState:{direction:c,spacing:d},ref:t},y,{children:m?function(e,t){let a=r.Children.toArray(e).filter(Boolean);return a.reduce((e,l,n)=>(e.push(l),n<a.length-1&&e.push(r.cloneElement(t,{key:`separator-${n}`})),e),[])}(h,m):h}))});var b=a(5898),k=a(9597),_=a(9403),w={$schema:"https://vega.github.io/schema/vega-lite/v5.json",title:{text:"Total solar capacity by installation size and state",fontSize:24},width:1200,height:500,params:[{name:"state_select",bind:{input:"select",name:"State/Territory: ",options:["aus","nsw+act","nt","qld","sa","tas","vic","wa"],labels:_.L2},value:"aus"},{name:"cumulative",bind:{input:"checkbox",name:"Cumulative: "},value:!0},],layer:[{params:[{name:"highlight",select:{type:"point",on:"mouseover"}},],data:{url:"state_time_series.csv"},transform:[{filter:"datum.state == state_select"},{calculate:"datetime(datum.year, datum.month - 1)",as:"date"},{calculate:"monthFormat(datum.month - 1)",as:"monthFormatted"},_.$l,{window:[{op:"sum",field:"capacity",as:"cumulativeCapacity"},],groupby:["size"]},{calculate:"cumulative ? datum.cumulativeCapacity : datum.capacity",as:"chosenCapacity"},{joinaggregate:[{op:"sum",field:"chosenCapacity",as:"totalCapacity"},],groupby:["date","state"]},],mark:"area",encoding:{x:_.H7,y:{field:"chosenCapacity",type:"quantitative",title:"Total installed capacity (MW)"},color:{field:"sizeLabel",type:"ordinal",legend:{title:"Solar plant capacity",labelFontSize:12,orient:"top-left"},scale:{domain:_.dS}},opacity:{condition:{param:"highlight",value:1},value:.5},order:{field:"size",type:"quantitative"},tooltip:[{field:"year",title:"Year"},{title:"Date",field:"monthFormatted"},{title:"Plant capacity",field:"sizeLabel"},{title:"Installed capacity, this plant size (MW)",field:"chosenCapacity",format:","},{title:"Installed capacity, all plant sizes (MW)",field:"totalCapacity",format:","},]}},(0,_.bC)("2015-07-01 00:00:00+10:00",8500,"Large solar plants become common in 2018","state_select == 'aus'"),]};function x(){return(0,l.jsx)(k.Z,{spec:w})}var j=function(){return(0,l.jsx)(n.Z,{maxWidth:"lg",style:{paddingBottom:200},children:(0,l.jsxs)(v,{spacing:3,children:[(0,l.jsx)("h1",{children:"FIT3179 week 10 homework"}),(0,l.jsx)(b.Z,{}),(0,l.jsx)(x,{})]})})}}},function(e){e.O(0,[585,774,888,179],function(){return e(e.s=2804)}),_N_E=e.O()}]);