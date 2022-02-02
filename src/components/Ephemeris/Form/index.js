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
  user_id:0,
  event_date:"",
  event_time:"",
  event_title:"",
  event_description:"",
  event_location:"",
  event_link:"",
  event_image:"",
  event_ephemeris:1,
  event_color:"",
  event_status:""
};


const inputsForm = [
  {
    name: "event_date",
    label: "Data",
    type: "date",
    numberGrid: 6,
  },
  {
    name: "event_time",
    label: "Time",
    type: "",
    numberGrid: 6,
  },
  {
    name: "event_title",
    label: "Title",
    type: "",
    numberGrid: 6,
  },
  {
    name: "event_location",
    label: "Local",
    type: "",
    numberGrid: 6,
  },

  {
    name: "event_description",
    label: "Descrição",
    type: "",
    numberGrid: 12,
  },
  {
    name: "event_link",
    label: "Link",
    type: "",
    numberGrid: 12,
  },
];

const FormEphemeris = (props) => {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  console.log(values);

  function onChange(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  }

  function sendPostEphemeri() {
    if (
      values.event_date !== "" &&
      values.event_time !== "" &&
      values.event_title !== "" &&
      values.event_description !== "" &&
      values.event_location !== "" &&
      values.event_link !== ""
    ) {
      setLoading(true);
      API.post("calendar_event/", values).then((response) => {
        if (response.data.success) {
          setLoading(!response.data.success);
          props.handleList();
          props.OpenAlertMensage("Ephemeri save", "success", true);
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
          onClick={sendPostEphemeri}
          loading={loading}
        >
          Save
        </LoadingButton>
      </Grid>
    </Box>
  );
};

export default FormEphemeris;
