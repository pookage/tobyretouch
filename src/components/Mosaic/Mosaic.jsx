import React, { Component } from "react";
import { AppContext } from "Components/App/AppContext.js";
import { MosaicContext } from "Components/Mosaic/MosaicContext.js";
import GalleryPreview from "Components/GalleryPreview/GalleryPreview.jsx";
import s from "Components/Mosaic/Mosaic.css";

class MosaicComp extends Component {

	//LIFECYCLE JAZZ
	//----------------------------------
	constructor(...args){
		super(...args);

		this.toggleOverlay = this.toggleOverlay.bind(this);

		this.state = {
			showOverlay: false
		};
	}//constructor



	//UTILS
	//-----------------------------------
	toggleOverlay(showOverlay){
		this.setState({ showOverlay });
	}//toggleOverlay


	//RENDER FUNCTIONS
	//-----------------------------------
	renderGalleryPreview(data, index){
		const {
			photographer,
			name,
			images,
			id
		} = data;

		const safeName         = name.replace(/ /g,"_").replace(/'/g,"");
		const safePhotographer = photographer.replace(/ /g,"_");

		return(
			<GalleryPreview
				id={id} 
				photographer={photographer}
				name={name}
				images={images}
				key={`${id}__${index}`}
			/>
		);
	}//renderGalleryPreview
	render(){

		const {
			//added with context consumers
			galleries
		} = this.props;

		const {
			showOverlay
		} = this.state;

		const data = {
			toggleOverlay: this.toggleOverlay,
			overlayActive: showOverlay
		};

		return(
			<MosaicContext.Provider value={data}>
				<div className={`${s.wrapper} ${showOverlay ? s.focus : s.blur}`}>
					{galleries.map(this.renderGalleryPreview)}
				</div>
			</MosaicContext.Provider>
		)
	}

}

const Mosaic = () => (
	<AppContext.Consumer>
		{APP => <MosaicComp galleries={APP.galleries} />}
	</AppContext.Consumer>
);

export default Mosaic;