import React, { Component } from 'react';

class explainBindingsComponent extends Component {
	constructor(props) {
		super( props );
		this.state = {
			name: 'Lamborgini MasLando'
		};
		// avoid it: because it will clutter your constructor over time. The constructor is only there to instantiate your class with all its properties. That's why 
		// this.onClickMe = function() {
		// 	console.log( this );
		// }


		// Proper way bound this:
		this.onClickMe = this.onClickMe.bind( this );
		this.doSomething = this.doSomething.bind( this );
		this.doSomethingElse = this.doSomethingElse.bind( this );

	}
	onClickMe() {
		console.log( this );
	}
	doSomething() {
		// do something
	}
	doSomethingElse() {
		// do something else
	} 

	// Last but not least, it is worth to mention that class method can be autobound automatically without binding them explicitly by using JavaScript ES6 arrow functions.
	sayNameState = ( name ) => {
		console.log( this.state.name + ' ' + name);
	}

	render() {
		return (
			<div>
			{/*avoid it: because it would bind the class method every time when the render() methods runs.
			<button onClick={this.onClickMe.bind( this )} type='button'>
				Click Me Bruh!
			</button>*/}
			<button onClick={this.onClickMe} type='button'>
				Click Me Bruh!
			</button>
			<button onClick={function() {this.sayNameState('ganteng')}.bind( this ) } type='button'>
				SaysMyName
			</button>
			</div>
		);
	}
}

export default explainBindingsComponent;