import React, { createContext } from "react";

export const AppContext = React.createContext({
	galleries: [
		{
			id: "jack_margerison__banks",
			photographer: "Jack Magerison",
			name: "Banks",
			images: [
				{
					filename: "jack_margerison__banks__01",
					orientation: "portrait"
				},{
					filename: "jack_margerison__banks__02",
					orientation: "portrait"
				},{
					filename: "jack_margerison__banks__03",
					orientation: "landscape"
				} 	
			]
		}, {
			id: "jack_margerison__gb_fencing",
			photographer: "Jack Magerison",
			name: "GB Fencing",
			images: [
				{
					filename: "jack_margerison__gb_fencing__01",
					orientation: "portrait"
				},{
					filename: "jack_margerison__gb_fencing__02",
					orientation: "portrait"
				},{
					filename: "jack_margerison__gb_fencing__03",
					orientation: "portrait"
				}	
			]
		}, {
			id: "jack_margerison__oh_wonder",
			photographer: "Jack Magerison",
			name: "Oh Wonder",
			images: [
				{
					filename: "jack_margerison__oh_wonder__01",
					orientation: "landscape"
				},{
					filename: "jack_margerison__oh_wonder__02",
					orientation: "portrait"	
				},{
					filename: "jack_margerison__oh_wonder__03",
					orientation: "portrait"
				}
			]
		}, {
			id: "jack_margerison__ragnbone_man",
			photographer: "Jack Magerison",
			name: "Rag'n'Bone Man", 
			images: [
				{
					filename: "jack_margerison__ragnbone_man__01",
					orientation: "landscape"
				},{
					filename: "jack_margerison__ragnbone_man__02",
					orientation: "portrait"
				},{
					filename: "jack_margerison__ragnbone_man__03",
					orientation: "portrait"
				}
			]
		}, {
			id: "jack_margerison__troye_sivan",
			photographer: "Jack Magerison",
			name: "Troye Sivan",
			images: [
				{
					filename: "jack_margerison__troye_sivan__01",
					orientation: "landscape"
				},{
					filename: "jack_margerison__troye_sivan__02",
					orientation: "landscape"
				},{
					filename: "jack_margerison__troye_sivan__03",
					orientation: "landscape"
				}
			]
		}
	],
	sizes: {
		small: "720",
		medium: "1080",
		large: "1440",
		xl: "2160"
	}
});