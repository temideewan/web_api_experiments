import * as zoid from 'zoid/dist/zoid.frameworks';
import { node, dom } from 'jsx-pragmatic';
let MyWidget = zoid.create({
  tag: 'my-widget',
  url: 'http://localhost:5174',
  dimensions: {
    width: '100vw',
    height: '100vh',
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
    frame.setAttribute('frameborder', '0')
    frame.setAttribute('id', 'pay-by-app-frame')
    container.appendChild(prerenderFrame);
    return container;
  },
});

const payByApp = document.createElement('div');
payByApp.setAttribute('id', 'pay-by-app');
document.body.appendChild(payByApp);

export default MyWidget;
