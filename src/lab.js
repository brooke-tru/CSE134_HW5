const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "purple";

ctx.fillRect(10,10,100,100);


class HelloWorld extends HTMLElement {
    connectedCallback() {
        console.log("Hello world!");
    }
}

customElements.define('hello-world', HelloWorld);