const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "SET_SELECTED_GROUP":
      return {
        ...state,
        selectedGroup: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
