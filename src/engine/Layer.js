import { uniqueId, isEmpty } from 'lodash';

import ContainerTypes from '@engine/ContainerTypes';
import drawable from './drawable';

export default class Layer {
  constructor ({ data, dataType, $parent }) {
    if (isEmpty(drawable[dataType.type])) throw new Error(`[FATAL] no ${dataType.type} in drawables`);

    this._dataType = dataType;
    const uid = uniqueId(`${this._dataType.name}-`);
    this._drawable = drawable[this._dataType.type];

    this._id = `${ContainerTypes.CONTENT_CONTAINER}-${uid}`;
    this.$root = $parent.insert('div')
      .attr('id', this._id)
      .attr('class', this._drawable.wrapperClass)
      .classed(ContainerTypes.CONTENT_CONTAINER, true);

    this._data = data.map(d => {
      d._id = uniqueId(`content_${this._dataType.name}`);
      d._content = d[this._dataType.contentKey];
      return d;
    });
  }

  drawLayer () {
    const $elems = this.$root.selectAll(this._drawable.elemType)
      .data(this._data);

    const entering = $elems.enter().append(this._drawable.elemType);

    $elems.exit().remove();
    console.log('drawing layer', this._dataType, this._data)

    this._drawable.drawFunction(entering, this._dataType);
  }
}
