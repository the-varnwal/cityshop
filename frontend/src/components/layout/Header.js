import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { GiShoppingBag } from 'react-icons/gi'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast';
import SearchInput from '../form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';
import logo from '../../images/logo.png'

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();
  // console.log(cart);
  // console.log(categories);
  const handleLogout = () => {
    setAuth({
      ...auth, user: null, token: ''
    })
    localStorage.removeItem('auth');
    toast.success('Logout successfully')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor : 'green'}}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to='/' className="navbar-brand" href="#">
            <img src={logo} alt="#" width={'50px'} />
            City'Shop</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <div style={{marginRight: '12vw'}}>
              <SearchInput />
              </div>
              <li className="nav-item">
                <NavLink to='/' className="nav-link">Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" style={{ backgroundColor: 'black', color: 'white' }} to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {
                !auth.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink to='/register' className="nav-link">Register</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to='/login' className="nav-link">Login</NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {auth?.user.name}
                      </Link>
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to={`/dashboard/${auth?.user.role === 1 ? "admin" : "user"}`}>Dashboard</Link></li>
                        <li><Link onClick={handleLogout} to='/login' className="dropdown-item">Logout</Link></li>
                      </ul>
                    </li>
                  </>
                )
              }
              <li className="nav-item">
                <Badge count={cart.length} showZero>  
                <NavLink to='/cart' className="nav-link">Cart</NavLink>
                </Badge>
              </li>
            </ul>

          </div>
        </div>
      </nav>

    </>
  )
}

export default Header
