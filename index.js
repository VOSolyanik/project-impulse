import{P as c}from"./assets/main-DVPzL8Mt.js";/* empty css                      */import{a as l}from"./assets/vendor-N5iQpiFS.js";var a=(s=>(s.Muscles="Muscles",s.BodyParts="Body parts",s.Equipment="Equipment",s))(a||{});class g{constructor(e,t=""){this.currentCategory="",this.currentFilter="",this.config=e,this.currentCategory=t,this.init()}init(){this.render(),this.addFilterClickListener()}addFilterClickListener(){this.config.categoryFiltersElement.addEventListener("click",e=>{var r;const t=e.target;if(t.classList.contains("js-filter-btn")){this.clearActiveFilters(),this.activateFilter(t);const i=t.dataset.type;if(!i){console.error("No data type found.");return}this.setCategory(i),(r=this.onFilterChangeCallback)==null||r.call(this,this.currentCategory)}})}clearActiveFilters(){this.config.categoryFiltersElement.querySelectorAll(".js-filter-btn").forEach(t=>t.classList.remove("active"))}activateFilter(e){e.classList.add("active")}onFilterChange(e){this.onFilterChangeCallback=e}setCategory(e){this.currentCategory=e,this.currentFilter="",this.render()}setFilter(e){this.currentFilter=e,this.render()}getCategory(){return this.currentCategory}renderBreadcrumbs(){const e=this.config.breadcrumbsElement.querySelector("#breadcrumbs-splitter"),t=this.config.breadcrumbsElement.querySelector(".filter-value");e&&t&&(this.currentFilter!==""?(e.classList.remove("hidden"),t.classList.remove("hidden"),t.innerHTML=this.currentFilter):(e.classList.add("hidden"),t.classList.add("hidden"),t.innerHTML=""))}render(){this.config.categoryFiltersElement.innerHTML=Object.values(a).map(e=>{const t=e===this.currentCategory?"active":"",r=e.charAt(0).toUpperCase()+e.slice(1);return`
          <li>
            <button
              class="filter-btn js-filter-btn ${t}"
              data-type="${e}"
              type="button"
            >
              ${r}
            </button>
          </li>
        `}).join(""),this.renderBreadcrumbs()}}const h=l.create({baseURL:"https://your-energy.b.goit.study/api"}),d=async s=>(await h.get("/filters",{params:s})).data;class u{constructor(e,t,r,i){this.itemsPerPage=r,this.paginationContainer=i,this.category="",this.containerElement=e,this.category=t,this.loadData(1,this.itemsPerPage)}setCategory(e){this.category=e,this.pagination=void 0,this.loadData(1,this.itemsPerPage)}async loadData(e=1,t=this.itemsPerPage){try{const r=await d({filter:this.category,page:e,limit:t});this.setupPagination(r.totalPages,r.perPage),this.render(r.results)}catch(r){console.error("Error loading data:",r)}}setupPagination(e,t){this.pagination||(this.pagination=new c(this.paginationContainer,e,t),this.pagination.onPageChange((r,i)=>{this.loadData(r,i)}))}createCategoryItem(e){const t=e.name?e.name.charAt(0).toUpperCase()+e.name.slice(1):"";return`
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
    `}render(e){this.containerElement.innerHTML=e.filter(t=>t.name).map(this.createCategoryItem).join(""),this.addClickEvent()}addClickEvent(){this.containerElement.addEventListener("click",e=>{var i;const r=(i=e.target.closest("[data-type]"))==null?void 0:i.getAttribute("data-type");this.onCategoryChangeCallback&&r&&this.onCategoryChangeCallback(r)})}onCategoryChange(e){this.onCategoryChangeCallback=e}}const m=document.querySelector(".js-category-filters"),y=document.querySelector(".js-breadcrumbs"),p=document.querySelector("#search"),C=document.querySelector(".exercise-categories-list"),b=document.querySelector(".pagination-wrapper"),n=new g({categoryFiltersElement:m,breadcrumbsElement:y,searchElement:p},a.Muscles),f=12,o=new u(C,n.getCategory(),f,b);n.onFilterChange(s=>{console.log("Filter changed for category",s),o.setCategory(s)});o.onCategoryChange(s=>{console.log("exerciseCategories changed for category",s),n.setFilter(s)});
//# sourceMappingURL=index.js.map
