class Loader {
    container: HTMLElement;
    loaderElement: HTMLElement;
    textElement: HTMLElement;

    constructor() {
        this.container = document.createElement('div');
        this.loaderElement = document.createElement('div');
        this.textElement = document.createElement('div');

        this.init();
    }

    private init(): void {
        // Setup loader container
        this.container.className = 'loader-container';

        // Setup loader div
        this.loaderElement.className = 'loader';

        // Setup text div
        this.textElement.className = 'loader-text';
        this.textElement.textContent = 'Creating reservation...';

        // Append elements
        this.container.appendChild(this.loaderElement);
        this.container.appendChild(this.textElement);
    }

    show(): void {
        document.body.appendChild(this.container);
    }

    hide(): void {
        if (this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
    }
}

const loaderInstance = new Loader();

export default loaderInstance;
