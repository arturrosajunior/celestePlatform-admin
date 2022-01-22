import React, { useState } from "react";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import KeyIcon from "@mui/icons-material/Key";
import PublicIcon from "@mui/icons-material/Public";
import LinkIcon from "@mui/icons-material/Link";
import { CalendarToday } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from '@mui/lab/LoadingButton';

const styleInput = {
  width: "100%",
  mb: 3,
};

const initialValues = {
  txtpt: "",
  txten: "",
  keywords: "",
  fonte: "",
  ref: "",
  link1: "",
  link2: "",
  dataPublish: "",
};

const FormLibrary = () => {
  const [values, setValues] = useState(initialValues);

  function onChange(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  }
  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { mb: 6, width: "100%" } }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            onChange={onChange}
            sx={{ ...styleInput }}
            label="Texto PT"
            variant="standard"
            multiline
            rows={2}
            name="txtpt"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TextFieldsIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            onChange={onChange}
            sx={{ ...styleInput }}
            label="Texto EN"
            variant="standard"
            multiline
            rows={2}
            name="txten"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TextFieldsIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            onChange={onChange}
            sx={{ ...styleInput }}
            label="Palavras-chave"
            variant="standard"
            multiline
            name="keywords"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            onChange={onChange}
            sx={{ ...styleInput }}
            label="Fonte"
            variant="standard"
            name="fonte"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PublicIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            onChange={onChange}
            sx={{ ...styleInput }}
            label="Referência"
            variant="standard"
            name="ref"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PublicIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item sm={4}>
          <TextField
            onChange={onChange}
            sx={{ ...styleInput }}
            label="Link 1"
            variant="standard"
            name="link1"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item sm={4}>
          <TextField
            onChange={onChange}
            sx={{ ...styleInput }}
            label="Link 2"
            variant="standard"
            name="link2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item sm={4}>
          <TextField
            onChange={onChange}
            sx={{ ...styleInput }}
            label="Data Publicação"
            variant="standard"
            name="dataPublish"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Button
          variant="contained"
          endIcon={<SendIcon />}
        >
          Cadastrar
        </Button>

        <LoadingButton
  loadingPosition="start"
  startIcon={<SendIcon />}
  variant="outlined"
  onClick={handleClick}
  loading={loading}
>
  Save
</LoadingButton>
      </Grid>
    
    </Box>
  );
};

export default FormLibrary;
