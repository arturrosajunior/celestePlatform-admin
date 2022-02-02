import React, { useState, useEffect, useCallback } from "react";
import API from "services/api";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { Stack, Button, Divider, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ReactLoading from "react-loading";
import ListEphemeris from "components/Ephemeris/ListEphemeris";
import FormEphemeris from "components/Ephemeris/Form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #ccc",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const initialAlert = { textAlert: "", typeAlert: "" };

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/*
 * Function that returns a grid with API information
 */

const PageEphemeris = () => {
  const [openModal, setOpenModal] = useState(false);
  const [activeLoaging, setActiveLoaging] = useState(true);
  const [openMenssage, setOpenMenssage] = useState(false);

  const [rows, setRows] = useState([]);
  const [alertConfig, setAlertConfig] = useState(initialAlert);

  // eslint-disable-next-line
  const handleGetRows = useCallback(() => {
    // colocar um loading
    API.get("calendar_events")
      .then((response) => {
        const newRow = response.data.data.map((item) => {
          return {
            id: item.id,
            event_title: item.event_title,
            event_description: item.event_description,
            event_date: item.event_date,
          };
        });
        setRows([...newRow]);
      })
      .catch((err) => {
        handleOpenMenssage("textAlert", "typeAlert", false);
      });

    setActiveLoaging(false);
  }, []);

  useEffect(() => {
    setTimeout(() => handleGetRows(), 3000);
  }, [handleGetRows]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOpenMenssage = (textAlert, typeAlert, closeModal) => {
    setOpenMenssage(true);
    setAlertConfig({ textAlert, typeAlert });
    if (closeModal) setOpenModal(false);
  };

  const handleCloseMessage = () => {
    setOpenMenssage(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <h1>Ephemeris</h1>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button variant="outlined" onClick={handleOpenModal}>
          Cadastrar
        </Button>
      </Stack>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        ref={{}}
      >
        <Box
          sx={{ ...style, "& > :not(style)": { mb: 6, width: "100%" } }}
          noValidate
          autoComplete="off"
        >
          <FormEphemeris
            handleList={handleGetRows}
            OpenAlertMensage={handleOpenMenssage}
          />
        </Box>
      </Modal>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">Todas as datas</Typography>

        {activeLoaging ? (
          <Stack height="100%" alignItems="center" justifyContent="center">
            <ReactLoading type="spinningBubbles" color="#cccccc" />
          </Stack>
        ) : (
          <ListEphemeris
            listEphemeris={rows}
            handleList={handleGetRows}
            OpenAlertMensage={handleOpenMenssage}
          />
        )}
      </Box>

      {/* alertas */}
      <Snackbar
        open={openMenssage}
        autoHideDuration={1800}
        onClose={handleCloseMessage}
      >
        <Alert
          onClose={handleCloseMessage}
          severity={alertConfig.typeAlert}
          sx={{ width: "100%" }}
        >
          {alertConfig.textAlert}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PageEphemeris;
