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
  const [loading, setLoading] = useState(false);

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
  
  const defaultValues = {
    content: "",
    keywords: "",
    news_content: "",
    news_source: "",
    news_reference: "",
    news_publication_date: "",
    news_link: ""
  };

  const [initialValues, setInitialValues] = useState(
    props.valuesRowOnSelected ? props.valuesRowOnSelected[0] : defaultValues
  );

  const closeModalUnsetValeus = () => {
    setInitialValues(defaultValues);

    props.setValuesRowOnSelected();
    props.handleClose();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      sendPostLibrary(values);
    },
    validationSchema: validationSchema,
  });

  async function sendPostLibrary(values) {
    setLoading(true);
    const res = props.valuesRowOnSelected
      ? await props.handlePut(props.valuesRowOnSelected[0].id, values)
      : await props.handlePost(values);
    if (res) {
      setLoading(!res);
      await props.handleList();
      props.OpenAlertMensage("Library save", "success", true);
      closeModalUnsetValeus();
      props.handleClose();
    } else {
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
                defaultValue={formik.initialValues.news_publication_date}
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
                defaultValue={formik.initialValues.news_link}
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
                defaultValue={formik.initialValues.news_reference}
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
                defaultValue={formik.initialValues.news_source}
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
                defaultValue={formik.initialValues.keywords}
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
                defaultValue={formik.initialValues.content}
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
                defaultValue={formik.initialValues.news_content}
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
            onClick={closeModalUnsetValeus}
          >
            Fechar
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default FormLibrary;
