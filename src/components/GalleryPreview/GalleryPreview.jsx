import React, { Component } from "react";
import { AppContext } from "Components/App/AppContext.js";

class GalleryPreviewComp extends Component {

	render(){

		const {
			name         = "",
			photographer = "",
			dimensions   = {},
			images       = []
		} = this.props;

		const [
			cover,
			...otherImages
		] = images;



		return(
			<div>
				<img src={`Assets/${cover.filename}__${dimensions.small}.jpg`} alt="" />
			</div>
		);
	}

}

const GalleryPreview = (props) => (
	<AppContext.Consumer>
		{APP => (
			<GalleryPreviewComp 
				dimensions={APP.sizes}
				{...props} 
			/>
		)}
	</AppContext.Consumer>
);

export default GalleryPreview;