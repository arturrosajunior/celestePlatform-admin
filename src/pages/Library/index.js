import React, { useState, useEffect } from "react";
import API from "services/api";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import FormLibrary from "components/Library/Form";
import { Stack, Button, Divider, Typography } from "@mui/material";
import ListLibrary from "components/Library/ListLibrary";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/*
 * Function that returns a grid with API information
 */

const PageLibrary = () => {
  const [open, setOpen] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);
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

  function handleOpenMsg() {
    setOpenMsg(true);
  }

  const handleClose = () => {
    setOpen(false);
    setOpenMsg(false);
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
          <FormLibrary
            handleList={handleGetRows}
            handleOpenSuccess={handleOpenMsg}
          />
        </Box>
      </Modal>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">Todas as librarys</Typography>
        <ListLibrary listLibrarys={rows} handleList={handleGetRows} />
      </Box>

      <Snackbar open={openMsg} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {/* <img src="https://static.imgs.app/content/2.0.0/assetz/uploads/fun/09/21/12/13/xKLyYZjHs41CYnxfwSPg9wZJfbau8zWhj7Ut8V8zUIu4tL7D1Lb68y6BD5PR-8126417631632237226-156858-fs.gif" alt="zoeira" /> */}

          Cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PageLibrary;