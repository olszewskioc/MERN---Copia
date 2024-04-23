import React from 'react'
import { Box, Flex, Heading, HStack, Icon, Image, Link, Skeleton, Stack, useColorModeValue as mode, Text } from '@chakra-ui/react'
import { FaArrowRight }  from 'react-icons/fa'
import {Link as ReactLink} from  "react-router-dom"
import { BsPhoneFlip } from  'react-icons/bs'

const LandingScreen = () => (
        <Box maxW={'8xl'} mx={'auto'} p={{'base': 0 , 'lg': '12'}} minH={'7xl'}>
            <Stack direction={{'base': 'column-reverse' , 'lg': 'row'}} spacing={{'base': 0 , 'lg': 20}}>
                <Box 
                    width={{'lg': 'sm'}} 
                    transform={{'base': 'translateY(-50%)', 'lg': 'none'}}
                    bg={{'base': mode('cyan.50', 'gray.700'), 'lg': 'transparent'}} 
                    mx={{'base': '6', 'md': '8', 'lg': 0}} px={{'base': '6', 'md': '8', 'lg': 0}} py={{'base': '6', 'md': '8', 'lg': '12'}}>
                        <Stack spacing={{'base': '8' , 'lg': '10'}}>
                            <Stack spacing={{'base': '2' , 'lg': '4'}}>
                                <Flex alignItems={'center'}>
                                    <Icon as={BsPhoneFlip} h={12} w={12} color={mode('cyan.500', 'red.200')} mr={2}/>
                                    <Text fontSize={'5xl'} fontWeight={'bold'}>Techlines</Text>
                                </Flex>
                                <Heading fontSize={'xl'} fontWeight={'normal'}>Refresh your equipment</Heading>
                            </Stack>
                            <HStack spacing={3} >
                                <Link as={ReactLink} to={'/products'} color={mode('cyan.500', 'red.200')}>Discover Now</Link>
                                <Icon color={mode('cyan.500', 'red.200')} as={FaArrowRight} mt={0.5}/>
                            </HStack>
                        </Stack>
                </Box>
                <Flex flex={1} overflow={'hidden'}>
                    <Image src={mode('images/landing-light.jpg', 'images/landing-dark.jpg')} fallback={<Skeleton />} maxH={550} minW={300} objectFit={'cover'} flex='1'/>
                </Flex>
            </Stack>
        </Box>
    )

export default LandingScreen