import React, { Component } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: React.ReactNode;
    containerId?: string;
}

export default class Portal extends Component<PortalProps> {
    private node: HTMLDivElement;
    private containerNode?: HTMLElement | null;

    constructor(props: PortalProps) {
        super(props);
        this.node = document.createElement('div');
        this.node.style.position = 'fixed';
        this.node.style.top = '0';
        this.node.style.left = '0';
        this.node.style.right = '0';
        this.node.style.bottom = '0';
        this.node.style.zIndex = '1000'; // Ensure it's above other content
        this.node.style.backgroundColor = 'rgba(0, 0, 0, 1)'; // Solid background
    }

    componentDidMount() {
        this.containerNode = this.getContainer();
        if (this.containerNode) {
            this.containerNode.appendChild(this.node);
            document.body.style.overflow = 'hidden'; // Disable scrolling on the main document body
        }
    }

    componentWillUnmount() {
        if (this.containerNode) {
            this.containerNode.removeChild(this.node);
            document.body.style.overflow = ''; // Re-enable scrolling
        }
        this.containerNode = null;
    }

    getContainer() {
        const { containerId } = this.props;

        let container;
        if (containerId) {
            container = document.getElementById(containerId);
        }

        return container || document.body;
    }

    render() {
        return createPortal(this.props.children, this.node);
    }
}
