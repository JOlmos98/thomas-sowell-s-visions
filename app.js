import { montarTest } from "./motor.js";

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

montarTest({ preguntas: PREGUNTAS, enlaceExtendido: true });
