import React, { Component } from 'react' ;
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native' ;
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


class Post extends React.Component {
    constructor(){
        super();
        this.state = {
            posts: []
        };
        this.getPost();
        
    }


    deletePost = () => {
        firebase.firestore()
        .collection('posts')
        .doc('hp')
        .delete()
        .then(() => {
            console.log('User deleted!');
        });
    }

    getPost = async () => {
        try {
            const snap = await firebase
                .firestore()
                .collection('posts')
                .onSnapshot(snap => {
                    let docs = [];
                    snap.forEach(doc => docs.push({ ...doc.data(), id: doc.id}));
                    this.setState({ posts: docs});
                    console.log(this.state.posts);
                });
        } catch (error) {}
    }


    
    render() {
        return (
            <View>
                <ScrollView>
                    {this.state.posts.map(data => {
                        return (
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}} >
                                <Text>Nama Produk   : {data.namaProduk}</Text>
                                <Text>Harga         : {data.harga}</Text>
                                <Text>Jumlah        : {data.jumlah}</Text>
                                <Image source={{uri: data.image}} style={{height: 200, width: 200}} />
                                <TouchableOpacity 
                                style={styles.button} onPress={() => this.deletePost('data.id')} >
                                    <Text style={styles.buttontext}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                    
                </ScrollView>
            </View>
        )
    }

}

export default Post

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