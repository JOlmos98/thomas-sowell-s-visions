export const VISIONES = {
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

export function montarTest({ preguntas, enlaceExtendido = false, ejesExtra = [] }) {
  const estado = {
    respuestas: preguntas.map(() => null),
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
    preguntasEl.replaceChildren(...preguntas.map(crearPregunta));
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

  function contarLado(indices, lado) {
    return indices.filter((indice) => estado.respuestas[indice] === lado).length;
  }

  function recuentoEje(indices) {
    const derecha = contarLado(indices, "manolo");
    const izquierda = indices.length - derecha;
    return { izquierda, derecha, total: indices.length };
  }

  function textoInclinacion(cuenta, nombreIzq, nombreDer) {
    if (cuenta.izquierda === cuenta.derecha) {
      return `Empate: ${cuenta.izquierda} y ${cuenta.derecha}`;
    }
    if (cuenta.izquierda > cuenta.derecha) {
      return `${cuenta.izquierda} de ${cuenta.total} hacia ${nombreIzq}`;
    }
    return `${cuenta.derecha} de ${cuenta.total} hacia ${nombreDer}`;
  }

  function colorPulgar(cuenta, colorIzq, colorDer) {
    if (cuenta.izquierda > cuenta.derecha) return colorIzq;
    if (cuenta.derecha > cuenta.izquierda) return colorDer;
    return "#6d6258";
  }

  function textoVeredicto(cuenta) {
    if (cuenta.izquierda === cuenta.derecha) {
      return "Estás justo en el medio, entre la visión de Paco y la de Manolo.";
    }
    if (cuenta.izquierda > cuenta.derecha) {
      return `Estás más cerca de la Visión de Paco: la ${VISIONES.paco.sowell} de Thomas Sowell.`;
    }
    return `Estás más cerca de la Visión de Manolo: la ${VISIONES.manolo.sowell} de Thomas Sowell.`;
  }

  function textoPortapapeles(cuenta, lecturas) {
    const lineas = preguntas.map((pregunta, indice) => {
      const lado = estado.respuestas[indice];
      return `${indice + 1}. ${pregunta.aspecto}: ${VISIONES[lado].nombre}`;
    });
    const extras = lecturas.map(
      (lectura) => `${lectura.izquierda} / ${lectura.derecha}: ${lectura.texto}`,
    );
    return [
      "Visión de Paco / Visión de Manolo",
      "",
      ...lineas,
      "",
      textoInclinacion(cuenta, "Paco", "Manolo"),
      ...extras,
    ].join("\n");
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

  function crearMedidor({
    nombreIzq,
    nombreDer,
    cuenta,
    colorIzq,
    colorDer,
    tintaIzq,
    tintaDer,
    medio,
    aria,
  }) {
    const medidor = document.createElement("div");
    medidor.className = "medidor";

    const etiquetas = document.createElement("div");
    etiquetas.className = "medidor-etiquetas";
    const izquierda = document.createElement("span");
    izquierda.textContent = nombreIzq;
    izquierda.style.color = tintaIzq;
    const derecha = document.createElement("span");
    derecha.textContent = nombreDer;
    derecha.style.color = tintaDer;
    etiquetas.append(izquierda, derecha);

    const slider = document.createElement("input");
    slider.className = "slider";
    slider.type = "range";
    slider.min = "0";
    slider.max = String(cuenta.total);
    slider.step = "1";
    slider.value = String(cuenta.derecha);
    slider.tabIndex = -1;
    slider.setAttribute("aria-disabled", "true");
    const lecturaTexto = textoInclinacion(cuenta, nombreIzq, nombreDer);
    slider.setAttribute("aria-valuetext", lecturaTexto);
    slider.setAttribute("aria-label", aria);
    slider.style.setProperty("--progreso", `${(cuenta.derecha / cuenta.total) * 100}%`);
    slider.style.setProperty("--lado-izq", colorIzq);
    slider.style.setProperty("--lado-der", colorDer);
    slider.style.setProperty("--lado-medio", medio);
    slider.style.setProperty("--pulgar", colorPulgar(cuenta, colorIzq, colorDer));

    const lectura = document.createElement("p");
    lectura.className = "medidor-lectura";
    lectura.textContent = lecturaTexto;

    medidor.append(etiquetas, slider, lectura);
    return medidor;
  }

  function crearPostit(cuenta, lecturas) {
    const nota = document.createElement("aside");
    nota.className = "postit";

    const titulo = document.createElement("h3");
    titulo.textContent = "Tus elecciones";

    const lista = document.createElement("div");
    preguntas.forEach((pregunta, indice) => {
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
        await navigator.clipboard.writeText(textoPortapapeles(cuenta, lecturas));
        aviso.textContent = "Copiado";
        copiar.classList.add("is-copiado");
      } catch {
        aviso.textContent = "No se pudo copiar";
      }
    });

    nota.append(titulo, lista, aviso, copiar);
    return nota;
  }

  function crearLecturas() {
    return ejesExtra.map((eje) => {
      const cuenta = recuentoEje(eje.indices);
      return {
        ...eje,
        cuenta,
        texto: textoInclinacion(cuenta, eje.nombreIzq, eje.nombreDer),
        frase: eje.frase(cuenta),
      };
    });
  }

  function renderResultado() {
    const indices = preguntas.map((_, indice) => indice);
    const cuenta = recuentoEje(indices);
    const lecturas = crearLecturas();

    const titulo = document.createElement("h2");
    titulo.textContent = "Tu resultado";

    const veredicto = document.createElement("p");
    veredicto.className = "veredicto";
    veredicto.textContent = textoVeredicto(cuenta);

    const medidorPrincipal = crearMedidor({
      nombreIzq: "Paco",
      nombreDer: "Manolo",
      cuenta,
      colorIzq: "var(--paco)",
      colorDer: "var(--manolo)",
      tintaIzq: "var(--paco-tinta)",
      tintaDer: "var(--manolo-tinta)",
      medio: "#d8e4de",
      aria: "Inclinación de Paco a Manolo",
    });

    const piezas = [titulo, veredicto, medidorPrincipal];

    if (lecturas.length > 0) {
      const bloque = document.createElement("section");
      bloque.className = "lecturas";
      const encabezado = document.createElement("h3");
      encabezado.textContent = "Otras lecturas";
      const nota = document.createElement("p");
      nota.className = "nota-lecturas";
      nota.textContent =
        "Estas barras no repiten el recuento de Paco y Manolo. Cada una mira solo unas preguntas del test, así que puedes salir más hacia un lado aquí y hacia el otro en la visión general.";
      bloque.append(encabezado, nota);

      lecturas.forEach((lectura) => {
        const pieza = document.createElement("article");
        pieza.className = "lectura";
        const frase = document.createElement("p");
        frase.className = "frase-lectura";
        frase.textContent = lectura.frase;
        pieza.append(
          crearMedidor({
            nombreIzq: lectura.nombreIzq,
            nombreDer: lectura.nombreDer,
            cuenta: lectura.cuenta,
            colorIzq: lectura.colorIzq,
            colorDer: lectura.colorDer,
            tintaIzq: lectura.tintaIzq,
            tintaDer: lectura.tintaDer,
            medio: lectura.medio,
            aria: `Inclinación de ${lectura.nombreIzq} a ${lectura.nombreDer}`,
          }),
          frase,
        );
        bloque.append(pieza);
      });
      piezas.push(bloque);
    }

    const explicaciones = document.createElement("div");
    explicaciones.className = "explicaciones";
    explicaciones.append(crearExplicacion("paco"), crearExplicacion("manolo"));

    const rejilla = document.createElement("div");
    rejilla.className = "resultado-rejilla";
    rejilla.append(explicaciones, crearPostit(cuenta, lecturas));

    const reiniciarWrap = document.createElement("div");
    reiniciarWrap.className = "reiniciar";
    const reiniciar = document.createElement("button");
    reiniciar.className = "boton boton-secundario";
    reiniciar.type = "button";
    reiniciar.textContent = "Empezar de nuevo";
    reiniciar.addEventListener("click", reiniciarTest);
    reiniciarWrap.append(reiniciar);

    if (enlaceExtendido) {
      const extendido = document.createElement("a");
      extendido.className = "boton boton-extendido";
      extendido.href = "extended.html";
      extendido.textContent = "Hacer test en versión extendida";
      reiniciarWrap.append(extendido);
    }

    resultadoEl.replaceChildren(...piezas, rejilla, reiniciarWrap);
    resultadoEl.hidden = false;
    estado.finalizado = true;
    resultadoEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function reiniciarTest() {
    estado.respuestas = preguntas.map(() => null);
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
}
