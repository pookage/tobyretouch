import React, { Component } from "react";
import { AppContext } from "Components/App/AppContext.js";
import shared from "Shared/shared.css";
import s from "Components/Gallery/Gallery.css";


/*

	ARROW ICONS :
		- https://www.flaticon.com/authors/lucy-g

*/
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
		this.setActiveIndex   = this.setActiveIndex.bind(this);
		this.hide             = this.hide.bind(this);
		this.tryToClose       = this.tryToClose.bind(this);

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
	componentDidUpdate(prevProps, prevState){
		const {
			activeIndex: prevActiveIndex
		} = prevState;
		const {
			activeIndex
		} = this.state;

		if(activeIndex != prevActiveIndex){
			const activeImage = this[`$image__${activeIndex}`];
			activeImage.scrollIntoView({ 
				behavior: "smooth"
			});
		}
	}//componentDidUpdate
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
	hide(){
		this.setState({
			visible: false
		});
	}//hide
	tryToClose(event){
		const {
			propertyName,
			target
		} = event;

		if(target == this.$wrapper && propertyName == "opacity"){
			const {
				opacity
			} = getComputedStyle(this.$wrapper);

			console.log(opacity);

			if(opacity == 0){
				console.log("toggle the gallery to hello")
				this.props.toggleGallery(null)
			}
		}
	}//tryToClose


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
	setActiveIndex(increment){
		const {
			activeIndex
		} = this.state;
		const {
			images
		} = this.props;

		let nextIndex = activeIndex + increment;
		if(nextIndex == images.length) nextIndex = 0;
		else if (nextIndex < 0)        nextIndex = (images.length - 1);

		this.setState({
			activeIndex: nextIndex
		});
	}//setActiveIndex


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

		const filepath = `assets/${filename}__${resolution}.jpg`;
		const isActive = activeIndex == index;

		return(
			<img
				className={`${s.image} ${isActive ? s.active : s.inactive}`} 
				src={filepath} 
				alt={description}
				key={`gallery__${filename}__${index}`}
				ref={ref => this[`$image__${index}`] = ref}
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
			<main 
				className={`${s.wrapper} ${visible ? s.visible : s.hidden}`}
				onTransitionEnd={this.tryToClose}
				ref={ref => this.$wrapper = ref}>
				<header className={s.header}>
					<hgroup className={s.heading}>
						<h1 className={`${shared.body} ${s.title} ${s.shoot}`}>
							{name}
						</h1>
						<h2 className={`${shared.body} ${s.title} ${s.photographer}`}>
							{photographer}
						</h2>
					</hgroup>
					<nav className={s.controls}>
						<button 
							className={`${s.button} ${s.previous}`} 
							aria-label="Previous Image."
							onClick={this.setActiveIndex.bind(true, -1)}
						/>
						<button 
							className={`${s.button} ${s.next}`} 
							aria-label="Next Image."
							onClick={this.setActiveIndex.bind(true, +1)}
						/>
					</nav>
				</header>
				<div className={s.container}>
					{images}
				</div>
				<button 
					className={`${s.button} ${s.close}`}
					aria-label="Close Gallery"
					onClick={this.hide}
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