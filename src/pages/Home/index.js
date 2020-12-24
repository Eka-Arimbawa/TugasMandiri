import React, { Component } from 'react' ;
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native' ;
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
var ImagePicker = require('react-native-image-picker');
// import ImagePicker from 'react-native-image-picker';

class Home extends React.Component {
    constructor(){
        super();
        this.state = {
            namaProduk : '',
            harga: '',
            berat: '',
            image: null
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
                berat: '',
                image: null
            })
    }

    pickImage = () => {
        const options = {
            quality: 0.5,
            maxHeight: 200,
            maxWidth: 200,
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.data) {
                this.setState({
                    image: 'data:image/jpeg;base64,' + response.data
                });
            }
        });
    };



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
                    placeholder="Jumlah"
                    keyboardType="number-pad"
                    style={styles.inputtext}
                    onChangeText={this.inputValue('berat')}
                    value={this.state.berat} />
                </View>

                <TouchableOpacity 
                style={styles.button} onPress={this.pickImage.bind(this)} >
                    <Text style={styles.buttontext}>Upload Image</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.button} onPress={this.saveData} >
                    <Text style={styles.buttontext}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.button} onPress={() => this.props.navigation.navigate('Post')} >
                    <Text style={styles.buttontext}>Post</Text>
                </TouchableOpacity>

                <Image
            source={{ uri: image.uri }}
            style={{ width: 300, height: 300 }}
          />
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
        // marginBottom: 30
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