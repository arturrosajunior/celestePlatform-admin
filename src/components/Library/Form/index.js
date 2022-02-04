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

const FormLibrary = (props) => {
  const validationSchema = Yup.object().shape({
    news_publication_date: Yup.date().required("O campo é obrigatório"),
    content: Yup.string()
      .required("O campo é obrigatório")
      .min(10, "Digite no mínimo 10 caracteres"),
    news_content: Yup.string().required("O campo é obrigatório"),
    keywords: Yup.string().required("O campo é obrigatório"),
    news_link: Yup.string().required("O campo é obrigatório"),
    news_reference: Yup.string().required("O campo é obrigatório"),
    news_source: Yup.string().required("O campo é obrigatório"),
  });
  const formik = useFormik({
    initialValues: {
      news_publication_date: "",
      content: "",
      news_content: "",
      keywords: "",
      news_link: "",
      news_reference: "",
      news_source: "",
    },
    onSubmit: (values) => {
      sendPostLibrary(values);
    },
    validationSchema: validationSchema,
  });

  const [loading, setLoading] = useState(false);

  async function sendPostLibrary(values) {
    try {
      setLoading(true);
      const res = await props.handlePost(values);
      if (res) {
        setLoading(!res);
        await props.handleList();
        props.OpenAlertMensage("Library save", "success", true);
      }
    } catch (err) {
      props.OpenAlertMensage(
        "Algo deu errado, tente novamente.",
        "error",
        false
      );
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2} columns={12}>
            <Grid item md={4}>
              <TextField
                name="news_publication_date"
                type="date"
                value={formik.news_publication_date}
                onChange={formik.handleChange}
                error={
                  formik.touched.news_publication_date &&
                  Boolean(formik.errors.news_publication_date)
                }
                helperText={
                  formik.touched.news_publication_date &&
                  formik.errors.news_publication_date
                }
                fullWidth
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                name="news_link"
                label="Link"
                type="url"
                value={formik.news_link}
                onChange={formik.handleChange}
                error={
                  formik.touched.news_link && Boolean(formik.errors.news_link)
                }
                helperText={formik.touched.news_link && formik.errors.news_link}
                fullWidth
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                name="news_reference"
                label="Referência"
                type="url"
                value={formik.news_reference}
                onChange={formik.handleChange}
                error={
                  formik.touched.news_reference &&
                  Boolean(formik.errors.news_reference)
                }
                helperText={
                  formik.touched.news_reference && formik.errors.news_reference
                }
                fullWidth
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                name="news_source"
                label="Fonte"
                value={formik.news_source}
                onChange={formik.handleChange}
                error={
                  formik.touched.news_source &&
                  Boolean(formik.errors.news_source)
                }
                helperText={
                  formik.touched.news_source && formik.errors.news_source
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="keywords"
                label="Keywords"
                value={formik.keywords}
                onChange={formik.handleChange}
                error={
                  formik.touched.keywords && Boolean(formik.errors.keywords)
                }
                helperText={formik.touched.keywords && formik.errors.keywords}
                fullWidth
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                name="content"
                label="Texto Editado"
                value={formik.content}
                onChange={formik.handleChange}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
                fullWidth
                multiline
                minRows={10}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                name="news_content"
                label="Texto Original"
                value={formik.news_content}
                onChange={formik.handleChange}
                error={
                  formik.touched.news_content &&
                  Boolean(formik.errors.news_content)
                }
                helperText={
                  formik.touched.news_content && formik.errors.news_content
                }
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

export default FormLibrary;
