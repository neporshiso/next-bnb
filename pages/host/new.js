import { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Router from 'next/router'

import Layout from '../../components/Layout'
import HouseForm from '../../components/HouseForm'

const NewHouse = () => {
  return (
    <Layout
      content={
        <>
          <Head>
            <title>Add a new house</title>
          </Head>

          <HouseForm edit={false} />
        </>
      }
    />
  )
}

export default NewHouse