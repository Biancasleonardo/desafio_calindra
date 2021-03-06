import axios from 'axios';
import React, { useState } from 'react';
import ProductsCard from '../../components/ProductsCard/ProductsCard';
import Search from '../../components/Search/Search';
import Suggestions from '../../components/Suggestions/Suggestions';
import { ContainerBody, ContainerCards } from './style';

const HomePage = () => {
    const [products, setProducts] = useState({})

    const getProducts = (search) => {
        axios.get(`https://mystique-v2-americanas.juno.b2w.io/autocomplete?content=${search}&source=nanook`)
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const onClickSuggestion = (seggestion) => {
        getProducts(seggestion)
    }

    const listProducts = products.products && products.products.map((product) => {
        return <ProductsCard key={product.id} products={product} />
    })

    return (
        <ContainerBody>
            <Search
                getProducts={getProducts}
            />
            <Suggestions
                suggestions={products.suggestions} onClickSuggestion={onClickSuggestion}
            />
            {listProducts ?
                <ContainerCards>
                    {listProducts}
                </ContainerCards> : <div><p>Procure o que deseja através do campo de busca ou pela Sugestão...</p></div>}

        </ContainerBody>
    );
};

export default HomePage;