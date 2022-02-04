import React, { useState } from "react";

import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { useFormik } from "formik";

import * as Yup from "yup";

const FormEphemeris = (props) => {
  const validationSchema = Yup.object().shape({
    event_date: Yup.date().required("O campo é obrigatório, 00/00/0000"),
    event_title: Yup.string()
      .required("O campo é obrigatório")
      .min(10, "Digite no mínimo 10 caracteres"),
    event_description: Yup.string().required("O campo é obrigatório"),
    event_location: Yup.string().required("O campo é obrigatório"),
    event_link: Yup.string().required("O campo é obrigatório"),
    event_time: Yup.string().required("O campo é obrigatório inserir, ex: 00:00"),
  });
  const formik = useFormik({
    initialValues: {
      user_id: 0,
      event_date: "",
      event_time: "",
      event_title: "",
      event_description: "",
      event_location: "",
      event_link: "",
      event_image: "",
      event_ephemeris: 1,
      event_color: "",
      event_status: "",
    },
    onSubmit: (values) => {
      sendPostEphemeri(values);
    },
    validationSchema: validationSchema,
  });

  const [loading, setLoading] = useState(false);

  async function sendPostEphemeri(values){
    try {
      setLoading(true);
      const res = await props.handlePost(values);
      if (res) {
        setLoading(!res);
        await props.handleList();
        props.OpenAlertMensage("Ephemeri save", "success", true);
      }
    } catch (err) {
      props.OpenAlertMensage(
        "Algo deu errado, tente novamente.",
        "error",
        false
      );
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2} columns={12}>
          <Grid item md={4}>
            <TextField
              name="event_date"
              type="date"
              value={formik.event_date}
              onChange={formik.handleChange}
              error={
                formik.touched.event_date &&
                Boolean(formik.errors.event_date)
              }
              helperText={
                formik.touched.event_date &&
                formik.errors.event_date
              }
              fullWidth
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              name="event_time"
              type="time"
              value={formik.event_time}
              onChange={formik.handleChange}
              error={
                formik.touched.event_time && Boolean(formik.errors.event_time)
              }
              helperText={formik.touched.event_time && formik.errors.event_time}
              fullWidth
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              name="event_location"
              label="Local"
              type="text"
              value={formik.event_location}
              onChange={formik.handleChange}
              error={
                formik.touched.event_location &&
                Boolean(formik.errors.event_location)
              }
              helperText={
                formik.touched.event_location && formik.errors.event_location
              }
              fullWidth
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              name="event_title"
              label="Titulo"
              value={formik.event_title}
              onChange={formik.handleChange}
              error={
                formik.touched.event_title &&
                Boolean(formik.errors.event_title)
              }
              helperText={
                formik.touched.event_title && formik.errors.event_title
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="event_link"
              label="Link"
              type="url"
              value={formik.event_link}
              onChange={formik.handleChange}
              error={
                formik.touched.event_link && Boolean(formik.errors.event_link)
              }
              helperText={formik.touched.event_link && formik.errors.event_link}
              fullWidth
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              name="event_description"
              label="Descrição"
              value={formik.event_description}
              onChange={formik.handleChange}
              error={formik.touched.event_description && Boolean(formik.errors.event_description)}
              helperText={formik.touched.event_description && formik.errors.event_description}
              fullWidth
              multiline
              minRows={10}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <LoadingButton
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
          loading={loading}
          type="submit"
          color="primary"
        >
          Salvar
        </LoadingButton>
        <Button
          variant="outlined"
          startIcon={<CloseIcon />}
          color="error"
          onClick={props.handleClose}
        >
          Fechar
        </Button>
      </CardActions>
    </Card>
  </form>
  );
};

export default FormEphemeris;
