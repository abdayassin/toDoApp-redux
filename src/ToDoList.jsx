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
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  FormControl,
  MenuItem,
  Select,
  InputLabel
} from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import logImg from "./assets/check1.webp";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("");
  const [newTaskProgress, setNewTaskProgress] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openModifyDialog, setOpenModifyDialog] = useState(false);
  const [openOpenDialog, setOpenOpenDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modifiedDescTask, setModifiedDescTask] = useState("");
  const [modifiedNomTask, setModifiedNomTask] = useState("");
  const [modifiedTaskPriority, setModifiedTaskPriority] = useState("");
  const [modifiedTaskProgress, setModifiedTaskProgress] = useState("");
  const [modifiedduedate, setModifiedduedate] = useState(
    dayjs(
      new Date().toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        second: "2-digit",
      })
    ).add({ hours: new Date().getHours(), minutes: new Date().getMinutes() })
  );
  const [taskCompleted, setTaskCompleted] = useState([]);
  const [newTaskDueDate, setNewTaskDueDate] = useState(dayjs("2022-04-17"));

  // Options pour le champ de sélection de pourcentage
  const percentageOptions = Array.from({ length: 11 }, (_, i) => i * 10);

  const handleChangeselect = (event) => {
    setNewTaskProgress(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id === "nomTask") {
      setNewTask(value);
    } else if (id === "descTask") {
      setNewTaskDesc(value);
    } else if (id === "priorityTask") {
      setNewTaskPriority(value);
    }
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObj = {
        name: newTask,
        description: newTaskDesc,
        duedate: newTaskDueDate,
        priority: newTaskPriority,
        progress: newTaskProgress,
      };
      setTasks([...tasks, newTaskObj]);
      setTaskCompleted([...taskCompleted, false]);
      setNewTask("");
      setNewTaskDesc("");
      setNewTaskPriority("");
      setNewTaskProgress("");
    }
    setOpenOpenDialog(false);
    toast.success("Task added successfully");
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
    setModifiedNomTask(tasks[index].name);
    setModifiedDescTask(tasks[index].description);
    setModifiedTaskPriority(tasks[index].priority);
    setModifiedTaskProgress(tasks[index].progress);
    setModifiedduedate(tasks[index].duedate);
    setOpenModifyDialog(true);
  };

  const closeModifyDialog = () => {
    setOpenModifyDialog(false);
  };
  const handleChangeduedate = (date) => {
    setNewTaskDueDate(date);
    console.log("Selected date:", date);
  };
  const openAddDialogFunc = () => {
    setOpenOpenDialog(true);
  };
  const closeOpenDialog = () => {
    setOpenOpenDialog(false);
  };
  const handleModify = () => {
    const updatedTasks = [...tasks];
    updatedTasks[selectedIndex].name = modifiedNomTask;
    updatedTasks[selectedIndex].description = modifiedDescTask;
    updatedTasks[selectedIndex].duedate = modifiedduedate;
    updatedTasks[selectedIndex].priority = modifiedTaskPriority;
    updatedTasks[selectedIndex].progress = modifiedTaskProgress;
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
      <div className="logImg">
        <img
          src={logImg}
          alt="Logo"
          width="10%"
          style={{ display: "flex", alignItems: "center" }}
        />
      </div>

      <h2 className="mb-5">Task List</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "80px",
        }}
      >
        <Button
          onClick={() => openAddDialogFunc()}
          style={{ minWidth: "150px", height: "56px" }}
          variant="contained"
          color="primary"
        >
          Add Task
        </Button>
        <TextField
          fullWidth
          id="search"
          label="Search"
          variant="outlined"
          style={{ margin: "0 20px" }}
        />
        <FormControl style={{ minWidth: "150px", height: "56px" }}>
          <InputLabel id="demo-simple-select-label">Todo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newTaskProgress}
            label="All"
            onChange={handleChangeselect}
          >
            <MenuItem value={10}>All</MenuItem>
            <MenuItem value={20}>Done</MenuItem>
            <MenuItem value={30}>Todo</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={2} className="field">
        {tasks.map((task, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={1}>
                    <Checkbox
                      checked={taskCompleted[index]}
                      onChange={() => toggleTaskCompleted(index)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h6">{task.name}</Typography>
                    <Typography variant="body1">{task.description}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                  <Typography variant="body1">
  <button
    className="status"
    style={{
      backgroundColor:
        task.priority === "Low" ? "#0ac947" : task.priority === "Medium" ? "#ffbd21" : "#f73446"
    }}
  >
    {task.priority}
  </button>
</Typography>
                  </Grid>
                  <Grid item xs={1}>
                  <Typography variant="body1">
  <button className="status">
    {task.progress == "100" ? "Done" :
      task.progress >= "10" && task.progress <= "90" ? "In Progress" :
      "To Do"
    }
  </button>
</Typography>

                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="p">
                      {dayjs(task.duedate).format("DD/MM/YYYY h:mm A")}
                    </Typography>
                  </Grid>
               <Grid item xs={2}>
               <div style = {{ width: "50px" }}>
            <CircularProgressbar value = {task.progress}  />
         </div>
  
                  </Grid>
      
                  <Grid item xs={1} style={{ textAlign: "right" }}>
                    <IconButton
                      style={{ color: "green" }}
                      aria-label="edit"
                      onClick={() => openModifyDialogFunc(index)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      style={{ color: "red" }}
                      aria-label="delete"
                      onClick={() => deleteTask(index)}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" variant="outlined">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openModifyDialog} onClose={closeModifyDialog}>
        <DialogTitle>Modify Task</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Première colonne */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "48%",
                marginRight: "2%",
              }}
            >
              <TextField
                label="Nom Task"
                value={modifiedNomTask}
                onChange={(e) => setModifiedNomTask(e.target.value)}
                fullWidth
                style={{ marginBottom: "30px" }}
              />
              <TextField
                label="Description Task"
                value={modifiedDescTask}
                onChange={(e) => setModifiedDescTask(e.target.value)}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            </div>
            {/* Deuxième colonne */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "48%",
              }}
            >
              <FormControl
                style={{ width: "100%", marginBottom: "10px" }}
              >
                <InputLabel id="priority-select-label">Priority</InputLabel>
                <Select
                  labelId="priority-select-label"
                  id="priority-select"
                  value={modifiedTaskPriority}
                  onChange={(e) => setModifiedTaskPriority(e.target.value)}
                >
                  <MenuItem value={"High"}>High</MenuItem>
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"Low"}>Low</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                style={{ width: "100%", marginBottom: "10px" }}
              >
                <InputLabel id="progress-select-label">Progress</InputLabel>
                <Select
                  labelId="progress-select-label"
                  id="progress-select"
                  value={modifiedTaskProgress}
                  onChange={(e) => setModifiedTaskProgress(e.target.value)}
                >
                  {percentageOptions.map((percentage) => (
                    <MenuItem key={percentage} value={percentage}>
                      {`${percentage}%`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleModify}
            color="primary"
            variant="outlined"
          >
            Save
          </Button>
          <Button
            onClick={closeModifyDialog}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openOpenDialog} onClose={closeOpenDialog}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* Première colonne */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "48%",
                marginRight: "2%",
              }}
            >
              <TextField
                id="nomTask"
                label="Nom Task"
                placeholder="Enter task name"
                value={newTask}
                onChange={handleChange}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
              <TextField
                id="descTask"
                label="Description Task"
                placeholder="Enter task description"
                value={newTaskDesc}
                onChange={handleChange}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
              <FormControl
                style={{ width: "100%", marginBottom: "10px" }}
              >
                <InputLabel id="priority-select-label">Priority</InputLabel>
                <Select
                  labelId="priority-select-label"
                  id="priority-select"
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                >
                  <MenuItem value={"High"}>High</MenuItem>
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"Low"}>Low</MenuItem>
                </Select>
              </FormControl>
            </div>
            {/* Deuxième colonne */}
            <div style={{ display: "flex", flexDirection: "column", width: "48%" }}>
              <FormControl style={{ width: "100%", marginBottom: "10px" }}>
                <InputLabel id="progress-select-label">Progress</InputLabel>
                <Select
                  labelId="progress-select-label"
                  id="progress-select"
                  value={newTaskProgress}
                  onChange={(e) => setNewTaskProgress(e.target.value)}
                >
                  {percentageOptions.map((percentage) => (
                    <MenuItem key={percentage} value={percentage}>
                      {`${percentage}%`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div style={{ marginBottom: "10px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    id="duedateTask"
                    label="Due Date"
                    value={newTaskDueDate}
                    onChange={handleChangeduedate}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={addTask} color="primary" variant="outlined">
            Save
          </Button>
          <Button
            onClick={closeOpenDialog}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default ToDoList;
