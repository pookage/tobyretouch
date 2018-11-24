import React, { Component } from "react";
import { AppContext } from "Components/App/AppContext.js";
import GalleryPreview from "Components/GalleryPreview/GalleryPreview.jsx";
import s from "Components/Mosaic/Mosaic.css";

class MosaicComp extends Component {

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
				photographer={photographer}
				name={name}
				images={images}
				key={id}
			/>
		);
	}//renderGalleryPreview
	render(){

		const {
			galleries
		} = this.props;

		return(
			<div className={s.wrapper}>
				{galleries.map(this.renderGalleryPreview)}
			</div>
		)
	}

}

const Mosaic = () => (
	<AppContext.Consumer>
		{APP => <MosaicComp galleries={APP.galleries} />}
	</AppContext.Consumer>
);

export default Mosaic;