import { useConstant } from '../../utils/use-constant.mjs';
import { globalProjectionState } from './state.mjs';

let id = 1;
function useProjectionId() {
    return useConstant(() => {
        if (globalProjectionState.hasEverUpdated) {
            return id++;
        }
    });
}

export { useProjectionId };
