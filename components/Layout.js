import Header from "./Header";

const Layout = props => {
    return (
        <>
            <Header />
            <div>
                <main>{props.content}</main>
                <style jsx global>{`
                    body {
                        margin: 0;
                        font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                        font-size: 14px;
                        line-hight: 1.5;
                        color #333;
                    }
                `}</style>

                <style jsx>{`
                    main {
                        position: relative;
                        max-width: 56em;
                        background-color: white;
                        padding: 2em;
                        margin: 0 auto;
                        box-sizing: border-box;
                    }
                `}</style>
            </div>
        </>
    );
};

export default Layout;
