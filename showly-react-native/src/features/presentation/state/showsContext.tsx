import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { Show } from "../../shows/domain/entities/show";
import {
  initialShowsState,
  showsReducer,
  ShowsState,
} from "./showsReducer";
import { TvMazeRemoteDataSource } from "../../shows/data/datasources/tvMazeRemoteDataSource";
import { ShowRepositoryImpl } from "../../shows/data/repositories/showRepositoryImpl";
import { GetShows } from "../../shows/domain/usecases/getShows";
import { now, roundMetric } from "../../../core/utils/performance";

type ShowsContextValue = ShowsState & {
  loadShows: () => Promise<void>;
  createShow: (show: Omit<Show, "id">) => void;
  updateShow: (show: Show) => void;
  deleteShow: (showId: number) => void;
  getShowById: (showId: number) => Show | undefined;
};

const ShowsContext = createContext<ShowsContextValue | undefined>(undefined);

type ShowsProviderProps = {
  children: ReactNode;
};

const appStartedAt = now();

export function ShowsProvider({ children }: ShowsProviderProps) {
  const [state, dispatch] = useReducer(showsReducer, initialShowsState);

  const getShowsUseCase = useMemo(() => {
    const dataSource = new TvMazeRemoteDataSource();
    return new GetShows(new ShowRepositoryImpl(dataSource));
  }, []);

  async function loadShows() {
    try {
      dispatch({ type: "LOAD_START" });

      if (typeof window !== "undefined" && window.performance) {
        window.performance.mark("api-fetch-start");
      }

      const requestStartedAt = now();

      const loadedShows = await getShowsUseCase.execute();

      const requestEndedAt = now();

      if (typeof window !== "undefined" && window.performance) {
        window.performance.mark("api-fetch-end");
        window.performance.measure("API Response Time", "api-fetch-start", "api-fetch-end");
      }

      dispatch({
        type: "LOAD_SUCCESS",
        payload: {
          shows: loadedShows,
          apiResponseTimeMs: roundMetric(requestEndedAt - requestStartedAt),
        },
      });

      const firstFunctionalScreenAt = now();
      dispatch({
        type: "SET_COLD_START_TIME",
        payload: roundMetric(firstFunctionalScreenAt - appStartedAt),
      });
    } catch (error) {
      dispatch({
        type: "LOAD_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Unexpected error loading shows.",
      });
    }
  }

  function createShow(show: Omit<Show, "id">) {
    const newShow: Show = {
      ...show,
      id: Date.now(),
      isLocal: true,
    };
    dispatch({ type: "CREATE_SHOW", payload: newShow });
  }

  function updateShow(show: Show) {
    dispatch({ type: "UPDATE_SHOW", payload: show });
  }

  function deleteShow(showId: number) {
    dispatch({ type: "DELETE_SHOW", payload: showId });
  }

  function getShowById(showId: number) {
    return state.shows.find((show) => show.id === showId);
  }

  useEffect(() => {
    loadShows();
  }, []);

  const value: ShowsContextValue = {
    ...state,
    loadShows,
    createShow,
    updateShow,
    deleteShow,
    getShowById,
  };

  return (
    <ShowsContext.Provider value={value}>{children}</ShowsContext.Provider>
  );
}

export function useShows() {
  const context = useContext(ShowsContext);
  if (!context) {
    throw new Error("useShows must be used within a ShowsProvider");
  }
  return context;
}