import { Marker, Coordinates } from "react-globe";

export interface GlobeMarker extends Marker {
  city: string;
}

export interface GlobePointerEventPosition {
  x: number;
  y: number;
}

export interface GlobeEvent {
  type: string;
  marker?: Marker;
  markerObjectID?: string;
  pointerEventPosition?: GlobePointerEventPosition;
  previousFocus?: Coordinates;
}

export type DefocusHandler = (previousFocus: Coordinates) => void;
