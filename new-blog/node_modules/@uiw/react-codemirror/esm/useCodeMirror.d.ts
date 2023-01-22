import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { ReactCodeMirrorProps } from '.';
export interface UseCodeMirror extends ReactCodeMirrorProps {
    container?: HTMLDivElement | null;
}
export declare function useCodeMirror(props: UseCodeMirror): {
    state: EditorState | undefined;
    setState: import("react").Dispatch<import("react").SetStateAction<EditorState | undefined>>;
    view: EditorView | undefined;
    setView: import("react").Dispatch<import("react").SetStateAction<EditorView | undefined>>;
    container: HTMLDivElement | undefined;
    setContainer: import("react").Dispatch<import("react").SetStateAction<HTMLDivElement | undefined>>;
};
