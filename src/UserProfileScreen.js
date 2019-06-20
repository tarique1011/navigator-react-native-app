import React, { Component } from 'react';
import { View,Text,Image,FlatList } from 'react-native'
import firebase from 'firebase';


class UserProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            Name:'',
            Email:'',
            DOB:'',
            listArray:[],
            user:''  };
        
            let a;
    }
    
   
    componentDidMount(){
        const username=this.props.navigation.getParam('username', 'Peter');
        const currentusername=this.props.navigation.getParam('currentUser', 'current');
        const recentPostsRef = firebase.database().ref('/UsersDetail');
        recentPostsRef.once('value').then(snapshot=>{
            let listArray=[]
            snapshot.forEach(child=> {
                if(currentusername==child.val().Email.toLowerCase()||username==child.val().Email.toLowerCase() )
                {
                
                listArray.push({...child.val(),key:child.key})
                 this.a={...child.val(),key:child.key}
                 //a.DOB
                }                        
            });
        
            this.setState({loading:true,listArray})
            
        })
    
    }
  
  
    

    

    render() {
        let username='';
        let userEmail='';
        let userDOB=''

        if(this.state.loading){
            username=this.a.FirstName;
            userEmail=this.a.Email;
            userDOB=this.a.DOB;
        }
    
        // this.state.listArray.map(item=>{
        //     console.warn(item.Email)
        // })
       
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
                   
                    <Text style={{fontSize:20,fontWeight:'500',marginBottom:5}}>Hello,{username}</Text>                    
                </View>

                <View style={{flex:1,backgroundColor:'green'}}>
                        <Text>Personal Information</Text>
                        
                       <View>
                           <Text>Name:{username}</Text>
                       </View>
                       <View>
                           <Text>Email:{userEmail}</Text>
                       </View>
                       <View>
                           <Text>DOB:{userDOB}</Text>
                       </View>
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