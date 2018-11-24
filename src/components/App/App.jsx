import React, { Component } from "react";
import { AppContext } from "Components/App/AppContext.js";
import Mosiac from "Components/Mosaic/Mosaic.jsx";
import s from "Components/App/App.css";

export default class App extends Component {

	//LIFECYCLE JAZZ
	//---------------------------------
	constructor(...args){
		super(...args);

		const {
			sizes, galleries
		} = AppContext._currentValue;

		this.state = {
			sizes,
			galleries
		};
	}//constructor

	//RENDER FUNCTIONS
	//---------------------------
	render(){

		const {
			sizes,
			galleries
		} = this.state;

		const data = {
			sizes,
			galleries
		};

		return(
			<AppContext.Provider value={data}>
				<Mosiac />
			</AppContext.Provider>
		);
	}//render

}