import React from 'react';
import Signin from './component/Signin';
import Signup from './component/Signup';
import Header from './component/Header';
import TodoList from './component/TodoList';
import Home from './component/Home';
import UpdateTodo from './component/UpdateTodo';
import DeleteTodo from './hooks/useDeleteTodo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/todo/update" element={<UpdateTodo />} />
          <Route path="/todo/delete" element={<DeleteTodo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
