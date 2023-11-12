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
import { Divider, IconButton, InputBase, TablePagination } from "@mui/material";
import Slider from "@mui/material/Slider";
import SelectOrdernar from "../../componentes/shared/SelectOrdernar";
import axiosInstance from "../../config/axiosInstance";
import CardPerfil from "../../componentes/shared/cardPerfil/CardPerfil";
import SearchIcon from "@mui/icons-material/Search";

function BuscaTalentos() {
  const [valueStacks, setValueStacks] = React.useState();
  const [inputValueStacks, setInputValueStacks] = React.useState("");
  const [valueOrdenar, setValueOrdenar] = React.useState("");
  const [value1, setValue1] = React.useState([0, 5000]);
  const [usuarios, setUsuarios] = React.useState([]);
  const [todosUsuarios, setTodosUsuarios] = React.useState(0);
  const [optionsStacks, setOptionsStacks] = React.useState([]);
  const [tecnologias, setTecnologias] = React.useState([]);
  const [tecnologiasSelecionadas, setTecnologiasSelecionadas] = React.useState(
    []
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [precoMedioMin, setPrecoMedioMin] = React.useState(0);
  const [precoMedioMax, setPrecoMedioMax] = React.useState(0);
  const [searchText, setSearchText] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    getAllUsers();

    getAllFlags();

    getAllTechnologies();
  }, []);

  React.useEffect(() => {
    handleApplyFilters();
  }, [rowsPerPage, page]);

  React.useEffect(() => {
    handleApplyFilters();
  }, [valueOrdenar]);

  function getAllUsers() {
    axiosInstance
      .post(`usuarios/filtro?page=${page}&size=${rowsPerPage}`, {
        nome: null,
        area: null,
        tecnologiasIds: [],
        precoMax: null,
        precoMin: null,
      })
      .then((response) => {
        if (response.status == 200) {
          setTodosUsuarios(response.data.totalElements);
          setUsuarios(response.data.content);

          const arrayPrecoMedio = response.data.content.map(
            (usuario) => usuario.precoMedio
          );

          setPrecoMedioMin(Math.min(...arrayPrecoMedio));
          setPrecoMedioMax(Math.max(...arrayPrecoMedio));
          setValue1([
            Math.min(...arrayPrecoMedio),
            Math.max(...arrayPrecoMedio),
          ]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getAllFlags() {
    axiosInstance
      .get("flags")
      .then((response) => {
        if (response.status === 200) {
          const responseFlags = response.data;
          const uniqueAreasSet = new Set();

          responseFlags.forEach((item) => {
            if (item.area !== null) {
              uniqueAreasSet.add(item.area.toLowerCase());
            }
          });

          const uniqueAreas = Array.from(uniqueAreasSet);
          setOptionsStacks(uniqueAreas);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getAllTechnologies() {
    axiosInstance
      .get("flags")
      .then((response) => {
        if (response.status === 200) {
          const responseTecnologia = response.data;
          const tecnologiasPorArea = [];

          responseTecnologia.forEach((item) => {
            if (item.area !== null) {
              const areaLowerCase = item.area.toLowerCase();
              if (!tecnologiasPorArea[areaLowerCase]) {
                tecnologiasPorArea[areaLowerCase] = [];
              }

              const tecnologia = {
                id: item.id,
                nome: item.nome,
              };

              tecnologiasPorArea[areaLowerCase].push(tecnologia);
            }
          });

          setTecnologias(tecnologiasPorArea);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const onChangeValue = (value, type) => {
    if (type === "min") {
      setValue1([value, value1[1]]);
    } else {
      setValue1([value1[0], value]);
    }
  };

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1]), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0])]);
    }
  };

  const handleApplyFilters = () => {
    axiosInstance
      .post(
        `usuarios/filtro?page=${page}&size=${rowsPerPage}&ordem=${valueOrdenar}`,
        {
          nome: null,
          area: inputValueStacks,
          tecnologiasIds: tecnologiasSelecionadas,
          precoMax: value1[1],
          precoMin: value1[0],
        }
      )
      .then((response) => {
        if (response.status == 200) {
          setUsuarios(response.data.content);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSetTecnologiasSelecionadas = (tecnologiaID) => {
    setTecnologiasSelecionadas([...tecnologiasSelecionadas, tecnologiaID]);
  };

  function valueText(value) {
    return `${value} reais`;
  }

  const handleSearch = () => {
    axiosInstance
      .post(`usuarios/filtro?page=${page}&size=${rowsPerPage}`, {
        nome: searchText[0],
        area: inputValueStacks === "" ? null : inputValueStacks,
        tecnologiasIds:
          tecnologiasSelecionadas.length <= 0 ? null : tecnologiasSelecionadas,
        precoMax: value1[1],
        precoMin: value1[0],
      })
      .then((response) => {
        if (response.status == 200) {
          setUsuarios(response.data.content);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
                {valueStacks &&
                  tecnologias[valueStacks]?.map((tecnologia) => (
                    <FormControlLabel
                      key={tecnologia.id}
                      control={<Checkbox />}
                      label={tecnologia.nome}
                      onClick={() =>
                        handleSetTecnologiasSelecionadas(tecnologia.id)
                      }
                    />
                  ))}
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
                onChange={(e) => onChangeValue(e.target.value, "min")}
              />

              <TextField
                id="outlined-basic"
                label="Máximo"
                variant="outlined"
                type="number"
                size="small"
                sx={{ width: 120 }}
                value={typeof value1 === "number" ? value1 : value1[1]}
                onChange={(e) => onChangeValue(e.target.value, "max")}
              />
            </div>

            <Slider
              getAriaLabel={() => "Preço mínimo"}
              value={value1}
              onChange={handleChange1}
              valueLabelDisplay="auto"
              getAriaValueText={valueText}
              disableSwap
              valueLabelFormat={(x) => `R$${x},00`}
              sx={{ color: "#0f9eea" }}
              min={precoMedioMin}
              max={precoMedioMax}
            />
          </div>

          <div className={styles["btn__aplicar"]}>
            <BlueBackgroundButton
              onClick={handleSearch}
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
              {todosUsuarios} profissionais encontrados
            </span>

            <div className="container__search">
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="Ícone de pesquisa"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>

              <InputBase
                sx={{ ml: 1, flex: 1, width: 260 }}
                placeholder="Pesquisar por nome de talento"
                inputProps={{ "aria-label": "Pesquisar por nome de talento" }}
                value={searchText}
                onChange={(e) => (
                  setSearchText(e.target.value), console.log(searchText)
                )}
              />
            </div>

            <div className={styles["autocomplete__ordenar"]}>
              <SelectOrdernar
                valueOrdenar={valueOrdenar}
                setValueOrdenar={setValueOrdenar}
              />
            </div>
          </div>

          <div className={styles["container__usuarios"]}>
            {usuarios.map((usuario) => {
              return (
                <div className={styles["card_usuario"]} key={usuario.id}>
                  <CardPerfil key={usuario.id} usuario={usuario} />
                </div>
              );
            })}
          </div>

          <div className={styles["container__paginator"]}>
            <TablePagination
              labelRowsPerPage={"Talentos por página:"}
              count={todosUsuarios}
              component="div"
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              color="primary"
            />
          </div>
        </Stack>
      </div>
    </>
  );
}

export default BuscaTalentos;
