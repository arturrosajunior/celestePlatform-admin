import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import * as serviceTag from "services/serviceTag";
import * as serviceIndustry from "services/serviceIndustry";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const FormSection = (props) => {
  const defaultValues = {
    title: "",
    user_id: 1,
    created_at: "",
    updated_at: "",
    tags: [],
  };
  //pegando as tags
  const [tagsList, setTagsList] = useState([]);
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [titleInput, setTitleInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let valoresParaPreencher = "";
    if (props.valuesRowOnSelected) {
      valoresParaPreencher = props.valuesRowOnSelected[0];
      setTitleInput(valoresParaPreencher.title);
      preenchendoCampos();
    } else {
      valoresParaPreencher = defaultValues;
    }
    if (valoresParaPreencher.tags === undefined) {
      valoresParaPreencher.tags = [];
    }
    setInitialValues(valoresParaPreencher);
    async function preenchendoCampos() {
      const idRow = props.valuesRowOnSelected[0].id;
      const resultTagsRowSelected = await serviceIndustry.getItem(idRow);
      setInitialValues(resultTagsRowSelected.data);
    }
  }, []);

  const closeModalUnsetValeus = () => {
    setInitialValues(defaultValues);

    props.setValuesRowOnSelected();
    props.handleClose();
  };

  const sendPost = async (values) => {
    setLoading(true);
    const res = props.valuesRowOnSelected
      ? await props.handlePut(props.valuesRowOnSelected[0].id, values)
      : await props.handlePost(values);
    if (res) {
      setLoading(false);
      await props.handleList();
      props.OpenAlertMensage("Industry save", "success", true);
      closeModalUnsetValeus();
      props.handleClose();
    } else {
      props.OpenAlertMensage(
        "Algo deu errado, tente novamente.",
        "error",
        false
      );
    }
  };

  const onChange = (e) => {
    setTitleInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formData.entries();
    const dataForSave = defaultValues;
    dataForSave.title = e.target.title.value;
    dataForSave.created_at = e.target.created_at.value;
    dataForSave.updated_at = e.target.updated_at.value;
    dataForSave.user_id = e.target.user_id.value;
    let i = 0;
    for (const entry of data) {
      if (entry[0] === "tags") {
        dataForSave.tags[i] = entry[1];
        i++;
      }
    }
    sendPost(dataForSave);
  };

  // eslint-disable-next-line
  const handleGetRows = async () => {
    let resultTagsRowSelected = "";
    if (props.valuesRowOnSelected) {
      const idRow = props.valuesRowOnSelected[0].id;
      // eslint-disable-next-line no-const-assign
      resultTagsRowSelected = await serviceIndustry.getItem(idRow);
      setInitialValues(resultTagsRowSelected.data);
    }

    console.log('fdsfsdfds')
    const result = await serviceTag.getAllItems();
    console.log(props.valuesRowOnSelected, ' props.valuesRowOnSelected' )
    if (result) {
      const newTag = result.map((item) => {
        if (props.valuesRowOnSelected) {
          return {
            id: item.id,
            title: item.title,
            checked: resultTagsRowSelected.data.tags.some((tagRow) => {

              resultTagsRowSelected.data.tags.map(
                (tag, i) => (initialValues.tags[i] = tag.id)
              );
              console.log(item.id.toString(), tagRow.id);
              return item.id.toString() === "" + tagRow.id;
            }),
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
  };

  useEffect(() => {
    handleGetRows();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        sx={{ display: "none" }}
        name="created_at"
        type="text"
        value={initialValues.created_at}
      />
      <TextField
        sx={{ display: "none" }}
        name="updated_at"
        type="text"
        value={initialValues.updated_at}
      />
      <TextField
        sx={{ display: "none" }}
        name="user_id"
        value={initialValues.user_id}
      />
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2} columns={12}>
            <Grid item md={12}>
              <TextField
                name="title"
                label="Título"
                defaultValue={titleInput}
                value={titleInput}
                onChange={onChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} columns={12}>
            <Grid item md={12}>
              {tagsList.length === 0
                ? "Aguarde buscando as tags"
                : tagsList.map((tag) => {
                    return (
                      <FormControlLabel
                        key={tag.id}
                        value={tag.id}
                        control={
                          <Checkbox name="tags" defaultChecked={tag.checked} />
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
