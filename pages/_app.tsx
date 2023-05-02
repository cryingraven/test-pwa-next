import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { initializeApp } from "firebase/app"
import { getMessaging, getToken } from "firebase/messaging"

export default function App({ Component, pageProps }: AppProps) {
  const registerSW = async () => {
    if("serviceWorker" in navigator) {
      try{
        const status = await requestNotificationPermission()
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js")
        if(status!="granted"){
          return
        }
        if(registration.active)[
          getFCMToken()
        ]
      }catch(e){
        console.log("Error Register Worker")
      }
    }else{
      console.log(navigator)
    }
  }

  const getFCMToken  = async ()=>{
    const firebaseConfig = {
      apiKey: "AIzaSyCitUfAKBYTI-CLny1rb9IwPN2UAf4tW6E",
      authDomain: "test-pwa-8e1a0.firebaseapp.com",
      projectId: "test-pwa-8e1a0",
      storageBucket: "test-pwa-8e1a0.appspot.com",
      messagingSenderId: "419104302909",
      appId: "1:419104302909:web:2c6af5e2a01fa410dc4754"
    }
    const firebaseApp = initializeApp(firebaseConfig)
    const messaging = getMessaging(firebaseApp)
  
    const fcmToken = await getToken(messaging)
    console.log(fcmToken)
  }

  const requestNotificationPermission = async ()=>{
    return await Notification.requestPermission();
  }

  useEffect(() => {
    registerSW()
  }, [])
  return <Component {...pageProps} />
}
