import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const optionsOrdernar = [
    {
        nome: "Mais avaliado",
        valor: "avaliacao,desc"
    },
    {
        nome: "Menos avaliado",
        valor: "avaliacao,asc"
    },
    {
        nome: "Menor preço",
        valor: "preco,asc"
    },
    {
        nome: "Maior preço",
        valor: "preco,desc"
    },
];

const SelectOrdernar = (props) => {

    const { valueOrdenar, setValueOrdenar } = props;

    const [selectedValue, setSelectedValue] = React.useState("");

    React.useEffect(() => {
        setValueOrdenar(
            optionsOrdernar.find((option) => option.nome == selectedValue)?.valor
        );
    }, [selectedValue]);

    return (
        <Autocomplete
            value={selectedValue}
            onChange={(event, newValueOrdenar) => {
                setSelectedValue(newValueOrdenar);
            }}
            options={
                optionsOrdernar.map((option) => option.nome)
            }
            sx={{ width: 186 }}
            size="small"
            renderInput={(params) => (
                <TextField {...params} label="ordenar por" />
            )}
        />
    )
}

export default SelectOrdernar;