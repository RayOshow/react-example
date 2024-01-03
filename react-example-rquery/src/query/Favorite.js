// API를 사용하지 않는 전역 상태의 예입니다.

import { useQuery, useMutation, useQueryClient } from 'react-query';

// 간단한 토스트 상태 저장소 (실제로는 다양한 저장 방법이 가능합니다)
let favorite = null

// 토스트 상태 저장소 API - 외부 API를 호출하지 않습니다.
const getFavorite = () => favorite;
const setFavorite = (_favorite) => {
  favorite = _favorite;
};

export const useFavorite = () => {
  return useQuery('favorite', getFavorite, {
    staleTime: Infinity,
  });
};

export const useSetFavorite = () => {
  // QueryClient는 React Query의 핵심 기능들을 제공하는 객체로, 데이터를 가져오고(cache), 다시 가져오기(refetch), 동기화하기(synchronize) 등의 작업을 처리합니다.
  const queryClient = useQueryClient();
  // useMutation은 API 호출 또는 사이드 이펙트를 가진 함수를 실행하고 그 결과를 추적합니다.
  return useMutation(setFavorite, {
    // 실제 서버를 호출 하지 않고 상태를 변경합니다.
    onMutate: (favorite) => {
      queryClient.setQueryData('favorite', favorite);
    },
  });
};


