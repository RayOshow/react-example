import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 개발 모드에서 제공되는 특수한 컴포넌트입니다. 
  // 이를 사용하면 애플리케이션에서 잠재적인 문제와 잠재적인 성능 이슈를 검사하고 경고 메시지를 출력하여 개발자에게 알려줍니다.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
