import { montarTest } from "./motor.js";

function pregunta(aspecto, pacoTitular, pacoCuerpo, manoloTitular, manoloCuerpo) {
  return {
    aspecto,
    paco: { titular: pacoTitular, cuerpo: pacoCuerpo },
    manolo: { titular: manoloTitular, cuerpo: manoloCuerpo },
  };
}

function frase(cuenta, haciaIzquierda, haciaDerecha, empate) {
  if (cuenta.izquierda === cuenta.derecha) return empate;
  if (cuenta.izquierda > cuenta.derecha) return haciaIzquierda;
  return haciaDerecha;
}

const PREGUNTAS = [
  pregunta(
    "Naturaleza humana",
    "Nunca desaparecerán.",
    "El ser humano es inevitablemente imperfecto: egoísmo, violencia, envidia, tribalismo o abuso de poder nunca desaparecerán. Hay que construir sistemas capaces de funcionar a pesar de esos defectos.",
    "El ser humano es moldeable.",
    "Gran parte de esas conductas no son inevitables. El ser humano es moldeable y mejores instituciones, educación y condiciones sociales pueden reducirlas radicalmente.",
  ),
  pregunta(
    "Hasta dónde puede mejorar el ser humano",
    "Límites humanos permanentes.",
    "Podemos mejorar conocimientos y comportamiento, pero existen límites humanos permanentes. Ninguna reforma convertirá al hombre en un ser sistemáticamente racional, altruista y justo.",
    "Podrían transformarse profundamente.",
    "No sabemos dónde está realmente el límite. Muchas conductas que hoy consideramos naturales pueden ser consecuencia de instituciones deficientes y podrían transformarse profundamente.",
  ),
  pregunta(
    "Problemas o trade-offs",
    "No tienen solución.",
    "La mayoría de problemas políticos no tienen solución, sino compensaciones: más de A suele significar menos de B. La pregunta es qué coste estamos dispuestos a aceptar.",
    "Auténticas soluciones.",
    "Muchos aparentes trade-offs existen porque nuestras instituciones todavía son deficientes. Mediante innovación y reforma podemos encontrar auténticas soluciones que reduzcan o eliminen el problema.",
  ),
  pregunta(
    "Origen de los males sociales",
    "Nadie los diseñó.",
    "Que haya pobreza, desigualdad, crimen o discriminación no implica que alguien los haya diseñado. Los malos resultados pueden surgir espontáneamente de millones de decisiones.",
    "Una estructura los produce.",
    "Si un problema aparece de forma sistemática, debemos preguntarnos qué estructura social lo está produciendo o permitiendo. Cambiando esa estructura podemos corregir el resultado.",
  ),
  pregunta(
    "Intenciones o consecuencias",
    "Qué produce de verdad.",
    "Lo importante es qué produce realmente una política, no qué pretendía conseguir. Una medida compasiva puede acabar perjudicando precisamente a quien quería ayudar.",
    "Objetivos moralmente mejores.",
    "Las consecuencias importan, pero la sociedad debe fijar deliberadamente objetivos moralmente mejores y adaptar las políticas hasta conseguirlos. No actuar también tiene consecuencias.",
  ),
  pregunta(
    "Dónde está el conocimiento",
    "Nadie puede dirigirlo todo.",
    "Nadie posee suficiente conocimiento para dirigir una sociedad compleja. Está repartido entre millones de personas y muchas veces ni siquiera puede expresarse explícitamente.",
    "Comprenderlo en común.",
    "Podemos reunir conocimiento mediante ciencia, estadísticas, expertos e instituciones. Una sociedad puede comprender sus problemas colectivamente y actuar racionalmente sobre ellos.",
  ),
  pregunta(
    "Razón humana",
    "La razón individual es limitada.",
    "La razón individual es muy limitada. Nadie debería confiar demasiado en su capacidad para rediseñar instituciones complejas que contienen conocimientos acumulados durante siglos.",
    "Rediseñar el sistema.",
    "La razón es precisamente nuestra herramienta para detectar instituciones irracionales. Si podemos identificar un problema y entender sus causas, podemos rediseñar conscientemente el sistema.",
  ),
  pregunta(
    "Tradición",
    "No la destruyas sin entenderla.",
    "Una institución que lleva siglos funcionando probablemente contiene soluciones a problemas que ni siquiera vemos. No deberíamos destruirla solo porque no entendamos completamente su utilidad.",
    "La antigüedad no legitima nada.",
    "Una tradición puede sobrevivir siglos y seguir siendo absurda o injusta. La antigüedad no legitima nada: una institución debe poder defenderse racional y moralmente.",
  ),
  pregunta(
    "Orden espontáneo o planificación",
    "Nadie tiene que diseñarlo.",
    "Los mejores sistemas complejos suelen emerger de millones de decisiones descentralizadas. No necesitan que una mente los diseñe.",
    "Diseñar instituciones mejores.",
    "Que algo haya surgido espontáneamente no significa que sea óptimo. Podemos diseñar deliberadamente instituciones mejores utilizando conocimiento y planificación.",
  ),
  pregunta(
    "Reforma gradual o radical",
    "Cambia poco a poco.",
    "Cambia poco a poco. Una reforma gigantesca puede desencadenar consecuencias que nadie anticipó y destruir cosas que funcionaban.",
    "A veces hace falta una ruptura.",
    "Cuando sabemos que una estructura es profundamente injusta o ineficiente, cambiar lentamente significa prolongar el daño. A veces hace falta una ruptura profunda.",
  ),
  pregunta(
    "Coste de conseguir un objetivo",
    "Qué sacrificamos.",
    "Ningún objetivo debe evaluarse aisladamente. Hay que preguntar siempre: ¿qué sacrificamos para conseguirlo? ¿Qué incentivos y poderes estamos creando?",
    "Cuánto cuesta no actuar.",
    "Un objetivo importante puede justificar costes elevados. También hay que preguntarse cuánto cuesta no actuar y mantener una situación injusta.",
  ),
  pregunta(
    "Igualdad",
    "Las mismas reglas para todos.",
    "Justicia significa fundamentalmente las mismas reglas para todos. Si personas diferentes toman decisiones diferentes, resultados diferentes son perfectamente compatibles con la igualdad.",
    "Igualar oportunidades reales.",
    "Las mismas reglas pueden perpetuar desigualdades enormes cuando las personas parten de lugares muy distintos. La justicia debe preocuparse también por igualar oportunidades reales.",
  ),
  pregunta(
    "Desigualdad económica",
    "No demuestra injusticia.",
    "Que alguien tenga diez veces más que otro no demuestra ninguna injusticia. Lo importante es cómo consiguió cada uno lo que tiene.",
    "La desigualdad extrema es un problema.",
    "Grandes desigualdades pueden terminar condicionando educación, oportunidades y poder político. Por tanto, la desigualdad extrema puede convertirse en un problema en sí misma.",
  ),
  pregunta(
    "Poder político",
    "Nadie debería acumular demasiado.",
    "Como las personas son imperfectas, nadie debería acumular demasiado poder, aunque tenga buenas intenciones. El poder debe dividirse y limitarse.",
    "Poder para corregir y coordinar.",
    "Hay problemas colectivos que individuos aislados jamás podrán solucionar. Una sociedad democrática necesita poder suficiente para corregir desigualdades y coordinar grandes reformas.",
  ),
  pregunta(
    "Quién debe decidir",
    "Quien sufra el error.",
    "Debe decidir preferentemente quien sufra las consecuencias de equivocarse. Cuanto más lejos esté quien decide del coste de su decisión, peor será normalmente la decisión.",
    "Delegar en instituciones y especialistas.",
    "Muchas decisiones afectan a personas incapaces de decidir individualmente sobre ellas. En esos casos debemos delegar colectivamente en instituciones representativas y especialistas.",
  ),
  pregunta(
    "Expertos",
    "Saber una parte no es saberlo todo.",
    "Un experto sabe muchísimo sobre una pequeña parte de la realidad. Eso no le convierte en sabio sobre toda la sociedad ni le permite conocer millones de circunstancias particulares.",
    "Ignorar a los especialistas también falla.",
    "En cuestiones complejas, quienes han dedicado décadas a estudiarlas suelen estar mejor preparados. Ignorar sistemáticamente a especialistas por miedo a las élites también genera errores enormes.",
  ),
  pregunta(
    "Crimen",
    "Castigo y disuasión permanentes.",
    "Siempre habrá delincuentes. Puedes reducir el crimen, pero jamás eliminar el egoísmo, la agresividad o la búsqueda ilícita de beneficio. Por eso necesitas policía, castigo y disuasión permanentes.",
    "Atacar las causas del delito.",
    "Buena parte del crimen procede de circunstancias sociales modificables. Si reducimos marginalidad, mala educación, exclusión y otros factores, podemos atacar las causas del delito y no solamente castigarlo. Es decir, se puede llegar a eliminar la violencia y crimen del ser humano con la educación y medidas adecuadas.",
  ),
  pregunta(
    "Guerra y paz",
    "A veces dialogar no basta.",
    "Algunas guerras ocurren porque dos actores quieren cosas incompatibles. La paz no siempre se consigue dialogando; a veces depende de que atacar resulte demasiado caro.",
    "La diplomacia puede quitar causas.",
    "Muchas guerras surgen o empeoran por miedo, propaganda, nacionalismo y desconfianza. Diplomacia, cooperación e instituciones internacionales pueden eliminar muchas de esas causas.",
  ),
  pregunta(
    "Derechos individuales",
    "Que nadie te lo impida.",
    "Un derecho significa fundamentalmente que nadie puede impedirte hacer algo: hablar, asociarte, poseer, comerciar, etc. No implica que otro tenga que proporcionártelo.",
    "Hacen falta medios reales.",
    "Un derecho puede ser inútil sin medios reales para ejercerlo. Por eso determinados derechos requieren educación, sanidad, asistencia jurídica u otras condiciones materiales.",
  ),
  pregunta(
    "Justicia",
    "Reglas generales e imparciales.",
    "Justicia significa aplicar reglas generales e imparciales, aunque produzcan resultados que personalmente no nos gusten.",
    "Si el resultado es injusto, cambia la regla.",
    "Si una regla produce sistemáticamente resultados injustos, la propia regla debe cambiarse. El procedimiento no puede servir como excusa para ignorar el resultado.",
  ),
  pregunta(
    "Justicia social",
    "Sin culpable no hay injusticia.",
    "Es difícil llamar injusto a un resultado si nadie cometió una injusticia concreta para producirlo. No toda diferencia necesita un culpable ni una reparación.",
    "La sociedad responde de sus resultados.",
    "Una estructura puede producir injusticia aunque ningún individuo sea personalmente culpable. La sociedad tiene responsabilidad sobre los resultados previsibles de sus instituciones.",
  ),
  pregunta(
    "Libertad",
    "Libre si nadie te coacciona.",
    "Eres libre mientras otros no te coaccionen. No poder comprarte una casa de un millón de euros limita tus opciones, pero nadie está violando tu libertad.",
    "Libertad formal casi vacía.",
    "Una libertad exclusivamente formal puede ser casi vacía. Una persona sin educación, salud o recursos básicos puede ser jurídicamente libre pero tener poquísima capacidad real de elegir su vida.",
  ),
  pregunta(
    "Cómo juzgar una política",
    "¿Funcionó?",
    "Pregunta: «¿Funcionó?». Si las consecuencias empíricas contradicen la intención original, hay que abandonar o modificar la política.",
    "¿Comparado con qué?",
    "Pregunta también: «¿Comparado con qué?». Una reforma imperfecta puede seguir siendo mejor que dejar intacto un problema; los experimentos sociales pueden mejorarse progresivamente.",
  ),
  pregunta(
    "Valores absolutos o compensaciones",
    "Ningún valor se maximiza solo.",
    "Casi ningún valor puede maximizarse sin destruir otro. Más seguridad puede reducir libertad; más igualdad puede reducir incentivos. Política significa escoger entre bienes incompatibles.",
    "Hay valores que no se negocian.",
    "Hay valores —dignidad, igualdad ante determinadas injusticias, derechos fundamentales— que no deberían tratarse simplemente como una variable más de una ecuación coste-beneficio.",
  ),
  pregunta(
    "Intereses e ideología",
    "Visiones distintas del mundo.",
    "Las personas pueden defender sinceramente ideas que perjudican sus propios intereses porque parten de visiones diferentes de cómo funciona el mundo.",
    "La situación tiñe lo que parece justo.",
    "Las ideas no nacen en el vacío: nuestra clase, situación, cultura y poder pueden influir profundamente en qué consideramos justo, natural o razonable.",
  ),
];

const ejesExtra = [
  {
    nombreIzq: "Capitalista",
    nombreDer: "Comunista",
    colorIzq: "#c4a15a",
    colorDer: "#b55252",
    tintaIzq: "#8a6a28",
    tintaDer: "#8d3030",
    medio: "#eadfce",
    indices: [8, 11, 12, 13, 18, 21],
    frase: (cuenta) =>
      frase(
        cuenta,
        "En las preguntas de mercado, desigualdad y libertad formal te inclinas al lado capitalista: reglas comunes, resultados distintos y poder económico disperso.",
        "En las preguntas de mercado, desigualdad y libertad formal te inclinas al lado comunista: la desigualdad extrema y la falta de medios reales piden corregir el resultado, no solo el procedimiento.",
        "En mercado, desigualdad y libertad formal quedas entre el lado capitalista y el comunista.",
      ),
  },
  {
    nombreIzq: "Conservador",
    nombreDer: "Progresista",
    colorIzq: "#8d6b4a",
    colorDer: "#7a6bb5",
    tintaIzq: "#6b4e32",
    tintaDer: "#56468a",
    medio: "#e6ddd4",
    indices: [1, 6, 7, 9, 16, 17],
    frase: (cuenta) =>
      frase(
        cuenta,
        "En tradición, reforma, crimen y guerra te inclinas al lado conservador: límites humanos, cambio lento y disuasión antes que una ruptura.",
        "En tradición, reforma, crimen y guerra te inclinas al lado progresista: la antigüedad no basta, y educación, diplomacia o una ruptura pueden cambiar lo que parece natural.",
        "En tradición, reforma, crimen y guerra quedas entre el lado conservador y el progresista.",
      ),
  },
  {
    nombreIzq: "Liberal",
    nombreDer: "Estatista",
    colorIzq: "#3d9a96",
    colorDer: "#c47a3a",
    tintaIzq: "#246e6b",
    tintaDer: "#8d5318",
    medio: "#e4ebe4",
    indices: [5, 14, 15, 19, 22, 24],
    frase: (cuenta) =>
      frase(
        cuenta,
        "En conocimiento, decisión y poder te inclinas al lado liberal: desconfías de quien dirige desde lejos y prefieres que decida quien paga el error.",
        "En conocimiento, decisión y poder te inclinas al lado estatista: expertos, instituciones y un poder colectivo pueden corregir lo que las personas sueltas no arreglan.",
        "En conocimiento, decisión y poder quedas entre el lado liberal y el estatista.",
      ),
  },
  {
    nombreIzq: "Pragmático",
    nombreDer: "Idealista",
    colorIzq: "#6a8f71",
    colorDer: "#c46b8a",
    tintaIzq: "#3f6248",
    tintaDer: "#8d3d58",
    medio: "#e7e4df",
    indices: [2, 4, 10, 20, 23, 3],
    frase: (cuenta) =>
      frase(
        cuenta,
        "En costes, consecuencias y reglas te inclinas al lado pragmático: miras si funcionó y qué se sacrifica, aunque el resultado no sea el que te gusta.",
        "En costes, consecuencias y reglas te inclinas al lado idealista: hay objetivos y resultados injustos que no deberían quedarse en un cálculo de compensaciones.",
        "En costes, consecuencias y reglas quedas entre el lado pragmático y el idealista.",
      ),
  },
];

montarTest({ preguntas: PREGUNTAS, ejesExtra });
