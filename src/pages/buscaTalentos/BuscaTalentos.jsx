import React from "react";
import styles from "./BuscaTalentos.module.css";
import Header from "../../componentes/shared/header/Header";
import BlueBackgroundButton from "../../componentes/shared/BlueButton/BlueBackgroundButton";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Divider } from "@mui/material";
import Slider from "@mui/material/Slider";
import SelectOrdernar from "../../componentes/shared/SelectOrdernar";
import axiosInstance from "../../config/axiosInstance";
import CardPerfil from "../../componentes/shared/cardPerfil/CardPerfil";

const optionsStacks = [
  "Front-end",
  "Back-end",
  "Fullstack",
  "Banco de Dados",
  "Inteligência Artificial",
];

function valuetext(value) {
  return `${value} reais`;
}

const minDistance = 10;

function BuscaTalentos() {
  const [valueStacks, setValueStacks] = React.useState();
  const [inputValueStacks, setInputValueStacks] = React.useState("");
  const [valueOrdenar, setValueOrdenar] = React.useState("");
  const [value1, setValue1] = React.useState([0, 100]);
  const [usuarios, setUsuarios] = React.useState([]);

  React.useEffect(() => {
    axiosInstance
      .post("usuarios/filtro", {
        nome: null,
        area: null,
        tecnologiasIds: [],
        precoMax: null,
        precoMin: null,
      })
      .then((response) => {
        if (response.status == 200) {
          const responseUsuarios = response.data.content;

          const responseMapeada = responseUsuarios.map((item) => {
            return {
              ...item,
            };
          });

          setUsuarios(responseMapeada);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // REQ Completo
  //   React.useEffect(() => {
  //     axiosInstance.post("usuarios/filtro", {
  //         area: "front"
  //     })
  //         .then((response) => {
  //             if (response.status == 200) {
  //                 const responseUsuarios = response.data.content;

  //                 const responseMapeada = responseUsuarios.map((item) => {
  //                     return {
  //                         ...item,
  //                         isFavorito: true,
  //                     };
  //                 });

  //                 setUsuarios(responseMapeada);
  //             }
  //         })
  //         .catch((error) => {
  //             console.error(error);
  //         });
  // }, []);

  const onChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

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
              renderInput={(params) => <TextField {...params} label="Stack" />}
            />

            <div className={styles["checkbox__tecnologias"]}>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="HTML" />
                <FormControlLabel control={<Checkbox />} label="Javascript" />
                <FormControlLabel control={<Checkbox />} label="Typescript" />
                <FormControlLabel control={<Checkbox />} label="Angular" />
                <FormControlLabel control={<Checkbox />} label="React" />
                <FormControlLabel control={<Checkbox />} label="Vue.JS" />
              </FormGroup>
            </div>

            <div className={styles["divider"]}>
              <Divider variant="fullWidth" />
            </div>
          </div>

          <div className={styles["container__left__bottom"]}>
            <h2 className={styles["container__left__h2"]}>Preço</h2>

            <div className={styles["container__slider__textfield"]}>
              <TextField
                id="outlined-basic"
                label="Mínimo"
                variant="outlined"
                type="number"
                size="small"
                sx={{ width: 120 }}
                value={typeof value1 === "number" ? value1 : value1[0]}
                onChange={onChange}
              />

              <TextField
                id="outlined-basic"
                label="Máximo"
                variant="outlined"
                type="number"
                size="small"
                sx={{ width: 120 }}
                value={typeof value1 === "number" ? value1 : value1[1]}
                onChange={onChange}
              />
            </div>

            <Slider
              getAriaLabel={() => "Preço mínimo"}
              value={value1}
              onChange={handleChange1}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
              valueLabelFormat={(x) => `R$${x},00`}
              sx={{ color: "#0f9eea" }}
            />
          </div>

          <div className={styles["btn__aplicar"]}>
            <BlueBackgroundButton
              onClick={() => {
                console.log("Aplicar");
              }}
              style={{ width: "252px" }}
            >
              Aplicar
            </BlueBackgroundButton>
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

            <div className={styles["autocomplete__ordenar"]}>
              <SelectOrdernar
                valueOrdenar={valueOrdenar}
                setValueOrdenar={setValueOrdenar}
              />
            </div>
          </div>

          <div className={styles["container__usuarios"]}>
            {usuarios?.map((usuario) => {
              return (
                <div className={styles["card_usuario"]}>
                  <CardPerfil
                    key={usuario.id}
                    usuario={usuario}
                  />
                </div>
              );
            })}
          </div>
        </Stack>
      </div>
    </>
  );
}

export default BuscaTalentos;
