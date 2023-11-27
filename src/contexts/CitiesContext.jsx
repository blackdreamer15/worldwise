import { createContext, useState, useEffect, useContext } from "react";

const URL = "http://localhost:8000";

const CitiesContext = createContext();

/*eslint-disable react/prop-types*/
function CitiesProvider({ children }) {
    const [cities, setCities] = useState([{}]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentCity, setCurrentCity] = useState({});

    async function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch (err) {
            alert("There was an error while loading the data...");
        } finally {
            setIsLoading(false);
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
        } catch (err) {
            alert("There was an error while positing the data...");
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
            value={{ cities, isLoading, currentCity, getCity, createCity }}
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
