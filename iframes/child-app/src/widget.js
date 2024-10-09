// import { node, dom } from "jsx-pragmatic";
import * as zoid from 'zoid/dist/zoid.frameworks';
let MyWidget = zoid.create({
  tag: 'my-widget',
  url: 'http://localhost:5174',
  dimensions: {
    width: "100vw",
    height: "100vh"
  },
});


console.log('yo! have loaded mywidget from child: ');
console.log(MyWidget);

export default MyWidget;
