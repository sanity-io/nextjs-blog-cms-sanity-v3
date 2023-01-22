const makeRenderlessComponent = (hook) => (props) => {
    hook(props);
    return null;
};

export { makeRenderlessComponent };
