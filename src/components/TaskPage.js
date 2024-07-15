import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, updateTask, deleteTask } from '../redux/taskSlice';

const TaskPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const [taskData, setTaskData] = useState({
    Title: '',
    Description: '',
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    console.log("Tasks from Redux state:", tasks);
  }, [tasks]);

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = localStorage.getItem('user_id');
    const newTask = { ...taskData, user };
    if (editMode && currentTask) {
      const updatedTask = { ...taskData, uid: currentTask.uid, user: currentTask.user };
      dispatch(updateTask(updatedTask)).then(() => {
        setEditMode(false); 
        setCurrentTask(null); 
      });
    } else {
      dispatch(createTask(newTask));
    }
    setTaskData({ Title: '', Description: '' }); 
  };
  
  const handleUpdate = (task) => {
    setEditMode(true);
    setCurrentTask(task);
    setTaskData({
      Title: task.Title,
      Description: task.Description,
    });
  };
  

  const handleDelete = (uid) => {
    dispatch(deleteTask(uid));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <form onSubmit={handleSubmit}>
        <input style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} type="text" name="Title" placeholder="Title" value={taskData.Title} onChange={handleChange} required />
        <input style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} type="text" name="Description" placeholder="Description" value={taskData.Description} onChange={handleChange} required />
        <button style={{ padding: '10px 20px', marginRight: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }} type="submit">{editMode ? 'Update Task' : 'Add Task'}</button>
      </form>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.uid} style={{ margin: '10px 0', padding: '10px', backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
              <h3 style={{ marginTop: '0', fontSize: '20px' }}>{task.Title || 'No Title'}</h3>
              <p style={{ color: '#555' }}>{task.Description || 'No Description'}</p>
              <button style={{ margin: '0 5px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }} onClick={() => handleUpdate(task)}>Edit</button>
              <button style={{ margin: '0 5px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }} onClick={() => handleDelete(task.uid)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </ul>
    </div>
  );
};

export default TaskPage;
