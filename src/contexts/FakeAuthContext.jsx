import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
}


const FAKE_USER = {
    name: "Felipe",
    email: "felipe@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case 'logout':
            return {
                initialState
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

function AuthProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)

    const { user, isAuthenticated } = state


    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({
                type: 'login',
                payload: FAKE_USER
            })
        }

    }
    function logout() {
        dispatch({
            type: 'logout'
        })
    }




    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>

            {children}


        </AuthContext.Provider>
    )

}


export { AuthProvider, useAuth }

function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}