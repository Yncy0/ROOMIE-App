import { supabase } from "@/utils/supabase";
import React from "react";
import { Alert, AppState, View, StyleSheet } from "react-native";
import { Button, Input } from '@rneui/themed'; 



AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});


export default function Auth() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    return (
        <View style={styles.container}>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Input
              label="Email"
              leftIcon={{ type: 'font-awesome', name: 'envelope' }}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Input
              label="Password"
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={'none'}
            />
          </View>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
          </View>
          {/* <View style={styles.verticallySpaced}>
            <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
          </View> */}
        </View>
    )
}
    
    const styles = StyleSheet.create({
      container: {
        marginTop: 40,
        padding: 12,
      },
      verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
      },
      mt20: {
        marginTop: 20,
      },
    })
