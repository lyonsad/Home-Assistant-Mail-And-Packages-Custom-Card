/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$3=new WeakMap;let n$2 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$3.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new n$2("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$2(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$1.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$2,getPrototypeOf:n$1}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$2(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i$1=t=>t,s$1=t.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$1=`lit$${Math.random().toFixed(9).slice(2)}$`,n="?"+o$1,r=`<${n}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$1+x):s+o$1+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$1),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$1)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$1),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$1,t+1));)d.push({type:7,index:l}),t+=o$1.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t.litHtmlPolyfillSupport;B?.(S,k),(t.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o=s.litElementPolyfillSupport;o?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

const fireEvent$1 = (node, type, detail, options) => {
    options = options || {};
    detail = detail === null || detail === undefined ? {} : detail;
    const event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed,
    });
    event.detail = detail;
    node.dispatchEvent(event);
    return event;
};

if (
    !customElements.get("ha-switch") &&
    customElements.get("paper-toggle-button")
) {
    customElements.define("ha-switch", customElements.get("paper-toggle-button"));
}

class MailAndPackagesCardEditor extends i {
    setConfig(config) {
        this._config = { ...config };
    }

    static get properties() {
        return {
            hass: {},
            _config: {}
        };
    }

    get _name() {
        return this._config.name || "";
    }

    get _updated() {
        return this._config.updated || "";
    }

    get _deliveries_message() {
        return this._config.deliveries_message || "";
    }

    get _packages_delivered() {
        return this._config.packages_delivered || "";
    }

    get _packages_in_transit() {
        return this._config.packages_in_transit || "";
    }

    get _fedex_packages() {
        return this._config.fedex_packages || "";
    }

    get _ups_packages() {
        return this._config.ups_packages || "";
    }

    get _usps_packages() {
        return this._config.usps_packages || "";
    }

    get _amazon_packages() {
        return this._config.amazon_packages || "";
    }

    get _walmart_packages() {
        return this._config.walmart_packages || "";
    }

    get _home_depot_packages() {
        return this._config.home_depot_packages || "";
    }

    get _usps_mail() {
        return this._config.usps_mail || "";
    }

    get _gif_sensor() {
        return this._config.gif_sensor || "";
    }

    get _camera_entity() {
        return this._config.camera_entity || "";
    }

    get _image() {
        return this._config.image !== false;
    }

    get _camera() {
        return this._config.camera !== false;
    }

    get _details() {
        return this._config.details !== false;
    }

    render() {
        if (!this.hass || !this._config) {
            return b ``;
        }

        const entities = Object.keys(this.hass.states).filter(
            (eid) => eid.substr(0, eid.indexOf(".")) === "sensor"
        );

        const camera_entities = Object.keys(this.hass.states).filter(
            (eid) => eid.substr(0, eid.indexOf(".")) === "camera"
        );

        return b `
      <div class="card-config">
    Version: 0.8.0
        <div>
          <paper-input
            label="Name"
            .value="${this._name}"
            .configValue="${"name"}"
            @value-changed="${this._valueChanged}"
          ></paper-input>
            <ha-switch
            .checked=${this._details}
            .configValue="${"details"}"
            @change="${this._valueChanged}"
            >Show Details</ha-switch>
          ${customElements.get("ha-entity-picker")
            ? b`
                <ha-entity-picker
                label="Mail Updated Sensor"
                  .hass="${this.hass}"
                  .value="${this._updated}"
                  .configValue=${"updated"}
                  domain-filter="sensor"
                  @change="${this._valueChanged}"
                  allow-custom-entity
                ></ha-entity-picker>
              `
            : b`
                <paper-dropdown-menu
                  label="Mail Updated Sensor"
                  @value-changed="${this._valueChanged}"
                  .configValue="${"updated"}"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    .selected="${entities.indexOf(this._updated)}"
                  >
                    ${entities.map((updated) => {
                      return b`
                        <paper-item>${updated}</paper-item>
                      `;
                    })}
                  </paper-listbox>
                </paper-dropdown-menu>
              `}
          ${customElements.get("ha-entity-picker")
            ? b`
                <ha-entity-picker
                label="Delivery Message Sensor"
                  .hass="${this.hass}"
                  .value="${this._deliveries_message}"
                  .configValue=${"deliveries_message"}
                  domain-filter="sensor"
                  @change="${this._valueChanged}"
                  allow-custom-entity
                ></ha-entity-picker>
              `
            : b`
                <paper-dropdown-menu
                  label="Delivery Message Sensor"
                  @value-changed="${this._valueChanged}"
                  .configValue="${"deliveries_message"}"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    .selected="${entities.indexOf(this._deliveries_message)}"
                  >
                    ${entities.map((deliveries_message) => {
                      return b`
                        <paper-item>${deliveries_message}</paper-item>
                      `;
                    })}
                  </paper-listbox>
                </paper-dropdown-menu>
              `}
         ${customElements.get("ha-entity-picker")
            ? b`
                <ha-entity-picker
                label="Packages Delivered Sensor"
                  .hass="${this.hass}"
                  .value="${this._packages_delivered}"
                  .configValue=${"packages_delivered"}
                  domain-filter="sensor"
                  @change="${this._valueChanged}"
                  allow-custom-entity
                ></ha-entity-picker>
              `
            : b`
                <paper-dropdown-menu
                  label="Packages Delivered Sensor"
                  @value-changed="${this._valueChanged}"
                  .configValue="${"packages_delivered"}"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    .selected="${entities.indexOf(this._packages_delivered)}"
                  >
                    ${entities.map((packages_delivered) => {
                      return b`
                        <paper-item>${packages_delivered}</paper-item>
                      `;
                    })}
                  </paper-listbox>
                </paper-dropdown-menu>
              `}
          ${customElements.get("ha-entity-picker")
            ? b`
                <ha-entity-picker
                label="Packages In Transit Sensor"
                  .hass="${this.hass}"
                  .value="${this._packages_in_transit}"
                  .configValue=${"packages_in_transit"}
                  domain-filter="sensor"
                  @change="${this._valueChanged}"
                  allow-custom-entity
                ></ha-entity-picker>
              `
            : b`
                <paper-dropdown-menu
                  label="Packages In Transit Sensor"
                  @value-changed="${this._valueChanged}"
                  .configValue="${"packages_in_transit"}"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    .selected="${entities.indexOf(this._packages_in_transit)}"
                  >
                    ${entities.map((packages_in_transit) => {
                      return b`
                        <paper-item>${packages_in_transit}</paper-item>
                      `;
                    })}
                  </paper-listbox>
                </paper-dropdown-menu>
              `}
              ${customElements.get("ha-entity-picker")
            ? b`
                <ha-entity-picker
                label="FedEx Package Sensor"
                  .hass="${this.hass}"
                  .value="${this._fedex_packages}"
                  .configValue=${"fedex_packages"}
                  domain-filter="sensor"
                  @change="${this._valueChanged}"
                  allow-custom-entity
                ></ha-entity-picker>
              `
            : b`
                <paper-dropdown-menu
                  label="FedEx Package Sensor"
                  @value-changed="${this._valueChanged}"
                  .configValue="${"fedex_packages"}"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    .selected="${entities.indexOf(this._fedex_packages)}"
                  >
                    ${entities.map((fedex_packages) => {
                      return b`
                        <paper-item>${fedex_packages}</paper-item>
                      `;
                    })}
                  </paper-listbox>
                </paper-dropdown-menu>
              `}
              ${customElements.get("ha-entity-picker")
            ? b`
                <ha-entity-picker
                label="UPS Package Sensor"
                  .hass="${this.hass}"
                  .value="${this._ups_packages}"
                  .configValue=${"ups_packages"}
                  domain-filter="sensor"
                  @change="${this._valueChanged}"
                  allow-custom-entity
                ></ha-entity-picker>
              `
            : b`
                <paper-dropdown-menu
                  label="UPS Package Sensor"
                  @value-changed="${this._valueChanged}"
                  .configValue="${"ups_packages"}"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    .selected="${entities.indexOf(this._ups_packages)}"
                  >
                    ${entities.map((ups_packages) => {
                      return b`
                        <paper-item>${ups_packages}</paper-item>
                      `;
                    })}
                  </paper-listbox>
                </paper-dropdown-menu>
              `}
              ${customElements.get("ha-entity-picker")
            ? b`
                <ha-entity-picker
                label="USPS Package Sensor"
                  .hass="${this.hass}"
                  .value="${this._usps_packages}"
                  .configValue=${"usps_packages"}
                  domain-filter="sensor"
                  @change="${this._valueChanged}"
                  allow-custom-entity
                ></ha-entity-picker>
              `
            : b`
                <paper-dropdown-menu
                  label="USPS Package Sensor"
                  @value-changed="${this._valueChanged}"
                  .configValue="${"usps_packages"}"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    .selected="${entities.indexOf(this._usps_packages)}"
                  >
                    ${entities.map((usps_packages) => {
                      return b`
                        <paper-item>${usps_packages}</paper-item>
                      `;
                    })}
                  </paper-listbox>
                </paper-dropdown-menu>
              `}
              ${customElements.get("ha-entity-picker")
            ? b`
                <ha-entity-picker
                label="Amazon Package Sensor"
                .hass="${this.hass}"
                .value="${this._amazon_packages}"
                .configValue=${"amazon_packages"}
                domain-filter="sensor"
                @change="${this._valueChanged}"
                allow-custom-entity
              ></ha-entity-picker>
            `
          : b`
              <paper-dropdown-menu
                label="Amazon Package Sensor"
                @value-changed="${this._valueChanged}"
                .configValue="${"amazon_packages"}"
              >
                <paper-listbox
                  slot="dropdown-content"
                  .selected="${entities.indexOf(this._amazon_packages)}"
                >
                  ${entities.map((amazon_packages) => {
                    return b`
                      <paper-item>${amazon_packages}</paper-item>
                    `;
                  })}
                </paper-listbox>
              </paper-dropdown-menu>
            `}
              ${customElements.get("ha-entity-picker")
            ? b`
                <ha-entity-picker
                label="Walmart Package Sensor"
                .hass="${this.hass}"
                .value="${this._walmart_packages}"
                .configValue=${"walmart_packages"}
                domain-filter="sensor"
                @change="${this._valueChanged}"
                allow-custom-entity
              ></ha-entity-picker>
            `
          : b`
              <paper-dropdown-menu
                label="Walmart Package Sensor"
                @value-changed="${this._valueChanged}"
                .configValue="${"walmart_packages"}"
              >
                <paper-listbox
                  slot="dropdown-content"
                  .selected="${entities.indexOf(this._walmart_packages)}"
                >
                  ${entities.map((walmart_packages) => {
                    return b`
                      <paper-item>${walmart_packages}</paper-item>
                    `;
                  })}
                </paper-listbox>
              </paper-dropdown-menu>
            `}
              ${customElements.get("ha-entity-picker")
            ? b`
                <ha-entity-picker
                label="Home Depot Package Sensor"
                .hass="${this.hass}"
                .value="${this._home_depot_packages}"
                .configValue=${"home_depot_packages"}
                domain-filter="sensor"
                @change="${this._valueChanged}"
                allow-custom-entity
              ></ha-entity-picker>
            `
          : b`
              <paper-dropdown-menu
                label="Home Depot Package Sensor"
                @value-changed="${this._valueChanged}"
                .configValue="${"home_depot_packages"}"
              >
                <paper-listbox
                  slot="dropdown-content"
                  .selected="${entities.indexOf(this._home_depot_packages)}"
                >
                  ${entities.map((home_depot_packages) => {
                    return b`
                      <paper-item>${home_depot_packages}</paper-item>
                    `;
                  })}
                </paper-listbox>
              </paper-dropdown-menu>
            `}
            ${customElements.get("ha-entity-picker")
          ? b`
              <ha-entity-picker
                label="USPS Mail Sensor"
                  .hass="${this.hass}"
                  .value="${this._usps_mail}"
                  .configValue=${"usps_mail"}
                  domain-filter="sensor"
                  @change="${this._valueChanged}"
                  allow-custom-entity
                ></ha-entity-picker>
              `
            : b`
                <paper-dropdown-menu
                  label="USPS Mail Sensor"
                  @value-changed="${this._valueChanged}"
                  .configValue="${"usps_mail"}"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    .selected="${entities.indexOf(this._usps_mail)}"
                  >
                    ${entities.map((usps_mail) => {
                      return b`
                        <paper-item>${usps_mail}</paper-item>
                      `;
                    })}
                  </paper-listbox>
                </paper-dropdown-menu>
              `}
          <ha-switch
            .checked=${this._image}
            .configValue="${"image"}"
            @change="${this._valueChanged}"
            >Show Image</ha-switch
          >
            ${customElements.get("ha-entity-picker")
          ? b`
              <ha-entity-picker
                label="GIF Sensor"
                  .hass="${this.hass}"
                  .value="${this._gif_sensor}"
                  .configValue=${"gif_sensor"}
                  domain-filter="sensor"
                  @change="${this._valueChanged}"
                  allow-custom-entity
                ></ha-entity-picker>
              `
            : b`
                <paper-dropdown-menu
                  label="GIF Sensor"
                  @value-changed="${this._valueChanged}"
                  .configValue="${"gif_sensor"}"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    .selected="${entities.indexOf(this._gif_sensor)}"
                  >
                    ${entities.map((gif_sensor) => {
                      return b`
                        <paper-item>${gif_sensor}</paper-item>
                      `;
                    })}
                  </paper-listbox>
                </paper-dropdown-menu>
              `}

        <ha-switch
            .checked=${this._camera}
            .configValue="${"camera"}"
            @change="${this._valueChanged}"
            >Show Camera</ha-switch
          >

        ${customElements.get("ha-entity-picker")
            ? b`
                <ha-entity-picker
                label="Camera Entity"
                  .hass="${this.hass}"
                  .value="${this._camera_entity}"
                  .configValue=${"camera_entity"}
                  domain-filter="camera"
                  @change="${this._valueChanged}"
                  allow-custom-entity
                ></ha-entity-picker>
              `
            : b`
                <paper-dropdown-menu
                  label="Camera Entity"
                  @value-changed="${this._valueChanged}"
                  .configValue="${"camera_entity"}"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    .selected="${camera_entities.indexOf(this._camera_entity)}"
                  >
                    ${camera_entities.map((camera_entity) => {
                      return b`
                        <paper-item>${camera_entity}</paper-item>
                      `;
                    })}
                  </paper-listbox>
                </paper-dropdown-menu>
              `}
        </div>
      </div>
    `;
    }

    _valueChanged(ev) {
        if (!this._config || !this.hass) {
            return;
        }
        const target = ev.target;
        if (this[`_${target.configValue}`] === target.value) {
            return;
        }
        if (target.configValue) {
            if (target.value === "") {
                const config = { ...this._config };
                delete config[target.configValue];
                this._config = config;
            } else {
                this._config = {
                    ...this._config,
          [target.configValue]: target.checked !== undefined ? target.checked : target.value,
                };
            }
        }
        fireEvent$1(this, "config-changed", {
            config: this._config
        });
    }

    static get styles() {
        return i$3 `
      ha-switch {
        padding-top: 16px;
      }
      .side-by-side {
        display: flex;
      }
      .side-by-side > * {
        flex: 1;
        padding-right: 4px;
      }
    `;
    }
}

customElements.define("mail-and-packages-card-editor", MailAndPackagesCardEditor);

const curDatetime = new Date();

curDatetime.getMonth().toString() + curDatetime.getDate().toString() + curDatetime.getFullYear().toString() + curDatetime.getHours().toString() + curDatetime.getMinutes().toString();

const fireEvent = (node, type, detail, options) => {
    options = options || {};
    detail = detail === null || detail === undefined ? {} : detail;
    const event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed
    });
    event.detail = detail;
    node.dispatchEvent(event);
    return event;
};

function hasConfigOrEntityChanged(element, changedProps) {
    if (changedProps.has("_config")) {
        return true;
    }
    if (!changedProps.has("hass")) {
        return false;
    }
    const previous = changedProps.get("hass");
    if (!previous || !element.hass || !element._config) {
        return true;
    }
    if (previous.language !== element.hass.language ||
        previous.selectedLanguage !== element.hass.selectedLanguage ||
        previous.themes !== element.hass.themes) {
        return true;
    }
    const entityKeys = [
        "updated", "deliveries_message", "packages_delivered", "packages_in_transit",
        "fedex_packages", "ups_packages", "usps_packages", "amazon_packages",
        "walmart_packages", "home_depot_packages", "usps_mail", "gif_sensor", "camera_entity"
    ];
    return entityKeys.some((key) => {
        const entityId = element._config[key];
        return entityId && previous.states[entityId] !== element.hass.states[entityId];
    });
}

class MailAndPackagesCard extends i {
    static get properties() {
        return {
            _config: {},
            hass: {}
        };
    }

    static async getConfigElement() {
        return document.createElement("mail-and-packages-card-editor");
    }

    static getStubConfig() {
        return {};
    }

    setConfig(config) {
        if (!config.updated) {
            throw new Error("The sensor sensor.mail_updated is not found or not defined in lovelace.");
        }
        this._config = config;
    }

    shouldUpdate(changedProps) {
        return hasConfigOrEntityChanged(this, changedProps);
    }

    render() {
        if (!this._config || !this.hass) {
            return b ``;
        }

        this.numberElements = 0;

        const stateObj = this.hass.states[this._config.updated];

        if (!stateObj) {
            return b `
        <style>
          .not-found {
            flex: 1;
            background-color: yellow;
            padding: 8px;
          }
        </style>
        <ha-card>
          <div class="not-found">
            Entity not available: ${this._config.updated}
          </div>
        </ha-card>
      `;
        }

        return b `
      ${this.renderStyle()}
      <ha-card @click="${this._handleClick}">
        ${this._config.details !== false ? this.renderDetails(stateObj) : ""}
        ${this._config.image !== false ? this.renderImage(stateObj) : ""}
        ${this._config.camera !== false ? this.renderCamera(stateObj) : ""}
        <span class="usps_update">V 0.8.0 Checked: ${stateObj.state}</span>
      </ha-card>
    `;
    }

    renderDetails(stateObj) {
        const deliveries_message = this._config.deliveries_message ? this.hass.states[this._config.deliveries_message]?.state ?? 'unavailable' : false;
        const packages_delivered = this._config.packages_delivered ? this.hass.states[this._config.packages_delivered]?.state ?? 'unavailable' : false;
        const packages_in_transit = this._config.packages_in_transit ? this.hass.states[this._config.packages_in_transit]?.state ?? 'unavailable' : false;
        const fedex_packages = this._config.fedex_packages ? this.hass.states[this._config.fedex_packages]?.state ?? 'unavailable' : false;
        const ups_packages = this._config.ups_packages ? this.hass.states[this._config.ups_packages]?.state ?? 'unavailable' : false;
        const usps_packages = this._config.usps_packages ? this.hass.states[this._config.usps_packages]?.state ?? 'unavailable' : false;
        const amazon_packages = this._config.amazon_packages ? this.hass.states[this._config.amazon_packages]?.state ?? 'unavailable' : false;
        const walmart_packages = this._config.walmart_packages ? this.hass.states[this._config.walmart_packages]?.state ?? 'unavailable' : false;
        const home_depot_packages = this._config.home_depot_packages ? this.hass.states[this._config.home_depot_packages]?.state ?? 'unavailable' : false;
        const usps_mail = this._config.usps_mail ? this.hass.states[this._config.usps_mail]?.state ?? 'unavailable' : false;
        
        const mail_icon = usps_mail > 0 ? 'mailbox-open-up' : 'mailbox-outline';
        const usps_icon = usps_packages > 0 ? 'package-variant' : 'package-variant-closed';
        const ups_icon = ups_packages > 0 ? 'package-variant' : 'package-variant-closed';
        const fedex_icon = fedex_packages > 0 ? 'package-variant' : 'package-variant-closed';
        const amazon_icon = amazon_packages > 0 ? 'package-variant' : 'package-variant-closed';
        const walmart_icon = walmart_packages > 0 ? 'package-variant' : 'package-variant-closed';
        const home_depot_icon = home_depot_packages > 0 ? 'package-variant' : 'package-variant-closed';
 
        this.numberElements++;

        return b `
      <div class="details">

    ${this._config.name
    ? b`
    <div class="title"> ${this._config.name} </div>
    `
    : ""}

    <br>
    <ul class="items space-evenly">
    ${packages_delivered
    ? b`
    <li><span class="mail-ha-icon"><ha-icon icon="mdi:package"></ha-icon>
        </span>Deliveries: ${packages_delivered}</li>
    `
    : ""}
    ${packages_in_transit
    ? b`
    <li><span class="mail-ha-icon"><ha-icon icon="mdi:truck-delivery"></ha-icon>
    </span>In Transit: ${packages_in_transit}</li>
    `
    : ""}
    </ul>
    ${deliveries_message
    ? b`
    <p>${deliveries_message}</p>
    `
    : ""}
    <ul class="items space-center">
    ${usps_mail
        ? b`
        <li class="item"><span class="mail-ha-icon">
        <ha-icon icon="mdi:${mail_icon}"></ha-icon>
        </span><a href="https://informeddelivery.usps.com/" title="Open the USPS Informed Delivery site" target="_blank"><span class="no-break">Mail: ${usps_mail}</span></a></li>
            `
            : ""}
    ${usps_packages
        ? b`
        <li class="item"><span class="mail-ha-icon">
                <ha-icon icon="mdi:${usps_icon}"></ha-icon>
            </span><a href="https://informeddelivery.usps.com/" title="Open the USPS Informed Delivery site" target="_blank"><span class="no-break">USPS: ${usps_packages}</span></a></li>
            `
            : ""}
    ${ups_packages
    ? b`
        <li class="item"><span class="mail-ha-icon">
                <ha-icon icon="mdi:${ups_icon}"></ha-icon>
            </span><a href="https://www.ups.com/us/en/track/ups-my-choice" title="Open the UPS MyChoice site" target="_blank"><span class="no-break">UPS: ${ups_packages}</span></a></li>
        `
        : ""}
        ${fedex_packages
        ? b`
        <li class="item"><span class="mail-ha-icon">
                <ha-icon icon="mdi:${fedex_icon}"></ha-icon>
            </span><a href="https://www.fedex.com/en-us/tracking.html" title="Open the Fedex site" target="_blank"><span class="no-break">Fedex: ${fedex_packages}</span></a></li>
            `
            : ""}
    ${amazon_packages
    ? b`
        <li class="item"><span class="mail-ha-icon">
                <ha-icon icon="mdi:${amazon_icon}"></ha-icon>
            </span><a href="https://www.amazon.com/gp/css/order-history/" title="Open the Amazon site" target="_blank"><span class="no-break">Amazon: ${amazon_packages}</span></a></li>
            `
            : ""}
    ${walmart_packages !== false
    ? b`
        <li class="item"><span class="mail-ha-icon">
                <ha-icon icon="mdi:${walmart_icon}"></ha-icon>
            </span><a href="https://www.walmart.com/orders" title="Open the Walmart site" target="_blank"><span class="no-break">Walmart: ${walmart_packages}</span></a></li>
            `
            : ""}
    ${home_depot_packages !== false
    ? b`
        <li class="item"><span class="mail-ha-icon">
                <ha-icon icon="mdi:${home_depot_icon}"></ha-icon>
            </span><a href="https://www.homedepot.com/myaccount/purchase-history" title="Open the Home Depot site" target="_blank"><span class="no-break">Home Depot: ${home_depot_packages}</span></a></li>
            `
            : ""}
    </ul>
    </div>
    `;
    }

    renderImage(image) {
        const gif = this._config.gif_sensor;
        if (!image || image.length < 2 || !gif || gif.length < 2) {
            return b ``;
        }
        
        const gif_sensor = this.hass.states[gif]?.state;
        if (!gif_sensor || gif_sensor === 'unknown' || gif_sensor === 'unavailable') {
            return b ``;
        }
        this.hass.selectedLanguage || this.hass.language;

        this.numberElements++;
        return b `
      <img class="MailImg clear" src="${gif_sensor}" />
    `;
    }

    renderCamera(camera) {
        const camera_entity = this._config.camera_entity;
        if (!camera || camera.length === 0 || !camera_entity || camera_entity.length === 0) {
            return b ``;
        }

        const cameraObjt = this.hass.states[camera_entity];
        const camera_url = cameraObjt?.attributes?.entity_picture;
        if (!camera_url || cameraObjt.state === 'unknown' || cameraObjt.state === 'unavailable') {
            return b ``;
        }
        const separator = camera_url.includes('?') ? '&' : '?';

        this.hass.selectedLanguage || this.hass.language;

        this.numberElements++;
        return b `
        <img class="MailImg clear" src="${camera_url}${separator}interval=30" />
    `;
    }

    _handleClick() {
        fireEvent(this, "hass-more-info", {
            entityId: this._config.updated
        });
    }

    getCardSize() {
        return 3;
    }

    renderStyle() {
        return b `
            <style>
                ha-card {
                    cursor: pointer;
                    margin: auto;
                    padding: 1em;
                    position: relative;
                }

                a {
                    color: var(--secondary-text-color)
                }

                .spacer {
                    padding-top: 1em;
                }

                .clear {
                    clear: both;
                }

                .title {
                    position: relative;
                    font-weight: 300;
                    font-size: 2em;
                    color: var(--primary-text-color);
                }

                .details {
                    margin-bottom: .5em;
                }

                .items {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-wrap: wrap;
                }

                .item {
                    flex: 0 1 30%;
                    margin-bottom: .5rem;
                }
                .no-break {
                    white-space: nowrap;
                }
                .space-center {
                    justify-content: center;
                }
                .space-evenly {
                    justify-content: space-evenly;
                }

                .space-between {
                    justify-content: space-between;
                }

                .mail-clear {
                    clear: both;
                }

                .mail-and-packages {
                    margin: auto;
                    padding-top: 2em;
                    padding-bottom: 2em;
                    padding-left: 2em;
                    padding-right: 2em;
                    position: relative;
                }

                .mail-ha-icon {
                    height: 18px;
                    padding-right: 5px;
                    color: var(--paper-item-icon-color);
                }

                .MailImg {
                    position: relative;
                    width: 100%;
                    height: auto;
                    margin-top: 1em;
                }

                .usps_update {
                    font-size: .7em;
                }
        </style>
    `;
    }

}
customElements.define("mail-and-packages-card", MailAndPackagesCard);
