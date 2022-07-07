function debounce(fn) {
  let timeout = null;
  return function () {
    const content = this;
    console.log(this);
    if (timeout) {
      clearTimeout(timeout);
    }
    console.log(fn);
    timeout = setTimeout(() => {
      fn.apply(content, arguments);
    }, 500);
    console.log(timeout);
  };
}

export default debounce;
