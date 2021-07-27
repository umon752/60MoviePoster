import emitter from '@/methods/mitt';

export default function (state, text = '') {
  if (state) {
    emitter.emit('push-message', {
      text: `${text} success!`,
      icon: true,
    });
  } else {
    emitter.emit('push-message', {
      text: `${text} failed!`,
      icon: false,
    });
  }
}
