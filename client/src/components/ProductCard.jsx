import { Box, Image, Text, Flex, Badge, IconButton, Skeleton, useColorModeValue as mode } from '@chakra-ui/react'
import { BiExpand } from  'react-icons/bi';
import React, { useState } from 'react'
import { addToFavorites, removeFromFavorites } from '../redux/actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { Link as ReactLink } from "react-router-dom";

const ProductCard = ({product, loading}) => {

    const dispatch = useDispatch();
    const { favorites } = useSelector((state) => state.product);
    const [isShown, setIsShown] = useState(false);

    return (
        <Skeleton isLoaded={ !loading }>
            <Box 
            _hover={{ transform: 'scale(1.1)', transitionDuration: '0.5s'}}
            borderWidth= "1px" 
            overflow= 'hidden' 
            p= '4'
            shadow='md'
            rounded='md'>
                <Image 
                onMouseEnter={()=>setIsShown(true)} 
                onMouseLeave={()=>setIsShown(false)}
                src={product.images[isShown && product.images.length > 1 ? 1 : 0]} 
                fallbackSrc='https://via.placeholder.com/150'
                alt={product.name}
                h={200}/>
                {product.stock < 5 ? (
                    <Badge colorScheme='yellow'>Only {product.stock} left</Badge>
                ) : product.stock < 1 ? (
                    <Badge  colorScheme="red">Sold Out</Badge>
                ) : <Badge colorScheme='green'>In Stock</Badge>}
                {product.productIsNew && (
                    <Badge ml='2' colorScheme='teal'>New</Badge>
                )}

                <Text noOfLines={1} fontSize={'xl'} fontWeight={"semibold"} mt={2}>
                    {product.brand} {'  '} {product.name}
                </Text>

                <Text noOfLines={1} fontSize={'md'} color={mode('gray.600', 'white')}>
                    {product.subtitle} {'  '} {product.name}
                </Text>

                <Flex justify={'space-between'} alignItems={'center'} mt={2}>
                    <Badge colorScheme='cyan'> {product.category} </Badge>
                    <Text fontSize={'xl'} color={'cyan.600'} fontWeight={'semibold'}>${product.price}</Text>
                </Flex>

                <Flex justify={'space-between'} marginTop={2}>
                    {favorites.includes(product._id) ? (
                        <IconButton
                            onClick={() => dispatch(removeFromFavorites(product._id))}
                            icon={<MdOutlineFavorite size='20px' />}
                            colorScheme='cyan'
                            size={'sm'}
                        />
                    ) : (
                        <IconButton
                            onClick={() => dispatch(addToFavorites(product._id))}
                            icon={<MdOutlineFavoriteBorder size='20px' />}
                            colorScheme='cyan'
                            size={'sm'}
                        />
                    )}

                    <IconButton icon={<BiExpand size='20'/>} as={ReactLink} to={`/product/${product._id}`} colorScheme='cyan' size={'sm'}/>
                </Flex>
                

            </Box>
        </Skeleton>
    )
}

export default ProductCard