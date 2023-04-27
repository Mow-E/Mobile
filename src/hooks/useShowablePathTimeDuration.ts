import {createContext, useContext} from 'react';

export enum ShowablePathTimeDuration {
  h24,
  h12,
  h3,
}

interface ShowablePathTimeDurationContextType {
  timeDuration: ShowablePathTimeDuration;
  setTimeDuration?: (timeDuration: ShowablePathTimeDuration) => void;
}

export const ShowablePathTimeDurationContext =
  createContext<ShowablePathTimeDurationContextType>({
    timeDuration: ShowablePathTimeDuration.h24,
  });
const useShowablePathTimeDuration = () =>
  useContext(ShowablePathTimeDurationContext);

export default useShowablePathTimeDuration;
