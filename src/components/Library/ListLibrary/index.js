import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import API from "services/api";
import Stack from "@mui/material/Stack";

/*
 *.map is made to fix the api response and associate the variable in setRows
 *const rows is the array with the information that goes into the table

 created columns on table list
 * @field: "id"
 * @field: "content" : text brazilian
 * @field: "news_content" : text english
 * @field: "news_publication_date"
 * @field: "keywords"
 * @field: "news_link"
 * @field: "news_reference"
 * @field: "news_source"
 * @field: "action" : delete
 */

const ListLibrary = (props) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [idDelete, setIdDelete] = useState("");

  console.log(props.loadingAPI);
  console.log(props.listLibrarys);

  const handleClose = () => {
    setOpen(false);
  };

  const noDelete = () => {
    props.OpenAlertMensage(
      "Cuidado, você está tentando deletar!",
      "warning",
      true
    );
    handleClose();
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
    {
      field: "action",
      headerName: "Deletar",
      sortable: false,
      renderCell: (params) => {
        const onClickDelete = () => {
          setContent(params.row);
          setIdDelete(params.row.id);
          setOpen(true);
        };
        return (
          <Button variant="contained" color="secondary" onClick={onClickDelete}>
            <DeleteIcon />
          </Button>
        );
      },
    },
  ];

  const deleteApi = () => {
    API.delete("library_item/" + idDelete)
      .then((res) => {
        props.handleList();
        props.OpenAlertMensage("Library Delete", "success", true);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    handleClose();
  };

  return (
    <>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          loading={props.loadingAPI}
          rows={props.listLibrarys}
          columns={columns}
          checkboxSelection={false}
          pageSize={10}
          onSelectionModelChange={(ids) => {
            setOpen(true);
            console.log(ids.toString());
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
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Deseja realmente excluir?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Texto Original: {content.news_content} <br />
              <br />
              Texto PT: {content.content} <br />
              <br />
              Data: {content.news_publication_date}
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

export default ListLibrary;
