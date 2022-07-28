import React, { useState, useEffect, useCallback } from "react";

import { Stack, Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import Drawer from "@mui/material/Drawer";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ReactLoading from "react-loading";
import FormSection from "pages/Section/Form";
import GridListItens from "components/GridListItens";
import * as serviceSection from "services/serviceSection";
import * as moment from "moment";

const initialAlert = { textAlert: "", typeAlert: "" };
const columns = [
  { field: "id", headerName: "id", width: 2 },
  { field: "title", headerName: "Titulo", width: 280 },
  { field: "parent_id", headerName: "parent_id", width: 2 },
  { field: "user_id", headerName: "user_id", width: 2 },
  { field: "created_at", headerName: "Data Created", width: 150 },
  { field: "updated_at", headerName: "Data Update", width: 150 },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/*
 * Function that returns a grid with API information
 */

const PageSection = () => {
  const [activeLoaging, setActiveLoaging] = useState(true);
  const [openMenssage, setOpenMenssage] = useState(false);
  const [rows, setRows] = useState([]);
  const [alertConfig, setAlertConfig] = useState(initialAlert);
  const [selectRow, setSelectRow] = useState();

  // eslint-disable-next-line
  const handleGetRows = useCallback(async () => {
    const result = await serviceSection.getAllItems();
    if (result) {
      const newRow = result.map((item) => {
        return {
          id: item.id,
          title: item.title,
          user_id: 1,
          created_at: moment(item.created_at).utc().format('YYYY-MM-DD'),
          updated_at: moment(item.updated_at).utc().format('YYYY-MM-DD'),
        };
      });
      setRows([...newRow]);
    } else {
      handleOpenMenssage('Nada encontrado', "warning")
      setRows([]);
    }
    setActiveLoaging(false);
  }, []);

  useEffect(() => {
    setTimeout(() => handleGetRows(), 3000);
  }, [handleGetRows]);

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
  };

  const handleCloseMessage = () => {
    setOpenMenssage(false);
  };

  return (
    <div>
      <h1>Section</h1>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button variant="outlined" onClick={() => setDrawerState(true)}>
          Cadastrar
        </Button>
      </Stack>

      <Drawer anchor="right" open={drawerState} onClose={toggleDrawer(false)}>
        <Box
          sx={{ mb: 6, width: "80vw", padding: "60px 0 0" }}
          noValidate
          autoComplete="off"
        >
          <FormSection
            handleList={handleGetRows}
            handleClose={toggleDrawer(false)}
            OpenAlertMensage={handleOpenMenssage}
            handlePost={serviceSection.postItem}
            handlePut={serviceSection.putItem}
            valuesRowOnSelected={selectRow}
            setValuesRowOnSelected={setSelectRow}
          />
        </Box>
      </Drawer>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">Todas as Sections</Typography>

        {activeLoaging ? (
          <Stack height="100%" alignItems="center" justifyContent="center">
            <ReactLoading type="spinningBubbles" color="#cccccc" />
          </Stack>
        ) : (
          <GridListItens
            listRows={rows}
            handleList={handleGetRows}
            handleDelete={serviceSection.deleteItem}
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

export default PageSection;
