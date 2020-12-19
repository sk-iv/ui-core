import addEventListener from 'dom-helpers/addEventListener';
import removeEventListener from 'dom-helpers/removeEventListener';

export default function (node, event, handler, capture) {
  addEventListener(node, event, handler, capture);
  return {
    remove() {
      removeEventListener(node, event, handler, capture);
    },
  };
}
