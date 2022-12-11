(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const y=document.querySelector("#sorting-btn"),L=document.querySelector("#categories-btn"),b=document.querySelector("#add-btn"),l=document.querySelector(".sort-container"),i=document.querySelector(".add-item-container"),D=[{title:"Example",category:"example",deadline:new Date("2023-01-17 00:00:00"),dateAddedToList:new Date("Sat Dec 10 2022 16:10:26 GMT+0800 (Central Indonesia Time)")}],H=document.querySelector("#todo-items-container"),u=document.querySelector("#title-input"),d=document.querySelector("#category-input"),m=document.querySelector("#date-input"),r=document.querySelector("#add-item-btn");let v=!1,T=!1,f=!1;function M(o){const n=o.currentTarget.id;n==="sorting-btn"?(l==null||l.classList.toggle("open"),i!=null&&i.classList.contains("open")&&(i==null||i.classList.remove("open"))):n==="add-btn"&&(i==null||i.classList.toggle("open"),l!=null&&l.classList.contains("open")&&(l==null||l.classList.remove("open")))}function h(o){const t=o.currentTarget,n=t.value,e=t.parentElement.querySelector(".input-error");if(t.id==="date-input"){const s=new Date,a=s.getFullYear(),q=s.getMonth()+1,w=s.getDate(),g=n.split("-"),p=Number(g[0]),S=Number(g[1]),A=Number(g[2]);p>a&&p.toString().length===4?(f=!0,e.innerHTML=""):p===a&&S>q?(console.log("HEY!"),f=!0,e.innerHTML=""):p===a&&S===q&&A>=w?(f=!0,e.innerHTML=""):n?(f=!1,e.innerHTML="cannot be in the Past"):(f=!1,e.innerHTML="is Required")}t.id==="title-input"&&(n?(v=!0,e.innerHTML=""):(v=!1,e.innerHTML="is Required")),t.id==="category-input"&&(n?(T=!0,e.innerHTML=""):(T=!1,e.innerHTML="is Required")),v&&T&&f?r==null||r.removeAttribute("disabled"):r==null||r.setAttribute("disabled","true")}function N(o){const t=o.deadline.getTime(),n=new Date().getTime(),c=t-n;return Math.ceil(c/(1e3*60*60*24))}function E(){H.innerHTML="";for(let o=0;o<D.length;o++){const t=D[o],n=N(t);H.innerHTML+=`
    <article class="todo-item">

      <button>
        <span class="material-symbols-outlined">task_alt</span>
      </button>

      <p>${t.title}</p>

      <div class="time-left">
        <span class="material-symbols-outlined">hourglass_empty</span>
        <span>${n}days</span>
      </div>

      <button>
        <span class="material-symbols-outlined">do_not_disturb_on</span>
      </button>
    
    </article>
    `}}function k(){i==null||i.classList.remove("open"),r==null||r.setAttribute("disabled","true"),u.value="",d.value="",m.value=""}function F(){const o=u==null?void 0:u.value,t=d==null?void 0:d.value,n=new Date(m.value),c=new Date,e={title:o,category:t,deadline:n,dateAddedToList:c};D.push(e),k(),E()}y==null||y.addEventListener("click",M);L==null||L.addEventListener("click",M);b==null||b.addEventListener("click",M);u==null||u.addEventListener("blur",h);d==null||d.addEventListener("blur",h);m==null||m.addEventListener("change",h);r==null||r.addEventListener("click",F);E();
