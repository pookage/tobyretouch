import React, { Component } from "react";
import { AppContext } from "Components/App/AppContext.js";
import Mosiac from "Components/Mosaic/Mosaic.jsx";
import Gallery from "Components/Gallery/Gallery.jsx";
import shared from "Shared/shared.css";
import s from "Components/App/App.css";

export default class App extends Component {

	//LIFECYCLE JAZZ
	//---------------------------------
	constructor(...args){
		super(...args);

		this.toggleGallery = this.toggleGallery.bind(this);

		const {
			sizes, galleries, activeGallery
		} = AppContext._currentValue;

		this.state = {
			sizes,
			galleries,
			activeGallery
		};
	}//constructor


	//UTILS
	//---------------------------
	toggleGallery(id){
		const activeGallery = id ? this.state.galleries.find(gallery => gallery.id == id) : null;

		console.log({ activeGallery });
		this.setState({ activeGallery })
	}//toggleGallery


	//RENDER FUNCTIONS
	//---------------------------
	render(){

		const {
			sizes,
			galleries,
			activeGallery
		} = this.state;

		const data = {
			sizes,
			galleries,
			activeGallery,
			toggleGallery: this.toggleGallery
		};

		return(
			<AppContext.Provider value={data}>
				<Mosiac />
				{activeGallery && <Gallery />}
			</AppContext.Provider>
		);
	}//render

}