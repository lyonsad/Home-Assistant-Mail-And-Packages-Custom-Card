import assert from 'node:assert/strict';
import { Window } from 'happy-dom';

const window = new Window({ url: 'http://homeassistant.test/' });
for (const name of ['window', 'document', 'customElements', 'HTMLElement', 'Document', 'DocumentFragment', 'ShadowRoot', 'CSSStyleSheet', 'Event', 'CustomEvent', 'Node']) {
    Object.defineProperty(globalThis, name, { value: name === 'window' ? window : window[name], configurable: true });
}
// No Home Assistant rendering class is registered: the bundle must supply its own Lit.
window.customElements.define('ha-entity-picker', class extends window.HTMLElement {});
await import('../dist/Home-Assistant-Mail-And-Packages-Custom-Card.js');
const card = document.createElement('mail-and-packages-card');
const config = {
    updated: 'sensor.imap_gmail_com_mail_updated', image: false,
    usps_mail: 'sensor.mail', usps_packages: 'sensor.usps', ups_packages: 'sensor.ups',
    fedex_packages: 'sensor.fedex', amazon_packages: 'sensor.amazon',
    walmart_packages: 'sensor.walmart', home_depot_packages: 'sensor.home_depot',
    camera_entity: 'camera.mail',
};
const states = Object.fromEntries(Object.entries({
    'sensor.imap_gmail_com_mail_updated':'today', 'sensor.mail':'1', 'sensor.usps':'0',
    'sensor.ups':'0', 'sensor.fedex':'2', 'sensor.amazon':'0', 'sensor.walmart':'0', 'sensor.home_depot':'0'
}).map(([id, state]) => [id, {state}]));
states['camera.mail'] = {state:'idle', attributes:{entity_picture:'/api/camera_proxy/mail?token=test'}};
card.setConfig(config);
card.hass = {states};
document.body.append(card);
await card.updateComplete;
const labels = ['Mail: 1','USPS: 0','UPS: 0','Fedex: 2','Amazon: 0','Walmart: 0','Home Depot: 0'];
assert.deepEqual([...card.shadowRoot.querySelectorAll('a span')].map(e => e.textContent), labels);
assert.equal(card.shadowRoot.querySelectorAll('li.item ha-icon').length, 1);
assert.equal(card.shadowRoot.querySelector('.mail-badge ha-icon').getAttribute('icon'), 'mdi:mailbox-open-up');
assert.ok(card.shadowRoot.querySelector('style').textContent.includes('background: #29438d'));
card.hass = {...card.hass, states:{...card.hass.states, 'sensor.mail':{state:'0'}}};
await card.updateComplete;
assert.equal(card.shadowRoot.querySelector('.mail-badge ha-icon').getAttribute('icon'), 'mdi:mailbox-outline');
assert.ok(card.shadowRoot.textContent.includes('Mail: 0'));
card.hass = {states};
await card.updateComplete;
const logos = [...card.shadowRoot.querySelectorAll('img.carrier-logo')];
assert.deepEqual(logos.map(e => e.alt), ['USPS logo', 'UPS logo', 'FedEx logo', 'Amazon logo', 'Walmart logo', 'Home Depot logo']);
for (const logo of logos) {
    assert.match(logo.getAttribute('src'), /^data:image\/(png|svg\+xml);base64,/);
    assert.equal(logo.width, 24);
    assert.equal(logo.height, 24);
}
assert.equal(card.shadowRoot.querySelector('img.MailImg').getAttribute('src'), '/api/camera_proxy/mail?token=test&interval=30');
assert.equal(card.shadowRoot.querySelector('a[title="Open the UPS MyChoice site"]').getAttribute('href'), 'https://www.ups.com/us/en/track/ups-my-choice');
let renderCount = 0;
const render = card.render.bind(card);
card.render = () => { renderCount++; return render(); };
card.hass = {...card.hass, states:{...card.hass.states, 'sensor.unrelated':{state:'1'}}};
await card.updateComplete;
assert.equal(renderCount, 0);
card.hass = {...card.hass, states:{...card.hass.states, 'sensor.fedex':{state:'3'}}};
await card.updateComplete;
assert.equal(renderCount, 1);
assert.ok(card.shadowRoot.textContent.includes('Fedex: 3'));
card.hass = {...card.hass, states:{...card.hass.states, 'sensor.fedex':undefined, 'camera.mail':undefined}};
await card.updateComplete;
assert.ok(card.shadowRoot.textContent.includes('Fedex: unavailable'));
assert.equal(card.shadowRoot.querySelector('img.MailImg'), null);
card.hass = {...card.hass, states:{...card.hass.states, 'sensor.fedex':{state:'2'}, 'camera.mail':{state:'idle', attributes:{entity_picture:'/new-picture'}}}};
await card.updateComplete;
assert.equal(card.shadowRoot.querySelector('img.MailImg').getAttribute('src'), '/new-picture?interval=30');
let clicked;
card.addEventListener('hass-more-info', event => clicked = event.detail.entityId);
card.shadowRoot.querySelector('ha-card').click();
assert.equal(clicked, config.updated);
const editor = await card.constructor.getConfigElement();
editor.hass = card.hass;
document.body.append(editor);
await editor.updateComplete;
assert.equal(editor.shadowRoot.querySelector('.card-config'), null);
editor.setConfig(config);
await editor.updateComplete;
const picker = [...editor.shadowRoot.querySelectorAll('ha-entity-picker')].find(e => e.configValue === 'walmart_packages');
assert.ok(picker);
assert.equal(picker.value, 'sensor.walmart');
let changed;
editor.addEventListener('config-changed', event => changed = event.detail.config);
picker.value = 'sensor.new_walmart';
picker.dispatchEvent(new Event('change'));
await editor.updateComplete;
assert.equal(changed.walmart_packages, 'sensor.new_walmart');
assert.equal(config.walmart_packages, 'sensor.walmart');
assert.equal(editor.shadowRoot.querySelector('ha-switch').checked, true);
console.log('Bundled Lit DOM checks passed: carrier logos, layout, reactive updates, recovery, clicks, and editor');
await window.happyDOM.close();
