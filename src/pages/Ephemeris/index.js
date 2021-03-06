import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Stack, Button, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from '@mui/material/Divider';
import ReactLoading from "react-loading";
import GridListItens from "components/GridListItens";
import FormEphemeris from "pages/Ephemeris/Form";
import Switch from "@mui/material/Switch";
import * as moment from "moment";
import * as serviceCategory from "services/serviceTag";
import * as serviceEphemeris from "services/serviceEphemeris";
import Kalend, { CalendarView } from "kalend";
import "kalend/dist/styles/index.css";
import { StyledKalend } from "./style";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
  const [open, setOpenModal] = useState(false);
  const [idPost, setidPost] = useState("");
//  
  const [activeLoaging, setActiveLoaging] = useState(true);
  const [viewCalendar, setViewCalendar] = useState(false);
  const [openMenssage, setOpenMenssage] = useState(false);
  const [rows, setRows] = useState([]);
  const [alertConfig, setAlertConfig] = useState(initialAlert);
  const [selectRow, setSelectRow] = useState();
  const [categories, setCategories] = useState([]);
  const [drawerState, setDrawerState] = useState(false);
  const [eventsCalendar, setEventsCalendar] = useState([]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const noDelete = () => {
    handleOpenMenssage(
      "Cuidado, você pode deletar sem querer!",
      "warning",
      true
    );
    setSelectRow('');
    setidPost("");
    handleCloseModal();
  };

  const editRow = () => {
    handleCloseModal();
    setDrawerState(true)
  };

  const deleteApi = async () => {
    const res = await serviceEphemeris.deleteItem(idPost);
    if (res) {
      await handleGetRows();
      handleOpenMenssage("Deletado da lista", "success", true);
    } else {
      console.error("ops! ocorreu um erro" + res);
    }
    handleCloseModal();
  };

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
          event_categories: item.event_categories,
        };
      });
      setRows([...newRow]);

      const newEventCalendar = result.data.map((item) => {
        return {
          id: item.id,
          startAt: item.event_date,
          endAt: item.event_date,
          summary: item.event_title,
          color: item.event_color,
          calendarID: "ephemeris",
        };
      });
      setEventsCalendar(newEventCalendar);
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

  const toggleDrawer = (open) => (event) => {
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

  const onEventClick = ($event) => {
    const selectedRows = rows.filter(
      (row) => $event.id.toString() === ""+row.id
    );
    setSelectRow(selectedRows);
    setidPost($event.id);
    setOpenModal(true);
    return;
  };
  const onNewEventClick = () => {
    return;
  };
  const onSelectView = () => {
    return;
  };
  const onPageChange = () => {
    return;
  };
  const changeViewList = () => {
    setViewCalendar(!viewCalendar);
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
        <FormControlLabel
          control={
            <Switch
              checked={viewCalendar}
              onChange={changeViewList}
              color="secondary"
            />
          }
          label="Ver como calendário?"
        />

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
          <>
            {viewCalendar ? (
              <StyledKalend>
                <Kalend
                  onEventClick={onEventClick}
                  onNewEventClick={onNewEventClick}
                  events={eventsCalendar}
                  initialDate={new Date().toISOString()}
                  hourHeight={60}
                  initialView={CalendarView.MONTH}
                  disabledViews={[
                    CalendarView.DAY,
                    CalendarView.THREE_DAYS,
                    CalendarView.WEEK,
                    CalendarView.AGENDA,
                  ]}
                  onSelectView={onSelectView}
                  onPageChange={onPageChange}
                  timeFormat={"24"}
                  weekDayStart={"Monday"}
                  calendarIDsHidden={["work"]}
                  language={"en"}
                />
              </StyledKalend>
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
          </>
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
      <div>
        <Dialog
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Deseja excluir?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              POST: {idPost}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={noDelete}>Fazer nada</Button>
            <Button onClick={editRow}>Editar</Button>
            <Button onClick={deleteApi}>Deletar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default PageEphemeris;
