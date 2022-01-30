import React, { useState, useEffect } from "react";
import API from "services/api";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import FormLibrary from "components/Library/Form";
import { Stack, Button, Divider, Typography } from "@mui/material";
import ListLibrary from "components/Library/ListLibrary";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

const initialAlert = {textAlert: '', typeAlert: ''};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/*
 * Function that returns a grid with API information
 */

const PageLibrary = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openMenssage, setOpenMenssage] = useState(false);
  const [rows, setRows] = useState([]);
  const [alertConfig, setAlertConfig] = useState(initialAlert);

  function handleGetRows() {
    // colocar um loading
    API.get("library_items")
      .then((response) => {
        const newRow = response.data.data.map((item) => {
          return {
            id: item.id,
            content: item.content,
            news_content: item.news_content,
            keywords: item.keywords,
            news_publication_date: item.news_publication_date,
            news_link: item.news_link,
            news_reference: item.news_reference,
            news_source: item.news_source,
          };
        });
        setRows([...newRow]);
      })
      .catch((err) => {
        handleOpenMenssage('textAlert', 'typeAlert', false);
      });
    // end colocar um loading
  }

  useEffect(() => {
    handleGetRows(setRows);
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOpenMenssage = (textAlert, typeAlert, closeModal) => {
    setOpenMenssage(true);
    setAlertConfig({textAlert, typeAlert});
    if(closeModal) setOpenModal(false);
  }

  const handleCloseMessage = () => {
    setOpenMenssage(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <h1>Library</h1>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button variant="outlined" onClick={handleOpenModal}>
          Cadastrar library
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
          <FormLibrary
            handleList={handleGetRows}
            OpenAlertMensage={handleOpenMenssage}
          />
        </Box>
      </Modal>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">Todas as librarys</Typography>
        <ListLibrary listLibrarys={rows} handleList={handleGetRows} OpenAlertMensage={handleOpenMenssage}/>
      </Box>

      {/* alertas */}
      <Snackbar open={openMenssage} autoHideDuration={1800} onClose={handleCloseMessage}>
        <Alert onClose={handleCloseMessage} severity={alertConfig.typeAlert} sx={{ width: "100%" }}>
          {alertConfig.textAlert}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PageLibrary;