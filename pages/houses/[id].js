import fetch from "isomorphic-unfetch";
import { useState } from "react";
import { useStoreActions } from "easy-peasy";

import Head from "next/head";
import Layout from "../../components/Layout";
import DateRangePicker from "../../components/DateRangePicker";

const calcNumberOfNightsBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate); //clone
    const end = new Date(endDate); //clone
    let dayCount = 0;

    while (end > start) {
        dayCount++;
        start.setDate(start.getDate() + 1);
    }

    return dayCount;
};

const House = props => {
    const [
        numberOfNightsBetweenDates,
        setNumberOfNightsBetweenDates
    ] = useState(0);
    const [dateChosen, setDateChosen] = useState(false);

    const setShowLoginModal = useStoreActions(
        actions => actions.modals.setShowLoginModal
    );

    return (
        <Layout
            content={
                <div className="container">
                    <Head>
                        <title>{props.house.title}</title>
                    </Head>
                    <article>
                        <img
                            src={props.house.picture}
                            width="100%"
                            alt="House picture"
                        />
                        <p>
                            {props.house.type} - {props.house.town}
                        </p>
                        <p>{props.house.title}</p>
                        {props.house.reviewsCount ? (
                            <div className="reviews">
                                <h3>{props.house.reviewsCount} Reviews</h3>

                                {props.house.reviews.map((review, index) => {
                                    return (
                                        <div key={index}>
                                            <p>
                                                {new Date(
                                                    review.createdAt
                                                ).toDateString()}
                                            </p>
                                            <p>{review.comment}</p>
                                        </div>
                                    );
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
                                    calcNumberOfNightsBetweenDates(
                                        startDate,
                                        endDate
                                    )
                                );
                                setDateChosen(true);
                            }}
                        />
                        {dateChosen && (
                            <div>
                                <h2>Price per night</h2>
                                <p>${props.house.price}</p>
                                <h2>Total price for booking</h2>
                                <p>
                                    $
                                    {(
                                        numberOfNightsBetweenDates *
                                        props.house.price
                                    ).toFixed(2)}
                                </p>
                                <button
                                    className="reserve"
                                    onClick={() => {
                                        setShowLoginModal();
                                    }}
                                >
                                    Reserve
                                </button>
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
    );
};

House.getInitialProps = async ({ query }) => {
    const { id } = query;

    const res = await fetch(`http://localhost:3000/api/houses/${id}`);
    const house = await res.json();

    return {
        house
    };
};

export default House;
