declare namespace _default {
    export const name: string;
    export const group: string;
    export { helpText };
    export const signature: string;
    export const description: string;
    export function action(args: any, context: any): Promise<void>;
}
export default _default;
declare const helpText: "\nOptions\n  --force Do not prompt for delete confirmation - forcefully delete\n\nExamples\n  sanity dataset delete\n  sanity dataset delete my-dataset\n  sanity dataset delete my-dataset --force\n";
//# sourceMappingURL=deleteDatasetCommand.d.ts.map