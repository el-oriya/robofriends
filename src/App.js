import React from 'react';
import Cardlist from './Cardlist';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import './App.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			Searchfield: '',
		};
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => {
				return response.json();
			})
			.then((users) => {
				this.setState({ robots: users });
			});
	}

	onSearchChange = (event) => {
		this.setState({ Searchfield: event.target.value });
	};

	render() {
		const filteredRobots = this.state.robots.filter((robot) => {
			return robot.name
				.toLowerCase()
				.includes(this.state.Searchfield.toLowerCase());
		});

		if (this.state.robots.length === 0) {
			return <h1>Loading</h1>;
		} else {
			return (
				<div className='tc'>
					<h1 className='f1'>Robofriends</h1>
					<SearchBox searchChange={this.onSearchChange} />
					<Scroll>
						<Cardlist robots={filteredRobots} />
					</Scroll>
				</div>
			);
		}
	}
}

export default App;
