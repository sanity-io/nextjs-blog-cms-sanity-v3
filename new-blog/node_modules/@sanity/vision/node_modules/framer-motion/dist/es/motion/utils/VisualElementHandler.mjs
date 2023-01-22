import React__default from 'react';

class VisualElementHandler extends React__default.Component {
    /**
     * Update visual element props as soon as we know this update is going to be commited.
     */
    getSnapshotBeforeUpdate() {
        const { visualElement, props } = this.props;
        if (visualElement)
            visualElement.setProps(props);
        return null;
    }
    componentDidUpdate() { }
    render() {
        return this.props.children;
    }
}

export { VisualElementHandler };
