import React, {Component,} from "react";
import PropTypes from 'prop-types';
import {
    View,
    TouchableOpacity,
	Animated,
	Easing
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {swOrange, swGrey} from "../styles/Colors";
import Pulse from '../components/Pulse';
import firebase from 'firebase';
import {
  	FIREBASE_API_KEY,
  	FIREBASE_AUTH_DOMAIN,
  	FIREBASE_DB_URL,
  	FIREBASE_STORAGE_BUCKET,
  	FIREBASE_PROJECT_ID,
  	FIREBASE_APP_ID,
	TMDB_KEY
} from '@env';
const firebase_config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DB_URL,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    projectId: FIREBASE_PROJECT_ID,
    appId: FIREBASE_APP_ID,
};

!firebase.apps.length ? firebase.initializeApp(firebase_config) : firebase.app();
const firestore = firebase.firestore();

const members = {

};

export default class SyncRoomAnimation extends Component{
    constructor(props) {
		super(props);

		this.state = {
			circles: [],
			loading: false,
			movie_recommendations: []
		};

		this.counter = 1;
		this.setInterval = null;
		this.anim = new Animated.Value(1);
		;
	}

	componentDidMount() {
		this.setCircleInterval();
		this.get_recommendations(members);
	}

	get_recommendations = (members_list) => {
    	this.setState({loading:true});
    	var i;
    	for(i = 0; i < members_list.length; i++){
    		firestore
				.collection("watchList")
				.where("creatorID", "==", members_list[0])
				.get()
				.then(results => {
					var randomMovieID = Math.floor(Math.random() * 100);

					if(!results.empty){
						randomMovieID = results.movies[Math.floor(Math.random() * results.movies.length)]
					}

					this.get_and_add_to_recommendations(randomMovieID);
				})

		}
    	this.setState({loading:false});
	}

	get_and_add_to_recommendations = (randomMovieID) =>{
    	const requestStr = "https://api.themoviedb.org/3/movie/" + randomMovieID + "/recommendations" + "?api_key=" + TMDB_KEY;
    	fetch(requestStr)
            .then(res => res.json())
            .then(results => {
            	var rec = this.state.movie_recommendations.concat(results);
                this.setState({
                    recommendations: rec,
                });
            }).catch((error)=> {
                console.log("Error!: " + error);
                this.setState({loading: false });
            })
	}



	setCircleInterval() {
		this.setInterval = setInterval(this.addCircle.bind(this), this.props.interval);
		this.addCircle();
	}

	addCircle() {
		this.setState({ circles: [...this.state.circles, this.counter] });
		this.counter++;
	}

	onPressIn() {
		Animated.timing(this.anim, {
			toValue: this.props.pressInValue,
			duration: this.props.pressDuration,
			easing: this.props.pressInEasing,
			useNativeDriver: true,
		}).start(() => clearInterval(this.setInterval));
	}

	onPressOut() {
		Animated.timing(this.anim, {
			toValue: 1,
			duration: this.props.pressDuration,
			easing: this.props.pressOutEasing,
			useNativeDriver: true,
		}).start(this.setCircleInterval.bind(this));
	}

	render() {
		const { size, interval } = this.props;

		return (
			<View style={{
				flex: 1,
				backgroundColor: swGrey,
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				{this.state.circles.map((circle) => (
					<Pulse
						key={circle}
						{...this.props}
					/>
				))}

				<TouchableOpacity
					activeOpacity={1}
					onPressIn={this.onPressIn.bind(this)}
					onPressOut={this.onPressOut.bind(this)}
					style={{
						transform: [{
							scale: this.anim
						}]
					}}
				>
					<MaterialCommunityIcons styles={{justifyContent: 'center', alignItems: 'center'}} name="infinity" size={90} color={'white'}/>
				</TouchableOpacity>
			</View>
		);
	}
}

SyncRoomAnimation.propTypes = {
  interval: PropTypes.number,
  size: PropTypes.number,
  pulseMaxSize: PropTypes.number,
  pressInValue: PropTypes.number,
  pressDuration: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  getStyle: PropTypes.func,
};

SyncRoomAnimation.defaultProps = {
  interval: 2000,
  size: 100,
  pulseMaxSize: 300,
  pressInValue: 0.8,
  pressDuration: 150,
  pressInEasing: Easing.in,
  pressOutEasing: Easing.in,
  borderColor: swOrange,
  backgroundColor: swOrange,
  getStyle: undefined,
};


