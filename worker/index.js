importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCitUfAKBYTI-CLny1rb9IwPN2UAf4tW6E",
    authDomain: "test-pwa-8e1a0.firebaseapp.com",
    projectId: "test-pwa-8e1a0",
    storageBucket: "test-pwa-8e1a0.appspot.com",
    messagingSenderId: "419104302909",
    appId: "1:419104302909:web:2c6af5e2a01fa410dc4754"
});

const messaging = firebase.messaging();

console.log("FCM Init")
messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/apple-icon.png'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
});

