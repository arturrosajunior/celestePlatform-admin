import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import API from "services/api";

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
  const columns = [
    { field: "id", headerName: "id", width: 2 },
    // { field: "news_publication_date", headerName: "Data", width: 180 },
    { field: "content", headerName: "Português", width: 180 },
    { field: "news_content", headerName: "Inglês", width: 180 },
    { field: "keywords", headerName: "keywords", width: 180 },
    // { field: "news_link", headerName: "Links", width: 180 },
    { field: "news_reference", headerName: "Referência", width: 180 },
    { field: "news_source", headerName: "ref 2", width: 180 },
    {
      field: "action",
      headerName: "Deletar",
      sortable: false,
      renderCell: (params) => {
        const onClickDelete = () => {
          API.delete("library_item/" + params.row.id)
            .then((res) => {
              props.handleList();
            })
            .catch((err) => {
              console.error("ops! ocorreu um erro" + err);
            });
        };
        return (
          <Button variant="contained" color="secondary" onClick={onClickDelete}>
            <DeleteIcon />
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={props.listLibrarys}
        columns={columns}
        checkboxSelection={false}
        pageSize={10}
      />
    </div>
  );

};

export default ListLibrary;
