import React, { useState } from "react";
import styles from "./compararUsuarios.module.css";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Button } from "@mui/material";

const CompararUsuarios = (props) => {
  const {
    usuariosSelecionados,
    setUsuariosSelecionados,
    showComparacao,
    setComparacao,
    conjuntoSkill,
  } = props;
  const [openDropdowns, setOpenDropdowns] = useState([]);

  const toggleDropdown = (tecnologia) => {
    if (openDropdowns.some((dropdown) => dropdown === tecnologia)) {
      setOpenDropdowns(
        openDropdowns.filter((dropdown) => dropdown !== tecnologia)
      );
    } else {
      setOpenDropdowns([...openDropdowns, tecnologia]);
    }
  };

  return (
    <div
      className={`${styles["container"]} ${styles["comparacao"]} ${
        showComparacao
          ? styles["comparacao-active"]
          : styles["comparacao-desativada"]
      } `}
    >
      <div className={styles["comparacao__titulo"]}>
        <h1>Comparar</h1>
        <Button
          onClick={() => {
            setComparacao((prev) => !prev), setOpenDropdowns([]);
          }}
          sx={{
            borderRadius: "50%",
            width: "2.5rem",
            height: "2.5rem",
            minWidth: "2.5rem",
            minHeight: "2.5rem",
          }}
        >
          <ArrowDropDownCircleOutlinedIcon
            sx={{
              color: "var(--color-azul)",
              fontSize: "2rem",
              transition: "transform 0.3s ease-in-out",
              transform: showComparacao ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </Button>
      </div>
      <div className={styles["comparacao__content"]}>
        <div className={styles["comparacao__content__header"]}>
          {usuariosSelecionados.map((usuario) => (
            <div
              key={`content__header__${usuario.id}`}
              className={styles["comparacao__content__header__item"]}
            >
              <Avatar
                key={`content__header__${usuario.id}`}
                alt={usuario.nome}
                variant="square"
                src={usuario.urlFotoPerfil}
                sx={{ width: "10rem", height: "8rem" }}
              >
                {usuario.nome[0]}
              </Avatar>
              <div
                className={styles["comparacao__content__header__item__info"]}
              >
                <p>{usuario.nome}</p>

                <Button
                  onClick={() => {
                    setUsuariosSelecionados(
                      usuariosSelecionados.filter(
                        (user) => user.id !== usuario.id
                      )
                    );
                    if (usuariosSelecionados.length <= 2) {
                      setComparacao(false);
                    }
                  }}
                  sx={{
                    borderRadius: "50%",
                    width: "1.5rem",
                    height: "1.5rem",
                    minWidth: "1.5rem",
                    minHeight: "1.5rem",
                    color: "#FF7474",
                  }}
                >
                  <CloseIcon sx={{ fontSize: "1.5rem", cursor: "pointer" }} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles["comparacao__content__areas"]}>
          {conjuntoSkill
            .filter((skillSet) =>
              usuariosSelecionados.some((usuario) =>
                usuario.flags.some((flag) => flag.area === skillSet.area)
              )
            )
            ?.map((conjunto) => (
              <div
                key={`comparacao__content__areas__${conjunto.area}`}
                className={styles["comparacao__content__areas__area"]}
              >
                <div
                  className={styles["comparacao__content__areas__area__titulo"]}
                >
                  <h3>{conjunto.area}</h3>
                  <Button
                    onClick={() => toggleDropdown(conjunto.area)}
                    sx={{
                      borderRadius: "50%",
                      width: "1.5rem",
                      height: "1.5rem",
                      minWidth: "1.5rem",
                      minHeight: "1.5rem",
                    }}
                  >
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: "2rem",
                        color: "var(--color-azul)",
                        transform: openDropdowns.some(
                          (dropdown) => dropdown === conjunto.area
                        )
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s ease-in-out",
                        cursor: "pointer",
                      }}
                    />
                  </Button>
                </div>

                <div
                  className={`${
                    styles["comparacao__content__areas__area__dropdown"]
                  }
                                        ${
                                          openDropdowns.some(
                                            (dropdown) =>
                                              dropdown === conjunto.area
                                          )
                                            ? styles["opened-dropdown"]
                                            : styles["closed-dropdown"]
                                        }`}
                >
                  {conjunto?.tecnologias
                    .filter((tecnologia) =>
                      usuariosSelecionados.some((usuario) =>
                        usuario.flags.some((flag) => flag.nome == tecnologia)
                      )
                    )
                    .map((tecnologia) => (
                      <div
                        key={`tecnologias__row__${tecnologia}`}
                        className={
                          styles[
                            "comparacao__content__areas__area__tecnologias"
                          ]
                        }
                      >
                        <p
                          className={
                            styles[
                              "comparacao__content__areas__area__tecnologias--nome"
                            ]
                          }
                        >
                          {tecnologia}
                        </p>
                        <div
                          className={
                            styles[
                              "comparacao__content__areas__area__tecnologias--content"
                            ]
                          }
                        >
                          {usuariosSelecionados.map((usuario) => (
                            <p
                              key={`tecnologias__row__${tecnologia}__${usuario.id}`}
                            >
                              {usuario.flags.find(
                                (flag) => flag.nome == tecnologia
                              ) ? (
                                <CheckIcon sx={{ color: "#47AF64" }} />
                              ) : (
                                <ClearIcon sx={{ color: "#FF7474" }} />
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CompararUsuarios;
