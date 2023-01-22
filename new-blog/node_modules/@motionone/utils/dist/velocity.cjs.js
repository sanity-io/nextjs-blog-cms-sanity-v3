'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*
  Convert velocity into velocity per second

  @param [number]: Unit per frame
  @param [number]: Frame duration in ms
*/
function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1000 / frameDuration) : 0;
}

exports.velocityPerSecond = velocityPerSecond;
