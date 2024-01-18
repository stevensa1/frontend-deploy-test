import { Workbox } from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  const wb = new Workbox('./sws.bundle.js');
  try {
    await wb.register();
    // await navigator.serviceWorker.register('./sw.bundle.js');
  } catch (error) {
    /* empty */
  }
};

export default swRegister;
