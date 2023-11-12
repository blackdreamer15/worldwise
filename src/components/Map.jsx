import { useNavigate /*useSearchParams*/ } from "react-router-dom";
import styles from "./Map.module.css";
import { useState } from "react";

function Map() {
    const navigate = useNavigate();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    // const [searchParams, setSearchParams] = useSearchParams();

    // const lat = searchParams.get("lat");
    // const lng = searchParams.get("lng");

    return (
        <div
            className={styles.mapContainer}
            onClick={() => {
                navigate("form");
            }}
        ></div>
    );
}

export default Map;
