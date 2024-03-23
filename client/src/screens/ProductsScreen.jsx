import { Box, Button, Center, Wrap, WrapItem } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productAction";
import { ArrowLeftIcon, ArrowRightIcon } from  '@chakra-ui/icons';

const ProductsScreen = () => {
    const dispatch = useDispatch();
    const { loading , error,  products, pagination, favoritesToggled } = useSelector(state=> state.product);

    useEffect(() => {
        dispatch(getProducts(1));
    }, [dispatch]);

    const paginationButtonClick = (page) => {
        dispatch(getProducts(page));
    };

    return(
        <>
            {products.length >= 1 && (
                <Box>
                    <Wrap spacing={30} minHeight='80vh' mx={{base: '12', md: '20', lg: '32'}} justify='center'>
                        {/*Aqui se faz o mapeamento dos produtos contidos em products para que se faça um card para cada produto
                        E também se coloca dentro de WrapItem por estar dentro de um Wrap e o Center para centralizar sem CSS*/}
                        {products.map((product) =>(
                            <WrapItem key={product._id}>
                                <Center w={250} h={450}> 
                                    <ProductCard product={ product } loading={loading}/>
                                </Center>
                            </WrapItem>
                        ))}
                    </Wrap>
                    {!favoritesToggled && 
                        <Wrap spacing={10} justify={"center"} p={5}>
                            <Button colorScheme="cyan" onClick={() => paginationButtonClick(1)}>
                                <ArrowLeftIcon />
                            </Button>

                            {Array.from(Array(pagination.totalPages), (e, i) => {
                                return(
                                    <Button colorScheme={pagination.currentPage === i + 1 ? 'cyan' : 'gray'} key={i} onClick={() => paginationButtonClick(i+1)}>
                                        {i + 1}
                                    </Button>
                                );
                            })}

                            <Button colorScheme="cyan" onClick={() => paginationButtonClick(pagination.totalPages)}>
                                <ArrowRightIcon />
                            </Button>
                        </Wrap>}
                </Box>
            )}
        </>
    )
};

export default ProductsScreen;