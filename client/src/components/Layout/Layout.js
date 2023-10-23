import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import {Toaster}  from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

function Layout({ children, title, description, keywords, author }) {
  return (
    <div>
      <Helmet>
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords}/>
          <meta name="author" content={author} />
          <title>{title}</title>
      </Helmet>
      {/* Header */}
      <Header />
      <main style={{ minHeight: '62vh' }}>
        {children}
        <Toaster/>
      </main>
      {/* Footer */}
     
      <Footer />
    </div>
  )
}
Layout.defaultProps={
  title:'Ecomerce App',
description:'Mern Stack project',
keywords:'mern,react,node,mongodb',
author:'Aneesa Tariq'
}

export default Layout
