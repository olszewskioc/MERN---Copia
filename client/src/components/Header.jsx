import React from 'react'
import { IconButton, Flex, Stack, HStack, Icon, Box, Text, useColorModeValue as mode, useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react';
import { BsPhoneFlip } from  "react-icons/bs";
import { Link as ReactLink } from 'react-router-dom';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorites } from '../redux/actions/productAction';
import { BiUserCheck }  from 'react-icons/bi';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import ColorModeToogle from './ColorModeToogle';
import NavLink from './NavLink';


const Links = [
	{ name: 'Products', route: '/products'},
	{ name: 'Hot Deals', route: '/hot-deals'},
	{ name: 'Contact', route: '/contact'},
	{ name: 'Services', route: '/services'},
]

const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	const { favoritesToggled } = useSelector((state) => state.product);

	useEffect(() => {}, [favoritesToggled, dispatch]);

	return (
		<Box bg={mode('cyan.300', 'gray.900')} px={4}>

			<Flex h={16} alignItems={"center"} justifyContent="space-between">
				<Flex display={{'base': 'flex', 'md': 'none'}} alignItems={'center'}>
					<IconButton bg={'parent'} size={'md'} icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} onClick={isOpen ? onClose : onOpen}/>
				</Flex>
				<HStack spacing={8} alignItems='center'>
					<Box alignItems={'center'} display={'flex'} as={ReactLink} to="/">
						<Icon as={BsPhoneFlip} h={6} w={6} color={mode('black', 'red.200')}/>
						<Text as={'b'} mx={1}>Techlines</Text>
					</Box>
					<HStack as={'nav'}  spacing={4} display={{base: 'none', md: 'flex'}}>
						{Links.map((link) => (
							<NavLink route={link.route} key={link.route}>
								<Text fontWeight={'medium'}>{link.name}</Text>
							</NavLink>
						))}
						<ColorModeToogle />
						{favoritesToggled ? (
							<IconButton
								onClick={() => dispatch(toggleFavorites(false))}
								icon={<MdOutlineFavorite size='20px' />}
								variant='ghost'
							/>
						) : (
							<IconButton
								onClick={() => dispatch(toggleFavorites(true))} 
								icon={<MdOutlineFavoriteBorder size='20px' />}
								variant='ghost'
							/>
						)}
					</HStack>
				</HStack>
				<Flex alignItems={'center'}>
					<BiUserCheck/>
				</Flex>
			</Flex>
			<Box display={'flex'}>
				{isOpen && (
					<Box pb={4} display={{md: 'none'}}>
						<Stack as={'nav'} spacing={4}>
							{Links.map((link) => (
								<NavLink route={link.route} key={link.route}>
									<Text fontWeight={'medium'}>{link.name}</Text>
								</NavLink>
							))}
						</Stack>
						<ColorModeToogle />
							{favoritesToggled ? (
								<IconButton
									onClick={() => dispatch(toggleFavorites(false))}
									icon={<MdOutlineFavorite size='20px' />}
									variant='ghost'
								/>
							) : (
								<IconButton
									onClick={() => dispatch(toggleFavorites(true))} 
									icon={<MdOutlineFavoriteBorder size='20px' />}
									variant='ghost'
								/>
							)}
					</Box>
				)}
			</Box>
		</Box>
	);
}

export default Header