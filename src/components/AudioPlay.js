import React, {Component} from 'react';

export default class AudioPlay extends Component {
	render() {
		return (
			<audio controls>
				<source src={this.props.value} type="audio/mp3"/>
			</audio>
		);
	}
}
