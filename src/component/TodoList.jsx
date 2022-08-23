import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateTodo from './CreateTodo';
import GetTodos from './GetTodos';
import styles from '../css/TodoList.module.css';

function TodoList() {
  const navigate = useNavigate();
  const token = localStorage.getItem('Authorization');
  const [isUpdated, setIsUpdated] = useState(true);

  useEffect(() => {
    if (token === null) navigate('/');
  }, [token]);

  return (
    <div className={styles.todoList}>
      <CreateTodo updated={setIsUpdated} />
      <GetTodos updated={setIsUpdated} checkUpdated={isUpdated} />
    </div>
  );
}

export default TodoList;
