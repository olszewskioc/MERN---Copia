import { Box, Center, Wrap, WrapItem } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import axios from  'axios';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/actions/productAction";

const ProductsScreen = () => {
    const dispatch = useDispatch();
    const { loading , error,  products, pagination } = useSelector(state=> state.product);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    return(
        <>
            {products.length > 1 && (
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
                        ))};
                    </Wrap>
                </Box>
            )}
        </>
    )
};

export default ProductsScreen;