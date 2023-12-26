// src/components/B.js
import React from 'react';

function B({ data }) {
  console.log('B가 렌더링 됐다.')
  return (
    <div>
      <h2>Component B</h2>
      <p>Data from A: {data}</p>
    </div>
  );
}

export default B;
