import moment from "moment-timezone";

export const exibirHorario = (horario) => {
    const data = moment(horario).tz("America/Sao_Paulo").format("DD/MM/YYYY");

    const agora = moment().tz("America/Sao_Paulo").format("DD/MM/YYYY");

    if(data == agora)  {
        return moment(horario).tz("America/Sao_Paulo").format("HH:mm");
    }

    return moment(horario).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm");
};

