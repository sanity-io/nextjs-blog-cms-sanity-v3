(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global.useDevicePixelRatio = {}, global.react));
})(this, (function (exports, react) {
  /**
   * Get the device pixel ratio, potentially rounded and capped.
   * Will emit new values if it changes.
   *
   * @param options
   * @returns The current device pixel ratio, or the default if none can be resolved
   */

  function useDevicePixelRatio(options) {
    const dpr = getDevicePixelRatio(options);
    const [currentDpr, setCurrentDpr] = react.useState(dpr);
    const {
      defaultDpr,
      maxDpr,
      round
    } = options || {};
    react.useEffect(() => {
      const canListen = typeof window !== 'undefined' && 'matchMedia' in window;

      if (!canListen) {
        return;
      }

      const updateDpr = () => setCurrentDpr(getDevicePixelRatio({
        defaultDpr,
        maxDpr,
        round
      }));

      const mediaMatcher = window.matchMedia(`screen and (resolution: ${currentDpr}dppx)`); // Safari 13.1 does not have `addEventListener`, but does have `addListener`

      if (mediaMatcher.addEventListener) {
        mediaMatcher.addEventListener('change', updateDpr);
      } else {
        mediaMatcher.addListener(updateDpr);
      }

      return () => {
        if (mediaMatcher.removeEventListener) {
          mediaMatcher.removeEventListener('change', updateDpr);
        } else {
          mediaMatcher.removeListener(updateDpr);
        }
      };
    }, [currentDpr, defaultDpr, maxDpr, round]);
    return currentDpr;
  }
  /**
   * Returns the current device pixel ratio (DPR) given the passed options
   *
   * @param options
   * @returns current device pixel ratio
   */

  function getDevicePixelRatio(options) {
    const {
      defaultDpr = 1,
      maxDpr = 3,
      round = true
    } = options || {};
    const hasDprProp = typeof window !== 'undefined' && typeof window.devicePixelRatio === 'number';
    const dpr = hasDprProp ? window.devicePixelRatio : defaultDpr;
    const rounded = Math.min(Math.max(1, round ? Math.floor(dpr) : dpr), maxDpr);
    return rounded;
  }

  exports.getDevicePixelRatio = getDevicePixelRatio;
  exports.useDevicePixelRatio = useDevicePixelRatio;

}));
//# sourceMappingURL=index.umd.js.map
