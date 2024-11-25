'use client';

import { useContext, createContext } from 'react';
import { useState } from 'react';
const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
	const [activeMenu, setActiveMenu] = useState(true);
	const [isClicked, setIsClicked] = useState();
	const [openLogoutModal, setOpenLogoutModal] = useState(false);
	const [screenSize, setScreenSize] = useState(undefined);
	const handleClick = (clicked) => {
		setIsClicked({ ...isClicked, [clicked]: true });
	};

	const [landlordData, setLandlordData] = useState({});

	return (
		<AuthContext.Provider
			value={{
				activeMenu,
				setActiveMenu,
				isClicked,
				setIsClicked,
				handleClick,
				screenSize,
				setScreenSize,
				landlordData,
				setLandlordData,
				openLogoutModal,
				setOpenLogoutModal,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useStateContext = () => {
	return useContext(AuthContext);
};
