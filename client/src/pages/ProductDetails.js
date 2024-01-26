import React from 'react';
import Layout from '../components/Layout/Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProduct,setRelatedProduct]=useState([]);

    //initial p detail
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])
    //get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/single-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id,data?.product.category)
        } catch (error) {
            console.log(error);
        }
    }
    //get similar product
    const getSimilarProduct =async(pid,cid)=>{
        try {
            const {data}=await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProduct(data?.products);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <div className="row container mt-2" style={{ margin: "20px"}}>
                <div className="col-md-6" style={{border: "2px solid lightgrey"}}>
                    <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        height={440}
                    />
                </div>
                <div className="col-md-6" style={{padding:"19px",paddingLeftLeft:"2px" ,color: "black" }}>
                    <h1 className='text-center'>PRODUCT DETAILS</h1>
                    <h4>Name:   {product.name}</h4>
                    <h4>Description:   {product.description}</h4>
                    <h4>Price:   ${product.price}</h4>
                    <h4>Category:   {product.category}</h4>
                    <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
            </div>
            <div className="row container" style={{ margin: "20px" ,border:"1px solid lightgrey"}}>
                <h1>Similar Products</h1>
                {relatedProduct.length<1 && <p className='text-center'>No Similar Products Found</p>}
                <div className="d-flex flex-wrap">
            {relatedProduct?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
            </div>
        </Layout>
    )
}

export default ProductDetails
