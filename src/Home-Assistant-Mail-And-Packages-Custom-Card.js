import { CARRIER_LOGOS } from './carrier-logos.js';
import { LitElement, html } from 'lit';
import './Home-Assistant-Mail-And-Packages-Custom-Card-editor.js';

const curDatetime = new Date();

const datetime = curDatetime.getMonth().toString() + curDatetime.getDate().toString() + curDatetime.getFullYear().toString() + curDatetime.getHours().toString() + curDatetime.getMinutes().toString();

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

class MailAndPackagesCard extends LitElement {
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
            return html ``;
        }

        this.numberElements = 0;

        const stateObj = this.hass.states[this._config.updated];

        if (!stateObj) {
            return html `
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

        return html `
      ${this.renderStyle()}
      <ha-card @click="${this._handleClick}">
        ${this._config.details !== false ? this.renderDetails(stateObj) : ""}
        ${this._config.image !== false ? this.renderImage(stateObj) : ""}
        ${this._config.camera !== false ? this.renderCamera(stateObj) : ""}
        <span class="usps_update">V 0.9.1 Checked: ${this.hass.formatEntityState ? this.hass.formatEntityState(stateObj) : stateObj.state}</span>
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
 
        this.numberElements++;

        return html `
      <div class="details">

    ${this._config.name
    ? html`
    <div class="title"> ${this._config.name} </div>
    `
    : ""}

    <br>
    <ul class="items space-evenly">
    ${packages_delivered
    ? html`
    <li><span class="mail-ha-icon"><ha-icon icon="mdi:package"></ha-icon>
        </span>Deliveries: ${packages_delivered}</li>
    `
    : ""}
    ${packages_in_transit
    ? html`
    <li><span class="mail-ha-icon"><ha-icon icon="mdi:truck-delivery"></ha-icon>
    </span>In Transit: ${packages_in_transit}</li>
    `
    : ""}
    </ul>
    ${deliveries_message
    ? html`
    <p>${deliveries_message}</p>
    `
    : ""}
    <ul class="items space-center">
    ${usps_mail
        ? html`
        <li class="item"><span class="mail-ha-icon">
        <span class="mail-badge"><ha-icon icon="mdi:${mail_icon}"></ha-icon></span>
        </span><a href="https://informeddelivery.usps.com/" title="Open the USPS Informed Delivery site" target="_blank"><span class="no-break">Mail: ${usps_mail}</span></a></li>
            `
            : ""}
    ${usps_packages
        ? html`
        <li class="item"><span class="mail-ha-icon">
                <img class="carrier-logo" src=${CARRIER_LOGOS.usps} alt="USPS logo" width="24" height="24">
            </span><a href="https://informeddelivery.usps.com/" title="Open the USPS Informed Delivery site" target="_blank"><span class="no-break">USPS: ${usps_packages}</span></a></li>
            `
            : ""}
    ${ups_packages
    ? html`
        <li class="item"><span class="mail-ha-icon">
                <img class="carrier-logo" src=${CARRIER_LOGOS.ups} alt="UPS logo" width="24" height="24">
            </span><a href="https://www.ups.com/us/en/track/ups-my-choice" title="Open the UPS MyChoice site" target="_blank"><span class="no-break">UPS: ${ups_packages}</span></a></li>
        `
        : ""}
        ${fedex_packages
        ? html`
        <li class="item"><span class="mail-ha-icon">
                <img class="carrier-logo" src=${CARRIER_LOGOS.fedex} alt="FedEx logo" width="24" height="24">
            </span><a href="https://www.fedex.com/en-us/tracking.html" title="Open the Fedex site" target="_blank"><span class="no-break">Fedex: ${fedex_packages}</span></a></li>
            `
            : ""}
    ${amazon_packages
    ? html`
        <li class="item"><span class="mail-ha-icon">
                <img class="carrier-logo" src=${CARRIER_LOGOS.amazon} alt="Amazon logo" width="24" height="24">
            </span><a href="https://www.amazon.com/gp/css/order-history/" title="Open the Amazon site" target="_blank"><span class="no-break">Amazon: ${amazon_packages}</span></a></li>
            `
            : ""}
    ${walmart_packages !== false
    ? html`
        <li class="item"><span class="mail-ha-icon">
                <img class="carrier-logo" src=${CARRIER_LOGOS.walmart} alt="Walmart logo" width="24" height="24">
            </span><a href="https://www.walmart.com/orders" title="Open the Walmart site" target="_blank"><span class="no-break">Walmart: ${walmart_packages}</span></a></li>
            `
            : ""}
    ${home_depot_packages !== false
    ? html`
        <li class="item"><span class="mail-ha-icon">
                <img class="carrier-logo" src=${CARRIER_LOGOS.home_depot} alt="Home Depot logo" width="24" height="24">
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
            return html ``;
        }
        
        const gif_sensor = this.hass.states[gif]?.state;
        if (!gif_sensor || gif_sensor === 'unknown' || gif_sensor === 'unavailable') {
            return html ``;
        }
        const lang = this.hass.selectedLanguage || this.hass.language;

        this.numberElements++;
        return html `
      <img class="MailImg clear" src="${gif_sensor}" />
    `;
    }

    renderCamera(camera) {
        const camera_entity = this._config.camera_entity;
        if (!camera || camera.length === 0 || !camera_entity || camera_entity.length === 0) {
            return html ``;
        }

        const cameraObjt = this.hass.states[camera_entity];
        const camera_url = cameraObjt?.attributes?.entity_picture;
        if (!camera_url || cameraObjt.state === 'unknown' || cameraObjt.state === 'unavailable') {
            return html ``;
        }
        const separator = camera_url.includes('?') ? '&' : '?';

        const lang = this.hass.selectedLanguage || this.hass.language;

        this.numberElements++;
        return html `
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
        return html `
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

                .mail-badge {
                    display: inline-flex;
                    width: 24px;
                    height: 24px;
                    align-items: center;
                    justify-content: center;
                    vertical-align: middle;
                    background: #29438d;
                    color: #fff;
                }

                .mail-badge ha-icon {
                    --mdc-icon-size: 18px;
                }

                .carrier-logo {
                    width: 24px;
                    height: 24px;
                    object-fit: contain;
                    vertical-align: middle;
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
