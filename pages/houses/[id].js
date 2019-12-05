import fetch from 'isomorphic-unfetch'
import axios from 'axios'
import { useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

import Head from 'next/head'
import Layout from '../../components/Layout'
import DateRangePicker from '../../components/DateRangePicker'

const calcNumberOfNightsBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate) //clone
  const end = new Date(endDate) //clone
  let dayCount = 0

  while (end > start) {
    dayCount++
    start.setDate(start.getDate() + 1)
  }

  return dayCount
}

const getBookedDates = async houseId => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/houses/booked',
      {
        houseId
      }
    )
    if (response.data.status === 'error') {
      alert(response.data.message)
      return
    }
    return response.data.dates
  } catch (error) {
    console.error(error)
    return
  }
}

const canReserve = async (houseId, startDate, endDate) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/houses/check',
      { houseId, startDate, endDate }
    )
    if (response.data.status === 'error') {
      alert(response.data.message)
      return
    }

    if (response.data.message === 'busy') return false
    return true
  } catch (error) {
    console.error(error)
    return
  }
}

const House = props => {
  const [numberOfNightsBetweenDates, setNumberOfNightsBetweenDates] = useState(
    0
  )
  const [dateChosen, setDateChosen] = useState(false)
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const setShowLoginModal = useStoreActions(
    actions => actions.modals.setShowLoginModal
  )

  const user = useStoreState(state => state.user.user)

  return (
    <Layout
      content={
        <div className='container'>
          <Head>
            <title>{props.house.title}</title>
          </Head>
          <article>
            <img src={props.house.picture} width='100%' alt='House picture' />
            <p>
              {props.house.type} - {props.house.town}
            </p>
            <p>{props.house.title}</p>
            {props.house.reviewsCount ? (
              <div className='reviews'>
                <h3>{props.house.reviewsCount} Reviews</h3>

                {props.house.reviews.map((review, index) => {
                  return (
                    <div key={index}>
                      <p>{new Date(review.createdAt).toDateString()}</p>
                      <p>{review.comment}</p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <></>
            )}
          </article>
          <aside>
            <h2>Add dates for prices</h2>
            <DateRangePicker
              datesChanged={(startDate, endDate) => {
                setNumberOfNightsBetweenDates(
                  calcNumberOfNightsBetweenDates(startDate, endDate)
                )
                setDateChosen(true)
                setStartDate(startDate)
                setEndDate(endDate)
              }}
              bookedDates={props.bookedDates}
            />
            {dateChosen && (
              <div>
                <h2>Price per night</h2>
                <p>${props.house.price}</p>
                <h2>Total price for booking</h2>
                <p>
                  ${(numberOfNightsBetweenDates * props.house.price).toFixed(2)}
                </p>
                {user ? (
                  <button
                    className='reserve'
                    onClick={async () => {
                      if (
                        !(await canReserve(props.house.id, startDate, endDate))
                      ) {
                        alert('The dates chosen are not valid')
                        return
                      }

                      try {
                        const sessionResponse = await axios.post(
                          '/api/stripe/session',
                          {
                            amount:
                              props.house.price * numberOfNightsBetweenDates
                          }
                        )
                        if (sessionResponse.data.status === 'error') {
                          alert(sessionResponse.data.message)
                          return
                        }

                        const sessionId = sessionResponse.data.sessionId
                        const stripePublicKey =
                          sessionResponse.data.stripePublicKey

                        const reserveResponse = await axios.post(
                          '/api/houses/reserve',
                          {
                            houseId: props.house.id,
                            startDate,
                            endDate,
                            sessionId
                          }
                        )
                        if (reserveResponse.data.status === 'error') {
                          alert(reserveResponse.data.message)
                          return
                        }

                        const stripe = Stripe(stripePublicKey)
                        const { error } = await stripe.redirectToCheckout({
                          sessionId
                        })

                        console.log(reserveResponse.data)
                      } catch (error) {
                        console.log(error)
                        return
                      }
                    }}>
                    Reserve
                  </button>
                ) : (
                  <button
                    className='reserve'
                    onClick={() => {
                      setShowLoginModal()
                    }}>
                    Log in to Reserve
                  </button>
                )}
              </div>
            )}
          </aside>

          <style jsx>{`
            .container {
              display: grid;
              grid-template-columns: 60% 40%;
              grid-gap: 30px;
            }

            aside {
              border: 1px solid #ccc;
              padding: 20px;
            }
          `}</style>
        </div>
      }
    />
  )
}

House.getInitialProps = async ({ query }) => {
  const { id } = query

  const res = await fetch(`http://localhost:3000/api/houses/${id}`)
  const house = await res.json()

  const bookedDates = await getBookedDates(id)

  return {
    house,
    bookedDates
  }
}

export default House
