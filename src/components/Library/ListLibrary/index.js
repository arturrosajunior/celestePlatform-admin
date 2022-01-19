import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import API from "services/api";

const columns = [
  { field: "id", headerName: "ID", width: 2 },
  { field: "name", headerName: "nOme", width: 200 },
  { field: "txtpt", headerName: "Português", width: 300 },
  { field: "txten", headerName: "Inglês", width: 300 },
  { field: "keywords", headerName: "key words", width: 300 },
  { field: "ref", headerName: "ref" },
  { field: "fonte", headerName: "Fonte" },
  { field: "link1", headerName: "Link 1" },
  { field: "link2", headerName: "Link 2" },
];

const ListLibrary = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    API
    .get("users")
    .then((response) => setRows(response.data))
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
