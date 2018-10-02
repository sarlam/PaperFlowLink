import modules from './modules';
import { isEmpty, isUndefined, isNull } from 'lodash';
import * as d3 from 'd3';

import ContainerTypes from '@engine/ContainerTypes';
import Layer from '@engine/Layer';

let _paperFlowLink = null;

const defaultModules = [{ name: 'history', config: {} }];

export default class PaperFlowLink {
  constructor (config, data) {
    if (!isNull(_paperFlowLink)) return _paperFlowLink;

    this._d3 = d3;
    this._layers = {};

    const { site, modules, paperArea } = config;

    this._site = site;
    document.title = this._site.title || 'Paper Flow Link';

    const rootId = this._site.id || 'paper-wrapper';
    this.$root = this._d3.select(`#${rootId}`);
    this.$root.classed(ContainerTypes.MAIN_CONTAINER, true);

    this._data = data;

    for (let dataType of site.dataTypes) {
      this.createALayer(dataType);
    }

    this._paperArea = paperArea;

    // module system
    this._loadedModules = {};
    this._modules = defaultModules.concat(modules);
    this.loadModules();

    _paperFlowLink = this;
  }

  init () {
    this.renderLayers();
    console.log(this._loadedModules);
    Object.keys(this._loadedModules).map(key => {
      const module = this._loadedModules[key];
      if (!isUndefined(module.afterInit)) module.afterInit();
    });
  }

  renderLayers () {
    Object.keys(this._layers).map(key => {
      this._layers[key].drawLayer();
    });
  }

  loadModules () {
    console.log(this._modules, modules['history']);

    class Test{

    }

    const test = new Test()

    console.log(isUndefined(test.afterInit))
    for (let module of this._modules) {
      console.log(module, module.name, modules[module.name], !isEmpty(modules[module.name]));
      if (!isUndefined(modules[module.name])) {
        this._loadedModules[module.name] = new modules[module.name](this, module.config);
      }
    }
  }

  createALayer (dataType) {
    if (isEmpty(dataType)) return;

    const { name: layerName } = dataType;

    if (isEmpty(this._layers[layerName]) && !isEmpty(this._data[layerName])) {
      this._layers[layerName] = new Layer({
        dataType,
        data: this._data[layerName],
        $parent: this.$root
      });
    }
  }
}
