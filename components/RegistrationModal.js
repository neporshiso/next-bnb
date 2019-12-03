import { useState } from "react";
import axios from "axios";

const RegistrationModal = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const submit = async e => {
        try {
            const response = await axios.post("/api/auth/register", {
                email,
                password,
                passwordConfirmation
            });
            console.log(response)
            e.preventDefault()
            if (response.data.status === "error") {
                alert(response.data.message);
                return;
            }
        } catch (err) {
            alert(err.response.data.message);
            return;
        }
    };

    return (
        <>
            <h2>Sign up</h2>
            <div>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        submit();
                    }}
                >
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
                    <input
                        id="passwordConfirmation"
                        type="password"
                        placeholder="Enter password again"
                        onChange={e => setPasswordConfirmation(e.target.value)}
                    />
                    <button>Sign up</button>
                    <p>
                        Already have an account?{" "}
                        <a href="#" onClick={() => props.showLogin()}>
                            Log in
                        </a>
                    </p>
                </form>
            </div>
        </>
    );
};

export default RegistrationModal;
