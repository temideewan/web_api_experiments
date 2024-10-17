// import { node, dom } from "jsx-pragmatic";
import * as zoid from 'zoid/dist/zoid.frameworks';

let MyWidget = zoid.create({
  tag: 'my-widget',
  url: 'http://localhost:5174',
  autoResize: {
    width: false,
    height: true,
  },
  prerenderTemplate({ doc }) {
    const html = doc.createElement('html');
    const head = doc.createElement('head');
    const style = doc.createElement('style');
    const body = doc.createElement('body');
    const spinner = doc.createElement('div');
    const loader = doc.createElement('div');
    spinner.classList.add('spinner');
    loader.classList.add('loader');
    spinner.appendChild(loader);
    style.innerHTML = `{
        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            top: 0;
            left: 0;
            margin: 0;
            text-align: center;
        }

        .spinner {
            position: absolute;
            max-height: 60vmin;
            max-width: 60vmin;
            height: 40px;
            width: 40px;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            z-index: 10;
        }

        .spinner .loader {
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            border: 3px solid rgba(0, 0, 0, .2);
            border-top-color: rgba(33, 128, 192, 0.8);
            border-radius: 100%;
            animation: rotation .7s infinite linear;
        }

        @keyframes rotation {
            from {
                transform: rotate(0deg)
            }
            to {
                transform: rotate(359deg)
            }
        }
    }`;

    html.appendChild(head)
    head.appendChild(style);
    head.appendChild(body);
    body.appendChild(spinner);
    return html
  },
  containerTemplate: function containerTemplate({
    doc,
    uid,
    frame,
    prerenderFrame,
  }) {
    let container = doc.createElement('div');
    container.id = uid;
    container.appendChild(frame);
    container.appendChild(prerenderFrame);
    frame.setAttribute('id', 'pay-by-app-frame');
    return container;
  },
});


console.log('yo! have loaded mywidget from child: ');
console.log(MyWidget);

export default MyWidget;
