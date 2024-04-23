import { useColorMode, IconButton } from  "@chakra-ui/react";
import { SunIcon, MoonIcon } from  "@chakra-ui/icons"

import React from 'react'

const ColorModeToogle = () => {
    const { colorMode, toggleColorMode }  = useColorMode();

    return <IconButton icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon /> } onClick={toggleColorMode} variant='ghost'/>;
}

export default ColorModeToogle
