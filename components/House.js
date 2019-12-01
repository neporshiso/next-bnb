import Link from "next/link";

const House = props => {
    return (
        <Link href="/houses/[id]" as={"/houses/" + props.id}>
            <a>
                <div>
                    <img src={props.picture} width="100%" alt="House picture" />
                    <p>
                        {props.type} - {props.town}
                    </p>
                    <p>{props.title}</p>
                    <p>{props.description}</p>
                    <p>
                        {props.rating} ({props.reviewsCount})
                    </p>
                </div>
            </a>
        </Link>
    );
};

export default House;
