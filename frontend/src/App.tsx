import {
  useEffect,
  useState
} from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  async function getAllProducts() {
    await fetch('http://localhost:3000/products', {
      method: "GET"
    })
      .then(async (response) => {
        const products_data = await response.json();
        setProducts(products_data)
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    void getAllProducts()
  }, []);
   
  return (
    <div>
      <h1>Online Shop</h1>
      <p>sex</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;