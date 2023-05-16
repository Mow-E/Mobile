import React, {useCallback, useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import useStyles from '../../hooks/useStyles';
import useApiService from '../../hooks/useApiService';
import useCurrentUser from '../../hooks/useCurrentUser';
//import Button from '../../components/common/Button';

/**
 * The page for user registration.
 */
function RegistrationPage(): JSX.Element {
  const {setCurrentUser} = useCurrentUser();
  const styles = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmedPassword] = useState('');
  const {register} = useApiService();

  const handleRegistration = useCallback(async () => {
    if (password === confirmPassword) {
      const token = await register(username, password);

      if (token !== '') {
        setCurrentUser({authorizationToken: token});
      }
    }
  }, [register, username, password, confirmPassword, setCurrentUser]);

  return (
    <View style={styles.centeredContent}>
      <TextInput
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
      <TextInput
        style={styles.textInput}
        placeholder="Confirm password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={text => setConfirmedPassword(text)}
      />
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
}

export default RegistrationPage;
