import {createContext, useContext} from 'react';

export enum ShowablePathTimeDuration {
  h24 = '24hours',
  h12 = '12hours',
  h3 = '3hours',
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
