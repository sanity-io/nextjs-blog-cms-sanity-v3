import { createContext, useContext } from 'react';

const MotionContext = createContext({});
function useVisualElementContext() {
    return useContext(MotionContext).visualElement;
}

export { MotionContext, useVisualElementContext };
