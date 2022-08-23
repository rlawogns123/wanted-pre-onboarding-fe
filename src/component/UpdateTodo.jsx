import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/UpdateTodo.module.css';

function UpdateTodo() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const [modifyTodo, setModifyTodo] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const token = localStorage.getItem('Authorization');

  const updateTodo = useCallback(
    async (e) => {
      e.preventDefault();

      await axios
        .put(
          `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${id}`,
          {
            todo: modifyTodo,
            isCompleted: isCompleted,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(() => {
          console.log('updated!');
        });
      navigate('/todo');
    },
    [modifyTodo, isCompleted]
  );

  useEffect(() => {
    setModifyTodo(location.state.todo);
    setIsCompleted(location.state.isCompleted);
  }, []);

  return (
    <div className={styles.updateForm}>
      <form className={styles.inputData} onSubmit={updateTodo}>
        <label className={styles.labelText} htmlFor="isCompleted">
          완료여부
        </label>
        <input
          className={styles.checkBox}
          type="checkbox"
          id="isCompleted"
          checked={isCompleted}
          onChange={(e) => {
            setIsCompleted(e.target.checked);
          }}
        ></input>

        <input
          className={styles.input}
          type="text"
          value={modifyTodo}
          onChange={(e) => {
            setModifyTodo(e.target.value);
          }}
        ></input>
        <button className={styles.Btn}>수정완료</button>
        <button className={styles.Btn} onClick={() => navigate('/todo')}>
          취소
        </button>
      </form>
    </div>
  );
}

export default UpdateTodo;
