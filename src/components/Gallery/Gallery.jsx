import React, { Component } from "react";
import { AppContext } from "Components/App/AppContext.js";
import s from "Components/Gallery/Gallery.css";

class GalleryComponent extends Component {

	//LIFECYCLE JAZZ
	//-----------------------------------
	constructor(...args){
		super(...args);

		const [ props ] = args;

		const {
			dimensions
		} = props;

		//lookup what the best resolution image is for the user's current resolution
		const resolution      = this.lookupResolution(window.innerHeight, dimensions)

		//scope binding
		this.renderImage      = this.renderImage.bind(this);
		this.updateResolution = this.updateResolution.bind(this);

		//local variable for animationFrames
		this.limitedLookup    = null;
		
		//initialise the state
		this.state = {
			activeIndex: 0,
			visible: false,
			resolution
		};
	}//constructor
	componentDidMount(){
		//update internal resolution as the user resizes their window
		window.addEventListener("resize", this.updateResolution);
		requestAnimationFrame(() => {
			this.setState({
				visible: true
			});
		})
	}//componentDidMount
	componentWillUnmount(){
		cancelAnimationFrame(this.limitedLookup);
		window.removeEventListener("resize", this.updateResolution)
	}//componentWillUnmoutn


	//EVENT HANDLING
	//----------------------------------
	updateResolution(){
		this.limitedLookup   = requestAnimationFrame(() => {
			const resolution = lookupResolution(window.innerHeight, this.props.dimensions);
			this.setState({ resolution });
		});
	}//updateResolution


	//UTILS
	//----------------------------------
	lookupResolution(clientHeight, dimensions){
		const {
			small, medium, large, xl
		} = dimensions;

		if(clientHeight > parseInt(xl))           return xl;
		else if (clientHeight > parseInt(large))  return large;
		else if (clientHeight > parseInt(medium)) return medium;
		else                                      return small;
	}//lookupResolution

	//RENDER FUNCTIONS
	//-----------------------------------
	renderImage(data, index){

		const {
			filename    = "",
			orientation = "",
			description = ""
		} = data;

		const {
			resolution,
			activeIndex
		} = this.state;

		const filepath = `assets/${filename}__${resolution}.jpg`

		return(
			<img
				className={s.image} 
				src={filepath} 
				alt={description}
				key={`gallery__${filename}__${index}`}
			/>
		);
	}//renderImage
	render(){

		const {

			//props from context consumers
			name              = "",
			photographer      = "",
			images: imageData = [],
			dimensions        = {},
			toggleGallery     = () => {}
		} = this.props;

		const {
			visible
		} = this.state;

		const images = imageData.map(this.renderImage);

		return(
			<main className={`${s.wrapper} ${visible ? s.visible : s.hidden}`}>
				<header className={s.header}>
					<h1 className={`${s.title} ${s.shoot}`}>
						{name}
					</h1>
					<h2 className={`${s.title} ${s.photographer}`}>
						{photographer}
					</h2>
					<nav className={s.controls}>
						<button 
							className={`${s.button} ${s.previous}`} 
							aria-label="Previous Image."
						/>
						<button 
							className={`${s.button} ${s.next}`} 
							aria-label="Next Image."
						/>
					</nav>
				</header>
				<div className={s.container}>
					{images}
				</div>
				<button 
					className={`${s.button} ${s.close}`}
					aria-label="Close Gallery"
					onClick={toggleGallery.bind(true, null)}
				/>
			</main>
		);
	}//render

}


const Gallery = () => (
	<AppContext.Consumer>
		{APP => (
			<GalleryComponent 
				photographer={APP.activeGallery.photographer}
				name={APP.activeGallery.name}
				images={APP.activeGallery.images}
				dimensions={APP.sizes}
				toggleGallery={APP.toggleGallery}
			/>
		)}
	</AppContext.Consumer>
);

export default Gallery;