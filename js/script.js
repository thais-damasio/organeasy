// Página de cadastro
function chooseAvatar() {
    let img = document.getElementById("select").value;
    if (img)
        document.getElementById("avatar").src = "img/avatar/" + img;
    else
        document.getElementById("avatar").src = "img/avatar/none.svg";
}
// Novo Curso
function addMateria() {
    let input = document.getElementById('nova_materia');
    if (input.value) {
        let listMaterias = document.getElementById('materias');
        let li = document.createElement("li");
        li.innerHTML = input.value;
        listMaterias.appendChild(li);
        input.value = '';
    }
}
function changeHasMateria(radio) {
    let li = document.getElementById('has_materia');
    if (radio.value == 's')
        li.style.display = 'block';
    else
        li.style.display = 'none';
}
//Nova Atividade
function typeAtv(select) {
    let div = document.getElementById('list_materias');
    if(select.value == "1")
        div.style.display = "none";
    else
        div.style.display = "block";

}