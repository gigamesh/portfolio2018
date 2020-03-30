export function isWebGlSupported() {
  const canvas = document.createElement("canvas");
  let gl;
  try {
    gl = canvas.getContext("webgl");
  } catch (x) {
    console.log("returning false");
    return false;
  }

  if (gl == null) {
    try {
      canvas.getContext("experimental-webgl");
    } catch (x) {
      console.log("returning false");
      return false;
    }
  }

  return true;
}

export function getMousePosition(e) {
  e = e || window.event;

  let { pageX, pageY } = e.pageX;

  // IE 8
  if (pageX === undefined) {
    pageX =
      e.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    pageY =
      e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  return { x: pageX, y: pageY };
}
