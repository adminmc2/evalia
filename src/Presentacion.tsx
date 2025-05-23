import React, { useEffect, useState, useRef } from 'react';

// Paleta de colores proporcionada
const colors = {
  darkGreen: '#212517',
  mediumGreen: '#374709',
  lightGreen: '#759242',
  beige: '#DED3A6',
  offWhite: '#F2F2EF',
};

// =======================================================================
// DIAPOSITIVA 1: APERTURA (CÓDIGO ORIGINAL CON COPYRIGHT AÑADIDO)
// =======================================================================
const Diapositiva1 = () => {
  const [intensidad, setIntensidad] = useState(0);
  const [visible, setVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIntensidad(prev => {
        if (prev >= 1) {
          clearInterval(timer);
          return 1;
        }
        return prev + 0.05;
      });
    }, 100);

    setTimeout(() => setVisible(true), 500);
    setTimeout(() => setTitleVisible(true), 1500);
    setTimeout(() => setSubtitleVisible(true), 3000);

    return () => clearInterval(timer);
  }, []);

  const circulos = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    size: 10 + Math.random() * 25,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    opacity: 0.3 + Math.random() * 0.5,
    scale: 1 + Math.random() * 0.5
  }));

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-purple-900 to-black">
      {circulos.map(circulo => (
        <div
          key={circulo.id}
          className="absolute rounded-full animate-pulse cursor-pointer transition-all duration-500 hover:scale-150"
          style={{
            width: `${circulo.size}px`,
            height: `${circulo.size}px`,
            top: `${circulo.top}%`,
            left: `${circulo.left}%`,
            background: `radial-gradient(circle, rgba(255,215,0,${intensidad * circulo.opacity}) 0%, rgba(0,0,0,0) 70%)`,
            animationDelay: `${circulo.delay}s`,
            animationDuration: `${circulo.duration}s`,
            transform: `scale(${circulo.scale})`,
            opacity: intensidad,
            filter: 'blur(1px)',
            zIndex: 1
          }}
        />
      ))}

      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-8 transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        style={{ zIndex: 2 }}
      >
        <h1
          className={`text-9xl font-extrabold text-white text-center mb-12 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span>¿Conoces a </span>
          <span className="text-yellow-300 relative inline-block">
            L
            <span className="relative">
              I
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
            </span>
            A
          </span>
          <span>?</span>
        </h1>

        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p className="text-6xl text-yellow-300" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
            Espectáculo de Aprendizaje con Inteligencia Artificial
          </p>
        </div>
      </div>

      <div className={`absolute bottom-6 left-0 w-full text-center transition-all duration-1000 ${subtitleVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: 2 }}>
        <p className="text-white text-opacity-70 text-sm italic mb-4 px-4">
          "Es todo lo que siempre has querido, todo lo que siempre has necesitado, y está aquí frente a ti. Este es el lugar donde quieres estar."
        </p>
        <div className="text-white text-opacity-80 text-sm inline-block px-6 py-2 rounded-full bg-black bg-opacity-30">
          Madrid, 7 de mayo de 2025
        </div>
      </div>
      
      {/* AÑADIDO: Aviso de derechos de autor */}
      <div className="absolute bottom-2 right-2 text-white text-opacity-70 text-xs" style={{ zIndex: 3 }}>
        © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 
        <br />
        Investigación propietaria - Prohibido cualquier uso no autorizado
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 1
// =======================================================================

// =======================================================================
// DIAPOSITIVA 2: MERCADO (CON FECHA ELEVADA Y PROTECCIÓN DE DERECHOS)
// =======================================================================
const Diapositiva2 = () => {
  const [activeTab, setActiveTab] = useState(0);
  // Variable isVisible eliminada ya que no se usa

  // Definir colors si no está disponible en el ámbito global
  const colors = {
    mediumGreen: '#374709'
  };

  const segmentos = [
    // ... (Segmento 'preescolar' - sin cambios)
    {
      id: 'preescolar',
      titulo: 'Edad temprana y preescolar',
      descripcion: 'Estudiantes de 3-6 años',
      datos: {
        global: {
          estudiantes: '2.570.000',
          porcentajeTotal: '10,1%',
          valor: '37.537.738 euros',
          porcentajeValor: '0,33%'
        },
        categorias: [
          {
            titulo: 'Lengua extranjera',
            proporcion: '35%',
            crecimiento: '+40%',
            volumen: '350.000 estudiantes',
            valor: '~5,1M euros',
            tendencia: 'Expansión digital y educativa',
            info: 'Principalmente en Europa (Francia, Alemania, Italia, Reino Unido, Polonia), Asia (China, Corea del Sur, Japón), y algo en África. Crecimiento impulsado por academias privadas, escuelas internacionales y plataformas digitales.'
          },
          {
            titulo: 'Segunda lengua',
            proporcion: '8,6%',
            crecimiento: '+30%',
            volumen: '220.000 estudiantes',
            valor: '~3,2M euros',
            tendencia: 'Programas escolares en zonas migrantes',
            info: 'Presente en regiones bilingües o con alta migración (EE. UU., Marruecos, Filipinas). Incluye programas escolares y comunitarios donde el español es lengua vehicular secundaria.'
          },
          {
            titulo: 'Lengua de herencia',
            proporcion: '77,8%',
            crecimiento: '+35%',
            volumen: '2.000.000 estudiantes',
            valor: '~29,2M euros',
            tendencia: 'Apoyo familiar, escuelas comunitarias',
            info: 'Predominantemente en EE. UU. (niños latinos), pero también en Canadá, Suiza, Alemania, Francia y Australia. Incluye escuelas comunitarias, clases sabatinas, programas públicos y privados.'
          }
        ]
      }
    },
    // ... (Segmento 'escolares' - sin cambios)
    {
      id: 'escolares',
      titulo: 'Niños (edad escolar)',
      descripcion: 'Estudiantes de 7-12 años',
      datos: {
        global: {
          estudiantes: '6.300.000',
          porcentajeTotal: '24,8%',
          valor: '393.812.000 euros',
          porcentajeValor: '3,44%'
        },
        categorias: [
          {
            titulo: 'Lengua extranjera',
            proporcion: '52,4%',
            crecimiento: '+60%',
            volumen: '3.300.000 estudiantes',
            valor: '~206,3M euros',
            info: "Perfil: Niños en sistemas educativos de países no hispanohablantes. Ejemplos en Europa: Inglaterra: 210.000 est. (31% primarias), Alemania: 85.000 est. (7% primarias), Polonia: 12.000 est. (4% privadas), Escocia: 45.000 est. (18% primarias). Fuera de Europa: China: 200.000 niños (academias, +15% anual), Corea del Sur: +25% anual demanda. Valor por estudiante (mat./plat.): ~62,5 €/año. Inversión UE: 50M €/año (bilingües). Contexto: 1,5M est. (45% ELE global). A pesar de revocación obligatoriedad (2017), español popular. 2018: 5,1M est. básica (descenso est. 30% post-2017). Valor por estudiante (contexto): ~50 €/año."
          },
          {
            titulo: 'Segunda lengua',
            proporcion: '25%',
            crecimiento: '+30%',
            volumen: '1.200.000 estudiantes',
            valor: '~75,1M euros',
            info: "Perfil: Sistemas bilingües o con alta migración hispana. Ejemplos: EE. UU.: 1,8M (programas duales), Marruecos: 300.000 est. (públicas), Filipinas: 150.000 est. (optativa). Valor por estudiante: ~62 €/año (subvenciones). Retos: Falta de docentes cualificados (41% escuelas)."
          },
          {
            titulo: 'Lengua de herencia',
            proporcion: '37,5%',
            crecimiento: '+35%',
            volumen: '1.800.000 estudiantes',
            valor: '~112,6M euros',
            info: "Perfil: Niños en familias hispanas en diáspora. Ejemplos: EE. UU.: 1,2M (comunitarios), Europa: 300.000 (Alemania, Francia, Suiza), Canadá: 50.000 (sabatinas). Valor por estudiante: ~33 €/año (extraescolares). Retos: 60% pierden competencia al llegar a secundaria."
          }
        ]
      }
    },
    // ... (Segmento 'adolescentes' - sin cambios)
    {
      id: 'adolescentes',
      titulo: 'Adolescentes y juveniles',
      descripcion: 'Estudiantes de 13-17 años',
      datos: {
        global: {
          estudiantes: '7.200.000',
          porcentajeTotal: '28,3%',
          valor: '450.452.855 euros',
          porcentajeValor: '3,94%'
        },
        categorias: [
          {
            titulo: 'Español como Lengua Extranjera (ELE)',
            proporcion: '65%',
            crecimiento: '+48% (2014-2024)',
            volumen: '4.680.000 estudiantes',
            valor: '~292,8M euros',
            info: "Distribución: Europa (Francia: 55,8% sec., Polonia: +7,5 pp década, UK: 210k sec., +25% década), América (EEUU: 3M sec., Brasil: 600k sec.), Asia (China: 200k academias, +15% anual).\nProgramas Int.: IB (250k est.), AP (177.819 exámenes 2024, 82,9% aprob.).\nItalia: ~85k candidatos DELE (2024, 2ª pos. global), 117 centros DELE (3º país), 4 Inst. Cervantes. Crecimiento histórico en sec. de 24k (1984) a >800k (2020). DELE Escolar (30% candidatos Italia 2023) reconocido por Min. Educación desde 2012."
          },
          {
            titulo: 'Español como Segunda Lengua (L2)',
            proporcion: '35%',
            crecimiento: '+30% (2014-2024)',
            volumen: '2.520.000 estudiantes',
            valor: '~157,7M euros',
            info: "Distribución: América (EEUU: 2M bilingües, México/Guatemala: mantenimiento indígena), Europa (Alemania: 85k sec., Suecia/Finlandia: 3ª lengua), África (Marruecos: 100k sec.). Programas Int.: IB (40% colegios Eur.), AP (populares EEUU/Canadá)."
          }
        ],
        tendenciasGlobales: {
          titulo: "Tendencias Globales (Adolescentes)",
          certificaciones: "Certificaciones: DELE Escolar crece 20% anual Europa (85k examinados 2024). SIELE se consolida Asia/África (50k candidatos anuales).",
          inmersion: "Inmersión en España: 153.285 adolescentes extranjeros en 2024 (+40% desde 2022).",
          tecnologia: "Tecnología: Duolingo: 60% usuarios adolescentes aprenden español (líder EEUU/Brasil)."
        },
        tablaComparativa: [
          { categoria: 'Lengua Extranjera (ELE)', proporcion: '65%', volumen: '4.680.000', valor: '~292,8M' },
          { categoria: 'Segunda Lengua (L2)', proporcion: '35%', volumen: '2.520.000', valor: '~157,7M' },
        ]
      }
    },
    // ... (Segmento 'jovenes' - sin cambios)
    {
      id: 'jovenes',
      titulo: 'Jóvenes y adultos',
      descripcion: 'Por generación',
      datos: {
        global: {
          estudiantes: '9.600.000',
          porcentajeTotal: '37,8%',
          valor: '10.010.060.540 euros',
          porcentajeValor: '87,51%'
        },
        categoriasPrincipales: [
          {
            titulo: 'Plataformas online (Preply, Italki, etc.)',
            proporcion: '35%',
            crecimiento: '+45% (2021-2024)',
            volumen: '3.360.000 estudiantes',
            valor: '~3.360M euros',
            info: "Perfil: Adultos jóvenes (19-35 años), priorizan flexibilidad y precios competitivos.\nPreply: 10.940 tutores (30% L2).\nItalki: 7.286 profesores (40% estudiantes EEUU/UE)."
          },
          {
            titulo: 'Instituto Cervantes',
            proporcion: '15%',
            crecimiento: '+12% (2021-2024)',
            volumen: '1.440.000 estudiantes',
            valor: '~2.160M euros',
            info: "Perfil: Profesionales (30-50 años) buscan certificación DELE/SIELE.\nEspaña: 530.000 est. presenciales.\nEE. UU./UE: 420.000 est. híbridos."
          },
          {
            titulo: 'Academias de Idiomas (Berlitz, EF, etc.)',
            proporcion: '30%',
            crecimiento: '+8% (2021-2024)',
            volumen: '2.880.000 estudiantes',
            valor: '~4.320M euros',
            info: "Perfil: Ejecutivos (35-55 años) con cursos corporativos.\nEF Int.: 200.000 est. presenciales (México/Colombia)."
          },
          {
            titulo: 'Autodidactas (Duolingo, Apps)',
            proporcion: '20%',
            crecimiento: '+25% (2021-2024)',
            volumen: '1.920.000 estudiantes',
            valor: '~360M euros',
            info: "Perfil: Millennials (25-40 años) combinan apps y recursos gratuitos.\nDuolingo: 37,4M usuarios activos diarios (45% adultos)."
          }
        ],
        distribucionGeneraciones: [
          { generacion: 'Gen Z', rangoEdad: '19-26 años', proporcion: '25%', volumen: '2.400.000', preferencia: 'Apps (Duolingo) + Plataformas online' },
          { generacion: 'Millennials', rangoEdad: '27-42 años', proporcion: '40%', volumen: '3.840.000', preferencia: 'Plataformas online + Academias' },
          { generacion: 'Gen X', rangoEdad: '43-58 años', proporcion: '25%', volumen: '2.400.000', preferencia: 'Instituto Cervantes + Academias' },
          { generacion: 'Baby Boomers', rangoEdad: '59-64 años', proporcion: '10%', volumen: '960.000', preferencia: 'Clases presenciales + Autodidactas' },
        ],
        detallesRegion: [
          { region: 'América', info: "EE. UU.: 4,1M est. (43% total), gasto promedio 1.200 €/año.\nBrasil: 1,2M, principalmente academias (CNA, Wizard)." },
          { region: 'Europa', info: "Alemania: 580.000 est. (35% online).\nFrancia: 420.000 est., alta demanda DELE." },
          { region: 'Asia', info: "China: 360.000 est. (+50% desde 2021) academias (Mandarin House).\nJapón: 180.000 est., crecimiento 20% anual apps." },
        ],
      }
    },
    // ... (Segmento 'especificos' - MODIFICADO)
    {
      id: 'especificos',
      titulo: 'Español con fines específicos (transversal)',
      descripcion: 'Análisis por propósito (incluido en otros segmentos)',
      datos: {
        global: {
          estudiantes: '3.6M',
          porcentajeTotal: '15%',
          valor: '1.500M euros',
          porcentajeValor: '2,6%'
        },
        distribucionActualizada: [
          { indicador: 'Español con Fines Específicos (EFE)', estudiantes: '3,6M', porcSegmentoAdultoEst: '37,5%', valor: '1.500M €', porcSegmentoAdultoVal: '15%' },
          { indicador: 'Español Profesional (General)', estudiantes: '6,0M', porcSegmentoAdultoEst: '62,5%', valor: '8.510M €', porcSegmentoAdultoVal: '85%' },
        ],
        generacionesEFE: [
          { generacion: 'Gen Z', rangoEdad: '19-26 años', proporcionEFE: '30%', profesiones: 'Turismo, Tecnología, Marketing Digital' },
          { generacion: 'Millennials', rangoEdad: '27-42 años', proporcionEFE: '50%', profesiones: 'Negocios, Salud, Derecho, Educación' },
          { generacion: 'Gen X', rangoEdad: '43-58 años', proporcionEFE: '15%', profesiones: 'Sector Corporativo, Consultoría' },
          { generacion: 'Baby Boomers', rangoEdad: '59-64 años', proporcionEFE: '5%', profesiones: 'Traducción, Cultura (roles puntuales)' },
        ],
        profesionesDemandadas: [
          { nombre: 'Negocios Internacionales', estudiantes: '1,2 millones', info: 'Cursos para reuniones, contratos, finanzas. Países clave: EE. UU., Alemania, China.', valor: '600M €' },
          { nombre: 'Salud', estudiantes: '900.000', info: 'Comunicación con pacientes hispanohablantes. Países clave: EE. UU., España, Brasil.', valor: '450M €' },
          { nombre: 'Turismo', estudiantes: '600.000', info: 'Atención al cliente (hoteles, aerolíneas, agencias). Países clave: España, México, Colombia.', valor: '240M €' },
        ]
      }
    },
    // ... (Segmento 'tercera' - sin cambios)
    {
      id: 'tercera',
      titulo: 'Tercera edad',
      descripcion: 'Estudiantes +65 años',
      datos: {
        global: {
          estudiantes: '240.000',
          porcentajeTotal: '0,94%',
          valor: '15.015.095 euros',
          porcentajeValor: '0,13%'
        },
        distribucionPaisModalidad: [
          {
            pais: 'España',
            proporcion: '30%',
            crecimiento: '+12% anual (desde 2020)',
            volumen: '72.000 estudiantes',
            valor: '~4,5M euros',
            modalidad: 'Curso centros acreditados Cervantes.',
            ejemplo: 'Programas inmersión cultural Málaga/Salamanca (UniSpain).'
          },
          {
            pais: 'Estados Unidos',
            proporcion: '25%',
            crecimiento: '+8% anual',
            volumen: '60.000 estudiantes',
            valor: '~3,0M euros',
            modalidad: 'Cursos comunitarios en centros para adultos (ej. Oasis Centers NY).',
            ejemplo: 'Programas bilingües para hispanohablantes (refuerzo L2).'
          },
          {
            pais: 'Alemania',
            proporcion: '15%',
            crecimiento: '+10% anual',
            volumen: '36.000 estudiantes',
            valor: '~1,8M euros',
            modalidad: 'Cursos en Volkshochschulen y plataformas online (Babbel).',
            ejemplo: 'Clases grupales (Berlín, Múnich) con enfoque en conversación.'
          },
          {
            pais: 'México',
            proporcion: '10%',
            crecimiento: '+5% anual',
            volumen: '24.000 estudiantes',
            valor: '~1,2M euros',
            modalidad: 'Programas informales (centros culturales, intercambios).',
            ejemplo: 'Talleres para expatriados angloparlantes (CDMX).'
          },
          {
            pais: 'Otros (UK, Francia, Italia)',
            proporcion: '20%',
            crecimiento: '+7% anual',
            volumen: '48.000 estudiantes',
            valor: '~4,5M euros',
            modalidad: 'Cursos online (Preply, Duolingo) y programas universitarios para seniors.'
          }
        ],
        modalidadesPreferidas: [
          { nombre: 'Presencial', proporcion: '40%', info: 'Institutos Cervantes, universidades (ej. UGR), escuelas privadas (Sampere). Coste: 600-1.200 €/año.' },
          { nombre: 'Online', proporcion: '35%', info: 'Plataformas (Preply, Duolingo). Coste: 300-500 €/año.' },
          { nombre: 'Comunitario', proporcion: '25%', info: 'Clubs conversación, talleres bibliotecas, programas interculturales. Coste: 100-200 €/año.' }
        ],
      }
    },
    // --- MODIFICACIÓN EN EL SEGMENTO 'TURISMO LINGÜÍSTICO' ---
    {
      id: 'turismo',
      titulo: 'Turismo lingüístico',
      descripcion: 'Viajes de inmersión',
      datos: {
        global: {
          estudiantes: '1.000.000',
          porcentajeTotal: '3,94%',
          valor: '625.628.965 euros',
          porcentajeValor: '5,47%'
        },
        distribucionPais: [ // Los datos de los países y ciudades se mantienen
          {
            pais: 'España',
            proporcion: '53% del total',
            crecimiento: '+15% anual',
            volumen: '530.000 estudiantes',
            valor: '~331,6M euros',
            ciudades: [
              { nombre: 'Barcelona', estudiantes: '212.000', edadMedia: '22-35 años', duracionPromedio: '3,5 semanas', gastoMedio: '1.800 € (curso, alojamiento, actividades)' },
              { nombre: 'Madrid', estudiantes: '159.000', edadMedia: '25-40 años', duracionPromedio: '4 semanas', gastoMedio: '2.000 € (intensivos + cultura)' },
              { nombre: 'Salamanca', estudiantes: '106.000', edadMedia: '18-30 años (50% univ.)', duracionPromedio: '8 semanas', gastoMedio: '1.200 €/mes (largos + familia)' },
            ]
          },
          {
            pais: 'Colombia',
            proporcion: '20% del total',
            crecimiento: '+20% anual',
            volumen: '200.000 estudiantes',
            valor: '~125,1M euros',
            ciudades: [
              { nombre: 'Cartagena', estudiantes: '100.000', edadMedia: '28-45 años', duracionPromedio: '2 semanas', gastoMedio: '1.000 € (cursos + playa + excursiones)' },
              { nombre: 'Medellín', estudiantes: '80.000', edadMedia: '30-50 años', duracionPromedio: '3 semanas', gastoMedio: '1.500 € (inmersión cultural)' },
            ]
          },
          {
            pais: 'México',
            proporcion: '15% del total',
            crecimiento: '+18% anual',
            volumen: '150.000 estudiantes',
            valor: '~93,8M euros',
            ciudades: [
              { nombre: 'Ciudad de México', estudiantes: '75.000', edadMedia: '25-40 años', duracionPromedio: '4 semanas', gastoMedio: '1.200 € (cursos + tours)' },
              { nombre: 'Guanajuato', estudiantes: '45.000', edadMedia: '18-30 años', duracionPromedio: '6 semanas', gastoMedio: '900 €/mes (económicos + familias)' },
            ]
          }
        ],
        retosTurismo: [
          "Estacionalidad: 60% estudiantes en verano (saturación Barcelona, Cartagena).",
          "Costes: Precios en España 40% más altos que Latinoamérica (limita acceso).",
        ],
        tendenciasClaveTurismo: [
          "Edad principal: 19-35 años (70% del total).",
          "Duración media: 3,2 semanas (España: 4 sem; Col/Méx: 2-3 sem).",
          "Gasto medio global: 1.450 €/est. (España: 1.800 €; Col: 1.250 €; Méx: 1.050 €).",
        ]
      }
    }
    // --- FIN MODIFICACIÓN EN EL SEGMENTO 'TURISMO LINGÜÍSTICO' ---
  ];

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-y-auto" style={{ backgroundColor: '#e3dae5' }}>
      <div className="flex-grow p-4 pb-0">
        <h2 className="text-4xl font-bold mb-4 text-center" style={{ color: '#34113b' }}>
          Un millón de posibilidades
        </h2>

        <div className="w-full flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-12 mb-6">
          <div className="flex items-center">
            <div className="text-4xl font-bold" style={{ color: '#34113b' }}>26.91M</div>
            <div className="ml-2 text-base text-center sm:text-left" style={{ color: '#34113b' }}>
              estudiantes de español<br />en el mundo
            </div>
          </div>
          <div className="h-12 border-l hidden sm:block" style={{ borderColor: '#34113b' }}></div>
          <hr className="w-1/2 sm:hidden border-gray-400 my-2" />
          <div className="flex items-center">
            <div className="text-4xl font-bold" style={{ color: '#34113b' }}>11.533M</div>
            <div className="ml-2 text-base text-center sm:text-left" style={{ color: '#34113b' }}>
              valor del mercado<br />ELE global (euros)
            </div>
          </div>
        </div>

        {/* AÑADIDO: Nota aclaratoria sobre el solapamiento de segmentos */}
        <div className="w-11/12 mx-auto bg-purple-100 rounded-lg p-2 text-center mb-3 text-xs" style={{ color: '#34113b' }}>
          <span className="font-semibold">Nota:</span> El segmento "Español con fines específicos" representa un análisis transversal que ya está parcialmente incluido en otros segmentos.
        </div>

        <div className="w-full flex flex-wrap justify-center items-center gap-2 mb-4 px-2">
          {segmentos.map((segmento, index) => (
            <button
              key={segmento.id}
              className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 whitespace-nowrap my-1`}
              style={{
                backgroundColor: activeTab === index ? '#34113b' : 'white',
                color: activeTab === index ? 'white' : '#34113b',
                transform: activeTab === index ? 'scale(1.05)' : 'scale(1)',
                boxShadow: activeTab === index ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
              }}
              onClick={() => setActiveTab(index)}
            >
              {segmento.titulo}
            </button>
          ))}
        </div>

        <div className="w-11/12 mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-2">
          {segmentos.map((segmento, index) => (
            <div
              key={segmento.id}
              className={`transition-all duration-500 ${
                activeTab === index
                  ? 'opacity-100 block'
                  : 'opacity-0 hidden'
              }`}
            >
              <div className="bg-purple-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-center">
                <p className="text-sm sm:text-lg" style={{ color: '#34113b' }}>
                  <strong>Estudiantes:</strong> {segmento.datos.global?.estudiantes || (segmento.datos as any).metrica || 'N/A'} |{' '}
                  <strong>% Total:</strong> {segmento.datos.global?.porcentajeTotal || (segmento.datos as any).porcentaje || 'N/A'} |{' '}
                  <strong>Valor:</strong> {segmento.datos.global?.valor || 'N/A'} |{' '}
                  <strong>% Valor:</strong> {segmento.datos.global?.porcentajeValor || 'N/A'}
                </p>
              </div>

              {/* Renderizado para segmentos con 'categorias' (Preescolar, Escolar, Adolescentes) */}
              {segmento.datos.categorias && (
                <div className={`grid grid-cols-1 md:grid-cols-2 ${segmento.id === 'adolescentes' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-4`}>
                  {segmento.datos.categorias.map((categoria, idx) => (
                    <div key={idx} className="bg-purple-50 bg-opacity-50 rounded-xl shadow p-3 flex flex-col">
                      <h4 className="text-md sm:text-lg font-bold mb-1" style={{ color: '#34113b' }}>{categoria.titulo}</h4>
                      <div className="space-y-0.5 text-xs sm:text-sm flex-grow">
                        <p style={{ color: '#34113b' }}><strong>Proporción:</strong> {categoria.proporcion}</p>
                        <p style={{ color: '#34113b' }}><strong>Crecimiento:</strong> <span className="text-green-700 font-semibold">{categoria.crecimiento}</span></p>
                        <p style={{ color: '#34113b' }}><strong>Volumen:</strong> {categoria.volumen}</p>
                        <p style={{ color: '#34113b' }}><strong>Valor:</strong> {categoria.valor}</p>
                        {categoria.info && <p className="text-xxs sm:text-xs mt-1" style={{ color: colors.mediumGreen, whiteSpace: 'pre-line' }}>{categoria.info}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Renderizado específico para Adolescentes (Tendencias y Tabla) */}
              {segmento.id === 'adolescentes' && (
                <>
                  {segmento.datos.tendenciasGlobales && (
                    <div className="mt-6 p-4 rounded-lg shadow-sm" style={{ backgroundColor: '#e3dae5' }}> 
                      <h3 className="text-lg md:text-2xl font-semibold mb-3" style={{ color: '#34113b' }}>{segmento.datos.tendenciasGlobales.titulo}</h3>
                      <div className="space-y-2 text-sm" style={{ color: '#374709' }}>
                        <p><strong>Certificaciones:</strong> {segmento.datos.tendenciasGlobales.certificaciones}</p>
                        <p><strong>Inmersión:</strong> {segmento.datos.tendenciasGlobales.inmersion}</p>
                        <p><strong>Tecnología:</strong> {segmento.datos.tendenciasGlobales.tecnologia}</p>
                      </div>
                    </div>
                  )}
                  {segmento.datos.tablaComparativa && (
                    <div className="mt-6 overflow-x-auto">
                       <h3 className="text-lg font-semibold mb-3" style={{ color: '#34113b' }}>Resumen Comparativo (Adolescentes)</h3>
                      <table className="min-w-full text-sm text-left border-collapse shadow rounded-lg overflow-hidden">
                        <thead className="bg-purple-100"><tr><th className="p-2 border border-purple-200" style={{ color: '#34113b' }}>Categoría</th><th className="p-2 border border-purple-200" style={{ color: '#34113b' }}>Proporción</th><th className="p-2 border border-purple-200" style={{ color: '#34113b' }}>Volumen</th><th className="p-2 border border-purple-200" style={{ color: '#34113b' }}>Valor (€)</th></tr></thead>
                        <tbody className="bg-white">{segmento.datos.tablaComparativa.map((fila, fIdx) => (<tr key={fIdx} className="border-b border-purple-200 last:border-b-0"><td className="p-2 border border-purple-200" style={{ color: '#34113b' }}>{fila.categoria}</td><td className="p-2 border border-purple-200" style={{ color: '#34113b' }}>{fila.proporcion}</td><td className="p-2 border border-purple-200" style={{ color: '#34113b' }}>{fila.volumen}</td><td className="p-2 border border-purple-200" style={{ color: '#34113b' }}>{fila.valor}</td></tr>))}</tbody>
                      </table>
                    </div>
                  )}
                </>
              )}

              {/* Renderizado específico para Jóvenes y Adultos */}
              {segmento.id === 'jovenes' && (
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-4">
                  <div className="lg:col-span-2 space-y-4">
                    {segmento.datos.categoriasPrincipales && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {segmento.datos.categoriasPrincipales.map((categoria, idx) => (
                          <div key={idx} className="bg-purple-50 bg-opacity-50 rounded-xl shadow p-3 flex flex-col h-full">
                            <h4 className="text-md font-bold mb-1" style={{ color: '#34113b' }}>{categoria.titulo}</h4>
                            <div className="space-y-0.5 text-xs flex-grow">
                              <p style={{ color: '#34113b' }}><strong>Prop.:</strong> {categoria.proporcion}</p>
                              <p style={{ color: '#34113b' }}><strong>Crec.:</strong> <span className="text-green-700 font-semibold">{categoria.crecimiento}</span></p>
                              <p style={{ color: '#34113b' }}><strong>Vol.:</strong> {categoria.volumen}</p>
                              <p style={{ color: '#34113b' }}><strong>Valor:</strong> {categoria.valor}</p>
                              {categoria.info && <p className="text-xxs mt-1" style={{ color: colors.mediumGreen, whiteSpace: 'pre-line' }}>{categoria.info}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {segmento.datos.distribucionGeneraciones && (
                      <div className="mt-4">
                        <h3 className="text-md font-semibold mb-2" style={{ color: '#34113b' }}>Distribución por Generaciones</h3>
                        <div className="overflow-x-auto shadow rounded-lg">
                          <table className="min-w-full text-xs text-left">
                            <thead className="bg-purple-100"><tr><th className="p-1.5" style={{ color: '#34113b' }}>Generación</th><th className="p-1.5" style={{ color: '#34113b' }}>Rango Edad</th><th className="p-1.5" style={{ color: '#34113b' }}>Prop.</th><th className="p-1.5" style={{ color: '#34113b' }}>Volumen</th><th className="p-1.5" style={{ color: '#34113b' }}>Preferencia</th></tr></thead>
                            <tbody className="bg-white">{segmento.datos.distribucionGeneraciones.map((gen, gIdx) => (<tr key={gIdx} className="border-b border-purple-200 last:border-b-0"><td className="p-1.5" style={{ color: '#34113b' }}>{gen.generacion}</td><td className="p-1.5" style={{ color: '#34113b' }}>{gen.rangoEdad}</td><td className="p-1.5" style={{ color: '#34113b' }}>{gen.proporcion}</td><td className="p-1.5" style={{ color: '#34113b' }}>{gen.volumen}</td><td className="p-1.5" style={{ color: '#34113b' }}>{gen.preferencia}</td></tr>))}</tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {segmento.datos.detallesRegion && (
                      <div>
                        <h3 className="text-md font-semibold mb-2" style={{ color: '#34113b' }}>Detalles por Región</h3>
                        <div className="space-y-2">
                          {segmento.datos.detallesRegion.map((region, rIdx) => (
                            <div key={rIdx} className="p-2 bg-purple-50 rounded-lg shadow-sm">
                              <h4 className="font-semibold text-sm mb-0.5" style={{ color: '#34113b' }}>{region.region}</h4>
                              <p className="text-xxs sm:text-xs whitespace-pre-line" style={{ color: colors.mediumGreen }}>{region.info}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Renderizado específico para Español con Fines Específicos */}
              {segmento.id === 'especificos' && (
                <div className="mt-4 space-y-6">
                  {segmento.datos.distribucionActualizada && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3" style={{ color: '#34113b' }}>Distribución Actualizada</h3>
                      <div className="overflow-x-auto shadow rounded-lg">
                        <table className="min-w-full text-sm text-left">
                          <thead className="bg-purple-100"><tr><th className="p-2" style={{ color: '#34113b' }}>Indicador</th><th className="p-2" style={{ color: '#34113b' }}>Estudiantes</th><th className="p-2" style={{ color: '#34113b' }}>% Seg. Adulto (Est.)</th><th className="p-2" style={{ color: '#34113b' }}>Valor</th><th className="p-2" style={{ color: '#34113b' }}>% Seg. Adulto (Val.)</th></tr></thead>
                          <tbody className="bg-white">{segmento.datos.distribucionActualizada.map((item, iIdx) => (<tr key={iIdx} className="border-b border-purple-200 last:border-b-0"><td className="p-2" style={{ color: '#34113b' }}>{item.indicador}</td><td className="p-2" style={{ color: '#34113b' }}>{item.estudiantes}</td><td className="p-2" style={{ color: '#34113b' }}>{item.porcSegmentoAdultoEst}</td><td className="p-2" style={{ color: '#34113b' }}>{item.valor}</td><td className="p-2" style={{ color: '#34113b' }}>{item.porcSegmentoAdultoVal}</td></tr>))}</tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {segmento.datos.generacionesEFE && (
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold mb-3" style={{ color: '#34113b' }}>Generaciones y Enfoque Profesional (EFE)</h3>
                      <div className="overflow-x-auto shadow rounded-lg">
                        <table className="min-w-full text-sm text-left">
                          <thead className="bg-purple-100"><tr><th className="p-2" style={{ color: '#34113b' }}>Generación</th><th className="p-2" style={{ color: '#34113b' }}>Rango Edad</th><th className="p-2" style={{ color: '#34113b' }}>Proporción en EFE</th><th className="p-2" style={{ color: '#34113b' }}>Profesiones Principales</th></tr></thead>
                          <tbody className="bg-white">{segmento.datos.generacionesEFE.map((gen, gIdx) => (<tr key={gIdx} className="border-b border-purple-200 last:border-b-0"><td className="p-2" style={{ color: '#34113b' }}>{gen.generacion}</td><td className="p-2" style={{ color: '#34113b' }}>{gen.rangoEdad}</td><td className="p-2" style={{ color: '#34113b' }}>{gen.proporcionEFE}</td><td className="p-2" style={{ color: '#34113b' }}>{gen.profesiones}</td></tr>))}</tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {segmento.datos.profesionesDemandadas && (
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold mb-3" style={{ color: '#34113b' }}>Profesiones Más Demandadas en EFE</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {segmento.datos.profesionesDemandadas.map((prof, pIdx) => (
                          <div key={pIdx} className="bg-purple-50 bg-opacity-50 rounded-xl shadow p-3">
                            <h4 className="text-md font-bold mb-1" style={{ color: '#34113b' }}>{prof.nombre}</h4>
                            <p className="text-xs" style={{ color: '#34113b' }}><strong>Estudiantes:</strong> {prof.estudiantes}</p>
                            <p className="text-xs" style={{ color: '#34113b' }}><strong>Valor:</strong> {prof.valor}</p>
                            <p className="text-xxs mt-1 whitespace-pre-line" style={{ color: colors.mediumGreen }}>{prof.info}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Renderizado específico para Tercera Edad */}
              {segmento.id === 'tercera' && (
                <div className="mt-4 space-y-6">
                  {segmento.datos.distribucionPaisModalidad && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3" style={{ color: '#34113b' }}>Distribución por País y Modalidad</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {segmento.datos.distribucionPaisModalidad.map((pais, pIdx) => (
                          <div key={pIdx} className="bg-purple-50 bg-opacity-50 rounded-xl shadow p-3">
                            <h4 className="text-md font-bold mb-1" style={{ color: '#34113b' }}>{pais.pais}</h4>
                            <p className="text-xs" style={{ color: '#34113b' }}><strong>Proporción:</strong> {pais.proporcion}</p>
                            <p className="text-xs" style={{ color: '#34113b' }}><strong>Crecimiento:</strong> <span className="text-green-700 font-semibold">{pais.crecimiento}</span></p>
                            <p className="text-xs" style={{ color: '#34113b' }}><strong>Volumen:</strong> {pais.volumen}</p>
                            <p className="text-xs" style={{ color: '#34113b' }}><strong>Valor:</strong> {pais.valor}</p>
                            <p className="text-xxs mt-1" style={{ color: colors.mediumGreen }}><strong>Modalidad:</strong> {pais.modalidad}</p>
                            {pais.ejemplo && <p className="text-xxs mt-0.5" style={{ color: colors.mediumGreen }}><strong>Ejemplo:</strong> {pais.ejemplo}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {segmento.datos.modalidadesPreferidas && (
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold mb-3" style={{ color: '#34113b' }}>Modalidades de Aprendizaje Preferidas</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {segmento.datos.modalidadesPreferidas.map((mod, mIdx) => (
                          <div key={mIdx} className="bg-purple-50 bg-opacity-50 rounded-xl shadow p-3">
                            <h4 className="text-md font-bold mb-1" style={{ color: '#34113b' }}>{mod.nombre} ({mod.proporcion})</h4>
                            <p className="text-xs whitespace-pre-line" style={{ color: colors.mediumGreen }}>{mod.info}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Renderizado específico para Turismo Lingüístico */}
              {segmento.id === 'turismo' && (
                <div className="mt-4 space-y-6">
                  {/* Distribución por País y Ciudades (en columnas) */}
                  {segmento.datos.distribucionPais && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4" style={{ color: '#34113b' }}>Distribución por País y Ciudades Principales</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4"> {/* Usamos gap-x para espacio entre columnas */}
                        {segmento.datos.distribucionPais.map((pais, pIdx) => (
                          <div key={pIdx} className="p-3 bg-purple-50 rounded-lg shadow flex flex-col"> {/* flex flex-col para que el contenido se expanda */}
                            <h4 className="text-lg font-bold mb-1" style={{ color: '#34113b' }}>{pais.pais}</h4>
                            <p className="text-sm mb-1" style={{ color: colors.mediumGreen }}>
                              Prop: {pais.proporcion} | Crec: <span className="text-green-700 font-semibold">{pais.crecimiento}</span><br/>
                              Vol: {pais.volumen} | Valor: {pais.valor}
                            </p>
                            {pais.ciudades && pais.ciudades.length > 0 && (
                              <div className="mt-2 space-y-2 flex-grow"> {/* flex-grow para que esta sección ocupe espacio */}
                                <h5 className="text-md font-semibold" style={{ color: '#34113b' }}>Ciudades:</h5>
                                {pais.ciudades.map((ciudad, cIdx) => (
                                  <div key={cIdx} className="p-1.5 bg-white rounded shadow-sm border border-purple-200 text-xs">
                                    <p className="font-semibold" style={{ color: '#34113b' }}>{ciudad.nombre}</p>
                                    <p style={{ color: colors.mediumGreen }}>Est.: {ciudad.estudiantes} | Edad: {ciudad.edadMedia}</p>
                                    <p style={{ color: colors.mediumGreen }}>Duración: {ciudad.duracionPromedio} | Gasto: {ciudad.gastoMedio}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Retos y Tendencias Clave (en dos columnas si hay espacio) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {segmento.datos.retosTurismo && segmento.datos.retosTurismo.length > 0 && (
                      <div className="p-3 rounded-lg" style={{ backgroundColor: '#e3dae5' }}>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: '#34113b' }}>Retos</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: '#374709' }}>
                          {segmento.datos.retosTurismo.map((item, rIdx) => <li key={rIdx}>{item}</li>)}
                        </ul>
                      </div>
                    )}
                    {segmento.datos.tendenciasClaveTurismo && segmento.datos.tendenciasClaveTurismo.length > 0 && (
                      <div className="p-3 rounded-lg" style={{ backgroundColor: '#e3dae5' }}>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: '#34113b' }}>Tendencias Clave</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: '#374709' }}>
                          {segmento.datos.tendenciasClaveTurismo.map((item, tIdx) => <li key={tIdx}>{item}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Fallback para otros segmentos */}
              {!segmento.datos.categorias && !segmento.datos.categoriasPrincipales && segmento.id !== 'adolescentes' && segmento.id !== 'jovenes' && segmento.id !== 'especificos' && segmento.id !== 'tercera' && segmento.id !== 'turismo' && (
                 <div className="text-center py-4 px-2">
                    <p className="text-lg font-semibold mb-2" style={{ color: '#34113b' }}>{segmento.descripcion}</p>
                    {(segmento.datos as any).crecimiento && <p className="text-sm" style={{ color: '#34113b' }}><strong>Crecimiento:</strong> {(segmento.datos as any).crecimiento}</p>}
                    {(segmento.datos as any).tendencia && <p className="text-sm" style={{ color: '#34113b' }}><strong>Tendencia:</strong> {(segmento.datos as any).tendencia}</p>}
                 </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODIFICADO: Fecha elevada unos 3mm (posicionada 8px más arriba) y sin cita */}
      <div className="w-full bg-transparent py-1 relative mt-2">
        {/* Fecha elevada */}
        <div className="text-center px-4 mb-8">
          <p className="text-sm" style={{ color: '#34113b', marginBottom: '-8px' }}>
            <span className="text-xs" style={{ color: '#34113b' }}>
              Datos: Mayo 2025
            </span>
          </p>
        </div>
        
        {/* AÑADIDO: Aviso de copyright discreto */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          <div className="text-center" style={{ color: '#34113b', fontSize: '9px' }}>
            © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
          </div>
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 2
// =======================================================================
// =======================================================================
// DIAPOSITIVA 3: HOUDINI EN EL SECTOR EDITORIAL (CON PROTECCIÓN DE DERECHOS MINIMALISTA)
// =======================================================================
const Diapositiva3 = () => {
  // Estado para la editorial seleccionada
  const [activePublisherId, setActivePublisherId] = useState(0);
  
  // Paleta de colores local para esta diapositiva, adaptada de diapositiva 1
  const slide3Colors = {
    darkTurquoise: '#1A5F7A',  // Turquesa oscuro
    aquamarine: '#20B2AA',     // Aguamarina
    coral: '#FF7F50',          // Coral cálido
    yellow: '#FFEB3B',         // Amarillo vibrante para contraste
    offWhite: '#F5FFFA',       // Fondo claro para contenedores
    textDark: '#1D3B4A',       // Color de texto oscuro
    white: '#FFFFFF',
    textLight: '#6B7280',
    cream: '#F5EFE0'
  };
  
  // Función para generar color según índice
  const getPublisherColor = (index: number) => {
    const colorOptions = [
      slide3Colors.darkTurquoise, 
      slide3Colors.aquamarine, 
      slide3Colors.coral, 
      slide3Colors.yellow, 
      '#5B7B65'  // Color adicional para variedad
    ];
    return colorOptions[index % colorOptions.length];
  };
  
  // Datos agrupados por editorial
  const publishers = [
    {
      id: 0,
      editorial: "Grupo Anaya",
      soluciones: [
        {
          proyecto: "iBook",
          aplicacion: "Generación y explotación de contenidos educativos con IA generativa",
          caracteristicas: "Copilotos para expertos, generación automática de contenidos, mejora continua, respeto a propiedad intelectual"
        },
        {
          proyecto: "EduDynamic",
          aplicacion: "Plataforma integral con materiales para asignaturas como IA, Programación y Robótica",
          caracteristicas: "Contenidos curriculares para nuevas materias, recursos para profesorado y alumnado"
        },
        {
          proyecto: "Tiimi_",
          aplicacion: "Desarrollo profesional docente con IA",
          caracteristicas: "Competencias personales y profesionales, aprendizaje por retos, acompañamiento con mentores"
        }
      ]
    },
    {
      id: 1,
      editorial: "Santillana",
      soluciones: [
        {
          proyecto: "Asistente Inteligente Santillana (AIS)",
          aplicacion: "Analítica avanzada y predicción del progreso académico",
          caracteristicas: "Indicadores inteligentes, alertas tempranas, personalización del aprendizaje, panel de control para docentes"
        }
      ]
    },
    {
      id: 2,
      editorial: "Edelvives",
      soluciones: [
        {
          proyecto: "Edelvives Time y 4IU",
          aplicacion: "Recomendador semántico, programación curricular asistida, tutores inteligentes",
          caracteristicas: "Personalización, retroalimentación inmediata, apoyo a estudiantes con necesidades especiales mediante PLN"
        }
      ]
    },
    {
      id: 3,
      editorial: "Vicens Vives",
      soluciones: [
        {
          proyecto: "Edubook ChatIA",
          aplicacion: "Chatbot educativo para creación de materiales ELE",
          caracteristicas: "Generación de actividades, gamificación, rúbricas adaptativas, personalización para aulas multiculturales"
        }
      ]
    },
    {
      id: 4,
      editorial: "Difusión",
      soluciones: [
        {
          proyecto: "Formación docente en IA generativa",
          aplicacion: "Webinars y talleres para docentes",
          caracteristicas: "Uso ético y creativo de IA, generación de materiales, integración de imágenes y modelos multilingües"
        }
      ]
    },
    {
      id: 5,
      editorial: "SM Formación",
      soluciones: [
        {
          proyecto: "Curso \"IA generativa en el aula\"",
          aplicacion: "Formación docente en aplicaciones pedagógicas de IA",
          caracteristicas: "Metodologías para entrenar modelos, detección de deepfakes, análisis crítico, seguridad en uso de IA"
        }
      ]
    },
    {
      id: 6,
      editorial: "Edinumen",
      soluciones: [
        {
          proyecto: "Evaluación personalizada según el currículo de escuela internacional",
          aplicacion: "Sistemas de evaluación en un LMS propio",
          caracteristicas: "generación de actividades de corte evaluativo"
        }
      ]
    },
    {
      id: 7,
      editorial: "Real Academia Española (RAE)",
      soluciones: [
        {
          proyecto: "Proyecto LEIA",
          aplicacion: "Normativización y buen uso del español en IA",
          caracteristicas: "Desarrollo de asistentes de voz, chatbots, procesadores de texto que respetan normas lingüísticas"
        }
      ]
    },
    {
      id: 8,
      editorial: "Editoriales Estados Unidos",
      soluciones: [
        {
          proyecto: "Vista Higher Learning - MyConversationTrainer",
          aplicacion: "Práctica conversacional en español con IA",
          caracteristicas: "Generación de actividades conversacionales, feedback instantáneo, integración curricular, métricas de progreso"
        },
        {
          proyecto: "Pearson - Smart Lesson Generator",
          aplicacion: "Creación automática de lecciones de español alineadas con el currículo",
          caracteristicas: "Genera ejercicios de gramática, vocabulario y comprensión lectora, alineado con estándares ACTFL, reducción de carga docente"
        },
        {
          proyecto: "McGraw-Hill - ALEKS (Adaptive Learning)",
          aplicacion: "Plataforma adaptativa para lenguas (incluyendo español)",
          caracteristicas: "Diagnóstico de conocimiento, rutas personalizadas, feedback automático, seguimiento de progreso"
        },
        {
          proyecto: "Houghton Mifflin Harcourt - Plataformas educativas",
          aplicacion: "Materiales para español como segunda lengua en K-12",
          caracteristicas: "Recursos digitales, integración curricular, aunque sin especificar IA avanzada en resultados recientes"
        }
      ]
    },
    {
      id: 9,
      editorial: "Tendencias Globales",
      soluciones: [
        {
          proyecto: "Global (McGraw-Hill, Pearson, Springer, etc.)",
          aplicacion: "Plataformas educativas con IA",
          caracteristicas: "Feedback instantáneo, gestión de información científica, recomendación de contenidos"
        },
        {
          proyecto: "Francia (Editoriales y sindicatos)",
          aplicacion: "Negociaciones y bloqueos de uso de datos IA",
          caracteristicas: "Demandas legales, acuerdos con tecnológicas, regulación del uso de obras protegidas"
        },
        {
          proyecto: "Reino Unido (Oxford, Cambridge, Wiley)",
          aplicacion: "Asistentes y plataformas educativas con IA",
          caracteristicas: "Alianzas con empresas IA, formación en uso ético, desarrollo de asistentes pedagógicos"
        }
      ]
    },
    {
      id: 10,
      editorial: "Soluciones No Editoriales",
      soluciones: [
        {
          proyecto: "Langua",
          aplicacion: "Contextualización de ejercicios ELE mediante IA",
          caracteristicas: "Costo: $200-$800/mes. Generación de ejercicios adaptados a niveles específicos, contenido cultural apropiado para regiones hispanohablantes."
        },
        {
          proyecto: "TalkPal",
          aplicacion: "Simulación de conversaciones con variaciones regionales",
          caracteristicas: "Práctica conversacional con diferentes acentos y modismos. Adaptación a contextos culturales diversos del mundo hispanohablante."
        }
      ]
    }
  ];
  
  // Editorial activa y sus soluciones
  const activePublisher = publishers.find(p => p.id === activePublisherId) || publishers[0];

  return (
    <div className="h-screen w-full flex flex-col relative" style={{ 
      backgroundColor: slide3Colors.offWhite,
      overflow: 'hidden'
    }}>
      {/* Encabezado */}
      <div className="px-8 pt-6 pb-4">
        <div className="rounded-lg shadow-md p-3 mb-3" style={{
          background: `linear-gradient(90deg, ${slide3Colors.darkTurquoise}, ${slide3Colors.aquamarine})`,
        }}>
          <h2 className="text-4xl font-bold text-white text-center drop-shadow-md" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Houdini en el Sector Editorial
          </h2>
        </div>
        <p className="text-xl text-center" style={{ color: slide3Colors.coral }}>
          Escapando de las limitaciones tradicionales
        </p>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-1 px-6 pb-4 flex">
        {/* Panel izquierdo - Lista de editoriales */}
        <div className="w-1/4 pr-2 overflow-y-auto">
          <div className="space-y-1">
            {publishers.map((publisher, index) => (
              <button
                key={publisher.id}
                className="w-full p-3 text-left rounded-lg transition-all text-sm flex items-center shadow-sm"
                style={{ 
                  backgroundColor: activePublisherId === publisher.id ? getPublisherColor(index) : 'white',
                  color: activePublisherId === publisher.id ? 'white' : slide3Colors.textDark,
                  transform: activePublisherId === publisher.id ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => setActivePublisherId(publisher.id)}
              >
                {activePublisherId === publisher.id && (
                  <div 
                    className="w-5 h-5 rounded-full flex items-center justify-center mr-1 flex-shrink-0 text-sm"
                    style={{
                      backgroundColor: 'white',
                      color: getPublisherColor(index)
                    }}
                  >
                    {publisher.soluciones.length}
                  </div>
                )}
                <div className={`truncate font-medium ${activePublisherId === publisher.id ? "" : "ml-5"}`}>
                  {publisher.editorial}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Panel derecho - Información detallada */}
        <div className="w-3/4 pl-2">
          <div 
            className="h-full rounded-xl shadow-md p-4 flex flex-col bg-white"
            style={{ overflow: 'auto' }}
          >
            {/* Encabezado con nombre de editorial */}
            <div className="mb-3 border-b pb-2" style={{ borderColor: slide3Colors.cream }}>
              <div className="flex items-center">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                  style={{ backgroundColor: slide3Colors.coral }}
                >
                  <span className="text-xl text-white">✦</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: slide3Colors.darkTurquoise, fontFamily: "'Montserrat', sans-serif" }}>
                    {activePublisher.editorial}
                  </h3>
                  <p className="text-sm" style={{ color: slide3Colors.textLight }}>
                    {activePublisher.soluciones.length} {activePublisher.soluciones.length === 1 ? 'solución' : 'soluciones'} con IA
                  </p>
                </div>
              </div>
            </div>
            
            {/* Lista de soluciones de la editorial */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {activePublisher.soluciones.map((solucion, index) => (
                <div key={index} 
                  className="border rounded-lg p-3" 
                  style={{ 
                    borderColor: slide3Colors.aquamarine, 
                    borderLeftWidth: '4px', 
                    borderLeftColor: getPublisherColor(activePublisherId)
                  }}
                >
                  <h4 className="text-base font-bold mb-2" style={{ color: slide3Colors.darkTurquoise }}>
                    {solucion.proyecto}
                  </h4>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Aplicación: </span>
                      <span className="text-gray-600">{solucion.aplicacion}</span>
                    </div>
                    
                    {solucion.caracteristicas && (
                      <div>
                        <span className="font-medium text-gray-700">Características: </span>
                        <span className="text-gray-600">{solucion.caracteristicas}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* AÑADIDO: Aviso de copyright minimalista - solo texto centrado y un poco más arriba */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center items-center" style={{ zIndex: 20 }}>
        <div className="text-center" style={{ color: slide3Colors.textDark, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 3
// =======================================================================

// =======================================================================
// DIAPOSITIVA 4: CASO ANAYA (CON COPYRIGHT Y SIN CITA)
// =======================================================================
const Diapositiva4 = () => {
  return (
    <div className="h-screen w-full flex flex-col relative" style={{ backgroundColor: colors.offWhite }}>
      <div className="px-6 sm:px-12 pt-8 sm:pt-10 pb-3 sm:pb-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2" style={{ color: colors.darkGreen }}>
          El Otro Lado de Anaya
        </h2>
        <p className="text-lg sm:text-xl" style={{ color: colors.mediumGreen }}>
          La transformación digital a través de Salesforce Data Cloud
        </p>
      </div>
      <div className="text-center pb-3 sm:pb-4">
        <div className="text-6xl sm:text-7xl font-bold" style={{ color: colors.lightGreen }}>
          900,000
        </div>
        <div className="text-lg sm:text-xl" style={{ color: colors.mediumGreen }}>
          clientes únicos con visión 360°
        </div>
      </div>
      <div className="px-6 sm:px-12 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="py-2 px-4 text-white font-medium text-sm sm:text-base" style={{ backgroundColor: colors.darkGreen }}>
              Lo tradicional superado
            </div>
            <div className="p-3 sm:p-4 flex-1">
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5" style={{ color: colors.lightGreen }}>✓</span>
                  <p><span className="font-medium">Datos fragmentados</span> en múltiples sistemas desconectados</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5" style={{ color: colors.lightGreen }}>✓</span>
                  <p><span className="font-medium">Identidades dispersas</span> en diferentes canales digitales</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5" style={{ color: colors.lightGreen }}>✓</span>
                  <p><span className="font-medium">Comunicaciones genéricas</span> sin personalización efectiva</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5" style={{ color: colors.lightGreen }}>✓</span>
                  <p><span className="font-medium">Procesos manuales</span> ineficientes y propensos a errores</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="py-2 px-4 text-white font-medium text-sm sm:text-base" style={{ backgroundColor: colors.mediumGreen }}>
              Lo actual implementado
            </div>
            <div className="p-3 sm:p-4 flex-grow">
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5" style={{ color: colors.lightGreen }}>✓</span>
                  <p><span className="font-medium">Centralización de datos</span> y visión 360° del cliente</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5" style={{ color: colors.lightGreen }}>✓</span>
                  <p><span className="font-medium">Identidad única</span> con Salesforce Identity</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5" style={{ color: colors.lightGreen }}>✓</span>
                  <p><span className="font-medium">Segmentación avanzada</span> con Marketing Cloud</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5" style={{ color: colors.lightGreen }}>✓</span>
                  <p><span className="font-medium">Automatización básica</span> de tareas y comunicaciones</p>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-2 sm:p-3 border-t border-gray-200">
              <div className="text-xs sm:text-sm font-medium mb-0.5 sm:mb-1" style={{ color: colors.mediumGreen }}>Coste Actual</div>
              <div className="flex justify-between items-baseline">
                <div className="text-base sm:text-xl font-bold" style={{ color: colors.darkGreen }}>461.400€</div>
                <div className="text-[10px] sm:text-xs text-gray-500 text-right">Licencias, implementación y formación</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="py-2 px-4 text-white font-medium text-sm sm:text-base" style={{ backgroundColor: colors.lightGreen }}>
              Lo potencial
            </div>
            <div className="p-3 sm:p-4 flex-grow">
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5" style={{ color: colors.mediumGreen }}>💡</span>
                  <p><span className="font-medium">IA predictiva y generativa</span> para recomendaciones automáticas</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5" style={{ color: colors.mediumGreen }}>💡</span>
                  <p><span className="font-medium">Agentes autónomos</span> para gestión inteligente del soporte</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5" style={{ color: colors.mediumGreen }}>💡</span>
                  <p><span className="font-medium">Education Cloud</span> para el ciclo educativo completo</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5" style={{ color: colors.mediumGreen }}>💡</span>
                  <p><span className="font-medium">Personalización omnicanal</span> en tiempo real con análisis predictivo</p>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-2 sm:p-3 border-t border-gray-200">
              <div className="text-xs sm:text-sm font-medium mb-0.5 sm:mb-1" style={{ color: colors.lightGreen }}>Coste Potencial (+Tokens)</div>
              <div className="flex justify-between items-baseline">
                <div className="text-base sm:text-xl font-bold" style={{ color: colors.darkGreen }}>590.000€</div>
                <div className="text-[10px] sm:text-xs text-gray-500 text-right">Einstein AI, Agentforce, Education Cloud</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 sm:px-12 mt-2">
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <div className="flex items-baseline mb-1 sm:mb-0">
            <span className="text-sm sm:text-lg font-medium mr-2 sm:mr-3" style={{ color: colors.darkGreen }}>Coste Total Estimado:</span>
            <span className="text-xl sm:text-2xl font-bold" style={{ color: colors.lightGreen }}>1.051.400€</span>
            <span className="text-xs sm:text-sm ml-1 sm:ml-2 text-gray-500">(primer año)</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-600">
            <span className="font-medium">Incluye:</span> implementación, licencias, tokens de IA y formación
          </div>
        </div>
        <div className="text-right text-xs sm:text-sm mt-1 pt-0.5" style={{ color: colors.mediumGreen }}>
          Implementado por <span className="font-bold">NTT DATA</span>
        </div>
      </div>
      
      {/* AÑADIDO: Aviso de copyright discreto en lugar de la cita */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center">
        <div className="text-center" style={{ color: colors.darkGreen, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 4
// =======================================================================

// =======================================================================
// DIAPOSITIVA 5: DE DÓNDE VENGO (FUNDAMENTOS ACADÉMICOS CON COPYRIGHT ELEVADO)
// =======================================================================
const Diapositiva5 = () => {
  // Paleta de colores específica para esta diapositiva
  const slide5Colors = {
    darkGreen: '#536F01',
    gold: '#E8B100',
    cream: '#FCE2AD',
    sage: '#8A9994',
    forest: '#3F6358',
    background: '#FFFCF5',
    text: '#333333',
  };

  // Estado para el grado seleccionado
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);

  // Datos de formación académica con iconos minimalistas
  const degrees = [
    {
      id: 'psico',
      name: 'Psicolingüística',
      institution: 'Universidad Paulista / Universidad de la Habana',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 4.5 17v-2.5a2.5 2.5 0 0 1 2.42-2.5 2.5 2.5 0 0 1-2.42-2.5V7a2.5 2.5 0 0 1 5-1Z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44A2.5 2.5 0 0 0 19.5 17v-2.5a2.5 2.5 0 0 0-2.42-2.5 2.5 2.5 0 0 0 2.42-2.5V7a2.5 2.5 0 0 0-5-1Z" />
        </svg>
      ),
      color: slide5Colors.darkGreen,
      description: 'Especialización en la formación de conceptos asociados a las emociones',
      focus: 'Enfoque histórico cultural de L. Vygotsky',
      thesis: 'La noción de muerte en niños enfermos de leucemia: el desarrollo del sentido personal y la apropiación de significados'
    },
    {
      id: 'design',
      name: 'Máster en Diseño Gráfico',
      institution: 'Universidad Europea de Madrid',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="17" cy="8" r="3" />
          <path d="M14 11L10 15L7 12" />
          <circle cx="7" cy="8" r="3" />
          <path d="M21 14V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V5C3 4.44772 3.44772 4 4 4H9" />
        </svg>
      ),
      color: slide5Colors.sage,
      description: 'Especialización en comunicación visual y diseño editorial',
      focus: 'Diseño y maquetación de materiales educativos',
      thesis: 'Visualización de información compleja en contextos educativos'
    },
    {
      id: 'ele',
      name: 'Máster en Español como Lengua Extranjera',
      institution: 'Universidad Europea del Atlántico',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 5h12M9 3v2M3 9h12M3 13h12M3 17h12M9 19v2" />
          <path d="M17 9v8M21 11l-4-2-4 2M17 17l-4 2V9" />
        </svg>
      ),
      color: slide5Colors.gold,
      description: 'Especialización en metodología de enseñanza de ELE',
      focus: 'Personalización del aprendizaje y nuevas metodologías',
      thesis: 'Clase invertida, competencia intercultural y gamificación aplicada al curso EquisELE para estudiantes polacos'
    },
    {
      id: 'ia1',
      name: 'Máster en Innovación e Inteligencia Artificial',
      institution: 'Microsoft / Founderz',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12v.01M8 12V8c0-2.21 1.79-4 4-4v0c2.21 0 4 1.79 4 4v4" />
          <path d="M17 13.5V13c0-.55-.45-1-1-1h-3v-.5c0-.28.22-.5.5-.5 0 0 .5 0 1 .5v0c.33.33.8.5 1.3.5H17c.55 0 1-.45 1-1v-.5C18 9.3 16.7 8 15 8h-1.5" />
          <path d="M20 16v4h-4" />
          <path d="M14 16v4H4v-7c0-1.1.9-2 2-2h1" />
        </svg>
      ),
      color: slide5Colors.forest,
      description: 'Aplicación de IA en el sector educativo y editorial',
      focus: 'Transformación digital de procesos educativos',
      thesis: 'Implementación de sistemas conversacionales para el aprendizaje de idiomas'
    },
    {
      id: 'ia2',
      name: 'Máster en Ciencia Data/IA',
      institution: 'EBIS / Universidad de Vitoria-Gasteiz',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v3M3 12h3M12 21v-3M21 12h-3" />
          <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
          <path d="M5 3a2 2 0 0 0-2 2M3 19a2 2 0 0 0 2 2M19 3a2 2 0 0 1 2 2M21 19a2 2 0 0 1-2 2" />
        </svg>
      ),
      color: slide5Colors.gold,
      description: 'Finalización prevista: julio 2025',
      focus: 'Procesamiento del lenguaje natural aplicado a ELE',
      thesis: 'LIA: Small Language Model para el aprendizaje de español como lengua extranjera'
    }
  ];

  // Información del proyecto LIA (visible cuando se selecciona IA)
  const liaProjectInfo = {
    title: 'Proyecto LIA (SLM)',
    description: 'Small Language Model para el aprendizaje de español como lengua extranjera',
    components: [
      {
        name: 'Módulos',
        items: ['Contexto', 'Lingüístico', 'Pedagógico', 'Investigativo']
      },
      {
        name: 'Agentes',
        items: ['EVALIA', 'GracIA', 'MEGAPLAN', 'PsicodeLIA', 'SIA']
      },
      {
        name: 'Tecnologías',
        items: ['Procesamiento de Lenguaje Natural', 'Sistemas de Recomendación', 'Aprendizaje Adaptativo', 'Generación de Contenido']
      }
    ]
  };

  // Verificar si el grado seleccionado está relacionado con IA
  const isIADegree = selectedDegree === 'ia1' || selectedDegree === 'ia2';

  return (
    <div className="h-screen w-full flex flex-col relative" style={{ 
      backgroundColor: slide5Colors.background,
      color: slide5Colors.text,
      overflow: 'hidden'
    }}>
      {/* Encabezado */}
      <div className="text-center px-8 pt-6 pb-4">
        <h2 className="text-3xl font-bold mb-1" style={{ 
          background: `linear-gradient(45deg, ${slide5Colors.darkGreen}, ${slide5Colors.forest})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          De dónde vengo
        </h2>
        <p className="text-lg italic" style={{ color: slide5Colors.sage }}>
          Fundamentos académicos que sustentan LIA
        </p>
      </div>
      
      {/* Selector de formación visual - Círculos enlazados */}
      <div className="flex justify-center items-center py-4">
        <div className="relative">
          {/* Línea de conexión */}
          <div className="absolute top-1/2 left-0 right-0 h-1 -mt-0.5" style={{ backgroundColor: slide5Colors.cream }} />
          
          {/* Círculos de formación */}
          <div className="flex justify-between items-center relative z-10">
            {degrees.map((degree) => (
              <button
                key={degree.id}
                className="mx-4 transform transition-all duration-300 focus:outline-none"
                style={{ 
                  transform: selectedDegree === degree.id ? 'scale(1.2)' : 'scale(1)'
                }}
                onClick={() => setSelectedDegree(selectedDegree === degree.id ? null : degree.id)}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                  style={{ 
                    backgroundColor: degree.color,
                    border: selectedDegree === degree.id ? `3px solid white` : 'none',
                    boxShadow: selectedDegree === degree.id ? `0 0 0 2px ${degree.color}, 0 0 15px ${degree.color}` : 'none'
                  }}
                >
                  <div className="text-white">
                    {degree.icon}
                  </div>
                </div>
                <div 
                  className="mt-2 text-center text-xs font-medium whitespace-nowrap"
                  style={{ 
                    color: selectedDegree === degree.id ? degree.color : slide5Colors.text,
                    opacity: selectedDegree === degree.id ? 1 : 0.8,
                    maxWidth: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {degree.name.split(' ').slice(-2).join(' ')}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Contenido principal - Detalles de la formación */}
      <div className={`flex-1 flex px-8 ${selectedDegree ? 'py-4' : 'pb-4 pt-0'} overflow-y-auto`}>
        {selectedDegree ? (
          <div className="w-full flex">
            {/* Panel izquierdo - Detalles de formación */}
            <div className={`${isIADegree ? 'w-1/2' : 'w-full'} bg-white rounded-lg shadow-lg p-6 ${isIADegree ? 'mr-4' : 'mr-0'}`}>
              {degrees.map(degree => degree.id === selectedDegree && (
                <div key={degree.id} className="h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-white"
                      style={{ backgroundColor: degree.color }}
                    >
                      {degree.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: degree.color }}>
                        {degree.name}
                      </h3>
                      <p className="text-sm" style={{ color: slide5Colors.sage }}>
                        {degree.institution}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div>
                      <h4 className="text-sm font-bold mb-1" style={{ color: degree.color }}>
                        Descripción
                      </h4>
                      <p className="text-sm">
                        {degree.description}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold mb-1" style={{ color: degree.color }}>
                        Enfoque
                      </h4>
                      <p className="text-sm">
                        {degree.focus}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold mb-1" style={{ color: degree.color }}>
                        Tesis / Proyecto
                      </h4>
                      <p className="text-sm italic">
                        "{degree.thesis}"
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t" style={{ borderColor: '#eee' }}>
                    <h4 className="text-xs font-bold mb-1" style={{ color: degree.color }}>
                      Aplicación en LIA
                    </h4>
                    <p className="text-xs">
                      {degree.id === 'psico' ? 'Comprensión de procesos cognitivos y formación de conceptos en aprendices de ELE.' :
                       degree.id === 'design' ? 'Diseño de interfaces y visualización de información para el aprendizaje intuitivo.' :
                       degree.id === 'ele' ? 'Metodologías de enseñanza adaptativas y personalizadas para estudiantes diversos.' :
                       degree.id === 'ia1' ? 'Integración de sistemas inteligentes y asistentes virtuales en el proceso de aprendizaje.' :
                       'Desarrollo del núcleo del sistema, procesamiento de datos lingüísticos y modelado de lenguaje.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Panel derecho - Detalles de LIA (solo visible cuando se selecciona IA) */}
            {isIADegree && (
              <div className="w-1/2 flex flex-col">
                <div 
                  className="mb-4 py-3 px-4 rounded-lg text-center"
                  style={{ 
                    backgroundColor: slide5Colors.forest,
                    color: 'white',
                  }}
                >
                  <h3 className="text-lg font-bold">{liaProjectInfo.title}</h3>
                  <p className="text-xs mt-1">{liaProjectInfo.description}</p>
                </div>
                
                <div className="flex-1 grid grid-cols-1 gap-4">
                  {liaProjectInfo.components.map((component, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-lg shadow-md p-4"
                      style={{ borderLeft: `3px solid ${slide5Colors.gold}` }}
                    >
                      <h4 className="text-sm font-bold mb-2" style={{ color: slide5Colors.forest }}>
                        {component.name}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {component.items.map((item, i) => (
                          <span 
                            key={i} 
                            className="inline-block px-2 py-1 rounded-full text-white text-xs"
                            style={{ backgroundColor: i % 2 === 0 ? slide5Colors.sage : slide5Colors.gold }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-white rounded-lg shadow-md p-4 flex justify-center items-center">
                    <svg width="200" height="120" viewBox="0 0 200 120">
                      <circle cx="100" cy="60" r="25" fill={slide5Colors.forest} />
                      <text x="100" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">LIA</text>
                      
                      <circle cx="40" cy="30" r="15" fill={slide5Colors.gold} stroke="white" strokeWidth="1" />
                      <text x="40" y="34" textAnchor="middle" fill={slide5Colors.darkGreen} fontSize="7" fontWeight="bold">Contexto</text>
                      
                      <circle cx="40" cy="90" r="15" fill={slide5Colors.gold} stroke="white" strokeWidth="1" />
                      <text x="40" y="94" textAnchor="middle" fill={slide5Colors.darkGreen} fontSize="7" fontWeight="bold">Lingüíst.</text>
                      
                      <circle cx="160" cy="30" r="15" fill={slide5Colors.gold} stroke="white" strokeWidth="1" />
                      <text x="160" y="34" textAnchor="middle" fill={slide5Colors.darkGreen} fontSize="7" fontWeight="bold">Pedagóg.</text>
                      
                      <circle cx="160" cy="90" r="15" fill={slide5Colors.gold} stroke="white" strokeWidth="1" />
                      <text x="160" y="94" textAnchor="middle" fill={slide5Colors.darkGreen} fontSize="7" fontWeight="bold">Investig.</text>
                      
                      <line x1="55" y1="30" x2="75" y2="45" stroke={slide5Colors.sage} strokeWidth="1.5" />
                      <line x1="55" y1="90" x2="75" y2="75" stroke={slide5Colors.sage} strokeWidth="1.5" />
                      <line x1="145" y1="30" x2="125" y2="45" stroke={slide5Colors.sage} strokeWidth="1.5" />
                      <line x1="145" y1="90" x2="125" y2="75" stroke={slide5Colors.sage} strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Vista por defecto cuando no hay grado seleccionado
          <div className="w-full bg-white rounded-lg shadow-lg p-6 text-center flex flex-col items-center justify-center h-full">
            <div 
              className="w-20 h-20 rounded-full mb-4 flex items-center justify-center"
              style={{ backgroundColor: slide5Colors.forest }}
            >
              <svg viewBox="0 0 24 24" width="36" height="36" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: slide5Colors.forest }}>
              Formación multidisciplinar
            </h3>
            <p className="text-md mb-6 max-w-xl" style={{color: slide5Colors.text}}>
              Mi recorrido académico combina disciplinas complementarias que convergen
              en el desarrollo de LIA: un enfoque único para la enseñanza del español.
            </p>
            <div className="text-sm italic" style={{ color: slide5Colors.sage }}>
              Selecciona un área de formación para explorar su contribución al proyecto LIA
            </div>
          </div>
        )}
      </div>
      
      {/* Paginación (o espacio para ella) */}
      <div className="py-2">
        {/* No number here, as per original design */}
      </div>
      
      {/* AÑADIDO: Aviso de copyright discreto elevado 3mm (equivalente a 8px) */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="text-center" style={{ color: slide5Colors.sage, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 5
// =======================================================================

// =======================================================================
// DIAPOSITIVA 6: ESTE SOY YO (EXPERIENCIA PROFESIONAL) - CON COPYRIGHT AJUSTADO
// =======================================================================
const Diapositiva6 = () => {
  // Paleta de colores específica para esta diapositiva
  const slide6Colors = {
    darkGreen: '#536F01',
    gold: '#E8B100',
    cream: '#FCE2AD',
    sage: '#8A9994',
    forest: '#3F6358',
    background: '#FFFCF5',
    text: '#333333',
  };

  const [activeCategory, setActiveCategory] = useState('materiales');

  interface ProfessionalItem {
    title: string;
    organization: string;
    period: string;
    description: string;
  }

  // Nota: La propiedad 'icon' en ProfessionalFacet ya no se usa directamente en professionalFacetsData
  // porque los iconos SVG se manejan por separado en categoryIcons y roleIcons.
  // Si tuvieras emojis o strings simples como iconos, podrías añadir 'icon: string;' aquí.
  interface ProfessionalFacetData {
    title: string;
    color: string;
    items: ProfessionalItem[];
  }
  
  // Cambiamos a React.ReactNode
  interface CategoryIconsType {
    [key: string]: React.ReactNode;
  }

  const categoryIcons: CategoryIconsType = {
    materials: (
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18" />
      </svg>
    ),
    publications: (
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z"></path>
        <line x1="16" y1="3" x2="16" y2="9"></line>
      </svg>
    ),
    editorial: (
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    teaching: (
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8l9-6l9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 21v-8h6v8" />
      </svg>
    ),
    projects: (
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  };

  const professionalFacetsData: Record<string, ProfessionalFacetData> = {
    materiales: {
      title: "Roles específicos de edición",
      color: slide6Colors.forest,
      items: [ 
        { title: "Coordinador Editorial Lenguas Romances", organization: "Klett-PONS", period: "", description: "Supervisión y coordinación de la producción editorial multilingüe. Gestión del ciclo completo de desarrollo de materiales didácticos." },
        { title: "Editor de Proyecto", organization: "Sector Editorial ELE", period: "", description: "Dirección y planificación estratégica de colecciones didácticas. Supervisión del proceso editorial y adaptación a diversos contextos." },
        { title: "Autor", organization: "Materiales ELE", period: "", description: "Creación de contenidos didácticos para ELE. Desarrollo de unidades, actividades y secuencias pedagógicas con enfoque comunicativo." },
        { title: "Maquetador", organization: "Publicaciones Educativas", period: "", description: "Diseño y composición visual de materiales. Aplicación de principios de diseño instruccional para optimizar la presentación de contenidos." }
      ]
    },
    editorial: {
      title: "Experiencia Editorial",
      color: slide6Colors.darkGreen,
      items: [ 
        { title: "Product Manager Lenguas Romances", organization: "Editorial Klett", period: "11 años", description: "Editor, gerente de marketing y ventas, responsable de formación de profesores. Desarrollo de estrategias de posicionamiento en el mercado ELE internacional." },
        { title: "Coordinador Editorial Internacional", organization: "Grupo Klett EE", period: "7 años", description: "Responsable de coordinación editorial en 11 países: Polonia, R.Checa, Grecia, Bulgaria, Eslovaquia, Eslovenia, Hungría, Serbia, Croacia, Rumanía y Países Bálticos. Gestión de equipos multiculturales." },
        { title: "Responsable de Innovación e Investigación", organization: "Grupo Difusión", period: "2 años", description: "Desarrollo de proyectos de innovación educativa y materiales ELE con tecnologías emergentes. Investigación de mercados y tendencias pedagógicas en la enseñanza de idiomas." },
        { title: "Responsable de Innovación y Desarrollo", organization: "Hablandis, Centro Internacional de Idiomas", period: "3 meses", description: "Arquitectura y montaje de toda la estructura de gestión de clientes e implementación de IA. Estrategias de desarrollo de negocio y transformación digital." }
      ]
    },
    docencia: {
      title: "Experiencia Docente",
      color: slide6Colors.gold,
      items: [ 
        { title: "Profesor de ELE", organization: "Programa de Secciones Bilingües en Polonia", period: "3 años", description: "Enseñanza de español como lengua extranjera en contexto bilingüe. Desarrollo e implementación de programas educativos innovadores." },
        { title: "Profesor Colaborador", organization: "Universidad de Ciencias Sociales SWPS, Varsovia", period: "4 años", description: "Docencia universitaria especializada en lengua española. Diseño curricular y evaluación de competencias lingüísticas en educación superior." },
        { title: "Especialista en Aprendizaje Infantil", organization: "Comunidad Judía en Breslavia, Polonia", period: "2 años", description: "Enseñanza de lenguas extranjeras en contexto multicultural. Desarrollo de metodologías adaptadas a entornos de diversidad cultural y lingüística." },
        { title: "Psicoterapeuta Infantil", organization: "Brasil y Cuba", period: "4 años", description: "Orientación familiar de niños con necesidades educativas especiales: trastornos del comportamiento y enfermos de cáncer. Aplicación de enfoques terapéuticos basados en Vygotsky." }
      ]
    },
    publicaciones: {
      title: "Publicaciones y Materiales",
      color: slide6Colors.forest,
      items: [ 
        { title: "Colecciones adaptadas (5)", organization: "", period: "", description: "Aula Internacional (Aula Nueva en Polonia, tres versiones), Gente Joven versión polaca (Gente Joven Edición Revisada), y tres colecciones de materiales complementarios para el mercado europeo oriental." },
        { title: "Colecciones completas creadas (2)", organization: "", period: "", description: "EquisELE (libro del alumno, cuaderno de actividades y libro del profesor) y Gente Joven Edición Revisada (libro del profesor). Desarrollo integral desde la concepción hasta la publicación final." },
        { title: "Gente Joven Edición Revisada", organization: "Libro del profesor", period: "", description: "Autor, coordinador editorial, editor y maquetador. Desarrollo integral de guías didácticas, recursos complementarios y planificación curricular para docentes." },
        { title: "Colección EquisELE", organization: "Serie completa", period: "", description: "Autor, coordinador editorial y editor del libro del alumno, cuaderno de actividades y libro del profesor. Diseño de enfoque pedagógico basado en gamificación, clase invertida y competencia intercultural." }
      ]
    },
    proyectos: {
      title: "Proyectos Actuales",
      color: slide6Colors.gold,
      items: [ 
        { title: "LIA - Sistema de Lenguaje Machine", organization: "SLM para ELE", period: "En desarrollo", description: "Plataforma integral de IA para ELE que integra cuatro corpus lingüísticos y cinco agentes especializados para personalizar el aprendizaje y asistir en la creación de materiales y evaluación." },
        { title: "MEGAPLAN", organization: "Planificación asistida con IA", period: "Fase beta", description: "Herramienta de planificación de lecciones para profesores de ELE que integra diseño instruccional, gamificación, accesibilidad e inclusividad, utilizando IA generativa para personalizar contenidos." },
        { title: "GracIA", organization: "Formación docente en IA", period: "Piloto", description: "Sistema de capacitación docente para la integración efectiva y ética de inteligencia artificial en el aula de ELE, con enfoque en el concepto PEDTECH vs EDTECH." },
        { title: "EvalIA", organization: "Evaluación adaptativa", period: "Conceptualización", description: "Sistema de evaluación automatizada con IA que proporciona retroalimentación personalizada, análisis de errores y recomendaciones de mejora para estudiantes de ELE en diferentes niveles." },
        { title: "Proyecto ALIADOS", organization: "Editorial innovadora", period: "Conceptualización", description: "Propuesta de curso de español para adolescentes (generación alpha) utilizando IA con estructura basada en microsecuencias didácticas, storytelling y aprendizaje adaptativo." },
        { title: "Implementación IA en Hablandis", organization: "Gestión de clientes", period: "En curso", description: "Arquitectura y montaje de toda la estructura de gestión de clientes e implementación de IA para personalización del aprendizaje y optimización de procesos administrativos." }
      ]
    }
  };
  
  const activeData = professionalFacetsData[activeCategory];

  // Cambiamos a React.ReactNode
  interface RoleIconsType { [key: string]: React.ReactNode; }
  const roleIcons: RoleIconsType = { 
    coordinator: ( <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /> <path d="M14 3v3a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1V3" /> <path d="M12 11h4M8 11h2M12 15h4M8 15h2M12 19h4M8 19h2" /> </svg> ),
    editor: ( <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path d="M12 20h9M3 20h5" /> <path d="M9 4v16" /> <path d="M4 8h3M6 4h3M4 12h3M4 16h3" /> </svg> ),
    author: ( <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path d="M14 4v10.54a4 4 0 1 1-4-4" /> <path d="M18 2L6 22" /> </svg> ),
    layout: ( <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"> <rect x="3" y="3" width="18" height="18" rx="2" /> <path d="M3 9h18M9 3v18" /> <path d="M12 9v12" /> <path d="M15 3v6" /> </svg> )
  };
  
  const categoryOrder = ['materiales', 'publicaciones', 'editorial', 'docencia', 'proyectos'];

  // Cambiamos a React.ReactNode
  const getCategoryIconByKey = (key: string): React.ReactNode => {
    if (key === 'docencia') return categoryIcons['teaching'];
    return categoryIcons[key] || <div/>;
  };

  return (
    <div className="h-screen w-full flex flex-col relative" style={{ 
      backgroundColor: slide6Colors.background,
      color: slide6Colors.text,
      overflow: 'hidden'
    }}>
      {/* Encabezado */}
      <div className="text-center px-8 pt-6 pb-2">
        <h2 className="text-3xl font-bold mb-1" style={{ 
          background: `linear-gradient(45deg, ${slide6Colors.gold}, ${slide6Colors.forest})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Este soy yo
        </h2>
        <p className="text-lg italic" style={{ color: slide6Colors.forest }}>
          {activeCategory === 'materiales' ? 'Especialización en edición de materiales didácticos' : 
           activeCategory === 'editorial' ? 'Experiencia editorial y transformación digital' :
           activeCategory === 'docencia' ? 'Trayectoria docente internacional' :
           activeCategory === 'publicaciones' ? 'Publicaciones y materiales didácticos' :
           'Proyectos de innovación en desarrollo'}
        </p>
      </div>
      
      {/* Selector de categorías */}
      <div className="flex justify-center px-6 py-3">
        <div className="flex flex-wrap justify-center gap-2 bg-white p-2 rounded-xl shadow-md">
          {categoryOrder.map(key => {
            const categoryData = professionalFacetsData[key];
            const iconSvg = getCategoryIconByKey(key);
            
            return (
              <button
                key={key}
                className="px-3 py-2 rounded-full text-xs font-medium transition-all flex items-center"
                style={{ 
                  backgroundColor: activeCategory === key ? categoryData.color : 'transparent',
                  color: activeCategory === key ? 'white' : slide6Colors.text,
                  boxShadow: activeCategory === key ? '0 2px 5px rgba(0,0,0,0.2)' : 'none',
                }}
                onClick={() => setActiveCategory(key)}
              >
                <span className="mr-1.5 inline-block align-middle" style={{color: activeCategory === key ? 'white' : categoryData.color }}>{iconSvg}</span> 
                {categoryData.title.split(':')[0]}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col px-8 py-3 overflow-hidden">
        <div className="flex items-center mb-4">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-white"
            style={{ backgroundColor: activeData.color }}
          >
            {getCategoryIconByKey(activeCategory)}
          </div>
          <h3 className="text-xl font-bold" style={{ color: activeData.color }}>
            {activeData.title}
          </h3>
        </div>
        
        {activeCategory === 'materiales' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pb-4 pr-2 flex-1">
            {activeData.items.map((item, index) => {
              let iconKey = '';
              if (item.title.toLowerCase().includes("coordinador")) iconKey = 'coordinator';
              else if (item.title.toLowerCase().includes("editor")) iconKey = 'editor';
              else if (item.title.toLowerCase().includes("autor")) iconKey = 'author';
              else if (item.title.toLowerCase().includes("maquetador")) iconKey = 'layout';
              const icon = roleIcons[iconKey] || <div/>;
              
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 border-l-4 transform transition-all hover:scale-[1.02]" style={{ borderColor: slide6Colors.forest }}>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ backgroundColor: `${slide6Colors.forest}1A`, color: slide6Colors.forest }}>
                      {icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-md font-bold mb-1" style={{ color: slide6Colors.forest }}>{item.title}</h4>
                      {item.organization && (<div className="mb-2"><span className="text-xs font-medium" style={{ color: slide6Colors.sage }}>{item.organization}</span></div>)}
                      <p className="text-sm" style={{ color: slide6Colors.text }}>{item.description}</p>
                    </div>
                  </div>
                </div>);
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-4 pr-2 flex-1">
            {activeData.items.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 border-t-4 transform transition-all hover:scale-105 flex flex-col" style={{ borderColor: activeData.color }}>
                <h4 className="text-sm font-bold mb-1" style={{ color: activeData.color }}>{item.title}</h4>
                {item.organization && (
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium" style={{ color: slide6Colors.sage }}>{item.organization}</span>
                    {item.period && (<span className="text-xs ml-2 px-2 py-0.5 rounded-full" style={{ backgroundColor: `${activeData.color}33`, color: activeData.color }}>{item.period}</span>)}
                  </div>)}
                <p className="text-xs mt-2 flex-grow" style={{ color: slide6Colors.text }}>{item.description}</p>
              </div>))}
          </div>
        )}
      </div>
      
      {/* Estadísticas */}
      <div className="px-8 py-2 flex justify-around text-center">
        {activeCategory === 'materiales' && (
          <>
            <div> <div className="text-lg font-bold" style={{ color: slide6Colors.forest }}>4</div> <div className="text-xs" style={{ color: slide6Colors.text }}>Roles especializados</div> </div>
            <div> <div className="text-lg font-bold" style={{ color: slide6Colors.forest }}>15+</div> <div className="text-xs" style={{ color: slide6Colors.text }}>Años de experiencia</div> </div>
            <div> <div className="text-lg font-bold" style={{ color: slide6Colors.forest }}>7</div> <div className="text-xs" style={{ color: slide6Colors.text }}>Colecciones didácticas</div> </div>
          </>
        )}
        {activeCategory === 'editorial' && (
          <>
            <div> <div className="text-lg font-bold" style={{ color: slide6Colors.darkGreen }}>18+</div> <div className="text-xs" style={{ color: slide6Colors.text }}>Años en sector editorial</div> </div>
            <div> <div className="text-lg font-bold" style={{ color: slide6Colors.darkGreen }}>11</div> <div className="text-xs" style={{ color: slide6Colors.text }}>Países europeos</div> </div>
            <div> <div className="text-lg font-bold" style={{ color: slide6Colors.darkGreen }}>4</div> <div className="text-xs" style={{ color: slide6Colors.text }}>Editoriales principales</div> </div>
          </>
        )}
         {activeCategory === 'docencia' && (
          <>
            <div> <div className="text-lg font-bold" style={{ color: slide6Colors.gold }}>13</div> <div className="text-xs" style={{ color: slide6Colors.text }}>Años de experiencia</div> </div>
            <div> <div className="text-lg font-bold" style={{ color: slide6Colors.gold }}>4</div> <div className="text-xs" style={{ color: slide6Colors.text }}>Contextos educativos</div> </div>
            <div> <div className="text-lg font-bold" style={{ color: slide6Colors.gold }}>3</div> <div className="text-xs" style={{ color: slide6Colors.text }}>Países</div> </div>
          </>
        )}
        {activeCategory === 'publicaciones' && (
          <>
            <div> <div className="text-lg font-bold" style={{ color: slide6Colors.forest }}>5</div> <div className="text-xs" style={{ color: slide6Colors.text }}>Colecciones adaptadas</div> </div>
            <div> <div className="text-lg font-bold" style={{ color: slide6Colors.forest }}>2</div> <div className="text-xs" style={{ color: slide6Colors.text }}>Colecciones completas</div> </div>
            <div> <div className="text-lg font-bold" style={{ color: slide6Colors.forest }}>4</div> <div className="text-xs" style={{ color: slide6Colors.text }}>Funciones editoriales</div> </div>
          </>
        )}
        {activeCategory === 'proyectos' && (
          <>
            <div> <div className="text-lg font-bold" style={{ color: slide6Colors.gold }}>5</div> <div className="text-xs" style={{ color: slide6Colors.text }}>Agentes IA en desarrollo</div> </div>
            <div> <div className="text-lg font-bold" style={{ color: slide6Colors.gold }}>6</div> <div className="text-xs" style={{ color: slide6Colors.text }}>Proyectos innovadores</div> </div>
            <div> <div className="text-lg font-bold" style={{ color: slide6Colors.gold }}>4</div> <div className="text-xs" style={{ color: slide6Colors.text }}>Tecnologías integradas</div> </div>
          </>
        )}
      </div>
      
      <div className="py-4 flex justify-end pr-6">
        {/* Espacio para botones de navegación generales */}
      </div>
      
      {/* MODIFICADO: Aviso de copyright bajado aproximadamente 1mm (de bottom-8 a bottom-7) */}
      <div className="absolute bottom-7 left-0 right-0 flex justify-center">
        <div className="text-center" style={{ color: slide6Colors.sage, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 6
// =======================================================================

// =======================================================================
// DIAPOSITIVA 7: ANÁLISIS DE MERCADO ELE (DIFUSIÓN VS EDINUMEN) CON COPYRIGHT
// =======================================================================
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

const Diapositiva7 = () => {
  const [showData, setShowData] = useState(false);
  
  const slide7Colors = {
    background: '#fffaf0', 
    brown: '#7D4E25',      
    darkGreen: '#222B1B',  
    olive: '#787D46',      
    cream: '#F1EBD8',      
    gold: '#E4BA6A',
    // Nuevos colores para la comparativa de barras para evitar confusión
    difusionBarColor: '#3F6358', // Un verde bosque, distintivo
    edinumenBarColor: '#A96F47', // Un marrón claro/bronce, distintivo
  };

  const difusionData = [
    { name: 'Mercado Escolar', value: 59, color: slide7Colors.darkGreen },
    { name: 'España', value: 28, color: slide7Colors.olive },
    { name: 'Ventas Internacionales', value: 13, color: slide7Colors.gold }
  ];

  const edinumenData = [
    { name: 'Mercado Escolar', value: 43, color: slide7Colors.darkGreen },
    { name: 'España', value: 34, color: slide7Colors.olive },
    { name: 'Ventas Internacionales', value: 23, color: slide7Colors.gold }
  ];

  const comparativeData = [
    { name: 'Mercado Escolar', difusion: 59, edinumen: 43 },
    { name: 'España', difusion: 28, edinumen: 34 },
    { name: 'Ventas Int.', difusion: 13, edinumen: 23 } // Acortado para mejor visualización en XAxis
  ];

  const keyMarkets = {
    difusion: ['Estados Unidos', 'Países Bajos', 'Francia', 'Países Eslavos', 'Brasil'],
    edinumen: ['Estados Unidos', 'Brasil', 'Italia', 'Reino Unido', 'Países Eslavos']
  };

  const toggleData = () => setShowData(!showData);

  const renderQuestions = () => (
    <div className="flex flex-col items-center justify-center p-6 md:p-8 rounded-lg shadow-xl max-w-4xl mx-auto" style={{backgroundColor: slide7Colors.cream}}>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{color: slide7Colors.darkGreen}}>El estado actual del mundo ELE</h2>
      <div className="text-lg md:text-xl text-left w-full space-y-4">
        <p className="font-bold text-xl md:text-2xl" style={{color: slide7Colors.brown}}>Dos competidores principales: editorial Edinumen y editorial Difusión</p>
        <ul className="list-disc pl-6 md:pl-8 space-y-3" style={{color: slide7Colors.darkGreen}}>
          <li>Facturación de ambas empresas</li>
          <li>Alianzas y estrategias importantes</li>
          <li>Cambios en la estructura funcional en la distribución en varios países</li>
          <li>Espacios estratégicos seleccionados (en qué ámbito: exámenes, niños y adolescentes han publicado más y con más novedades o han invertido)</li>
        </ul>
      </div>
      <button 
        onClick={toggleData}
        className="mt-8 px-6 py-3 text-white text-lg md:text-xl font-semibold rounded-full shadow-lg transform transition hover:scale-105"
        style={{backgroundColor: slide7Colors.gold}}
      >
        Revelar datos de mercado
      </button>
    </div>
  );

  const renderData = () => (
    <div className="p-4 md:p-6 rounded-lg shadow-xl max-w-6xl mx-auto overflow-y-auto" style={{backgroundColor: slide7Colors.cream, maxHeight: 'calc(100vh - 80px)'}}>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{color: slide7Colors.darkGreen}}>¿Cómo se proyectan estos datos a nivel de las dos editoriales más importantes?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Columna Difusión */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-4" style={{color: slide7Colors.brown}}>Difusión</h3>
          <div className="h-56 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difusionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  // label prop eliminada para depender del Tooltip
                >
                  {difusionData.map((entry, index) => (
                    <Cell key={`cell-difusion-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value: number, name: string) => [`${value}%`, name]} 
                  contentStyle={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '5px', fontSize: '12px'}}
                />
                 <Legend 
                    iconSize={10} 
                    wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} 
                    payload={difusionData.map(item => ({ value: item.name, type: 'square', color: item.color }))}
                 />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm">
            <p className="font-semibold"><span style={{color: slide7Colors.darkGreen}}>59%</span> mercado escolar, destacando:</p>
            <ul className="list-disc pl-5 text-xs" style={{color: slide7Colors.darkGreen}}>
              {keyMarkets.difusion.map((market, idx) => (<li key={`dif-market-${idx}`}>{market}</li>))}
            </ul>
            {/* Ya no es necesario repetir aquí los porcentajes de España y Ventas Int., se ven en la leyenda/tooltip */}
          </div>
        </div>

        {/* Columna Edinumen */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-4" style={{color: slide7Colors.brown}}>Edinumen</h3>
          <div className="h-56 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={edinumenData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  // label prop eliminada
                >
                  {edinumenData.map((entry, index) => (
                    <Cell key={`cell-edinumen-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                    contentStyle={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '5px', fontSize: '12px'}}
                />
                <Legend 
                    iconSize={10} 
                    wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                    payload={edinumenData.map(item => ({ value: item.name, type: 'square', color: item.color }))}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm">
            <p className="font-semibold"><span style={{color: slide7Colors.darkGreen}}>43%</span> mercado escolar, destacando:</p>
            <ul className="list-disc pl-5 text-xs" style={{color: slide7Colors.darkGreen}}>
              {keyMarkets.edinumen.map((market, idx) => (<li key={`edi-market-${idx}`}>{market}</li>))}
            </ul>
          </div>
        </div>
      </div>

      {/* Gráfico comparativo */}
      <div className="mt-6 md:mt-8 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg md:text-xl font-bold text-center mb-4" style={{color: slide7Colors.brown}}>Comparativa por segmentos</h3>
        <div className="h-64 md:h-72"> {/* Aumenté un poco la altura para las etiquetas del XAxis */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparativeData} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}> {/* Aumentado bottom margin */}
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{fontSize: 10, fill: slide7Colors.brown}} 
                angle={-15} // Ligeramente inclinado si los nombres son largos
                textAnchor="end"
                interval={0} // Para asegurar que todos los ticks se muestren
              />
              <YAxis tick={{fontSize: 10, fill: slide7Colors.brown}} unit="%"/>
              <RechartsTooltip 
                formatter={(value: number, name: string) => [`${value}%`, name.charAt(0).toUpperCase() + name.slice(1)]} // Capitalizar nombre en Tooltip
                contentStyle={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '5px', fontSize: '12px'}}
              />
              <Legend wrapperStyle={{fontSize: "12px", paddingTop: "10px"}}/>
              <Bar dataKey="difusion" name="Difusión" fill={slide7Colors.difusionBarColor} radius={[4, 4, 0, 0]} barSize={30} />
              <Bar dataKey="edinumen" name="Edinumen" fill={slide7Colors.edinumenBarColor} radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button 
          onClick={toggleData}
          className="px-6 py-3 text-white text-lg md:text-xl font-semibold rounded-full shadow-lg transform transition hover:scale-105"
          style={{backgroundColor: slide7Colors.brown}}
        >
          Volver a preguntas
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full flex items-center justify-center p-4 relative" style={{backgroundColor: slide7Colors.background}}>
      {showData ? renderData() : renderQuestions()}
      
      {/* AÑADIDO: Aviso de copyright discreto */}
      <div className="absolute bottom-7 left-0 right-0 flex justify-center">
        <div className="text-center" style={{ color: slide7Colors.brown, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 7
// =======================================================================
// =======================================================================
// DIAPOSITIVA 8: CONEXIONES DE OPORTUNIDADES (RED)
// =======================================================================
// Nota: He mantenido useRef e useEffect de React, ya que son necesarios para el canvas
// No se necesitan importaciones adicionales si ya tienes React en el ámbito global del archivo.

const Diapositiva8 = () => {
  // Colores refinados específicos para esta diapositiva
  const slide8Colors = {
    primary: '#BF8709',    // Dorado/Ocre principal
    secondary: '#FFFFFF',   // Blanco (usado para fondo de nodos, etc.)
    textColor: '#523857',  // Púrpura oscuro para texto principal
    background: '#FFFFFF',  // Blanco para el fondo general de la diapositiva
    lightGray: '#F0F0F0',   // Gris claro para el panel de detalles
    mediumGray: '#DDDDDD',  // Gris medio para bordes
    connectionLines: '#B9BBDE', // Azul lavanda para líneas de conexión
    nodeLabels: '#B54213'   // Cobre/Naranja para etiquetas de nodos
  };

  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hoveredOpportunity, setHoveredOpportunity] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null); // Tipado para el ref del canvas
  
  interface Opportunity {
    id: string;
    name: string;
    icon: keyof typeof icons; // Para asegurar que el icono exista en el objeto icons
    description: string;
    markets: string[];
    position: { x: number; y: number };
    connections: string[];
  }

  const opportunities: Opportunity[] = [
    { id: 'alpha', name: 'Generación Alpha', icon: 'AlphaIcon', description: 'La primera generación totalmente digital necesita materiales adaptados a su forma de aprender.', markets: ['Francia', 'Países Eslavos', 'Grecia', 'Países Bajos', 'Bélgica', 'Italia', 'Brasil', 'Reino Unido'], position: { x: 22, y: 18 }, connections: ['preschool', 'genz', 'international'] },
    { id: 'immersion', name: 'Español por inmersión', icon: 'ImmersionIcon', description: 'Enfoque diferente para la enseñanza por inmersión en países hispanohablantes.', markets: ['México', 'Colombia', 'España'], position: { x: 78, y: 25 }, connections: ['international', 'exams', 'policy'] },
    { id: 'preschool', name: 'Edad temprana y preescolar', icon: 'PreschoolIcon', description: 'Material para la introducción del español en edades preescolares.', markets: [], position: { x: 12, y: 65 }, connections: ['alpha', 'genz'] },
    { id: 'seniors', name: 'Adultos mayores', icon: 'SeniorsIcon', description: 'Mercado creciente de adultos mayores que buscan aprender español.', markets: [], position: { x: 88, y: 70 }, connections: ['exams', 'policy'] },
    { id: 'genz', name: 'Generación Z', icon: 'GenZIcon', description: 'Jóvenes que no son principiantes absolutos y buscan aprendizaje con fines específicos.', markets: [], position: { x: 35, y: 38 }, connections: ['alpha', 'preschool', 'exams', 'international'] },
    { id: 'exams', name: 'Exámenes oficiales', icon: 'ExamsIcon', description: 'Preparación específica para certificaciones en centros examinadores y Cervantes.', markets: [], position: { x: 65, y: 45 }, connections: ['immersion', 'seniors', 'international', 'genz'] },
    { id: 'international', name: 'Escuelas Internacionales', icon: 'SchoolIcon', description: 'Material adaptado a currículos internacionales con enfoque AICLE/CLIL.', markets: [], position: { x: 45, y: 78 }, connections: ['alpha', 'immersion', 'genz', 'exams', 'policy'] },
    { id: 'policy', name: 'Política lingüística', icon: 'PolicyIcon', description: 'Colaboración con instituciones para el desarrollo de políticas lingüísticas.', markets: [], position: { x: 25, y: 90 }, connections: ['immersion', 'seniors', 'international'] }
  ];

  const icons = {
    AlphaIcon: ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide8Colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path> <circle cx="9" cy="7" r="4"></circle> <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path> <path d="M16 3.13a4 4 0 0 1 0 7.75"></path> </svg> ),
    ImmersionIcon: ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide8Colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="12" r="10"></circle> <path d="M2 12h20"></path> <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path> </svg> ),
    PreschoolIcon: ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide8Colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path> <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path> <line x1="12" y1="19" x2="12" y2="22"></line> </svg> ),
    SeniorsIcon: ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide8Colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <path d="M12 2C8.13401 2 5 5.13401 5 9V14C5 17.866 8.13401 21 12 21C15.866 21 19 17.866 19 14V9C19 5.13401 15.866 2 12 2Z"></path> <path d="M8 21V22"></path> <path d="M16 21V22"></path> <path d="M9 7H12H15"></path> <path d="M9 11H12H15"></path> <path d="M12 15H15"></path> <path d="M9 15H10"></path> </svg> ),
    GenZIcon: ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide8Colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect> <line x1="12" y1="18" x2="12" y2="18"></line> </svg> ),
    ExamsIcon: ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide8Colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path> <polyline points="14 2 14 8 20 8"></polyline> <line x1="16" y1="13" x2="8" y2="13"></line> <line x1="16" y1="17" x2="8" y2="17"></line> <polyline points="10 9 9 9 8 9"></polyline> </svg> ),
    SchoolIcon: ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide8Colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <path d="M3 21h18"></path> <path d="M3 7h18"></path> <path d="M3 7l9-4 9 4"></path> <path d="M5 21V7"></path> <path d="M19 21V7"></path> <path d="M9 9v12"></path> <path d="M15 9v12"></path> </svg> ),
    PolicyIcon: ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide8Colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <path d="M12 20V10"></path> <path d="M18 20V4"></path> <path d="M6 20v-4"></path> </svg> )
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return; // Asegurar que parentElement exista
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Asegurar que el contexto 2D se obtenga

    const parentRect = canvas.parentElement.getBoundingClientRect();
    
    canvas.width = parentRect.width;
    canvas.height = parentRect.height;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    opportunities.forEach(opportunity => {
      const startX = (opportunity.position.x / 100) * canvas.width;
      const startY = (opportunity.position.y / 100) * canvas.height;
      
      opportunity.connections.forEach(connectionId => {
        const connectedOpp = opportunities.find(o => o.id === connectionId);
        if (!connectedOpp) return;
        
        const endX = (connectedOpp.position.x / 100) * canvas.width;
        const endY = (connectedOpp.position.y / 100) * canvas.height;
        
        let lineWidth = 1;
        let opacity = 0.2;
        
        if (selectedOpportunity) {
          if (selectedOpportunity === opportunity.id || selectedOpportunity === connectionId) {
            lineWidth = 2; opacity = 0.6;
          } else { opacity = 0.05; }
        } else if (hoveredOpportunity) {
          if (hoveredOpportunity === opportunity.id || hoveredOpportunity === connectionId) {
            lineWidth = 1.5; opacity = 0.5;
          } else { opacity = 0.1; }
        }
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        
        // Convertir opacidad a formato hexadecimal para el color
        const alphaHex = Math.floor(opacity * 255).toString(16).padStart(2, '0');
        ctx.strokeStyle = `${slide8Colors.connectionLines}${alphaHex}`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      });
    });
  }, [selectedOpportunity, hoveredOpportunity, isInitialized, opportunities, slide8Colors.connectionLines]); // Añadido 'opportunities' y 'slide8Colors.connectionLines' a las dependencias

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialized(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Efecto para redibujar en resize (opcional pero recomendado para canvas responsivo)
  useEffect(() => {
    const handleResize = () => {
        // Forzar un re-renderizado o llamar directamente a la lógica de dibujo si es necesario
        // Esto puede ser simplemente un setIsInitialized(false) y luego true, o una función de dibujo dedicada
        setIsInitialized(false); // Esto podría causar un parpadeo, mejor sería una función de redibujo más directa
        setTimeout(() => setIsInitialized(true), 50); 
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const currentOpportunityDetails = selectedOpportunity ? opportunities.find(o => o.id === selectedOpportunity) : null;

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden" style={{ backgroundColor: slide8Colors.background }}>
      <div className="w-full max-w-6xl rounded-xl shadow-lg p-6 md:p-8 relative flex flex-col h-full" style={{ backgroundColor: slide8Colors.background }}>
        {/* Título */}
        <div className="relative mb-6 md:mb-10 text-center z-10 flex-shrink-0">
          <h1 className="text-3xl md:text-5xl font-bold mb-1 md:mb-2" style={{ fontFamily: "'Montserrat', sans-serif", color: slide8Colors.textColor }}>
            Una mirada más exhaustiva
          </h1>
          <p className="text-sm md:text-base text-gray-500 italic">Conexiones invisibles que otros no perciben</p>
        </div>

        {/* Área de visualización de la red */}
        <div className="relative flex-grow mb-4 md:mb-8 bg-white rounded-xl border" style={{ borderColor: slide8Colors.mediumGray }}>
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full" 
            style={{ zIndex: 1 }}
          />
          
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="absolute cursor-pointer transition-all duration-300 z-10"
              style={{
                left: `${opportunity.position.x}%`,
                top: `${opportunity.position.y}%`,
                opacity: isInitialized ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${
                  selectedOpportunity === opportunity.id ? 1.2 : 
                  hoveredOpportunity === opportunity.id ? 1.1 : 1
                })`,
                transition: "all 0.3s ease-out, opacity 0.8s ease-out",
                zIndex: selectedOpportunity === opportunity.id ? 20 : (hoveredOpportunity === opportunity.id ? 15 : 10)
              }}
              onClick={() => setSelectedOpportunity(
                selectedOpportunity === opportunity.id ? null : opportunity.id
              )}
              onMouseEnter={() => setHoveredOpportunity(opportunity.id)}
              onMouseLeave={() => setHoveredOpportunity(null)}
            >
              <div 
                className="rounded-full flex items-center justify-center relative shadow-md"
                style={{
                  width: '60px', // Ajustado para pantallas pequeñas
                  height: '60px',// Ajustado para pantallas pequeñas
                  backgroundColor: 'white',
                  border: `2px solid ${slide8Colors.primary}`,
                  boxShadow: selectedOpportunity === opportunity.id || hoveredOpportunity === opportunity.id
                    ? `0 0 12px ${slide8Colors.primary}70` // Sombra más sutil
                    : `0 3px 8px rgba(0,0,0,0.1)`
                }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div style={{ transform: 'scale(0.7)' }}> {/* Icono un poco más pequeño */}
                    {icons[opportunity.icon]}
                  </div>
                </div>
                <div 
                  className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-center font-medium px-1.5 py-0.5 rounded text-xs" // Ajustado tamaño de texto y padding
                  style={{ 
                    color: slide8Colors.nodeLabels,
                    backgroundColor: `${slide8Colors.primary}15`, // Fondo sutil para la etiqueta
                    opacity: selectedOpportunity ? (selectedOpportunity === opportunity.id || hoveredOpportunity === opportunity.id ? 1 : 0.7) : (hoveredOpportunity === opportunity.id ? 1 : 0.8),
                  }}
                >
                  {opportunity.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Panel de detalles */}
        <div 
          className="transition-all duration-500 ease-in-out overflow-hidden rounded-xl border flex-shrink-0"
          style={{ 
            maxHeight: selectedOpportunity ? '280px' : '0px', // Ajustar altura máxima
            opacity: selectedOpportunity ? 1 : 0,
            borderColor: selectedOpportunity ? slide8Colors.primary : 'transparent',
            backgroundColor: slide8Colors.lightGray,
            marginBottom: selectedOpportunity ? '1rem' : '0' // md:mb-8
          }}
        >
          {currentOpportunityDetails && ( // Renderizar solo si hay detalles
            <div className="p-4 md:p-6 h-full overflow-y-auto"> {/* Permitir scroll interno */}
              <div className="flex flex-col md:flex-row items-start">
                <div 
                  className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mr-0 md:mr-4 mb-2 md:mb-0 bg-white"
                  style={{ border: `2px solid ${slide8Colors.primary}`}}
                >
                  <div style={{transform: 'scale(0.9)'}}>
                    {icons[currentOpportunityDetails.icon]}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 
                    className="text-xl md:text-2xl font-medium mb-1 md:mb-2"
                    style={{ color: slide8Colors.primary, fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {currentOpportunityDetails.name}
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base mb-2 md:mb-4">
                    {currentOpportunityDetails.description}
                  </p>
                  
                  {currentOpportunityDetails.connections.length > 0 && (
                    <div className="mb-2 md:mb-4">
                      <h4 className="text-gray-500 text-xs md:text-sm uppercase tracking-wider mb-1 md:mb-2">Conexiones:</h4>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {currentOpportunityDetails.connections.map(connectionId => {
                          const connection = opportunities.find(o => o.id === connectionId);
                          return connection ? (
                            <span 
                              key={connectionId}
                              className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium cursor-pointer transition-all hover:shadow-md"
                              style={{ backgroundColor: 'white', color: slide8Colors.primary, border: `1px solid ${slide8Colors.primary}` }}
                              onClick={(e) => { e.stopPropagation(); setSelectedOpportunity(connectionId); }}
                            >
                              {connection.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                  
                  {currentOpportunityDetails.markets.length > 0 && (
                    <div>
                      <h4 className="text-gray-500 text-xs md:text-sm uppercase tracking-wider mb-1 md:mb-2">Mercados potenciales:</h4>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {currentOpportunityDetails.markets.map((market, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm bg-white"
                            style={{ color: slide8Colors.primary, border: `1px solid ${slide8Colors.primary}` }}
                          >
                            {market}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {!selectedOpportunity && (
          <div className="text-center text-gray-500 py-2 text-sm md:text-base animate-pulse flex-shrink-0">
            Haga clic en un nodo para explorar sus conexiones invisibles
          </div>
        )}

        <div className="text-center text-xs md:text-sm text-gray-500 mt-auto flex-shrink-0 pt-2"> {/* mt-auto para empujar al fondo */}
          Basado en análisis de tendencias y vacíos de mercado no cubiertos por los competidores principales
        </div>
      </div>
      
      {/* AÑADIDO: Aviso de copyright discreto */}
      <div className="absolute bottom-7 left-0 right-0 flex justify-center">
        <div className="text-center" style={{ color: slide8Colors.nodeLabels, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 8
// =======================================================================

// =======================================================================
// DIAPOSITIVA 9: EL OTRO LADO DEL ÉXITO (SEGMENTACIÓN ESTRATÉGICA) - CORREGIDO
// =======================================================================
// No se necesitan importaciones adicionales si React (useState) ya está en el ámbito.

const Diapositiva9 = () => {
  const [activeSegment, setActiveSegment] = useState(1);
  
  const slide9Colors = {
    sand: "#DEC48B",
    taupe: "#D5CFBE",
    sage: "#B2B09C",
    gray: "#7F8379",
    charcoal: "#7F8071", // No usado directamente en el ejemplo visual, pero definido
    white: "#FFFFFF",
    black: "#333333"
  };
  
  interface Country {
    name: string;
    icon: React.ReactNode; // Cambiado de JSX.Element a React.ReactNode
  }

  interface Segmento {
    id: number;
    title: string;
    countries: Country[];
    characteristics: string[];
    color: string;
    penetration: number;
    potential: number;
  }

  const segmentos: Segmento[] = [
    {
      id: 1,
      title: "Material auténtico & costes altos",
      countries: [
        { name: "Estados Unidos", icon: ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"> <rect x="4" y="4" width="16" height="16" rx="1" /> <path d="M8 8h8M8 12h8M8 16h8" /> </svg> )},
        { name: "Francia", icon: ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"> <circle cx="12" cy="12" r="9" /> <circle cx="12" cy="10" r="3" /> <path d="M12 13v5" /> </svg> )}
      ],
      characteristics: ["Valoran autenticidad, calidad y adaptación cultural", "Dispuestos a invertir en soluciones premium personalizadas", "Buscan experiencias educativas inmersivas"],
      color: slide9Colors.sand,
      penetration: 3,
      potential: 15
    },
    {
      id: 2,
      title: "Alta personalización curricular",
      countries: [
        { name: "Italia", icon: ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"> <circle cx="12" cy="12" r="9" /> <path d="M12 8v8M8 12h8" /> </svg> )},
        { name: "Brasil", icon: ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"> <circle cx="12" cy="12" r="9" /> <rect x="8" y="8" width="8" height="8" rx="1" /> </svg> )}
      ],
      characteristics: ["Necesitan alineación estrecha con currículos nacionales específicos", "Buscan soluciones que integren contenido local relevante", "Requieren adaptabilidad a normativas educativas regionales"],
      color: slide9Colors.sage,
      penetration: 25,
      potential: 70
    },
    {
      id: 3,
      title: "Perfil tradicional & sensibilidad al coste",
      countries: [
        { name: "Países eslavos", icon: ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"> <rect x="3" y="3" width="18" height="18" rx="1" /> <path d="M3 9h18M9 21V9" /> </svg> )},
        { name: "Reino Unido", icon: ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"> <path d="M12 4v8M4 16h16M4 12l8 4M20 12l-8 4" /> </svg> )},
        { name: "Grecia", icon: ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"> <rect x="3" y="3" width="18" height="18" rx="1" /> <path d="M3 7h18M3 11h18M3 15h18M3 19h18" /> </svg> )},
        { name: "Países Bajos", icon: ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"> <path d="M5 9h14M5 12h14M5 15h14" /> </svg> )},
        { name: "Benelux", icon: ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"> <path d="M5 8h14M5 12h14M5 16h14" /> </svg> )}
      ],
      characteristics: ["Priorizan eficiencia y relación calidad-precio", "Enfoque digital (Reino Unido)", "Énfasis en evaluación (Grecia)", "Buscan soluciones escalables y costo-eficientes"],
      color: slide9Colors.gray,
      penetration: 40,
      potential: 65
    }
  ];
  
  const currentSegment = segmentos.find(s => s.id === activeSegment);
  if (!currentSegment) return null; // Manejo por si el segmento no se encuentra

  // Componente para el gráfico comparativo (Barras de progreso)
  const ComparativeChart = ({ segmento }: { segmento: Segmento }) => (
    <div className="w-full">
      <h3 className="text-lg md:text-xl font-bold mb-3" style={{color: slide9Colors.black, borderBottom: `2px solid ${segmento.color}`, paddingBottom: '8px'}}>
        {segmento.title}
      </h3>
      
      <div className="mb-4 md:mb-5">
        <div className="text-xs md:text-sm font-medium mb-1" style={{color: slide9Colors.black}}>Penetración actual ({segmento.penetration}%)</div>
        <div className="w-full bg-gray-200 rounded-full h-5 md:h-6">
          <div className="h-full rounded-full flex items-center justify-end pr-2 text-xs text-white font-semibold" 
               style={{width: `${segmento.penetration}%`, backgroundColor: segmento.color}}>
                 {segmento.penetration > 10 ? `${segmento.penetration}%` : ''}
          </div>
        </div>
      </div>
      
      <div className="mb-4 md:mb-5">
        <div className="text-xs md:text-sm font-medium mb-1" style={{color: slide9Colors.black}}>Potencial estimado ({segmento.potential}%)</div>
        <div className="w-full bg-gray-200 rounded-full h-5 md:h-6">
          <div className="h-full rounded-full opacity-60 flex items-center justify-end pr-2 text-xs text-white font-semibold" 
               style={{width: `${segmento.potential}%`, backgroundColor: segmento.color}}>
                 {segmento.potential > 10 ? `${segmento.potential}%` : ''}
          </div>
        </div>
      </div>
      
      <div className="border-l-4 pl-3 md:pl-4 py-2 mb-2 md:mb-4" style={{borderColor: segmento.color}}>
        <div className="text-xs md:text-sm font-medium mb-2" style={{color: slide9Colors.black}}>Características clave:</div>
        <ul className="list-disc list-inside space-y-1">
          {segmento.characteristics.map((char, idx) => (
            <li key={idx} className="text-xs md:text-sm" style={{color: slide9Colors.black}}>{char}</li>
          ))}
        </ul>
      </div>
    </div>
  );
  
  const MarketSegmentation = ({ segmento }: { segmento: Segmento }) => {
    return (
      <div className="w-full bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
        <div className="p-3 md:p-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg md:text-xl font-bold text-center" style={{color: slide9Colors.black}}>Países Destacados en este Segmento</h3>
        </div>
        
        <div className="flex-grow p-4 md:p-6 overflow-y-auto">
          {segmento.countries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {segmento.countries.map((country, index) => (
                <div key={index} className="flex items-center p-2 rounded" style={{backgroundColor: `${segmento.color}20`}}> {/* Fondo sutil con color del segmento */}
                  <div className="mr-2 md:mr-3 flex-shrink-0" style={{color: segmento.color}}>
                    {/* Intentamos mostrar el icono sin clonarlo para evitar errores */}
                    {country.icon}
                  </div>
                  <span className="text-sm md:text-base font-normal" style={{color: slide9Colors.black}}>{country.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic mt-4">No hay países específicos destacados para este segmento en los datos actuales.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 md:p-6 overflow-hidden relative" style={{backgroundColor: slide9Colors.taupe}}>
      {/* Encabezado */}
      <div className="mb-4 md:mb-6 text-center flex-shrink-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2" style={{color: slide9Colors.black}}>
          El otro lado del éxito
        </h1>
        <h2 className="text-base sm:text-lg md:text-xl font-semibold" style={{color: slide9Colors.black}}>
          Segmentación estratégica para optimizar recursos y maximizar impacto
        </h2>
      </div>
      
      {/* Contenido Principal */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-grow min-h-0"> {/* min-h-0 para que flex-grow funcione bien en contenedores anidados */}
        {/* Panel izquierdo: Pestañas de navegación y gráfico comparativo */}
        <div className="w-full md:w-7/12 flex flex-col bg-white rounded-lg shadow-md p-3 md:p-4 min-h-0">
          <div className="flex flex-wrap mb-3 md:mb-4 border-b border-gray-300 flex-shrink-0">
            {segmentos.map(seg => (
              <button 
                key={seg.id}
                className={`py-2 px-3 md:px-4 text-xs sm:text-sm font-medium focus:outline-none ${activeSegment === seg.id ? 'border-b-2 font-bold' : ''}`}
                style={{
                    color: slide9Colors.black,
                    borderColor: activeSegment === seg.id ? seg.color : 'transparent'
                }}
                onClick={() => setActiveSegment(seg.id)}
              >
                {seg.title}
              </button>
            ))}
          </div>
          
          <div className="flex-grow overflow-y-auto"> {/* Scroll para el contenido del gráfico si es largo */}
            <ComparativeChart segmento={currentSegment} />
          </div>
        </div>
        
        {/* Panel derecho: Visualizaciones */}
        <div className="w-full md:w-5/12 flex flex-col min-h-0">
          <MarketSegmentation segmento={currentSegment} />
        </div>
      </div>

      {/* AÑADIDO: Aviso de copyright discreto (posicionado en la esquina inferior derecha) */}
      <div className="absolute bottom-7 right-5">
        <div className="text-right" style={{ color: slide9Colors.charcoal, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 9
// =======================================================================


// =======================================================================
// DIAPOSITIVA 10: RED CONCEPTUAL (NODOS ALINEADOS POR FILAS Y COLUMNAS)
// =======================================================================

// Paleta de colores simplificada para esta diapositiva
const conceptColors = {
  dark: '#1D2017',
  background: '#FFFFFF',
  boxColor: '#49562A',
  textColor: '#FFFFFF',
  lineHighlight: '#e63946' 
};

// Configuración de los nodos conceptuales CON POSICIONES 'Y' AJUSTADAS
const conceptsData = [
  // Fila 1
  { id: 1, text: "Material en línea vs material impreso (libro del alumno gratuito y cuaderno de actividades de pago)", position: { x: 16.5, y: 15 }, size: { width: 25, height: 18 }, column: 0 },
  { id: 4, text: "Distribuidor específico que ayude a penetrar el mercado", position: { x: 50, y: 15 }, size: { width: 25, height: 16 }, column: 1 },
  { id: 6, text: "Alianza con el grupo Sanoma", position: { x: 83.5, y: 15 }, size: { width: 25, height: 16 }, column: 2 },
  
  // Fila 2
  { id: 2, text: "Alianzas estratégicas como SGEL ELE que permita aprovechar la red de distribución de Logista y Logista Libros", position: { x: 16.5, y: 45 }, size: { width: 25, height: 18 }, column: 0 },
  { id: 5, text: "Alianza con el grupo Klett y los distribuidores de Difusión que están descontentos", position: { x: 50, y: 45 }, size: { width: 25, height: 18 }, column: 1 },
  { id: 7, text: "El mercado del español por inmersión y su valor estratégico para mercados de cursos con material auténtico", position: { x: 83.5, y: 45 }, size: { width: 25, height: 18 }, column: 2 },

  // Fila 3
  { id: 3, text: "El mercado escolar inglés y su valor estratégico en el entramado de escuelas internacionales", position: { x: 16.5, y: 75 }, size: { width: 25, height: 18 }, column: 0 },
];


const Diapositiva10 = () => {
  const [highlightedNodeId, setHighlightedNodeId] = useState<number | null>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimationComplete(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden p-4 flex flex-col" style={{ backgroundColor: conceptColors.background }}>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: conceptColors.dark }}>
          Estrategias de Penetración en Mercados ELE
        </h1>
      </div>
      
      <div className="relative flex-grow w-full">
        
        {conceptsData.map((concept, index) => (
          <div 
            key={concept.id}
            className="absolute rounded-lg shadow-lg text-center flex items-center justify-center cursor-default"
            style={{
              left: `${concept.position.x - concept.size.width / 2}%`,
              top: `${concept.position.y}%`,
              width: `${concept.size.width}%`,
              height: `${concept.size.height}%`, 
              backgroundColor: conceptColors.boxColor,
              color: conceptColors.textColor,
              border: `2px solid ${highlightedNodeId === concept.id ? conceptColors.lineHighlight : conceptColors.boxColor}`,
              padding: '10px', 
              fontSize: '0.875rem', 
              lineHeight: '1.25rem', 
              boxSizing: 'border-box',
              opacity: isAnimationComplete ? 1 : 0,
              transform: highlightedNodeId === concept.id ? 'scale(1.03)' : 'scale(1)',
              transition: `all 0.3s ease-in-out, opacity 0.3s ease-in-out ${index * 70}ms`
            }}
            onMouseEnter={() => setHighlightedNodeId(concept.id)}
            onMouseLeave={() => setHighlightedNodeId(null)}
          >
            <span>{concept.text}</span>
          </div>
        ))}
      </div>

      {/* AÑADIDO: Aviso de copyright discreto */}
      <div className="absolute bottom-7 left-0 right-0 flex justify-center">
        <div className="text-center" style={{ color: conceptColors.dark, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 10
// =======================================================================

// =======================================================================
// DIAPOSITIVA 11: EL PUENTE HACIA EL FUTURO (IA EN EDITORIAL) - CORREGIDO
// =======================================================================
// No se necesitan importaciones adicionales si React (useState, useEffect) ya está en el ámbito
// global del archivo Presentacion.tsx (asumiendo que tienes 'import React, {useState, useEffect} from 'react';' al inicio)

const Diapositiva11 = () => {
  // Paleta de colores específica para esta diapositiva
  const slide11Colors = {
    navy: '#181D3B',
    royalBlue: '#3C4A79',
    gold: '#F6D98F',
    roseDust: '#CC979F',
    burgundy: '#833E5B',
    white: '#FFFFFF',
    background: '#F5F5F7'
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); 
  
  interface Obstacle {
    id: string;
    title: string;
    percentage: number;
    description: string;
    icon: React.ReactNode;
  }

  interface Opportunity {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  }

  const obstacles: Obstacle[] = [
    { id: 'regulation', title: 'Barreras regulatorias', percentage: 24, description: 'Incertidumbre sobre normativas y cumplimiento legal', icon: ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide11Colors.burgundy} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/> <path d="M12 8v4M12 16h.01"/> </svg> ) },
    { id: 'skills', title: 'Falta de habilidades', percentage: 23, description: 'Escasez de competencias técnicas en IA generativa', icon: ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide11Colors.burgundy} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/> <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/> <path d="M9 14h6M12 17v-6"/> </svg> ) },
    { id: 'data', title: 'Calidad de datos', percentage: 21, description: 'Baja confianza en los datos disponibles', icon: ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide11Colors.burgundy} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/> <path d="M8 10h.01M12 10h.01M16 10h.01"/> </svg> ) },
    { id: 'trust', title: 'Confianza', percentage: 63, description: 'Reducción de inversión en IA por falta de confianza', icon: ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide11Colors.burgundy} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <path d="M7 11V7a5 5 0 0 1 10 0v4"/> <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/> </svg> ) }
  ];
  
  const opportunities: Opportunity[] = [
    { id: 'personalization', title: 'Personalización de contenidos', description: 'Materiales adaptados a las necesidades específicas del alumno', icon: ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide11Colors.royalBlue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/> <circle cx="9" cy="7" r="4"/> <path d="M23 21v-2a4 4 0 0 0-3-3.87"/> <path d="M16 3.13a4 4 0 0 1 0 7.75"/> </svg> ) },
    { id: 'content-creation', title: 'Creación ágil de contenidos', description: 'Generación asistida de textos, ejercicios y recursos didácticos', icon: ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide11Colors.royalBlue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <path d="M12 19l7-7 3 3-7 7-3-3z"/> <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/> <path d="M2 2l7.586 7.586"/> <circle cx="11" cy="11" r="2"/> </svg> ) },
    { id: 'analytics', title: 'Análisis de rendimiento', description: 'Insights sobre la efectividad de los materiales educativos', icon: ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide11Colors.royalBlue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <path d="M18 20V10M12 20V4M6 20v-6"/> </svg> ) },
    { id: 'automation', title: 'Automatización editorial', description: 'Optimización de flujos de trabajo en la producción editorial', icon: ( <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide11Colors.royalBlue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/> <line x1="3" y1="9" x2="21" y2="9"/> <line x1="9" y1="21" x2="9" y2="9"/> </svg> ) }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const sequence = [
        () => setCurrentStep(1),
        () => setCurrentStep(2),
        () => setCurrentStep(3)
      ];
      
      let timeouts: number[] = []; // Cambiado de NodeJS.Timeout[] a number[]
      sequence.forEach((step, index) => {
        const timer = setTimeout(() => {
          step();
        }, 800 * (index + 1));
        timeouts.push(timer);
      });
      
      return () => timeouts.forEach(timer => clearTimeout(timer));
    }
  }, [isLoaded]);

  const cardOpacity = (index: number, totalSteps: number) => {
    if (!isLoaded) return 0;
    return currentStep >= Math.floor(index / (obstacles.length / totalSteps)) +1 || currentStep >= totalSteps ? 1 : 0;
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden relative" style={{ backgroundColor: slide11Colors.background }}>
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 relative overflow-y-auto flex flex-col h-full" style={{maxHeight: 'calc(100vh - 2rem)'}}>
        <div className="relative mb-4 md:mb-6 text-center flex-shrink-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2" style={{ fontFamily: "'Montserrat', sans-serif", color: slide11Colors.navy, textShadow: `1px 1px 0px ${slide11Colors.gold}` }}>
            El Puente Hacia el Futuro
          </h1>
          <p className="text-sm sm:text-base md:text-lg" style={{ color: slide11Colors.royalBlue }}>Navegando el camino hacia una editorial potenciada por IA</p>
        </div>

        <div className="w-full h-20 sm:h-24 md:h-28 relative mb-6 md:mb-8 lg:mb-12 flex-shrink-0">
          <svg className="w-full h-full" viewBox="0 0 800 100" preserveAspectRatio="xMidYMid meet">
            <rect x="0" y="80" width="800" height="20" fill={`${slide11Colors.roseDust}40`} />
            <path d="M0,80 L100,80 L100,100 L0,100 Z" fill={slide11Colors.gold} opacity="0.7" />
            <path d="M700,80 L800,80 L800,100 L700,100 Z" fill={slide11Colors.gold} opacity="0.7" />
            <rect x="120" y="50" width="15" height="50" fill={slide11Colors.navy} />
            <rect x="665" y="50" width="15" height="50" fill={slide11Colors.navy} />
            <defs>
              <linearGradient id="bridgeGradientSlide11" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={slide11Colors.burgundy} />
                <stop offset="50%" stopColor={slide11Colors.gold} />
                <stop offset="100%" stopColor={slide11Colors.royalBlue} />
              </linearGradient>
            </defs>
            <path d="M127,50 C300,-10 500,-10 673,50" stroke="url(#bridgeGradientSlide11)" strokeWidth="8" fill="none" />
            <line x1="127" y1="50" x2="400" y2="15" stroke={slide11Colors.roseDust} strokeWidth="2" />
            <line x1="673" y1="50" x2="400" y2="15" stroke={slide11Colors.roseDust} strokeWidth="2" />
            <path d="M127,40 C300,-20 500,-20 673,40" stroke={slide11Colors.navy} strokeWidth="1" strokeDasharray="3,3" fill="none" />
            <path d="M127,58 C300,28 500,28 673,58" stroke={slide11Colors.navy} strokeWidth="1" strokeDasharray="3,3" fill="none" />
            <text x="60" y="70" fill={slide11Colors.burgundy} fontWeight="bold" fontSize="12" textAnchor="middle">RETOS</text>
            <text x="740" y="70" fill={slide11Colors.royalBlue} fontWeight="bold" fontSize="12" textAnchor="middle">OPORTUNIDADES</text>
          </svg>
        </div>
        
        <div className="flex-grow overflow-y-auto px-1">
          <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6 bg-white rounded-lg shadow-lg border-2 mb-6 md:mb-10" 
              style={{ borderColor: slide11Colors.gold, background: `linear-gradient(135deg, ${slide11Colors.white}, ${slide11Colors.gold}10)`}}>
            <p className="text-base sm:text-lg md:text-xl text-center" style={{ color: slide11Colors.navy }}>
              A pesar de que el <span className="font-bold" style={{ color: slide11Colors.burgundy }}>27% de las empresas</span> han paralizado sus proyectos de IA, 
              el sector editorial tiene una <span className="font-bold" style={{ color: slide11Colors.royalBlue }}>oportunidad única</span> para 
              <span className="italic"> construir puentes hacia el futuro</span>, 
              equilibrando los desafíos tecnológicos con el potencial transformador de la IA generativa.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 justify-center">
            <div className="w-full md:w-5/12 lg:w-4/12">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 p-2 rounded-lg text-center" 
                  style={{ backgroundColor: slide11Colors.burgundy, color: slide11Colors.white, boxShadow: `0 4px 6px ${slide11Colors.burgundy}40`}}>
                Obstáculos Actuales
              </h2>
              <div className="space-y-3">
                {obstacles.map((obstacle, index) => (
                  <div 
                    key={obstacle.id} 
                    className="flex items-center bg-white rounded-lg shadow-md p-3 sm:p-4 transform transition-all hover:scale-105 duration-300"
                    style={{ 
                      borderLeft: `4px solid ${slide11Colors.burgundy}`,
                      background: `linear-gradient(135deg, ${slide11Colors.white}, ${slide11Colors.roseDust}10)`,
                      opacity: cardOpacity(index, 3)
                    }}
                  >
                    <div className="flex-shrink-0 mr-3 sm:mr-4">{obstacle.icon}</div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-semibold sm:font-bold text-gray-800 text-sm sm:text-base md:text-lg">{obstacle.title}</h3>
                        <span className="text-sm sm:text-base md:text-lg font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg" 
                              style={{ backgroundColor: `${slide11Colors.burgundy}20`, color: slide11Colors.burgundy }}>
                          {obstacle.percentage}%
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm">{obstacle.description}</p>
                    </div>
                  </div>
                ))}
                <div className="text-xs text-right text-gray-500 italic mt-2">
                  *Según estudio de Qlik, 2025
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex md:w-1/12 lg:w-1/12 items-center justify-center relative">
              <div className="h-4/5 w-0.5 sm:w-1 bg-gradient-to-b from-burgundy via-gold to-royalBlue rounded-full"></div>
            </div>
            
            <div className="w-full md:w-5/12 lg:w-4/12">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 p-2 rounded-lg text-center" 
                  style={{ backgroundColor: slide11Colors.royalBlue, color: slide11Colors.white, boxShadow: `0 4px 6px ${slide11Colors.royalBlue}40`}}>
                Oportunidades Editoriales
              </h2>
              <div className="space-y-3">
                {opportunities.map((opportunity, index) => (
                  <div 
                    key={opportunity.id} 
                    className="flex items-center bg-white rounded-lg shadow-md p-3 sm:p-4 transform transition-all hover:scale-105 duration-300"
                    style={{ 
                      borderLeft: `4px solid ${slide11Colors.royalBlue}`,
                      background: `linear-gradient(135deg, ${slide11Colors.white}, ${slide11Colors.gold}10)`,
                      opacity: cardOpacity(index + obstacles.length, 3)
                    }}
                  >
                    <div className="flex-shrink-0 mr-3 sm:mr-4">{opportunity.icon}</div>
                    <div className="flex-grow">
                      <h3 className="font-semibold sm:font-bold text-gray-800 text-sm sm:text-base md:text-lg mb-1">{opportunity.title}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">{opportunity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AÑADIDO: Aviso de copyright discreto */}
      <div className="absolute bottom-7 left-0 right-0 flex justify-center">
        <div className="text-center" style={{ color: slide11Colors.navy, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 11
// =======================================================================

// =======================================================================
// DIAPOSITIVA 12: PROPUESTA SIMBIÓTICA (CRM + SLM)
// =======================================================================
const Diapositiva12 = () => {
  const [activeSection, setActiveSection] = useState('actual');

  const slide12Colors = {
    coral: "#D28782", sand: "#EBC678", light: "#DFE1E0",
    mist: "#B4C6D0", blue: "#1B78AF", white: "#FFFFFF", black: "#333333"
  };

  interface ComparativaItem { categoria: string; actual: string; potencial: string; }
  const comparativaData: ComparativaItem[] = [
    { categoria: "Sistema", actual: "Salesforce Data Cloud", potencial: "Propuesta Simbiótica: CRM + SLM integrado" },
    { categoria: "Capacidades", actual: "Centralización de datos, segmentación, automatización básica", potencial: "IA predictiva, personalización avanzada, agentes autónomos" },
    { categoria: "Coste inicial", actual: "461.400€", potencial: "590.000€ (cloud) / 150.000€ (on-premise)" },
    { categoria: "Coste anual", actual: "Licencias + formación", potencial: "250.000€ (tokens cloud) / 30.000€ (on-premise)" },
    { categoria: "Control de datos", actual: "Limitado por políticas del proveedor", potencial: "Total (datos en servidores propios)" },
    { categoria: "Personalización ELE", actual: "Manual (dependiente de editores)", potencial: "Automática por país, región, institución" }
  ];

  // --- Subcomponentes (Contenido Completo) ---

  const RenderActualSection = () => (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
      <div className="w-full md:w-1/2">
        <h3 className="text-lg font-bold mb-3" style={{ color: slide12Colors.coral }}>CRM Salesforce Actual</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start"><span className="text-green-600 mr-2 mt-1">✓</span><span>Centralización de datos y visión 360° del cliente</span></li>
          <li className="flex items-start"><span className="text-green-600 mr-2 mt-1">✓</span><span>Identidad única con Salesforce Identity</span></li>
          <li className="flex items-start"><span className="text-green-600 mr-2 mt-1">✓</span><span>Segmentación avanzada con Marketing Cloud</span></li>
          <li className="flex items-start"><span className="text-green-600 mr-2 mt-1">✓</span><span>Automatización básica de tareas y comunicaciones</span></li>
        </ul>
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="text-lg font-bold" style={{ color: slide12Colors.coral }}>461.400€</div>
          <div className="text-xs text-gray-500">Licencias, implementación y formación</div>
        </div>
        <div className="mt-4 bg-red-50 p-3 rounded-lg border border-red-200">
          <div className="text-sm font-medium mb-2 text-red-700">Limitaciones actuales:</div>
          <ul className="text-xs space-y-1 text-red-600">
            <li className="flex items-start"><span className="font-bold mr-2">✗</span><span>Alto coste por feature adicional</span></li>
            <li className="flex items-start"><span className="font-bold mr-2">✗</span><span>Personalización manual de contenidos ELE</span></li>
            <li className="flex items-start"><span className="font-bold mr-2">✗</span><span>Sin control total sobre datos sensibles</span></li>
            <li className="flex items-start"><span className="font-bold mr-2">✗</span><span>Dependencia de proveedores cloud</span></li>
          </ul>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:pl-6 md:border-l md:border-gray-200 mt-4 md:mt-0">
         <div className="w-full max-w-sm mx-auto">
           <svg width="100%" height="auto" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid meet">
             <rect x="50" y="80" width="300" height="120" rx="10" fill={slide12Colors.coral} fillOpacity="0.2" stroke={slide12Colors.coral} strokeWidth="2" />
             <text x="200" y="110" fontSize="16" fontWeight="bold" textAnchor="middle" fill={slide12Colors.coral}>Sistema CRM Actual</text>
             <circle cx="100" cy="150" r="20" fill="white" stroke={slide12Colors.coral} strokeWidth="1" /><text x="100" y="155" fontSize="16" fontWeight="bold" textAnchor="middle">👤</text>
             <circle cx="160" cy="150" r="20" fill="white" stroke={slide12Colors.coral} strokeWidth="1" /><text x="160" y="155" fontSize="16" fontWeight="bold" textAnchor="middle">📊</text>
             <circle cx="220" cy="150" r="20" fill="white" stroke={slide12Colors.coral} strokeWidth="1" /><text x="220" y="155" fontSize="16" fontWeight="bold" textAnchor="middle">📧</text>
             <circle cx="280" cy="150" r="20" fill="white" stroke={slide12Colors.coral} strokeWidth="1" /><text x="280" y="155" fontSize="16" fontWeight="bold" textAnchor="middle">🔄</text>
             <line x1="120" y1="150" x2="140" y2="150" stroke={slide12Colors.coral} strokeWidth="1" /><line x1="180" y1="150" x2="200" y2="150" stroke={slide12Colors.coral} strokeWidth="1" /><line x1="240" y1="150" x2="260" y2="150" stroke={slide12Colors.coral} strokeWidth="1" />
             <text x="100" y="52" fontSize="12" textAnchor="middle">Servicios Cloud</text><text x="300" y="52" fontSize="12" textAnchor="middle">Tokens AI Externos</text>
             <line x1="100" y1="60" x2="100" y2="80" stroke="#999" strokeDasharray="4,2" /><line x1="300" y1="60" x2="300" y2="80" stroke="#999" strokeDasharray="4,2" />
             <text x="200" y="220" fontSize="11" fontStyle="italic" textAnchor="middle" fill="#666">Dependencia de servicios externos</text><text x="200" y="235" fontSize="11" fontStyle="italic" textAnchor="middle" fill="#666">Personalización manual, costes por consumo</text>
           </svg>
         </div>
      </div>
    </div>
  );

  const RenderPotencialSection = () => (
    <div>
      <h3 className="text-lg font-bold mb-3" style={{ color: slide12Colors.blue }}>Propuesta simbiótica: CRM + SLM integrado</h3>
      <div className="bg-blue-50 p-3 md:p-4 rounded-lg mb-3 md:mb-4 border border-blue-200">
        <div className="text-sm md:text-md font-medium mb-2 text-blue-800">Small Language Model (SLM):</div>
        <p className="text-xs md:text-sm mb-2">Modelo de lenguaje especializado y compacto, entrenado específicamente para el dominio ELE con corpus del Instituto Cervantes y RAE. Optimizado para operar en infraestructura propia con máxima eficiencia.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm md:text-md font-medium mb-2" style={{ color: slide12Colors.blue }}>Capacidades potenciales:</div>
          <ul className="text-xs md:text-sm space-y-1">
            <li className="flex items-start"><span className="mr-2">💡</span><span>IA predictiva y generativa</span></li>
            <li className="flex items-start"><span className="mr-2">💡</span><span>Agentes autónomos (soporte)</span></li>
            <li className="flex items-start"><span className="mr-2">💡</span><span>Education Cloud integrado</span></li>
            <li className="flex items-start"><span className="mr-2">💡</span><span>Personalización omnicanal</span></li>
          </ul>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm md:text-md font-medium mb-2" style={{ color: slide12Colors.blue }}>Ventajas para currículos:</div>
          <ul className="text-xs md:text-sm space-y-1">
            <li className="flex items-start"><span className="mr-2">🔄</span><span>Adaptación por país/región</span></li>
            <li className="flex items-start"><span className="mr-2">🔄</span><span>Soporte a trusts/boards</span></li>
            <li className="flex items-start"><span className="mr-2">🔄</span><span>Versiones IB/Cambridge</span></li>
            <li className="flex items-start"><span className="mr-2">🔄</span><span>Integración MCER/DELE</span></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        <div className="w-full md:w-1/2 bg-gray-50 p-3 rounded-lg">
          <div className="text-sm md:text-md font-medium mb-2">Opción Cloud (Alternativa):</div>
          <div className="flex justify-between items-center mb-1 text-xs md:text-sm"><span >Coste total:</span><span className="font-bold">590.000€</span></div>
          <div className="flex justify-between items-center mb-1 text-xs md:text-sm"><span >Coste anual tokens:</span><span className="font-bold">250.000€</span></div>
          <div className="text-xs text-gray-500 mt-1">Einstein AI, Agentforce, etc.</div>
        </div>
        <div className="w-full md:w-1/2 bg-blue-50 p-3 rounded-lg border border-blue-300">
          <div className="text-sm md:text-md font-medium mb-2 text-blue-800">Opción On-Premise (Recomendada):</div>
          <div className="flex justify-between items-center mb-1 text-xs md:text-sm"><span >Inversión inicial:</span><span className="font-bold">150.000€</span></div>
          <div className="flex justify-between items-center mb-1 text-xs md:text-sm"><span >Mantenimiento anual:</span><span className="font-bold">~30.000€</span></div>
          <div className="text-xs text-gray-500 mt-1">Servidores NVIDIA, equipo técnico.</div>
        </div>
      </div>
    </div>
  );

  const RenderComparativaSection = () => (
    <div>
      <h3 className="text-lg font-bold mb-4" style={{ color: slide12Colors.sand }}>Comparativa CRM Actual vs Propuesta simbiótica</h3>
      <div className="overflow-x-auto mb-4 md:mb-6">
        <table className="w-full text-xs md:text-sm border-collapse">
          <thead> <tr className="bg-gray-100"> <th className="py-2 px-3 text-left font-semibold border-b">Categoría</th> <th className="py-2 px-3 text-left font-semibold border-b" style={{ color: slide12Colors.coral }}>Actual</th> <th className="py-2 px-3 text-left font-semibold border-b" style={{ color: slide12Colors.blue }}>Potencial (SYMBIOSIS)</th> </tr> </thead>
          <tbody> {comparativaData.map((item, index) => ( <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}> <td className="py-2 px-3 font-medium border-b">{item.categoria}</td> <td className="py-2 px-3 border-b">{item.actual}</td> <td className="py-2 px-3 border-b">{item.potencial}</td> </tr> ))} </tbody>
        </table>
      </div>
      <div className="bg-yellow-50 p-3 md:p-4 rounded-lg border border-yellow-200">
        <div className="text-sm md:text-md font-medium mb-2" style={{ color: slide12Colors.sand }}>Métricas de éxito proyectadas (2025)</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          <div className="text-center"> <div className="text-lg md:text-xl font-bold" style={{ color: slide12Colors.sand }}>+35%</div> <div className="text-xs">Retención cursos</div> </div>
          <div className="text-center"> <div className="text-lg md:text-xl font-bold" style={{ color: slide12Colors.sand }}>-70%</div> <div className="text-xs">Tiempo creación</div> </div>
          <div className="text-center"> <div className="text-lg md:text-xl font-bold" style={{ color: slide12Colors.sand }}>96%</div> <div className="text-xs">Precisión DELE</div> </div>
          <div className="text-center"> <div className="text-lg md:text-xl font-bold" style={{ color: slide12Colors.sand }}>12</div> <div className="text-xs">Variedades diatópicas</div> </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full flex flex-col p-3 sm:p-4 md:p-6 overflow-hidden relative" style={{ backgroundColor: slide12Colors.light }}>
      <div className="mb-4 md:mb-6 text-center flex-shrink-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2" style={{ color: slide12Colors.blue }}>Propuesta simbiótica</h1>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1" style={{ color: slide12Colors.mist }}>Ecosistema inteligente de gestión editorial</h2>
        <p className="text-xs sm:text-sm italic mb-2 md:mb-4 text-gray-600">CRM evolucionado + Small Language Model on-premise</p>
      </div>

      <div className="flex-grow flex flex-col bg-white rounded-lg shadow-lg overflow-hidden min-h-0">
          <div className="flex border-b flex-shrink-0">
              <button className={`px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium flex-1 focus:outline-none ${activeSection === 'actual' ? 'bg-gray-100 font-bold border-b-2' : 'hover:bg-gray-50'}`} onClick={() => setActiveSection('actual')} style={{ color: activeSection === 'actual' ? slide12Colors.coral : slide12Colors.black, borderColor: activeSection === 'actual' ? slide12Colors.coral : 'transparent' }}> Lo Actual </button>
              <button className={`px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium flex-1 focus:outline-none ${activeSection === 'potencial' ? 'bg-gray-100 font-bold border-b-2' : 'hover:bg-gray-50'}`} onClick={() => setActiveSection('potencial')} style={{ color: activeSection === 'potencial' ? slide12Colors.blue : slide12Colors.black, borderColor: activeSection === 'potencial' ? slide12Colors.blue : 'transparent' }}> Lo Potencial </button>
              <button className={`px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium flex-1 focus:outline-none ${activeSection === 'comparativa' ? 'bg-gray-100 font-bold border-b-2' : 'hover:bg-gray-50'}`} onClick={() => setActiveSection('comparativa')} style={{ color: activeSection === 'comparativa' ? slide12Colors.sand : slide12Colors.black, borderColor: activeSection === 'comparativa' ? slide12Colors.sand : 'transparent' }}> Comparativa </button>
          </div>
          <div className="p-4 md:p-6 flex-grow overflow-y-auto">
              {activeSection === 'actual' && <RenderActualSection />}
              {activeSection === 'potencial' && <RenderPotencialSection />}
              {activeSection === 'comparativa' && <RenderComparativaSection />}
          </div>
      </div>

      {/* Barra inferior con Conclusión Estratégica (izquierda) y Copyright (derecha) */}
      <div className="w-full mt-3 md:mt-4 flex-shrink-0 flex justify-between items-start"> 
          {/* Conclusión Estratégica (alineada a la izquierda) */}
          <div className="w-3/4 md:w-2/3 lg:w-1/2"> 
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-1 sm:p-2 font-bold text-white text-xs sm:text-sm" style={{ backgroundColor: slide12Colors.blue }}> 
                      Conclusión Estratégica
                  </div>
                  <div className="p-2 sm:p-3"> 
                      <p className="mb-1 sm:mb-2 text-xs leading-snug"> 
                          <strong>Propuesta simbiótica</strong> representa la evolución natural del CRM actual, integrando un SLM especializado
                          en ELE que elimina dependencias externas y genera un retorno de inversión a partir del segundo año. 
                          La implementación on-premise ofrece control total sobre datos sensibles y adaptación curricular 
                          automatizada para las diferentes realidades educativas globales.
                      </p>
                      <div className="flex justify-end mt-1"> 
                          <div className="text-right">
                              <div className="font-medium text-[10px] sm:text-xs">Ahorro proyectado a 3 años:</div> 
                              <div className="text-lg sm:text-xl font-bold" style={{ color: slide12Colors.blue }}>540.000€</div> 
                              <div className="text-[10px] text-gray-500">(comparado con solución cloud)</div> 
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          
          {/* AÑADIDO: Aviso de copyright discreto (alineado a la derecha) */}
          <div className="absolute bottom-7 right-5">
              <div className="text-right" style={{ color: slide12Colors.blue, fontSize: '9px' }}>
                  © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
              </div>
          </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 12
// =======================================================================

// =======================================================================
// DIAPOSITIVA 13: REESCRIBIENDO LA ARQUITECTURA (FUENTES Y PROPUESTA) - CORREGIDO
// =======================================================================
// No se necesitan importaciones adicionales si React (useState, useEffect) ya está en el ámbito.

const Diapositiva13 = () => {
  const [activeCorpus, setActiveCorpus] = useState(1);
  
  // Paleta de colores específica para esta diapositiva
  const slide13Colors = {
    green: "#627D49",
    gold: "#C7954F",
    light: "#EAECF2", // Fondo principal de la diapositiva
    lavender: "#D2C8D8",
    purple: "#B780A2",
    white: "#FFFFFF", // Para fondos de tarjetas
    textSecondary: "#5A5A5A", // Un gris para texto secundario
  };

  interface Fuente {
    id: number;
    title: string;
    description: string;
  }

  interface Inspiracion {
      name: string;
      url: string;
      description: string;
  }

  const fuentesData: Fuente[] = [
    { id: 1, title: "ALIA: IA del Gobierno de España", description: "Corpus lingüístico oficial con enfoque en español y lenguas cooficiales" },
    { id: 2, title: "Plan Curricular Instituto Cervantes", description: "Metadatado estructurado del plan curricular y niveles de referencia para ELE" },
    { id: 3, title: "Colocaciones y combinaciones léxicas", description: "Corpus especializado en colocaciones y combinatoria léxica del español" },
    { id: 4, title: "Gramática de construcciones por nivel", description: "Metadatado de estructuras gramaticales organizadas por niveles MCER (A1-C2)" },
    { id: 5, title: "Fuente adicional integrada", description: "Exámenes DELE y materiales de profesores y estudiantes" }
  ];
  
  // Tipado para el mapa de iconos (Cambiado JSX.Element por React.ReactNode)
  const IconsMap: { [key: number]: () => React.ReactNode } = {
    1: () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect x="3" y="8" width="18" height="12" rx="2" ry="2"></rect> <line x1="10" y1="8" x2="10" y2="20"></line> <line x1="14" y1="8" x2="14" y2="20"></line> <path d="M4 4h16"></path> <path d="M9 4V2"></path> <path d="M15 4V2"></path> </svg> ),
    2: () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path> <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path> </svg> ),
    3: () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <polyline points="4 7 4 4 20 4 20 7"></polyline> <line x1="9" y1="20" x2="15" y2="20"></line> <line x1="12" y1="4" x2="12" y2="20"></line> </svg> ),
    4: () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M3 3v18h18"></path> <path d="M7 12v5"></path> <path d="M11 6v11"></path> <path d="M15 10v7"></path> <path d="M19 5v13"></path> </svg> ),
    5: () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path> <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect> </svg> )
  };

  const inspiraciónDigital: Inspiracion[] = [
    { name: "Hachette FLE", url: "https://www.ehachettefle.com/", description: "Plataforma integral para libros digitales de francés como lengua extranjera" },
    { name: "Klett Sprachen", url: "https://www.klett-sprachen.de/deutsch-als-fremdsprache/c-18", description: "Soluciones digitales para la enseñanza del alemán como lengua extranjera" },
    { name: "Klett Digitales", url: "https://www.klett-sprachen.de/digitales/c-4499", description: "Innovaciones digitales para el aprendizaje de idiomas" }
  ];

  // Subcomponente para el contenido dinámico
  const RenderActiveContent = () => {
    const activeData = fuentesData.find(f => f.id === activeCorpus);
    if (!activeData) return null;

    // Estilos base para las tarjetas de contenido
    const cardStyle = { backgroundColor: `${slide13Colors.lavender}20`, color: slide13Colors.green }; // Fondo lavanda muy sutil
    const textStyle = { color: slide13Colors.green };
    const headingStyle = { color: slide13Colors.purple };

    switch(activeCorpus) {
      case 1: return (
        <div className="p-4 md:p-6 rounded-lg text-left text-sm md:text-base" style={cardStyle}>
          <p className="mb-3" style={textStyle}>ALIA es una familia de modelos de IA del Gobierno de España que incluye modelos de lenguaje entrenados con datos en español y en las lenguas cooficiales.</p>
          <p style={textStyle}>Coordinado por el Barcelona Supercomputing Center (BSC-CNS), forma parte de la Estrategia de IA 2024.</p>
        </div> );
      case 2: return (
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(nivel => (
            <div key={nivel} className="px-2 py-3 md:px-4 md:py-6 rounded-lg text-center font-light" style={{ backgroundColor: `${slide13Colors.lavender}20` }}>
              <span className={`text-lg md:text-2xl font-semibold ${ nivel.startsWith('A') ? 'text-green-700' : nivel.startsWith('B') ? 'text-yellow-700' : 'text-purple-700' }`}>{nivel}</span>
            </div> ))}
        </div> );
      case 3: return (
        <div className="p-4 md:p-6 rounded-lg text-left text-sm md:text-base" style={cardStyle}>
          <dl className="space-y-3">
            <div> <dt className="font-medium" style={headingStyle}>Colocaciones:</dt> <dd className="ml-4" style={textStyle}>Combinaciones frecuentes de palabras.</dd> </div>
            <div> <dt className="font-medium" style={headingStyle}>Fraseología:</dt> <dd className="ml-4" style={textStyle}>Expresiones idiomáticas y modismos.</dd> </div>
            <div> <dt className="font-medium" style={headingStyle}>Registro:</dt> <dd className="ml-4" style={textStyle}>Clasificación por contextos de uso.</dd> </div>
          </dl>
        </div> );
      case 4: return (
        <div className="p-4 md:p-6 rounded-lg text-left font-mono text-xs md:text-sm" style={cardStyle}>
          <pre className="whitespace-pre-wrap" style={textStyle}>
{`{
  "nivel": "A1",
  "construcción": "querer + infinitivo",
  "ejemplo": "Quiero aprender español",
  "frecuencia": "alta",
  "prioridad": 1
}`}
          </pre>
        </div> );
      case 5: return (
        <div className="p-4 md:p-6 rounded-lg text-left text-sm md:text-base" style={cardStyle}>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full mr-2" style={{ backgroundColor: slide13Colors.lavender }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={slide13Colors.purple} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span> <span style={textStyle}>Exámenes DELE (todos los niveles)</span>
            </li>
            <li className="flex items-center">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full mr-2" style={{ backgroundColor: slide13Colors.lavender }}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={slide13Colors.purple} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span> <span style={textStyle}>Materiales de profesores y estudiantes</span>
            </li>
          </ul>
        </div> );
      default: return null;
    }
  };

  const activeFuente = fuentesData.find(f => f.id === activeCorpus);

  return (
    <div className="h-screen w-full flex flex-col p-4 sm:p-6 md:p-8 overflow-hidden relative" style={{ backgroundColor: slide13Colors.light }}>
      {/* Encabezado */}
      <div className="mb-6 md:mb-8 text-center flex-shrink-0">
        <h1 className="text-3xl sm:text-4xl font-light mb-2 sm:mb-3" style={{ color: slide13Colors.green }}>
          Reescribiendo la arquitectura
        </h1>
        <h2 className="text-lg sm:text-xl font-light" style={{ color: slide13Colors.gold }}>
          Una propuesta estratégica para el mercado ELE
        </h2>
      </div>

      {/* Contenedor Principal con Scroll */}
      <div className="flex-grow flex flex-col overflow-y-auto min-h-0 pr-2"> {/* Scroll aplicado aquí */}
        
        {/* Fuentes de Alimentación */}
        <div className="bg-white rounded-lg mb-8 md:mb-12 shadow-sm border border-gray-100 p-4 md:p-6">
          <h3 className="text-xl sm:text-2xl font-light mb-6 text-center" style={{ color: slide13Colors.green }}>
            Fuentes de alimentación
          </h3>
          <div className="flex justify-center flex-wrap gap-2 mb-6 md:mb-8">
            {fuentesData.map(fuente => (
              <button
                key={fuente.id}
                className="p-2 sm:p-3 rounded-full transition-all border hover:shadow-md"
                style={{ 
                  backgroundColor: activeCorpus === fuente.id ? slide13Colors.lavender : slide13Colors.white,
                  borderColor: activeCorpus === fuente.id ? slide13Colors.purple : slide13Colors.lavender,
                }}
                onClick={() => setActiveCorpus(fuente.id)}
                aria-label={fuente.title} // Accesibilidad
              >
                <span style={{ color: activeCorpus === fuente.id ? slide13Colors.purple : slide13Colors.gold }}>
                  {IconsMap[fuente.id]()}
                </span>
              </button>
            ))}
          </div>
          
          {activeFuente && (
            <div className="max-w-3xl mx-auto text-center px-2 sm:px-4 pb-4 md:pb-6">
              <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ color: slide13Colors.purple }}>
                {activeFuente.title}
              </h4>
              <p className="text-sm sm:text-base mb-4 sm:mb-6" style={{ color: slide13Colors.textSecondary }}>
                {activeFuente.description}
              </p>
              <RenderActiveContent />
            </div>
          )}
        </div>
        
        {/* Propuesta de Arquitectura Editorial */}
        <div className="w-full mb-8 md:mb-12">
          <h3 className="text-xl sm:text-2xl font-light mb-6 md:mb-8 text-center" style={{ color: slide13Colors.green }}>
            Inspiración: Arquitectura editorial digital
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {inspiraciónDigital.map((plataforma, idx) => (
              <div 
                key={idx} 
                className="bg-white border rounded-lg overflow-hidden hover:shadow-sm transition-shadow p-4 md:p-6"
                style={{ borderColor: slide13Colors.lavender }}
              >
                <h4 className="text-base sm:text-lg font-medium mb-2" style={{ color: slide13Colors.purple }}>{plataforma.name}</h4>
                <p className="mb-3 text-xs sm:text-sm" style={{ color: slide13Colors.textSecondary }}>{plataforma.description}</p>
                <a 
                  href={plataforma.url} // Usar la URL real
                  target="_blank" // Abrir en nueva pestaña
                  rel="noopener noreferrer" // Seguridad
                  className="text-xs sm:text-sm hover:underline block truncate" // Truncate si es muy larga
                  style={{ color: slide13Colors.gold }}
                >
                  {plataforma.url.replace(/^https?:\/\//, '')} {/* Quitar http(s):// */}
                </a>
              </div>
            ))}
          </div>
        </div>
        
        {/* Conclusión */}
        <div className="w-full mt-auto text-center pt-6"> {/* mt-auto para empujar al fondo si hay espacio */}
          <h3 className="text-lg sm:text-xl font-light mb-3 sm:mb-4" style={{ color: slide13Colors.purple }}>
            Hacia una nueva integración de soluciones
          </h3>
          <p className="max-w-2xl mx-auto text-sm sm:text-base" style={{ color: slide13Colors.green }}>
            La combinación de fuentes de alimentación especializadas con arquitecturas editoriales 
            inspiradas en plataformas digitales de vanguardia permite crear materiales ELE 
            adaptados a las necesidades actuales del mercado.
          </p>
        </div>
      </div> {/* Fin del contenedor con scroll */}

      {/* AÑADIDO: Aviso de copyright discreto */}
      <div className="absolute bottom-7 left-0 right-0 flex justify-center">
        <div className="text-center" style={{ color: slide13Colors.purple, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 13
// =======================================================================

// =======================================================================
// DIAPOSITIVA 14: UN MILLÓN DE DATOS (ESTRUCTURA MODULAR LIA)
// =======================================================================
// No se necesita importar 'lucide-react'. Se asume que React (useState) está disponible.

const Diapositiva14 = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const slide14Colors = {
    primary: '#42373D',
    secondary: '#9A7EA6',
    tertiary: '#C4889F',
    quaternary: '#F8B2A1',
    accent: '#FDE2B1',
    background: '#FFFAF0',
    white: '#FFFFFF',
    textSecondary: '#5A5A5A',
  };

  interface Module {
      id: string;
      name: string;
      description: string;
      color: string;
      elements: string[];
  }

  const modules: Module[] = [
    { id: 'context', name: 'Módulo de Contexto', description: 'Se alimenta de la información del contexto de aprendizaje', color: slide14Colors.primary, elements: [ 'Caracterización por generaciones (beta, alpha, zeta, millennials)', 'Cantidad de estudiantes por clase', 'Grado escolar', 'Tipo de curso', 'Unidad del curso', 'Lección', 'Objetivos lingüísticos' ] },
    { id: 'linguistic', name: 'Módulo Lingüístico', description: 'Desarrolla dos unidades de análisis: carga léxico semántica y variación pragmático gramatical', color: slide14Colors.secondary, elements: [ 'Componentes del Plan Curricular', 'Volumen complementario del MCERL', 'Gramática de las construcciones por nivel', 'Colocaciones y combinaciones léxicas por nivel', 'Destrezas de la lengua', 'Tipología de inputs', 'Tipos de enfoques o configuraciones de unidades didácticas' ] },
    { id: 'pedagogical', name: 'Módulo Pedagógico', description: 'Enfoque y estrategias para la enseñanza eficaz', color: slide14Colors.tertiary, elements: [ 'Tipos de actividades', 'Dinámicas de grupo', 'Estructura de las lecciones', 'Modelos de diseño instruccional', 'Tipología de evaluaciones', 'Tipos de enfoques o configuraciones' ] },
    { id: 'research', name: 'Módulo Investigativo', description: 'Base científica y actualización continua', color: slide14Colors.quaternary, elements: [ 'Investigaciones académicas', 'Estudios de campo', 'Análisis estadístico', 'Validación metodológica', 'Retroalimentación del usuario' ] }
  ];

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(prevModule => prevModule === moduleId ? null : moduleId);
  };

  // Icono SVG simple para el chevron
  const ChevronIcon = ({ color = "currentColor", size = 20, className = "" }: { color?: string, size?: number, className?: string }) => (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
      >
          <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
  );


  return (
    <div className="h-screen w-full flex flex-col p-4 sm:p-6 md:p-8 overflow-hidden relative" style={{ backgroundColor: slide14Colors.background }}>
      <div className="mb-6 md:mb-8 text-center flex-shrink-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2" style={{ color: slide14Colors.primary }}>
          Un millón de datos
        </h1>
      </div>

      <div className="flex-grow overflow-y-auto min-h-0 pr-2">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 md:mb-6" style={{ color: slide14Colors.primary }}>Estructura Modular de LIA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {modules.map((module) => (
            <div key={module.id} className="mb-2 sm:mb-4">
              <div
                className="bg-white p-3 sm:p-4 rounded-lg shadow-md cursor-pointer flex items-center justify-between transition-shadow hover:shadow-lg"
                style={{ borderLeft: `5px solid ${module.color}` }}
                onClick={() => handleModuleClick(module.id)}
                role="button"
                aria-expanded={activeModule === module.id}
                aria-controls={`module-content-${module.id}`}
              >
                <div className="flex-grow pr-2">
                  <h3 className="text-base sm:text-lg font-bold" style={{ color: module.color }}>{module.name}</h3>
                  <p className="text-xs sm:text-sm" style={{ color: slide14Colors.textSecondary }}>{module.description}</p>
                </div>
                <div className="flex-shrink-0">
                    {/* Reemplazo de ArrowRight por ChevronIcon */}
                    <ChevronIcon
                      size={20}
                      color={module.color}
                      className={`transform transition-transform duration-300 ${activeModule === module.id ? 'rotate-90' : 'rotate-0'}`}
                    />
                </div>
              </div>
              
              <div
                id={`module-content-${module.id}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${activeModule === module.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                 {activeModule === module.id && (
                    <div className="bg-white p-3 sm:p-4 mt-0 border-t border-gray-100 ml-1.5 rounded-b-lg shadow-inner">
                      <ul className="list-disc pl-4 sm:pl-5 space-y-1">
                        {module.elements.map((element, idx) => (
                          <li key={idx} className="text-xs sm:text-sm" style={{ color: slide14Colors.textSecondary }}>{element}</li>
                        ))}
                      </ul>
                    </div>
                 )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AÑADIDO: Aviso de copyright discreto */}
      <div className="absolute bottom-7 left-0 right-0 flex justify-center">
        <div className="text-center" style={{ color: slide14Colors.secondary, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 14
// =======================================================================

// =======================================================================
// DIAPOSITIVA 15: ESTOS SOMOS NOSOTROS (AGENTES LIA) - CORREGIDO
// =======================================================================
// No se necesitan importaciones adicionales si React (useState) ya está en el ámbito.

const Diapositiva15 = () => {
  // Paleta de colores específica para esta diapositiva
  const slide15Colors = {
    darkOlive: '#3A3920',
    olive: '#807622',
    gold: '#EAA724',
    copper: '#D25B01',
    brown: '#5B1C02',
    white: '#FFFFFF',
    offWhite: '#F8F7F2', // Fondo de tarjetas inactivas
    black: '#1E1E1E',   // Texto principal
    background: '#FFFAF0' // Fondo crema suave general
  };

  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  interface Agent {
    id: string;
    name: string;
    description: string;
    color: string;
    icon: React.ReactNode; // Cambiado de JSX.Element a React.ReactNode
  }

  const agents: Agent[] = [
    { id: 'evalia', name: 'EVALIA', description: 'Test diagnóstico y evaluación personalizada', color: slide15Colors.darkOlive, icon: ( <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> {/* Reducido tamaño icono */} <path d="M20 16H44M20 32H44M20 48H32" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <path d="M12 16L16 12L20 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/> <path d="M12 32H16V36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/> <path d="M12 48L16 44L12 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/> <circle cx="50" cy="48" r="6" stroke="currentColor" strokeWidth="3"/> <path d="M53 48L49 48L49 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/> </svg> ) },
    { id: 'gracia', name: 'GracIA', description: 'Creación de lecciones fundamentadas en situaciones comunicativas, pragmática y gramática de las construcciones', color: slide15Colors.olive, icon: ( <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16 48C16 41.373 21.373 36 28 36H36C42.627 36 48 41.373 48 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <circle cx="32" cy="24" r="12" stroke="currentColor" strokeWidth="3"/> <path d="M42 16L44 14M44 14L46 12M44 14L42 12M44 14L46 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/> <path d="M22 20V28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <path d="M26 24H18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <path d="M38 24H46" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> </svg> ) },
    { id: 'megaplan', name: 'MEGAPLAN', description: 'Creación de lecciones accesibles y gamificadas', color: slide15Colors.gold, icon: ( <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="12" y="12" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="3"/> <path d="M12 26H52" stroke="currentColor" strokeWidth="3"/> <path d="M26 26V52" stroke="currentColor" strokeWidth="3"/> <path d="M22 19L18 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <path d="M32 19L28 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <path d="M42 19L38 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <path d="M46 19H46.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <path d="M18 39L22 35L18 31" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/> <path d="M36 39H42" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <circle cx="39" cy="46" r="3" stroke="currentColor" strokeWidth="3"/> </svg> ) },
    { id: 'psicodelea', name: 'PsicodeLIA', description: 'Configuración de avatares con sustrato psicológico para el aprendizaje de lenguas desarrollado con el modelo OCEAN (Big five)', color: slide15Colors.copper, icon: ( <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="32" cy="20" r="8" stroke="currentColor" strokeWidth="3"/> <path d="M24 42C24 38.686 27.582 36 32 36C36.418 36 40 38.686 40 42" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <path d="M20 28C13.373 28 8 33.373 8 40C8 46.627 13.373 52 20 52M44 28C50.627 28 56 33.373 56 40C56 46.627 50.627 52 44 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <path d="M20 36V44" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <path d="M16 40H24" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <path d="M44 36V44" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <path d="M40 40H48" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> </svg> ) },
    { id: 'sia', name: 'SIA', description: 'Sistema de inteligencia artificial asertiva: agente orientativo psicológico pensado como acompañante del profesorado', color: slide15Colors.brown, icon: ( <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 24C20 17.373 25.373 12 32 12C38.627 12 44 17.373 44 24V32C44 38.627 38.627 44 32 44C25.373 44 20 38.627 20 32V24Z" stroke="currentColor" strokeWidth="3"/> <path d="M32 44V52" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <path d="M24 52H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <circle cx="26" cy="28" r="2" fill="currentColor"/> <circle cx="38" cy="28" r="2" fill="currentColor"/> <path d="M26 36C28 38 34 38 38 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <path d="M44 24H48C50.2091 24 52 25.7909 52 28V28C52 30.2091 50.2091 32 48 32H44" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> <path d="M20 24H16C13.7909 24 12 25.7909 12 28V28C12 30.2091 13.7909 32 16 32H20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> </svg> ) }
  ];

  return (
    <div className="h-screen w-full flex flex-col p-4 sm:p-6 md:p-8 overflow-hidden font-sans relative" style={{ backgroundColor: slide15Colors.background }}>
      {/* Encabezado */}
      <div className="flex flex-col items-center justify-center mb-6 md:mb-8 flex-shrink-0">
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 text-center"
          style={{ color: slide15Colors.brown }}
        >
          Estos somos nosotros
        </h1>
        <h2 
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 md:mb-4 text-center" /* Cambiado a font-semibold */
          style={{ color: slide15Colors.gold }}
        >
          Los agentes de LIA
        </h2>
      </div>

      {/* Contenedor de agentes */}
      <div className="flex-grow flex items-center justify-center overflow-y-auto min-h-0"> {/* Centrado vertical y scroll si es necesario */}
        {/* Ajuste de grid para diferentes pantallas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl w-full">
          {agents.map((agent) => (
            <div 
              key={agent.id}
              className={`flex flex-col items-center justify-start transition-all duration-300 transform rounded-lg p-3 sm:p-4 cursor-pointer aspect-w-1 aspect-h-1`} // aspect ratio para mantener forma cuadrada
              style={{ 
                backgroundColor: hoveredAgent === agent.id ? agent.color : slide15Colors.offWhite,
                color: hoveredAgent === agent.id ? slide15Colors.white : agent.color,
                boxShadow: hoveredAgent === agent.id ? `0 8px 20px ${agent.color}50` : `0 4px 6px rgba(0,0,0,0.05)`, // Sombra más pronunciada al hacer hover
                transform: hoveredAgent === agent.id ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)', // Efecto hover mejorado
              }}
              onMouseEnter={() => setHoveredAgent(agent.id)}
              onMouseLeave={() => setHoveredAgent(null)}
            >
              {/* Icono */}
              <div
                className="p-3 sm:p-4 rounded-full mb-3 sm:mb-4 transition-colors duration-300 mt-2 flex-shrink-0" // mt para separar del borde superior
                style={{ 
                  backgroundColor: hoveredAgent === agent.id ? slide15Colors.white : agent.color,
                  color: hoveredAgent === agent.id ? agent.color : slide15Colors.white,
                }}
              >
                {agent.icon}
              </div>
              
              {/* Nombre */}
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-center mb-1 sm:mb-2 flex-shrink-0">
                {agent.name}
              </h3>
              
              {/* Descripción (con scroll interno si es muy larga) */}
              <div className="text-xs sm:text-sm text-center flex-grow overflow-y-auto px-1 w-full"> {/* Scroll para descripción larga */}
                <p>
                  {agent.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Pie de diapositiva */}
      <div className="mt-4 md:mt-6 text-center flex-shrink-0">
        <p className="text-base sm:text-lg font-semibold italic" style={{ color: slide15Colors.darkOlive }}>
          "El mayor espectáculo en innovación educativa"
        </p>
      </div>

      {/* AÑADIDO: Aviso de copyright discreto */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center">
        <div className="text-center" style={{ color: slide15Colors.darkOlive, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 15
// =======================================================================
// =======================================================================
// DIAPOSITIVA 16: COBRANDO VIDA (AGENTES EVALIA Y PSICODELIA)
// =======================================================================
const Diapositiva16 = () => {
  const [activeTab, setActiveTab] = useState<'evalia' | 'psicodelia'>('evalia');
  const [activeTestType, setActiveTestType] = useState('rapido');
  const [activeOceanTrait, setActiveOceanTrait] = useState('o');

  const slide16Colors = {
    darkOlive: '#3A3920', olive: '#807622', gold: '#C7954F', copper: '#D25B01',
    brown: '#5B1C02', white: '#FFFFFF', offWhite: '#F8F7F2', black: '#1E1E1E',
    background: '#FFFAF0', evalia: '#3A3920', psicodelia: '#D25B01',
  };

  // --- Interfaces (como antes) ---
  interface OceanTrait { id: string; name: string; nameEs: string; color: string; description: string; example: string; low: string; high: string; textSample: string; }
  interface EvaliaTestLevel { level: string; minScore: string; maxScore: string; action: string; }
  interface EvaliaTestType { id: string; name: string; price: string; features: string[]; }
  interface PsicodeliaProfile { name: string; traits: { [key: string]: string }; description: string; teachingApproach: string; }

  // --- Datos (Completos) ---
  const oceanTraits: OceanTrait[] = [
    { id: 'o', name: 'Openness', nameEs: 'Apertura a la experiencia', color: '#627D49', description: 'Aprecio por el arte, la emoción, las ideas inusuales, la imaginación, la curiosidad y variedad de experiencias.', example: '', low: 'Convencional, prefiere lo familiar', high: 'Inventivo, curioso, valora experiencias nuevas', textSample: 'Me encanta explorar nuevas ideas y conceptos. Siempre estoy buscando formas innovadoras de enseñar español, incorporando actividades creativas que conecten con diferentes culturas...' },
    { id: 'c', name: 'Conscientiousness', nameEs: 'Responsabilidad', color: '#C7954F', description: 'Tendencia a mostrar autodisciplina, actuar responsablemente y preferir comportamientos planificados.', example: '', low: 'Impulsivo, desorganizado', high: 'Disciplinado, eficiente, organizado', textSample: 'Siempre organizo mis clases con anticipación, preparando materiales detallados y estableciendo objetivos claros para cada sesión. Soy meticuloso con las evaluaciones...' },
    { id: 'e', name: 'Extraversion', nameEs: 'Extraversión', color: '#807622', /* Color Oliva */ description: 'Energía, emociones positivas, tendencia a buscar estimulación y compañía de otros.', example: '', low: 'Reservado, reflexivo, prefiere estar solo', high: 'Sociable, asertivo, busca interacción', textSample: 'Disfruto enormemente de las clases donde puedo interactuar activamente con mis alumnos. Las actividades grupales y los debates en clase me llenan de energía...' },
    { id: 'a', name: 'Agreeableness', nameEs: 'Amabilidad', color: '#B4C6D0', /* Color Mist */ description: 'Tendencia a ser compasivo y cooperativo en lugar de suspicaz y antagonista hacia los demás.', example: '', low: 'Crítico, competitivo', high: 'Empático, cooperativo, confiado', textSample: 'Siempre busco entender las dificultades particulares de cada estudiante y adaptar mi enfoque para ayudarles mejor. Ofrezco tiempo adicional a quienes lo necesitan...' },
    { id: 'n', name: 'Neuroticism', nameEs: 'Neuroticismo', color: '#B780A2', /* Color Purple */ description: 'Tendencia a experimentar emociones negativas como ansiedad, ira o depresión con facilidad.', example: '', low: 'Calmado, emocionalmente estable', high: 'Sensible, nervioso, propenso a la preocupación', textSample: 'Me preocupa constantemente si estoy llegando a todos mis estudiantes de manera efectiva. Antes de las evaluaciones, suelo sentir ansiedad...' }
  ];
  const evaliaTestLevels: EvaliaTestLevel[] = [
    { level: 'A1', minScore: '0%', maxScore: '50%', action: 'Está dentro del nivel A1 más básico / grupo de A1' }, { level: 'A1', minScore: '50%', maxScore: '80%', action: 'Está dentro del nivel A1.2 umbral, realizar prueba escrita' }, { level: 'A1', minScore: '80%', maxScore: '100%', action: 'Pasa al nivel A2' },
    { level: 'A2', minScore: '0%', maxScore: '50%', action: 'Está dentro del nivel A2.1 más básico / grupo de A2' }, { level: 'A2', minScore: '50%', maxScore: '70%', action: 'Está dentro del nivel A2.1 básico, realizar prueba escrita' }, { level: 'A2', minScore: '71%', maxScore: '85%', action: 'Está dentro del nivel A2.2, realizar prueba escrita y oral' }, { level: 'A2', minScore: '85%', maxScore: '100%', action: 'Salta al nivel B1' },
    { level: 'B1', minScore: '0%', maxScore: '70%', action: 'Está dentro del nivel B1 más básico / grupo de B1' }, { level: 'B1', minScore: '71%', maxScore: '84%', action: 'Está en el nivel B1.1, puede realizar prueba' }, { level: 'B1', minScore: '85%', maxScore: '89%', action: 'Está en el nivel B1.2, realizar prueba escrita y oral' }, { level: 'B1', minScore: '90%', maxScore: '100%', action: 'Salta al nivel B2' },
    { level: 'B2', minScore: '0%', maxScore: '60%', action: 'Está dentro del nivel B2 más básico / grupo de B2' }, { level: 'B2', minScore: '60%', maxScore: '74%', action: 'Está en el nivel B2.1, puede realizar prueba' }, { level: 'B2', minScore: '75%', maxScore: '79%', action: 'Está en el nivel B2.2, realizar prueba escrita y oral' }, { level: 'B2', minScore: '80%', maxScore: '100%', action: 'Pasa al test nivel C1' },
    { level: 'C1', minScore: '0%', maxScore: '60%', action: 'Está dentro del nivel C1 más básico / grupo de C1' }, { level: 'C1', minScore: '60%', maxScore: '74%', action: 'Está en el nivel C1.1, puede realizar prueba' }, { level: 'C1', minScore: '75%', maxScore: '79%', action: 'Está en el nivel C1, realizar prueba escrita y oral' }, { level: 'C1', minScore: '80%', maxScore: '100%', action: 'Está dentro del nivel C1' }
  ];
  const evaliaTestTypes: EvaliaTestType[] = [
    { id: 'rapido', name: 'Test Rápido (MVP)', price: 'Gratuito/Pago opcional', features: ['16 preguntas/nivel (A1-C1)', 'Test gramatical cerrado', 'Producción opcional', 'Retroalimentación IA', 'Prueba oral opcional (5€)', 'Lector inmersivo'] },
    { id: 'completo', name: 'Test Completo', price: '5€ / 7.5€ (Pack)', features: ['20 preguntas/nivel (A2.1+)', '4 módulos (lectura, escucha, gramática, conversación)', 'Oral opcional (grabado/profesor)', 'Avance/retroceso dinámico', 'Gratuito para inscritos'] },
    { id: 'interactivo', name: 'Test Interactivo', price: 'Gratuito / 5€ (oral)', features: ['Chatbot conversacional', 'Adaptativo por nivel', 'Termina tras 4 fallos', 'Generación de contenido IA', 'Análisis en tiempo real', 'Uso para entrenamiento IA'] },
    { id: 'enrolado', name: 'Test Interactivo Enrolado', price: 'Pago (como completo)', features: ['Chatbot asume rol (amigo, profesional, evaluador)', 'Adaptado a motivación', 'Conversación adaptativa', 'Generación contenido IA', 'Evaluación personalizada'] }
  ];
  const psicodeliaPerfils: PsicodeliaProfile[] = [
    { name: 'Perfil Explorador', traits: { openness: 'Alto', conscientiousness: 'Medio', extraversion: 'Alto', agreeableness: 'Medio', neuroticism: 'Bajo' }, description: 'Ideal para estudiantes curiosos que disfrutan explorando nuevas ideas.', teachingApproach: 'Material diverso, desafíos creativos.' },
    { name: 'Perfil Estructurado', traits: { openness: 'Medio', conscientiousness: 'Alto', extraversion: 'Bajo', agreeableness: 'Medio', neuroticism: 'Bajo' }, description: 'Adecuado para estudiantes metódicos que prefieren rutinas claras.', teachingApproach: 'Planes detallados, evaluación consistente.' },
    { name: 'Perfil Colaborativo', traits: { openness: 'Medio', conscientiousness: 'Medio', extraversion: 'Alto', agreeableness: 'Alto', neuroticism: 'Bajo' }, description: 'Óptimo para estudiantes que aprenden mejor en entornos sociales.', teachingApproach: 'Debates grupales, proyectos colaborativos.' }
  ];


  // --- Definición de renderTestTypeContent ---
  const RenderTestTypeContent = () => { // Cambiado a componente para claridad
    const selectedTest = evaliaTestTypes.find(test => test.id === activeTestType);
    if (!selectedTest) return null;
    return (
      <div className="p-3 md:p-4 rounded-lg mt-2" style={{ backgroundColor: `${slide16Colors.evalia}10` }}>
        <h5 className="font-semibold text-sm md:text-base mb-2">{selectedTest.name}</h5>
        <p className="mb-2 text-xs md:text-sm"><strong>Precio:</strong> {selectedTest.price}</p>
        <div>
          <strong className="text-xs md:text-sm">Características:</strong>
          <ul className="list-disc pl-4 mt-1 space-y-1 text-xs md:text-sm">
            {selectedTest.features.map((feature, index) => ( <li key={index}>{feature}</li> ))}
          </ul>
        </div>
      </div>
    );
  };

  // --- Subcomponentes con Contenido Completo ---

  const RenderEvaliaContent = () => (
    <div className="p-4 md:p-6 rounded-lg" style={{ backgroundColor: slide16Colors.offWhite, color: slide16Colors.evalia }}>
      <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">EVALIA: Sistema de Test Diagnóstico</h3>
      
      {/* Sección Tipos de Test (Restaurada) */}
      <div className="mb-4 md:mb-6">
        <h4 className="text-lg md:text-xl font-semibold mb-3 text-center md:text-left">Tipos de Test de Nivel</h4>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {evaliaTestTypes.map(test => (
            <button key={test.id} className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded focus:outline-none ${activeTestType === test.id ? 'text-white' : 'text-gray-700'}`}
                    style={{ backgroundColor: activeTestType === test.id ? slide16Colors.evalia : `${slide16Colors.evalia}15`, borderColor: slide16Colors.evalia, borderWidth: '1px' }}
                    onClick={() => setActiveTestType(test.id)}>
              {test.name.split('(')[0].trim()}
            </button>
          ))}
        </div>
        {/* Renderiza el contenido del test activo */}
        <RenderTestTypeContent /> 
      </div>

      {/* Sección Criterios de Evaluación (Restaurada) */}
      <div className="overflow-x-auto mt-4 md:mt-6">
        <h4 className="text-lg md:text-xl font-semibold mb-3 text-center md:text-left">Criterios de Evaluación por Nivel</h4>
        <table className="min-w-full bg-white text-xs md:text-sm">
          <thead> 
            <tr className="bg-gray-100"> 
              <th className="py-2 px-3 border-b text-left">Nivel</th> 
              <th className="py-2 px-3 border-b text-left">Puntuación</th> 
              <th className="py-2 px-3 border-b text-left">Acción</th> 
            </tr> 
          </thead>
          <tbody> 
            {evaliaTestLevels.map((item, index) => ( 
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}> 
                <td className="py-1.5 px-3 border-b">{item.level}</td> 
                <td className="py-1.5 px-3 border-b">{item.minScore} - {item.maxScore}</td> 
                <td className="py-1.5 px-3 border-b">{item.action}</td> 
              </tr> 
            ))} 
          </tbody>
        </table>
      </div>
    </div>
  );

  const RenderPsicodeliaContent = () => (
    <div className="p-4 md:p-6 rounded-lg" style={{ backgroundColor: slide16Colors.offWhite, color: slide16Colors.psicodelia }}>
      <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">PsicodeLIA: Avatares con Sustrato Psicológico</h3>
      
      {/* Sección OCEAN (Restaurada) */}
      <div className="mb-4 md:mb-6">
        <h4 className="text-lg md:text-xl font-semibold mb-3 text-center md:text-left">Modelo OCEAN / Big Five</h4>
        <p className="mb-3 text-xs md:text-sm">Analiza la personalidad en cinco dimensiones para crear perfiles de aprendizaje personalizados.</p>
        <div className="flex justify-center mb-4">
          <div className="inline-flex rounded-md shadow-sm bg-white border border-gray-200">
            {oceanTraits.map(trait => (
              <button key={trait.id} className={`px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium focus:outline-none ${activeOceanTrait === trait.id ? 'text-white' : 'text-gray-700'} ${ trait.id === 'o' ? 'rounded-l-md' : trait.id === 'n' ? 'rounded-r-md' : '' }`}
                      style={{ backgroundColor: activeOceanTrait === trait.id ? trait.color : slide16Colors.white, borderColor: trait.color, borderRightWidth: trait.id === 'n' ? '1px' : '0', borderLeftWidth: '1px', borderTopWidth: '1px', borderBottomWidth: '1px' }}
                      onClick={() => setActiveOceanTrait(trait.id)}>
                {trait.name[0].toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        {(() => { // IIFE para renderizar el trait activo
          const trait = oceanTraits.find(t => t.id === activeOceanTrait);
          if (!trait) return null;
          return (
            <div className="p-3 md:p-4 rounded-lg" style={{ backgroundColor: `${slide16Colors.psicodelia}10`, borderLeft: `4px solid ${trait.color}` }}>
              <div className="flex flex-col sm:flex-row justify-between mb-3">
                <div>
                  <h5 className="font-semibold text-sm md:text-base mb-1">{trait.nameEs} ({trait.name})</h5>
                  <p className="text-xs md:text-sm italic mb-2">{trait.description}</p>
                </div>
                <div className="sm:ml-4 mt-2 sm:mt-0 flex-shrink-0">
                  <div className="bg-white p-2 rounded shadow-sm text-center w-full sm:w-auto"> {/* Ajuste de ancho */}
                    <div className="text-xs font-medium mb-1">Escala:</div>
                    <div className="flex justify-between mb-1 gap-2"><span className="text-xs">{trait.low}</span><span className="text-xs">{trait.high}</span></div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full"><div className="h-1.5 rounded-full" style={{ width: '70%', backgroundColor: trait.color }}></div></div>
                  </div>
                </div>
              </div>
              <div>
                <h6 className="font-semibold text-xs md:text-sm mb-1">Ejemplo de texto (Alto {trait.nameEs}):</h6>
                <div className="bg-white p-2 rounded shadow-sm"><p className="italic text-xs md:text-sm" style={{ color: slide16Colors.psicodelia }}>"{trait.textSample}"</p></div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Sección Perfiles de Aprendizaje (Restaurada) */}
       <div className="mb-6">
        <h4 className="text-lg md:text-xl font-semibold mb-3">Perfiles de Aprendizaje Según OCEAN</h4>
        <div className="space-y-4">
          {psicodeliaPerfils.map((profile, index) => (
            <div 
              key={index} 
              className="p-3 md:p-4 rounded-lg border"
              style={{ borderColor: 'rgba(210, 91, 1, 0.3)' }} // Borde Cobre sutil
            >
              <h5 className="font-semibold text-sm md:text-base mb-2">{profile.name}</h5>
              <div className="mb-2 grid grid-cols-5 gap-1"> {/* Reducido gap */}
                {Object.entries(profile.traits).map(([traitKey, level]) => {
                   const traitInfo = oceanTraits.find(t => t.id === traitKey[0].toLowerCase());
                   return (
                     <div key={traitKey} className="text-center">
                       <div 
                         className="h-5 w-5 rounded-full mx-auto mb-0.5" // Tamaño reducido
                         style={{ 
                           backgroundColor: traitInfo?.color || slide16Colors.psicodelia,
                           opacity: level === 'Alto' ? 1 : level === 'Medio' ? 0.6 : 0.3
                         }}
                       ></div>
                       <span className="text-[10px] block">{traitKey[0].toUpperCase()}</span> {/* Tamaño muy pequeño */}
                       <span className="text-[10px] block">{level}</span>
                     </div>
                   );
                })}
              </div>
              <p className="text-xs md:text-sm mb-1">{profile.description}</p>
              <p className="text-xs md:text-sm italic"><strong>Enfoque:</strong> {profile.teachingApproach}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sección Ventajas (Restaurada) */}
       <div>
        <h4 className="text-lg md:text-xl font-semibold mb-3">Ventajas del Sistema PsicodeLIA</h4>
        <ul className="space-y-2 text-xs md:text-sm">
          <li className="flex items-start"> <svg className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: slide16Colors.psicodelia }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> <span>Materiales adaptados al perfil psicológico</span> </li>
          <li className="flex items-start"> <svg className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: slide16Colors.psicodelia }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> <span>Avatares con sustrato psicológico</span> </li>
          <li className="flex items-start"> <svg className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: slide16Colors.psicodelia }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> <span>Mayor retención y progreso</span> </li>
          <li className="flex items-start"> <svg className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: slide16Colors.psicodelia }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> <span>Integración con otros agentes LIA</span> </li>
        </ul>
      </div>
    </div>
  );

  // --- Componente principal de la diapositiva ---
  return (
    <div className="h-screen w-full flex flex-col p-3 sm:p-4 md:p-6 overflow-hidden font-sans" style={{ backgroundColor: slide16Colors.background }}>
      {/* Encabezado */}
      <div className="text-center mb-4 md:mb-6 flex-shrink-0"> <h1 className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2" style={{ color: slide16Colors.brown }}> Cobrando vida </h1> <p className="text-lg sm:text-xl" style={{ color: slide16Colors.gold }}> Nuestros agentes más innovadores en acción </p> </div>
      {/* Selector de pestañas */}
      <div className="flex justify-center mb-3 md:mb-4 flex-shrink-0"> <div className="inline-flex rounded-md shadow-sm" role="group"> <button type="button" className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium focus:outline-none rounded-l-lg ${activeTab === 'evalia' ? 'text-white' : 'text-gray-700'}`} style={{ backgroundColor: activeTab === 'evalia' ? slide16Colors.evalia : slide16Colors.offWhite, borderColor: slide16Colors.evalia, borderWidth: '1px' }} onClick={() => setActiveTab('evalia')}> <div className="flex items-center"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1 sm:mr-2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4m-4-4H9m6-8H9m6 4H9m6 8v-8m-6 8v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> EVALIA </div> </button> <button type="button" className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium focus:outline-none rounded-r-lg ${activeTab === 'psicodelia' ? 'text-white' : 'text-gray-700'}`} style={{ backgroundColor: activeTab === 'psicodelia' ? slide16Colors.psicodelia : slide16Colors.offWhite, borderColor: slide16Colors.psicodelia, borderLeftWidth: '0', borderWidth: '1px' }} onClick={() => setActiveTab('psicodelia')}> <div className="flex items-center"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1 sm:mr-2"><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/><path d="M10 15H6a4 4 0 0 0-4 4v1h16v-1a4 4 0 0 0-4-4h-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M18 15l2-2m-8-4l-2 2m10-4l-2 2m-8 4l2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> PsicodeLIA </div> </button> </div> </div>
      {/* Contenido de la pestaña activa con scroll */}
      <div className="flex-grow overflow-y-auto rounded-lg shadow-inner bg-white p-1"> {/* Quitado min-h-0 */}
        {activeTab === 'evalia' ? <RenderEvaliaContent /> : <RenderPsicodeliaContent />}
      </div>
      {/* Pie de página */}
      <div className="mt-4 text-center flex-shrink-0"> <p className="text-sm sm:text-base italic" style={{ color: slide16Colors.gold }}> "Personalización y adaptación para una experiencia educativa óptima" </p> </div>
      
      {/* AÑADIDO: Aviso de copyright discreto (copiado de la Diapositiva 7) */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
        <div className="text-center" style={{ color: slide16Colors.brown, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 16
// =======================================================================
// =======================================================================
// DIAPOSITIVA 17: ARQUITECTOS DE LA EXPERIENCIA EDUCATIVA (MEGAPLAN / GracIA)
// (Versión SIN pestaña PDF)
// =======================================================================

// Paleta de colores simplificada para esta diapositiva
const Diapositiva17Colors = {
  primary: '#3A3920',
  secondary: '#D25B01',
  accent: '#EAA724',
  light: '#F8F7F2',
  dark: '#1E1E1E',
};

// Componente para la Diapositiva 17
const Diapositiva17 = () => {
  const [activeTab, setActiveTab] = React.useState('megaplan');

  // Datos de MEGAPLAN y GracIA (sin cambios, los omito por brevedad)
  const megaplanData = { /* ... tu data ... */ 
    title: "MEGAPLAN",
    subtitle: "Planificación de lecciones con IA",
    description: "Editor dirigido a profesores de español para la planificación de lecciones configuradas desde las propuestas del diseño instruccional, la gamificación, la accesibilidad, y la inclusividad en la enseñanza ELE.",
    modules: [
      { id: "me", name: "Megaplan 1 ME", description: "Descripción dosificada del grupo de clase y los objetivos educativos", details: ["Nivel de los estudiantes", "Cantidad de estudiantes", "Grado escolar", "Tipo de curso", "Unidad del curso", "Lección", "Objetivos lingüísticos"] },
      { id: "ga", name: "Megaplan 2 GA", description: "Configuración de la gamificación", details: ["Personalización de la gamificación", "Configuración de los elementos de la gamificación", "Correspondencia con el nivel de lengua", "Programa del curso y objetivos educativos"] },
      { id: "plan", name: "Megaplan 3 PLAN", description: "Configuración pedagógica para NEE y dinámicas de grupo", details: ["Correspondencia con el diseño instruccional de Gagné", "Afinamiento de actividades diferenciadas", "Adecuación de las dinámicas de grupo"] }
    ],
    benefits: ["Simplifica la planificación de clases adaptada a necesidades específicas", "Integra gamificación con bases pedagógicas sólidas", "Atiende a la diversidad y la inclusión en el aula", "Reduce el tiempo de preparación de lecciones", "Asegura coherencia metodológica en la enseñanza"]
  };
  const graciaData = { /* ... tu data ... */ 
    title: "GracIA",
    subtitle: "Creación inteligente de lecciones",
    description: "Creación de lecciones fundamentadas en situaciones comunicativas, pragmática y gramática de las construcciones para el aprendizaje de español.",
    figmaLink: "https://www.figma.com/design/jFCVekCgnIri0U7PIQaxvc/Platform-Language-AI?node-id=0-1&t=2yiqID84nMapkjw6-1",
    features: [
      { id: "communication", name: "Situaciones comunicativas", description: "Genera contenidos basados en contextos reales de comunicación adaptados al nivel del estudiante", icon: "💬" },
      { id: "pragmatics", name: "Pragmática aplicada", description: "Integra aspectos socioculturales y pragmáticos del español en situaciones auténticas", icon: "🌍" },
      { id: "construction", name: "Gramática de construcciones", description: "Utiliza un enfoque basado en construcciones que facilita la adquisición natural de estructuras", icon: "🏗️" },
      { id: "ai", name: "IA generativa adaptativa", description: "Se adapta a las necesidades específicas del curso, objetivos y perfil de los estudiantes", icon: "🧠" }
    ],
    caseStudies: [{ title: "Escuelas de idiomas", results: "Reducción del 40% en tiempo de preparación y aumento del 35% en la retención de estudiantes" }],
    integrations: ["Zoho CRM para gestión centralizada de usuarios", "Plataforma Novelingo para la generación de experiencias gamificadas", "Exportación a formatos estándar (SCORM, xAPI)"]
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white p-6 font-sans overflow-hidden relative">
      <div className="text-center mb-6">
        <h1 
          className="text-4xl font-bold mb-1"
          style={{ color: Diapositiva17Colors.primary }}
        >
          Arquitectos de la Experiencia Educativa
        </h1>
        <p className="text-lg italic" style={{ color: Diapositiva17Colors.secondary }}>
          "Donde la tecnología se encuentra con la pedagogía para reinventar el aprendizaje"
        </p>
      </div>

      {/* Navegación entre pestañas con iconos - Botón PDF eliminado */}
      <div className="flex justify-center mb-6">
        <button 
          className={`px-6 py-3 rounded-l-lg font-semibold transition-all flex items-center ${activeTab === 'megaplan' ? 'text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          style={{ backgroundColor: activeTab === 'megaplan' ? Diapositiva17Colors.primary : 'transparent', border: `1px solid ${Diapositiva17Colors.primary}` }}
          onClick={() => setActiveTab('megaplan')}
        >
          <div className="mr-2">
            <svg width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
              <rect x="12" y="12" width="40" height="40" rx="4" strokeWidth="2"/>
              <path d="M12 26H52" strokeWidth="2"/>
              <path d="M26 26V52" strokeWidth="2"/>
              <path d="M22 19L18 19" strokeWidth="2" strokeLinecap="round"/>
              <path d="M32 19L28 19" strokeWidth="2" strokeLinecap="round"/>
              <path d="M42 19L38 19" strokeWidth="2" strokeLinecap="round"/>
              <path d="M46 19H46.01" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18 39L22 35L18 31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M36 39H42" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="39" cy="46" r="3" strokeWidth="2"/>
            </svg>
          </div>
          MEGAPLAN
        </button>
        <button 
          className={`px-6 py-3 rounded-r-lg font-semibold transition-all flex items-center ${activeTab === 'gracia' ? 'text-white' : 'text-gray-700 hover:bg-gray-100'}`} // Añadido rounded-r-lg
          style={{ 
            backgroundColor: activeTab === 'gracia' ? Diapositiva17Colors.primary : 'transparent', 
            borderTop: `1px solid ${Diapositiva17Colors.primary}`, 
            borderBottom: `1px solid ${Diapositiva17Colors.primary}`,
            borderRight: `1px solid ${Diapositiva17Colors.primary}` // Añadido borde derecho
          }}
          onClick={() => setActiveTab('gracia')}
        >
          <div className="mr-2">
            <svg width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
              <path d="M16 48C16 41.373 21.373 36 28 36H36C42.627 36 48 41.373 48 48" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="32" cy="24" r="12" strokeWidth="2"/>
              <path d="M42 16L44 14M44 14L46 12M44 14L42 12M44 14L46 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 20V28" strokeWidth="2" strokeLinecap="round"/>
              <path d="M26 24H18" strokeWidth="2" strokeLinecap="round"/>
              <path d="M38 24H46" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          GracIA
        </button>
        {/* Botón de Documentación PDF eliminado */}
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'megaplan' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            {/* ... Contenido de la pestaña MEGAPLAN (sin cambios) ... */}
            <div className="md:col-span-1 bg-gray-50 p-5 rounded-lg">
              <h2 className="text-2xl font-bold mb-3" style={{ color: Diapositiva17Colors.primary }}>
                {megaplanData.title}
              </h2>
              <h3 className="text-xl font-semibold mb-3" style={{ color: Diapositiva17Colors.secondary }}>
                {megaplanData.subtitle}
              </h3>
              <p className="mb-4 text-gray-700 text-sm">
                {megaplanData.description}
              </p>
              <h4 className="font-bold mt-6 mb-2" style={{ color: Diapositiva17Colors.secondary }}>
                Beneficios clave:
              </h4>
              <ul className="list-disc pl-5 text-gray-700 text-sm">
                {megaplanData.benefits.map((benefit, idx) => (
                  <li key={idx} className="mb-1.5">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <div className="space-y-4">
                {megaplanData.modules.map((module, idx) => (
                  <div 
                    key={module.id}
                    className="p-4 rounded-lg shadow-md border-l-4"
                    style={{ borderLeftColor: idx === 0 ? Diapositiva17Colors.primary : idx === 1 ? Diapositiva17Colors.secondary : Diapositiva17Colors.accent, backgroundColor: 'white' }}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold" style={{ color: idx === 0 ? Diapositiva17Colors.primary : idx === 1 ? Diapositiva17Colors.secondary : Diapositiva17Colors.accent }}>
                        {module.name}
                      </h3>
                      <div className="w-7 h-7 flex items-center justify-center rounded-full" style={{ backgroundColor: idx === 0 ? Diapositiva17Colors.primary : idx === 1 ? Diapositiva17Colors.secondary : Diapositiva17Colors.accent }}>
                        <span className="text-white font-bold text-sm">{idx + 1}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700 text-sm">{module.description}</p>
                    <div className="mt-3">
                      <h4 className="font-semibold mb-1.5 text-sm">Características:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {module.details.map((detail, detailIdx) => (
                          <li key={detailIdx} className="flex items-center bg-gray-50 p-1.5 rounded">
                            <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: idx === 0 ? Diapositiva17Colors.primary : idx === 1 ? Diapositiva17Colors.secondary : Diapositiva17Colors.accent }}></div>
                            <span className="text-xs">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                 <h3 className="text-lg font-bold mb-3" style={{ color: Diapositiva17Colors.dark }}>
                  Flujo de trabajo con MEGAPLAN
                </h3>
                <div className="flex justify-between items-center relative pt-6">
                  <div 
                    className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 z-0"
                    style={{ backgroundColor: Diapositiva17Colors.accent }}
                  ></div>
                  {['Config.', 'Gamif.', 'Adapt.', 'Gener.', 'Export.'].map((step, idx) => (
                    <div 
                      key={idx} 
                      className="w-12 h-12 rounded-full flex items-center justify-center z-10 relative"
                      style={{ 
                        backgroundColor: Diapositiva17Colors.light,
                        border: `2px solid ${Diapositiva17Colors.primary}`
                      }}
                    >
                      <div className="text-center">
                        <div className="font-bold text-lg" style={{ color: Diapositiva17Colors.primary }}>{idx + 1}</div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                          {step}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gracia' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            {/* ... Contenido de la pestaña GracIA (sin cambios) ... */}
            <div className="md:col-span-1 bg-gray-50 p-5 rounded-lg">
              <h2 className="text-2xl font-bold mb-3" style={{ color: Diapositiva17Colors.primary }}>{graciaData.title}</h2>
              <h3 className="text-xl font-semibold mb-3" style={{ color: Diapositiva17Colors.secondary }}>{graciaData.subtitle}</h3>
              <p className="mb-4 text-gray-700 text-sm">{graciaData.description}</p>
              <h4 className="font-bold mt-6 mb-2 text-sm" style={{ color: Diapositiva17Colors.secondary }}>Caso de éxito:</h4>
              {graciaData.caseStudies.map((caseStudy, idx) => (
                <div key={idx} className="mb-3 p-3 bg-white rounded-lg shadow-sm">
                  <h5 className="font-semibold text-sm" style={{ color: Diapositiva17Colors.primary }}>{caseStudy.title}</h5>
                  <p className="text-xs text-gray-700">{caseStudy.results}</p>
                </div>
              ))}
              <h4 className="font-bold mt-6 mb-2 text-sm" style={{ color: Diapositiva17Colors.secondary }}>Diseño en Figma:</h4>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <a href={graciaData.figmaLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline text-xs">
                  <svg width="18" height="18" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1.5">
                    <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="#1ABCFE"/><path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="#0ACF83"/><path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="#FF7262"/><path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="#F24E1E"/><path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="#A259FF"/>
                  </svg>
                  Ver diseño en Figma
                </a>
              </div>
              <h4 className="font-bold mt-6 mb-2 text-sm" style={{ color: Diapositiva17Colors.secondary }}>Integraciones:</h4>
              <ul className="list-disc pl-5 text-gray-700 text-xs">
                {graciaData.integrations.map((integration, idx) => (
                  <li key={idx} className="mb-1.5">{integration}</li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {graciaData.features.map((feature, idx) => (
                  <div 
                    key={feature.id}
                    className="p-4 rounded-lg shadow-md flex flex-col h-full"
                    style={{ backgroundColor: 'white', borderTop: `3px solid ${idx % 2 === 0 ? Diapositiva17Colors.primary : Diapositiva17Colors.secondary}` }}
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-2 text-xl" style={{ backgroundColor: `${idx % 2 === 0 ? Diapositiva17Colors.primary : Diapositiva17Colors.secondary}20` }} >
                        {feature.icon}
                      </div>
                      <h3 className="text-md font-bold" style={{ color: idx % 2 === 0 ? Diapositiva17Colors.primary : Diapositiva17Colors.secondary }}>{feature.name}</h3>
                    </div>
                    <p className="text-gray-700 flex-grow text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-bold mb-3" style={{ color: Diapositiva17Colors.dark }}>Integración con Zoho CRM</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-white rounded-lg shadow-sm text-center">
                    <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${Diapositiva17Colors.primary}20` }} ><svg viewBox="0 0 24 24" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 14C8.7 14 6 11.3 6 8H18C18 11.3 15.3 14 12 14Z" stroke={Diapositiva17Colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 14V18" stroke={Diapositiva17Colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 18H9" stroke={Diapositiva17Colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="6" r="2" stroke={Diapositiva17Colors.primary} strokeWidth="1.5"/></svg></div>
                    <h4 className="font-semibold mb-1 text-sm" style={{ color: Diapositiva17Colors.primary }}>Personalización</h4>
                    <p className="text-xs text-gray-600">Adapta contenidos al perfil del estudiante</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm text-center">
                    <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${Diapositiva17Colors.secondary}20` }} ><svg viewBox="0 0 24 24" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5H21V19H3V5Z" stroke={Diapositiva17Colors.secondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 9L12 13L17 9" stroke={Diapositiva17Colors.secondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                    <h4 className="font-semibold mb-1 text-sm" style={{ color: Diapositiva17Colors.secondary }}>Comunicación</h4>
                    <p className="text-xs text-gray-600">Automatiza campañas educativas segmentadas</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm text-center">
                    <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${Diapositiva17Colors.accent}20` }} ><svg viewBox="0 0 24 24" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3V21" stroke={Diapositiva17Colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 6L5 18" stroke={Diapositiva17Colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 6L19 18" stroke={Diapositiva17Colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                    <h4 className="font-semibold mb-1 text-sm" style={{ color: Diapositiva17Colors.accent }}>Análisis</h4>
                    <p className="text-xs text-gray-600">Métricas detalladas de progreso y efectividad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contenido de la pestaña PDF eliminado */}
        {/* {activeTab === 'pdf' && ( ... )} */}

      </div>

      <div className="mt-4 text-center text-gray-500 text-xs">
        Proyecto LIA — Innovación Educativa con Inteligencia Artificial — 2025
      </div>
      
      {/* AÑADIDO: Aviso de copyright discreto (copiado de la Diapositiva 16) */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
        <div className="text-center" style={{ color: Diapositiva17Colors.primary, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 17
// =======================================================================

// =======================================================================
// DIAPOSITIVA 18: ALIADOS (CURSO CON IA PARA GENERACIÓN ALPHA) - CORREGIDO
// =======================================================================
// Asegúrate de tener useState importado globalmente en Presentacion.tsx
// import React, { useState } from 'react'; // No aquí

// --- SVG Icons (Definidos como antes) ---
const icons = {
    Book: ({ size = 20, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>),
    Users: ({ size = 20, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>),
    ChevronRight: ({ size = 20, color = "currentColor", className = "" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>),
    School: ({ size = 20, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m4 6 8-4 8 4"></path><path d="M18 10v8"></path><path d="M6 10v8"></path><path d="M14 22v-8L12 12l-2 2v8"></path><path d="M18 18H6"></path></svg>),
    Brain: ({ size = 20, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4.5 4.5 0 0 0-4.5 4.5v1.42A4.5 4.5 0 0 0 3 12.42V16.5A4.5 4.5 0 0 0 7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-4.08A4.5 4.5 0 0 0 16.5 7.92V6.5A4.5 4.5 0 0 0 12 2z"></path><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path><path d="M8 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path><path d="M17 16.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path><path d="M7 16.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>),
    GraduationCap: ({ size = 20, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>),
    UserCircle2: ({ size = 20, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20a6 6 0 0 0-12 0"></path><circle cx="12" cy="10" r="4"></circle><circle cx="12" cy="12" r="10"></circle></svg>),
    Settings: ({ size = 20, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>),
    Layers: ({ size = 20, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>),
    Lightbulb: ({ size = 20, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>),
};

const Diapositiva18 = () => {
  const [activeTab, setActiveTab] = useState('concepto');
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  // Define color keys para acceso tipado
  type ColorKey = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'accent' | 'textDark' | 'background' | 'white';

  const slide18Colors: Record<ColorKey, string> = {
    primary: '#D4A716', 
    secondary: '#68827A', 
    tertiary: '#157A6E',
    quaternary: '#C45A44', 
    accent: '#E0C8AF', 
    textDark: '#2A2A2A',
    background: '#FFFAF0', 
    white: '#FFFFFF',
  };

  // Array con las claves de colores que podemos usar para indexar
  const colorKeys: ColorKey[] = ['primary', 'secondary', 'tertiary', 'quaternary', 'accent'];

  interface Tab { 
    id: string; 
    label: string; 
    icon: React.ReactNode; // Cambiado de JSX.Element a React.ReactNode
  }
  
  interface SectionItem { 
    title: string; 
    content: string; 
  }

  // --- Datos COMPLETOS ---
  const tabs: Tab[] = [
    { id: 'concepto', label: 'Concepto', icon: icons.Book({ size: 20 }) },
    { id: 'generacion', label: 'Gen Alpha', icon: icons.UserCircle2({ size: 20 }) },
    { id: 'profesorado', label: 'Profesores', icon: icons.GraduationCap({ size: 20 }) },
    { id: 'formacion', label: 'Formación', icon: icons.School({ size: 20 }) },
    { id: 'ia', label: 'Marco IA', icon: icons.Brain({ size: 20 }) },
    { id: 'estructura', label: 'Estructura', icon: icons.Layers({ size: 20 }) },
    { id: 'microsecuencia', label: 'Microsec.', icon: icons.Settings({ size: 20 }) },
    { id: 'aliados', label: 'ALIADOS', icon: icons.Users({ size: 20 }) },
    { id: 'inspiracion', label: 'Inspiración', icon: icons.Lightbulb({ size: 20 }) },
    // No incluimos la tab de PDF
  ];
  const sections: { [key: string]: SectionItem[] } = {
    concepto: [ { title: 'Proyecto ALIADOS', content: 'Un nuevo producto editorial con IA desarrollado en un curso de adolescentes para la generación alpha. La propuesta integra inteligencia artificial en un contexto educativo específicamente diseñado para las características y necesidades de la nueva generación de estudiantes.' } ],
    generacion: [ { title: 'Nativos digitales', content: 'Han crecido rodeados de tecnología desde su nacimiento, lo que los convierte en expertos en el uso de dispositivos móviles, redes sociales y herramientas digitales para aprender y comunicarse. Prefieren formatos interactivos y visuales como videos, simulaciones y juegos educativos.' }, { title: 'Alfabetización digital y fluidez tecnológica', content: 'No solo consumen tecnología, sino que también crean contenido digital (e.g., videos, posts) y dominan habilidades como codificación, robótica e inteligencia artificial. Son capaces de colaborar virtualmente a través de plataformas en línea (discord, reddit), lo que fomenta el trabajo en equipo global.' }, { title: 'Aprendizaje personalizado e independiente', content: 'Muestran altos niveles de autonomía y prefieren explorar sus propios intereses mediante tareas prácticas y basadas en proyectos. Valoran métodos de enseñanza diferenciados, como el aprendizaje híbrido o invertido, que les permiten tomar la iniciativa y aprender a su propio ritmo.' }, { title: 'Habilidades "críticas" para el futuro', content: 'Se destacan en la resolución de problemas complejos, especialmente en entornos virtuales, gracias a su capacidad para pensar "críticamente" y adaptarse rápidamente a nuevos desafíos. Su educación se centra en habilidades STEM (ciencia, tecnología, ingeniería y matemáticas), esenciales para prepararlos para un mercado laboral cambiante.' }, { title: 'Conciencia global y ambiental (como moda)', content: 'Crecen con una fuerte conciencia sobre la sostenibilidad y el impacto ambiental. Esto influye en sus valores educativos y fomenta su interés por tecnologías verdes y prácticas responsables. Su aprendizaje incluye temas relacionados con la diversidad cultural y la colaboración intercultural, reflejando un mundo cada vez más globalizado.' }, { title: 'Preferencias educativas', content: 'Prefieren experiencias educativas prácticas, dinámicas e interactivas que combinen lo online con lo offline. Buscan relevancia en lo que aprenden: valoran conocimientos aplicables a la vida real más que la simple memorización de datos.' } ],
    profesorado: [ { title: 'Tipología de los prescriptores', content: 'La tabla presenta diferentes perfiles de profesores según su relación con el aprendizaje de los estudiantes, el consumo de materiales y su formación profesional.' }, { title: 'Profesor Tipo 1', content: 'Se implica, puede estar motivado o no, busca integrar las necesidades de los estudiantes. Es buscador de materiales, también creador, le gusta probar diferentes modos de usar los materiales. Flexible y coherente. Participa y desea conocer y probar nuevas propuestas didácticas.' }, { title: 'Profesor Tipo 2', content: 'Sigue implicado, pero está desmotivado, busca considerar a los estudiantes, pero siente que no vale mucho la pena. Es elaborador de "frankestein". Fotocopia muchos materiales, pero no los integra considerando algún enfoque. Participa, aunque es muy difícil generar un impacto que afecte un cambio en su labor profesional. Además asiste por el valor del certificado, beca o libro.' }, { title: 'Profesor Tipo 3', content: 'Tiene ideas rígidas sobre el aprendizaje repitiendo modelos, lleva a los estudiantes a su régimen de aprendizaje. Busca y usa un material ordenado que utiliza de forma rígida realizando actividad tras actividad. Participa por el valor del certificado, beca y libros y su evaluación anual en la escuela.' }, { title: 'Profesor Tipo 4', content: 'No tiene ni ha tenido vocación, considera que a los estudiantes no les interesa aprender por lo que no se esfuerza por integrar a los estudiantes. Busca el material que menos trabajo le genere y menos complicado sea. No le interesa, ni participa en gran medida en formaciones.' } ],
    formacion: [ { title: 'Diplomas DADIC', content: 'Desarrollar un marco de colaboración con el Instituto Cervantes para la promoción del certificado DADIC en sus diferentes niveles. Crear un programa de formación del profesorado que pueda ser utilizado como material para estos diplomas. Crear colaboraciones con el Instituto Cervantes de Bucarest y de Cracovia con el fin de desarrollar formaciones específicas destinadas a adolescentes que puedan ser utilizadas para obtener el diploma DADIC.' }, { title: 'Micro aprendizaje', content: 'Desde el año 2022 este tipo de modalidad de enseñanza ha aumentado en un 400%. En España existe el Plan Microcreds destinado a implementarlo. Actualmente en España quienes ofrecen este tipo de formación son: Universidad Autónoma de Madrid, la Universidad de Alicante, la Universidad Oberta de Cataluña, la Universidad Jaume I, la Universidad de Valencia, la Universidad Miguel Hernández, la Universidad de Granada o la Universidad del País Vasco. En mi opinión deberíamos crear un marco colaborativo con la Universidad de Valencia. Este modelo formativo también tiene un impacto en el producto editorial que esperan los profesores, de ahí su relevancia.' }, { title: 'Crear un espacio formativo competitivo', content: 'Crear un espacio formativo que compita con el Diploma de Extensión Universitaria de Edelsa y la Universidad de Málaga y del MINELE de Edinumen con la Universidad de Salamanca. Este punto guarda relación con el anterior. Hay cuatro universidades que podrían ser adecuadas en términos competitivos con Edinumen y Difusión: UDIMA, Universidad de la Rioja, Universidad de Alicante, y Universidad de Valencia.' }, { title: 'Soft skills', content: 'Aunque estas habilidades tienen un valor en términos laborales y la profesión de profesor es realmente poco demandada, bien podría focalizarse con el fin de poder ayudarle mejor en su acción profesional e impactar más positivamente en su salud mental.' }, { title: 'Diversidad e inclusión educativa', content: 'Este año en todo el espacio de la Unión Europea se obliga a una aplicación de políticas educativas inclusivas y diversificadas a partir de junio. Esto tiene un impacto en políticas editoriales para el desarrollo de futuras publicaciones y en cómo adaptar los materiales actuales.' }, { title: 'Inteligencia artificial y competencia digital docente', content: 'El impacto de la IA en la acción profesional del profesorado y su uso de forma segura y desarrolladora. Se deben realizar diferentes acciones en este ámbito: curación de herramientas configuradas con IA, la configuración de un entorno inteligente de aprendizaje y pedagogías adecuadas que integren el uso de estas herramientas.' } ],
    ia: [ { title: 'Jacob y el ángIAl', content: 'Definir una posición empresarial sobre el uso de la IA, presentado a través de la metáfora de Jacob luchando con el ángel, representado en diferentes interpretaciones artísticas: Gustav Moreau (contención y vínculo), Eugène Delacroix (resignación), Rembrandt (negación), Paul Gauguin (expectación).' }, { title: 'Generaciones Alpha y Beta como consumidores de IA', content: 'La generación alpha y la generación beta son y serán los mayores consumidores de este tipo de herramientas. En el caso de la generación beta la aparición y uso de este tipo de soluciones es lo que se ha considerado como la referencia para dar razón de ser de esta nueva generación.' }, { title: 'Marco referencial metodológico', content: 'A nivel editorial, un "uso" adecuado de estas herramientas se debe construir teniendo en cuenta tres pilares: hacer un "storytelling" de la experiencia de la integración de las herramientas en la empresa, un making-of que refleje todo el proceso de reflexión llevado a cabo y cómo se ha contemplado al profesor y al estudiante en el proceso; un marco referencial metodológico de garantías sensibles sobre las herramientas; un uso intuitivo, útil, práctico y divertido.' }, { title: 'El PEDTECH y sus diferencias con el Edtech', content: 'EdTech se centra en las herramientas, plataformas y recursos tecnológicos en general. Su objetivo es mejorar el acceso, la personalización y la eficiencia en los procesos educativos. PedTech pone énfasis en cómo estas tecnologías se integran específicamente con las prácticas pedagógicas. Prioriza el "cómo" se usa la tecnología para apoyar estrategias de enseñanza basadas en principios pedagógicos sólidos.' }, { title: 'Visión y sensaciones del profesor sobre la IA', content: 'La visión y sensaciones que tiene el profesor sobre la IA es mayormente negativa. Este cóctel se compone de ansiedad ante el veloz desarrollo que le impide ponerse al día, el miedo hacia la pérdida de trabajo y al uso inadecuado, unido a su recelo hacia las políticas educativas.' } ],
    estructura: [ { title: 'Pensamiento computacional', content: 'El pensamiento computacional es una habilidad cognitiva que permite resolver problemas de forma lógica y estructurada, utilizando conceptos como descomposición, reconocimiento de patrones, abstracción y algoritmos. Aplicado al aprendizaje, fomenta el desarrollo de competencias como el pensamiento crítico, la creatividad y la capacidad de abordar problemas complejos en diversos contextos.' }, { title: 'Valor para la Generación Alpha', content: 'Para la Generación Alpha, el valor de este tipo de metodología se encuentra en su carácter práctico, su estructura muy parecida al tutorial, su dosificación en pasos que permite segmentar y dosificar el proceso de aprendizaje sin perder en valor lingüístico.' }, { title: 'Modos de aprendizaje', content: 'Modos de aprendizaje dromológicos, con una estructura tutorial, el mínimo esfuerzo con una estimulación hiperpositiva, vulnerables a la frustación, buscadores dopaminérgicos en espacios de aprendizaje. Así son los estudiantes destinatarios.' }, { title: 'Requisitos del material', content: 'Un material de fácil uso y que no requiera preparación, un material atractivo y flexible que se adapte a diferentes cargas lectivas, que sea accesible y adaptable, que no sea aburrido, que implique gamificación, resolución de problemas y no sea caro.' } ],
    microsecuencia: [ { title: 'Concepto de microsecuencia didáctica', content: 'Una microsecuencia didáctica es una unidad mínima de planificación educativa que organiza un conjunto reducido y enfocado de actividades interrelacionadas, diseñadas para alcanzar objetivos específicos en un corto periodo de tiempo. Integra elementos clave de las unidades didácticas tradicionales (objetivos, contenidos, metodología, recursos y evaluación), pero adaptados a la lógica del microaprendizaje, que prioriza la brevedad, la accesibilidad y el aprendizaje autónomo.' }, { title: 'Características principales', content: 'Brevedad y enfoque: las microsecuencias se centran en objetivos muy específicos y contenidos concretos, adecuados para ser abordados en sesiones cortas o fragmentos de tiempo limitados. Interactividad: incorporan actividades prácticas y dinámicas que fomentan la participación activa del estudiante. Adaptabilidad: se diseñan para ajustarse a diferentes contextos y ritmos de aprendizaje. Evaluación: continua y formativa que incluye mecanismos de retroalimentación inmediata. Uso de recursos digitales: frecuentemente integran herramientas tecnológicas o plataformas de aprendizaje.' }, { title: 'Diferencias con la Unidad Didáctica', content: 'Temporalización: mientras que una unidad didáctica abarca un periodo más amplio (varias sesiones o semanas), la microsecuencia se desarrolla en una única sesión o en un periodo muy breve. Alcance: las microsecuencias se enfocan en aprendizajes puntuales, mientras que las unidades didácticas cubren temas más amplios e interrelacionados. Flexibilidad: las microsecuencias son más ágiles y fácilmente integrables en diferentes momentos del proceso educativo.' }, { title: 'Relación con el Microaprendizaje', content: 'El microaprendizaje enfatiza la entrega de contenidos en pequeños fragmentos para facilitar su asimilación rápida y efectiva. Las microsecuencias adoptan esta lógica al estructurar actividades breves pero significativas. Promueven aprendizajes autónomos y accesibles desde cualquier lugar, especialmente mediante recursos digitales.' } ],
    aliados: [ { title: 'ALIADOS: conociendo el primer curso de español con IA para adolescentes', content: 'El concepto de ALIADOS como un curso de español innovador integrando IA específicamente diseñado para adolescentes de la generación alpha.' }, { title: 'Protagonistas', content: 'Dos protagonistas: un chico y una chica con las preguntas y deseos propios de la adolescencia: quién soy, qué quiero ser, el amor, los amigos, que buscan ser tenidos en cuenta y probarse a sí mismos.' }, { title: 'Estructura narrativa', content: 'Un viaje con aventuras: el viaje es por un mundo "hispano" (inventar nombre), que está conformado por islas (los países hispanohablantes). A lo largo de los cursos (propongo que sean cuatro) se va pasando por un tablero de todo el mundo. Cada aventura (microsecuencia didáctica), que se desarrolla en una isla, incorpora una situación problémica que para ser resuelta se descompone en sus partes y se generan formas de resolución (se aprende lengua y se desarrolla su personalidad tanto en lo cognitivo como lo afectivo).' }, { title: 'Inteligencia Artificial integrada', content: 'En las aventuras hay aliados que ayudan en la resolución del problema: bots creados con IA que intervienen durante las diferentes situaciones. Los bots serían de tres tipos: especialistas en acciones concretas relacionadas con la lengua, tutor metodológico (este opcional porque se requiere un ecosistema que no existe) y otros que asuman roles específicos según la historia. También los protagonistas serán creados con bots, aunque no intervendrán directamente.' }, { title: 'Estructura del curso', content: 'Cuatro cursos: desde el nivel A1 hasta el nivel B1+. Cada curso en su forma básica pensado para un mínimo de 60h/clases. Componentes: libro del alumno, cuaderno de notas. Requiriendo una inversión se podría añadir: un LMS/SaaS y una aplicación. Se eliminaría el cuaderno de ejercicios que estaría reemplazado por IA. Cada curso estaría compuesto de 3 módulos que asumirían la función de unidad didáctica. 20 microsecuencias. Cada módulo estaría configurado por 5 microsecuencias de 4 lecciones cada una. En cada microsecuencia existirán diferentes tipologías de lecciones: de presentación de contenidos, de integración recursiva y de contenido variable (test, AICLE, otras demandas del programa). Cada lección en una doble página: cada lección se integrarían tanto la práctica como todas las cuestiones lingüísticas.' } ],
    inspiracion: [ { title: 'Elementos inspiradores', content: 'La conexión fraterna: dos personajes unidos con un fin específico, unir islas de un continente. Personajes con habilidades específicas que enseñan y generan más vínculos. Desafíos que buscan ser superados. Bonificaciones y logros. Un tablero temático que configura la experiencia. Diferentes rutas. Personajes que colaboran temporalmente y aportan beneficios. Minijuegos para poner en uso las habilidades y obtener recompensas.' } ],
    // No hay sección visualpdf
  };


  const handleExpandSection = (index: number) => {
    setExpandedSection(prev => prev === index ? null : index);
  };

  // Función auxiliar para obtener un color seguro basado en índice
  const getColorByIndex = (index: number): string => {
    return slide18Colors[colorKeys[index % colorKeys.length]];
  };

  // --- Componente principal de la diapositiva ---
  return (
    <div className={`h-screen w-full flex flex-col overflow-hidden font-sans p-3 sm:p-4 md:p-6 relative`} style={{ backgroundColor: slide18Colors.background }}>
      {/* Encabezado */}
      <div className="mb-4 md:mb-6 text-center flex-shrink-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2" style={{ color: slide18Colors.tertiary }}> ALIADOS </h1>
        <p className="text-base sm:text-lg md:text-xl" style={{ color: slide18Colors.quaternary }}> Un curso de adolescentes con LIA y sus agentes </p>
      </div>

      {/* Pestañas */}
      <div className="flex flex-wrap mb-4 md:mb-6 bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 text-xs sm:text-sm">
          {tabs.map((tab, index) => {
              const tabColor = getColorByIndex(index);
              return (
                <button
                  key={tab.id}
                  className={`flex-grow sm:flex-1 py-2 px-1 sm:px-2 flex flex-col sm:flex-row items-center justify-center gap-1 focus:outline-none transition-all border-b-2 sm:border-b-4 ${ activeTab === tab.id ? 'font-bold' : 'opacity-70 hover:opacity-100 hover:bg-gray-50'}`}
                  style={{ borderColor: activeTab === tab.id ? tabColor : 'transparent', color: tabColor }}
                  onClick={() => { setActiveTab(tab.id); setExpandedSection(null); /* No hay PDF */ }}
                >
                  <span className="mt-0.5 sm:mt-0">{tab.icon}</span>
                  <span className="mt-0.5 sm:mt-0 sm:ml-1">{tab.label}</span>
                </button>
              );
            })}
        </div>

      {/* Contenido Principal */}
      <div className={`flex-grow overflow-y-auto bg-white p-4 md:p-6 rounded-lg shadow-lg min-h-0`}>
          {/* Asegurarse de que sections[activeTab] existe antes de mapear */}
          {sections[activeTab] && sections[activeTab].map((section, index) => {
            // Calcular el índice de la tab actual
            const tabIndex = tabs.findIndex(t => t.id === activeTab);
            // Obtener un color seguro
            const sectionColor = getColorByIndex(tabIndex);
            
            return (
              <div key={index} className="mb-3 sm:mb-4 overflow-hidden">
                <div
                  className={`p-3 sm:p-4 rounded-lg flex items-center justify-between cursor-pointer transition-colors duration-200 ${expandedSection === index ? 'bg-opacity-10' : 'hover:bg-opacity-5'}`}
                  style={{
                      backgroundColor: expandedSection === index ? `${sectionColor}1A` : slide18Colors.white,
                      borderLeft: `4px solid ${sectionColor}`
                  }}
                  onClick={() => handleExpandSection(index)} role="button" aria-expanded={expandedSection === index} aria-controls={`section-content-${activeTab}-${index}`}
                >
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg" style={{ color: sectionColor }}> {section.title} </h3>
                  <icons.ChevronRight size={18} className={`transform transition-transform duration-300 ${expandedSection === index ? 'rotate-90' : ''} flex-shrink-0 ml-2`} color={sectionColor}/>
                </div>
                <div id={`section-content-${activeTab}-${index}`} className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSection === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  {expandedSection === index && (
                    <div className="pt-2 pb-3 px-4 border-t border-gray-100">
                      <p className="text-sm md:text-base leading-relaxed" style={{ color: slide18Colors.textDark }}>
                        {section.content}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      {/* Pie de página */}
      <div className="mt-3 md:mt-4 text-center text-xs sm:text-sm text-gray-500 flex-shrink-0">
        <p>Basado en el proyecto "Aliados: un nuevo producto editorial con IA para la generación alpha"</p>
      </div>
      
      {/* AÑADIDO: Aviso de copyright discreto (copiado de diapositivas anteriores) */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
        <div className="text-center" style={{ color: slide18Colors.tertiary, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 18
// =======================================================================

// =======================================================================
// DIAPOSITIVA 19: EquisELE - PROYECTO EDITORIAL
// =======================================================================

// Paleta de colores basada en los códigos proporcionados para esta diapositiva
const Diapositiva19Colors = {
  burgundy: '#540A15',     // Color burdeos oscuro
  darkRed: '#740819',      // Rojo oscuro
  red: '#AC132A',          // Rojo medio
  terracotta: '#D03C2D',   // Terracota - Color pestaña activa
  sand: '#ECAD66',         // Arena/beige dorado
  white: '#FFFFFF',
  offWhite: '#F8F7F2',
  black: '#1E1E1E',
  lightSand: '#F5E6D3',    // Versión clara del arena para fondos
  grey: '#7A7A7A',         // Gris para texto inactivo
};

// Componente para la Diapositiva 19
const Diapositiva19 = () => { // Renombrado de EquisELESlide a Diapositiva19
  const [activeTab, setActiveTab] = React.useState('characteristics'); // Usando React.useState

  // Datos del proyecto
  const projectData = {
    characteristics: [
      "Creado con grupos de adolescentes polacos de entre 16-19 años (367 estudiantes)",
      "Con situaciones propias de los jóvenes (Tandem, Instagram, Bullet Point, Intercambios, problemas con la familia)",
      "Un storytelling en cada lección",
      "Comprensión guiada de la gramática con un apartado de '¿Qué notas?....y anota'",
      "Pop-ups gramaticales",
      "Un espacio diferenciado para estudiantes motivados y con necesidades educativas especiales (Actívate y reactívate)",
      "Juegos por unidades didácticas",
      "Gamificación a través de breakout edu",
      "Panhispanidad y conciencia de la diferencia"
    ],
    format: [
      "Cuatro tomos",
      "60 horas por curso",
      "Nivel A1-B1+",
      "6 lecciones por unidad",
      "Más de 280 actividades por curso",
      "Curso de fonética",
      "Diccionario de combinaciones",
      "Glosario analítico"
    ]
  };

  // Iconos para cada característica (minimalistas)
  const characteristicIcons = [
    <svg key="char-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5"/><path d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    <svg key="char-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 10H21" stroke="currentColor" strokeWidth="1.5"/><path d="M16 15L18 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    <svg key="char-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="1.5"/><path d="M7 7H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 12H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 17H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    <svg key="char-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 11L11 13.5L16 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="currentColor" strokeWidth="1.5"/></svg>,
    <svg key="char-5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>,
    <svg key="char-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="7" cy="6" r="1" fill="currentColor"/><circle cx="7" cy="12" r="1" fill="currentColor"/><circle cx="7" cy="18" r="1" fill="currentColor"/></svg>,
    <svg key="char-7" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 5V9M17 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M9 15L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M17 14C17 12.3431 15.6569 11 14 11C12.3431 11 11 12.3431 11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 8C7 9.65685 8.34315 11 10 11C11.6569 11 13 9.65685 13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/></svg>,
    <svg key="char-8" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 12H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 16H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="1.5"/><path d="M17 4V20" stroke="currentColor" strokeWidth="1.5"/></svg>,
    <svg key="char-9" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20" stroke="currentColor" strokeWidth="1.5"/><path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20" stroke="currentColor" strokeWidth="1.5"/><path d="M4.93 7.5H19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M4.93 16.5H19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ];

  const formatIcons = [
    <svg key="format-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H8C9.10457 4 10 4.89543 10 6V18C10 19.1046 9.10457 20 8 20H4V4Z" stroke="currentColor" strokeWidth="1.5"/><path d="M10 4H14C15.1046 4 16 4.89543 16 6V18C16 19.1046 15.1046 20 14 20H10V4Z" stroke="currentColor" strokeWidth="1.5"/><path d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H16V4Z" stroke="currentColor" strokeWidth="1.5"/></svg>,
    <svg key="format-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 6V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="format-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 16L12 7L17 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 13H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>,
    <svg key="format-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7V17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17V7Z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 6V18" stroke="currentColor" strokeWidth="1.5"/><path d="M16 6V18" stroke="currentColor" strokeWidth="1.5"/><path d="M4 10H20" stroke="currentColor" strokeWidth="1.5"/><path d="M4 14H20" stroke="currentColor" strokeWidth="1.5"/></svg>,
    <svg key="format-5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 8L6 12L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 8L18 12L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>,
    <svg key="format-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 9.5L16 12.5L18 9.5L19.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 12H8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="8.5" y="9.5" width="3" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M12 15C16 18 20 15 20 15V9C20 9 16 6 12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="format-7" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 9H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 13H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 17H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    <svg key="format-8" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 7H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M14 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M11 17H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M19 11.5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="19" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>
  ];

  return (
    <div className="w-full h-screen flex flex-col bg-white p-0 font-sans relative"> {/* Añadido relative para posicionamiento del copyright */}
      <div className="flex flex-col items-center justify-center p-2">
        <h1 
          className="text-3xl font-bold mb-1 text-center"
          style={{ color: Diapositiva19Colors.red }}
        >
          EquisELE
        </h1>
        <h2 
          className="text-xl font-normal text-center"
          style={{ color: Diapositiva19Colors.burgundy }}
        >
          Proyecto Editorial para la Generación Alpha y Zeta
        </h2>
      </div>

      <div className="flex w-full">
        <button
          className="py-4 px-6 text-white text-xl font-semibold transition-all duration-300 w-1/2"
          style={{ 
            backgroundColor: activeTab === 'characteristics' ? Diapositiva19Colors.terracotta : Diapositiva19Colors.grey
          }}
          onClick={() => setActiveTab('characteristics')}
        >
          Características
        </button>
        <button
          className="py-4 px-6 text-white text-xl font-semibold transition-all duration-300 w-1/2"
          style={{ 
            backgroundColor: activeTab === 'format' ? Diapositiva19Colors.terracotta : Diapositiva19Colors.grey
          }}
          onClick={() => setActiveTab('format')}
        >
          Estructura y Formato
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6"> {/* Padding añadido aquí para el contenido */}
        {activeTab === 'characteristics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectData.characteristics.map((item, index) => (
              <div 
                key={`char-${index}`}
                className="flex items-start p-4 rounded-lg transition-all duration-300"
                style={{ backgroundColor: Diapositiva19Colors.lightSand, color: Diapositiva19Colors.burgundy }}
              >
                <div className="mr-4 p-2 rounded-full" style={{ backgroundColor: Diapositiva19Colors.terracotta, color: Diapositiva19Colors.white }}>
                  {characteristicIcons[index]}
                </div>
                <div>
                  <p className="text-md font-medium">{item}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'format' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectData.format.map((item, index) => (
              <div 
                key={`format-${index}`}
                className="flex items-start p-4 rounded-lg transition-all duration-300"
                style={{ backgroundColor: Diapositiva19Colors.lightSand, color: Diapositiva19Colors.burgundy }}
              >
                <div className="mr-4 p-2 rounded-full" style={{ backgroundColor: Diapositiva19Colors.darkRed, color: Diapositiva19Colors.white }}>
                  {formatIcons[index]}
                </div>
                <div>
                  <p className="text-md font-medium">{item}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-6 right-6 opacity-10 pointer-events-none"> {/* Añadido pointer-events-none */}
        <svg width="180" height="180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke={Diapositiva19Colors.red} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke={Diapositiva19Colors.red} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {/* AÑADIDO: Aviso de copyright discreto (copiado de diapositivas anteriores) */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
        <div className="text-center" style={{ color: Diapositiva19Colors.burgundy, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
        </div>
      </div>
    </div>
  );
};

// Si este archivo SÓLO va a exportar Diapositiva19, puedes hacer:
// export default Diapositiva19;
// Si es parte de Presentacion.tsx, no necesitas este export aquí.

// =======================================================================
// FIN DIAPOSITIVA 19
// =======================================================================

// =======================================================================
// DIAPOSITIVA 20: AGRADECIMIENTOS (SIN FRAMER MOTION)
// =======================================================================
// No se necesita importar 'framer-motion'.
// Se asume que 'useState', 'useEffect' de React están importados globalmente.

const Diapositiva20 = () => {
  // Ya no se necesita el estado para el índice de frases animadas
  // const [currentIndex, setCurrentIndex] = useState(0);
  
  // Paleta de colores específica para esta diapositiva
  const slide20Colors = {
    primary: '#6D28D9', // Morado
    secondary: '#FBBF24', // Amarillo/Ámbar
    textPrimary: '#4B5563', // Gris oscuro para texto
    textSecondary: '#6B7280', // Gris medio
    background: '#FEF3C7', // Ámbar muy claro
    white: '#FFFFFF',
    // Colores para gradientes decorativos
    grad1Start: '#EF4444', grad1Via: '#FBBF24', grad1End: '#10B981',
    grad2Start: '#A855F7', grad2Via: '#F87171', grad2End: '#FBBF24',
  };
  
  // Frases de agradecimiento (solo usaremos la primera ahora)
  const phrases = [
    "Gracias por su tiempo y atención",
    "Gracias por la oportunidad de presentar estas ideas",
    "Gracias al equipo de Grupo Anaya por su valiosa labor en la educación"
  ];
  
  // El useEffect para el ciclo de frases ya no es necesario
  // useEffect(() => { ... }, []);
  
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden relative" style={{ backgroundColor: slide20Colors.background }}>
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-r opacity-30" style={{backgroundImage: `linear-gradient(to right, ${slide20Colors.grad1Start}, ${slide20Colors.grad1Via}, ${slide20Colors.grad1End})`}} />
      <div className="absolute bottom-0 right-0 w-full h-24 sm:h-32 bg-gradient-to-l opacity-30" style={{backgroundImage: `linear-gradient(to left, ${slide20Colors.grad2Start}, ${slide20Colors.grad2Via}, ${slide20Colors.grad2End})`}} />
      
      {/* Contenedor principal (sin motion) */}
      <div className="z-10 text-center p-6 sm:p-10 md:p-16 bg-white rounded-xl shadow-xl max-w-lg sm:max-w-xl md:max-w-2xl w-full">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-10"
          style={{ color: slide20Colors.primary }}
        >
          Agradecimientos
        </h1>
        
        {/* Texto estático (primera frase) */}
        <div className="h-16 sm:h-20 flex items-center justify-center overflow-hidden">
           <p // Cambiado de motion.p a p
              className="text-lg sm:text-xl md:text-2xl px-2" // Sin absolute
              style={{ color: slide20Colors.textPrimary }}
            >
              {phrases[0]} {/* Mostrando solo la primera frase */}
            </p>
        </div>
        
        {/* Mensaje final (sin motion) */}
        <p
          className="mt-8 sm:mt-10 md:mt-14 text-base sm:text-lg md:text-xl"
          style={{ color: slide20Colors.textSecondary }}
        >
          Espero con entusiasmo continuar esta conversación y explorar juntos
          el futuro de la educación con innovación humana.
        </p>
        
        {/* Firma (sin motion) */}
        <div className="mt-8 sm:mt-10 text-right">
          <p className="text-sm sm:text-base md:text-lg italic" style={{color: slide20Colors.textPrimary}} >Armando Cruz Crespillo</p>
          <p className="text-xs sm:text-sm" style={{color: slide20Colors.textSecondary}}>Mayo 2025</p>
        </div>
      </div>
      
      {/* AÑADIDO: Aviso de copyright discreto */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
        <div className="text-center" style={{ color: slide20Colors.textPrimary, fontSize: '9px' }}>
          © 2025 Todos los derechos reservados | Armando Juan Cruz Crespillo | Hablandis | Emc2 | Investigación propietaria
          <br />
          Esta presentación contiene material protegido por derechos de autor. Prohibida su reproducción total o parcial sin autorización.
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 20
// =======================================================================
// =======================================================================
// COMPONENTE PRINCIPAL DE PRESENTACIÓN - CORREGIDO
// =======================================================================
const Presentacion = () => {
  const [diapositivaActual, setDiapositivaActual] = useState(1);
  const totalDiapositivas = 20; // Corregido de 25 a 20 diapositivas

  const cambiarDiapositiva = (direccion: 'prev' | 'next') => {
    setDiapositivaActual(actual => {
      if (direccion === 'prev') {
        return actual > 1 ? actual - 1 : 1;
      } else {
        return actual < totalDiapositivas ? actual + 1 : totalDiapositivas;
      }
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        cambiarDiapositiva('next');
      } else if (event.key === 'ArrowLeft') {
        cambiarDiapositiva('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Removida la dependencia innecesaria de totalDiapositivas

  let SlideComponent;
  if (diapositivaActual === 1) SlideComponent = Diapositiva1;
  else if (diapositivaActual === 2) SlideComponent = Diapositiva2;
  else if (diapositivaActual === 3) SlideComponent = Diapositiva3;
  else if (diapositivaActual === 4) SlideComponent = Diapositiva4;
  else if (diapositivaActual === 5) SlideComponent = Diapositiva5;
  else if (diapositivaActual === 6) SlideComponent = Diapositiva6;
  else if (diapositivaActual === 7) SlideComponent = Diapositiva7;
  else if (diapositivaActual === 8) SlideComponent = Diapositiva8;
  else if (diapositivaActual === 9) SlideComponent = Diapositiva9;
  else if (diapositivaActual === 10) SlideComponent = Diapositiva10;
  else if (diapositivaActual === 11) SlideComponent = Diapositiva11;
  else if (diapositivaActual === 12) SlideComponent = Diapositiva12;
  else if (diapositivaActual === 13) SlideComponent = Diapositiva13;
  else if (diapositivaActual === 14) SlideComponent = Diapositiva14;
  else if (diapositivaActual === 15) SlideComponent = Diapositiva15;
  else if (diapositivaActual === 16) SlideComponent = Diapositiva16;
  else if (diapositivaActual === 17) SlideComponent = Diapositiva17;
  else if (diapositivaActual === 18) SlideComponent = Diapositiva18;
  else if (diapositivaActual === 19) SlideComponent = Diapositiva19;
  else if (diapositivaActual === 20) SlideComponent = Diapositiva20;
  else {
    // Fallback por si acaso
    SlideComponent = () => <div className="flex items-center justify-center h-screen text-2xl">Diapositiva {diapositivaActual} no encontrada</div>;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {SlideComponent && <SlideComponent />}
      <div className="absolute bottom-4 right-4 flex items-center space-x-3 z-20">
        <button
          className={`p-1.5 rounded-full bg-white bg-opacity-40 text-gray-800 transition-all shadow-sm ${diapositivaActual === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-opacity-60'}`}
          onClick={() => cambiarDiapositiva('prev')}
          disabled={diapositivaActual === 1}
          aria-label="Diapositiva anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          className={`p-1.5 rounded-full bg-white bg-opacity-40 text-gray-800 transition-all shadow-sm ${diapositivaActual === totalDiapositivas ? 'opacity-30 cursor-not-allowed' : 'hover:bg-opacity-60'}`}
          onClick={() => cambiarDiapositiva('next')}
          disabled={diapositivaActual === totalDiapositivas}
          aria-label="Siguiente diapositiva"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Presentacion;