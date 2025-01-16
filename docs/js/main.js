const u=document.querySelector(".js-input"),S=document.querySelector(".js-btn-search"),h=document.querySelector(".js-btn-reset"),d=document.querySelector(".js-list"),c=document.querySelector(".js-favorite-list");document.querySelector(".js-fav-title");document.querySelector(".js-search-title");const g=document.querySelector(".js-btn-prev"),v=document.querySelector(".js-btn-next");let l=[],n=[],s=1,r=1;const b=()=>{const t=document.querySelectorAll(".js-anime");for(const e of t)e.addEventListener("click",L)},j=()=>{const t=document.querySelectorAll(".js-btn-delete-fav");for(const e of t)e.addEventListener("click",$)},A=()=>{const t=localStorage.getItem("favoritesAnimesServer");t&&(n=JSON.parse(t),console.log(n),f(n))};A();function L(t){t.preventDefault();const e=parseInt(t.currentTarget.id),a=l.find(o=>o.mal_id===e),i=n.findIndex(o=>o.mal_id===e);i===-1?n.push(a):n.splice(i,1),console.log(n),m(l),f(n),localStorage.setItem("favoritesAnimesServer",JSON.stringify(n))}function $(t){t.preventDefault();const e=parseInt(t.target.dataset.id);console.log(e);const a=n.findIndex(i=>i.mal_id===e);console.log(a),n.splice(a,1),m(l),f(n),console.log(n),localStorage.setItem("favoritesAnimesServer",JSON.stringify(n))}function m(t){d.innerHTML="";for(const e of t){let i=n.find(o=>o.mal_id===e.mal_id)?"favorite":"";e.images.jpg.image_url==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"?d.innerHTML+=`<li id="${e.mal_id}" class="${i} animes js-anime">
                    <article>
                        <h3 class="anime-title">${e.title}</h3>
                        <img src="https://placehold.co/120x180" alt="${e.title}" class="image-animes"/>
                    </article>
                </li>`:d.innerHTML+=`<li id="${e.mal_id}" class="${i} animes js-anime">
                    <article>
                        <h3 class="anime-title">${e.title}</h3>
                        <img src="${e.images.jpg.image_url}" alt="${e.title}" class="image-animes"/>
                    </article>
                </li>`,b()}}function f(t){c.innerHTML="";for(const e of t)e.images.jpg.image_url==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"?c.innerHTML+=`<li id="${e.mal_id}" class="animes">
                    <button class="btn-delete-fav js-btn-delete-fav" data-id="${e.mal_id}">X</button>
                    <article  class=" fav-anime">
                        <h3 class="anime-title">${e.title}</h3>
                        <img src="https://placehold.co/120x180" alt="${e.title}" class="image-animes"/>
                    </article>
                </li>`:c.innerHTML+=`<li id="${e.mal_id}" class="animes">
                    <button class="btn-delete-fav js-btn-delete-fav" data-id="${e.mal_id}">X</button>
                        <article class=" fav-anime">
                        <h3 class="anime-title">${e.title}</h3>
                        <img src="${e.images.jpg.image_url}" alt="${e.title}" class="image-animes"/>
                    </article>
                </li>`,localStorage.setItem("favoritesAnimesServer",JSON.stringify(n)),j()}function _(){c.innerHTML="",n=[],localStorage.removeItem("favoritesAnimesServer"),m(l)}function y(){document.querySelector(".js-btn-reset-fav").addEventListener("click",_)}y();function q(t){t.preventDefault();const e=u.value.toLowerCase().trim();p(e,1)}function p(t,e){let a=`https://api.jikan.moe/v4/anime?q=${t}`;e>1&&(a+=`&page=${e}`),console.log(a),fetch(a).then(i=>i.json()).then(i=>{console.log("API Response: ",i),l=i.data,m(l),i.pagination&&i.pagination.last_visible_page?(r=i.pagination.last_visible_page,console.log("Total Pages:",r)):(console.log("Pagination not available or only one page"),r=1),F()})}function F(){s===1?g.disabled=!0:g.disabled=!1,s===r?v.disabled=!0:v.disabled=!1}function T(){if(s<r){s++;const t=u.value.toLowerCase().trim();p(t,s)}}function k(){if(s>1){s--;const t=u.value.toLowerCase().trim();p(t,s)}}v.addEventListener("click",T);g.addEventListener("click",k);S.addEventListener("click",q);function I(){u.value="",d.innerHTML="",c.innerHTML="",l=[],n=[],localStorage.removeItem("favoritesAnimesServer"),localStorage.removeItem("animesServer"),m(l),f(n)}h.addEventListener("click",I);
//# sourceMappingURL=main.js.map
