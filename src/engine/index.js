import modules from './modules';
import { isEmpty, isNull } from 'lodash';
import * as d3 from 'd3';

let _paperFlowLink = null;

export default class PaperFlowLink {
  constructor (config, data) {
    if (!isNull(_paperFlowLink)) return _paperFlowLink;
    this._d3 = d3;

    const { site, modules, paperArea } = config;
    this._site = site;
    document.title = this._site.title || 'Paper Flow Link';
    const rootId = this._site.id || 'paper-wrapper';
    this.$root = this._d3.select(`#${rootId}`);
    this.$root.classed('main-container', true);

    console.log(this.$root);

    this._data = data;
    this._paperArea = paperArea;

    // module system
    this._loadedModules = {};
    this._modules = modules;
    this.loadModules();

    _paperFlowLink = this;
  }

  loadModules () {
    for (let module of this._modules) {
      if (!isEmpty(modules[module.name])) {
        this._loadedModules[module.name] = new modules[module.name](this, module.config);
      }
    }
  }
}
