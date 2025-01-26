import{a as b}from"./vendor-4jich7g5.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();const v=b.create({baseURL:"https://your-energy.b.goit.study/api"}),$=async r=>(await v.get("/exercises",{params:r})).data,B=async r=>(await v.get(`/exercises/${r}`)).data,m="/project-impulse/";class k{constructor(e,t=!1,i){this.containerElement=e,this.withDelete=t,this.emptyStateMessage=i,this.emptyStateElement=null,this.createItemTemplate=s=>{const n=s.name?s.name.charAt(0).toUpperCase()+s.name.slice(1):"";return`
      <li class="exercise-card">
        <div class="exercise-card__heading">
          <p class="exercise-badge">WORKOUT</p>

          ${this.withDelete?`
            <button class="btn-icon" type="button" data-delete-id="${s._id}">
              <svg class="icon stroke-icon" width="16" height="16">
                <use href="${m}images/sprite.svg#icon-trash"></use>
              </svg>
            </button>`:`
            <span class="rating-wrapper">
              <p class="exercise-rating">${s.rating.toFixed(1)}</p>
              <svg class="icon fill-icon exercise-rating-icon" width="14" height="14">
                <use href="${m}images/sprite.svg#icon-star"></use>
              </svg>
            </span>`}
          <button class="exercise-card__btn" type="button" data-start-id="${s._id}">
            Start
            <svg class="icon fill-icon arrow-icon" width="16" height="16">
              <use href="${m}images/sprite.svg#icon-arw-scroll"></use>
            </svg>
          </button>
        </div>
        <div class="exercise-card__main">
          <div class="icon-runningman-bg">
            <svg class="icon fill-icon icon-runningman" width="16" height="16">
              <use href="${m}images/sprite.svg#icon-runningman"></use>
            </svg>
          </div>
          <h3 class="exercise-card__title">${n}</h3>
        </div>

        <ul class="exercise-card__info">
          <li class="exercise-card__info-item">
            <span class="exercise-card__item-label">Burned calories: </span>
            <span class="exercise-card__item-content ellipsis">${s.burnedCalories} / ${s.time} minutes</span>
          </li>
          <li class="exercise-card__info-item">
            <span class="exercise-card__item-label">Body part: </span>
            <span class="exercise-card__item-content">${s.bodyPart}</span>
          </li>
          <li class="exercise-card__info-item">
            <span class="exercise-card__item-label">Target: </span>
            <span class="exercise-card__item-content">${s.target}</span>
          </li>
        </ul>
      </li>
    `},this.init()}clear(){this.containerElement.innerHTML=""}onExerciseSelect(e){this.onExerciseSelectCallback=e}onExerciseDelete(e){this.onExerciseDeleteCallback=e}render(e){e.length?this.removeEmptyState():this.renderEmptyState(),this.containerElement.innerHTML=e.filter(t=>t.name).map(this.createItemTemplate).join("")}renderEmptyState(){this.emptyStateElement||(this.emptyStateElement=document.createElement("p"),this.emptyStateElement.className="exercises-empty-message",this.emptyStateElement.innerHTML=this.emptyStateMessage,this.containerElement.parentElement.insertBefore(this.emptyStateElement,this.containerElement.parentElement.firstChild))}removeEmptyState(){this.emptyStateElement&&this.emptyStateElement.remove()}init(){this.initListeners()}initListeners(){this.containerElement.addEventListener("click",e=>{const t=e.target,i=t.closest("[data-start-id]"),s=t.closest("[data-delete-id]");if(i){const n=i.getAttribute("data-start-id");this.onExerciseSelectCallback&&n&&this.onExerciseSelectCallback(n)}if(s){const n=s.getAttribute("data-delete-id");this.onExerciseDeleteCallback&&n&&this.onExerciseDeleteCallback(n)}})}}const L="/project-impulse/";class x{constructor(e){this.close=()=>{this.dialog.close(),document.removeEventListener("keydown",this.handleKeyDown)},this.handleKeyDown=t=>{t.key==="Escape"&&this.close()},this.dialogContentTemplate=document.querySelector(e),this.init()}showDialog(){document.body.appendChild(this.dialog),this.dialog.classList.remove("hidden"),this.dialog.setAttribute("aria-hidden","false"),this.dialog.showModal(),document.addEventListener("keydown",this.handleKeyDown),this.dialog.addEventListener("close",()=>{this.dialog.remove()})}init(){this.dialog=document.createElement("dialog"),this.dialog.classList.add("modal"),this.dialog.classList.add("hidden"),this.dialog.setAttribute("aria-modal","true"),this.dialog.setAttribute("aria-hidden","true"),this.dialog.innerHTML=this.renderDialog(),this.dialogCloseButton=this.dialog.querySelector("[data-dialog-close]"),this.dialogContent=this.dialog.querySelector("[data-dialog-content]"),this.dialogCloseButton.addEventListener("click",this.close),this.dialog.addEventListener("mousedown",e=>{e.target===e.currentTarget&&this.close()})}renderDialog(){return`
      <div class="modal-container">
        <button class="modal-close-button" type="button" data-dialog-close>
          <svg width="24" height="24" class="icon stroke-icon">
            <use href="${L}images/sprite.svg#icon-x" data-favorite-icon />
          </svg>
        </button>
        <div class="modal-card" data-dialog-content>
          ${this.dialogContentTemplate.innerHTML}
        </div>
      </div>
    `}}const u=class u{constructor(){this.favorites=[],this.getFromStorage()}gerFavorites(){return this.favorites}addFavorite(e){this.favorites.push(e),this.setToStorage()}removeFavorite(e){this.favorites=this.favorites.filter(t=>t!==e),this.setToStorage()}isFavorite(e){return this.favorites.includes(e)}setToStorage(){localStorage.setItem(u.LOCAL_STORAGE_KEY,JSON.stringify(this.favorites))}getFromStorage(){const e=localStorage.getItem(u.LOCAL_STORAGE_KEY);e&&(this.favorites=JSON.parse(e))}};u.LOCAL_STORAGE_KEY="yourEnergy.favorites";let f=u;const p=new f,S="/project-impulse/";class D extends x{constructor(e){super(e)}show(e){this.render(e),this.showDialog()}render(e){var E;const t=this.dialogContentTemplate.cloneNode(!0),i={name:t.content.querySelector("[data-name-element]"),gifUrl:t.content.querySelector("[data-gif-element]"),rating:t.content.querySelector("[data-rating-element]"),target:t.content.querySelector("[data-target-element]"),bodyPart:t.content.querySelector("[data-bodyPart-element]"),equipment:t.content.querySelector("[data-equipment-element]"),popularity:t.content.querySelector("[data-popular-element]"),burnedCalories:t.content.querySelector("[data-burnedCalories-element]"),time:t.content.querySelector("[data-time-element]"),description:t.content.querySelector("[data-description-element]")},s=t.content.querySelector("[data-cut-percent]");(E=s.parentElement)==null||E.setAttribute("id","cut-off-star");const n=t.content.querySelector("[data-rating-list]");for(const g in i){const c=i[g],d=e[g];d?(c.classList.remove("hidden"),c instanceof HTMLImageElement?c.src=String(d):g==="rating"?(c.innerHTML=Number(d).toFixed(2),this.renderStars(Number(d),s,n)):c.innerHTML=String(d)):c.classList.add("hidden")}const o=t.content.querySelector("[data-favorite-element]"),a=o.querySelector("[data-favorite-title]"),l=o.querySelector("[data-favorite-icon]");o.addEventListener("click",()=>{this.handleButtonFavorite(e._id,a,l)}),this.handleButtonFavorite(e._id,a,l,!1),this.dialogContent.innerHTML="",this.dialogContent.appendChild(t.content)}handleButtonFavorite(e,t,i,s=!0){let n=p.isFavorite(e);s&&(n=!n),n?(s&&p.addFavorite(e),t.innerHTML="Remove from favorites",i.setAttribute("href",`${S}images/sprite.svg#icon-trash`)):(s&&p.removeFavorite(e),t.innerHTML="Add to favorites",i.setAttribute("href",`${S}images/sprite.svg#icon-heart`))}renderStars(e,t,i){var o;const s=Math.floor(e),n=e%1;Array.from(i.children).forEach(a=>{var l;a.classList.remove("icon-star-filled"),(l=a.lastElementChild)==null||l.classList.add("hidden")});for(let a=0;a<s;a++)i.children[a].classList.add("icon-star-filled");n&&(t.setAttribute("width",(14*n).toString()),(o=i.children[s].lastElementChild)==null||o.classList.remove("hidden"))}}class _{constructor(e){this.config=e,this.init()}init(){var e,t,i;(e=this.config.openMenuBtn)==null||e.addEventListener("click",()=>{this.onMenuOpen()}),(t=this.config.closeMenuBtn)==null||t.addEventListener("click",()=>{this.onMenuClose()}),(i=this.config.backdrop)==null||i.addEventListener("click",()=>{this.onMenuClose()})}onMenuClose(){this.config.menu.classList.remove("mobile-menu-open"),this.config.menu.setAttribute("aria-hidden","true"),document.body.style.overflow=""}onMenuOpen(){this.config.menu.classList.add("mobile-menu-open"),this.config.menu.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}}const C=async()=>(await v.get("/quote")).data,h=class h{async initialize(){const e=this.getStoredQuote(),t=new Date().toISOString().split("T")[0];if(e&&e.date===t){this.renderQuote(e.quote);return}try{const i=await C();this.storeQuote(i,t),this.renderQuote(i)}catch(i){console.error("Error fetching quote:",i)}}getStoredQuote(){const e=localStorage.getItem(h.LOCAL_STORAGE_KEY);return e?JSON.parse(e):null}storeQuote(e,t){const i={quote:e,date:t};localStorage.setItem(h.LOCAL_STORAGE_KEY,JSON.stringify(i))}renderQuote(e){const t=document.getElementById("quote"),i=document.getElementById("author");t&&(t.textContent=e.quote),i&&(i.textContent=e.author)}};h.LOCAL_STORAGE_KEY="yourEnergy.quoteOfTheDay";let y=h;const q=document.querySelector(".js-menu-open"),w=document.querySelector(".js-menu-close"),T=document.querySelector(".js-mobile-menu"),A=document.querySelector(".js-mobile-menu-backdrop");new _({openMenuBtn:q,closeMenuBtn:w,menu:T,backdrop:A});const M=new y;M.initialize();export{k as E,D as a,B as b,p as f,$ as g,v as y};
//# sourceMappingURL=main-WLebNG-g.js.map
