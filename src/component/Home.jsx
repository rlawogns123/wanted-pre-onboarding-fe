import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Home.module.css';

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('Authorization');

  useEffect(() => {
    if (!(token === null)) navigate('/todo');
  }, []);

  return (
    <div className={styles.home}>
      <button
        className={styles.btn}
        onClick={() => {
          navigate('/signin');
        }}
      >
        로그인
      </button>
      <button
        className={styles.btn}
        onClick={() => {
          navigate('/signup');
        }}
      >
        회원가입
      </button>
    </div>
  );
}

export default Home;
