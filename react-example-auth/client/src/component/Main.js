import { useState, useEffect } from "react";
import { postData } from '../utils/ApiUtils'
import { useNavigate } from 'react-router-dom';

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const validate = async (event) => {

      try {
        const response = await postData('auth/validate')
        console.log('validate Success:', response);
        // 여기에 로그인 성공 후 처리 로직을 추가하세요.
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
        console.error('validate Failed:');
      }
    };
    validate();
  }, []);

  const navigateToLogin = () => {
    navigate('/login'); 
  };

  return (
    <>
      {isLoggedIn ? (
        <h1>로그인 상태입니다.</h1>
      ) : (
        <div>
          <h1>로그인이 필요합니다.</h1>
          <button onClick={navigateToLogin}>로그인 페이지로 이동</button>
        </div>
      )}
    </>
  )
}

export default Main;
