import Link from "next/link";
import { useStoreActions, useStoreState } from "easy-peasy";
import axios from "axios";

const Header = () => {
    const setShowLoginModal = useStoreActions(
        actions => actions.modals.setShowLoginModal
    );

    const setShowRegistrationModal = useStoreActions(
        actions => actions.modals.setShowRegistrationModal
    );

    const user = useStoreState(state => state.user.user);
    const setUser = useStoreActions(actions => actions.user.setUser);

    const logout = async () => {
        await axios.post("/api/auth/logout");
        setUser(null);
    };

    return (
        <div className="nav-container">
            <Link href="/">
                <a>
                    <img src="/images/logo.png" alt="next-bnb" />
                </a>
            </Link>

            <nav>
                <ul>
                    {user ? (
                        <>
                            <li className="username">{user}</li>
                            <li>
                                <a href="#" onClick={async () => logout()}>
                                    Logout
                                </a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <a
                                    href="#"
                                    onClick={() => setShowRegistrationModal()}
                                >
                                    Sign up
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={() => setShowLoginModal()}>
                                    Log in
                                </a>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <style jsx>{`
                ul {
                    margin: 0;
                    padding: 0;
                }

                li {
                    display: block;
                    float: left;
                }

                a {
                    text-decoration: none;
                    display: block;
                    margin-right: 15px;
                    color: #333;
                }
                nav a {
                    padding: 1em 0.5em;
                }
                .nav-container {
                    border-bottom: 2px solid #eee;
                    height: 50px;
                }

                img {
                    float: left;
                }

                ul {
                    float: right;
                }

                .username {
                    padding: 1em 0.5em;
                }
            `}</style>
        </div>
    );
};

export default Header;
