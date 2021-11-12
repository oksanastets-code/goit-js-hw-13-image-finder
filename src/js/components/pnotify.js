import { info, error, defaults } from '@pnotify/core';
// const myInfo = info({
//   text: "I'm an info message."
// });
function myError(message) {
    return error({
  text: message,
    delay: 2000,
    closer: false,
    title: '',
    icon: false,
    width: '300px',
    sticker: false,
});
} 
export { myError };