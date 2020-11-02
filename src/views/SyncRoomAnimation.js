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

export default class SyncRoomAnimation extends Component{
    constructor(props) {
		super(props);

		this.state = {
			circles: []
		};

		this.counter = 1;
		this.setInterval = null;
		this.anim = new Animated.Value(1);
	}

	componentDidMount() {
		this.setCircleInterval();
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


