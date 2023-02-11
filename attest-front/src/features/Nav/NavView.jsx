import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import MobileNavLinks  from './components/MobileNavLinks';
import NavLinks from './components/NavLinks';
import Logo from './components/Logo';
import MenuToggle from './components/MenuToggle';
import WalletView from '../wallet/WalletView';
import ProfileDropDown from './components/ProfileDropDown';
import BrowseDropdown from './components/BrowseDropdown';

function NavView() {
    const isMobile = useMediaQuery({maxWidth: 500});
    const [isMobileOpen, setMobileOpen] = useState(false); 
    const [isWalletOpened, setWalletOpen] = useState(false);
    const [isProfileDropdownOpened, setProfileDropdown] = useState(false);
    const [isBrowseDropdownOpened, setBrowseDropdown] = useState(false);


    return (
        <div className='flex flex-col px-4 py-1 bg-slate-500'>
            <div className='flex flex-row justify-between items-center '>
                <Logo />
                { !isMobile && <NavLinks setWalletOpen={() => setWalletOpen(!isWalletOpened)} setProfileDropdown={setProfileDropdown} setBrowseDropdown={setBrowseDropdown}/> }
                { isMobile &&  <MenuToggle isOpen={isMobileOpen} toggle={() => setMobileOpen(!isMobileOpen)}/> }
            </div>
            { isMobile && isMobileOpen &&  <MobileNavLinks setWalletOpen={() => setWalletOpen(!isWalletOpened)}/> }
            { isBrowseDropdownOpened && <BrowseDropdown setBrowseDropdown={setBrowseDropdown} /> }
            { isProfileDropdownOpened && <ProfileDropDown setProfileDropdown={setProfileDropdown} /> }
            { isWalletOpened && <WalletView setWalletOpen={() => setWalletOpen(!isWalletOpened)} /> }
            
        </div>
        
    );
}

export default NavView;