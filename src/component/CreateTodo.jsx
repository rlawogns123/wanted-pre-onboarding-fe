import React, { useCallback, useState } from 'react';
import axios from 'axios';
import styles from '../css/CreateTodo.module.css';

function CreateTodo(props) {
  const [newTodo, setNewTodo] = useState('');
  const token = localStorage.getItem('Authorization');

  const insertTodo = useCallback(
    async (e) => {
      e.preventDefault();

      await axios
        .post(
          'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos',
          {
            todo: newTodo,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(() => {
          console.log('create!');
          props.updated(true);
        });
      setNewTodo('');
    },
    [newTodo]
  );

  return (
    <div className={styles.createForm}>
      <form className={styles.inputData} onSubmit={insertTodo}>
        <input
          className={styles.input}
          type="text"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        ></input>
        <button className={styles.btn}>추가</button>
      </form>
    </div>
  );
}

export default CreateTodo;
