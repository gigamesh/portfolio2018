import { useState, useEffect } from "react";

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

export function useAnimation(duration) {
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  const reset = () => setStartTime(Date.now());
  useEffect(() => {
    let queuedFrame;
    const frame = () => {
      const now = Date.now() - startTime;
      if (now < duration) queuedFrame = requestAnimationFrame(frame);
      setProgress(Math.min(1, now / duration));
    };
    frame();
    return () => cancelAnimationFrame(queuedFrame);
  }, [startTime, duration]);

  return [progress, reset];
}

export function useMousePosition(initPosition) {
  const [mousePos, setMousePos] = useState(initPosition);

  const setPosition = () => setMousePos(getMousePosition());

  useEffect(() => {
    document.addEventListener("mousemove", setPosition);
    return () => document.removeEventListener("mousemove", setPosition);
  }, []);

  return mousePos;
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
