import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  currentVideo:null,
  loading: false,
  error: null,
};
export const VideoContext = createContext(INITIAL_STATE);

const VideoReducer = (state, action) => {
  switch (action.type) {
    case "VIDEO_START":
      return {
        currentVideo: null,
        loading: true,
        error: null,
      };
    case "VIDEO_SUCCESS":
      return {
        currentVideo: action.payload,
        loading: false,
        error: null,
      };
    case "VIDEO_FAILED":
      return {
        currentVideo: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const VideoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(VideoReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("vidoe", JSON.stringify(state.currentVideo));
  }, [state.currentVideo]);
  return (
    <VideoContext.Provider
      value={{
        currentVideo: state.currentVideo,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
