import noop from "lodash/noop";
import React, { FC, useEffect, useState } from "react";
import ReactGlobe, { Marker, MarkerCallback, Options } from "react-globe";
import { useMount } from "react-use";
import { GlobeMarker, GlobeEvent, DefocusHandler } from "./GlobeTypes";
import { getElevationMarkers } from "./markers";

function markerTooltipRenderer(marker: Marker) {
  return `CITY: ${marker.city} (Value: ${marker.value})`;
}

const defaultOptions: Partial<Options> = {
  cameraAutoRotateSpeed: 1.5,
  // markerTooltipRenderer,
  markerType: "bar",
  enableMarkerGlow: true,
  markerRadiusScaleRange: [0.05, 0.5],
  // markerOffsetRadiusScale: 0.5,
};

// interface GlobeProps {}
export const Globe: FC = () => {
  const [markers, setMarkers] = useState<GlobeMarker[]>([]);
  const [event, setEvent] = useState<GlobeEvent>({ type: "start" });
  const [details, setDetails] = useState("");
  const [options, setOptions] = useState(defaultOptions);

  useMount(async () => {
    setMarkers(await getElevationMarkers());
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("Updating markers!");
  //     // setMarkers((_markers) =>
  //     //   _markers.map((marker, ndx) => {
  //     //     return {
  //     //       ...marker,
  //     //       value: 0,
  //     //     };
  //     //   })
  //     // );
  //     setOptions((opt: Partial<Options>) => {
  //       return {
  //         ...opt,
  //         markerOffsetRadiusScale: opt.markerOffsetRadiusScale === 2 ? 1 : 2,
  //       };
  //     });
  //   }, 3000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // });

  // const onClickMarker: MarkerCallback = (marker, markerObject, event) => {
  //   setEvent({
  //     type: "CLICK",
  //     marker,
  //     markerObjectID: markerObject.uuid,
  //     pointerEventPosition: { x: event.clientX, y: event.clientY },
  //   });
  //   setDetails(markerTooltipRenderer(marker));
  // };
  // const onDefocus: DefocusHandler = (previousFocus) => {
  //   setEvent({
  //     type: "DEFOCUS",
  //     previousFocus,
  //   });
  //   setDetails("");
  // };

  return (
    <div>
      {/* {details && (
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
      )} */}
      {/* <div style={{ padding: 32 }}>
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
      </div> */}
      <ReactGlobe
        height="80vh"
        markers={markers as Marker[]}
        options={options}
        width="100vh"
        onClickMarker={noop}
        onMouseOverMarker={noop}
        onDefocus={noop}
      />
    </div>
  );
};
