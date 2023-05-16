/** The base url of the API */
const BASE_URL = 'http://mow-e.me:80';
/** The url to the login endpoint */
export const LOGIN_URL = `${BASE_URL}/auth/login`;

/**
 * Fetches the given url with an added authorization token (if given).
 */
export async function fetchWithAuthorization(
  url: string,
  body: object = {},
  method: 'GET' | 'POST' = 'GET',
  authorizationToken?: string,
): Promise<Response> {
  if (authorizationToken === undefined) {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
    body: JSON.stringify(body),
  });
}
