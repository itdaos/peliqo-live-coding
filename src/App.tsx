import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Product from './components/Product';
import Cart from './components/Cart';
import Products from './components/Products';
import { useEffect, useState } from 'react';

export interface IProduct {
  id: number,
  title: string,
  price: number,
  category: string,
  description: string,
  image: string
}

export interface ICart {
  id: number,
  title: string,
  price: number,
  category: string,
  description: string,
  image: string,
  amount: number
}

function App() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [allProducts, setAllProducts] = useState<IProduct[]>([])
  const [cart, setCart] = useState<ICart[]>([])
  const [currPage, setCurrPage] = useState(0);
  const [currPageSize, setCurrPageSize] = useState(4);



  const updateCurrProducts = () => {
    setProducts(allProducts.slice(currPage * currPageSize, (currPage + 1) * (currPageSize)))
  }

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setAllProducts(json)
        updateCurrProducts()
      })
  }, [])

  useEffect(updateCurrProducts, [allProducts, currPage])

  const addProductToCart = (product: IProduct) => {
    if (cart.map(el => el.id).indexOf(product.id) > -1) {
      const oldProduct = cart.find(el => el.id === product.id);
      if (oldProduct === undefined) return
      const newProduct: ICart = { ...oldProduct, amount: oldProduct?.amount + 1 }

      setCart(cart.map((prod: ICart) => {
        if (prod.id === newProduct.id) return newProduct
        else return prod;
      }))
    }
    else {
      setCart([...cart, { ...product, amount: 1 }])
    }
  }

  const removeProductFromCart = (product: ICart) => {

    const oldProduct = cart.find(el => el.id === product.id)

    if (oldProduct === undefined) return;

    const newProduct: ICart = { ...oldProduct, amount: oldProduct.amount - 1 }

    if (newProduct.amount === 0) {
      setCart(cart.filter((el) => el.id !== product.id))
    } else {
      setCart(cart.map((prod: ICart) => {
        if (prod.id === newProduct.id) return newProduct
        else return prod;
      }))
    }
  }

  const nextPage = () => {
    setCurrPage(currPage + 1)
  }

  const prevPage = () => {
    if (currPage === 0) return;
    setCurrPage(currPage - 1)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home cart={cart} nextPage={nextPage} prevPage={prevPage} currPage={currPage} />}>
          <Route index element={<Products cart={cart} products={products} addProductToCart={addProductToCart} />} />
          <Route path="cart" element={<Cart cart={cart} removeProductFromCart={removeProductFromCart} />} />
          <Route path=":pid" element={<Product products={products} addProductToCart={addProductToCart} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
