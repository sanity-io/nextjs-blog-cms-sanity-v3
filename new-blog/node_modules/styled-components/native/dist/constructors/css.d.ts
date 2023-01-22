import { Interpolation, StyledObject, StyleFunction, Styles } from '../types';
export default function css<Props>(styles: Styles<Props>, ...interpolations: Interpolation<Props>[]): string | number | false | import("../types").Keyframes | import("../types").IStyledComponent<"web", any, any> | TemplateStringsArray | StyledObject<Props> | StyleFunction<Props> | (Interpolation<Props>[] & {
    isCss?: boolean | undefined;
}) | null | undefined;
