import "./index.css";
import { subjectHandler, gradeHandler, topicHandler, chapterHandler, backBtnHandler } from "./event-handlers";
import globalState from "./state";
// Register Service Worker for offline capability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker registered successfully:', registration.scope);
      })
      .catch((error) => {
        console.log('❌ Service Worker registration failed:', error);
      });
  });
}

document.querySelector(".subject").addEventListener("click", subjectHandler);
document.querySelector(".grade").addEventListener("click", gradeHandler);
document.querySelector(".topic").addEventListener("click", topicHandler);
document.querySelector(".chapter").addEventListener("click", chapterHandler);
document.querySelector(".back-btn").addEventListener("click", backBtnHandler);