import React, { Component } from 'react' ;
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native' ;
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class Home extends React.Component {
    constructor(){
        super();
        this.state = {
            namaProduk : '',
            harga: '',
            berat: ''
        }
    }

    inputValue = field => text => {
        this.setState({
            [field]: text
        });
    }

    saveData = () => {
        firestore()
            .collection('Xiaomi')
            // .doc('redmi')
            .add(this.state);
            this.setState({
                namaProduk: '',
                harga: '',
                berat: ''
            })
    }



    render() {
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}} >
                <Text style={{fontSize: 30, marginBottom: 20}} >Input Produk</Text>
                <View style={styles.boxtextinput}>
                    <TextInput 
                    placeholder="Nama Produk"
                    style={styles.inputtext}
                    onChangeText={this.inputValue('namaProduk') }
                    value={this.state.namaProduk} />
                </View>
                <View style={styles.boxtextinput}>
                    <TextInput 
                    placeholder="Harga"
                    keyboardType="number-pad"
                    style={styles.inputtext}
                    onChangeText={this.inputValue('harga')}
                    value={this.state.harga} />
                </View>
                <View style={styles.boxtextinput}>
                    <TextInput 
                    placeholder="Harga"
                    keyboardType="number-pad"
                    style={styles.inputtext}
                    onChangeText={this.inputValue('berat')}
                    value={this.state.berat} />
                </View>
                <TouchableOpacity 
                style={styles.button} onPress={this.saveData} >
                    <Text style={styles.buttontext}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Home;

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