import React, { useEffect, useState } from 'react';
import apiService from '../../services/apiService';
import TaskForm from './TaskForm';
import '../styles/TaskList.css'; // Import the CSS file

const TaskList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [token]); // Fetch tasks whenever token changes

  const fetchTasks = async () => {
    try {
      const response = await apiService.getTasks(token);
      setTasks(response.data);
      setFilteredTasks(response.data); // Initially set filtered tasks to all tasks
    } catch (error) {
      console.error('Fetch tasks error:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await apiService.deleteTask(token, taskId);
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks); // Update filteredTasks based on updated tasks
      alert('Task deleted successfully!');
    } catch (error) {
      console.error('Delete task error:', error);
    }
  };

  const handleUpdateTask = (task) => {
    setTaskToUpdate(task);
    setShowPopup(true); // Show popup when updating
  };

  const handleCreateTask = () => {
    setTaskToUpdate(null); // Reset taskToUpdate for creating new task
    setShowPopup(true); // Show popup for creating
  };

  const closePopup = () => {
    setShowPopup(false); // Close popup
  };

  const handleSearch = () => {
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
      || task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    const filtered = status === '' ? tasks : tasks.filter(task => task.status === status);
    setFilteredTasks(filtered);
  };

  const clearFilters = () => {
    setFilteredTasks(tasks);
    setFilterStatus('');
    setSearchTerm('');
  };

  return (
    <div className="task-list-container">
      <h2>Task List</h2>
      <button onClick={handleCreateTask}>Create Task</button> {/* Button to show create task popup */}
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => handleFilter('Pending')}>Pending</button>
        <button onClick={() => handleFilter('In Progress')}>In Progress</button>
        <button onClick={() => handleFilter('Completed')}>Completed</button>
        <button onClick={clearFilters}>Clear Filters</button>
      </div>
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => handleUpdateTask(task)}>Update</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <TaskForm
          token={token}
          taskToUpdate={taskToUpdate}
          setTaskToUpdate={setTaskToUpdate}
          closePopup={closePopup} // Pass closePopup function to TaskForm
          fetchTasks={fetchTasks} // Pass fetchTasks function to TaskForm
        />
      )}
    </div>
  );
};

export default TaskList;
