import {
    createContext,
    useState,
    useEffect,
    useContext,
    useReducer,
} from "react";

const URL = "http://localhost:8000";

const CitiesContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true };
        case "city/loaded":
            return { ...state, isLoading: false, currentCity: action.payload };

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
    // const [cities, setCities] = useState([{}]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({});

    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
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
            alert("There was an error while loading the data...");
        }
    }

    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const res = await fetch(`${URL}/cities/`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();

            setCities((cities) => [...cities, data]);
        } catch (err) {
            alert("There was an error while positing the data...");
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCity(id) {
        try {
            setIsLoading(true);
            await fetch(`${URL}/cities/${id}`, {
                method: "DELETE",
            });

            setCities((cities) => cities.filter((city) => city.id !== id));
        } catch (err) {
            alert("There was an error while deleting the data...");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (err) {
                alert("There was an error while loading the data...");
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, []);

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
