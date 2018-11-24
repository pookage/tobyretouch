import React, { Component } from "react";
import { AppContext } from "Components/App/AppContext.js";
import { MosaicContext } from "Components/Mosaic/MosaicContext.js";
import s from "Components/GalleryPreview/GalleryPreview.css";

class GalleryPreviewComp extends Component {

	//LIFECYCLE JAZZ
	//------------------------------
	constructor(...args){
		super(...args);

		//scope binding
		this.startDetailsCountdown = this.startDetailsCountdown.bind(this);
		this.resetDetails          = this.resetDetails.bind(this);
		this.toggleDetails         = this.toggleDetails.bind(this);
		this.renderExtraImage      = this.renderExtraImage.bind(this);

		//non-rendering variables
		window.detailsTimeout = null;

		this.state = {
			showDetails: false
		}
	}//constructor
	componentDidUpdate(prevProps, prevState){
		const {
			showDetails: prevShowDetails
		} = prevState;
		const {
			showDetails
		} = this.state;

		if(showDetails != prevShowDetails){
			if(showDetails) this.props.toggleOverlay(true);
			else            this.props.toggleOverlay(false);
		}
	}//componentDidUpdate
	componentWillUnmount(){
		window.clearTimeout(this.detailsTimeout);
	}//componentWillUnmount


	//EVENT HANDLING
	//------------------------------
	startDetailsCountdown(event){
		window.clearTimeout(window.detailsTimeout);
		window.detailsTimeout = setTimeout(this.toggleDetails.bind(true, true), 1000);
	}//startDetailsCountdown
	resetDetails(event){
		window.clearTimeout(window.detailsTimeout);
		this.toggleDetails(false);
	}//resetDetails


	//UTILS
	//-------------------------------
	toggleDetails(showDetails){
		this.setState({ showDetails });
	}//toggleDetails


	//RENDER FUNCTIONS
	//-------------------------------
	renderExtraImage(image, index){

		const {
			dimensions,
			images
		} = this.props;

		const {
			showDetails
		} = this.state;

		const {
			filename,
			description
		} = image;

		const maxOffset   = 10;
		const opacityStep = 0.2;
		const offset      = maxOffset / images.length;
		const translateX  = offset * (index + 1);
		const translateY  = offset * (index + 1);

		const style = {
			transform: `translate(${translateX}%, ${translateY}%)`,
			zIndex: (images.length-1) - index,
			opacity: 1 - (opacityStep * (index + 1))
		};

		return(
			<img
				className={`${s.image}`}
				src={`assets/${filename}__${dimensions.small}.jpg`}
				alt={description}
				style={showDetails ? style : {}}
			/>
		);
	}//renderExtraImage
	render(){

		const {
			name          = "",
			photographer  = "",
			dimensions    = {},
			images        = [],
			toggleOverlay = () => {}
		} = this.props;

		const {
			showDetails = false
		} = this.state;

		const [
			cover,
			...otherImages
		] = images;

		const {
			filename    = "assets/",
			orientation = "portrait",
			description = ""
		} = cover;

		const coverLayer = {
			zIndex: images.length
		}
		const captionLayer = {
			zIndex: images.length + 1
		};

		return(
			<figure 
				className={`${s.wrapper} ${s[orientation]} ${showDetails ? s.expanded : s.collapsed}`}
				role="button"
				aria-label={`Click to open ${name} photo set; photographed by ${photographer}.`}
				onMouseEnter={this.startDetailsCountdown}
				onMouseLeave={this.resetDetails}>
				<div 
					className={`${s.container}`}
					style={coverLayer}>
					<img
						className={`${s.image} ${s.cover}`} 
						src={`assets/${filename}__${dimensions.small}.jpg`} 
						alt={description}
					/>
				</div>
				<div className={`${s.extra}`}>
					{otherImages.map(this.renderExtraImage)}
				</div>
				<figcaption 
					className={`${s.caption}`}
					style={captionLayer}>
					{`${name} by ${photographer}`}
				</figcaption>
			</figure>
		);
	}//render

}

const GalleryPreview = (props) => (
	<AppContext.Consumer>
		{APP => (
			<MosaicContext.Consumer>
				{MOSAIC => (
					<GalleryPreviewComp 
						dimensions={APP.sizes}
						toggleOverlay={MOSAIC.toggleOverlay}
						{...props} 
					/>
				)}
			</MosaicContext.Consumer>
		)}
	</AppContext.Consumer>
);

export default GalleryPreview;