import React, { useState } from 'react';
import apiService from '../../services/apiService';
import '../styles/TaskForm.css'; // Import the CSS file

const TaskForm = ({ token, taskToUpdate, setTaskToUpdate, closePopup, fetchTasks }) => {
  const [title, setTitle] = useState(taskToUpdate ? taskToUpdate.title : '');
  const [description, setDescription] = useState(taskToUpdate ? taskToUpdate.description : '');
  const [dueDate, setDueDate] = useState(taskToUpdate ? taskToUpdate.dueDate : '');
  const [status, setStatus] = useState(taskToUpdate ? taskToUpdate.status : 'Pending');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskToUpdate) {
        await apiService.updateTask(token, taskToUpdate.id, { title, description, dueDate, status });
        alert('Task updated successfully!');
        setTaskToUpdate(null); // Clear the form after update
      } else {
        await apiService.createTask(token, { title, description, dueDate, status });
        alert('Task created successfully!');
      }
      fetchTasks(); // Call fetchTasks to update the task list after create/update
      closePopup(); // Close the popup after form submission
    } catch (error) {
      console.error('Task operation error:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h4>{taskToUpdate ? 'Update Task' : 'Create Task'}</h4>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="text_input"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text_area"
            style={{ 
              width: '250px',
              minHeight: '100px',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '14px',
              fontFamily: 'Arial, sans-serif',
            }}
          />
          <input
            type="date"
            placeholder="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="text_input"
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="text_input">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit" className="btn">{taskToUpdate ? 'Update Task' : 'Create Task'}</button>
        </form>
        <button className="close-btn" onClick={closePopup}>Close</button>
      </div>
    </div>
  );
};

export default TaskForm;
