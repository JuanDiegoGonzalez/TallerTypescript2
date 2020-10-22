import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('student');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputRangoInferior = document.getElementById("rangoInferior");
var inputRangoSuperior = document.getElementById("rangoSuperior");
var totalCreditElm = document.getElementById("total-credits");
var atributos = ["Código", "Cédula", "Edad", "Dirección", "Teléfono"];
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(student) {
    console.log('Desplegando datos del estudiante');
    student.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + atributos[0] + "</td>\n                           <td>" + student.codigo + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + atributos[1] + "</td>\n                           <td>" + student.cedula + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + atributos[2] + "</td>\n                           <td>" + student.edad + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + atributos[3] + "</td>\n                           <td>" + student.direccion + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + atributos[4] + "</td>\n                           <td>" + student.telefono + "</td>";
        studentTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredits() {
    var inf = inputRangoInferior.value;
    var sup = inputRangoSuperior.value;
    if (inf === '' || sup === '') {
        clearCoursesInTable();
        var coursesFiltered = searchCourseByCredits(-1, -1, dataCourses);
        renderCoursesInTable(coursesFiltered);
    }
    else {
        var inferior = +inf;
        var superior = +sup;
        if (inferior < 0 || superior < 0) {
            alert("Debe ingresar un rango válido (números positivos)");
        }
        else if (inferior > superior) {
            clearCoursesInTable();
            var coursesFiltered = searchCourseByCredits(superior, inferior, dataCourses);
            renderCoursesInTable(coursesFiltered);
        }
        else {
            clearCoursesInTable();
            var coursesFiltered = searchCourseByCredits(inferior, superior, dataCourses);
            renderCoursesInTable(coursesFiltered);
        }
    }
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(inf, sup, courses) {
    if (inf < 0) {
        return dataCourses;
    }
    var coursesToAdd = [];
    courses.forEach(function (course) {
        if (course.credits >= inf && course.credits <= sup) {
            coursesToAdd.push(course);
        }
    });
    return coursesToAdd;
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
