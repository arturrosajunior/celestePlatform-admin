import React, { useState } from "react";

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

const PageLibrary = () => {
  const [open, setOpen] = useState(false);
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
          <FormLibrary />
        </Box>
      </Modal>

      <Box sx={{mt:5}}>
        <Typography variant="h6">
          Todas as librarys
        </Typography>
        <ListLibrary />
      </Box>
    </div>
  );
};

export default PageLibrary;
