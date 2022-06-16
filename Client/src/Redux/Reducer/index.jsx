import {
  GET_TASKS,
  ADD_TASK,
  MODIFY_TASK,
  EDIT_TASK,
  DELETE_TASK,
  LOGGIN_STATUS,
  LOGOUT_STATUS,
  SET_USER_INFO,
} from "../Actions";

const initialState = {
  tasks: [],
  loggin: false,
  userInfo: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      if (state.loggin) {
        return {
          ...state,
          tasks: state.userInfo.tasks,
        };
      } else {
        return {
          ...state,
          tasks: action.payload,
        };
      }

    case ADD_TASK:
      const concatenateTasks = [...state.tasks, action.payload];

      window.localStorage.setItem(
        "tasksLocal",
        JSON.stringify(concatenateTasks)
      );
      return {
        ...state,
        tasks: concatenateTasks,
      };

    case MODIFY_TASK:
      const filteredTask = state.tasks.filter((el) => el.id === action.payload);
      filteredTask.taskStatus =
        filteredTask.taskStatus === "Active" ? "Done" : "Active";

      const taskWithoutModify = state.tasks.filter(
        (el) => el.id !== action.payload
      );

      const modifiedTasks = [...taskWithoutModify, ...filteredTask];

      window.localStorage.setItem("tasksLocal", JSON.stringify(modifiedTasks));

      return {
        ...state,
        tasks: modifiedTasks,
      };

    case EDIT_TASK:
      const { id, task, priority, createdAt, timeLimit, setAlert, details } =
        action.payload;

      const filterTask = state.tasks.filter((el) => el.id === id);

      filterTask[0].task = task;
      filterTask[0].priority = priority;
      filterTask[0].createdAt = createdAt;
      filterTask[0].timeLimit = timeLimit;
      filterTask[0].setAlert = setAlert;
      filterTask[0].details = details;

      const taskNoModify = state.tasks.filter((el) => el.id !== id);

      const modifyTasks = [...taskNoModify, ...filterTask];

      window.localStorage.setItem("tasksLocal", JSON.stringify(modifyTasks));

      return {
        ...state,
        tasks: modifyTasks,
      };

    case DELETE_TASK:
      const newList = state.tasks.filter((el) => el.id !== action.payload);
      window.localStorage.setItem("tasksLocal", JSON.stringify(newList));

      return {
        ...state,
        tasks: newList,
      };

    case LOGGIN_STATUS:
      return {
        ...state,
        loggin: true,
      };

    case LOGOUT_STATUS:
      window.localStorage.clear();
      return {
        ...state,
        loggin: false,
        userInfo: false,
        tasks: [],
      };

    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
