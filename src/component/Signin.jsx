import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/Signin.module.css';

function Signin() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const signIn = useCallback(
    async (e) => {
      e.preventDefault();

      await axios
        .post(
          'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signin',
          {
            email: id,
            password: password,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        .then((res) => {
          console.log('signin!');
          localStorage.setItem('Authorization', res.data.access_token);
        });
      localStorage.getItem('Authorization');
      navigate('/todo');
    },
    [id, password]
  );

  return (
    <div className={styles.signInForm}>
      <form onSubmit={signIn} className={styles.inputData}>
        <input
          className={styles.input}
          tpye="email"
          id="user_id"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
          required
          placeholder="이메일 입력"
        ></input>
        <input
          className={styles.input}
          type="password"
          id="user_password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          placeholder="비밀번호 입력"
        ></input>
        <button className={styles.btn}>로그인</button>
      </form>
    </div>
  );
}

export default Signin;
