import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };

function reducer(state, action) {
    switch (action.type) {
        case "login":
            return { ...state, user: action.payload, isAuthenticated: true };
        case "logout":
            return { ...state, user: action.payload, isAuthenticated: false };
        default:
            throw new Error("The action is unknown");
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthProvider = ({ children }) => {
    const [{ user, isAuthenticated }, dispatch] = useReducer(initialState);

    function login(email, password) {}

    function logout() {}

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined)
        throw new Error("AuthContext was used outside the AuhProvider");

    return context;
}

export { AuthProvider, useAuth };
