(window["webpackJsonpthe-phonebook"]=window["webpackJsonpthe-phonebook"]||[]).push([[0],{16:function(e,t,n){e.exports=n(39)},21:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(13),c=n.n(o),u=(n(21),n(15)),i=n(14),l=n(2),f=function(e){var t=e.filter,n=e.updateFilter;return a.a.createElement("input",{value:t,onChange:n})},m=function(e){return a.a.createElement("form",{onSubmit:e.addName},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:e.newName,onChange:e.handleNameChange,required:!0})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange,required:!0})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},d=function(e){var t=e.filteredList;return a.a.createElement("div",null,t())},s=function(e){var t=e.msg;return null===t?null:a.a.createElement("div",{style:t.style},t.message)},x=n(3),b=n.n(x),p="/api/persons",h=function(){return b.a.get(p).then(function(e){return e.data})},g=function(e){return b.a.post(p,e).then(function(e){return e.data})},v=function(e){return b.a.delete("".concat(p,"/").concat(e))},O=function(e,t){return b.a.put("".concat(p,"/").concat(e),t).then(function(e){return e.data})};function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var E=function(e,t){return(e=e.match(t))?e.join(""):""},y=function(){var e=Object(r.useState)([]),t=Object(l.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(""),x=Object(l.a)(c,2),b=x[0],p=x[1],y=Object(r.useState)(""),j=Object(l.a)(y,2),k=j[0],C=j[1],N=Object(r.useState)(""),S=Object(l.a)(N,2),P=S[0],D=S[1],z=Object(r.useState)(null),L=Object(l.a)(z,2),I=L[0],q=L[1];Object(r.useEffect)(function(){h().then(function(e){return o(e)}).catch(function(e){return console.log("Connection failed")})},[]);var A=function(e,t){return!!window.confirm("Delete ".concat(e,"?"))&&v(t).then(function(){o(n.filter(function(e){return e.id!==t}))}).catch(function(e){return console.log("Unable to delete current person this time")})},F=function(e,t){return!!t&&t.toLowerCase()===e.toLowerCase()},J=function(e){q(e),setTimeout(function(){q(null)},3e3)};return a.a.createElement("div",null,a.a.createElement("h2",null," Phonebook "),a.a.createElement(s,{msg:I}),a.a.createElement(f,{filter:P,updateFilter:function(e){var t=E(e.target.value,/[a-z]+\.?\s?/gi);D(t)}}),a.a.createElement("h2",null," Add a new contact ")," ",a.a.createElement(m,{addName:function(e){e.preventDefault();for(var t=b?b.replace(/^[\s]+|[\s]+$/g,""):"",r=!1,a=0,c=0;c<n.length;c++)if(F(n[c].name,t)){r=!0,a=n[c].id;break}if(/\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})/g.test(k)){if(r)return window.confirm("".concat(t," is already added to phonebook, replace the old number with a new one?"))?function(e){var r=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(n,!0).forEach(function(t){Object(i.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},n.find(function(t){return t.id===e}),{number:k});return O(e,r).then(function(t){return o(n.map(function(n){return n.id!==e?n:t}))}).catch(function(e){J({message:"Information of ".concat(t," has already been removed from server"),style:{color:"red",border:"red 3px solid",fontSize:18}}),n.filter(function(e){return e!==e.id})}).finally(function(){p(""),C("")})}(a):p("");g({name:t,number:k}).then(function(e){console.log("succesfully created"),o([].concat(Object(u.a)(n),[e])),p(""),C("")}).catch(function(e){return console.log("invalid entry data",e)}).finally(function(){return J({message:"Added ".concat(t," to the phonebook"),style:{color:"green",border:"green 3px solid",fontSize:18}})})}else alert("Invalid phone number input format, try (xxx) xxx xxxx/ xxx-xxx-xxxx/(xxx)xxxxxxx/xxx.xxx.xxxx or just xxxxxxxxxx ")},newName:b,newNumber:k,handleNameChange:function(e){var t=E(e.target.value,/[a-z]+\.?\s?/gi);p(t)},handleNumberChange:function(e){var t=E(e.target.value,/[0-9()\s.-]/g);C(t)}}),a.a.createElement("h2",null," Numbers ")," ",a.a.createElement(d,{filteredList:function(){return n.filter(function(e){return P?(t=e.name,new RegExp(P,"gi").test(t)):e;var t}).map(function(e){return a.a.createElement("div",{key:e.name}," ",e.name," ",e.number," ",a.a.createElement("button",{onClick:function(){return A(e.name,e.id)}},"delete"))})}})," ")};c.a.render(a.a.createElement(y,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.15dea23e.chunk.js.map