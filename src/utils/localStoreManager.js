export const updateCurrentUser = (user) => {
    const usuario = JSON.stringify(user);
    localStorage.setItem("usuario", usuario);
}

export const getCurrentUser = () => {
    const usuario = localStorage.getItem("usuario");
    return JSON.parse(usuario);
}