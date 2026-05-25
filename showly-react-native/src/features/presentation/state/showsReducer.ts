import { Show } from "../../shows/domain/entities/show";

export type ShowsState = {
  shows: Show[];
  isLoading: boolean;
  error: string | null;
  apiResponseTimeMs: number | null;
  totalApiResponseTimeMs: number;
  apiExecutionCount: number;
  coldStartTimeMs: number | null;
};

export type ShowsAction =
  | { type: "LOAD_START" }
  | {
      type: "LOAD_SUCCESS";
      payload: { shows: Show[]; apiResponseTimeMs: number };
    }
  | { type: "LOAD_ERROR"; payload: string }
  | { type: "CREATE_SHOW"; payload: Show }
  | { type: "UPDATE_SHOW"; payload: Show }
  | { type: "DELETE_SHOW"; payload: number }
  | { type: "SET_COLD_START_TIME"; payload: number };

export const initialShowsState: ShowsState = {
  shows: [],
  isLoading: false,
  error: null,
  apiResponseTimeMs: null,
  totalApiResponseTimeMs: 0,
  apiExecutionCount: 0,
  coldStartTimeMs: null,
};

export function showsReducer(
  state: ShowsState,
  action: ShowsAction,
): ShowsState {
  switch (action.type) {
    case "LOAD_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "LOAD_SUCCESS": {
      const newTotalTime =
        state.totalApiResponseTimeMs + action.payload.apiResponseTimeMs;
      const newCount = state.apiExecutionCount + 1;

      return {
        ...state,
        isLoading: false,
        shows: action.payload.shows,
        totalApiResponseTimeMs: newTotalTime,
        apiExecutionCount: newCount,
        apiResponseTimeMs: Math.round(newTotalTime / newCount),
      };
    }

    case "LOAD_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "CREATE_SHOW":
      return {
        ...state,
        shows: [action.payload, ...state.shows],
      };

    case "UPDATE_SHOW":
      return {
        ...state,
        shows: state.shows.map((show) =>
          show.id === action.payload.id ? action.payload : show,
        ),
      };

    case "DELETE_SHOW":
      return {
        ...state,
        shows: state.shows.filter((show) => show.id !== action.payload),
      };

    case "SET_COLD_START_TIME":
      return {
        ...state,
        coldStartTimeMs: action.payload,
      };

    default:
      return state;
  }
}
