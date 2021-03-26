const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "action type":
      return {
        ["action description"]: payload,
      };
    default:
      return state;
  }
};

export default reducer;
