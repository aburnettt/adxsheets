(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{139:function(e,t,a){e.exports=a(152)},144:function(e,t,a){},152:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(11),l=a.n(s),c=(a(144),a(23)),o=a(20),i=a(29),h=a(26),u=a(28),d=a(57),p=a(198),m=a(191),f=a(192),v=a(68),w=a(127),g=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(h.a)(t).call(this,e))).state={purchased:0},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){this.props.purchase(this.props.name,this.state.purchased)}},{key:"render",value:function(){var e=this;return 0==this.state.purchased?r.a.createElement("tr",null,r.a.createElement("td",null,this.props.name),r.a.createElement("td",null,this.props.majorCost>0&&r.a.createElement(d.a,{color:"primary",variant:"contained",onClick:function(){return e.setState({purchased:3})}}," ",this.props.majorCost," ")),r.a.createElement("td",null,this.props.minorCost>0&&r.a.createElement(d.a,{color:"primary",variant:"contained",onClick:function(){return e.setState({purchased:2})}}," ",this.props.minorCost," ")),r.a.createElement("td",null,this.props.lesserCost>0&&r.a.createElement(d.a,{color:"primary",variant:"contained",onClick:function(){return e.setState({purchased:1})}}," ",this.props.lesserCost," "))):r.a.createElement("tr",null,r.a.createElement("td",null,this.props.name),r.a.createElement("td",null,3==this.state.purchased&&r.a.createElement(d.a,{color:"secondary",variant:"contained",onClick:function(){return e.setState({purchased:0})}}," X ")),r.a.createElement("td",null,2==this.state.purchased&&r.a.createElement(d.a,{color:"secondary",variant:"contained",onClick:function(){return e.setState({purchased:0})}}," X ")),r.a.createElement("td",null,1==this.state.purchased&&r.a.createElement(d.a,{color:"secondary",variant:"contained",onClick:function(){return e.setState({purchased:0})}}," X ")))}}]),t}(r.a.Component),b=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(h.a)(t).call(this,e))).state={selectedPowers:{},totalCP:0,remainingCP:0},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return r.a.createElement(p.a,{"aria-describedby":"Manage Powers","aria-labelledby":"Manage Powers",className:"manage-powers-dialog",fullWidth:!0,onClose:this.props.handleClose,open:!0},r.a.createElement(m.a,null,"Manage Powers"),r.a.createElement(f.a,null,r.a.createElement("form",{onSubmit:function(t){return e.props.handleConfirm(e.state.selectedPowers)}},r.a.createElement(v.a,{required:!0,variant:"outlined"},r.a.createElement(w.a,{id:"total-cp-input",label:"Total CP",type:"number",onChange:function(){return e.calculateRemainingCP},className:"total-cp-input"}),"Remaining CP: ",this.state.remainingCP,r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Power"),r.a.createElement("th",null,"Major"),r.a.createElement("th",null,"Minor"),r.a.createElement("th",null,"Lesser"))),r.a.createElement("tbody",null,this.props.powerData&&this.props.powerData.map(function(t){if(t.Major||t.Minor||t.Lesser)return r.a.createElement(g,{name:t.Power,majorCost:t.Major,minorCost:t.Minor,lesserCost:t.Lesser,purchase:function(t,a){return e.purchasePower(t,a)}})})))),r.a.createElement("div",{className:"actionButtons"},r.a.createElement(d.a,{onClick:function(){return e.props.handleConfirm(e.state.selectedPowers)},color:"primary"},"Save"),r.a.createElement(d.a,{onClick:function(){return e.props.handleClose()},color:"primary"},"Cancel")))))}},{key:"calculateRemainingCP",value:function(){this.setState({remainingCP:this.state.totalCP})}},{key:"purchasePower",value:function(e,t){this.state.selectedPowers[e]=t}}]),t}(r.a.Component),E=function(e){var t=e.toggleManagePowers,a=e.toggleManageArch;return r.a.createElement("nav",{className:"navbar navbar-light bg-light"},r.a.createElement("div",{className:"navbar-brand"},r.a.createElement(d.a,{color:"primary",variant:"contained",onClick:t}," Powers "),r.a.createElement(d.a,{color:"primary",variant:"contained",onClick:a}," Archetype/Level ")))},P=a(36),C=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(h.a)(t).call(this,e))).state={selectedArch:a.props.selectedArch?a.props.selectedArch:"Standard",level:a.props.level?a.props.level:1},a.handleArchChange=a.handleArchChange.bind(Object(P.a)(Object(P.a)(a))),a.handleLevelChange=a.handleLevelChange.bind(Object(P.a)(Object(P.a)(a))),a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){}},{key:"handleArchChange",value:function(e){this.setState({selectedArch:e.target.value})}},{key:"handleLevelChange",value:function(e){this.setState({level:Number(e.target.value)})}},{key:"render",value:function(){var e=this;return r.a.createElement(p.a,{"aria-describedby":"Manage Archetype","aria-labelledby":"Manage Archetype",className:"manage-arch-dialog",fullWidth:!0,onClose:this.props.handleClose,open:!0},r.a.createElement(m.a,null,"Manage Archetype"),r.a.createElement(f.a,null,r.a.createElement(v.a,{required:!0,variant:"outlined"},r.a.createElement("select",{value:this.state.selectedArch,onChange:this.handleArchChange},this.buildArchOptions()),r.a.createElement(w.a,{id:"level-input",label:"Level",type:"number",value:this.state.level?this.state.level:1,inputProps:{min:"1",max:"10",step:"1"},onChange:this.handleLevelChange,className:"level-control"})),r.a.createElement("div",{className:"actionButtons"},r.a.createElement(d.a,{onClick:function(){return e.props.handleConfirm(e.state.selectedArch,e.state.level)},color:"primary"},"Save"),r.a.createElement(d.a,{onClick:function(){return e.props.handleClose()},color:"primary"},"Cancel"))))}},{key:"buildArchOptions",value:function(){var e=[],t="";return this.props.archData.forEach(function(a){a.Arch&&a.Arch!==t&&(t=a.Arch,e.push(r.a.createElement("option",{value:t},t)))}),e}}]),t}(r.a.Component),k=a(95),A=a(195),y=a(114),j=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(h.a)(t).call(this,e))).state={abilityList:[],buffList:[]},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){for(var e=[],t=[{field:"name",headerName:"Name",width:250},{field:"action",headerName:"Action",width:120},{field:"atk",headerName:"Atk",width:120},{field:"effect",headerName:"Effect",flex:100,renderCell:function(e){return r.a.createElement("strong",null,e.value.split("|||")[0],r.a.createElement(k.a,{title:e.value.split("|||")[1],arrow:!0,interactive:!0},r.a.createElement(d.a,null,"?")))}}],a=0;a<this.props.abilities.length;a++){var n=this.props.abilities[a];e.push({id:a,name:n.name,action:n.action,atk:n.atk,effect:n.dmg+" "+n.effect+"|||"+n.detail.replaceAll('"',"")})}return r.a.createElement(A.a,{minHeight:"25%"},r.a.createElement("h3",null,"Abilities"),r.a.createElement("div",{style:{height:300,width:"100%"}},r.a.createElement(y.a,{hideFooter:!0,hideFooterPagination:!0,rows:e,columns:t})))}}]),t}(r.a.Component),S=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(h.a)(t).call(this,e))).closePanels=function(){a.setState({showManagePowersPanel:!1,showManageArchPanel:!1})},a.showManagePowersPanel=function(){a.setState({showManagePowersPanel:!0})},a.showManageArchPanel=function(){a.setState({showManageArchPanel:!0})},a.state={showManagePowersPanel:!1,showManageArchPanel:!1,selectedPowers:{},selectedArch:"",level:1,powerData:[],archData:[],parsedAbilities:[],parsedBuffs:[],parsedArch:null},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=window.localStorage.getItem("selectedArch"),a=window.localStorage.getItem("level"),n=window.localStorage.getItem("selectedPowers");t&&this.setState({selectedArch:t}),a&&this.setState({level:JSON.parse(a)}),n&&this.setState({selectedPowers:JSON.parse(n)}),fetch("https://raw.githubusercontent.com/aburnettt/adxsheets/master/src/data/powers.csv").then(function(e){return e.text()}).then(function(t){e.setState({powerData:e.csvToJson(t)}),e.parseData()}),fetch("https://raw.githubusercontent.com/aburnettt/adxsheets/master/src/data/arch.csv").then(function(e){return e.text()}).then(function(t){e.setState({archData:e.csvToJson(t)}),e.parseData()})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(E,{toggleManagePowers:this.showManagePowersPanel,toggleManageArch:this.showManageArchPanel}),r.a.createElement("main",{className:"container"},""==this.state.selectedArch?r.a.createElement("strong",null,"Select an Archetype"):r.a.createElement(j,{abilities:this.state.parsedAbilities,buffs:this.state.parsedBuffs})),this.state.showManagePowersPanel&&r.a.createElement(b,{powerData:this.state.powerData,selectedPowers:this.state.selectedPowers,handleConfirm:function(t){return e.updateSelectedPowers(t)},handleClose:function(){return e.closePanels()}}),this.state.showManageArchPanel&&r.a.createElement(C,{archData:this.state.archData,selectedArch:this.state.selectedArch,level:this.state.parsedArch?this.state.parsedArch.level:1,handleConfirm:function(t,a){return e.updateSelectedArch(t,a)},handleClose:function(){return e.closePanels()}}))}},{key:"updateSelectedArch",value:function(e,t){this.setState({selectedArch:e,level:t}),window.localStorage.setItem("selectedArch",e),window.localStorage.setItem("level",JSON.stringify(t)),this.parseData(this.state.selectedPowers,e,t),this.closePanels()}},{key:"updateSelectedPowers",value:function(e){this.setState({selectedPowers:e}),window.localStorage.setItem("selectedPowers",JSON.stringify(e)),this.parseData(e),this.closePanels()}},{key:"csvToJson",value:function(e){for(var t=e.split("\r\n"),a=[],n=t[0].split(","),r=1;r<t.length;r++){for(var s={},l=t[r].split(","),c=0;c<n.length;c++)s[n[c]]=l[c];a.push(s)}return a}},{key:"parseData",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.selectedPowers,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.state.selectedArch,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.state.level;if(""!==t&&0!==a&&this.state.archData!==[]&&this.state.powerData!==[]){var n={characterPoints:0,lesserRank:0,level:a,majorRank:0,minorRank:0,name:t,trainingPoints:0,willDice:0};this.state.archData.forEach(function(e){if(e.Arch===t){var r=e["Level "+a];e.Detail;switch(e.Row){case"CP":n.characterPoints=r;break;case"TP":n.trainingPoints=r;break;case"Major":n.majorRank=r;break;case"Minor":n.minorRank=r;break;case"Lesser":n.lesserRank=r;break;case"Will Dice":n.willDice=r}}});var r=[];this.state.powerData.forEach(function(t){if(e[t.Power]&&e[t.Power]>0&&n){var a=0;switch(e[t.Power]){case 1:a=n.lesserRank;break;case 2:a=n.minorRank;break;case 3:a=n.majorRank}if("Ability"===t.Row){var s={name:t.Power,action:t.Action,dmg:t["r"+a],atk:"1d20",effect:t.Effect,detail:t.Detail,tags:t.Tags.split(" "),condition:t.Condition};r.push(s)}else t.row}}),this.setState({parsedAbilities:r,parsedBuffs:[],parsedArch:n})}}}]),t}(r.a.Component);a(150),a(151);l.a.render(r.a.createElement(S,null),document.getElementById("root"))}},[[139,1,2]]]);
//# sourceMappingURL=main.81e32c5a.chunk.js.map