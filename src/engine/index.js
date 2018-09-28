import modules from './modules';
import { isEmpty, isNull } from 'lodash';
import * as d3 from 'd3';

import ContainerTypes from '@engine/ContainerTypes';
import Layer from '@engine/Layer';

let _paperFlowLink = null;

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

    console.log(this.$root);

    this._data = data;
    console.log(data);

    for (let dataType of site.dataTypes) {
      this.createALayer(dataType);
    }

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

  createALayer (dataType) {
    if (isEmpty(this._layers[dataType.name])) {
      const data = !isEmpty(this._data[dataType.name])
        ? this._data[dataType.name]
        : [];

      this._layers[dataType.name] = new Layer({
        dataType,
        data,
        $parent: this.$root
      });
    }
  }
}
