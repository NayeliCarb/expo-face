import React, { Component } from 'react';
import { Alert, Button, Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import Expo from 'expo';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Hello there!
        </Text>
        <Button onPress={logIn} title="Sign in to Facebook" />
      </View>
    );
  }
}

async function logIn() {
  const {
    type,
    token,
  } = await Expo.Facebook.logInWithReadPermissionsAsync('288424861584897', {
    permissions: ['public_profile'],
  });

  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`
    );
    Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
