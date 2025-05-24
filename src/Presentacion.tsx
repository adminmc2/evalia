import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// Paleta de colores corporativa Hablandis + EVALIA
const colors = {
  // Colores principales Hablandis
  verdeClaro: '#C4D4A4',      // PANTONE 580 C - Verde suave
  azulOscuro: '#12055F',      // PANTONE 2755 C - Azul profundo
  amarillo: '#FFC846',        // PANTONE 1225 C - Amarillo vibrante
  verdeTurquesa: '#007567',   // PANTONE 3295 C - Verde turquesa
  negro: '#000000',           // Negro puro
  lila: '#B9ABE4',           // PANTONE 2092 C - Lila suave
  
  // Colores adicionales para EVALIA
  blanco: '#FFFFFF',
  grisClaro: '#F5F5F5',
  grisMedio: '#E0E0E0',
  grisOscuro: '#666666',
  
  // Colores de estado/feedback
  exito: '#4CAF50',
  alerta: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Gradientes para fondos
  degradadoAzul: 'linear-gradient(135deg, #12055F 0%, #1a0a7a 100%)',
  degradadoVerde: 'linear-gradient(135deg, #007567 0%, #00a090 100%)',
  degradadoLila: 'linear-gradient(135deg, #B9ABE4 0%, #d4c7f0 100%)',
};

// Tipos de datos para EVALIA
interface EvaluationResult {
  level: string;
  confidence: number;
  competencies: {
    grammar: number;
    vocabulary: number;
    fluency: number;
    cultural: number;
    register: number;
  };
  l1Insights?: string[];
  recommendations?: string[];
}

interface StudentJourney {
  name: string;
  l1: string;
  initialLevel: string;
  finalLevel: string;
  weekInHablandis?: number;
  improvements: string[];
}

// Datos de ejemplo para demos interactivas
const mockEvaluationData: EvaluationResult = {
  level: 'B1.2',
  confidence: 0.87,
  competencies: {
    grammar: 75,
    vocabulary: 82,
    fluency: 68,
    cultural: 71,
    register: 65
  },
  l1Insights: [
    'Tendencia a evitar el subjuntivo',
    'Calco sintáctico del polaco en orden de palabras',
    'Excelente comprensión de aspectos formales'
  ],
  recommendations: [
    'Práctica intensiva de subjuntivo en contextos reales',
    'Inmersión para mejorar fluidez y registro coloquial',
    'Exposición a variantes dialectales del español'
  ]
};

// Configuración de animaciones reutilizables
const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  },
  slideIn: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: { duration: 0.6, ease: 'easeInOut' }
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.4 }
  },
  bounceIn: {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    }
  }
};

// Iconos SVG personalizados para la presentación
const icons = {
  ai: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
  plane: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
    </svg>
  ),
  target: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
    </svg>
  ),
  rocket: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.5c1.5 0 2.7 1.2 2.7 2.7 0 .4-.1.7-.2 1L22 12l-3.3 2.5c.2.5.3 1 .3 1.5 0 2.5-2 4.5-4.5 4.5S10 18.5 10 16c0-.5.1-1 .3-1.5L7 12l7.5-5.8c-.1-.3-.2-.6-.2-1 0-1.5 1.2-2.7 2.7-2.7z"/>
    </svg>
  )
};

// =======================================================================
// DIAPOSITIVA 1: PORTADA CON FOOTER MEJORADO
// =======================================================================
const Diapositiva1 = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, letter: string}>>([]);
  const [showElements, setShowElements] = useState({
    logo: false,
    title: false,
    subtitle: false,
    info: false
  });

  // Elementos que aparecen y desaparecen en la parte inferior
  const bottomElements = [
    { text: '¿', x: 10, delay: 0, color: colors.azulOscuro },
    { text: '¡', x: 15, delay: 0.4, color: colors.verdeTurquesa },
    { text: 'ñ', x: 20, delay: 0.8, color: colors.lila },
    { text: 'á', x: 25, delay: 1.2, color: colors.azulOscuro },
    { text: 'MCER', x: 30, delay: 1.6, color: colors.verdeTurquesa },
    { text: 'B2', x: 35, delay: 2.0, color: colors.lila },
    { text: 'é', x: 40, delay: 2.4, color: colors.azulOscuro },
    { text: 'í', x: 45, delay: 2.8, color: colors.verdeTurquesa },
    { text: 'DELE', x: 50, delay: 3.2, color: colors.lila },
    { text: 'ó', x: 55, delay: 3.6, color: colors.azulOscuro },
    { text: 'A1→C2', x: 60, delay: 4.0, color: colors.verdeTurquesa },
    { text: 'ú', x: 65, delay: 4.4, color: colors.lila },
    { text: '✓', x: 70, delay: 4.8, color: colors.azulOscuro },
    { text: '¡Olé!', x: 75, delay: 5.2, color: colors.verdeTurquesa },
    { text: '✗', x: 80, delay: 5.6, color: colors.lila },
    { text: '¿?¡!', x: 85, delay: 6.0, color: colors.azulOscuro },
  ];

  // Seguimiento del mouse - crear partículas solo en zona inferior
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
      
      // Crear partículas SOLO si el mouse está en el 30% inferior de la pantalla
      if (y > 70 && Math.random() > 0.94) {
        const letters = ['a', 'e', 'i', 'o', 'u', 'ñ', '¿', '?', '¡', '!'];
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          letter: letters[Math.floor(Math.random() * letters.length)]
        };
        setParticles(prev => [...prev.slice(-15), newParticle]);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Limpiar partículas antiguas cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.filter(p => Date.now() - p.id < 3000));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowElements(prev => ({...prev, logo: true})), 300),
      setTimeout(() => setShowElements(prev => ({...prev, title: true})), 600),
      setTimeout(() => setShowElements(prev => ({...prev, subtitle: true})), 900),
      setTimeout(() => setShowElements(prev => ({...prev, info: true})), 1200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${colors.verdeClaro} 0%, #E8E0F0 50%, ${colors.lila}80 100%)`
      }}
    >
      {/* Efecto de gradiente interactivo */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${colors.verdeTurquesa}20 0%, transparent 60%)`,
          transition: 'background 0.5s ease'
        }}
      />

      {/* Zona de partículas - SOLO EN LA PARTE INFERIOR */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ scale: 0, x: particle.x, y: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1.8, 0], 
              y: -150,
              x: particle.x + (Math.random() - 0.5) * 100,
              rotate: 540
            }}
            transition={{ duration: 3 }}
            className="absolute text-2xl font-bold"
            style={{ 
              color: colors.lila,
              bottom: window.innerHeight - particle.y,
              left: particle.x - 15,
              textShadow: '0 3px 6px rgba(0,0,0,0.1)',
              fontFamily: 'Aglet Mono, monospace'
            }}
          >
            {particle.letter}
          </motion.div>
        ))}
      </div>

      {/* Todos los elementos de abajo con animación uniforme */}
      <div className="absolute bottom-16 left-0 right-0 h-20 pointer-events-none">
        {bottomElements.map((elem, index) => (
          <motion.div
            key={index}
            className="absolute font-bold"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0.6, 0],
              scale: [0, 1.3, 1.3, 0],
              y: [0, -180, -200, -300]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              delay: elem.delay,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
            style={{ 
              left: `${elem.x}%`,
              bottom: '0px',
              color: elem.color + 'CC',
              fontSize: elem.text.length > 2 ? '28px' : '48px',
              fontFamily: 'Aglet Mono, monospace',
              fontWeight: elem.text.length > 2 ? 600 : 'bold',
              textShadow: '0 4px 8px rgba(0,0,0,0.15)',
              filter: 'brightness(1.1)'
            }}
          >
            {elem.text}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 h-screen flex flex-col p-8">
        
        {/* Logo ENORME */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: showElements.logo ? 1 : 0, 
            scale: showElements.logo ? 1 : 0.5
          }}
          transition={{ duration: 1, type: "spring" }}
          className="absolute top-0 left-0"
        >
          <img 
            src="/hablandis.png" 
            alt="Hablandis" 
            className="h-96"
            style={{ 
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
              maxWidth: '500px'
            }}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
              img.parentElement!.innerHTML = `
                <div style="padding: 30px;">
                  <div style="font-family: 'Aglet Mono', monospace; color: ${colors.azulOscuro}; font-size: 96px; font-weight: 900;">
                    Hablandis
                  </div>
                  <div style="font-family: 'Raleway', sans-serif; color: ${colors.verdeTurquesa}; font-size: 24px; margin-top: 10px;">
                    Centro Internacional de Idiomas
                  </div>
                </div>
              `;
            }}
          />
        </motion.div>

        {/* Contenido central */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-6xl">
            
            {/* EVALIA sin círculo de fondo */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: showElements.title ? 1 : 0, 
                y: showElements.title ? 0 : 50 
              }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="mb-12"
            >
              <h1 
                style={{ 
                  fontFamily: 'Aglet Mono, monospace',
                  fontSize: '120px',
                  fontWeight: 900,
                  letterSpacing: '8px',
                  color: colors.azulOscuro,
                  textShadow: '0 8px 40px rgba(0,0,0,0.1)'
                }}
              >
                EVALIA
              </h1>
            </motion.div>

            {/* Subtítulo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: showElements.subtitle ? 1 : 0
              }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2 
                className="mb-4"
                style={{ 
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '42px',
                  fontWeight: 400,
                  color: colors.azulOscuro,
                  letterSpacing: '1px'
                }}
              >
                Mejorando la experiencia de evaluación
              </h2>
              <p 
                style={{ 
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '42px',
                  fontWeight: 500,
                  color: colors.verdeTurquesa,
                  textShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  letterSpacing: '2px'
                }}
              >
                con IA generativa
              </p>
            </motion.div>

            {/* Información del ponente */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: showElements.info ? 1 : 0,
                scale: showElements.info ? 1 : 0.9
              }}
              transition={{ delay: 0.6, type: "spring" }}
              className="mt-20"
            >
              <div 
                className="inline-block rounded-3xl px-20 py-10"
                style={{ 
                  backgroundColor: colors.blanco + '70',
                  backdropFilter: 'blur(30px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
                }}
              >
                <p style={{ 
                  fontFamily: 'Aglet Mono, monospace',
                  fontSize: '36px',
                  fontWeight: 800,
                  color: colors.azulOscuro,
                  marginBottom: '12px'
                }}>
                  Armando Cruz Crespillo
                </p>
                <p style={{ 
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '22px',
                  fontWeight: 400,
                  color: colors.verdeTurquesa,
                  marginBottom: '20px'
                }}>
                  Director de Innovación - Hablandis | CTO - Emc2
                </p>
                <div className="text-center" 
                     style={{ 
                       fontFamily: 'Raleway, sans-serif',
                       fontSize: '18px',
                       color: colors.grisOscuro 
                     }}>
                  <span>26 de mayo de 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer con Copyright - NUEVO DISEÑO */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-0 left-0 right-0 py-4 text-center"
          style={{ 
            backgroundColor: colors.blanco + '40',
            backdropFilter: 'blur(10px)',
            borderTop: `1px solid ${colors.azulOscuro}20`
          }}
        >
          <p style={{ 
            fontFamily: 'Raleway, sans-serif',
            fontSize: '14px',
            color: colors.azulOscuro,
            letterSpacing: '0.5px',
            fontWeight: 500
          }}>
            © 2025 Hablandis Centro Internacional de Idiomas - Todos los derechos reservados
          </p>
        </motion.div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 1
// =======================================================================

// =======================================================================
// DIAPOSITIVA 2: CANCIÓN "ELLA LLEGÓ" - KARAOKE INTERACTIVO (CON DEBUG)
// =======================================================================
const Diapositiva2 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [audioError, setAudioError] = useState(false);
  const [audioStatus, setAudioStatus] = useState('not-loaded');
  const audioRef = useRef<HTMLAudioElement>(null);

  // Timestamps para sincronización (ajustar según el audio real)
  const lyrics = [
    { time: 0, text: "[Intro - Hablado con música suave]", type: "intro" },
    { time: 2, text: "Son las tres de la mañana...", type: "spoken" },
    { time: 4, text: "El café ya está frío...", type: "spoken" },
    { time: 6, text: "Y todavía me quedan 47 exámenes...", type: "spoken" },
    { time: 10, text: "[Verso 1]", type: "section" },
    { time: 12, text: "Mi vida es un plato de sopa fría", type: "verse" },
    { time: 15, text: "Corrigiendo hasta que salga el día", type: "verse" },
    { time: 18, text: "El subjuntivo me persigue en mis sueños", type: "verse" },
    { time: 21, text: "\"Ser y estar\" son ya mis dueños", type: "verse" },
    { time: 24, text: "Las tildes bailan la macarena", type: "verse" },
    { time: 27, text: "En cada examen veo la misma pena", type: "verse" },
    { time: 30, text: "\"Yo soy en el baño\" escribió María", type: "verse" },
    { time: 33, text: "\"Ayer yo he ido\" - ¡qué melodía!", type: "verse" },
    { time: 37, text: "[Verso 2]", type: "section" },
    { time: 39, text: "Test de nivel, comprensión lectora", type: "verse" },
    { time: 42, text: "Expresión escrita que me deteriora", type: "verse" },
    { time: 45, text: "\"Mi perro está muy bueno\" leo atónito", type: "verse" },
    { time: 48, text: "\"Es muy frío hoy\" - error sintomático", type: "verse" },
    { time: 51, text: "Evaluar no es solo gramática", type: "verse" },
    { time: 54, text: "Competencias, contexto, pragmática", type: "verse" },
    { time: 57, text: "¿Diagnóstica o formativa?", type: "verse" },
    { time: 60, text: "Mi cabeza ya no es productiva", type: "verse" },
    { time: 64, text: "[Estribillo] 🎉", type: "section" },
    { time: 66, text: "¡ELLA LLEGÓ! Como pizza a domicilio", type: "chorus" },
    { time: 69, text: "¡ELLA LLEGÓ! Mi salvación con brillo", type: "chorus" },
    { time: 72, text: "Comprende cada nivel del MCER", type: "chorus" },
    { time: 75, text: "¡Analiza todo en un dos por tres!", type: "chorus" },
    { time: 78, text: "¡ELLA LLEGÓ! Con su magia digital", type: "chorus" },
    { time: 81, text: "¡ELLA LLEGÓ! Es algo sensacional", type: "chorus" },
    { time: 84, text: "Evalúa competencias integradas", type: "chorus" },
    { time: 87, text: "¡Adiós a las noches desveladas!", type: "chorus" },
    { time: 91, text: "[Verso 3]", type: "section" },
    { time: 93, text: "\"Voy a coger el autobús\" dice Roberto", type: "verse" },
    { time: 96, text: "(No sabe que en América es desacierto)", type: "verse" },
    { time: 99, text: "\"Llévame este libro\" escribe Juan", type: "verse" },
    { time: 102, text: "(Traer y llevar siempre confundirán)", type: "verse" },
    { time: 105, text: "ELLA detecta patrones por lengua materna", type: "verse" },
    { time: 108, text: "ELLA sabe si es polaco o si es de Berna", type: "verse" },
    { time: 111, text: "Retroalimenta con pedagogía", type: "verse" },
    { time: 114, text: "¡Por fin llegó la tecnología!", type: "verse" }
  ];

  // Secciones para análisis post-canción
  const sections = {
    vida: {
      title: "La vida del profesor",
      icon: "📚",
      content: [
        "• Son las 3 AM corrigiendo exámenes",
        "• El café frío como compañero",
        "• 47 exámenes por revisar",
        "• Evaluación manual repetitiva",
        "• Agotamiento mental y físico"
      ],
      color: colors.azulOscuro
    },
    errores: {
      title: "Errores que se presentan",
      icon: "❌",
      content: [
        "• \"Yo soy en el baño\" (ser/estar)",
        "• \"Mi perro está muy bueno\" (contexto)",
        "• \"Es muy frío hoy\" (hacer/estar)",
        "• \"Voy a coger el autobús\" (variantes)",
        "• Confusión traer/llevar"
      ],
      color: colors.amarillo
    },
    esperamos: {
      title: "Lo que esperamos",
      icon: "✨",
      content: [
        "• Análisis automático instantáneo",
        "• Detección de patrones por L1",
        "• Evaluación de competencias integradas",
        "• Retroalimentación pedagógica",
        "• ¡Adiós noches desveladas!"
      ],
      color: colors.verdeTurquesa
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      console.log("Audio ref is null");
      return;
    }

    console.log("Audio element:", audio);
    console.log("Audio src:", audio.src);

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setTimeout(() => setShowAnalysis(true), 1000);
    };
    
    const handleError = (e: Event) => {
      console.error("Audio error event:", e);
      const audioElement = e.target as HTMLAudioElement;
      console.error("Error code:", audioElement.error?.code);
      console.error("Error message:", audioElement.error?.message);
      
      // Códigos de error MediaError
      if (audioElement.error) {
        switch(audioElement.error.code) {
          case 1:
            console.error("MEDIA_ERR_ABORTED - El usuario abortó la descarga");
            break;
          case 2:
            console.error("MEDIA_ERR_NETWORK - Error de red");
            break;
          case 3:
            console.error("MEDIA_ERR_DECODE - Error al decodificar");
            break;
          case 4:
            console.error("MEDIA_ERR_SRC_NOT_SUPPORTED - Formato no soportado o archivo no encontrado");
            break;
        }
      }
      setAudioError(true);
      setAudioStatus('error');
    };
    
    const handleLoadStart = () => {
      console.log("Audio load started");
      setAudioStatus('loading');
    };
    
    const handleCanPlay = () => {
      console.log("Audio can play");
      setAudioStatus('ready');
    };
    
    const handleLoadedData = () => {
      console.log("Audio loaded data");
      console.log("Duration:", audio.duration);
    };

    const handleLoadedMetadata = () => {
      console.log("Audio metadata loaded");
      console.log("Duration from metadata:", audio.duration);
      setDuration(audio.duration);
    };

    const handleProgress = () => {
      console.log("Audio loading progress");
      if (audio.buffered.length > 0) {
        console.log("Buffered:", audio.buffered.end(0));
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('progress', handleProgress);

    // Intentar cargar el audio
    console.log("Attempting to load audio...");
    audio.load();

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('progress', handleProgress);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) {
      console.error("No audio ref when trying to play");
      return;
    }

    console.log("Toggle play - current state:", isPlaying);
    console.log("Audio paused:", audio.paused);
    console.log("Audio ready state:", audio.readyState);
    console.log("Audio network state:", audio.networkState);
    console.log("Current src:", audio.src);

    if (isPlaying) {
      console.log("Pausing audio...");
      audio.pause();
    } else {
      console.log("Attempting to play audio...");
      audio.play()
        .then(() => {
          console.log("Audio playing successfully");
        })
        .catch(err => {
          console.error("Error playing audio:", err);
          console.error("Error name:", err.name);
          console.error("Error message:", err.message);
          setAudioError(true);
        });
      setShowAnalysis(false);
      setSelectedSection(null);
    }
    setIsPlaying(!isPlaying);
  };

  const getCurrentLyricIndex = () => {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        return i;
      }
    }
    return -1;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentLyricIndex = getCurrentLyricIndex();

  return (
    <div 
      className="min-h-screen relative p-12 flex flex-col"
      style={{ 
        background: `linear-gradient(135deg, ${colors.lila}20 0%, ${colors.verdeClaro}30 50%, ${colors.verdeTurquesa}20 100%)`
      }}
    >
      {/* Logo Hablandis - mismo estilo que diapositiva 1 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 right-8"
      >
        <img 
          src="/hablandis.png" 
          alt="Hablandis" 
          className="h-20"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
            img.parentElement!.innerHTML = `
              <div style="text-align: right;">
                <div style="font-family: 'Aglet Mono', monospace; color: ${colors.azulOscuro}; font-size: 24px; font-weight: 700;">
                  Hablandis
                </div>
                <div style="font-family: 'Raleway', sans-serif; color: ${colors.verdeTurquesa}; font-size: 11px; margin-top: 2px;">
                  Centro Internacional de Idiomas
                </div>
              </div>
            `;
          }}
        />
      </motion.div>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto w-full">
        {!showAnalysis ? (
          <>
            {/* Título */}
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-center mb-4"
              style={{ color: colors.azulOscuro, fontFamily: 'Aglet Mono, monospace' }}
            >
              🎵 ELLA LLEGÓ 🎵
            </motion.h1>

            {/* Estado del audio para debugging */}
            <div className="text-center mb-4 text-sm" style={{ color: colors.grisOscuro }}>
              Estado del audio: {audioStatus}
            </div>

            {/* Reproductor de Audio - probar diferentes paths */}
            <audio 
              ref={audioRef} 
              src="/ella llego.mp3"
              preload="auto"
              onError={(e) => console.error("Audio element error event:", e)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-8 mb-8 w-full max-w-2xl"
              style={{
                backgroundColor: colors.blanco + '90',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            >
              {/* Mensaje de error si el audio no carga */}
              {audioError && (
                <div className="text-red-600 text-center mb-4 p-4 bg-red-50 rounded-lg">
                  <p className="font-semibold">Error al cargar el audio</p>
                  <p className="text-sm mt-2">Verifica que el archivo existe en /public/ella llego.mp3</p>
                  <p className="text-xs mt-1">Revisa la consola del navegador para más detalles</p>
                </div>
              )}

              {/* Controles del reproductor */}
              <div className="flex items-center justify-center space-x-6 mb-6">
                <button
                  onClick={togglePlay}
                  className="w-20 h-20 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                  style={{ backgroundColor: colors.amarillo }}
                >
                  <span className="text-4xl text-gray-900">
                    {isPlaying ? '⏸️' : '▶️'}
                  </span>
                </button>
              </div>

              {/* Barra de progreso */}
              <div className="mb-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full"
                    style={{ 
                      backgroundColor: colors.verdeTurquesa,
                      width: `${duration ? (currentTime / duration) * 100 : 0}%`
                    }}
                  />
                </div>
                <div className="flex justify-between text-gray-600 text-sm mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration || 0)}</span>
                </div>
              </div>

              {/* Info adicional para debugging */}
              <div className="text-xs text-gray-500 text-center mt-4">
                <p>Ready State: {audioRef.current?.readyState || 'N/A'}</p>
                <p>Network State: {audioRef.current?.networkState || 'N/A'}</p>
              </div>
            </motion.div>

            {/* Área de Karaoke */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl p-8 w-full max-w-4xl max-h-96 overflow-y-auto"
              style={{
                backgroundColor: colors.blanco + '80',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            >
              <div className="space-y-3">
                {lyrics.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.3 }}
                    animate={{ 
                      opacity: index <= currentLyricIndex ? 1 : 0.3,
                      scale: index === currentLyricIndex ? 1.05 : 1,
                      x: index === currentLyricIndex ? 10 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className={`text-lg leading-relaxed ${
                      line.type === 'section' ? 'font-bold mt-6 mb-2' : ''
                    } ${
                      line.type === 'intro' || line.type === 'spoken' ? 'italic' : ''
                    } ${
                      line.type === 'chorus' ? 'text-xl font-semibold' : ''
                    }`}
                    style={{ 
                      color: index <= currentLyricIndex 
                        ? (line.type === 'chorus' ? colors.verdeTurquesa : colors.azulOscuro)
                        : colors.grisOscuro + '60',
                      fontFamily: line.type === 'section' ? 'Aglet Mono, monospace' : 'Raleway, sans-serif'
                    }}
                  >
                    {line.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Botón de prueba con audio online */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
                  audioRef.current.load();
                  console.log("Switched to online audio source for testing");
                }
              }}
              className="mt-4 px-4 py-2 text-sm rounded-lg"
              style={{ 
                backgroundColor: colors.grisOscuro + '20',
                color: colors.grisOscuro
              }}
            >
              Probar con audio de prueba online
            </motion.button>
          </>
        ) : (
          /* Análisis Post-Canción */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <h2 
              className="text-4xl font-bold text-center mb-12"
              style={{ color: colors.azulOscuro, fontFamily: 'Aglet Mono, monospace' }}
            >
              Analicemos la canción 🎭
            </h2>

            {/* Botones de secciones */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {Object.entries(sections).map(([key, section]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSection(selectedSection === key ? null : key)}
                  className="backdrop-blur-lg rounded-xl p-6 text-center transition-all"
                  style={{
                    backgroundColor: selectedSection === key ? section.color + '20' : colors.blanco + '80',
                    borderColor: selectedSection === key ? section.color : 'transparent',
                    borderWidth: 3,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }}
                >
                  <div className="text-5xl mb-3">{section.icon}</div>
                  <h3 className="text-xl font-semibold" style={{ 
                    color: colors.azulOscuro,
                    fontFamily: 'Aglet Mono, monospace' 
                  }}>
                    {section.title}
                  </h3>
                </motion.button>
              ))}
            </div>

            {/* Contenido de la sección seleccionada */}
            {selectedSection && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="backdrop-blur-lg rounded-2xl p-8"
                style={{
                  backgroundColor: colors.blanco + '90',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}
              >
                <h3 
                  className="text-2xl font-bold mb-6"
                  style={{ 
                    color: sections[selectedSection as keyof typeof sections].color,
                    fontFamily: 'Aglet Mono, monospace'
                  }}
                >
                  {sections[selectedSection as keyof typeof sections].title}
                </h3>
                <ul className="space-y-3 text-lg">
                  {sections[selectedSection as keyof typeof sections].content.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{ 
                        fontFamily: 'Raleway, sans-serif',
                        color: colors.grisOscuro
                      }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Botón para volver a escuchar */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowAnalysis(false);
                setSelectedSection(null);
                setCurrentTime(0);
                setIsPlaying(false);
                if (audioRef.current) {
                  audioRef.current.currentTime = 0;
                }
              }}
              className="mt-8 mx-auto block px-8 py-3 rounded-full text-white font-semibold transition-all"
              style={{ 
                backgroundColor: colors.verdeTurquesa,
                fontFamily: 'Raleway, sans-serif'
              }}
            >
              🎵 Escuchar de nuevo
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Footer con Copyright - mismo estilo que diapositiva 1 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-0 left-0 right-0 py-4 text-center"
        style={{ 
          backgroundColor: colors.blanco + '40',
          backdropFilter: 'blur(10px)',
          borderTop: `1px solid ${colors.azulOscuro}20`
        }}
      >
        <p style={{ 
          fontFamily: 'Raleway, sans-serif',
          fontSize: '14px',
          color: colors.azulOscuro,
          letterSpacing: '0.5px',
          fontWeight: 500
        }}>
          © 2025 Hablandis Centro Internacional de Idiomas - Todos los derechos reservados
        </p>
      </motion.div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 2
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