import React, { useState, useEffect, useCallback } from "react";

import { Stack, Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import Drawer from "@mui/material/Drawer";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ReactLoading from "react-loading";
import FormLibrary from "components/Library/Form";
import GridListItens from "components/GridListItens";
import * as serviceLibrary from "services/serviceLibrary";

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

const columns = [
  { field: "id", headerName: "id", width: 2 },
  { field: "news_publication_date", headerName: "Data", width: 150 },
  { field: "content", headerName: "Português", width: 180 },
  { field: "news_content", headerName: "Inglês", width: 180 },
  { field: "keywords", headerName: "keywords", width: 180 },
  { field: "news_link", headerName: "Links", width: 180 },
  { field: "news_reference", headerName: "Referência", width: 180 },
  { field: "news_source", headerName: "Fonte", width: 180 },
];

const initialAlert = { textAlert: "", typeAlert: "" };

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/*
 * Function that returns a grid with API information
 */

const PageLibrary = () => {
  const [activeLoaging, setActiveLoaging] = useState(true);
  const [openMenssage, setOpenMenssage] = useState(false);

  const [rows, setRows] = useState([]);
  const [alertConfig, setAlertConfig] = useState(initialAlert);

  // eslint-disable-next-line
  const handleGetRows = useCallback(async () => {
    const result = await serviceLibrary.getAllItems();
    if (result.success) {
      const newRow = result.data.map((item) => {
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
    } else {
      console.error("error ", result);
    }
    setActiveLoaging(false);
  }, []);

  useEffect(() => {
    setTimeout(() => handleGetRows(), 3000);
  }, [handleGetRows]);

  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState(!drawerState);
  };

  const handleOpenMenssage = (textAlert, typeAlert, closeModal) => {
    setOpenMenssage(true);
    setAlertConfig({ textAlert, typeAlert });
  };
  const handleCloseMessage = () => {
    setOpenMenssage(false);
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
        <Button variant="outlined" onClick={() => setDrawerState(true)}>
          Cadastrar library
        </Button>
      </Stack>

      <Drawer anchor="right" open={drawerState} onClose={toggleDrawer(false)}>
        <Box
          sx={{ mb: 6, width: "80vw", padding: "60px 0 0" }}
          noValidate
          autoComplete="off"
        >
          <FormLibrary
            handleList={handleGetRows}
            handleClose={toggleDrawer(false)}
            OpenAlertMensage={handleOpenMenssage}
          />
        </Box>
      </Drawer>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">Todas as librarys</Typography>

        {activeLoaging ? (
          <Stack height="100%" alignItems="center" justifyContent="center">
            <ReactLoading type="spinningBubbles" color="#cccccc" />
          </Stack>
        ) : (
          // <ListLibrary
          //   listLibrarys={rows}
          //   handleList={handleGetRows}
          //   OpenAlertMensage={handleOpenMenssage}
          // />

          <GridListItens
            listRows={rows}
            handleList={handleGetRows}
            handleDelete={serviceLibrary.deleteItem}
            OpenAlertMensage={handleOpenMenssage}
            columns={columns}
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

export default PageLibrary;
