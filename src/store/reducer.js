import * as Actions from "./actions";

const initialState = {
  origin: "",
  destination: "",
  provideRouteAlternatives: true,
  travelMode: "DRIVING",
  selectedRoute: 0,
  clientName: "",
  routes: [],
  orderBy: "KM",
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
    case Actions.SET_ROUTES_DATA:
      const { routes, request } = action.payload;
      return {
        ...state,
        routes: [...routes],
        origin: request.origin.query,
        destination: request.destination.query,
      };
    case Actions.SET_CLIENT_NAME:
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
