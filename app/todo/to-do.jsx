import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const Todo = ({ task, toggleComplete, deleteTask }) => {
  const taskClassName = task.completed ? 'line-through' : '';

  return (
    <li className={`flex justify-between bg-slate-100 p-4 my-2 capitalize ${taskClassName}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleComplete}
          className="mr-3"
        />
        <p onClick={toggleComplete} className={`cursor-pointer ${taskClassName}`}>
          {task.text}
        </p>
      </div>
      <button
        onClick={deleteTask}
        className="border p-2 ml-2 bg-red-500 text-white rounded"
      >
        <FaRegTrashAlt />
      </button>
    </li>
  );
};

export default Todo;




