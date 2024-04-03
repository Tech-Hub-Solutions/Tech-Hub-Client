import { Switch } from "@mui/material"
import React from "react"

const SwitchButton = React.forwardRef((props, ref) => {
    return (
        <Switch
            ref={ref}
            sx={{
                '& .Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'var(--color-azul)',
                },

                '.Mui-checked .MuiSwitch-thumb': {
                    color: 'var(--color-azul)',
                },

                '.MuiSwitch-thumb': {
                    color: '#8F8F8F',
                },

                '.MuiSwitch-track': {
                    backgroundColor: '#8F8F8F',
                }
            }}
            {...props}
        />
    )
})


export default SwitchButton