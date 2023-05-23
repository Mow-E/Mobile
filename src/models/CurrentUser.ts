/**
 * The data of the current logged-in user.
 */
interface CurrentUser {
  /**
   * The token to authorize the user, e.g. in a web api.
   */
  authorizationToken: string;
}

export default CurrentUser;
