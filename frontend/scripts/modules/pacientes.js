import { api } from "../core/api.js";

// ======================
// INIT
// ======================
window.addEventListener("DOMContentLoaded", initPacientes);

async function initPacientes() {
  await cargarPacientes();

  const form = document.getElementById("formPaciente");
  if (form) {
    form.addEventListener("submit", crearPaciente);
  }
}

// ======================
// LISTAR PACIENTES (PRO)
// ======================
async function cargarPacientes() {
  try {
    const data = await api.get("/pacientes");

    const lista = document.getElementById("listaPacientes");
    lista.innerHTML = "";

    data.data.forEach(p => {
      const li = document.createElement("li");

      li.className = "paciente-item";

      li.innerHTML = `
        <div>
          <strong>${p.nombre}</strong><br>
          <small>DNI: ${p.dni} | Edad: ${p.edad}</small>
        </div>
        <button class="btn-diagnostico">Diagnosticar</button>
      `;

      // 🔥 BOTÓN CLAVE
      li.querySelector(".btn-diagnostico").addEventListener("click", () => {
        seleccionarPaciente(p);
      });

      lista.appendChild(li);
    });

  } catch (error) {
    console.error("Error cargando pacientes:", error.message);
  }
}

// ======================
// SELECCIONAR PACIENTE (CLAVE DEL SISTEMA)
// ======================
function seleccionarPaciente(paciente) {
  try {
    localStorage.setItem("pacienteActivo", JSON.stringify(paciente));

    // 🔥 REDIRECCIÓN AL MÓDULO IA
    window.location.href = "/pages/diagnostico.html";

  } catch (error) {
    console.error("Error guardando paciente:", error);
  }
}

// ======================
// CREAR PACIENTE
// ======================
async function crearPaciente(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const dni = document.getElementById("dni").value;
  const edad = document.getElementById("edad").value;
  const sexo = document.getElementById("sexo").value;

  try {
    await api.post("/pacientes", {
      nombre,
      dni,
      edad,
      sexo
    });

    alert("Paciente creado correctamente");

    // limpiar form
    document.getElementById("formPaciente").reset();

    // recargar lista
    cargarPacientes();

  } catch (error) {
    alert(error.message);
  }
}