import Button from 'react-bootstrap/Button';
import './App.css'
import Form from 'react-bootstrap/Form';
import { Fragment, useState } from 'react';
import { nanoid } from 'nanoid';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import IconButton from './components/IconButton';


const shops = ["BİM", "A101", "ŞOK", "MİGROS", "MEDİAMARKT"];

const shopsObj = shops.map((shop, index) => ({
  id: index,
  name: shop,
}));

const categories = ["Elektronik", "Şarküteri", "Oyuncak", "Bakliyat", "Fırın"];

const categoriesObj = categories.map((categories, index) => ({
  id: index,
  name: categories,
}));

const TableRow = styled.tr`
text-decoration : ${(props) => props.isBought === true ? "line-through" : "unset"}
`;


function App() {

  const [products, setProducts] = useState([]);

  const [productName, setProductsName] = useState("");
  const [productShop, setProductsShop] = useState("");
  const [productCategory, setProductsCategory] = useState("");

  const handleAddProduct = () => {

    const product = {
      id: nanoid(),
      name: productName,
      category: productCategory,
      shop: productShop,
    };
    setProducts([...products, product]);
  };

  return (
    <Fragment>
      <div className='d-flex align-items-end' >
        <Form className='d-flex align-items-end'>
          <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
            <Form.Label>Ürün</Form.Label>
            <Form.Control
              value={productName}
              onChange={(e) => {
                setProductsName(e.target.value);
              }}
              type="text" placeholder="Ürün adını giriniz" />
          </Form.Group>
          <Form.Select style={{
            maxWidth: "125px"
          }}
            aria-label="markt"
            value={productShop}
            onChange={(e) => {
              setProductsShop(e.target.value);
            }}
          >
            <option>Market</option>
            {shopsObj.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            style={{
              maxWidth: "125px"
            }}
            aria-label="ürün"
            value={productCategory}
            onChange={(e) => {
              setProductsCategory(e.target.value);
            }}
          >
            <option>Ürünler</option>
            {categoriesObj.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form>
        <Button variant="outline-primary" onClick={handleAddProduct}>Ekle</Button>
      </div >
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Adı</th>
            <th>Market</th>
            <th>Kategori</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product =>
          (
            <TableRow
              isBought={product.isBought}
              onClick={() => {
                const updatedProducts = products.map(oldProduct => {
                  if (oldProduct.id === product.id) {
                    return { ...oldProduct, isBought: true }
                  } else {
                    return oldProduct;
                  }
                });
                if (updatedProducts.every((uP => Boolean(uP.isBought)))) {
                  alert("Alışveriş Tamamlandı!!!");
                }
                setProducts(updatedProducts);
              }}
              key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{shopsObj.find(shopObj =>
                shopObj.id == product.shop).name}</td>
              <td>{categoriesObj.find(categoryObj =>
                categoryObj.id == product.category).name}</td>
              <IconButton
                handleClick={() => {
                  setProducts(products.filter(filterProduct =>
                    filterProduct.id !== product.id))
                }}
              />
            </TableRow>))}
        </tbody>
      </Table>
    </Fragment >
  );
}

export default App;