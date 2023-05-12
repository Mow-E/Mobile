import {Text, View} from 'react-native';
import React, {useEffect} from 'react';

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

interface LoginFunctionProps {
  username: string;
  password: string;
}

function useLoginFunction({username, password}: LoginFunctionProps) {
  useEffect(() => {
    fetchLoginData(username, password);
  }, [username, password]);

  return (
    <View>
      <Text>MapPage</Text>
    </View>
  );
}

export default useLoginFunction;
