import * as Actions from "./actions";

const initialState = {
  origin: "",
  destination: "",
  provideRouteAlternatives: true,
  travelMode: "DRIVING",
  selectedRoute: 0,
  clientName: "",
  dumy: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_ORIGIN_AND_DESTINATION:
      const { origin, destination } = action.payload;
      return {
        ...state,
        origin,
        destination,
      };
    case Actions.SET_SELECTED_ROUTE:
      const { index } = action.payload;
      return {
        ...state,
        selectedRoute: index,
      };
    case "DUMY_ASYNC":
      const { payload } = action;
      return {
        ...state,
        dumy: { ...payload },
      };
    case Actions.PUT_CLIENT_NAME:
      const { name } = action.payload;
      return {
        ...state,
        clientName: name,
      };
    default:
      return state;
  }
};

export default reducer;
