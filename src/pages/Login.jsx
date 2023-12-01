import { useState, useNavigate, useEffect } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";

export default function Login() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // PRE-FILL FOR DEV PURPOSES
    const [email, setEmail] = useState("jack@example.com");
    const [password, setPassword] = useState("qwerty");

    useEffect(
        function () {
            if (isAuthenticated) navigate("/app");
        },
        [isAuthenticated]
    );

    function handleSubmit(e) {
        e.preventDefault();

        if (email && password) login(email, password);
    }

    return (
        <main className={styles.login}>
            <PageNav />

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <button type="primary">Login</button>
                </div>
            </form>
        </main>
    );
}
