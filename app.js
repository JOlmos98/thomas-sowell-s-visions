const PREGUNTAS = [
  {
    aspecto: "Naturaleza humana",
    paco: {
      titular: "Fija e imperfecta.",
      cuerpo:
        "El ser humano es egoísta y limitado de forma inherente. La delincuencia es inevitable y hay que saber gestionarla. Las instituciones deben diseñarse para canalizar sus defectos y mitigar sus fallos.",
    },
    manolo: {
      titular: "Moldeable y perfeccionable.",
      cuerpo:
        "La naturaleza humana es maleable. Con la educación adecuada, el entorno y la cultura, es posible erradicar los defectos humanos y la delincuencia.",
    },
  },
  {
    aspecto: "Soluciones vs. Intercambios",
    paco: {
      titular: "No existen soluciones, solo trade-offs.",
      cuerpo:
        "Cada decisión o política social tiene un coste. El objetivo es elegir el equilibrio (trade-off) con las mejores consecuencias netas.",
    },
    manolo: {
      titular: "Existen soluciones definitivas.",
      cuerpo:
        "Los males sociales (pobreza, delincuencia, desigualdad) son fallos estructurales que se pueden erradicar mediante la ingeniería social.",
    },
  },
  {
    aspecto: "Gestión del conocimiento",
    paco: {
      titular: "Conocimiento disperso.",
      cuerpo:
        "El saber útil está distribuido en millones de personas a través de precios, hábitos y tradiciones. Se desconfía de la planificación central.",
    },
    manolo: {
      titular: "Conocimiento concentrado.",
      cuerpo:
        "La razón articulada de una élite de expertos e intelectuales es superior a la experiencia acumulada o a los procesos descentralizados.",
    },
  },
  {
    aspecto: "Intenciones vs. Incentivos",
    paco: {
      titular: "Incentivos e instituciones.",
      cuerpo:
        "Lo relevante es el resultado práctico generado por los incentivos del sistema, al margen de la intención de los actores.",
    },
    manolo: {
      titular: "Intencionalidad moral.",
      cuerpo:
        "Las políticas se juzgan por la pureza moral y la nobleza del objetivo de quienes las diseñan, no solo por sus resultados.",
    },
  },
  {
    aspecto: "Igualdad",
    paco: {
      titular: "Las mismas reglas para todos.",
      cuerpo:
        "Justicia significa fundamentalmente las mismas reglas para todos. Si personas diferentes toman decisiones diferentes, resultados diferentes son perfectamente compatibles con la igualdad.",
    },
    manolo: {
      titular: "Igualar oportunidades reales.",
      cuerpo:
        "Las mismas reglas pueden perpetuar desigualdades enormes cuando las personas parten de lugares muy distintos. La justicia debe preocuparse también por igualar oportunidades reales.",
    },
  },
];

const VISIONES = {
  paco: {
    nombre: "Visión de Paco",
    sowell: "visión restringida (trágica)",
    resumen:
      "Defiende que el ser humano es imperfecto de forma inherente y que las instituciones deben canalizar esos defectos, no borrarlos. La delincuencia se da por inevitable y hay que saber gestionarla. No hay soluciones definitivas, solo trade-offs con un coste. El saber útil está disperso en millones de personas y se desconfía de la planificación central. Importan los incentivos y los resultados prácticos, al margen de lo nobles que sean las intenciones. La igualdad son las mismas reglas para todos: resultados distintos siguen siendo compatibles con ella.",
    exponentes: [
      "Adam Smith",
      "Edmund Burke",
      "Alexander Hamilton",
      "Friedrich Hayek",
      "Thomas Sowell",
    ],
  },
  manolo: {
    nombre: "Visión de Manolo",
    sowell: "visión no restringida (utópica)",
    resumen:
      "Defiende que la naturaleza humana es maleable y que, con la educación adecuada, se puede erradicar la delincuencia junto con otros defectos. Los males sociales son fallos que la ingeniería social puede resolver. El conocimiento relevante se concentra en la razón de expertos e intelectuales, por encima de la experiencia dispersa. Las políticas se juzgan por la pureza moral de su objetivo. La justicia también debe igualar oportunidades reales cuando las personas parten de lugares muy distintos.",
    exponentes: [
      "Jean-Jacques Rousseau",
      "William Godwin",
      "Marquis de Condorcet",
      "George Bernard Shaw",
      "Karl Marx",
    ],
  },
};

const estado = {
  respuestas: PREGUNTAS.map(() => null),
  finalizado: false,
};

const preguntasEl = document.querySelector("#preguntas");
const finalizarBtn = document.querySelector("#finalizar");
const resultadoEl = document.querySelector("#resultado");

function crearOpcion(indice, lado, texto) {
  const etiqueta = document.createElement("label");
  etiqueta.className = `opcion opcion-${lado}`;

  const input = document.createElement("input");
  input.type = "radio";
  input.name = `pregunta-${indice}`;
  input.value = lado;

  const casilla = document.createElement("span");
  casilla.className = "casilla";
  casilla.setAttribute("aria-hidden", "true");

  const nombre = document.createElement("span");
  nombre.className = "lado";
  nombre.textContent = VISIONES[lado].nombre;

  const titular = document.createElement("strong");
  titular.className = "titular";
  titular.textContent = texto.titular;

  const cuerpo = document.createElement("p");
  cuerpo.className = "cuerpo";
  cuerpo.textContent = texto.cuerpo;

  etiqueta.append(input, casilla, nombre, titular, cuerpo);
  return etiqueta;
}

function crearPregunta(pregunta, indice) {
  const bloque = document.createElement("article");
  bloque.className = "pregunta";
  bloque.dataset.indice = String(indice);

  const enunciado = document.createElement("h2");
  enunciado.className = "enunciado";
  const numero = document.createElement("span");
  numero.className = "numero";
  numero.textContent = String(indice + 1);
  enunciado.append(numero, document.createTextNode(pregunta.aspecto));

  const opciones = document.createElement("div");
  opciones.className = "opciones";
  opciones.append(
    crearOpcion(indice, "paco", pregunta.paco),
    crearOpcion(indice, "manolo", pregunta.manolo),
  );

  bloque.append(enunciado, opciones);
  return bloque;
}

function renderPreguntas() {
  preguntasEl.replaceChildren(...PREGUNTAS.map(crearPregunta));
  actualizarBloqueo();
  actualizarBotonFinalizar();
}

function actualizarBloqueo() {
  preguntasEl.querySelectorAll(".pregunta").forEach((bloque, indice) => {
    const bloqueada = indice > 0 && estado.respuestas[indice - 1] === null;
    bloque.classList.toggle("is-bloqueada", bloqueada);
    bloque.setAttribute("aria-disabled", String(bloqueada));
    bloque.querySelectorAll("input").forEach((input) => {
      input.disabled = bloqueada;
    });
  });
}

function actualizarEleccion(indice) {
  const bloque = preguntasEl.querySelector(`[data-indice="${indice}"]`);
  bloque.querySelectorAll(".opcion").forEach((opcion) => {
    opcion.classList.toggle("is-elegida", opcion.querySelector("input").checked);
  });
}

function todoRespondido() {
  return estado.respuestas.every((respuesta) => respuesta !== null);
}

function actualizarBotonFinalizar() {
  finalizarBtn.disabled = !todoRespondido();
}

function recuento() {
  const manolo = estado.respuestas.filter((lado) => lado === "manolo").length;
  const paco = estado.respuestas.length - manolo;
  return { paco, manolo };
}

function textoInclinacion({ paco, manolo }) {
  if (paco === manolo) {
    return `Empate: ${paco} y ${manolo}`;
  }
  if (paco > manolo) {
    return `${paco} de ${estado.respuestas.length} hacia Paco`;
  }
  return `${manolo} de ${estado.respuestas.length} hacia Manolo`;
}

function textoVeredicto({ paco, manolo }) {
  if (paco === manolo) {
    return "Estás justo en el medio, entre la visión de Paco y la de Manolo.";
  }
  if (paco > manolo) {
    return `Estás más cerca de la Visión de Paco: la ${VISIONES.paco.sowell} de Thomas Sowell.`;
  }
  return `Estás más cerca de la Visión de Manolo: la ${VISIONES.manolo.sowell} de Thomas Sowell.`;
}

function textoPortapapeles(cuenta) {
  const lineas = PREGUNTAS.map((pregunta, indice) => {
    const lado = estado.respuestas[indice];
    return `${indice + 1}. ${pregunta.aspecto}: ${VISIONES[lado].nombre}`;
  });
  return ["Visión de Paco / Visión de Manolo", "", ...lineas, "", textoInclinacion(cuenta)].join("\n");
}

function crearExplicacion(lado) {
  const vision = VISIONES[lado];
  const tarjeta = document.createElement("article");
  tarjeta.className = `explicacion explicacion-${lado}`;

  const titulo = document.createElement("h3");
  titulo.textContent = `${vision.nombre}: ${vision.sowell}`;

  const resumen = document.createElement("p");
  resumen.textContent = vision.resumen;

  const lista = document.createElement("ul");
  lista.className = "exponentes";
  vision.exponentes.forEach((nombre) => {
    const item = document.createElement("li");
    item.textContent = nombre;
    lista.append(item);
  });

  const pie = document.createElement("p");
  pie.textContent = "Exponentes según Thomas Sowell:";
  tarjeta.append(titulo, resumen, pie, lista);
  return tarjeta;
}

function crearMedidor(cuenta) {
  const medidor = document.createElement("div");
  medidor.className = "medidor";

  const etiquetas = document.createElement("div");
  etiquetas.className = "medidor-etiquetas";
  const paco = document.createElement("span");
  paco.textContent = "Paco";
  const manolo = document.createElement("span");
  manolo.textContent = "Manolo";
  etiquetas.append(paco, manolo);

  const slider = document.createElement("input");
  slider.className = "slider";
  slider.type = "range";
  slider.min = "0";
  slider.max = String(estado.respuestas.length);
  slider.step = "1";
  slider.value = String(cuenta.manolo);
  slider.tabIndex = -1;
  slider.setAttribute("aria-disabled", "true");
  slider.setAttribute("aria-valuetext", textoInclinacion(cuenta));
  slider.style.setProperty("--progreso", `${(cuenta.manolo / estado.respuestas.length) * 100}%`);
  slider.setAttribute("aria-label", "Inclinación de Paco a Manolo");

  const lectura = document.createElement("p");
  lectura.className = "medidor-lectura";
  lectura.textContent = textoInclinacion(cuenta);

  medidor.append(etiquetas, slider, lectura);
  return medidor;
}

function crearPostit(cuenta) {
  const nota = document.createElement("aside");
  nota.className = "postit";

  const titulo = document.createElement("h3");
  titulo.textContent = "Tus elecciones";

  const lista = document.createElement("div");
  PREGUNTAS.forEach((pregunta, indice) => {
    const linea = document.createElement("p");
    linea.className = "eleccion";
    const aspecto = document.createElement("strong");
    aspecto.textContent = `${indice + 1}. ${pregunta.aspecto}`;
    const elegido = document.createElement("span");
    elegido.textContent = VISIONES[estado.respuestas[indice]].nombre;
    linea.append(aspecto, elegido);
    lista.append(linea);
  });

  const aviso = document.createElement("p");
  aviso.className = "aviso-copia";
  aviso.setAttribute("role", "status");

  const copiar = document.createElement("button");
  copiar.className = "boton boton-postit";
  copiar.type = "button";
  copiar.textContent = "Copiar al portapapeles";
  copiar.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(textoPortapapeles(cuenta));
      aviso.textContent = "Copiado";
      copiar.classList.add("is-copiado");
    } catch {
      aviso.textContent = "No se pudo copiar";
    }
  });

  nota.append(titulo, lista, aviso, copiar);
  return nota;
}

function renderResultado() {
  const cuenta = recuento();
  const titulo = document.createElement("h2");
  titulo.textContent = "Tu resultado";

  const veredicto = document.createElement("p");
  veredicto.className = "veredicto";
  veredicto.textContent = textoVeredicto(cuenta);

  const explicaciones = document.createElement("div");
  explicaciones.className = "explicaciones";
  explicaciones.append(crearExplicacion("paco"), crearExplicacion("manolo"));

  const rejilla = document.createElement("div");
  rejilla.className = "resultado-rejilla";
  rejilla.append(explicaciones, crearPostit(cuenta));

  const reiniciarWrap = document.createElement("div");
  reiniciarWrap.className = "reiniciar";
  const reiniciar = document.createElement("button");
  reiniciar.className = "boton boton-secundario";
  reiniciar.type = "button";
  reiniciar.textContent = "Empezar de nuevo";
  reiniciar.addEventListener("click", reiniciarTest);
  reiniciarWrap.append(reiniciar);

  resultadoEl.replaceChildren(titulo, veredicto, crearMedidor(cuenta), rejilla, reiniciarWrap);
  resultadoEl.hidden = false;
  estado.finalizado = true;
  resultadoEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function reiniciarTest() {
  estado.respuestas = PREGUNTAS.map(() => null);
  estado.finalizado = false;
  resultadoEl.hidden = true;
  resultadoEl.replaceChildren();
  renderPreguntas();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function alElegir(evento) {
  const input = evento.target;
  if (!(input instanceof HTMLInputElement) || input.type !== "radio") return;

  const indice = Number(input.name.replace("pregunta-", ""));
  estado.respuestas[indice] = input.value;
  actualizarEleccion(indice);
  actualizarBloqueo();
  actualizarBotonFinalizar();

  if (estado.finalizado) {
    estado.finalizado = false;
    resultadoEl.hidden = true;
    resultadoEl.replaceChildren();
  }
}

preguntasEl.addEventListener("change", alElegir);
finalizarBtn.addEventListener("click", renderResultado);
renderPreguntas();
