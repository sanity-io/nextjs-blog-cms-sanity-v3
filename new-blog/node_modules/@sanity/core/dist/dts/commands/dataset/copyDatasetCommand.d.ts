declare namespace _default {
    export const name: string;
    export const group: string;
    export const signature: string;
    export { helpText };
    export const description: string;
    export function action(args: any, context: any): Promise<void>;
}
export default _default;
declare const helpText: "\nOptions\n  --detach Start the copy without waiting for it to finish\n  --attach <job-id> Attach to the running copy process to show progress\n  --skip-history Don't preserve document history on copy\n  --list Lists all dataset copy jobs corresponding to a certain criteria.\n  --offset Start position in the list of jobs. Default 0. With --list.\n  --limit Maximum number of jobs returned. Default 10. Maximum 1000. With --list.\n\nExamples\n  sanity dataset copy\n  sanity dataset copy <source-dataset>\n  sanity dataset copy <source-dataset> <target-dataset>\n  sanity dataset copy --skip-history <source-dataset> <target-dataset>\n  sanity dataset copy --detach <source-dataset> <target-dataset>\n  sanity dataset copy --attach <job-id>\n  sanity dataset copy --list\n  sanity dataset copy --list --offset=2\n  sanity dataset copy --list --offset=2 --limit=10\n";
//# sourceMappingURL=copyDatasetCommand.d.ts.map