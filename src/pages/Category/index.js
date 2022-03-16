import React, { useState, useEffect, useCallback } from "react";

import { Stack, Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import Drawer from "@mui/material/Drawer";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ReactLoading from "react-loading";
import FormCategory from "pages/Category/Form";
import GridListItens from "components/GridListItens";
import * as serviceCategory from "services/serviceCategory";
import * as moment from "moment";

const initialAlert = { textAlert: "", typeAlert: "" };
const columns = [
  { field: "id", headerName: "id", width: 2 },
  { field: "title", headerName: "Titulo", width: 280 },
  { field: "parent_id", headerName: "parent_id", width: 2 },
  { field: "user_id", headerName: "user_id", width: 2 },
  { field: "date_created", headerName: "Data Created", width: 150 },
  { field: "date_updated", headerName: "Data Update", width: 150 },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/*
 * Function that returns a grid with API information
 */

const PageCategory = () => {
  const [activeLoaging, setActiveLoaging] = useState(true);
  const [openMenssage, setOpenMenssage] = useState(false);
  const [rows, setRows] = useState([]);
  const [alertConfig, setAlertConfig] = useState(initialAlert);
  const [selectRow, setSelectRow] = useState();

  // eslint-disable-next-line
  const handleGetRows = useCallback(async () => {
    const result = await serviceCategory.getAllItems();
    if (result.success) {
      const newRow = result.data.map((item) => {
        return {
          id: item.id,
          title: item.title,
          parent_id: item.parent_id,
          user_id: item.user_id,
          date_created: moment(item.date_created).utc().format('YYYY-MM-DD'),
          date_updated: moment(item.date_updated).utc().format('YYYY-MM-DD'),
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
      <h1>Categorias</h1>

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
          <FormCategory
            handleList={handleGetRows}
            handleClose={toggleDrawer(false)}
            OpenAlertMensage={handleOpenMenssage}
            handlePost={serviceCategory.postItem}
            handlePut={serviceCategory.putItem}
            valuesRowOnSelected={selectRow}
            setValuesRowOnSelected={setSelectRow}
          />
        </Box>
      </Drawer>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">Todas as categorias</Typography>

        {activeLoaging ? (
          <Stack height="100%" alignItems="center" justifyContent="center">
            <ReactLoading type="spinningBubbles" color="#cccccc" />
          </Stack>
        ) : (
          <GridListItens
            listRows={rows}
            handleList={handleGetRows}
            handleDelete={serviceCategory.deleteItem}
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

export default PageCategory;
