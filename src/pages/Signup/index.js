import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: '',
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
            Alert.alert('Silakan input data untuk daftar!')
        } else {
            this.setState({
                isLoading: true,
            })

            auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                res.user.updateProfile({
                    userName: this.state.userName
                })
                console.log('Berhasil daftar!')
                this.setState({
                    isLoading: false,
                    userName: '',
                    email: '',
                    password: ''
                })
                this.props.navigation.navigate('Login')
            })
            .catch(error => this.setState({
                errorMessage: error.message
            }))
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="small" color="#8bc01e">
                        <Text>Akun berhasil dibuat</Text>
                        <Text>Kembali ke halaman login</Text>
                    </ActivityIndicator>
                </View>
            )
        }

        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}} >
                <Text style={{fontSize: 30, marginBottom: 20}} >Sign Up</Text>
                <View style={styles.boxtextinput}>
                    <TextInput 
                    placeholder="Username"
                    style={styles.inputtext}
                    onChangeText={(val) => this.inputValue(val, 'userName')} />
                </View>
                <View style={styles.boxtextinput}>
                    <TextInput 
                    placeholder="Email"
                    keyboardType="email-address"
                    style={styles.inputtext}
                    onChangeText={(val) => this.inputValue(val, 'email')} />
                </View>
                <View style={styles.boxtextinput}>
                    <TextInput 
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.inputtext}
                    onChangeText={(val) => this.inputValue(val, 'password')} />
                </View>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => this.buttonAction()} >
                    <Text style={styles.buttontext}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    } 
}

export default Signup;


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