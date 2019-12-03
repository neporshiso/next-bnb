const LoginModal = props => (
    <>
        <h2>Login In</h2>
        <div>
            <form
                onSubmit={e => {
                    alert("Log in!");
                    e.preventDefault();
                }}
            >
                <input id="email" type="email" placeholder="Email address" />
                <input id="password" type="password" placeholder="Password" />
                <button>Log In</button>
            </form>
        </div>
        <p>
            Don't have an account yet?{" "}
            <a href="#" onClick={() => props.showSignup()}>
                Sign Up
            </a>
        </p>
    </>
);

export default LoginModal;
