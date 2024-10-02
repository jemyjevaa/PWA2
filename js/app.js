if ( navigator.serviceWorker ) {  //Valida que el navegador que sea compatible.
    navigator.serviceWorker.register('/sw.js');
}