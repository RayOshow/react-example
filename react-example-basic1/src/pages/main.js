
import { useState, useCallback } from "react";
import A from "../components/A";
import B from "../components/B";
import C from "../components/C";

function Main() {
  console.log("Main이 렌더링 됐다.");
  
  const [dataB, setDataB] = useState(0);
  const [condC, setCondC] = useState(false);

  // A에 전달하는 함수
  const handleDataChangeInA = useCallback(() => {
    // A 컴포넌트에서 발생한 이벤트에 의해 B 컴포넌트의 상태 변경

    console.log("handleDataChangeInA가 실행되었다.");
    // dataB : 0 -> 1 // 저장

    setDataB(dataB + 1);
    // dataB : 1

    // 상태 10개 -> 바뀌었다.
    // 체크 -> 한번에 바꾼다. 한번에 값이 바뀌는 시점 리렌더링.

    // 새로운 값이 추가가 된다. 이전 값도 있고,
    // 변경점이 확인되고 이때 값이 바뀐다.
    if (dataB !== 0 && dataB % 2 !== 0) {
      // condC를 토글 한다.
      setCondC(!condC);
    }
  }, [dataB, condC]);

  return (
    <div>
      <h1>Main Page</h1>
      <A onDataChange={handleDataChangeInA} />
      <B data={dataB} />
      <C cond={condC} />
    </div>
  );
}

export default Main;
