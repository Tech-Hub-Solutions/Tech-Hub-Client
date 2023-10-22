import React from "react";
import styles from "./BuscaTalentos.module.css";
import Header from "../../componentes/shared/header/Header";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const optionsStacks = [
  "Front-end",
  "Back-end",
  "Fullstack",
  "Banco de Dados",
  "Inteligência Artificial",
];

const optionsOrdernar = [
  "Mais avaliado",
  "Maior preço",
  "Menor preço",
  "Mais recentes",
];

function BuscaTalentos() {
  const [valueStacks, setValueStacks] = React.useState();
  const [inputValueStacks, setInputValueStacks] = React.useState("");

  const [valueOrdenar, setValueOrdenar] = React.useState(optionsOrdernar[0]);
  const [inputValueOrdenar, setInputValueOrdenar] = React.useState("");

  return (
    <>
      <Header />

      <div className={styles["container__all"]}>
        <Stack
          className={styles["stack__left"]}
          sx={{ marginRight: "18px", marginLeft: "98px" }}
        >
          <div className={styles["container__left"]}>
            <h1 className={styles["container__left__h1"]}>Procurar Talentos</h1>
            <h2 className={styles["container__left__h2"]}>
              Área de Tecnologia
            </h2>

            <div className="checkbox">
              {/* <div>{`value: ${value !== null ? `'${value}'` : "null"}`}</div>
              <div>{`inputValue: '${inputValue}'`}</div> */}
              <br />
              <Autocomplete
                value={valueStacks}
                onChange={(event, newValueStacks) => {
                  setValueStacks(newValueStacks);
                }}
                inputValue={inputValueStacks}
                onInputChange={(event, newInputValueStacks) => {
                  setInputValueStacks(newInputValueStacks);
                }}
                id="controllable-states-demo"
                options={optionsStacks}
                sx={{ width: 252 }}
                renderInput={(params) => (
                  <TextField {...params} label="Stack" />
                )}
              />
            </div>
          </div>
        </Stack>

        <Stack
          alignItems={"center"}
          className={styles["stack__right"]}
          sx={{ marginRight: "18px", marginLeft: "98px" }}
        >
          <div className={styles["container__right__header"]}>
            <span className={styles["total__encontrados"]}>
              27 profissionais encontrados
            </span>

            <div className={styles["checkbox__ordenar"]}>
              <Autocomplete
                value={valueOrdenar}
                onChange={(event, newValueOrdenar) => {
                  setValueOrdenar(newValueOrdenar);
                }}
                inputValue={inputValueOrdenar}
                onInputChange={(event, newInputValueOrdenar) => {
                  setInputValueOrdenar(newInputValueOrdenar);
                }}
                id="controllable-states-demo"
                options={optionsOrdernar}
                sx={{ width: 186 }}
                size="small"
                renderInput={(params) => (
                  <TextField {...params} label="ordenar por" />
                )}
              />
            </div>
          </div>
        </Stack>
      </div>
    </>
  );
}

export default BuscaTalentos;
