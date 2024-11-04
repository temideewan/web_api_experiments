import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.ts';

import init from './init';
import PayByAppWidget from './pay-by-app-widget.ts';
import verifyMerchant from './verifyMerrchant.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

init();

type PayByAppProps = {
  amount: number;
  merchantId: string | number;
};

type PayByAppResponse = {
  success: boolean;
  callbackUrl: string;
  message: string;
};

function closeApp(appRef: any) {
  appRef.close()
}
async function mountApp(props: PayByAppProps): Promise<PayByAppResponse> {
  return new Promise(async (resolve, reject) => {
    let appRef: any;
    if (!props.merchantId) {
      reject({
        callbackUrl: null,
        success: false,
        message: 'Missing merchantId',
      });
      return;
    }
    if (!props.amount) {
      reject({ callbackUrl: null, success: false, message: 'Missing amount' });
      return;
    }
    const verifiedMerchant = await verifyMerchant();

    if (!verifiedMerchant) {
      reject({
        callbackUrl: null,
        success: false,
        message: 'Merchant verification failed',
      });
      return;
    }
    appRef = PayByAppWidget({
      amount: props.amount,
      merchantId: props.merchantId,
      onCloseApp: () => {
        closeApp(appRef);
      },
      onResponse: (response: PayByAppResponse) => {
        if (response.success) {
          resolve({
            callbackUrl: response.callbackUrl,
            success: response.success,
            message: response.message,
          });
        } else {
          reject({
            callbackUrl: null,
            success: false,
            message: response.message,
          });
        }
      },
    });
  });
}
