import React, { useState } from "react";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";

import API from "services/api";

const styleInput = {
  width: "100%",
  mb: 3,
};

const initialValues = {
  news_content: "",
  content: "",
  keywords: "",
  news_source: "",
  news_reference: "",
  news_link: "",
  news_publication_date: "",
};

const inputsForm = [
  {
    name: "news_publication_date",
    label: "Data",
    type: "date",
    numberGrid: 6,
  },
  {
    name: "news_link",
    label: "Link",
    type: "",
    numberGrid: 6,
  },
  {
    name: "news_reference",
    label: "Referência",
    type: "",
    numberGrid: 6,
  },
  {
    name: "news_source",
    label: "Fonte",
    type: "",
    numberGrid: 6,
  },

  {
    name: "news_content",
    label: "Texto Original",
    type: "",
    numberGrid: 12,
  },
  {
    name: "content",
    label: "Texto PT",
    type: "",
    numberGrid: 12,
  },
  {
    name: "keywords",
    label: "Keywords",
    type: "",
    numberGrid: 12,
  },
];

const FormLibrary = (props) => {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  function onChange(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  }

  function sendPostLibrary() {
    if (
      values.content !== "" &&
      values.keywords !== "" &&
      values.news_content !== "" &&
      values.news_link !== "" &&
      values.news_publication_date !== "" &&
      values.news_reference !== "" &&
      values.news_source !== ""
    ) {
      setLoading(true);
      API.post("library_item/", values).then((response) => {
        if (response.data.success) {
          setLoading(!response.data.success);
          props.handleList();
          props.OpenAlertMensage("Library save", "success", true);
        }
      });
    } else {
      props.OpenAlertMensage("Required all field", "error", false);
    }
  }

  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { mb: 6, width: "100%" } }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={1}>
        {inputsForm.map((input, i) => (
          <Grid item sm={input.numberGrid} key={i}>
            <TextField
              onChange={onChange}
              sx={{ ...styleInput }}
              placeholder={input.label}
              variant="standard"
              type={input.type}
              name={input.name}
            />
          </Grid>
        ))}
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
