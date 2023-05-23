import MowerConnection from '../models/MowerConnection';

/**
 * The root (main) routes of the application.
 */
export type RootRoutes = {
  /**
   * The map screen.
   */
  Map: undefined;
  /**
   * The mower connections screen.
   */
  MowerConnections: undefined;
  /**
   * The settings screen.
   */
  Settings: undefined;
  /**
   * The image history screen.
   */
  ImageHistory: undefined;
};

/**
 * The routes inside the `MowerConnections` root route.
 */
export type MowerConnectionsRoutes = {
  /**
   * The screen showing the available mower connections.
   */
  MowerConnectionsList: undefined;
  /**
   * The screen showing details of a specific mower connection.
   */
  MowerConnectionDetails: {connection: MowerConnection | null};
};

/**
 * The routes inside the "Settings" root route.
 */
export type SettingsRoutes = {
  /**
   * The screen showing the available settings.
   */
  SettingsMain: undefined;
  /**
   * The screen is showing the available time durations.
   */
  SettingsTimeDuration: undefined;
  /**
   * The screen is showing the available languages.
   */
  SettingsLanguage: undefined;
};

/**
 * The routes for the login behaviour.
 */
export type LoginRoutes = {
  /**
   * The screen showing the login form if no user is logged-in.
   */
  LoginMain: undefined;
  /**
   * The screen showing the user registration form.
   */
  LoginRegister: undefined;
};
