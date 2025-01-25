import{P as m}from"./assets/main-DVPzL8Mt.js";/* empty css                      */import{a as y,i as l,A as p}from"./assets/vendor-4jich7g5.js";var n=(r=>(r.Muscles="Muscles",r.BodyParts="Body parts",r.Equipment="Equipment",r))(n||{});class b{constructor(e,t=""){this.currentCategory="",this.currentFilter="",this.config=e,this.currentCategory=t,this.init()}init(){this.render(),this.addFilterClickListener()}addFilterClickListener(){this.config.categoryFiltersElement.addEventListener("click",e=>{var s;const t=e.target;if(t.classList.contains("js-filter-btn")){this.clearActiveFilters(),this.activateFilter(t);const i=t.dataset.type;if(!i){console.error("No data type found.");return}this.setCategory(i),(s=this.onFilterChangeCallback)==null||s.call(this,this.currentCategory)}})}clearActiveFilters(){this.config.categoryFiltersElement.querySelectorAll(".js-filter-btn").forEach(t=>t.classList.remove("active"))}activateFilter(e){e.classList.add("active")}onFilterChange(e){this.onFilterChangeCallback=e}setCategory(e){this.currentCategory=e,this.currentFilter="",this.render()}setFilter(e){this.currentFilter=e,this.render()}getCategory(){return this.currentCategory}renderBreadcrumbs(){const e=this.config.breadcrumbsElement.querySelector("#breadcrumbs-splitter"),t=this.config.breadcrumbsElement.querySelector(".filter-value");e&&t&&(this.currentFilter!==""?(e.classList.remove("hidden"),t.classList.remove("hidden"),t.innerHTML=this.currentFilter):(e.classList.add("hidden"),t.classList.add("hidden"),t.innerHTML=""))}render(){this.config.categoryFiltersElement.innerHTML=Object.values(n).map(e=>{const t=e===this.currentCategory?"active":"",s=e.charAt(0).toUpperCase()+e.slice(1);return`
          <li>
            <button
              class="filter-btn js-filter-btn ${t}"
              data-type="${e}"
              type="button"
            >
              ${s}
            </button>
          </li>
        `}).join(""),this.renderBreadcrumbs()}}const h=y.create({baseURL:"https://your-energy.b.goit.study/api"}),f=async r=>(await h.get("/filters",{params:r})).data;class C{constructor(e,t,s,i){this.itemsPerPage=s,this.paginationContainer=i,this.category="",this.containerElement=e,this.category=t,this.loadData(1,this.itemsPerPage)}setCategory(e){this.category=e,this.pagination=void 0,this.loadData(1,this.itemsPerPage)}async loadData(e=1,t=this.itemsPerPage){try{const s=await f({filter:this.category,page:e,limit:t});this.setupPagination(s.totalPages,s.perPage),this.render(s.results)}catch(s){console.error("Error loading data:",s)}}setupPagination(e,t){this.pagination||(this.pagination=new m(this.paginationContainer,e,t),this.pagination.onPageChange((s,i)=>{this.loadData(s,i)}))}createCategoryItem(e){const t=e.name?e.name.charAt(0).toUpperCase()+e.name.slice(1):"";return`
      <li class="exercise-category-card">
        <img
          class="exercise-category-image"
          src="${e.imgURL}"
          alt="${e.name||"No name"}"
        />
        <div class="exercise-category-overlay" data-type="${t}">
          <h3 class="exercise-category-title">${t}</h3>
          <p class="exercise-category-subtitle">${e.filter}</p>
        </div>
      </li>
    `}render(e){this.containerElement.innerHTML=e.filter(t=>t.name).map(this.createCategoryItem).join(""),this.addClickEvent()}addClickEvent(){this.containerElement.addEventListener("click",e=>{var i;const s=(i=e.target.closest("[data-type]"))==null?void 0:i.getAttribute("data-type");this.onCategoryChangeCallback&&s&&this.onCategoryChangeCallback(s)})}onCategoryChange(e){this.onCategoryChangeCallback=e}}const E=async r=>(await h.post("/subscription",{email:r})).data;class F{constructor(e){this.form=e,this.form&&(this.submitButton=this.form.querySelector('button[type="submit"]'),this.init())}init(){this.form.addEventListener("submit",e=>this.handleSubmit(e))}async handleSubmit(e){var i,c;if(e.preventDefault(),!this.form)return;const s=new FormData(this.form).get("email");this.toggleButtonLoader(!0);try{const a=await E(s);l.success({message:a.message,position:"topRight"}),this.form.reset()}catch(a){await new Promise(u=>setTimeout(u,1e3));const d=a instanceof p?((c=(i=a.response)==null?void 0:i.data)==null?void 0:c.message)||"Error while sending subscription.":"An unexpected error occurred while sending the subscription.";l.error({message:d,position:"topRight"})}finally{this.toggleButtonLoader(!1)}}toggleButtonLoader(e){const t=this.submitButton.querySelector(".button-text"),s=this.submitButton.querySelector(".button-loader");e?(t==null||t.classList.add("hidden"),s==null||s.classList.remove("hidden")):(t==null||t.classList.remove("hidden"),s==null||s.classList.add("hidden"))}}const v=document.querySelector(".js-category-filters"),L=document.querySelector(".js-breadcrumbs"),P=document.querySelector("#search"),S=document.querySelector(".exercise-categories-list"),q=document.querySelector(".pagination-wrapper"),o=new b({categoryFiltersElement:v,breadcrumbsElement:L,searchElement:P},n.Muscles),w=12,g=new C(S,o.getCategory(),w,q);o.onFilterChange(r=>{console.log("Filter changed for category",r),g.setCategory(r)});g.onCategoryChange(r=>{console.log("exerciseCategories changed for category",r),o.setFilter(r)});const B=document.querySelector(".subscribe-form");new F(B);
//# sourceMappingURL=index.js.map
