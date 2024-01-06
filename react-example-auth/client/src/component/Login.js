import React, { useState } from 'react';

import { postData } from '../utils/ApiUtils'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {

    if (userId && password) {
      try {
        const response = await postData('auth/login', { userId, password })
        console.log('Login Success:', response);
        navigate('/'); 

      } catch (error) {
        console.error('Login Failed:');
        setUserId('')
        setPassword('')
      }
    } else {
      alert('아이디와 패스워드를 모두 입력해주세요.');
    }
  };

  return (
    <div>
      <div>
        <label>
          아이디:
          <input type="text" value={userId} placeholder='abc' onChange={(e) => setUserId(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          패스워드:
          <input type="password" value={password} placeholder='1234' onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      <button onClick={handleLogin}>로그인</button>

    </div>
  );
}

export default Login;
