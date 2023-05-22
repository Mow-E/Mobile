import {get, store} from '../services/storage';

export const SHOWABLE_TIME_DURATION_STORAGE_KEY = 'showable_time_duration';
export const LANGUAGE_STORAGE_KEY = 'language';
export const APP_COLOR_MODE_STORAGE_KEY = 'app_color_mode';
export const MOWER_MODE_STORAGE_KEY = 'mower_mode';
export const LOGGED_IN_USER_STORAGE_KEY = 'logged_in_user';

/**
 * Provides functions to access the apps storage.
 */
function useStorageService() {
  return {get, store};
}

export default useStorageService;
