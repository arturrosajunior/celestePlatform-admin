import React, { useState, useEffect, useCallback }  from "react";
import * as serviceLibrary from "services/serviceLibrary";
import * as serviceEphemeris from "services/serviceEphemeris";
import * as serviceTag from "services/serviceTag";
import ReactLoading from "react-loading";
import { Stack } from "@mui/material";


const PageDashboard = () => {
  const [activeLoaging, setActiveLoaging] = useState(true);
  const [resultServiceLibrary, setResultServiceLibrary] = useState('');
  const [resultServiceEphemeris, setResultServiceEphemeris] = useState('');
  const [resultServiceTag, setResultServiceTag] = useState('');

  // eslint-disable-next-line
  const handleGetAll = useCallback(async () => {
    const resultServiceLibrary = await serviceLibrary.getAllItems();
    setResultServiceLibrary(resultServiceLibrary.data.length);
    const resultServiceEphemeris = await serviceEphemeris.getAllItems();
    setResultServiceEphemeris(resultServiceEphemeris.data.length);
    const resultServiceTag = await serviceTag.getAllItems();
    setResultServiceTag(resultServiceTag.length);
    setActiveLoaging(false);
  }, []);

  useEffect(() => {
    setTimeout(() => handleGetAll(), 1000);
  }, [handleGetAll]);

  return (
    <div>
      <h1>Dashboard</h1>

      {activeLoaging ? (
          <Stack height="100%" alignItems="center" justifyContent="center">
            <ReactLoading type="spinningBubbles" color="#cccccc" />
          </Stack>
        ) : (
          <div><p>Temos {resultServiceLibrary} library(s) cadastradas.</p>
          <p>Temos {resultServiceEphemeris} Ephemery(s) cadastradas.</p>
          <p>Temos {resultServiceTag} Tags(s) cadastradas.</p></div>
        )}
      

    </div>
  );
};

export default PageDashboard;
