import { api } from "../core/api.js";

let resultadoIA = null;
let pacienteActivo = null;
let imagenCargada = false;

// ======================
// INIT
// ======================
window.addEventListener("DOMContentLoaded", initDiagnostico);

function initDiagnostico() {
  cargarPacienteActual();

  document
    .getElementById("imageInput")
    .addEventListener("change", previewImagen);

  document
    .getElementById("btnAnalyze")
    .addEventListener("click", analizarIA);

  document
    .getElementById("btnSave")
    .addEventListener("click", guardarDiagnostico);
}

// ======================
// PACIENTE ACTIVO REAL
// ======================
function cargarPacienteActual() {
  const data = localStorage.getItem("pacienteActivo");

  if (!data) {
    document.getElementById("pNombre").innerText = "Sin paciente";
    document.getElementById("pDni").innerText = "";
    return;
  }

  pacienteActivo = JSON.parse(data);

  document.getElementById("pNombre").innerText =
    pacienteActivo.nombre;

  document.getElementById("pDni").innerText =
    "DNI: " + pacienteActivo.dni;
}

// ======================
// PREVIEW IMAGEN
// ======================
function previewImagen(e) {
  const file = e.target.files[0];

  if (!file) return;

  imagenCargada = true;

  const reader = new FileReader();

  reader.onload = () => {
    const img = document.getElementById("previewImg");

    img.src = reader.result;
    img.style.display = "block";

    document.getElementById("previewEmpty").style.display = "none";
  };

  reader.readAsDataURL(file);
}

// ======================
// IA SIMULADA PRO
// ======================
async function analizarIA() {

  if (!pacienteActivo) {
    alert("Debe seleccionar un paciente primero");
    return;
  }

  if (!imagenCargada) {
    alert("Debe subir una imagen");
    return;
  }

  const iaText = document.getElementById("iaText");
  iaText.innerText = "Analizando con IA...";

  // Simulación de procesamiento
  await new Promise(r => setTimeout(r, 2000));

  const prob = Math.random();

  let nivel = "";
  let recomendacion = "";

  if (prob > 0.7) {
    nivel = "ALTO";
    recomendacion =
      "Riesgo elevado detectado. Se recomienda evaluación médica urgente.";
  } 
  else if (prob > 0.4) {
    nivel = "MEDIO";
    recomendacion =
      "Hallazgos moderados. Se sugiere seguimiento clínico.";
  } 
  else {
    nivel = "BAJO";
    recomendacion =
      "Sin anomalías relevantes. Mantener control periódico.";
  }

  resultadoIA = {
    probabilidad: prob,
    nivel,
    recomendacion
  };

  renderResultado();

  document.getElementById("btnSave").disabled = false;
}

// ======================
// RENDER RESULTADO
// ======================
function renderResultado() {
  const { probabilidad, nivel, recomendacion } = resultadoIA;

  const porcentaje = Math.round(probabilidad * 100);

  document.getElementById("iaText").innerText = nivel;
  document.getElementById("iaConf").innerText = porcentaje + "%";
  document.getElementById("iaBar").style.width = porcentaje + "%";
  document.getElementById("iaLevel").innerText = nivel;
  document.getElementById("iaReco").innerText = recomendacion;

  // SEMÁFORO
  document.getElementById("lightGreen").classList.remove("active");
  document.getElementById("lightYellow").classList.remove("active");
  document.getElementById("lightRed").classList.remove("active");

  if (nivel === "BAJO") {
    document.getElementById("lightGreen").classList.add("active");
  } 
  else if (nivel === "MEDIO") {
    document.getElementById("lightYellow").classList.add("active");
  } 
  else {
    document.getElementById("lightRed").classList.add("active");
  }
}

// ======================
// GUARDAR DIAGNÓSTICO
// ======================
async function guardarDiagnostico() {
  try {

    if (!resultadoIA) {
      alert("Primero debe analizar la imagen");
      return;
    }

    await api.post("/diagnosis", {
      paciente_id: pacienteActivo.id,
      resultado: resultadoIA.nivel.toLowerCase(),
      probabilidad: resultadoIA.probabilidad.toFixed(2),
      tiene_fibroma:
        document.getElementById("fibromasSelect").value === "Sí",
      recomendacion: resultadoIA.recomendacion
    });

    alert("Diagnóstico guardado correctamente");

  } catch (e) {
    console.error(e);
    alert("Error guardando diagnóstico");
  }
}