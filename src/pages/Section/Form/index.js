import React, { useState, useEffect, useCallback } from "react";
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
import * as serviceTag from "services/serviceTag";
import * as serviceSection from "services/serviceSection";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import * as Yup from "yup";

const FormSection = (props) => {
  //pegando as tags
  const [tagsList, setTagsList] = useState([]);
  
  const defaultValues = {
    title: "",
    user_id: 1,
    created_at: "",
    updated_at: "",
    tags: [],
  };

  const [initialValues, setInitialValues] = useState(
    props.valuesRowOnSelected ? props.valuesRowOnSelected[0] : defaultValues
  );
  // eslint-disable-next-line
  const handleGetRows = async () => {
    let resultTagsRowSelected = "";
    if (props.valuesRowOnSelected) {
      const idRow = props.valuesRowOnSelected[0].id;
      // eslint-disable-next-line no-const-assign
      resultTagsRowSelected = await serviceSection.getItem(idRow);
      setInitialValues(resultTagsRowSelected.data)
    }

    const result = await serviceTag.getAllItems();
    if (result) {
      const newTag = result.map((item) => {
        if (props.valuesRowOnSelected) {
          // resultTagsRowSelected.data.tags.map((tag, i) => initialValues.tags[i] = tag.id );
          return {
            id: item.id,
            title: item.title,
            checked: resultTagsRowSelected.data.tags.some(
              (tagRow) => item.id.toString() === "" + tagRow.id
            ),
          };
        } else {
          return {
            id: item.id,
            title: item.title,
            checked: false,
          };
        }
      });

      setTagsList([...newTag]);
    } else {
      console.log("sem tags no banco");
      setTagsList([]);
    }
  }

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("O campo é obrigatório"),
  });

  const closeModalUnsetValeus = () => {
    setInitialValues(defaultValues);

    props.setValuesRowOnSelected();
    props.handleClose();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("values",values)
      sendPost(values);
    },
    validationSchema: validationSchema,
  });

  async function sendPost(values) {
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
  

  useEffect(() => {    
    //setTimeout(() => handleGetRows(), 3000);
    handleGetRows()
  }, []);
  useEffect(()=>{
    console.log("initialValues",initialValues)
  },[initialValues])

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        sx={{ display: "none" }}
        name="created_at"
        type="date"
        defaultValue={formik.initialValues.created_at}
        value={formik.created_at}
      />
      <TextField
        sx={{ display: "none" }}
        name="updated_at"
        type="date"
        defaultValue={formik.initialValues.updated_at}
        value={formik.updated_at}
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
          <Grid container spacing={2} columns={12}>
            <Grid item md={12}>
              {tagsList.map((tag) => {
                return (
                  <FormControlLabel
                    value={tag.id}
                    control={
                      <Checkbox 
                      name="tags"
                      checked={tag.checked} 
                      onChange={formik.handleChange}
                       />
                    }
                    label={tag.title}
                    labelPlacement="end"
                  />
                );
              })}
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

export default FormSection;
