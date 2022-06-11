export const GET_TASKS = "GET_TASKS";
export const ADD_TASK = "ADD_TASK";
export const MODIFY_TASK = "MODIFY_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const LOGGIN_STATUS = "LOGGIN_STATUS";
export const LOGOUT_STATUS = "LOGOUT_STATUS";
export const SET_USER_INFO = "SET_USER_INFO";

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

export function logginStatus() {
  try {
    return {
      type: LOGGIN_STATUS,
    };
  } catch (err) {
    console.log(err);
  }
}

export function logoutStatus() {
  try {
    return {
      type: LOGOUT_STATUS,
    };
  } catch (err) {
    console.log(err);
  }
}

export function setUserInfo(payload) {
  try {
    return {
      type: SET_USER_INFO,
      payload: payload,
    };
  } catch (err) {
    console.log(err);
  }
}
