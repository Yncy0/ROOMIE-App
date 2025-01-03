import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, Image } from 'react-native'
import { supabase } from "@/utils/supabase";
import { Button, Input } from '@rneui/themed'
import { Redirect, Stack } from 'expo-router';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  // async function signUpWithEmail() {
  //   setLoading(true)
  //   const {
  //     data: { session },
  //     error,
  //   } = await supabase.auth.signUp({
  //     email: email,
  //     password: password,
  //   })

  //   if (error) Alert.alert(error.message)
  //   if (!session) Alert.alert('Please check your inbox for email verification!')
  //   setLoading(false)
  // }

  return (
    <View 
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        gap: 75
      }}>
      <Stack.Screen options={{ headerShown: false }}/>
      <View style={{ paddingHorizontal: 10 }}>
        <Image 
          source={require('@/assets/images/login-pana1.png')}
          style={{
            width: 200,
            height: 200,
            alignSelf: 'center',
          }}
        />
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope', size: 16 }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          inputStyle={{fontSize: 16, }}
          inputContainerStyle={{
            borderBottomWidth: 0, 
            backgroundColor: '#f2f2f2', 
            paddingHorizontal: 10,
            borderRadius: 50
          }}
        />
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          inputStyle={{fontSize: 16, }}
          inputContainerStyle={{
            borderBottomWidth: 0, 
            backgroundColor: '#f2f2f2', 
            paddingHorizontal: 10,
            borderRadius: 50
          }}
        />
      </View>
      <Button 
        title="Sign in" 
        disabled={loading} 
        onPress={() => signInWithEmail()} 
        containerStyle={{borderRadius: 50, marginHorizontal: 20}}
      />
      {/* <Button 
        title="Sign up" 
        disabled={loading} 
        onPress={() => signUpWithEmail()} 
        containerStyle={{borderRadius: 50}}
      /> */}
    </View>
  )
}

