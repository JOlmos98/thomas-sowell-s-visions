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
    nota.className = preguntas.length > 8 ? "postit postit-denso" : "postit";

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

  function partirLineas(ctx, texto, maximo) {
    const lineas = [];
    let actual = "";
    texto.split(" ").forEach((palabra) => {
      const prueba = actual ? `${actual} ${palabra}` : palabra;
      if (ctx.measureText(prueba).width > maximo && actual) {
        lineas.push(actual);
        actual = palabra;
      } else {
        actual = prueba;
      }
    });
    if (actual) lineas.push(actual);
    return lineas;
  }

  function barrasResultado(cuenta, lecturas) {
    return [
      {
        nombreIzq: "Paco",
        nombreDer: "Manolo",
        cuenta,
        colorIzq: "#6a9a7c",
        colorDer: "#7aa3c0",
        texto: textoInclinacion(cuenta, "Paco", "Manolo"),
      },
      ...lecturas.map((lectura) => ({
        nombreIzq: lectura.nombreIzq,
        nombreDer: lectura.nombreDer,
        cuenta: lectura.cuenta,
        colorIzq: lectura.colorIzq,
        colorDer: lectura.colorDer,
        texto: lectura.texto,
      })),
    ];
  }

  function eleccionesTarjeta() {
    return preguntas.map((pregunta, indice) => ({
      texto: `${indice + 1}. ${pregunta.aspecto}`,
      lado: estado.respuestas[indice] === "paco" ? "Paco" : "Manolo",
      color: estado.respuestas[indice] === "paco" ? "#3f6b50" : "#3f6888",
    }));
  }

  function recortarTexto(ctx, texto, maximo) {
    if (ctx.measureText(texto).width <= maximo) return texto;
    let corte = texto;
    while (corte.length > 1 && ctx.measureText(`${corte}…`).width > maximo) {
      corte = corte.slice(0, -1);
    }
    return `${corte}…`;
  }

  function crearTarjeta(veredicto, barras, elecciones) {
    const ancho = 1080;
    const margen = 80;
    const medida = document.createElement("canvas").getContext("2d");
    medida.font = "700 52px Segoe UI, Trebuchet MS, sans-serif";
    const lineas = partirLineas(medida, veredicto, ancho - margen * 2);
    const columnas = elecciones.length > 6 ? 2 : 1;
    const filas = Math.ceil(elecciones.length / columnas);
    const altoLista = 70 + filas * 38;
    const altoContenido = 120 + lineas.length * 68 + barras.length * 196 + altoLista;
    const alto = Math.max(1350, altoContenido + 120);
    const desplazar = Math.max(0, (alto - altoContenido - 80) / 2);
    const canvas = document.createElement("canvas");
    canvas.width = ancho;
    canvas.height = alto;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff4e8";
    ctx.fillRect(0, 0, ancho, alto);

    const brillo = ctx.createRadialGradient(ancho, 0, 40, ancho, 0, 520);
    brillo.addColorStop(0, "#b7daf2");
    brillo.addColorStop(1, "rgba(183, 218, 242, 0)");
    ctx.fillStyle = brillo;
    ctx.fillRect(0, 0, ancho, 420);

    ctx.fillStyle = "#6d6258";
    ctx.font = "700 28px Segoe UI, Trebuchet MS, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Test de ${preguntas.length} decisiones`, margen, 72 + desplazar);

    ctx.fillStyle = "#3d342c";
    ctx.font = "700 52px Segoe UI, Trebuchet MS, sans-serif";
    lineas.forEach((linea, indice) => {
      ctx.fillText(linea, margen, 156 + desplazar + indice * 68);
    });

    let y = 156 + desplazar + lineas.length * 68 + 36;
    barras.forEach((barra) => {
      const pistaX = margen;
      const pistaAncho = ancho - margen * 2;
      const pistaY = y + 58;
      const pistaAlto = 22;
      const progreso = barra.cuenta.total === 0 ? 0.5 : barra.cuenta.derecha / barra.cuenta.total;

      ctx.font = "800 30px Segoe UI, Trebuchet MS, sans-serif";
      ctx.textAlign = "left";
      ctx.fillStyle = barra.colorIzq;
      ctx.fillText(barra.nombreIzq, pistaX, y + 28);
      ctx.textAlign = "right";
      ctx.fillStyle = barra.colorDer;
      ctx.fillText(barra.nombreDer, pistaX + pistaAncho, y + 28);

      const degradado = ctx.createLinearGradient(pistaX, 0, pistaX + pistaAncho, 0);
      degradado.addColorStop(0, barra.colorIzq);
      degradado.addColorStop(1, barra.colorDer);
      ctx.fillStyle = degradado;
      ctx.beginPath();
      ctx.roundRect(pistaX, pistaY, pistaAncho, pistaAlto, 999);
      ctx.fill();

      const puntoX = pistaX + progreso * pistaAncho;
      ctx.beginPath();
      ctx.arc(puntoX, pistaY + pistaAlto / 2, 20, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(puntoX, pistaY + pistaAlto / 2, 13, 0, Math.PI * 2);
      ctx.fillStyle = colorPulgar(barra.cuenta, barra.colorIzq, barra.colorDer);
      ctx.fill();

      ctx.textAlign = "center";
      ctx.fillStyle = "#6d6258";
      ctx.font = "700 26px Segoe UI, Trebuchet MS, sans-serif";
      ctx.fillText(barra.texto, ancho / 2, pistaY + 72);
      y += 196;
    });

    y += 16;
    ctx.textAlign = "left";
    ctx.fillStyle = "#3d342c";
    ctx.font = "700 28px Segoe UI, Trebuchet MS, sans-serif";
    ctx.fillText("Tus elecciones", margen, y);
    y += 42;

    const hueco = 36;
    const anchoColumna = (ancho - margen * 2 - (columnas - 1) * hueco) / columnas;
    ctx.font = "600 24px Segoe UI, Trebuchet MS, sans-serif";
    elecciones.forEach((eleccion, indice) => {
      const columna = indice % columnas;
      const fila = Math.floor(indice / columnas);
      const x = margen + columna * (anchoColumna + hueco);
      const lineaY = y + fila * 38;
      const lado = `  ${eleccion.lado}`;
      const anchoLado = ctx.measureText(lado).width;
      const aspecto = recortarTexto(ctx, eleccion.texto, anchoColumna - anchoLado);
      ctx.fillStyle = "#3d342c";
      ctx.fillText(aspecto, x, lineaY);
      ctx.fillStyle = eleccion.color;
      ctx.fillText(lado, x + ctx.measureText(aspecto).width, lineaY);
    });

    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(109, 98, 88, 0.7)";
    ctx.font = "600 24px Segoe UI, Trebuchet MS, sans-serif";
    ctx.fillText("® Thomas Sowell's Visions  ·  Github", ancho / 2, alto - 48);
    return canvas;
  }

  function descargarTarjeta(veredicto, barras) {
    const canvas = crearTarjeta(veredicto, barras, eleccionesTarjeta());
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const enlace = document.createElement("a");
      enlace.href = url;
      enlace.download = "resultado-visiones.png";
      enlace.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
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
    const descargar = document.createElement("button");
    descargar.className = "boton boton-secundario";
    descargar.type = "button";
    descargar.textContent = "Descargar imagen";
    descargar.addEventListener("click", () => {
      descargarTarjeta(textoVeredicto(cuenta), barrasResultado(cuenta, lecturas));
    });
    reiniciarWrap.append(reiniciar, descargar);

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
