import * as React from "react";
declare type InheritOption = boolean | "id";
export interface Props {
    id?: string;
    inherit?: InheritOption;
    /**
     * @deprecated
     */
    inheritId?: boolean;
}
export declare const LayoutGroup: React.FunctionComponent<React.PropsWithChildren<Props>>;
export {};
