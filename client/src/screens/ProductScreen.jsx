import { useEffect, useState } from 'react'
import { MinusIcon, AddIcon } from '@chakra-ui/icons'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Badge, Box, Flex, HStack, Heading, Image, SimpleGrid, Spinner, Stack, Text, Wrap } from '@chakra-ui/react'
import { BiCheckShield, BiPackage, BiSupport } from 'react-icons/bi'
import { useDispatch, useSelector } from  'react-redux'
import { useParams } from 'react-router-dom'
import { getProduct } from  '../redux/actions/productAction'
import Star from  '../components/Star'


const ProductScreen = () => {
    const [amount, setAmount] = useState(1);
    const {id} = useParams();
    const  dispatch = useDispatch()
    const {loading, error, product} = useSelector((state) => (state.product));

    // When load this component, do dispatch to getProduct by id. Keep monitoring dispatch and id, if have changes, do useEffect again.
    useEffect(()=>{
        dispatch(getProduct(id))
    }, [dispatch, id])

    const changeAmount = (input) => {
        if (input === "plus") {  
            amount < product.stock ? setAmount(amount  + 1) : alert("Cannot add more than the actual stock");
        }
        if  (input === "minus") {
            amount > 1 ? setAmount(amount - 1) : alert("Cannot go below one");
        }
    }

    return (
        <Wrap spacing={'30px'} justify={'center'} minHeight={'100vh'}>
            {loading ? (
                <Stack direction={'row'} spacing={4}>
                    <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
                </Stack>
            ) : error ? (
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>We are sorry</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : (
                product && (
                    <Box maxW={{base: '3xl', lg: '5xl'}} mx={'auto'} px={{base: '4', md: '8', lg: '12'}} py={{base: '6', md: '8', lg: '12'}}>
                        <Stack direction={{base: 'column', lg: 'row'}} align={'flex-start'}>
                            <Stack pr={{base: '0', md: 'row'}} flex={1.5} mb={{base: '12', md: 'none'}}>
                                {product.productIsNew && (
                                    <Badge p={2} rounded={'md'} w={'50px'} fontSize={'0.8em'} colorScheme='green'>
                                        New
                                    </Badge>
                                )}
                                {product.stock === 0 && (
                                    <Badge rounded={'full'} w={'70px'} fontSize={'0.8em'} colorScheme='red'>
                                        Sold out
                                    </Badge>
                                )}
                                <Heading fontSize={'2xl'} fontWeight={'extrabold'}>
                                    {product.brand} {product.name}
                                </Heading>
                                <Stack spacing={5}>
                                    <Box>
                                        <Text fontSize={'xl'}>${product.price}</Text>
                                        <Flex justify={'flex-start'} alignItems="center">
                                            <HStack spacing={'2px'}>
                                                {/* Do an array map to iterate over and show the component */}
                                                {[...Array(5)].map((r, s) => <Star rating={product.rating} star={s+1}/>)}
                                            </HStack>
                                            <Text fontSize={'md'} fontWeight={'bold'} ml={4}>
                                                {product.numberOfReviews} Reviews
                                            </Text>
                                        </Flex>
                                    </Box>
                                    <Text>{product.subtitle}</Text>
                                    <Text>{product.description}</Text>
                                    <Text fontWeight={'bold'}>Quantity</Text>
                                    <Flex w={'170px'} p={'5px'} border={'1px'} borderColor={'gray.200'} borderRadius={'11px'} alignItems={'center'}>
                                        <Button isDisabled={amount <= 1} onClick={() => changeAmount('minus')}><MinusIcon/></Button>
                                        <Text mx={30}>{amount}</Text>
                                        <Button isDisabled={amount >= product.stock} onClick={() => changeAmount('plus')}><AddIcon/></Button>
                                    </Flex>
                                    <Badge fontSize={'lg'} w={'170px'} textAlign={'center'} colorScheme='gray' borderRadius={'9px'}>In Stock: {product.stock}</Badge>
                                    <Button borderRadius={'12px'} colorScheme='cyan' variant='outline' isDisabled={product.stock === 0} onClick={() => {}}>
                                        Add to cart
                                    </Button>
                                    <Stack width={'270px'}>
                                        <Flex alignItems={'center'}>
                                            <BiPackage size={'20px'} />
                                        </Flex>
                                        <Flex alignItems={'center'}>
                                            <BiCheckShield size={'20px'} />
                                            <Text fontWeight={'medium'} fontSize={'sm'} ml={2}>
                                                2 Year Warranty
                                            </Text>
                                        </Flex>
                                        <Flex alignItems={'center'}>
                                            <BiSupport size={'20px'}/>
                                            <Text fontWeight={'medium'} fontSize={'sm'} ml={2}>
                                                We're here for you 24/7
                                            </Text>
                                        </Flex>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Flex flexDirection={'column'} alignItems={'center'} flex={1} _dark={{bg: 'gray.900'}}>
                                <Image mb={'30px'} src={product.images[0]} alt={product.name} fallbackSrc='https://via.placeholder.com/250'/>
                                <Image mb={'30px'} src={product.images[1]} alt={product.name} fallbackSrc='https://via.placeholder.com/250'/>
                            </Flex>
                        </Stack>
                        <Stack>
                            <Text fontSize={'xl'} fontWeight={'bold'}>Reviews</Text>
                            <SimpleGrid minChildWidth={'200px'} spacingX={'40px'} spacingY={'20px'}>
                                {product.reviews.map((review) => (
                                    <Box key={review._id}>
                                        <Flex spacing='2px' alignItems={'center'}>
                                            {/* Do an array map to iterate over and show the component */}
                                            {[...Array(5)].map((r, s) => <Star rating={product.rating} star={s+1}/>)}
                                            <Text fontWeight={'semibold'} ml={'4px'}>
                                                {review.title && review.title}
                                            </Text>
                                        </Flex>
                                        <Box py={'12px'}>{review.comment}</Box>
                                        <Text fontSize={'sm'} color={'gray.400'}>
                                            by {review.name}, {new Date(review.createdAt).toDateString()}
                                        </Text>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </Stack>
                    </Box>
                )
            )}
        </Wrap>
    )
}

export default ProductScreen
