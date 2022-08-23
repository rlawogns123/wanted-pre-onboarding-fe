import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/Signup.module.css';

function Signup() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const signUp = useCallback(
    async (e) => {
      e.preventDefault();

      await axios
        .post(
          'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signup',
          {
            email: id,
            password: password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then(console.log('signup!'));
      navigate('/');
    },
    [id, password]
  );

  return (
    <div className={styles.signInForm}>
      <form className={styles.inputData} onSubmit={signUp}>
        <input
          className={styles.input}
          type="email"
          id="id"
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
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          placeholder="비밀번호 입력(8자리 이상)"
        ></input>
        <button
          className={styles.btn}
          disabled={!(id.includes('@') && password.length >= 8)}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;
