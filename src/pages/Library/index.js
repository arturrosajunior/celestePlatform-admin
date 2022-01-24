import React, { useState, useEffect } from "react";
import API from "services/api";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import FormLibrary from "components/Library/Form";
import { Stack, Button, Divider, Typography } from "@mui/material";
import ListLibrary from "components/Library/ListLibrary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #ccc",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


/*
 * Function that returns a grid with API information
 */

const PageLibrary = () => {

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  function handleGetRows() {

    // colocar um loading
    
    API.get("library_items")
    .then((response) => {
      
      const rowNovo = response.data.data.map((item) => {
        return {
          id: item.id,
          content: item.content,
          news_content: item.news_content,
          keywords: item.keywords,
          news_publication_date: item.news_publication_date,
          news_link: item.news_link,
          news_reference: item.news_reference,
          news_source: item.news_source,
        };
      });
      setRows([...rowNovo]);
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
    // end colocar um loading
  }
  
  useEffect(() => {
    handleGetRows(setRows);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Library</h1>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button variant="outlined" onClick={handleOpen}>
          Cadastrar library
        </Button>
      </Stack>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        ref={{}}
      >
        <Box
          sx={{ ...style, "& > :not(style)": { mb: 6, width: "100%" } }}
          noValidate
          autoComplete="off"
        >
          <FormLibrary handleList={handleGetRows} />
        </Box>
      </Modal>

      <Box sx={{mt:5}}>
        <Typography variant="h6">
          Todas as librarys
        </Typography>
        <ListLibrary listLibrarys={rows} handleList={handleGetRows} />
      </Box>
    </div>
  );
};

export default PageLibrary;
