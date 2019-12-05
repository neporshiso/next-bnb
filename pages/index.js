import fetch from "isomorphic-unfetch";
import House from "../components/House";
import Layout from "../components/Layout";

const Index = props => {
    return (
        <Layout
            content={
                <div>
                    <h2>Places to stay</h2>

                    <div className="houses">
                        {props.houses.map((house, index) => {
                            return <House key={index} {...house} />;
                        })}
                    </div>

                    <style jsx>{`
                        .houses {
                            display: grid;
                            grid-template-columns: 50% 50%;
                            grid-template-rows: 300px 300px;
                            grid-gap: 40px;
                        }
                    `}</style>
                </div>
            }
        />
    );
};

Index.getInitialProps = async () => {
    const res = await fetch(`http://localhost:3000/api/houses`);
    const houses = await res.json();
    return {
        houses
    };
};

export default Index;
