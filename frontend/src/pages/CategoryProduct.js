import { BASE_URL } from '../hooks/helper';
import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/CategoryProductStyles.css'

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const getProductByCat = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-category/${params.slug}`);
            // console.log(data);
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            //console.log(error);
        }
    }
    useEffect(() => {
        if (params?.slug) getProductByCat();
    }, [params?.slug])
    return (
        <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-10 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-1" key={p._id}>
                  <img
                    src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height={'250px'}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name.substring(0, 15)}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      {/* <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
    )
}

export default CategoryProduct
