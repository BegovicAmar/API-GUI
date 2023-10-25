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
    }

    componentDidMount() {
        this.containerNode = this.getContainer();
        if (this.containerNode) {
            this.containerNode.appendChild(this.node);
        }
    }

    componentWillUnmount() {
        if (this.containerNode) {
            this.containerNode.removeChild(this.node);
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
