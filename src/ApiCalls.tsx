const baseApi = 'http://49.12.44.36:8080';
const loginApi = `${baseApi}/auth/login`;

const fetchLoginData = async (username: string, password: string) => {
  try {
    const response = await fetch(loginApi, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username,
        password: password,
        // expiresInMins: 60, // optional
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

function useLoginFunction(username: string, password: string) {
  fetchLoginData(username, password);
}

export default useLoginFunction;
