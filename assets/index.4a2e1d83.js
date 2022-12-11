(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&f(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function f(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const g=document.querySelector("#sorting-btn"),y=document.querySelector("#categories-btn"),b=document.querySelector("#add-btn"),l=document.querySelector(".sort-container"),s=document.querySelector(".add-item-container"),h=[{title:"Example",category:"example",deadline:"2023-01-17",dateAddedToList:new Date("Sat Dec 10 2022 16:10:26 GMT+0800 (Central Indonesia Time)")}],E=document.querySelector("#todo-items-container"),a=document.querySelector("#title-input"),u=document.querySelector("#category-input"),m=document.querySelector("#date-input"),o=document.querySelector("#add-item-btn");let v=!1,T=!1,d=!1;function M(r){const i=r.currentTarget.id;i==="sorting-btn"?(l==null||l.classList.toggle("open"),s!=null&&s.classList.contains("open")&&(s==null||s.classList.remove("open"))):i==="add-btn"&&(s==null||s.classList.toggle("open"),l!=null&&l.classList.contains("open")&&(l==null||l.classList.remove("open")))}function q(r){const n=r.currentTarget,i=n.value,e=n.parentElement.querySelector(".input-error");if(n.id==="date-input"){const t=new Date,c=t.getFullYear(),S=t.getMonth()+1,A=t.getDate(),L=i.split("-"),p=Number(L[0]),H=Number(L[1]),N=Number(L[2]);p>c&&p.toString().length===4?(d=!0,e.innerHTML=""):p===c&&H>S?(console.log("HEY!"),d=!0,e.innerHTML=""):p===c&&H===S&&N>=A?(d=!0,e.innerHTML=""):i?(d=!1,e.innerHTML="cannot be in the Past"):(d=!1,e.innerHTML="is Required")}n.id==="title-input"&&(i?(v=!0,e.innerHTML=""):(v=!1,e.innerHTML="is Required")),n.id==="category-input"&&(i?(T=!0,e.innerHTML=""):(T=!1,e.innerHTML="is Required")),v&&T&&d?o==null||o.removeAttribute("disabled"):o==null||o.setAttribute("disabled","true")}function D(){E.innerHTML="";for(let r=0;r<h.length;r++){const n=h[r];E.innerHTML+=`
    <article class="todo-item">

      <button>
        <span class="material-symbols-outlined">task_alt</span>
      </button>

      <p>${n.title}</p>

      <div class="time-left">
        <span class="material-symbols-outlined">hourglass_empty</span>
        <span>2h 30min</span>
      </div>

      <button>
        <span class="material-symbols-outlined">do_not_disturb_on</span>
      </button>
    
    </article>
    `}}function k(){s==null||s.classList.remove("open"),o==null||o.setAttribute("disabled","true"),a.value="",u.value="",m.value=""}function w(){const r=a==null?void 0:a.value,n=u==null?void 0:u.value,i=m.value,f=new Date,e={title:r,category:n,deadline:i,dateAddedToList:f};h.push(e),k(),D()}g==null||g.addEventListener("click",M);y==null||y.addEventListener("click",M);b==null||b.addEventListener("click",M);a==null||a.addEventListener("blur",q);u==null||u.addEventListener("blur",q);m==null||m.addEventListener("change",q);o==null||o.addEventListener("click",w);D();
