(this["webpackJsonpthx1138-dev"]=this["webpackJsonpthx1138-dev"]||[]).push([[0],{14:function(e,t,a){e.exports=a(21)},21:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(12),i=a.n(l),r=a(1),s=a(2),c=a(4),u=a(3),d=a(6),m=a(5),p=a(9),h=a(8),f=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={values:[a.props.value]},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(e,t,a){}},{key:"slid",value:function(e){"undefined"!==this.props.max&&e>this.props.max&&(e=this.props.max),this.props.min&&e<this.props.min&&(e=this.props.min),console.log(e),this.props.slid(e,this.props.name),this.setState({values:[e]})}},{key:"render",value:function(){var e=this;return console.log(0),o.a.createElement("div",{style:{display:"flex",justifyContent:"center",flexWrap:"wrap",margin:"10px"}},o.a.createElement(h.Range,{values:this.state.values,step:.1,min:0,max:100,onChange:function(t){return e.slid(t[0],e.props.name)},renderTrack:function(t){var a=t.props,n=t.children;return o.a.createElement("div",{onMouseDown:a.onMouseDown,onTouchStart:a.onTouchStart,style:Object(p.a)({},a.style,{height:"12px",display:"flex",width:"calc(100% - 5em)"})},o.a.createElement("div",{ref:a.ref,style:{height:"4px",width:"100%",borderRadius:"2px",background:Object(h.getTrackBackground)({values:e.state.values,colors:[e.props.color,"#999"],min:0,max:100}),alignSelf:"center"}},n))},renderThumb:function(t){var a=t.props,n=t.isDragged;return o.a.createElement("div",Object.assign({},a,{style:Object(p.a)({},a.style,{height:"30px",width:"20px",borderRadius:"2px",backgroundColor:"#FFF",display:"flex",justifyContent:"center",alignItems:"center",boxShadow:"0px 2px 6px #AAA"})}),o.a.createElement("div",{style:{height:"50%",width:"40%",backgroundColor:n?e.props.getColor(e.state.values[0]):e.props.color}}))}}),o.a.createElement("output",{className:"right",style:{margin:"0px 0px 0px 10px",width:"4em"},id:"output"},this.props.displayValue?this.props.displayValue(this.state.values[0]):this.state.values[0].toFixed(1)))}}]),t}(o.a.Component),v=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).radio=function(e){console.log("radio"),console.log("mode, thing, this",e,Object(d.a)(a)),a.setState({fadeMode:e})},a.toggle=function(e){a.setState({fadeOn:!a.state.fadeOn})},a.fadeModes=[{name:"LIN",value:"lin"},{name:"SIN",value:"sin"},{name:"EXP",value:"exp"},{name:"S+E",value:"sinexp"}],a.delaySlid=function(e){console.log("delaySlid",e)},a.topSlid=function(e){console.log("topSlid",e)},a.bottomSlid=function(e){console.log("bottomSlid",e)},a.displayValue=function(e){return console.log("displayValue",e),Math.pow(2,e/100*12).toFixed(0)},a.state={fadeOn:a.props.fadeOn,fadeMode:a.props.fadeMode,delay:16,top:100,bottom:0},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"fadeButtons",value:function(e){var t=this;return this.fadeModes.map((function(e){return o.a.createElement("label",{key:e.name},e.name," ",o.a.createElement("br",null),o.a.createElement("input",{name:"fadeMode",key:e.value,onChange:function(){return t.radio(e.value)},checked:t.state.fadeMode===e.value,type:"radio"}))}))}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("div",{className:"lights-fade"},"Fade",o.a.createElement("label",{className:"switch float"},o.a.createElement("input",{type:"checkbox",checked:this.state.fadeOn,onChange:this.toggle}),o.a.createElement("span",{className:"switch-slider round right"}))),this.state.fadeOn&&o.a.createElement("div",{className:"fade-settings right"},o.a.createElement("div",{className:"fade-mode"},this.fadeButtons()),o.a.createElement("div",{className:"fade-sliders"},"Delay \xa0 \xa0 \xa0 \xa0",o.a.createElement(f,{key:"delay",name:"delay",value:this.state.delay,color:"#333",getColor:function(){return"rgb(100, 100, 100)"},min:16,displayValue:this.displayValue,slid:this.delaySlid}),"Range\xa0 \xa0 \xa0 \xa0",o.a.createElement(f,{key:"top",name:"top",value:this.state.top,color:"#999",getColor:function(){return"rgb(250, 250, 250)"},max:100,min:20,slid:this.topSlid}),"Bottom\xa0 \xa0 \xa0 \xa0",o.a.createElement(f,{key:"bottom",name:"bottom",value:this.state.bottom,color:"#aaa",getColor:function(){return"rgb(50, 50, 50)"},max:80,min:0,slid:this.bottomSlid}))))}}]),t}(o.a.Component),g=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).slid=function(e,t){},a.func=function(){console.log("func, this",this)},a.bottomSlid=function(e,t){console.log("bottomSlid, value",e,t)},a.state={power:{r:0,g:0,b:0},fadeOn:!0,fadeMode:"sinexp"},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(e,t,a){}},{key:"shouldComponentUpdate",value:function(e,t,a){return!1}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){return o.a.createElement("div",{className:"lights",id:"lights"},o.a.createElement(f,{name:"r",value:this.state.power.r,color:"#f00",getColor:function(e){return"rgb("+Math.round(2.55*e)+", 0, 0)"},slid:this.slid}),o.a.createElement(f,{name:"g",value:20,color:"#0f0",getColor:function(e){return"rgb(0, "+Math.round(2.55*e)+", 0)"},slid:this.slid}),o.a.createElement(f,{name:"b",value:50,color:"#00f",getColor:function(e){return"rgb(0, 0, "+Math.round(2.55*e)+")"},slid:this.slid}),o.a.createElement(v,{fadeOn:this.state.fadeOn,fadeMode:this.state.fadeMode,bottomSlid:this.bottomSlid}))}}]),t}(o.a.Component);var b=function(){return o.a.createElement("footer",null,"this is the footer")},y=a(13),E=a.n(y),O=function(e){function t(e){var a;Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).getData=function(){console.log("getData",Object(d.a)(a));fetch("http://thx1138-dev/van_data.php").then((function(e){return e.json()})).then((function(e){console.log(e),a.setState({isLoaded:!0,items:e.items})}),(function(e){a.setState({isLoaded:!0,error:e})}))};var n=E()();a.state={time:n};var o=n.format("H");return a.timeOfDay="day",a.timeOfDay=o<12?"morning":o>=12&&o<17?"afternoon":"night",a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.interval=setInterval(this.getData,1e3)}},{key:"whereIsThis",value:function(){console.log("it is here",this)}},{key:"shouldComponentUpdate",value:function(e,t,a){return!0}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){return o.a.createElement("div",{className:"container",id:"container"},o.a.createElement("p",null,o.a.createElement("span",null,this.state.time.format("ddd Do MMM HH:mm:ss")),o.a.createElement("span",{className:"right"},"Good ",this.timeOfDay)),o.a.createElement(g,null),o.a.createElement("div",null,o.a.createElement(b,null)))}}]),t}(o.a.Component);i.a.render(o.a.createElement("div",null,o.a.createElement(O,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.14c78a9d.chunk.js.map