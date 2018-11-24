import React, { createContext } from "react";

export const MosaicContext = React.createContext({
	toggleOverlay: () => {},
	showOverlay: false
});