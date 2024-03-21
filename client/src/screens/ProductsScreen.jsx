import { Box, Center, Wrap, WrapItem } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import axios from  'axios';
import { useEffect, useState } from "react";

const ProductsScreen = () => {
    const [data, setData] = useState([]);

    // Ao inicializar  a tela, busca os produtos do backend. Retorna o erro caso não consiga realizar o fetching.
    useEffect(() => {
        // Foi necessário colocar o caminho completo pois o proxy no package.json estava dando problemas: "proxy": "http://localhost:5000",
        axios.get('http://localhost:5000/api/products').then((response) => {
            setData(response.data.products)
        })
        .catch((err)=>{
            console.log("Error fetching data: "+ err);
        });
    }, [])

// Caso exista algo em 'data' ele  renderiza os produtos senão não faz nada pois é uma tag vazia.
    return(
        <>
            {data.length > 1 && (
                <Box>
                    <Wrap spacing={30} minHeight='80vh' mx={{base: '12', md: '20', lg: '32'}} justify='center'>
                        {/*Aqui se faz o mapeamento dos produtos contidos em data para que se faça um card para cada produto
                        E também se coloca dentro de WrapItem por estar dentro de um Wrap e o Center para centralizar sem CSS*/}
                        {data.map((product) =>(
                            <WrapItem key={product._id}>
                                <Center w={250} h={450}> 
                                    <ProductCard product={ product } loading={false}/>
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