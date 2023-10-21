import React from "react";
import styles from "./BuscaTalentos.module.css";
import Header from "../../componentes/shared/header/Header";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const options = [
  "Front-end",
  "Back-end",
  "Fullstack",
  "Banco de Dados",
  "Inteligência Artificial",
];
function BuscaTalentos() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <>
      <Header />

      <div className={styles["container__all"]}>
        <Stack alignItems={"center"} className={styles["container__left"]}>
          <div id="container-left">
            <h1 className={styles["container__left__h1"]}>Procurar Talentos</h1>
            <h2 className={styles["container__left__h2"]}>
              Área de Tecnologia
            </h2>

            <div className="checkbox">
              <div>{`value: ${value !== null ? `'${value}'` : "null"}`}</div>
              <div>{`inputValue: '${inputValue}'`}</div>
              <br />
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 252 }}
                renderInput={(params) => (
                  <TextField {...params} label="Stack" />
                )}
              />
            </div>
          </div>
        </Stack>

        <Stack alignItems={"center"} className={styles["container__right"]}>
          <div className={styles["container__right__header"]}>
            <span>27 profissionais encontrados</span>

            <div className={styles["container__checkbox__ordenar"]}>
              <span>ordenar por</span>

              <div className="checkbox">
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 176 }}
                renderInput={(params) => (
                  <TextField {...params} label="ordenar por" />
                )}
              />
            </div>
            </div>
          </div>
        </Stack>
      </div>
    </>
  );
}

export default BuscaTalentos;
