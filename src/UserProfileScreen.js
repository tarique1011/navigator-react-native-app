import React, { Component } from 'react';

import { View, Text, Image, Button } from 'react-native'
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

class UserProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            modalVisible: false,
            avatar:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Tom_Cruise_avp_2014_4.jpg/170px-Tom_Cruise_avp_2014_4.jpg'
        };
    }


    componentDidMount() {
        const recentPostsRef = firebase.database().ref('/UsersDetail');
        recentPostsRef.once('value').then(snapshot => {
            snapshot.forEach(child => {
                if (firebase.auth().currentUser.email == child.val().Email.toLowerCase()) {
                    //listArray.push({...child.val(),key:child.key})
                    this.userInfo = { ...child.val(), key: child.key }
                }
            });
            this.setState({ loading: true })

        })

    }
       
    addAvatar=()=>{
        ImagePicker.showImagePicker(null,response=>{
            if(response.didCancel){
                console.warn('Really ??')
    
            }else if(response.error){
                console.warn(response.error)
    
            }else{
                   this.setState({avatar:response.uri})
                   
                //    firebase.database().ref('/UsersDetail').push({
                    
                //     Image: this.state.avatar
                // }).catch((error) => alert(error));
                   console.warn(this.state.avatar)
            }
        })
    }




    render() {
      //  console.warn(firebase.auth().cu)
        let username = '';
        let userEmail = '';
        let userDOB = '';

        if (this.state.loading) {
            username = this.userInfo.FirstName;
            userEmail = this.userInfo.Email;
            userDOB = this.userInfo.DOB;
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: '35%', backgroundColor: '#ff9a3d', justifyContent: 'center', alignItems: 'center' }}>

                  <View style={{flexDirection:'row'}}>
                  <Image source={{ uri: this.state.avatar }}
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: 150 / 2,
                            borderWidth: 3,
                        }}
                        resizeMode='cover'

                    />
                    <Icon name="edit" size={20} color='white' onPress={()=>this.addAvatar()} style={{position:'absolute', bottom:16,right:7}}/>
                  </View>
                    <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 5, marginTop: 2 }}>Hello,{username}</Text>
                </View>

                <View style={{ flex: 1, backgroundColor: '#ffaf00', justifyContent: 'space-between', padding: 10 }}>
                    <View style={{ backgroundColor: '#ffaf5f', borderRadius: 20, padding: 10, justifyContent: 'space-around' }}>
                        {/* <View style={{paddingVertical:15,backgroundColor:'#00d7ff',marginBottom:5,borderRadius:5,paddingLeft:5,justifyContent:'center'}}> */}
                        <Text style={{ textAlign: 'center', fontSize: 25, color: 'white', paddingBottom: 10 }}>Personal Information</Text>

                        <View style={{ paddingVertical: 15, backgroundColor: '#808080', marginBottom: 5, borderRadius: 5, paddingLeft: 5, justifyContent: 'center' }}>

                            <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Name:{username}</Text>
                        </View>
                        <View style={{ paddingVertical: 15, backgroundColor: '#808080', marginBottom: 5, borderRadius: 5, paddingLeft: 5, justifyContent: 'center' }}>


                            <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Email:{userEmail}</Text>
                        </View>
                        <View style={{ paddingVertical: 15, backgroundColor: '#808080', marginBottom: 5, borderRadius: 5, paddingLeft: 5, justifyContent: 'center' }}>


                            <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>DOB:{userDOB}</Text>
                        </View>

                    </View>
                </View>
                <Button title="sign Out" onPress={async ()=>{return( await firebase.auth().signOut(),this.props.navigation.navigate('Loading'))}}/>
                
            </View>


        );
    }
}

export default UserProfileScreen;
