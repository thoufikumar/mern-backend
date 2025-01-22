const fs = require("fs");
const filePath = "students.json";

const readFileAsync = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

const writeFileAsync = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) reject(err);
      resolve();
    });
  });

const createStudent = async (student) => {
  try {
    const data = await readFileAsync(filePath);
    let students = [];
    try {
      students = data ? JSON.parse(data) : [];
    } catch {
      console.error("Invalid JSON file content. Initializing empty array.");
    }
    students.push(student);
    await writeFileAsync(filePath, JSON.stringify(students, null, 2));
    console.log(`Student with id ${student.id} created.`);
  } catch (err) {
    console.error(err.message);
  }
};

const readStudents = async () => {
  try {
    const data = await readFileAsync(filePath);
    const students = JSON.parse(data);
    console.log(students);
  } catch (err) {
    console.error("Error reading students:", err.message);
  }
};

const updateStudent = async (id, updatedStudent) => {
  try {
    const data = await readFileAsync(filePath);
    let students = JSON.parse(data);
    students = students.map((student) =>
      student.id === id ? { ...student, ...updatedStudent } : student
    );
    await writeFileAsync(filePath, JSON.stringify(students, null, 2));
    console.log(`Student with id ${id} updated.`);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteStudent = async (id) => {
  try {
    const data = await readFileAsync(filePath);
    let students = JSON.parse(data).filter((student) => student.id !== id);
    await writeFileAsync(filePath, JSON.stringify(students, null, 2));
    console.log(`Student with id ${id} deleted.`);
  } catch (err) {
    console.error(err.message);
  }
};

const main = async () => {
  await createStudent({ id: 1, name: "ajith", age: 20 });
  await createStudent({ id: 2, name: "Ali", age: 20 });
  await readStudents();
  await updateStudent(1, { name: "Alicia" });
  await deleteStudent(1);
  await readStudents();
};

main();
