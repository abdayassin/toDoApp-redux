import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Checkbox,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openModifyDialog, setOpenModifyDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modifiedTask, setModifiedTask] = useState("");
  const [taskCompleted, setTaskCompleted] = useState([]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id === "nomTask") {
      setNewTask(value);
    } else if (id === "descTask") {
      setNewTaskDesc(value);
    }
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObj = {
        name: newTask,
        description: newTaskDesc,
      };
      setTasks([...tasks, newTaskObj]);
      setTaskCompleted([...taskCompleted, false]);
      setNewTask("");
      setNewTaskDesc("");
    }
  };

  const deleteTask = (index) => {
    setSelectedIndex(index);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(selectedIndex, 1);
    setTasks(updatedTasks);
    setOpenDeleteDialog(false);
    toast.success("Task deleted successfully");
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const openModifyDialogFunc = (index) => {
    setSelectedIndex(index);
    setModifiedTask(tasks[index].name);
    setOpenModifyDialog(true);
  };

  const closeModifyDialog = () => {
    setOpenModifyDialog(false);
  };

  const handleModify = () => {
    const updatedTasks = [...tasks];
    updatedTasks[selectedIndex].name = modifiedTask;
    setTasks(updatedTasks);
    setOpenModifyDialog(false);
    toast.success("Task updated successfully");
  };

  const toggleTaskCompleted = (index) => {
    const updatedTaskCompleted = [...taskCompleted];
    updatedTaskCompleted[index] = !updatedTaskCompleted[index];
    setTaskCompleted(updatedTaskCompleted);
  };

  return (
    <div className="todo-item">
       <div style={{ display: 'flex', alignItems: 'center' }} className="addTodo">
    <TextField
      id="nomTask"
      label="Nom Task"
      value={newTask}
      style={{ width: '45%', marginRight: '10px' }}
      onChange={handleChange}
      fullWidth
    />
    <TextField
      id="descTask"
      label="Description Task"
      value={newTaskDesc}
      style={{ width: '45%', marginRight: '10px' }}
      onChange={handleChange}
      fullWidth
    />
    <Button onClick={addTask} style={{ marginLeft: '10px', width: '100px'} }>Add Task</Button>
  </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <Checkbox
              checked={taskCompleted[index]}
              onChange={() => toggleTaskCompleted(index)}
            />
            <span
              style={{
                textDecoration: taskCompleted[index] ? "line-through" : "none",
              }}
            >
              {task.name} - {task.description}
            </span>
            <button onClick={() => deleteTask(index)}>Delete</button>
            <button onClick={() => openModifyDialogFunc(index)}>Modify</button>
          </li>
        ))}
      </ul>
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary" variant="raised">
            Cancel
          </Button>
          <Button onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openModifyDialog} onClose={closeModifyDialog}>
        <DialogTitle>Modify Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Modified Task"
            value={modifiedTask}
            onChange={(e) => setModifiedTask(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModify}>Save</Button>
          <Button onClick={closeModifyDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default ToDoList;
