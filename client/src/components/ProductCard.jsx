import { Box, Image, Text, Flex, Badge, IconButton, Skeleton } from '@chakra-ui/react'
import { BiExpand, BiExtend} from  'react-icons/bi';
import React from 'react'

const ProductCard = ({product, loading}) => {
    return (
        <Skeleton isLoaded={ !loading } _hover={{ size: 1.5 }}>
            <Box 
            _hover={{ transform: 'scale(1.1)', transitionDuration: '0.5s'}}
            borderWidth= "1px" 
            overflow= 'hidden' 
            p= '4'
            shadow='md'>
                <Image 
                src={product.images[0]} 
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

                <Text noOfLines={1} fontSize={'md'} color={'gray.600'}>
                    {product.subtitle} {'  '} {product.name}
                </Text>

                <Flex justify={'space-between'} alignItems={'center'} mt={2}>
                    <Badge colorScheme='cyan'> {product.category} </Badge>
                    <Text fontSize={'xl'} color={'cyan.600'} fontWeight={'semibold'}>${product.price}</Text>
                </Flex>

                <IconButton icon={<BiExpand size='20'/>} colorScheme='cyan' />

            </Box>
        </Skeleton>
    )
}

export default ProductCard