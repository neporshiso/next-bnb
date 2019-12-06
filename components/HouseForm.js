import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import Editor from 'react-pell'

const HouseForm = props => {
  const id = (props.house && props.house.id) || null

  const [title, setTitle] = useState((props.house && props.house.title) || '')
  const [town, setTown] = useState((props.house && props.house.town) || '')
  const [price, setPrice] = useState((props.house && props.house.price) || 0)
  const [picture, setPicture] = useState(
    (props.house && props.house.picture) || ''
  )
  const [description, setDescription] = useState(
    (props.house && props.house.description) || ''
  )
  const [guests, setGuests] = useState((props.house && props.house.guests) || 0)
  const [bedrooms, setBedrooms] = useState(
    (props.house && props.house.bedrooms) || 0
  )
  const [beds, setBeds] = useState((props.house && props.house.beds) || 0)
  const [baths, setBaths] = useState((props.house && props.house.baths) || 0)
  const [wifi, setWifi] = useState((props.house && props.house.wifi) || false)
  const [kitchen, setKitchen] = useState(
    (props.house && props.house.kitchen) || false
  )
  const [heating, setHeating] = useState(
    (props.house && props.house.heating) || false
  )
  const [freeParking, setFreeParking] = useState(
    (props.house && props.house.freeParking) || false
  )
  const [entirePlace, setEntirePlace] = useState(
    (props.house && props.house.entirePlace) || false
  )
  const [type, setType] = useState(
    (props.house && props.house.type) || 'Entire house'
  )

  const houseTypes = ['Entire house', 'Room']

  const handleFileUpload = async event => {
    const files = event.target.files
    const formData = new FormData()
    formData.append('image', files[0])

    const response = await axios.post('/api/host/image', formData)
    setPicture('http://localhost:3000' + response.data.path)
  }

  return (
    <div>
      <form
        onSubmit={async event => {
          event.preventDefault()
          try {
            const response = await axios.post(
              `/api/host/${props.edit ? 'edit' : 'new'}`,
              {
                house: {
                  id: props.edit ? id : null,
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
              }
            )
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
            value={title}
          />
        </p>
        <p>
          <label>Town</label>
          <input
            required
            onChange={event => setTown(event.target.value)}
            type='text'
            placeholder='Town'
            value={town}
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
          <label>House picture</label>
          <input
            type='file'
            id='fileUpload'
            accept='image/*'
            onChange={async event => handleFileUpload(event)}
          />
          {picture ? <img src={picture} width='200' alt='House image' /> : ''}
        </p>
        <div>
          <label>House description</label>
          <Editor
            onChange={html => setDescription(html)}
            defaultContent={description}
            actions={['bold', 'underline', 'italic']}
          />
        </div>

        <div className='grid'>
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

        {props.edit ? <button>Edit house</button> : <button>Add house</button>}
      </form>

      <style jsx>{`
        input[type='number'],
        input[type='file'],
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
        form p {
          display: grid;
        }

        .grid {
          display: grid;
          grid-template-columns: 50% 50%;
        }

        .grid > div {
          padding: 50px;
        }
      `}</style>

      <style jsx global>{`
        .pell-container {
          border: 1px solid #ccc;
        }
        .pell,
        .pell-content {
          box-sizing: border-box;
        }
        .pell-content {
          height: 300px;
          outline: 0;
          overflow-y: auto;
          padding: 10px;
        }
        .pell-actionbar {
          background-color: #fff;
          border-bottom: 1px solid hsla(0, 0%, 4%, 0.1);
        }
        .pell-button {
          background-color: transparent;
          border: none;
          cursor: pointer;
          height: 30px;
          outline: 0;
          width: 30px;
          vertical-align: bottom;
          color: black;
        }
        .pell-button-selected {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  )
}

export default HouseForm