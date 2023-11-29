import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

/*eslint-disable react/prop-types*/
function CityItem({ city }) {
    const {
        emoji,
        cityName,
        date,
        id,
        position: { lat, lng },
    } = city;

    const { currentCity, deleteCity } = useCities();

    function handleClick(e) {
        e.preventDefault();
        deleteCity(id);
    }

    return (
        <li>
            <Link
                className={`${styles.cityItem} ${
                    id === currentCity.id && styles["cityItem--active"]
                }`}
                to={`${id}?lat=${lat}&lng=${lng}`}
            >
                <span className={styles.emoji}>{emoji}</span>
                <span className={styles.name}>{cityName}</span>
                <time className={styles.date}>{formatDate(date || null)}</time>
                <button className={styles.deleteBtn} onClick={handleClick}>
                    &times;
                </button>
            </Link>
        </li>
    );
}

export default CityItem;
