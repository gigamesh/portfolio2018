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
