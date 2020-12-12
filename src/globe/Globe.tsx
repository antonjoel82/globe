import React, { FC, useState } from "react";
import ReactGlobe, { Marker, MarkerCallback } from "react-globe";
import { GlobeMarker, GlobeEvent, DefocusHandler } from "./GlobeTypes";
import { defaultMarkers } from "./markers";

function markerTooltipRenderer(marker: Marker) {
  return `CITY: ${marker.city} (Value: ${marker.value})`;
}

const options = {
  markerTooltipRenderer,
};

// interface GlobeProps {}
export const Globe: FC = () => {
  const randomMarkers = defaultMarkers.map((marker) => ({
    ...marker,
    value: Math.floor(Math.random() * 100),
  }));
  const [markers, setMarkers] = useState<GlobeMarker[]>([]);
  const [event, setEvent] = useState<GlobeEvent>({ type: "start" });
  const [details, setDetails] = useState("");

  const onClickMarker: MarkerCallback = (marker, markerObject, event) => {
    setEvent({
      type: "CLICK",
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY },
    });
    setDetails(markerTooltipRenderer(marker));
  };
  const onDefocus: DefocusHandler = (previousFocus) => {
    setEvent({
      type: "DEFOCUS",
      previousFocus,
    });
    setDetails("");
  };

  return (
    <div>
      {details && (
        <div
          style={{
            background: "white",
            position: "absolute",
            fontSize: 20,
            bottom: 0,
            right: 0,
            padding: 12,
          }}
        >
          <p>{details}</p>
          <p>
            EVENT: type={event.type}, position=
            {JSON.stringify(event.pointerEventPosition)}
          </p>
        </div>
      )}
      <div style={{ padding: 32 }}>
        <button onClick={() => setMarkers(randomMarkers)}>
          Randomize markers
        </button>
        <button disabled={markers.length === 0} onClick={() => setMarkers([])}>
          Clear markers
        </button>
        <button
          disabled={markers.length === randomMarkers.length}
          onClick={() =>
            setMarkers([...markers, randomMarkers[markers.length]])
          }
        >
          Add marker
        </button>
        <button
          disabled={markers.length === 0}
          onClick={() => setMarkers(markers.slice(0, markers.length - 1))}
        >
          Remove marker
        </button>
      </div>
      <ReactGlobe
        height="100vh"
        markers={markers as Marker[]}
        options={options}
        width="100vw"
        onClickMarker={onClickMarker}
        onDefocus={onDefocus}
      />
    </div>
  );
};
