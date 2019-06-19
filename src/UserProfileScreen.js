import React, { Component } from 'react';
import { View,Text,Image,FlatList } from 'react-native'
import firebase from 'firebase';
class UserProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {store:{},loading:false  };
    }
    componentDidMount(){
        const recentPostsRef = firebase.database().ref('/UsersDetail');
        recentPostsRef.once('value').then(snapshot=>{
            const userObj=snapshot.val();
            userObj.map(data=>{
                console.warn(data)
            })
            this.setState({store:snapshot.val(),loading:true})
            
        })
    }
    renderUserData=()=>{
        if(this.state.loading){
            const {store}=this.state
            console.warn(store)
            // return(
            //     <FlatList data={store} renderItem={({item,index})=><Text>{item.Email}</Text>}>

            //     </FlatList>
            // )
         
        }
    }
    render() {
        
        // firebase.database().ref('UsersDetail/').once('value', function (snapshot) {
        //     console.warn(snapshot.val())
        // });
        return (
            <View style={{flex:1}}>
                <View style={{height:200,backgroundColor:'#ff9a3d',justifyContent:'center',alignItems:'center'}}>
                    {/* <View style={{height:150,alignItems:'center',justifyContent:'center',width:160,backgroundColor:'black',borderRadius:100}}> */}
                 
                    <Image source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Tom_Cruise_avp_2014_4.jpg/170px-Tom_Cruise_avp_2014_4.jpg'}}
                   style={{width: 150,
                    height: 150,
                    borderRadius: 150/2,
                    
                    borderWidth: 3,
                    }}
                   resizeMode='cover'

                    />
                   
                    <Text style={{fontSize:20,fontWeight:'500',marginBottom:5}}>Hello,Anonymous User</Text>                    
                </View>

                <View style={{flex:1,backgroundColor:'green'}}>
                        <Text>Personal Information</Text>
                        {this.renderUserData()}
                </View>
                
            </View>
        );
    }
}

const styles={
    container:{
        flex:1
    }

}
export default UserProfileScreen;