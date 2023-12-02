import { createContext, useEffect, useContext, useReducer } from "react";

const URL = "http://localhost:8000";

const CitiesContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true };
        case "city/loaded":
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
            };
        case "city/created":
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
                cities: [...state.cities, action.payload],
            };
        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                currentCity: {},
                cities: state.cities.filter(
                    (city) => city.id !== action.payload
                ),
            };
        case "cities/loaded":
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            };
        case "error":
            return { ...state, error: action.payload };
        default:
            throw new Error("The action is unknown");
    }
}

const initialState = {
    cities: {},
    isLoading: false,
    currentCity: {},
};

/*eslint-disable react/prop-types*/
function CitiesProvider({ children }) {
    const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
        reducer,
        initialState
    );

    async function getCity(id) {
        if (Number(id) === currentCity.id) return;

        dispatch({ type: "loading" });

        try {
            const res = await fetch(`${URL}/cities/${id}`);
            const data = await res.json();

            dispatch({ type: "city/loaded", payload: data });
        } catch (err) {
            dispatch({
                type: "error",
                payload: "There was an error while loading the city...",
            });
            alert(error);
        }
    }

    async function createCity(newCity) {
        dispatch({ type: "loading" });

        try {
            const res = await fetch(`${URL}/cities/`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();

            dispatch({ type: "city/created", payload: data });
        } catch (err) {
            dispatch({
                type: "error",
                payload: "There was an error while creating the city...",
            });
            alert(error);
        }
    }

    async function deleteCity(id) {
        dispatch({ type: "loading" });

        try {
            await fetch(`${URL}/cities/${id}`, {
                method: "DELETE",
            });

            dispatch({ type: "city/deleted", payload: id });
        } catch (err) {
            dispatch({
                type: "error",
                payload: "There was an error while deleting the city...",
            });
            alert(error);
        }
    }

    useEffect(
        function () {
            async function fetchCities() {
                dispatch({ type: "loading" });

                try {
                    const res = await fetch(`${URL}/cities`);
                    const data = await res.json();

                    dispatch({ type: "cities/loaded", payload: data });
                } catch (err) {
                    dispatch({
                        type: "error",
                        payload: "There was an error while loading cities...",
                    });
                    alert(error);
                }
            }

            fetchCities();
        },
        [error]
    );

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                createCity,
                deleteCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);

    if (context === undefined)
        throw new Error("CitiesContext was used outside the CitiesProvider");

    return context;
}

export { CitiesProvider, useCities };
