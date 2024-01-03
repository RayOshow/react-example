import React from "react";
import Main from "./pages/Main"; // main.js를 import
import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";

// QueryClient는 React Query에서 사용하는 핵심 클래스입니다. 
// 이것은 모든 쿼리의 상태와 설정을 관리합니다. QueryClient를 생성할 때, defaultOptions와 같은 구성 옵션을 전달할 수 있습니다. 
// 이 구성 옵션을 통해 여러 쿼리에 대한 기본 설정을 지정할 수 있습니다.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5분에 한번씩 상태를 업데이트 합니다.
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Main />
      </div>
    </QueryClientProvider>
  );
}

export default App;
