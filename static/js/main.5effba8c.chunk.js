(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{60:function(e,a,t){e.exports=t(71)},65:function(e,a,t){},71:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(9),o=t.n(l),s=(t(65),t(30)),c=t(18),i=t(39),u=t(31),m=t(41),p=t(105),d=function(e){var a=e.toggleManagePowers;return r.a.createElement("nav",{className:"navbar navbar-light bg-light"},r.a.createElement("div",{className:"navbar-brand"},r.a.createElement(p.a,{color:"primary",variant:"contained",onClick:a}," Manage Powers ")))},h=t(107),w=t(110),P=t(102),f=t(103),g=t(109),v=t(112),b=t(104),E=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(i.a)(this,Object(u.a)(a).call(this,e))).state={selectedPowers:"",totalCP:0,remainingCP:0},t}return Object(m.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(h.a,{"aria-describedby":"Manage Powers","aria-labelledby":"Manage Powers",className:"manage-powers-dialog",fullWidth:!0,onClose:this.props.handleClose,open:!0},r.a.createElement(w.a,null,"Manage Powers"),r.a.createElement(P.a,null,"Manage your powers here"),r.a.createElement(f.a,null,r.a.createElement("form",{onSubmit:function(a){return e.props.handleConfirm(e.state.selectedPowers)}},r.a.createElement(g.a,{required:!0,variant:"outlined",className:"inputControl"},r.a.createElement(v.a,{id:"model-type-input-label"},"Total CP"),r.a.createElement(b.a,{id:"total-cp-input",label:"Total CP",type:"number",required:!0,onChange:this.calculateRemainingCP,className:"total-cp-input"}),r.a.createElement("div",null,r.a.createElement("pre",null,JSON.stringify(this.props.powerData,null,2)))),r.a.createElement(g.a,{className:"inputControl"}),r.a.createElement("div",{className:"actionButtons"},r.a.createElement(p.a,{type:"submit"},"Save"),r.a.createElement(p.a,{onClick:function(){return e.props.handleClose()},color:"primary"},"Cancel")))))}},{key:"calculateRemainingCP",value:function(){}}]),a}(r.a.Component),C=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(i.a)(this,Object(u.a)(a).call(this,e))).closePanels=function(){t.setState({showManagePowersPanel:!1})},t.updateSelectedPowers=function(e){},t.showManagePowersPanel=function(){t.setState({showManagePowersPanel:!0})},t.state={showManagePowersPanel:!1,selectedPowers:"",powerData:{}},t}return Object(m.a)(a,e),Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("./data/powers.csv").then(function(e){return e.text()}).then(function(a){e.setState({powerData:e.csvToJson(a)})})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(d,{toggleManagePowers:this.showManagePowersPanel}),r.a.createElement("main",{className:"container"}),this.state.showManagePowersPanel&&r.a.createElement(E,{powerData:this.state.powerData,selectedPowers:this.state.selectedPowers,handleConfirm:function(a){return e.updateSelectedPowers(a)},handleClose:function(){return e.closePanels()}}))}},{key:"csvToJson",value:function(e){for(var a=e.split("\n"),t=[],n=a[0].split(","),r=1;r<a.length;r++){for(var l={},o=a[r].split(","),s=0;s<n.length;s++)l[n[s]]=o[s];t.push(l)}return JSON.stringify(t)}}]),a}(r.a.Component);t(69),t(70);o.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[60,1,2]]]);
//# sourceMappingURL=main.5effba8c.chunk.js.map