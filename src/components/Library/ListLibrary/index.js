import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 2 },
  { field: "dataPublish", headerName: "Data" },
  { field: "txtpt", headerName: "Português", width: 300 },
  { field: "txten", headerName: "Inglês", width: 300 },
  { field: "keywords", headerName: "key words", width: 300 },
  { field: "ref", headerName: "ref" },
  { field: "fonte", headerName: "Fonte" },
  { field: "link1", headerName: "Link 1" },
  { field: "link2", headerName: "Link 2" },
];

const rows = [
  {
    id: 1,
    txtpt:
      "De acordo com uma pesquisa recente da McKinsey com 40 mil funcionários de empresas nos EUA, as mulheres relatam se sentir mais esgotadas e cronicamente estressadas do que os homens. Isso vale para todas as raças e em todos os níveis dos negócios, especialmente nos cargos de liderança.",
    txten:
      "According to a recent McKinsey survey of 40,000 employees of U.S. companies, women report feeling more burned out and chronically stressed than men do. This holds for every race and across all levels of business, especially at the top.",
    keywords:
      "Mulher; Mulheres; Mulher no mercado de trabalho; Mulheres no mercado de trabalho; Mercado de trabalho; Gender gap; Diferença de gêneros; Empresas EUA; Estatísticas femininas; Estresse no trabalho; Divisão de tarefas; Trabalho; Gênero; McKinsey",
    fonte: "McKinsey",
    ref: "WSJ",
    link1:
      "https://www.wsj.com/articles/the-pay-gap-for-women-starts-with-a-responsibility-gap-11634224762",
    link2:
      "https://www.wsj.com/articles/the-pay-gap-for-women-starts-with-a-responsibility-gap-11634224762",
    dataPublish: "10/16/21",
  },
  {
    id: 2,
    txtpt:
      "De acordo com uma pesquisa recente da McKinsey com 40 mil funcionários de empresas nos EUA, as mulheres relatam se sentir mais esgotadas e cronicamente estressadas do que os homens. Isso vale para todas as raças e em todos os níveis dos negócios, especialmente nos cargos de liderança.",
    txten:
      "According to a recent McKinsey survey of 40,000 employees of U.S. companies, women report feeling more burned out and chronically stressed than men do. This holds for every race and across all levels of business, especially at the top.",
    keywords:
      "Mulher; Mulheres; Mulher no mercado de trabalho; Mulheres no mercado de trabalho; Mercado de trabalho; Gender gap; Diferença de gêneros; Empresas EUA; Estatísticas femininas; Estresse no trabalho; Divisão de tarefas; Trabalho; Gênero; McKinsey",
    fonte: "McKinsey",
    ref: "WSJ",
    link1:
      "https://www.wsj.com/articles/the-pay-gap-for-women-starts-with-a-responsibility-gap-11634224762",
    link2:
      "https://www.wsj.com/articles/the-pay-gap-for-women-starts-with-a-responsibility-gap-11634224762",
    dataPublish: "10/16/21",
  },
  {
    id: 3,
    txtpt:
      "De acordo com uma pesquisa recente da McKinsey com 40 mil funcionários de empresas nos EUA, as mulheres relatam se sentir mais esgotadas e cronicamente estressadas do que os homens. Isso vale para todas as raças e em todos os níveis dos negócios, especialmente nos cargos de liderança.",
    txten:
      "According to a recent McKinsey survey of 40,000 employees of U.S. companies, women report feeling more burned out and chronically stressed than men do. This holds for every race and across all levels of business, especially at the top.",
    keywords:
      "Mulher; Mulheres; Mulher no mercado de trabalho; Mulheres no mercado de trabalho; Mercado de trabalho; Gender gap; Diferença de gêneros; Empresas EUA; Estatísticas femininas; Estresse no trabalho; Divisão de tarefas; Trabalho; Gênero; McKinsey",
    fonte: "McKinsey",
    ref: "WSJ",
    link1:
      "https://www.wsj.com/articles/the-pay-gap-for-women-starts-with-a-responsibility-gap-11634224762",
    link2:
      "https://www.wsj.com/articles/the-pay-gap-for-women-starts-with-a-responsibility-gap-11634224762",
    dataPublish: "10/16/21",
  },
];

const ListLibrary = () => {
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} checkboxSelection pageSize={15} />
    </div>
  );
};

export default ListLibrary;
