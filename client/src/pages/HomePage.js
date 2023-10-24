import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
const HomePage = () => {
  const [auth, setAuth] = useAuth()
  return (

    <Layout title={"HomePage - Ecommerce App"}>
        <h1 style={{marginTop:'95px'}}>Home Page</h1>
        <pre>
          {JSON.stringify(auth,null,4)}
        </pre>
    </Layout>
  )
}

export default HomePage
