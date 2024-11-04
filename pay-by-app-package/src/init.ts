import { appid } from "./const/selectors";
function init() {
  const payByApp = document.createElement('div');
  payByApp.setAttribute('id', appid);
  document.body.appendChild(payByApp);
}

export default init;
