import { useCallback } from 'react';
import axios from 'axios';

function DeleteTodo(updated) {
  const token = localStorage.getItem('Authorization');

  const deleteTodo = useCallback(async (id, todo) => {
    const result = window.confirm(`${todo} 삭제하시겠습니까?`);

    if (result) {
      await axios
        .delete(
          `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          console.log('delete!');
          updated(true);
        });
    }
  }, []);

  return deleteTodo;
}

export default DeleteTodo;
