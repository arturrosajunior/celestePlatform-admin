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
  const [idPost, setidPost] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const noDelete = () => {
    props.OpenAlertMensage(
      "Cuidado, você pode deletar sem querer!",
      "warning",
      true
    );
    props.handleSetSelectRow('');
    setidPost("");
    handleCloseModal();
  };

  const editRow = () => {
    handleCloseModal();
    props.openModalUpdate(true);
  };

  const deleteApi = async () => {
    const res = await props.handleDelete(idPost);
    if (res) {
      await props.handleList();
      props.OpenAlertMensage("Deletado da lista", "success", true);
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
          pageSize={50}
          onSelectionModelChange={(ids) => {
            setidPost(ids.toString());
            const selectedRows = props.listRows.filter(
              (row) => ids.toString() === ""+row.id
            );
            console.log("selectedRows", selectedRows);
            props.handleSetSelectRow(selectedRows);

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
    </>
  );
};

export default GridListItens;
