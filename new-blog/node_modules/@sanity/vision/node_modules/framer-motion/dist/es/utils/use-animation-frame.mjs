import { sync, cancelSync } from '../frameloop/index.mjs';
import { useRef, useContext, useEffect } from 'react';
import { MotionConfigContext } from '../context/MotionConfigContext.mjs';

function useAnimationFrame(callback) {
    const initialTimestamp = useRef(0);
    const { isStatic } = useContext(MotionConfigContext);
    useEffect(() => {
        if (isStatic)
            return;
        const provideTimeSinceStart = ({ timestamp, delta }) => {
            if (!initialTimestamp.current)
                initialTimestamp.current = timestamp;
            callback(timestamp - initialTimestamp.current, delta);
        };
        sync.update(provideTimeSinceStart, true);
        return () => cancelSync.update(provideTimeSinceStart);
    }, [callback]);
}

export { useAnimationFrame };
