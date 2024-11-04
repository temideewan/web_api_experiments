import init from './init';
import PayByAppWidget from './pay-by-app-widget.js';
import verifyMerchant from './verifyMerchant';
import { appid } from './const/selector.js';

function closeApp(appRef) {
  appRef.close();
}
async function mountApp(props) {
  init();
    let appRef;
    if (!props.merchantId) {
      return ({
        callbackUrl: null,
        success: false,
        message: 'Missing merchantId',
      });
    }
    if (!props.amount) {
      return ({ callbackUrl: null, success: false, message: 'Missing amount' });
    }
    const verifiedMerchant = await verifyMerchant();

    if (!verifiedMerchant) {
      return ({
        callbackUrl: null,
        success: false,
        message: 'Merchant verification failed',
      });
    }
    appRef = PayByAppWidget({
      amount: props.amount,
      merchantId: props.merchantId,
      onCloseApp: () => {
        closeApp(appRef);
      },
    });

    appRef.render(`#${appid}`)

    console.log(appRef)
}

export default mountApp;
