import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import MyWidget from './MyWidget.js'

const template = document.createElement('template')

template.innerHTML = `
 <button class="pay-by-app-link">Pay by App</button>
`

class PayByApp extends HTMLElement {
  constructor()  {
    super();
    this.attachShadow({ mode: 'open' });
    this.addEventListener('click', this)
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  handleEvent(event){
    event.preventDefault();
    appRef = this.mountPayByApp();
  }
  mountPayByApp(){
    return MyWidget({
      passDownFunc: () => {},
      name: 'temidayo',
    }).render('#pay-by-app')
  }
  connectedCallback(){
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "elementStyles.css");
    this.shadowRoot.appendChild(linkElem);
    const button = this.shadowRoot.querySelector('.pay-by-app-link');
    button.style.setProperty('--background-color', this.getAttribute('background-color'));
    button.setAttribute('style', this.getAttribute('style'));
  }
}
customElements.define('pay-by-app', PayByApp)



























document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

// create a custom button element for click

setupCounter(document.querySelector('#counter'))
