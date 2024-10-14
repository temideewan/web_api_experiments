import * as zoid from 'zoid/dist/zoid.frameworks';
import { node, dom } from 'jsx-pragmatic';
let MyWidget = zoid.create({
  tag: 'my-widget',
  url: 'http://localhost:5174',
  autoResize: {
    width: false,
    height: true,
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
    frame.setAttribute('id', 'pay-by-app-frame')
    return container;
  },
});

const payByApp = document.createElement('div');
payByApp.setAttribute('id', 'pay-by-app');
document.body.appendChild(payByApp);

export default MyWidget;
