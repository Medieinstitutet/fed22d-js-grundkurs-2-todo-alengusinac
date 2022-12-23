(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const f of o.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();const M=document.querySelector("#sorting-btn"),$=document.querySelector("#categories-btn"),q=document.querySelector("#add-btn"),r=document.querySelector(".sort-container"),l=document.querySelector(".categories-container"),d=document.querySelector(".add-item-container"),y=document.querySelector("#title-input"),g=document.querySelector("#category-input"),p=document.querySelector("#date-input"),u=document.querySelector("#add-item-btn");let E=!1,w=!1,b=!1;const F=document.querySelector("#sort-name-btn"),R=document.querySelector("#sort-deadline-btn"),Y=document.querySelector("#sort-date-added-btn");let c="deadline",S="all categories",a=[],m=[];const O=document.querySelector("#todo-items-container");function I(t){const i=t.currentTarget.id;i==="sorting-btn"?(r.style.visibility==="visible"?r.style.visibility="hidden":r.style.visibility="visible",r==null||r.classList.toggle("open"),d==null||d.classList.remove("open"),l==null||l.classList.remove("open"),d.style.visibility="hidden",l.style.visibility="hidden"):i==="add-btn"?(d.style.visibility==="visible"?d.style.visibility="hidden":d.style.visibility="visible",d==null||d.classList.toggle("open"),r==null||r.classList.remove("open"),l==null||l.classList.remove("open"),r.style.visibility="hidden",l.style.visibility="hidden"):i==="categories-btn"&&(l.style.visibility==="visible"?l.style.visibility="hidden":l.style.visibility="visible",l==null||l.classList.toggle("open"),r==null||r.classList.remove("open"),d==null||d.classList.remove("open"),d.style.visibility="hidden",r.style.visibility="hidden")}function H(t){const e=t.currentTarget,i=e.value,n=e.parentElement.querySelector(".input-error");if(e.id==="date-input"){const o=new Date,f=o.getFullYear(),D=o.getMonth()+1,A=o.getDate(),h=i.split("-"),v=Number(h[0]),T=Number(h[1]),k=Number(h[2]);v>f&&v.toString().length===4||v===f&&T>D||v===f&&T===D&&k>=A?(b=!0,n.innerHTML=""):i?(b=!1,n.innerHTML="cannot be in the Past"):(b=!1,n.innerHTML="is Required")}e.id==="title-input"&&(i?(E=!0,n.innerHTML=""):(E=!1,n.innerHTML="is Required")),e.id==="category-input"&&(i?(w=!0,n.innerHTML=""):(w=!1,n.innerHTML="is Required")),E&&w&&b?u==null||u.removeAttribute("disabled"):u==null||u.setAttribute("disabled","true")}function N(t){const i=t.currentTarget.id;i==="sort-name-btn"&&(c==="name"?c="nameReversed":c="name"),i==="sort-deadline-btn"&&(c==="deadline"?c="deadlineReversed":c="deadline"),i==="sort-date-added-btn"&&(c==="dateAdded"?c="dateAddedReversed":c="dateAdded"),L(),r==null||r.classList.remove("open"),r.style.visibility="hidden"}function _(){c==="name"&&a.sort((t,e)=>t.title<e.title?-1:1),c==="nameReversed"&&a.sort((t,e)=>e.title<t.title?-1:1),c==="deadline"&&a.sort((t,e)=>{const i=new Date(t.deadline),s=new Date(e.deadline);return i.valueOf()-s.valueOf()}),c==="deadlineReversed"&&a.sort((t,e)=>{const i=new Date(t.deadline);return new Date(e.deadline).valueOf()-i.valueOf()}),c==="dateAdded"&&a.sort((t,e)=>{const i=new Date(t.dateAddedToList),s=new Date(e.dateAddedToList);return i.valueOf()-s.valueOf()}),c==="dateAddedReversed"&&a.sort((t,e)=>{const i=new Date(t.dateAddedToList);return new Date(e.dateAddedToList).valueOf()-i.valueOf()})}function V(t){const e=[];if(t.deadline&&t.dateAddedToList){const i=new Date(t.deadline),s=new Date(t.dateAddedToList),n=i.getTime(),o=new Date().getTime(),f=n-o,D=Math.ceil(f/(1e3*60*60*24));e.push(String(D));const A=`0${i.getMonth()+1}`.slice(-2),h=`0${i.getDate()}`.slice(-2),v=`${i.getFullYear()}-${A}-${h}`;e.push(v);const T=`0${s.getMonth()+1}`.slice(-2),k=`0${i.getDate()}`.slice(-2),B=`${s.getFullYear()}-${T}-${k}`;e.push(B)}return e}function x(t){const e=Number(t);return e<=5&&e>0?" close-deadline":e<=0?" after-deadline":""}function P(t){const e=Number(t);return e===1||e===-1?`${e} day`:`${e} days`}function J(){const t=[],e=l.querySelector("ul"),i=document.querySelector("#browse");e.innerHTML='<li>> <button class="category-btn">all categories</button> <</li>',i.innerHTML="";for(let n=0;n<a.length;n++){const o=a[n];t.push(o.category)}t.sort((n,o)=>n<o?-1:1);const s=[...new Set(t)];for(let n=0;n<s.length;n++){const o=s[n];e.innerHTML+=`<li>> <button class="category-btn">${o}</button> <</li>`,i.innerHTML+=`<option value="${o}">`}}function C(t){S=t.currentTarget.innerText,L(),l==null||l.classList.remove("open"),l.style.visibility="hidden"}function K(){const t=document.querySelector("#category-title");if(S==="all categories"){m=a,t.innerHTML="all categories";return}m=a.filter(e=>e.category===S),t.innerHTML=S}function j(){for(let t=0;t<m.length;t++){const e=m.findIndex(i=>i.isChecked===!0);m.push(m.splice(e,1)[0])}}function L(){O.innerHTML="",_(),K(),j();for(let t=0;t<m.length;t++){const e=m[t],i=U(e),s=V(e),n=x(s[0]),o=P(s[0]);O.innerHTML+=`
    <article id="${t}" class="todo-item${i}${n}">

      <button>
        <span id="${t}" class="material-symbols-outlined check-item-btn">task_alt</span>
      </button>

      <p>${e.title}</p>

      <p class="deadline-date">Deadline: ${s[1]}</p>
      <p class="item-category">Category: ${e.category}</p>
      <p class="date-added-date">Date added: ${s[2]}</p>

      <div class="time-left">
        <span class="material-symbols-outlined">hourglass_empty</span>
        <span>${o}</span>
      </div>

      <button>
        <span id="${t}" class="material-symbols-outlined remove-item-btn">do_not_disturb_on</span>
      </button>
    
    </article>
    `}J(),W(),te()}function z(t){const e=t.currentTarget,i=document.querySelector(".todo-item.open");if(i!==null){if(e.id===i.id){e.classList.toggle("open");return}i.classList.remove("open"),e.classList.add("open")}e.classList.add("open")}function G(t){const e=t.currentTarget,i=Number(e.id);a.splice(i,1),L()}function Q(t){const e=t.currentTarget,i=Number(e.id),s=m[i];s.isChecked?s.isChecked=!1:s.isChecked=!0,console.log(s.isChecked),L()}function U(t){return t.isChecked?" checked":""}function W(){const t=document.querySelectorAll(".todo-item"),e=document.querySelectorAll(".remove-item-btn"),i=document.querySelectorAll(".check-item-btn"),s=document.querySelectorAll(".category-btn");for(let n=0;n<t.length;n++)t[n].addEventListener("click",z);for(let n=0;n<e.length;n++)e[n].addEventListener("click",G);for(let n=0;n<i.length;n++)i[n].addEventListener("click",Q);for(let n=0;n<s.length;n++)s[n].addEventListener("click",C)}function X(){d==null||d.classList.remove("open"),u==null||u.setAttribute("disabled","true"),y.value="",g.value="",p.value="",d.style.visibility="hidden"}function Z(){const t=y==null?void 0:y.value,e=g==null?void 0:g.value,i=new Date(p.value),s=new Date,n={title:t,category:e,deadline:i,dateAddedToList:s,isChecked:!1};a.push(n),X(),L()}function ee(){const t=new Date,e=t.getFullYear(),i=`0${t.getMonth()+1}`.slice(-2),s=`0${t.getDate()}`.slice(-2);p.setAttribute("min",`${e}-${i}-${s}`)}function te(){localStorage.setItem("data",JSON.stringify(a))}function ne(){localStorage.getItem("data")!==null&&(a=JSON.parse(localStorage.getItem("data")))}M==null||M.addEventListener("click",I);$==null||$.addEventListener("click",I);q==null||q.addEventListener("click",I);y==null||y.addEventListener("blur",H);g==null||g.addEventListener("blur",H);p==null||p.addEventListener("change",H);u==null||u.addEventListener("click",Z);F.addEventListener("click",N);R.addEventListener("click",N);Y.addEventListener("click",N);ne();ee();L();
