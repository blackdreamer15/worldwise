import { useNavigate /*useSearchParams*/ } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
    const navigate = useNavigate();
    // const [searchParams, setSearchParams] = useSearchParams();

    // const lat = searchParams.get("lat");
    // const lng = searchParams.get("lng");

    return (
        <div
            className={styles.mapContainer}
            onClick={() => {
                navigate("form");
            }}
        >
            {/* <h2>
        lat:{lat} and lng: {lng}
      </h2>

      <button onClick={() => setSearchParams({ lat: 23, lng: 25 })}>
        Change PARMS
      </button> */}
        </div>
    );
}

export default Map;
