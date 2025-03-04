import { h, render } from 'vue';
import { Utils } from '../utils';
import MessageToast from './MessageToast.vue';

/*
 * message toast 实例
 */
const toast = async (text: string) => {
  const div = document.createElement('div');
  const attr = document.createAttribute('id');
  attr.value = `toast-${Utils.randomDigits(6)}`;
  div.setAttributeNode(attr);

  document.body.appendChild(div);

  const vnode = h(MessageToast, { text });
  render(vnode, div);

  await Utils.sleep(2000);
  render(null, div);
  div.remove();
};

export default toast;
