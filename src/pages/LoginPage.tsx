import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import useStyles from '../hooks/useStyles';
import useLoginFunction from '../ApiCalls';

/**
 * The page for user login.
 */
function LoginPage(): JSX.Element {
  const styles = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const HandleLogin = () => {
    useLoginFunction(username, password);
  };

  return (
    <View style={styles.centeredContent}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={HandleLogin} />
    </View>
  );
}

export default LoginPage;
