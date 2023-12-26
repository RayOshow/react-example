import {useMemo} from 'react';

function C({cond})  {  

  console.log('C가 렌더링 됐다.')
 
  // 컨디션을 기준으로 랜덤 수를 재 계산 하고 싶다. -> useMemo(() => { ... }, [cond]
  const randomNum = useMemo(() => {
    console.log('useMemo:' + cond);
    return Math.floor(Math.random() * 100); // 0부터 99 사이의 랜덤 수 생성
  }, [cond]);

  return (
    <div>
      <h2>Component C</h2>
      <p>This is Component C.</p>
      <p>Random Number: {randomNum}</p>
    </div>
  );
};

export default C;
