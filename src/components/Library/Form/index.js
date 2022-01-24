import React, { useState } from "react";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import KeyIcon from "@mui/icons-material/Key";
import PublicIcon from "@mui/icons-material/Public";
import LinkIcon from "@mui/icons-material/Link";
import { CalendarToday } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";

import API from "services/api";

const styleInput = {
  width: "100%",
  mb: 3,
};

const initialValues = {
  content: "",
  news_content: "",
  keywords: "",
  news_source: "",
  news_reference: "",
  news_link: "",
  news_publication_date: "",
};

const FormLibrary = () => {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  function onChange(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
    //console.log(values)
  }

  function sendPostLibrary() {
    handleClick(true);
    API.post("library_item/", values).then((response) => {
      if(response.data.success) setLoading(!response.data.success);
    });
    //reset form
    setValues(initialValues);
  }

  function handleClick(changeLoading) {
    setLoading(changeLoading);
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
            value={values.content}
            name="content"
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
            name="news_content"
            value={values.news_content}
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
            value={values.keywords}
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
            name="news_source"
            value={values.news_source}
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
            name="news_reference"
            value={values.news_reference}
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
            label="Links"
            variant="standard"
            name="news_link"
            value={values.news_link}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            onChange={onChange}
            sx={{ ...styleInput }}
            label="Data Publicação"
            variant="standard"
            name="news_publication_date"
            value={values.news_publication_date}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <LoadingButton
          loadingPosition="start"
          startIcon={<SendIcon />}
          variant="outlined"
          onClick={sendPostLibrary}
          loading={loading}
        >
          Save
        </LoadingButton>
      </Grid>
    </Box>
  );
};

export default FormLibrary;
