import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";

/*
 *.map is made to fix the api response and associate the variable in setRows
 *const rows is the array with the information that goes into the table

 created columns on table list
 * @field: "id"
 * @field
 */

const GridListItens = (props) => {
  const [open, setOpenModal] = useState(false);
  const [content, setContent] = useState("");
  const [idPost, setidPost] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const noDelete = () => {
    props.OpenAlertMensage(
      "Cuidado, você está tentando deletar!",
      "warning",
      true
    );
    handleCloseModal();
  };

  const deleteApi = async () => {
    const res = await props.handleDelete(idPost);
    if (res) {
      await props.handleList();
      props.OpenAlertMensage("Ephemeris Delete", "success", true);
    } else {
      console.error("ops! ocorreu um erro" + res);
    }
    handleCloseModal();
  };

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={props.listRows}
          columns={props.columns}
          checkboxSelection={false}
          pageSize={10}
          onSelectionModelChange={(ids) => {
            setContent(ids.toString());
            setidPost(ids.toString());
            setOpenModal(true);
          }}
          components={{
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                <Typography textAlign="center">
                  Ainda não temos nada para mostrar! <br />
                  Que tal cadastrar?
                </Typography>
              </Stack>
            ),
            NoResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                Local filter returns no result
              </Stack>
            ),
          }}
        />
      </div>
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
              {content.id}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={noDelete}>Não</Button>
            <Button onClick={deleteApi}>Apargar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default GridListItens;
