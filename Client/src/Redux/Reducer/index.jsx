import { GET_TASKS, ADD_TASK, MODIFY_TASK, DELETE_TASK } from "../Actions";

const initialState = {
  tasks: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };

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
      filteredTask.status =
        filteredTask.status === "Active" ? "Done" : "Active";

      const taskWithoutModify = state.tasks.filter(
        (el) => el.id !== action.payload
      );

      const modifiedTasks = [...taskWithoutModify, ...filteredTask];

      window.localStorage.setItem("tasksLocal", JSON.stringify(modifiedTasks));

      return {
        ...state,
        tasks: modifiedTasks,
      };

    case DELETE_TASK:
      const newList = state.tasks.filter((el) => el.id !== action.payload);

      window.localStorage.setItem("tasksLocal", JSON.stringify(newList));

      return {
        ...state,
        tasks: newList,
      };

    default:
      return state;
  }
}

export default rootReducer;
