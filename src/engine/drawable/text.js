import { isEmpty, isUndefined } from 'lodash';

export default {
  drawFunction: ($elems, { sizes }) => {
    $elems
      .style('left', d => `${d.x}vw`)
      .style('top', d => `${d.y}vh`)
      .text(function (d) {
        return d._content;
      });

    if (!isEmpty(sizes)) {
      const { WIDTH, HEIGHT } = sizes;
      if (!isUndefined(WIDTH)) $elems.style('width', `${WIDTH}px`);
      if (!isUndefined(HEIGHT)) $elems.style('height', `${HEIGHT}px`);
    }
  },
  elemType: 'span',
  wrapperClass: 'text-container'
};
