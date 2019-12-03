import App from "next/app";
import { StoreProvider } from "easy-peasy";
import store from "../store";

// The whole application
function MyApp({ Component, pageProps, user }) {
    
    if (user) {
        store.getActions().user.setUser(user)
    }

    return (
        <StoreProvider store={store}>
            <Component {...pageProps} />
        </StoreProvider>
    );
}

MyApp.getInitialProps = async appContext => {
    // If the current page has its own getInitialProps, we get those props back
    const appProps = await App.getInitialProps(appContext);

    let user = null;
    // Check if we have the user information from the server
    if (
        appContext.ctx.req &&
        appContext.ctx.req.session &&
        appContext.ctx.req.session.passport &&
        appContext.ctx.req.session.passport.user
    ) {
        // we have the user information and we return it as a prop
        user = appContext.ctx.req.session.passport.user;
    }

    return { ...appProps, user: user };
};

export default MyApp;
