import { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Router from 'next/router'

import Layout from '../../components/Layout'

const NewHouse = () => {
  const [title, setTitle] = useState('')
  const [town, setTown] = useState('')
  const [price, setPrice] = useState(0)
  const [picture, setPicture] = useState('')
  const [description, setDescription] = useState('')
  const [guests, setGuests] = useState(0)
  const [bedrooms, setBedrooms] = useState(0)
  const [beds, setBeds] = useState(0)
  const [baths, setBaths] = useState(0)
  const [wifi, setWifi] = useState(false)
  const [kitchen, setKitchen] = useState(false)
  const [heating, setHeating] = useState(false)
  const [freeParking, setFreeParking] = useState(false)
  const [entirePlace, setEntirePlace] = useState(false)
  const [type, setType] = useState('Entire house')

  const houseTypes = ['Entire house', 'Room']

  return (
    <Layout
      content={
        <div>
          <Head>
            <title>Add a new house</title>
          </Head>

          <form
            onSubmit={async event => {
              event.preventDefault()
              try {
                const response = await axios.post('/api/host/new', {
                  house: {
                    title,
                    town,
                    price,
                    picture,
                    description,
                    guests,
                    bedrooms,
                    beds,
                    baths,
                    wifi,
                    kitchen,
                    heating,
                    freeParking,
                    entirePlace,
                    type
                  }
                })
                if (response.data.status === 'error') {
                  alert(response.data.message)
                  return
                }

                Router.push('/host')
              } catch (error) {
                alert(error.response.data.message)
                return
              }
            }}>
            <p>
              <label>House title</label>
              <input
                required
                onChange={event => setTitle(event.target.value)}
                type='text'
                placeholder='House title'
              />
            </p>
            <p>
              <label>Town</label>
              <input
                required
                onChange={event => setTown(event.target.value)}
                type='text'
                placeholder='Town'
              />
            </p>
            <p>
              <label>Price per night</label>
              <input
                required
                onChange={event => setPrice(event.target.value)}
                type='number'
                placeholder='Price per night'
                value={price}
              />
            </p>
            <p>
              <label>House picture URL</label>
              <input
                required
                onChange={event => setPicture(event.target.value)}
                type='text'
                placeholder='House picture URL'
              />
            </p>
            <p>
              <label>House description</label>
              <textarea
                required
                onChange={event =>
                  setDescription(event.target.value)
                }></textarea>
            </p>

            <div>
              <div>
                <p>
                  <label>Number of guests</label>
                  <input
                    required
                    onChange={event => setGuests(event.target.value)}
                    type='number'
                    placeholder='Number of guests'
                    value={guests}
                  />
                </p>
                <p>
                  <label>Number of bedrooms</label>
                  <input
                    required
                    onChange={event => setBedrooms(event.target.value)}
                    type='number'
                    placeholder='Number of bedrooms'
                    value={bedrooms}
                  />
                </p>
                <p>
                  <label>Number of beds</label>
                  <input
                    required
                    onChange={event => setBeds(event.target.value)}
                    type='number'
                    placeholder='Number of beds'
                    value={beds}
                  />
                </p>
                <p>
                  <label>Number of baths</label>
                  <input
                    required
                    onChange={event => setBaths(event.target.value)}
                    type='number'
                    placeholder='Number of baths'
                    value={baths}
                  />
                </p>
              </div>

              <div>
                <p>
                  <label>Does it have Wifi?</label>
                  <select
                    onChange={event => setWifi(event.target.value)}
                    value={wifi}>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                  </select>
                </p>
                <p>
                  <label>Does it have a kitchen?</label>
                  <select
                    onChange={event => setKitchen(event.target.value)}
                    value={kitchen}>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                  </select>
                </p>
                <p>
                  <label>Does it have heating?</label>
                  <select
                    onChange={event => setHeating(event.target.value)}
                    value={heating}>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                  </select>
                </p>
                <p>
                  <label>Does it have free parking?</label>
                  <select
                    onChange={event => setFreeParking(event.target.value)}
                    value={freeParking}>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                  </select>
                </p>
                <p>
                  <label>Is it the entire place?</label>
                  <select
                    onChange={event => setEntirePlace(event.target.value)}
                    value={entirePlace}>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                  </select>
                </p>
                <p>
                  <label>Type of house</label>
                  <select
                    onChange={event => setType(event.target.value)}
                    value={type}>
                    {houseTypes.map((item, key) => (
                      <option value={item} key={key}>
                        {item}
                      </option>
                    ))}
                  </select>
                </p>
              </div>
            </div>

            <button>Add house</button>
          </form>

          <style jsx>{`
            input[type='number'],
            select,
            textarea {
              display: block;
              padding: 20px;
              font-size: 20px !important;
              width: 100%;
              border: 1px solid #ccc;
              border-radius: 4px;
              box-sizing: border-box;
              margin-bottom: 10px;
            }
          `}</style>
        </div>
      }
    />
  )
}

export default NewHouse