import { useQuery, useQueryClient, useMutation } from 'react-query';
import axios from 'axios';

/**
 * 아이템 리스트를 가져옵니다.
 * 
 * @returns 
 * 
 */
const fetchItems = async (favorite = null, brand = null, category = null) => {
  try {
    let params = {};
    if (brand) {
      params.brand = brand;
    }
    if (category) {
      params.category = category;
    }
    if (favorite) {
      params.favorite = favorite;
    }

    const response = await axios.get('http://localhost:5001/items', { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Network error');
  }
};

/**
 * 아이템 리스트를 가지고와 "items" 으로 관리 합니다.
 * 
 * @returns 
 */
export const useItems = (favorite, brand, category) => {
  return useQuery(
    ['items', favorite, brand, category], // 쿼리 키에 favorite를 포함. favorite 변경시 리펫치
    () => fetchItems(favorite, brand, category)
  );
};

/**
 * 아이템 상태를 갱신 합니다.
 * 
 * @param {*} newData 
 * @returns 
 */
const updateItem = async (newData) => {

  const { id, ...restOfData } = newData;
  try {
    const response = await axios.patch(`http://localhost:5001/items/${id}`, restOfData, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Error updating item');
  }
};

/**
 *  아이템 갱신 후에 전역상태를 최신화 합니다.
 * 
 * @param {*} newData 
 * @returns 
 */
export const useUpdateItem = () => {

  // QueryClient는 React Query의 핵심 기능들을 제공하는 객체로, 데이터를 가져오고(cache), 다시 가져오기(refetch), 동기화하기(synchronize) 등의 작업을 처리합니다.
  const queryClient = useQueryClient();
  // useMutation은 API 호출 또는 사이드 이펙트를 가진 함수를 실행하고 그 결과를 추적합니다.
  return useMutation(updateItem, {
    onSuccess: () => {
      // 해당 query key에 해당하는 데이터를 refetch
      queryClient.refetchQueries("items");
    },
  });
};

/**
 * 아이템을 추가 합니다.
 * @param {*} newData 
 * @returns 
 */
const addItems = async (newData) => {
  try {
    const response = await axios.post(`http://localhost:5001/items`, newData, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Error adding Item');
  }
};

/**
 * 아이템을 추가 하고 상태를 최신화합니다.
 * @returns 
 */
export const useAddItem = () => {
  const queryClient = useQueryClient(); // 이 줄 추가
  return useMutation(addItems, {
    onSuccess: () => {
      // 해당 query key에 해당하는 데이터를 refetch
      queryClient.refetchQueries("items");
    },
  });
};

/**
 * 아이템을 삭제 합니다.
 * 
 * @param {*} id 
 * @returns 
 */
const deleteItems = async (id) => {
  if (!id) {
    throw new Error("ID is missing in the provided data.");
  }

  try {
    const response = await axios.delete(`http://localhost:5001/items/${id}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Error deleting Items');
  }
};

/**
 * 아이템 삭제 후에 전역상태를 최신화 합니다.
 * @returns 
 */
export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteItems, {
    onSuccess: () => {
      // 해당 query key에 해당하는 데이터를 refetch
      queryClient.refetchQueries("items");
    },
  });
};