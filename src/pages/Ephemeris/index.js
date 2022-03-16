import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Stack, Button, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ReactLoading from "react-loading";
import GridListItens from "components/GridListItens";
import FormEphemeris from "pages/Ephemeris/Form";
import * as moment from "moment";
import * as serviceCategory from "services/serviceCategory";
import * as serviceEphemeris from "services/serviceEphemeris";

const initialAlert = { textAlert: "", typeAlert: "" };
const columns = [
  { field: "id", headerName: "id", width: 2 },
  { field: "event_date", headerName: "Data", width: 200 },
  { field: "event_title", headerName: "Title", width: 150 },
  { field: "event_description", headerName: "Descrição", width: 280 },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/*
 * Function that returns a grid with API information
 */

const PageEphemeris = () => {
  const [activeLoaging, setActiveLoaging] = useState(true);
  const [openMenssage, setOpenMenssage] = useState(false);
  const [rows, setRows] = useState([]);
  const [alertConfig, setAlertConfig] = useState(initialAlert);
  const [selectRow, setSelectRow] = useState();
  const [categories, setCategories] = useState([]);

  // eslint-disable-next-line
  const handleGetRows = useCallback(async () => {
    const result = await serviceEphemeris.getAllItems();
    if (result.success) {
      const newRow = result.data.map((item) => {
        return {
          id: item.id,
          event_title: item.event_title,
          event_description: item.event_description,
          event_date: moment(item.event_date).utc().format("YYYY-MM-DD"),
          event_time: item.event_time,
          event_location: item.event_location,
          event_link: item.event_link,
          event_image: item.event_image,
          event_ephemeris: item.event_ephemeris,
          event_color: item.event_color,
          event_status: item.event_status,
          event_categories: item.event_categories
        };
      });
      setRows([...newRow]);
    } else {
      handleOpenMenssage("Nada encontrado", "warning");
      setRows([]);
    }
    setActiveLoaging(false);
  }, []);

  const handleGetCategories = useCallback(async () => {
    const result = await serviceCategory.getAllItems();
    if (result.success) {
      const newCategory = result.data.map((item) => {
        return {
          id: item.id,
          title: item.title,
        };
      });
      setCategories([...newCategory]);
    } else {
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleGetRows();
      handleGetCategories();
    }, 3000);
  }, [handleGetRows, handleGetCategories]);

  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }

    setDrawerState(!drawerState);
  };

  const handleOpenMenssage = (textAlert, typeAlert) => {
    setOpenMenssage(true);
    setAlertConfig({ textAlert, typeAlert });
    // if (closeModal) setOpenModal(false);
  };

  const handleCloseMessage = () => {
    setOpenMenssage(false);
  };

  return (
    <div>
      <h1>Ephemeris</h1>

      <Stack
        direction="row"
        // divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button variant="outlined" onClick={() => setDrawerState(true)}>
          Cadastrar
        </Button>

        <Drawer anchor="right" open={drawerState} onClose={toggleDrawer(false)}>
          <Box
            sx={{ mb: 6, width: "80vw", padding: "60px 0 0" }}
            noValidate
            autoComplete="off"
          >
            <FormEphemeris
              handleList={handleGetRows}
              handleClose={toggleDrawer(false)}
              OpenAlertMensage={handleOpenMenssage}
              handlePost={serviceEphemeris.postItem}
              handlePut={serviceEphemeris.putItem}
              setValuesRowOnSelected={setSelectRow}
              valuesRowOnSelected={selectRow}
              categories={categories}
            />
          </Box>
        </Drawer>
      </Stack>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">Todas as datas</Typography>

        {activeLoaging ? (
          <Stack height="100%" alignItems="center" justifyContent="center">
            <ReactLoading type="spinningBubbles" color="#cccccc" />
          </Stack>
        ) : (
          <GridListItens
            listRows={rows}
            handleList={handleGetRows}
            handleDelete={serviceEphemeris.deleteItem}
            OpenAlertMensage={handleOpenMenssage}
            columns={columns}
            openModalUpdate={() => setDrawerState(true)}
            handleSetSelectRow={setSelectRow}
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
