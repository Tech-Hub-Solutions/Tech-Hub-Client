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
import axiosInstance from "../../config/axiosInstance";
import CardPerfil from "../../componentes/shared/cardPerfil/CardPerfil";
import CardPerfilSkeleton from "../../componentes/shared/cardPerfil/CardPerfilSkeleton";
import SearchIcon from "@mui/icons-material/Search";
import SelectOrdernar from "@/src/componentes/shared/SelectOrdernar";
import useDebounce from "@/src/hooks/useDebounce";

function BuscaTalentos() {
  const [valueStacks, setValueStacks] = React.useState();
  const [rangePreco, setRangePreco] = React.useState([0, 5000]);
  const [usuarios, setUsuarios] = React.useState([]);
  const [valueOrdenar, setValueOrdenar] = React.useState("");
  const [todosUsuarios, setTodosUsuarios] = React.useState(0);
  const [optionsStacks, setOptionsStacks] = React.useState([]);
  const [tecnologias, setTecnologias] = React.useState([]);
  const [tecnologiasSelecionadas, setTecnologiasSelecionadas] = React.useState([]);

  const page = React.useRef(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchText, setSearchText] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const debounceSearch = useDebounce(searchText, 600);

  React.useEffect(() => {
    getAllTechnologies();
  }, []);

  React.useEffect(() => {
    handleSearch();
  }, [rowsPerPage]);

  React.useEffect(() => {
    if (valueOrdenar !== "" || debounceSearch !== null) {
      page.current = 0;
      handleSearch();
    };
  }, [valueOrdenar, debounceSearch]);

  function getAllTechnologies() {
    axiosInstance
      .get("flags")
      .then((response) => {
        if (response.status === 200) {
          const responseTecnologia = response.data;
          const uniqueAreasSet = new Set();

          const tecnologiasPorArea = [];

          responseTecnologia.forEach((item) => {
            if (item.area == "Soft-skills") return;
            if (item.area !== null) {
              uniqueAreasSet.add(item.area.toLowerCase());

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

          const uniqueAreas = Array.from(uniqueAreasSet);

          setOptionsStacks(
            uniqueAreas.map(
              (stack) => stack.charAt(0).toUpperCase() + stack.slice(1)
            )
          );
          setTecnologias(tecnologiasPorArea);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleSearch = () => {
    setIsLoading(true);

    const valueStacksLowerCase = valueStacks?.toLowerCase();

    axiosInstance
      .post(`usuarios/filtro?page=${page?.current}&size=${rowsPerPage}&ordem=${valueOrdenar}`, {
        nome: searchText || null,
        area: valueStacksLowerCase || null,
        tecnologiasIds:
          tecnologiasSelecionadas.length <= 0 ? null : tecnologiasSelecionadas,
        precoMax: rangePreco[1],
        precoMin: rangePreco[0],
      })
      .then((response) => {
        if (response.status == 200) {
          setUsuarios(response.data.content);
          setTodosUsuarios(response.data.totalElements);
        } else {
          setUsuarios([]);
          setTodosUsuarios(0);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChangePage = (event, newPage) => {
    page.current = newPage;
    handleSearch();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    page.current = 0;
  };

  const onChangeValue = (value, type) => {
    if (type === "min") {
      setRangePreco([value, rangePreco[1]]);
    } else {
      setRangePreco([rangePreco[0], value]);
    }
  };

  const handleRangePreco = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setRangePreco([Math.min(newValue[0], rangePreco[1]), rangePreco[1]]);
    } else {
      setRangePreco([rangePreco[0], Math.max(newValue[1], rangePreco[0])]);
    }
  };

  const handleSetTecnologiasSelecionadas = (tecnologiaID) => {
    setTecnologiasSelecionadas((prevState) => {
      if (prevState.includes(tecnologiaID)) {
        return prevState.filter((id) => id !== tecnologiaID);
      } else {
        return [...prevState, tecnologiaID];
      }
    });
  };

  function valueText(value) {
    return `${value} reais`;
  }

  return (
    <>
      <Header />

      <div className={styles["container__all"]}>
        <Stack
          className={styles["stack__left"]}
          sx={{ marginRight: "18px", marginLeft: "98px", height: "100%" }}
        >
          <div className={styles["container__left"]}>
            <h1 className={styles["container__left__h1"]}>Procurar Talentos</h1>

            <h2 className={styles["container__left__h2"]}>
              Área de Tecnologia
            </h2>

            <Autocomplete
              value={valueStacks}
              onChange={(event, newValueStacks) => {
                setValueStacks(newValueStacks?.toLowerCase());
                setTecnologiasSelecionadas([]);
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
                      labelPlacement="end"
                      onChange={() =>
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
                id="outlined-basic-minimo"
                label="Mínimo"
                variant="outlined"
                type="number"
                size="small"
                sx={{ width: 120 }}
                value={typeof rangePreco === "number" ? rangePreco : rangePreco[0]}
                onChange={(e) => onChangeValue(e.target.value, "min")}
              />

              <TextField
                id="outlined-basic-maximo"
                label="Máximo"
                variant="outlined"
                type="number"
                size="small"
                sx={{ width: 120 }}
                value={typeof rangePreco === "number" ? rangePreco : rangePreco[1]}
                onChange={(e) => onChangeValue(e.target.value, "max")}
              />
            </div>

            <Slider
              getAriaLabel={() => "Preço médio"}
              value={rangePreco}
              onChange={handleRangePreco}
              valueLabelDisplay="auto"
              getAriaValueText={valueText}
              disableSwap
              valueLabelFormat={(x) => `R$${x},00`}
              sx={{ color: "#0f9eea" }}
              min={0}
              max={10_000.00}
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
                sx={{ ml: 1, flex: 1, width: 300 }}
                placeholder="Pesquisar por nome de talento"
                inputProps={{ "aria-label": "Pesquisar por nome de talento" }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <SelectOrdernar
              valueOrdenar={valueOrdenar}
              setValueOrdenar={setValueOrdenar}
            />

          </div>

          <div className={styles["container__usuarios"]}>
            {isLoading
              ? Array.from(Array(6).keys()).map((index) => (
                <CardPerfilSkeleton key={index} />
              ))
              : usuarios.map((usuario) => {
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
              page={page.current}
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
