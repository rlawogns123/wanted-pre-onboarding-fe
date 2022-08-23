import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useDeleteTodo from '../hooks/useDeleteTodo';
import styles from '../css/GetTodos.module.css';

function GetTodos(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem('Authorization');
  const [todos, setTodos] = useState([]);
  const deleteTodo = useDeleteTodo(props.updated);

  useEffect(() => {
    if (!props.checkUpdated) return;

    axios
      .get(
        'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        setTodos(data);
        props.updated(false);
      });
  }, [props.checkUpdated]);

  return (
    <div>
      <table className={styles.todoListBoard}>
        <tbody>
          {todos?.data?.map((item) => (
            <tr className={styles.todoList} key={item.id}>
              <td className={styles.todo}>
                <span>{item.todo}</span>
              </td>
              <td className={styles.isCompleted}>
                <span>{item.isCompleted ? '완료' : '미완료'}</span>
              </td>
              <td className={styles.update}>
                <button
                  className={styles.Btn}
                  onClick={() => {
                    navigate('/todo/update', {
                      state: {
                        id: item.id,
                        todo: item.todo,
                        isCompleted: item.isCompleted,
                      },
                    });
                  }}
                >
                  수정
                </button>
              </td>
              <td className={styles.delete}>
                <button
                  className={styles.Btn}
                  onClick={() => {
                    deleteTodo(item.id, item.todo);
                  }}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetTodos;
