// src/components/A.js
import React from 'react';

function A({ onDataChange }) {
  console.log('A가 렌더링 됐다.')
  return (
    <div>
      <h2>Component A</h2>
      <button onClick={onDataChange}>B를 변경한다.</button>
    </div>
  );
}

export default A;
