import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
    }

    inputValue = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    buttonAction = () => {
        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Silakan masukan email dan password!')
        } else {
            this.setState({
                isLoading: true
            })
                auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    console.log(res)
                    console.log('Login berhasil!')
                    this.setState({
                        isLoading: false,
                        email: '',
                        password: ''
                    })
                    this.props.navigation.replace('Home')
                })
                .catch(error => this.setState( {errorMessage: error.message }))
                
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="small" color="#8bc01e" />
                    <Text>Dalam proses....</Text>
                </View>
            )
        }


        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}} >
                <Text style={{fontSize: 30, marginBottom: 20}} >Log In</Text>
                <View style={styles.boxtextinput}>
                    <TextInput 
                    placeholder="Email"
                    keyboardType="email-address"
                    style={styles.inputtext}
                    onChangeText={(val) => this.inputValue(val, 'email') } />
                </View>
                <View style={styles.boxtextinput}>
                    <TextInput 
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.inputtext}
                    onChangeText={(val) => this.inputValue(val, 'password')} />
                </View>
                <TouchableOpacity 
                style={styles.button} onPress={() => this.buttonAction()} >
                    <Text style={styles.buttontext}>Log In</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{color: '#585b51', fontWeight: 'bold', fontSize: 15}} >Belum punya akun?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')} >
                        <Text style={{color: '#8bc01e', fontWeight: 'bold', fontSize: 15}} > Buat akun baru</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Login;


const styles = StyleSheet.create({
    boxtextinput: {
        width: '90%',
        marginHorizontal: 20,
        height: 50,
        borderColor: '#8bc01e',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10, 
        marginBottom: 8
    }, 
    inputtext: {
        width: '100%',
        color: '#8bc01e'
    },
    button: {
        width: '90%',
        marginHorizontal: 20,
        height: 50,
        backgroundColor: '#8bc01e',
        paddingHorizontal: 10,
        borderRadius: 10, 
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        marginBottom: 30
    },
    buttontext: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    loading: {
        flex: 1,
        // position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '100%'
    }
})