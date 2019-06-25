import React, { Component } from 'react';
import { View, Text,PermissionsAndroid,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
class OrderInTransit extends Component {

    constructor(props){
        super(props);
        this.state={
            loading:false,
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Tom_Cruise_avp_2014_4.jpg/170px-Tom_Cruise_avp_2014_4.jpg'
        }
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
                    //alert('Do you want to Upload Image Later ?')
                    console.warn('Really ??');
                } else if (response.error) {
                    console.warn(response.error);
                } else {
                       this.setState({ avatar: response.uri });
                       
    
                       console.warn(this.state.avatar);
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
    render() {

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Transition Screen</Text>
                <Image source = {{ uri: this.state.avatar }}
                        style={{height:100,width:100}}
                        resizeMode='cover'/>
                <TouchableOpacity onPress={()=>this.addAvatar()}><Text>Image</Text></TouchableOpacity>
            </View>
        );
    }
}

export default OrderInTransit;
