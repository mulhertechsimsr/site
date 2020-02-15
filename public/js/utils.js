const byId = (id) => {
    return document.getElementById(id);
}

const byClass = (classe) => {
    return document.getElementsByClassName(classe);
}

const getClass = (id) => {
    return byId(id).getAttribute("class");
}