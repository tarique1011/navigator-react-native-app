import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { View, Text, Image, Button, PermissionsAndroid } from 'react-native';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

class UserProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            modalVisible: false,
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Tom_Cruise_avp_2014_4.jpg/170px-Tom_Cruise_avp_2014_4.jpg'
        };
    }



    componentDidMount() {
        const recentPostsRef = firebase.database().ref('/UsersDetail');
        recentPostsRef.once('value').then(snapshot => {
            snapshot.forEach(child => {
                if (firebase.auth().currentUser.email === child.val().Email.toLowerCase()) {
                    //listArray.push({...child.val(),key:child.key})
                    this.userInfo = { ...child.val(), key: child.key };
                }
            });
            this.setState({ loading: true });
        });
    }

    async requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.warn('You can use the camera');
            ImagePicker.showImagePicker(null, response => {
                if (response.didCancel) {
                    console.warn('Really ??');
                } else if (response.error) {
                    console.warn(response.error);
                } else {
                       this.setState({ avatar: response.uri });
                }
            });
          } else {
            console.warn('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    
       
    addAvatar= () => {
        this.requestCameraPermission();
    }

    handleLogOut() {
        firebase
            .auth()
            .signOut();
        const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Loading' })]
		});
		this.props.navigation.dispatch(resetAction);
    }

    render() {
        console.warn(this.userInfo);
        console.warn(firebase.currentUser);
        let username = '';
        let userEmail = '';
        let userDOB = '';

        if (this.state.loading) {
            username = this.userInfo.FirstName;
            userEmail = this.userInfo.Email;
            userDOB = this.userInfo.DOB;
        }

        return (
                
        <View style={styles.container}>
             <View style={styles.headerContainer}>
                <View style={styles.imageContainer}>
                  <Image 
                   source = {{ uri: this.state.avatar }}
                        style={styles.imageStyle}
                        resizeMode='cover'
                  />
                  <Icon 
                     name="edit" 
                     size={20} 
                     color='white' 
                     onPress={() => this.addAvatar()} 
                     style={styles.ImageiconStyle}
                  />
                </View>
                <Text style={styles.ImageTextSyle}>Hello,{username}</Text>
              </View>

              <View style={styles.informationContainer}>
                <View style={styles.informationViewStyle}>
                    <Text style={styles.informationHeadingStyle}>Personal Information</Text>
                    <View style={styles.UserInformationViewStyle}>
                        <Text style={styles.userInformatinTextStyle}>Name:{username}</Text>
                    </View>
                    <View style={styles.UserInformationViewStyle}>
                        <Text style={styles.userInformatinTextStyle}>Email:{userEmail}</Text>
                    </View>
                    <View style={styles.UserInformationViewStyle}>
                       <Text style={styles.userInformatinTextStyle}>DOB:{userDOB}</Text>
                    </View>
                 </View>
               </View>
              <Button title="sign Out" onPress={() => this.handleLogOut()} />
                
            </View>


        );
    }
}

const styles = {

    container: {
        flex: 1
    },

    headerContainer: {
        height: '35%', 
        backgroundColor: '#ff9a3d', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },

    imageContainer: {
        flexDirection: 'row'
    },
    
    imageStyle: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        borderWidth: 3,
    },

    ImageiconStyle: {
        position:'absolute', 
        bottom:16,
        right:7
    },

    ImageTextSyle: {
        fontSize: 20, 
        fontWeight: '500', 
        marginBottom: 5, 
        marginTop: 2
    },

    informationContainer: {
        flex: 1, 
        backgroundColor: '#ffaf00', 
        justifyContent: 'space-between', 
        padding: 10 
    },
    
    informationViewStyle: {
        backgroundColor: '#ffaf5f', 
        borderRadius: 20, 
        padding: 10, 
        justifyContent: 'space-around' 
    },

    informationHeadingStyle: {
        textAlign: 'center', 
        fontSize: 25, 
        color: 'white', 
        paddingBottom: 10
    },

    userInformationViewStyle: {
        paddingVertical: 15, backgroundColor: '#808080', 
        marginBottom: 5, 
        borderRadius: 5, 
        paddingLeft: 5, 
        justifyContent: 'center' 
    },
    
    userInformatinTextStyle : {
        fontSize: 17, 
        fontWeight: '500', 
        color: 'white'
    }
};

export default UserProfileScreen;
