declare namespace _default {
    export const name: string;
    export const signature: string;
    export const description: string;
    export { helpText };
    export const action: any;
}
export default _default;
declare const helpText: "\nOptions\n  --with-user-token Preload access token from CLI config into 'part:@sanity/base/client' part\n  --mock-browser-env Mocks a browser-like environment using jsdom\n\nExamples\n  # Run the script at some/script.js in Sanity context\n  sanity exec some/script.js\n\n  # Run the script at migrations/fullname.js and configure `part:@sanity/base/client`\n  # to include the current user's token\n  sanity exec migrations/fullname.js --with-user-token\n  \n  # Run the script at scripts/browserScript.js in a mock browser environment\n  sanity exec scripts/browserScript.js --mock-browser-env\n\n  # Pass arbitrary arguments to scripts by separating them with a `--`.\n  # Arguments are available in `process.argv` as they would in regular node scripts\n  # eg the following command would yield a `process.argv` of:\n  # ['/path/to/node', '/path/to/myscript.js', '--dry-run', 'positional-argument']\n  sanity exec --mock-browser-env myscript.js -- --dry-run positional-argument\n";
//# sourceMappingURL=execCommand.d.ts.map