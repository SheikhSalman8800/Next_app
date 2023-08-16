"use client"
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Todo from './to-do';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-blue-500 text-slate-100`,
  count: `text-center p-2`,
};

function TodoPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (user) {
      const q = query(collection(db, `todos_${user.uid}`)); 
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let tasksArr = [];
        querySnapshot.forEach((doc) => {
          tasksArr.push({ ...doc.data(), id: doc.id });
        });
        setTasks(tasksArr);
      });
      return () => unsubscribe();
    }
  }, [user]); 

  const createTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === '') {
      return;
    }

    await addDoc(collection(db, `todos_${user.uid}`), {
      text: newTask,
      completed: false,
    });

    setNewTask('');
  };

  const toggleComplete = async (task) => {
    await updateDoc(doc(db, `todos_${user.uid}`, task.id), {
      completed: !task.completed,
    });
  };

  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, `todos_${user.uid}`, taskId));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTask} className={style.form}>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Add Task"
          />
          <button className={style.button}>Add Task</button>
        </form>
        <ul>
          {tasks.map((task, index) => (
            <Todo
              key={index}
              task={task}
              toggleComplete={() => toggleComplete(task)}
              deleteTask={() => deleteTask(task.id)}
            />
          ))}
        </ul>
        {tasks.length > 0 && (
          <p className={style.count}>{`You have ${tasks.length} tasks`}</p>
        )}
      </div>
    </div>
  );
}

export default TodoPage;


