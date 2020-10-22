import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';
import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputRangoInferior: HTMLInputElement = <HTMLInputElement>document.getElementById("rangoInferior")!;
const inputRangoSuperior: HTMLInputElement = <HTMLInputElement>document.getElementById("rangoSuperior")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const atributos = ["Código", "Cédula", "Edad", "Dirección", "Teléfono"];

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInTable(student: Student[]): void {
  console.log('Desplegando datos del estudiante');
  student.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${atributos[0]}</td>
                           <td>${student.codigo}</td>`;
    studentTbody.appendChild(trElement);

    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${atributos[1]}</td>
                           <td>${student.cedula}</td>`;
    studentTbody.appendChild(trElement);

    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${atributos[2]}</td>
                           <td>${student.edad}</td>`;
    studentTbody.appendChild(trElement);

    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${atributos[3]}</td>
                           <td>${student.direccion}</td>`;
    studentTbody.appendChild(trElement);

    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${atributos[4]}</td>
                           <td>${student.telefono}</td>`;
    studentTbody.appendChild(trElement);
  });
}

function applyFilterByName() {
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredits() {
  let inf = inputRangoInferior.value;
  let sup = inputRangoSuperior.value;
  if (inf === '' || sup === '') {
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCredits(-1, -1, dataCourses);
    renderCoursesInTable(coursesFiltered);
  }
  else {
    let inferior = +inf;
    let superior = +sup;
    if (inferior < 0 || superior < 0) {
      alert("Debe ingresar un rango válido (números positivos)");
    }
    else if (inferior > superior) {
      clearCoursesInTable();
      let coursesFiltered: Course[] = searchCourseByCredits(superior, inferior, dataCourses);
      renderCoursesInTable(coursesFiltered);
    }
    else {
      clearCoursesInTable();
      let coursesFiltered: Course[] = searchCourseByCredits(inferior, superior, dataCourses);
      renderCoursesInTable(coursesFiltered);
    }
  }
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter(c =>
    c.name.match(nameKey));
}

function searchCourseByCredits(inf: number, sup: number, courses: Course[]) {
  if (inf < 0) { return dataCourses; }

  let coursesToAdd: Course[] = [];

  courses.forEach(course => {

    if (course.credits >= inf && course.credits <= sup) {
      coursesToAdd.push(course);
    }
  });

  return coursesToAdd;
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
    }
  }
}
