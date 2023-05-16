import React, {useCallback, useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import useStyles from '../../hooks/useStyles';
import useApiService from '../../hooks/useApiService';
import useCurrentUser from '../../hooks/useCurrentUser';

/**
 * The page for user login.
 */
function LoginMainPage(): JSX.Element {
  const {setCurrentUser} = useCurrentUser();
  const styles = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useApiService();

  const handleLogin = useCallback(async () => {
    const token = await login(username, password);

    if (token !== '') {
      setCurrentUser({authorizationToken: token});
    }
  }, [login, username, password, setCurrentUser]);

  return (
    <View style={styles.centeredContent}>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

export default LoginMainPage;
