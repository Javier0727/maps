import * as Actions from "./actions";

const initialState = {
  origin: "",
  destination: "",
  provideRouteAlternatives: true,
  travelMode: "DRIVING",
  selectedRoute: 0,
  clientName: "",
  routes: [],
  orderBy: "distance",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_ROUTES_DATA_ASYNC:
      const { routes: reOrderRoutes, request } = action.payload;
      reOrderRoutes.sort(
        (a, b) =>
          parseFloat(a.legs[0].distance.value) -
          parseFloat(b.legs[0].distance.value)
      );

      return {
        ...state,
        routes: [...reOrderRoutes],
        origin: request.origin.query,
        destination: request.destination.query,
      };
    case Actions.SET_CLIENT_NAME_ASYNC:
      const { name } = action.payload;
      return {
        ...state,
        clientName: name,
      };
    case Actions.ORDER_BY_DISTANCE:
      let { routes: routesReOrderDistance } = action.payload;
      routesReOrderDistance.sort(
        (a, b) =>
          parseFloat(a.legs[0].distance.value) -
          parseFloat(b.legs[0].distance.value)
      );
      return {
        ...state,
        routes: [...routesReOrderDistance],
      };
    case Actions.ORDER_BY_TIME:
      let { routes: routesReOrderTime } = action.payload;
      routesReOrderTime.sort(
        (a, b) =>
          parseFloat(a.legs[0].duration.value) -
          parseFloat(b.legs[0].duration.value)
      );
      return {
        ...state,
        routes: [...routesReOrderTime],
      };
    default:
      return state;
  }
};

export default reducer;
