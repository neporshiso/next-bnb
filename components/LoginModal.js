import { useState } from "react";
import axios from "axios";
import { useStoreActions } from "easy-peasy";

const LoginModal = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setUser = useStoreActions(actions => actions.user.setUser);
    const setHideModal = useStoreActions(
        actions => actions.modals.setHideModal
    );

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password
            });
            if (response.data.status === "error") {
                alert(response.data.message);
                return;
            }
            setUser(email);
            setHideModal();
        } catch (error) {
            alert(error.response.data.message);
            return;
        }
    };

    return (
        <>
            <h2>Login In</h2>
            <div>
                <form onSubmit={e => handleSubmit(e)}>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email address"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
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
};

export default LoginModal;
