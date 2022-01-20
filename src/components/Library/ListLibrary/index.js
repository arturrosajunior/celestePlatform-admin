import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import API from "services/api";

/* created columns on table list
* @field: "id"
* @field: "content" : text brazilian
* @field: "news_content" : text english
* @field: "news_publication_date" 
* @field: "keywords" 
* @field: "news_link" 
* @field: "news_reference" 
* @field: "news_source" 
*/
const columns = [
  { field: "id", headerName: "ID", width: 2 },
  { field: "news_publication_date", headerName: "Data", width: 180 },
  { field: "content", headerName: "Português", width: 180 },
  { field: "news_content", headerName: "Inglês", width: 180 },
  { field: "keywords", headerName: "keywords", width: 180 },
  { field: "news_link", headerName: "Links", width: 180 },
  { field: "news_reference", headerName: "Referência", width: 180 },
  { field: "news_source", headerName: "ref 2", width: 180 },
];


/*
* Function that returns a grid with API information
*.map is made to fix the api response and associate the variable in setRows
*const rows is the array with the information that goes into the table
*/
const ListLibrary = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    API.get("library_items")
      .then((response) => {
        console.log(response.data.data);
        const rowNovo = response.data.data.map( (item) => {
          return { 
            id: item.id, 
            content: item.content,
            news_content: item.news_content,
            keywords: item.keywords,
            news_publication_date: item.news_publication_date,
            news_link: item.news_link,
            news_reference: item.news_reference,
            news_source: item.news_source
          }
        });
        setRows([...rowNovo]);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} checkboxSelection pageSize={5} />
    </div>
  );
};

export default ListLibrary;
