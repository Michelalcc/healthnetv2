const API = "http://localhost:3000/api";

let pacientes = [];

async function initDiagnostico() {
  await cargarPacientes();

  document.getElementById("imagenInput")
    .addEventListener("change", previewImagen);
}

async function cargarPacientes() {
  const res = await fetch(API + "/pacientes");
  const data = await res.json();

  pacientes = data.data;

  const select = document.getElementById("pacienteSelect");

  pacientes.forEach(p => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = p.nombre;
    select.appendChild(option);
  });
}

function previewImagen(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    document.getElementById("preview").src = reader.result;
  };

  reader.readAsDataURL(file);
}

async function enviarDiagnostico() {
  const paciente_id = document.getElementById("pacienteSelect").value;

  const res = await fetch(API + "/diagnosis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({
      paciente_id,
      resultado: "Normal",
      probabilidad: Math.random().toFixed(2),
      tiene_fibroma: false,
      recomendacion: "Control normal"
    })
  });

  const data = await res.json();

  document.getElementById("resultado").innerHTML = `
    <h3>Resultado:</h3>
    <p>Probabilidad: ${data.data.probabilidad}</p>
    <p>Nivel: ${data.data.nivel || "No definido"}</p>
  `;
}