import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const SelectOrdernar = (props) => {

    const optionsOrdernar = [
        "Mais avaliado",
        "Maior preço",
        "Menor preço",
    ];

    React.useEffect(() => {
        setValueOrdenar(optionsOrdernar[0]);
    }, []);

    const { valueOrdenar, setValueOrdenar } = props;
    return (
        <Autocomplete
            value={valueOrdenar}
            onChange={(event, newValueOrdenar) => {
                setValueOrdenar(newValueOrdenar);
            }}
            id="controllable-states-demo"
            options={optionsOrdernar}
            sx={{ width: 186 }}
            size="small"
            renderInput={(params) => (
                <TextField {...params} label="ordenar por" />
            )}
        />
    )
}

export default SelectOrdernar;