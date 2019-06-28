import React, { Component } from 'react';

import { View, Text, Image, PermissionsAndroid } from 'react-native';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob';
import { TouchableOpacity } from 'react-native-gesture-handler';

class UserProfileScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			modalVisible: false,
			getUrl: '',
			isGetUrl: false,
			avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz2gi2mK7A7oiRNwTrGhyW_f9FhDjOqVst1hL6toluzgAK_Pyb'
		};
	}

	componentDidMount() {
		const recentPostsRef = firebase.database().ref('/UsersDetail');
		recentPostsRef.once('value').then(snapshot => {
			snapshot.forEach(child => {
				if (firebase.auth().currentUser.email === child.val().Email.toLowerCase()) {
					//listArray.push({...child.val(),key:child.key})
					this.userInfo = {
						...child.val(),
						key: child.key
					};
				}
			});
			this.setState({
				loading: true
			});
		});
	}

	uploadImage = uri => {
		const image = uri;

		const Blob = RNFetchBlob.polyfill.Blob;
		const fs = RNFetchBlob.fs;
		// eslint-disable-next-line no-undef
		window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
		// eslint-disable-next-line no-undef
		window.Blob = Blob;
		let uploadBlob = null;
		const imageRef = firebase
			.storage()
			.ref('images')
			.child(firebase.auth().currentUser.email);
		const mime = 'image/jpg';
		fs.readFile(image, 'base64')
			.then(data =>
				Blob.build(data, {
					type: `${mime};BASE64`
				})
			)
			.then(blob => {
				uploadBlob = blob;
				return imageRef.put(blob, {
					contentType: mime
				});
			})
			.then(() => {
				uploadBlob.close();
				return imageRef.getDownloadURL();
			})
			.then(url => {
				// URL of the image uploaded on Firebase storage
				//resolve(url)
				this.setState({
					getUrl: url,
					isGetUrl: true
				});
				//this.storeReference(url)
			})

			.catch(error => {
				console.warn(error);
			});
	};

	storeReference = () => {
		const email = firebase.auth().currentUser.email;
		const userId = email
			.split('@')
			.join('')
			.split('.')
			.join('')
			.split('_')
			.join('');

		if (this.state.isGetUrl) {
			firebase
				.database()
				.ref(`/Image/${userId}`)
				.set({
					url: this.state.getUrl,
					Email: email
				});
		}
	};

	async requestCameraPermission() {
		try {
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				//console.warn('You can use the camera');
				ImagePicker.showImagePicker(null, response => {
					if (response.didCancel) {
						// console.warn('Really ??');
					} else if (response.error) {
						console.warn(response.error);
					} else {
						this.setState({
							avatar: response.uri
						});
						this.uploadImage(response.uri);
					}
				});
			} else {
				console.warn('Camera permission denied');
			}
		} catch (err) {
			console.warn(err);
		}
	}

	addAvatar = () => {
		this.requestCameraPermission();
	};

	render() {
		let username = '';
		let userEmail = '';
		let userDOB = '';

		if (this.state.loading) {
			username = this.userInfo.FirstName;
			userEmail = this.userInfo.Email;
			userDOB = this.userInfo.DOB;
		}

		if (this.state.isGetUrl) {
			this.storeReference();
		}

		return (
			<View style={styles.container}>
				<View style={styles.mainHeader}>
					<Text style={styles.mainHeaderTextStyle}> PROFILE </Text>
				</View>
				<View style={styles.imageHeaderContainer}>
					<View style={styles.imageContainer}>
						<View style={styles.imageViewConatiner}>
							<Image source={{ uri: this.state.avatar }} style={styles.imageStyle} resizeMode="cover" />
							<Icon
								name="edit"
								size={20}
								color="#ff9a3d"
								onPress={() => this.addAvatar()}
								style={styles.imageIconStyle}
							/>
						</View>
					</View>
					<Text style={styles.imageTextStyle}>
						<Text
							style={{
								color: '#ffa859'
							}}
						>
							Hello,
						</Text>
						{username}
					</Text>
				</View>

				<View style={styles.informationContainer}>
					<View style={styles.informationCommonViewContainer}>
						<View style={styles.commonDetailsViewContainer}>
							<Icon name="user" size={25} style={styles.commonDetailsIconContainer} />
							<Text style={styles.commonDetailsText}> NAME </Text>
							<Text
								style={{
									marginLeft: 15
								}}
							>
								: -
							</Text>
							<Text
								style={[
									styles.commonDetailsText,
									{
										marginLeft: 18
									}
								]}
							>
								{username}
							</Text>
						</View>
					</View>

					<View style={styles.informationCommonViewContainer}>
						<View style={styles.commonDetailsViewContainer}>
							<Icon name="envelope" size={23} style={styles.commonDetailsIconContainer} />
							<Text style={styles.commonDetailsText}> Email </Text>
							<Text
								style={{
									marginLeft: 15
								}}
							>
								: -
							</Text>
							<Text
								style={[
									styles.commonDetailsText,
									{
										marginLeft: 18
									}
								]}
							>
								{userEmail}
							</Text>
						</View>
					</View>

					<View style={styles.informationCommonViewContainer}>
						<View style={styles.commonDetailsViewContainer}>
							<Icon name="calendar" size={23} style={styles.commonDetailsIconContainer} />
							<Text style={styles.commonDetailsText}> DOB </Text>
							<Text
								style={{
									marginLeft: 20
								}}
							>
								: -
							</Text>
							<Text
								style={[
									styles.commonDetailsText,
									{
										marginLeft: 18
									}
								]}
							>
								{userDOB}
							</Text>
						</View>
					</View>

					<View style={styles.informationLastViewContainer} />

					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<TouchableOpacity
							onPress={async () => {
								return await firebase.auth().signOut(), this.props.navigation.navigate('Loading');
							}}
							style={styles.logOutView}
						>
							<Text style={styles.logOutTextStyle}> Log Out </Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1
	},

	mainHeader: {
		backgroundColor: '#eeeeee',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		height: '8%',
		borderBottomWidth: 1,
		borderBottomColor: '#949494'
	},

	mainHeaderTextStyle: {
		fontSize: 20,
		fontWeight: '500',
		fontFamily: 'serif',
		color: '#ffa859'
	},

	imageHeaderContainer: {
		height: '42%',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center'
	},

	imageContainer: {
		flexDirection: 'row'
	},

	imageViewConjoiner: {
		width: 160,
		height: 160,
		borderRadius: 160 / 2,
		borderWidth: 2,
		borderColor: '#4e4e4e',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	},

	imageStyle: {
		width: 150,
		height: 150,
		borderRadius: 150 / 2,
		borderWidth: 3
	},

	imageIconStyle: {
		position: 'absolute',
		bottom: 16,
		right: 7
	},

	imageTextStyle: {
		fontSize: 17,
		fontWeight: '500',
		marginBottom: 5,
		marginTop: 7,
		fontFamily: 'serif'
	},

	informationContainer: {
		//flex: 1,
		height: '50%',
		backgroundColor: '#eeeeee'
	},

	informationCommonViewContainer: {
		borderBottomWidth: 1,
		width: '100%',
		height: '18%',
		borderBottomColor: '#ffa859'
	},
	informationLastViewContainer: {
		borderBottomWidth: 1,
		width: '100%',
		height: '28%',
		borderBottomColor: '#949494'
	},
	commonDetailsViewContainer: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row'
	},
	commonDetailsIconContainer: {
		paddingLeft: 10,
		paddingRight: 10
	},
	commonDetailsText: {
		fontSize: 16
	},
	logOutView: {
		paddingTop: 10
	},
	logOutTextStyle: {
		fontSize: 20,
		textAlign: 'center',
		fontWeight: '500',
		fontFamily: 'serif',
		color: '#ffa859'
	}
};

export default UserProfileScreen;
