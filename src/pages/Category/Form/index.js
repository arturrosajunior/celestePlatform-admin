import React, { useState} from "react";
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

const FormCategory = (props) => {
  const [loading, setLoading] = useState(false);
  

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("O campo é obrigatório"),
  });

  const defaultValues = {
    title: "",
    parent_id: 1,
    user_id: 1,
    date_created: "",
    date_updated: "",
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
    console.log("values", values);
    setLoading(true);
    const res = props.valuesRowOnSelected
      ? await props.handlePut(props.valuesRowOnSelected[0].id, values)
      : await props.handlePost(values);
    if (res) {
      setLoading(!res);
      await props.handleList();
      props.OpenAlertMensage("Category save", "success", true);
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
      <TextField
        sx={{ display: "none" }}
        name="date_created"
        type="date"
        defaultValue={formik.initialValues.date_created}
        value={formik.date_created}
      />
      <TextField
        sx={{ display: "none" }}
        name="date_updated"
        type="date"
        defaultValue={formik.initialValues.date_updated}
        value={formik.date_updated}
      />
      <TextField
        sx={{ display: "none" }}
        name="parent_id"
        defaultValue={formik.initialValues.parent_id}
        value={formik.parent_id}
        onChange={formik.handleChange}
      />
      <TextField
        sx={{ display: "none" }}
        name="user_id"
        defaultValue={formik.initialValues.user_id}
        value={formik.user_id}
        onChange={formik.handleChange}
      />
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2} columns={12}>
            <Grid item md={12}>
              <TextField
                name="title"
                label="Título"
                defaultValue={formik.initialValues.title}
                value={formik.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                fullWidth
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

export default FormCategory;
