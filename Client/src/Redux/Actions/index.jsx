export const GET_TASKS = "GET_TASKS";
export const ADD_TASK = "ADD_TASK";
export const MODIFY_TASK = "MODIFY_TASK";
export const DELETE_TASK = "DELETE_TASK";

var tasks = [
  { id: 1, task: "Active task", priority: "5", status: "Active" },
  { id: 2, task: "Completed task", priority: "3", status: "Done" },
];

const localStorageTasks = window.localStorage.getItem("tasksLocal");

var idCounter =
  JSON.parse(localStorageTasks) !== null
    ? JSON.parse(localStorageTasks).length
    : 2;

export function getTasks() {
  try {
    if (JSON.parse(localStorageTasks) !== null) {
      return {
        type: GET_TASKS,
        payload: JSON.parse(localStorageTasks),
      };
    } else {
      window.localStorage.setItem("tasksLocal", JSON.stringify(tasks));
      return {
        type: GET_TASKS,
        payload: tasks,
      };
    }
  } catch (err) {
    console.log(err);
  }
}

export function addTask({ task, priority }) {
  try {
    idCounter++;

    return {
      type: ADD_TASK,
      payload: {
        id: idCounter,
        task,
        priority,
        status: "Active",
      },
    };
  } catch (err) {
    console.log(err);
  }
}

export function modifyTask(payload) {
  try {
    return {
      type: MODIFY_TASK,
      payload,
    };
  } catch (err) {
    console.log(err);
  }
}

export function deleteTask(payload) {
  try {
    return {
      type: DELETE_TASK,
      payload,
    };
  } catch (err) {
    console.log(err);
  }
}
