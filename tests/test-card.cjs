const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/../';
const html = (strings, ...values) => strings.reduce((out, part, i) => out + part + (values[i] ?? ''), '');
class LitElement { dispatchEvent(event) { this.lastEvent = event; } }
LitElement.prototype.html = html;
LitElement.prototype.css = html;
class View extends LitElement {}
const registry = new Map([['hui-masonry-view', View]]);
const context = vm.createContext({Date, Event, __testLit: {LitElement, html, css:html}, customElements: {
  get: name => registry.get(name), define: (name, value) => registry.set(name, value)
}});
vm.runInContext('const {LitElement, html, css} = __testLit;\n' + fs.readFileSync(root + 'src/Home-Assistant-Mail-And-Packages-Custom-Card.js', 'utf8').replace(/^import .*;\n/gm, '').replace(/^import .*;\n/gm, ''), context);
const Card = registry.get('mail-and-packages-card');
const card = new Card();
const config = {updated:'sensor.updated', walmart_packages:'sensor.walmart', home_depot_packages:'sensor.home_depot', amazon_packages:'sensor.amazon', image:false, camera:false};
card.setConfig(config);
card.hass = {states:{'sensor.updated':{state:'today'}, 'sensor.amazon':{state:'3'}}};
let checks = 0;
for (const state of ['0', 0, '2', 'unknown', 'unavailable', undefined]) {
  for (const entity of ['sensor.walmart', 'sensor.home_depot']) {
    if (state === undefined) delete card.hass.states[entity];
    else card.hass.states[entity] = {state};
  }
  const rendered = card.render();
  const expected = state === undefined ? 'unavailable' : state;
  assert.ok(rendered.includes(`Walmart: ${expected}`));
  assert.ok(rendered.includes(`Home Depot: ${expected}`));
  assert.ok(rendered.includes('Amazon: 3'));
  assert.ok(rendered.includes('https://www.walmart.com/orders'));
  assert.ok(rendered.includes('https://www.homedepot.com/myaccount/purchase-history'));
  assert.ok(rendered.includes(state > 0 ? 'mdi:package-variant"' : 'mdi:package-variant-closed"'));
  checks++;
}
card.setConfig({updated:'sensor.updated', amazon_packages:'sensor.amazon', image:false, camera:false});
assert.ok(!card.render().includes('Walmart:'));
assert.ok(!card.render().includes('Home Depot:'));
checks++;
vm.runInContext('{\n' + fs.readFileSync(root + 'src/Home-Assistant-Mail-And-Packages-Custom-Card-editor.js', 'utf8').replace(/^import .*;\n/gm, '').replace('export class', 'class') + '\n}', context);
const Editor = registry.get('mail-and-packages-card-editor');
const editor = new Editor();
editor.setConfig({...config}); editor.hass = card.hass;
for (const modern of [false, true]) {
  if (modern) registry.set('ha-entity-picker', class {}); else registry.delete('ha-entity-picker');
  const rendered = editor.render();
  assert.ok(rendered.includes('Walmart Package Sensor'));
  assert.ok(rendered.includes('Home Depot Package Sensor'));
  assert.ok(rendered.includes(modern ? 'ha-entity-picker' : 'paper-dropdown-menu'));
  checks++;
}
editor._valueChanged({target:{configValue:'walmart_packages', value:'sensor.new_walmart'}});
assert.equal(editor._config.walmart_packages,'sensor.new_walmart');
assert.equal(editor._config.home_depot_packages,config.home_depot_packages);
assert.equal(editor._config.amazon_packages,config.amazon_packages);
assert.equal(editor.lastEvent.type,'config-changed');
editor._valueChanged({target:{configValue:'home_depot_packages',value:''}});
assert.ok(!('home_depot_packages' in editor._config));
checks++;
const fields = ['deliveries_message', 'packages_delivered', 'packages_in_transit', 'fedex_packages', 'ups_packages', 'usps_packages', 'amazon_packages', 'usps_mail'];
for (const field of fields) {
  card.setConfig({updated:'sensor.updated', [field]:'sensor.absent', image:false, camera:false});
  assert.ok(card.render().includes('unavailable'), field);
  card.hass.states['sensor.absent'] = {state:'4'};
  assert.ok(!card.render().includes('unavailable'), field + ' recovery');
  delete card.hass.states['sensor.absent'];
  checks++;
}
card.setConfig({updated:'sensor.updated', ups_packages:'sensor.ups', fedex_packages:'sensor.fedex', image:false, camera:false});
card.hass.states['sensor.ups'] = {state:'0'};
card.hass.states['sensor.fedex'] = {state:'2'};
assert.ok(card.render().includes('https://www.ups.com/us/en/track/ups-my-choice'));
assert.ok(card.render().includes('https://www.fedex.com/en-us/tracking.html'));
checks++;
card.setConfig({updated:'sensor.updated', image:false, camera_entity:'camera.mail'});
for (const camera of [undefined, {state:'idle'}, {state:'idle', attributes:{}}, {state:'unavailable', attributes:{entity_picture:'/image'}}, {state:'unknown', attributes:{entity_picture:'/image'}}]) {
  card.hass.states['camera.mail'] = camera;
  const rendered = card.render();
  assert.ok(!rendered.includes('<img'));
  assert.ok(rendered.includes('Checked: today'));
  checks++;
}
for (const url of ['/api/camera_proxy/camera.mail?token=test', '/api/camera_proxy/camera.mail']) {
  card.hass.states['camera.mail'] = {state:'idle', attributes:{entity_picture:url}};
  assert.ok(card.render().includes(url + (url.includes('?') ? '&' : '?') + 'interval=30'));
  checks++;
}
card.setConfig({updated:'sensor.updated', camera:false, gif_sensor:'sensor.gif'});
for (const state of [undefined, 'unknown', 'unavailable', '']) {
  card.hass.states['sensor.gif'] = state === undefined ? undefined : {state};
  assert.ok(!card.render().includes('<img'));
  checks++;
}
card.hass.states['sensor.gif'] = {state:'/local/mail.gif'};
assert.ok(card.render().includes('src="/local/mail.gif"'));
checks++;
card.setConfig({updated:'sensor.updated', ups_packages:'sensor.ups', camera_entity:'camera.mail'});
const previous = card.hass;
assert.equal(card.shouldUpdate(new Map([['_config', undefined]])), true);
assert.equal(card.shouldUpdate(new Map([['hass', undefined]])), true);
assert.equal(card.shouldUpdate(new Map()), false);
card.hass = {...previous, states:{...previous.states, 'sensor.unrelated':{state:'99'}}};
assert.equal(card.shouldUpdate(new Map([['hass', previous]])), false);
checks += 4;
for (const entityId of ['sensor.updated', 'sensor.ups', 'camera.mail']) {
  for (const value of [undefined, {state:'idle', attributes:{entity_picture:'/new-picture'}}]) {
    card.hass = {...previous, states:{...previous.states, [entityId]:value}};
    assert.equal(card.shouldUpdate(new Map([['hass', previous]])), true, entityId);
    checks++;
  }
}
for (const key of ['language', 'selectedLanguage', 'themes']) {
  card.hass = {...previous, [key]:key === 'themes' ? {} : 'nb'};
  assert.equal(card.shouldUpdate(new Map([['hass', previous]])), true, key);
  checks++;
}
for (const key of [...fields, 'walmart_packages', 'home_depot_packages', 'gif_sensor']) {
  card.setConfig({updated:'sensor.updated', [key]:'sensor.watched'});
  const absent = {states:{'sensor.updated':{state:'today'}}};
  card.hass = {states:{...absent.states, 'sensor.watched':{state:'1'}}};
  assert.equal(card.shouldUpdate(new Map([['hass', absent]])), true, key + ' creation');
  checks++;
}
const uninitializedEditor = new Editor();
uninitializedEditor.hass = previous;
assert.equal(uninitializedEditor.render(), '');
checks++;
const inputConfig = {...config};
editor.setConfig(inputConfig);
editor.hass = previous;
assert.notEqual(editor._config, inputConfig);
const configBeforeRemoval = editor._config;
editor._valueChanged({target:{configValue:'home_depot_packages',value:''}});
assert.equal(inputConfig.home_depot_packages, config.home_depot_packages);
assert.equal(configBeforeRemoval.home_depot_packages, config.home_depot_packages);
assert.notEqual(editor._config, configBeforeRemoval);
assert.ok(!('home_depot_packages' in editor.lastEvent.detail.config));
checks++;
console.log(`${checks} rendering, editor, and update scenarios passed`);

