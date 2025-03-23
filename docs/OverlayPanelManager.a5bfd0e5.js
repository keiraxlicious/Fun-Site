function e(e,t,i,a){Object.defineProperty(e,t,{get:i,set:a,enumerable:!0,configurable:!0})}var t=globalThis.parcelRequire94c2,i=t.register;i("62zTW",function(i,a){e(i.exports,"initializeOverlayPanel",()=>d);var n=t("dsbnh"),r=t("5HT6l"),o=t("UldYh"),l=t("6hAq6"),c=t("ecrz0");class s{constructor(e){if(this.container=null,this.updateCategory=null,this.effectSelector=null,this.updateRenderMode=null,this.config={...n.DEFAULT_PANEL_CONFIG,...e.config},this.state={...n.DEFAULT_PANEL_STATE,...e.initialState},this.container=document.getElementById(e.containerId),!this.container)throw Error(`Overlay panel container ${e.containerId} not found`)}initialize(){this.createPanelStructure();let e={onCategoryChange:this.handleCategoryChange.bind(this),onOverlaySelect:this.handleOverlaySelect.bind(this),onRenderModeChange:this.handleRenderModeChange.bind(this),onDisableEffects:this.handleDisableEffects.bind(this)};this.updateCategory=(0,r.initializeCategorySelector)({containerId:this.config.categoriesId,categories:n.DEFAULT_CATEGORIES,initialActiveCategory:this.state.activeCategory,handlers:{onCategoryChange:e.onCategoryChange}}),this.effectSelector=(0,o.initializeEffectSelector)({containerId:this.config.selectorId,allEffects:c.OVERLAY_OPTIONS,initialActiveEffect:this.state.activeOverlayId,handlers:{onOverlaySelect:e.onOverlaySelect,onDisableEffects:e.onDisableEffects}}),this.updateRenderMode=(0,l.initializeRenderModeSelector)({containerId:this.config.renderModeId,initialMode:this.state.activeRenderMode,handlers:{onRenderModeChange:e.onRenderModeChange}}),this.effectSelector.updateEffectList(this.state.activeCategory),this.checkUrlForInitialEffect()}createPanelStructure(){if(!this.container)throw Error("Container element not available");this.container.innerHTML=`
        <div class="panel-header">
          <h3 class="panel-title">Particle Effects</h3>
        </div>
        <div class="panel-section">
          <div class="category-selector" id="${this.config.categoriesId}"></div>
        </div>
        <div class="panel-section">
          <div class="effect-selector" id="${this.config.selectorId}"></div>
        </div>
        <div class="panel-section">
          <div class="render-mode-selector" id="${this.config.renderModeId}"></div>
        </div>
      `}checkUrlForInitialEffect(){let e=new URLSearchParams(window.location.search).get("overlay");if(e&&this.effectSelector){let t=(0,c.OVERLAY_OPTIONS).find(t=>t.id===e);t&&(this.state.activeOverlayId=t.id,this.state.activeCategory=t.category,this.updateCategory&&this.updateCategory(this.state.activeCategory),this.effectSelector.updateEffectList(this.state.activeCategory),this.effectSelector.setActiveEffect(this.state.activeOverlayId),(0,c.applyOverlayEffect)(t.id))}}handleCategoryChange(e){this.state.activeCategory=e,this.effectSelector&&this.effectSelector.updateEffectList(e)}handleOverlaySelect(e){this.state.activeOverlayId=e;let t=(0,c.OVERLAY_OPTIONS).find(t=>t.id===e);t&&(t.config.renderMode=this.state.activeRenderMode,(0,c.applyOverlayEffect)(e))}handleRenderModeChange(e){if(this.state.activeRenderMode=e,this.state.activeOverlayId){let t=(0,c.OVERLAY_OPTIONS).find(e=>e.id===this.state.activeOverlayId);t&&(t.config.renderMode=e,(0,c.applyOverlayEffect)(this.state.activeOverlayId))}}handleDisableEffects(){this.state.activeOverlayId=null,(0,c.disableOverlays)()}}function d(e){try{new s({containerId:e}).initialize(),console.log("Overlay panel initialized successfully")}catch(e){console.error("Failed to initialize overlay panel:",e)}}}),i("dsbnh",function(i,a){e(i.exports,"DEFAULT_CATEGORIES",()=>r),e(i.exports,"DEFAULT_PANEL_CONFIG",()=>o),e(i.exports,"DEFAULT_PANEL_STATE",()=>l);var n=t("1ahXt");let r=[{id:"all",name:"All Effects"},{id:n.ParticleCategory.FALLING,name:"Falling Effects"},{id:n.ParticleCategory.FLOATING,name:"Floating Effects"},{id:n.ParticleCategory.ROTATING,name:"Rotating Effects"},{id:n.ParticleCategory.INTERACTIVE,name:"Interactive Effects"}],o={containerId:"overlay-panel",categoriesId:"overlay-categories",selectorId:"overlay-selector",renderModeId:"render-mode-selector",maxCategoryItems:50},l={activeCategory:"all",activeOverlayId:null,activeRenderMode:"CANVAS"}}),i("5HT6l",function(t,i){e(t.exports,"initializeCategorySelector",()=>a);function a(e){if(!e.containerId)throw Error("Container ID must be provided");let t=document.getElementById(e.containerId);if(!t)throw Error(`Category selector container ${e.containerId} not found`);let i=Math.min(e.categories.length,50),a="";for(let t=0;t<i;t++){let i=e.categories[t];if(!i||!i.id||!i.name){console.warn(`Invalid category at index ${t}`,i);continue}a+=`
      <button class="category-tab" 
        data-category="${i.id}"
        aria-selected="${i.id===e.initialActiveCategory}"
        title="${i.name}">
        ${i.name}
      </button>
    `}if(0===a.length)return t.innerHTML='<div class="error-message">No categories available</div>',()=>{};t.innerHTML=a;let n=e.initialActiveCategory;function r(i){if(!e.categories.some(e=>e.id===i)){console.warn(`Category ${i} does not exist`);return}n=i;let a=t.querySelectorAll(".category-tab"),r=Math.min(a.length,100);for(let e=0;e<r;e++){let t=a[e],i=t.getAttribute("data-category")===n;t.setAttribute("aria-selected",i?"true":"false"),i?t.classList.add("active"):t.classList.remove("active")}e.handlers.onCategoryChange(i)}let o=t.querySelectorAll(".category-tab"),l=Math.min(o.length,100);for(let e=0;e<l;e++){let t=o[e];t.addEventListener("click",()=>{let e=t.getAttribute("data-category");e&&r(e)}),t.addEventListener("keydown",e=>{if("Enter"===e.key||" "===e.key){e.preventDefault();let i=t.getAttribute("data-category");i&&r(i)}})}return r(e.initialActiveCategory),r}}),i("UldYh",function(t,i){function a(e){if(!e.containerId)throw Error("Container ID must be provided");let t=document.getElementById(e.containerId);if(!t)throw Error(`Effect selector container ${e.containerId} not found`);let i=e.initialActiveEffect;function a(e){i=e;let a=t.querySelectorAll(".effect-option"),n=Math.min(a.length,100);for(let t=0;t<n;t++){let i=a[t];i.getAttribute("data-effect-id")===e?i.classList.add("active"):i.classList.remove("active")}}return{updateEffectList:function(n){t.innerHTML="";let r="all"===n?e.allEffects:e.allEffects.filter(e=>e.category===n),o=Math.min(r.length,100);for(let n=0;n<o;n++){let o=r[n],l=document.createElement("div");l.className="effect-option",l.setAttribute("data-effect-id",o.id),o.id===i&&l.classList.add("active");let c={snow:"icon-snow",rain:"icon-rain",leaf:"icon-leaf",sakura:"icon-sakura",money:"icon-money",star:"icon-star",heart:"icon-heart",bubble:"icon-bubble",firefly:"icon-firefly",cloud:"icon-cloud"}[o.particleType]||"icon-default";l.innerHTML=`
        <div class="effect-info">
          <span class="effect-icon ${c}"></span>
          <span class="effect-name">${o.name}</span>
        </div>
        <div class="effect-actions">
          <button class="apply-btn" title="Apply this effect">
            <span class="btn-icon">\u{2713}</span>
            <span class="btn-text">Apply</span>
          </button>
          ${o.path?`<button class="view-btn" title="View detailed settings">
              <span class="btn-icon">\u{2699}</span>
              <span class="btn-text">Settings</span>
            </button>`:""}
        </div>
      `;let s=l.querySelector(".apply-btn");s&&s.addEventListener("click",t=>{t.stopPropagation(),a(o.id),e.handlers.onOverlaySelect(o.id)});let d=l.querySelector(".view-btn");d&&o.path&&d.addEventListener("click",e=>{e.stopPropagation(),window.location.href=o.path}),t.appendChild(l)}let l=document.createElement("div");l.className="effect-option disable-effect",l.innerHTML=`
      <div class="effect-info">
        <span class="effect-icon icon-disable"></span>
        <span class="effect-name">Disable All Effects</span>
      </div>
      <div class="effect-actions">
        <button class="disable-btn" title="Disable all effects">
          <span class="btn-icon">\u{2715}</span>
          <span class="btn-text">Disable</span>
        </button>
      </div>
    `;let c=l.querySelector(".disable-btn");if(c&&c.addEventListener("click",t=>{t.stopPropagation(),a(null),e.handlers.onDisableEffects()}),t.appendChild(l),0===o){let e=document.createElement("div");e.className="no-effects-message",e.textContent="No effects available in this category",t.appendChild(e)}},setActiveEffect:a}}e(t.exports,"initializeEffectSelector",()=>a)}),i("6hAq6",function(t,i){e(t.exports,"initializeRenderModeSelector",()=>n);let a=[{id:"CANVAS",name:"Canvas",description:"High performance drawn graphics",icon:"\uD83C\uDFA8"},{id:"SVG",name:"SVG",description:"Scalable vector graphics",icon:"⚙️"},{id:"DOM",name:"Image",description:"Standard image elements",icon:"\uD83D\uDDBC️"}];function n(e){if(!e.containerId)throw Error("Container ID must be provided");let t=document.getElementById(e.containerId);if(!t)throw Error(`Render mode selector container ${e.containerId} not found`);let i=`
    <h4 class="render-mode-title">Rendering Technology</h4>
    <div class="render-mode-options">
  `;for(let t=0;t<a.length;t++){let n=a[t];i+=`
      <button class="render-mode-option ${n.id===e.initialMode?"active":""}" 
        data-mode="${n.id}" 
        aria-selected="${n.id===e.initialMode}"
        title="${n.description}">
        <span class="mode-icon">${n.icon}</span>
        <span class="mode-name">${n.name}</span>
        <span class="mode-description">${n.description}</span>
      </button>
    `}t.innerHTML=i+="</div>";let n=e.initialMode;function r(i){if(!a.some(e=>e.id===i)){console.warn(`Render mode ${i} does not exist`);return}n=i;let r=t.querySelectorAll(".render-mode-option"),o=Math.min(r.length,10);for(let e=0;e<o;e++){let t=r[e],i=t.getAttribute("data-mode")===n;t.setAttribute("aria-selected",i?"true":"false"),i?t.classList.add("active"):t.classList.remove("active")}e.handlers.onRenderModeChange(i)}let o=t.querySelectorAll(".render-mode-option"),l=Math.min(o.length,10);for(let e=0;e<l;e++){let t=o[e];t.addEventListener("click",()=>{let e=t.getAttribute("data-mode");e&&r(e)}),t.addEventListener("keydown",e=>{if("Enter"===e.key||" "===e.key){e.preventDefault();let i=t.getAttribute("data-mode");i&&r(i)}})}return r}});
//# sourceMappingURL=OverlayPanelManager.a5bfd0e5.js.map
