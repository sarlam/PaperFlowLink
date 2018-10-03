import { isEmpty, isUndefined } from 'lodash';

export default {
  drawFunction: ($elems, { sizes, isHTML }) => {
    $elems
      .style('left', d => `${d.x}vw`)
      .style('top', d => `${d.y}vh`);
    if (isHTML) {
      // @todo sanitize
      $elems.html(d => d._content);
    } else {
      $elems.text((d) => d._content);
    }

    if (!isEmpty(sizes)) {
      const { WIDTH, HEIGHT } = sizes;
      if (!isUndefined(WIDTH)) $elems.style('width', `${WIDTH}px`);
      if (!isUndefined(HEIGHT)) $elems.style('height', `${HEIGHT}px`);
    }
  },
  elemType: 'span',
  wrapperClass: 'text-container'
};
