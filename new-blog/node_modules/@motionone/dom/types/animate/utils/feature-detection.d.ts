declare const featureTests: {
    cssRegisterProperty: () => boolean;
    waapi: () => boolean;
    partialKeyframes: () => boolean;
    finished: () => boolean;
    linearEasing: () => boolean;
};
declare type FeatureTests = Record<keyof typeof featureTests, () => boolean>;
export declare const supports: FeatureTests;
export {};
//# sourceMappingURL=feature-detection.d.ts.map