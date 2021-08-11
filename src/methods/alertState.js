import emitter from '@/methods/mitt';

export default function (state, text = '') {
  if (state === true) {
    emitter.emit('push-message', {
      text: `${text} success!`,
      icon: true,
    });
  } else if (state === 'error') {
    emitter.emit('push-message', {
      text: 'Error! Please refresh the page.',
      icon: false,
    });
  } else {
    emitter.emit('push-message', {
      text: `${text} failed!`,
      icon: false,
    });
  }
}
