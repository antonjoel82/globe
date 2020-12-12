import Axios from "axios";
import { GlobeMarker } from "./GlobeTypes";

const MAX_ELEVATION_VAL = 0.408007554596;
type ElevationData = [number, number, number][];
export const getElevationMarkers = async (): Promise<GlobeMarker[]> => {
  try {
    const response = await Axios.get<string>(
      "https://cors-anywhere.herokuapp.com/https://www.newnaw.com/pub/js/webglglobe/worldelevation/elevation_15000.json"
    );

    const results: ElevationData = JSON.parse(
      response.data.replace("var data = ", "")
    );

    const filtered = results
      .map(([value, ...coordinates], index) => {
        // if (index % 3 !== 0) {
        //   return;
        // }

        const colorVal = Math.abs(Math.ceil((value / MAX_ELEVATION_VAL) * 360));

        return {
          id: String(index),
          city: "BUH",
          color: `hsl(${colorVal}, 100%, 50%)`,
          coordinates,
          value,
        };
      })
      .filter((val) => val !== undefined) as GlobeMarker[];
    return filtered;
  } catch (err) {
    console.error("Failed to get elevation data", err);
    return [];
  }
};

export const getMarkers = (): GlobeMarker[] => {
  return Array(100).map((_, index) => {
    return {
      id: String(index),
      city: "BUH",
      color: "#F00",
      coordinates: [1.3521, 103.8198],
      value: 50,
    };
  });
};

export const defaultMarkers: GlobeMarker[] = [
  {
    id: "1",
    city: "Singapore",
    color: "red",
    coordinates: [1.3521, 103.8198],
    value: 50,
  },
  {
    id: "2",
    city: "New York",
    color: "blue",
    coordinates: [40.73061, -73.935242],
    value: 25,
  },
  {
    id: "3",
    city: "San Francisco",
    color: "orange",
    coordinates: [37.773972, -122.431297],
    value: 35,
  },
  {
    id: "4",
    city: "Beijing",
    color: "gold",
    coordinates: [39.9042, 116.4074],
    value: 0,
  },
  {
    id: "5",
    city: "London",
    color: "green",
    coordinates: [51.5074, 0.1278],
    value: 80,
  },
];
