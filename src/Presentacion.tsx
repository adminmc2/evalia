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
// DIAPOSITIVA 2: EL DRAMA DE LA EVALUACIÓN - DISEÑO MINIMALISTA
// =======================================================================
const Diapositiva2 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const karaokeRef = useRef<HTMLDivElement>(null);

  // Timeline correcto basado en la letra completa
  const lyrics = [
    // Intro hablado
    { time: 2.3, text: "Son las tres de la mañana...", type: "spoken" },
    { time: 5.2, text: "El café ya está frío...", type: "spoken" },
    { time: 6.8, text: "Y todavía me quedan 47 exámenes...", type: "spoken" },
    
    // Verso 1
    { time: 9.2, text: "Mi vida es un plato de sopa fría", type: "verse" },
    { time: 11.3, text: "Corrigiendo hasta que salga el día", type: "verse" },
    { time: 13.7, text: "El subjuntivo me persigue en mis sueños", type: "verse" },
    { time: 16.1, text: "\"Ser y estar\" son ya mis dueños", type: "verse" },
    { time: 18.2, text: "Las tildes bailan la macarena", type: "verse" },
    { time: 20.6, text: "En cada examen veo la misma pena", type: "verse" },
    { time: 23, text: "\"Yo soy en el baño\" escribió María", type: "verse" },
    { time: 25.1, text: "\"Ayer yo he ido\" - ¡qué melodía!", type: "verse" },
    
    // Verso 2
    { time: 27.5, text: "Test de nivel, comprensión lectora", type: "verse" },
    { time: 29.9, text: "Expresión escrita que me deteriora", type: "verse" },
    { time: 32, text: "\"Mi perro está muy bueno\" leo atónito", type: "verse" },
    { time: 34.4, text: "\"Es muy frío hoy\" - error sintomático", type: "verse" },
    { time: 37.1, text: "Evaluar no es solo gramática", type: "verse" },
    { time: 39.5, text: "Competencias, contexto, pragmática", type: "verse" },
    { time: 42.1, text: "¿Diagnóstica o formativa?", type: "verse" },
    { time: 44.5, text: "Mi cabeza ya no es productiva", type: "verse" },
    
    // Estribillo (primera vez)
    { time: 46.4, text: "¡ELLA LLEGÓ! Como pizza a domicilio", type: "chorus" },
    { time: 48.8, text: "¡ELLA LLEGÓ! Mi salvación con brillo", type: "chorus" },
    { time: 51.4, text: "Comprende cada nivel del MCER", type: "chorus" },
    { time: 53.5, text: "¡Analiza todo en un dos por tres!", type: "chorus" },
    { time: 55.7, text: "¡ELLA LLEGÓ! Con su magia digital", type: "chorus" },
    { time: 57.8, text: "¡ELLA LLEGÓ! Es algo sensacional", type: "chorus" },
    { time: 60.7, text: "Evalúa competencias integradas", type: "chorus" },
    { time: 62.8, text: "¡Adiós a las noches desveladas!", type: "chorus" },
    
    // Verso 3
    { time: 74, text: "\"Voy a coger el autobús\" dice Roberto", type: "verse" },
    { time: 76.4, text: "(No sabe que en América es desacierto)", type: "verse" },
    { time: 78.8, text: "\"Llévame este libro\" escribe Juan", type: "verse" },
    { time: 81.2, text: "(Traer y llevar siempre confundirán)", type: "verse" },
    { time: 83.6, text: "ELLA detecta patrones por lengua materna", type: "verse" },
    { time: 85.7, text: "ELLA sabe si es polaco o si es de Berna", type: "verse" },
    { time: 88.1, text: "Retroalimenta con pedagogía", type: "verse" },
    { time: 91, text: "¡Por fin llegó la tecnología!", type: "verse" },
    
    // Estribillo (repetición final)
    { time: 93.2, text: "¡ELLA LLEGÓ! Como pizza a domicilio", type: "chorus" },
    { time: 95.4, text: "¡ELLA LLEGÓ! Mi salvación con brillo", type: "chorus" },
    { time: 97.6, text: "Comprende cada nivel del MCER", type: "chorus" },
    { time: 99.8, text: "¡Analiza todo en un dos por tres!", type: "chorus" },
    { time: 102, text: "¡ELLA LLEGÓ! Con su magia digital", type: "chorus" },
    { time: 104.2, text: "¡ELLA LLEGÓ! Es algo sensacional", type: "chorus" },
    { time: 106.4, text: "Evalúa competencias integradas", type: "chorus" },
    { time: 108.6, text: "¡Adiós a las noches desveladas!", type: "chorus" }
  ];

  // Iconos minimalistas lineales - TAMAÑO AUMENTADO
  const MinimalIcons = {
    book: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    error: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    star: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    volume: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
    ),
    music: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    )
  };

  // Secciones para análisis con iconos minimalistas
  const sections = {
    vida: {
      title: "La vida del profesor",
      icon: MinimalIcons.book,
      content: [
        "Son las 3 AM corrigiendo exámenes",
        "El café frío como compañero",
        "47 exámenes por revisar",
        "Evaluación manual repetitiva",
        "Agotamiento mental y físico"
      ],
      color: colors.azulOscuro
    },
    errores: {
      title: "Errores que se presentan",
      icon: MinimalIcons.error,
      content: [
        "\"Yo soy en el baño\" (ser/estar)",
        "\"Mi perro está muy bueno\" (contexto)",
        "\"Es muy frío hoy\" (hacer/estar)",
        "\"Voy a coger el autobús\" (variantes)",
        "Confusión traer/llevar"
      ],
      color: colors.amarillo
    },
    esperamos: {
      title: "Lo que esperamos",
      icon: MinimalIcons.star,
      content: [
        "Análisis automático instantáneo",
        "Detección de patrones por L1",
        "Evaluación de competencias integradas",
        "Retroalimentación pedagógica",
        "¡Adiós noches desveladas!"
      ],
      color: colors.verdeTurquesa
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    
    // Establecer volumen inicial
    audio.volume = volume;

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  // Auto-scroll del karaoke
  useEffect(() => {
    const currentLyricIndex = getCurrentLyricIndex();
    if (currentLyricIndex >= 0 && karaokeRef.current) {
      const currentElement = karaokeRef.current.children[currentLyricIndex] as HTMLElement;
      if (currentElement) {
        currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentTime]);

  // Actualizar volumen cuando cambie
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => {
        console.error("Error playing audio:", err);
      });
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

  const toggleSection = (sectionKey: string) => {
    setExpandedSection(expandedSection === sectionKey ? null : sectionKey);
  };

  const currentLyricIndex = getCurrentLyricIndex();

  // Calcular el tipo actual (verso, coro, etc.) para efectos visuales
  const currentLyricType = currentLyricIndex >= 0 ? lyrics[currentLyricIndex].type : null;

  return (
    <div 
      className="min-h-screen relative p-12 flex flex-col"
      style={{ 
        background: `linear-gradient(135deg, ${colors.lila}80 0%, ${colors.amarillo}20 50%, ${colors.azulOscuro}15 100%)`
      }}
    >
      {/* Indicadores musicales animados - NUEVOS ELEMENTOS INTERACTIVOS */}
      <div className="absolute top-0 left-0 right-0 h-2 overflow-hidden">
        <motion.div
          className="h-full"
          animate={{
            background: isPlaying 
              ? `linear-gradient(90deg, ${colors.amarillo}40 0%, ${colors.verdeTurquesa}40 50%, ${colors.amarillo}40 100%)`
              : `linear-gradient(90deg, ${colors.grisOscuro}20 0%, ${colors.grisOscuro}20 100%)`
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            transform: isPlaying ? 'translateX(0%)' : 'translateX(-100%)',
          }}
        />
      </div>

      {/* Patrón de ondas sonoras minimalista - NUEVO ELEMENTO VISUAL */}
      <div className="absolute top-20 right-20 opacity-10">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              scale: isPlaying ? [1, 1.5, 2] : 1,
              opacity: isPlaying ? [0.3, 0.1, 0] : 0,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut"
            }}
            style={{
              width: `${i * 40}px`,
              height: `${i * 40}px`,
              border: `1px solid ${colors.azulOscuro}`,
              borderRadius: '50%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>

      {/* Logo Hablandis - AUMENTADO A h-52 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-8"
      >
        <img 
          src="/hablandis.png" 
          alt="Hablandis" 
          className="h-52"
          style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.1))' }}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
            img.parentElement!.innerHTML = `
              <div>
                <div style="font-family: 'Aglet Mono', monospace; color: ${colors.azulOscuro}; font-size: 60px; font-weight: 700;">
                  Hablandis
                </div>
                <div style="font-family: 'Raleway', sans-serif; color: ${colors.verdeTurquesa}; font-size: 26px; margin-top: 4px;">
                  Centro Internacional de Idiomas
                </div>
              </div>
            `;
          }}
        />
      </motion.div>

      {/* Elementos decorativos flotantes minimalistas - NUEVO */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
        {['♪', '♫', '♬'].map((note, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl"
            style={{ 
              color: colors.amarillo + '30',
              left: `${(i - 1) * 100}px`
            }}
            animate={{
              y: isPlaying ? [0, -20, 0] : 0,
              opacity: isPlaying ? [0.3, 0.6, 0.3] : 0.2,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            {note}
          </motion.span>
        ))}
      </div>

      {/* Título Principal - AJUSTADO PARA MEJOR ESPACIADO */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-bold text-center mb-12"
        style={{ 
          color: colors.azulOscuro, 
          fontFamily: 'Aglet Mono, monospace',
          marginTop: '80px' // Reducido de 120px
        }}
      >
        El drama de la evaluación
      </motion.h1>

      {/* Indicador visual del ritmo - MEJORADO */}
      {isPlaying && (
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={{
            scale: currentLyricType === 'chorus' ? [1, 1.2, 1] : [1, 1.05, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: currentLyricType === 'chorus' ? 0.5 : 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-96 h-96 rounded-full"
            style={{ 
              background: `radial-gradient(circle, ${currentLyricType === 'chorus' ? colors.amarillo : colors.verdeTurquesa}20 0%, transparent 70%)`
            }}
          />
        </motion.div>
      )}

      {/* Contenido Principal - 2 columnas ajustadas */}
      <div className="flex gap-12 max-w-7xl mx-auto w-full" style={{ marginBottom: '80px' }}>
        
        {/* Columna Izquierda - Análisis */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="w-3/5"
        >
          <h2 
            className="text-3xl font-semibold mb-8"
            style={{ color: colors.azulOscuro, fontFamily: 'Aglet Mono, monospace' }}
          >
            Analicemos la canción
          </h2>

          <div className="space-y-4">
            {Object.entries(sections).map(([key, section]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl overflow-hidden"
                style={{
                  backgroundColor: colors.blanco + '70',
                  border: `1px solid ${expandedSection === key ? section.color + '40' : 'transparent'}`,
                  transform: expandedSection === key ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
              >
                <button
                  onClick={() => toggleSection(key)}
                  className="w-full p-7 text-left transition-all duration-300 hover:bg-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        style={{ color: section.color }}
                        animate={{ 
                          rotate: expandedSection === key ? 360 : 0 
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {section.icon}
                      </motion.div>
                      <h3 
                        className="text-xl font-medium"
                        style={{ 
                          color: colors.azulOscuro,
                          fontFamily: 'Raleway, sans-serif'
                        }}
                      >
                        {section.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedSection === key ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ color: colors.grisOscuro }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </motion.div>
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedSection === key ? 'auto' : 0,
                    opacity: expandedSection === key ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-7 pb-7">
                    <ul className="space-y-3">
                      {section.content.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="text-lg flex items-start gap-3"
                          style={{ 
                            fontFamily: 'Raleway, sans-serif',
                            color: colors.grisOscuro
                          }}
                        >
                          <span 
                            className="mt-2"
                            style={{ 
                              width: '6px', 
                              height: '6px', 
                              backgroundColor: section.color,
                              borderRadius: '50%',
                              display: 'block',
                              flexShrink: 0
                            }}
                          />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Columna Derecha - Reproductor y Karaoke */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="w-2/5 flex flex-col"
        >
          {/* Reproductor Mejorado con Controles Adicionales */}
          <div className="mb-6 relative">
            <audio ref={audioRef} src="/ella.mp3" />
            
            <div className="flex items-center gap-4">
              {/* Botón Play/Pause con animación */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="w-16 h-16 rounded-full flex items-center justify-center transition-all relative"
                style={{ 
                  backgroundColor: colors.azulOscuro + '10',
                  border: `2px solid ${colors.azulOscuro}`,
                  color: colors.azulOscuro
                }}
              >
                {/* Animación de pulso cuando está reproduciendo */}
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ backgroundColor: colors.amarillo }}
                  />
                )}
                {isPlaying ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </motion.button>

              {/* Barra de progreso y tiempo */}
              <div className="flex-1">
                <div 
                  className="h-2 bg-black/10 rounded-full overflow-hidden mb-2 cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const percentage = x / rect.width;
                    if (audioRef.current && duration) {
                      audioRef.current.currentTime = percentage * duration;
                    }
                  }}
                >
                  <motion.div 
                    className="h-full relative"
                    style={{ 
                      backgroundColor: colors.azulOscuro,
                      width: `${duration ? (currentTime / duration) * 100 : 0}%`
                    }}
                    transition={{ duration: 0.1 }}
                  >
                    {/* Indicador de posición */}
                    <div 
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full"
                      style={{ 
                        backgroundColor: colors.amarillo,
                        border: `2px solid ${colors.blanco}`,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    />
                  </motion.div>
                </div>
                <div className="flex justify-between text-base" style={{ color: colors.grisOscuro }}>
                  <span style={{ fontFamily: 'monospace' }}>{formatTime(currentTime)}</span>
                  <div className="flex items-center gap-4">
                    {/* Control de volumen - NUEVO */}
                    <div className="relative">
                      <button
                        onClick={() => setShowVolumeControl(!showVolumeControl)}
                        className="p-1 hover:opacity-70 transition-opacity"
                      >
                        {MinimalIcons.volume}
                      </button>
                      {showVolumeControl && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2"
                          style={{ backgroundColor: colors.blanco + 'F0', padding: '8px', borderRadius: '8px' }}
                        >
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-20 transform -rotate-90"
                            style={{ cursor: 'pointer' }}
                          />
                        </motion.div>
                      )}
                    </div>
                    <span style={{ fontFamily: 'monospace' }}>{formatTime(duration || 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Área de Karaoke con indicadores musicales */}
          <div 
            className="rounded-xl p-6 overflow-hidden relative"
            style={{
              backgroundColor: colors.blanco + '50',
              border: `1px solid ${colors.azulOscuro}10`,
              height: '420px'
            }}
          >
            {/* Indicador de música en la esquina - NUEVO */}
            <motion.div 
              className="absolute top-4 right-4"
              animate={{ 
                rotate: isPlaying ? 360 : 0,
                opacity: isPlaying ? 1 : 0.3
              }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                opacity: { duration: 0.3 }
              }}
              style={{ color: colors.amarillo }}
            >
              {MinimalIcons.music}
            </motion.div>

            <div 
              ref={karaokeRef}
              className="h-full overflow-y-auto space-y-2 pr-4"
              style={{ 
                maxHeight: 'calc(100% - 10px)',
                scrollBehavior: 'smooth'
              }}
            >
              {lyrics.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: index <= currentLyricIndex ? 0.9 : 0.3,
                    scale: index === currentLyricIndex ? 1.02 : 0.98,
                    x: index === currentLyricIndex ? 5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className={`${
                    line.type === 'spoken' ? 'italic' : ''
                  } ${
                    line.type === 'chorus' ? 'text-xl font-bold' : 'text-lg'
                  } leading-relaxed py-2`}
                  style={{ 
                    color: index <= currentLyricIndex 
                      ? (line.type === 'chorus' ? colors.azulOscuro : colors.grisOscuro)
                      : colors.grisOscuro + '60',
                    fontFamily: 'Raleway, sans-serif',
                    borderLeft: index === currentLyricIndex ? `3px solid ${colors.azulOscuro}` : '3px solid transparent',
                    paddingLeft: '16px',
                    transition: 'all 0.3s ease',
                    backgroundColor: index === currentLyricIndex 
                      ? (line.type === 'chorus' ? colors.amarillo + '15' : colors.verdeTurquesa + '10')
                      : 'transparent'
                  }}
                >
                  {line.text}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer con Copyright */}
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
// DIAPOSITIVA 3: PROCESO FORMATIVO Y EVALUACIÓN - VERSIÓN INTERACTIVA MEJORADA
// =======================================================================
const Diapositiva3 = () => {
  const [activeProcess, setActiveProcess] = useState<string | null>(null);
  const [evaluationTab, setEvaluationTab] = useState<'polonia' | 'hablandis' | 'integracion' | null>(null);

  // Iconos SVG minimalistas de línea delgada
  const LineIcons = {
    pencil: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    puzzle: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M20 7h-2.5c-1.5 0-2.5-1-2.5-2.5s-2-2.5-3.5-2.5-2.5 1-2.5 2.5-1 2.5-2.5 2.5H4v3c0 1.5-1 2.5-2.5 2.5s-2.5 2-2.5 3.5 1 2.5 2.5 2.5S4 17.5 4 16v-3h2.5c1.5 0 2.5 1 2.5 2.5s2 2.5 3.5 2.5 2.5-1 2.5-2.5 1-2.5 2.5-2.5H20v-6z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    target: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    qr: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="3" y="3" width="7" height="7" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="14" y="3" width="7" height="7" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="3" y="14" width="7" height="7" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="14" y="14" width="3" height="3" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="18" y="18" width="3" height="3" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="14" y="18" width="3" height="3" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="18" y="14" width="3" height="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  };

  // Colores pastel suaves
  const pastelColors = {
    amarillo: colors.amarillo + '20',
    lila: colors.lila + '20',
    verdeTurquesa: colors.verdeTurquesa + '20',
    azulOscuro: colors.azulOscuro + '10'
  };

  const procesosFormativos = {
    ejercicio: {
      titulo: 'Ejercicio',
      subtitulo: 'Acción descontextualizada',
      descripcion: 'Acción descontextualizada no referida a la vida real, que se ejercita de forma mecánica. Requiere de repetición, memorización y reproducción.',
      icon: LineIcons.pencil,
      color: pastelColors.amarillo,
      borderColor: colors.amarillo
    },
    actividad: {
      titulo: 'Actividad',
      subtitulo: 'Proceso mental sencillo',
      descripcion: 'Requiere un proceso mental sencillo para su resolución. Implica comprensión y toma de decisiones.',
      icon: LineIcons.puzzle,
      color: pastelColors.lila,
      borderColor: colors.lila
    },
    tarea: {
      titulo: 'Tarea o Proyecto',
      subtitulo: 'Producto significativo',
      descripcion: 'Producto relevante y significativo con referencia a la vida real que requiere una activación de las competencias.',
      icon: LineIcons.target,
      color: pastelColors.verdeTurquesa,
      borderColor: colors.verdeTurquesa
    }
  };

  // Información completa del sistema polaco según los datos proporcionados
  const evaluacionCompleta = {
    polonia: {
      titulo: 'Evaluación en Polonia - Cambios 2024-2025',
      contenido: (
        <div className="space-y-4">
          <div>
            <h5 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', fontWeight: 600, color: colors.azulOscuro, marginBottom: '8px' }}>
              Reducción de niveles de competencia
            </h5>
            <ul className="space-y-1 ml-4">
              <li style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                • Primera lengua extranjera: De B1 → A2+ en producción escrita y oral (clase VIII)
              </li>
              <li style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                • Secundaria: De B2+ → B2 para primer idioma
              </li>
              <li style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                • Segunda lengua: Mantenido en A2
              </li>
            </ul>
          </div>
          
          <div>
            <h5 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', fontWeight: 600, color: colors.azulOscuro, marginBottom: '8px' }}>
              Eliminación de contenidos
            </h5>
            <ul className="space-y-1 ml-4">
              <li style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                • Suprimido el ámbito "vida social" (eventos sociales)
              </li>
              <li style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                • Eliminadas la nota y el texto privado en destrezas escritas
              </li>
              <li style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                • Retirada la competencia de "organizar información en orden específico"
              </li>
            </ul>
          </div>
          
          <div>
            <h5 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', fontWeight: 600, color: colors.azulOscuro, marginBottom: '8px' }}>
              Sistema de evaluación actual
            </h5>
            <ul className="space-y-1 ml-4">
              <li style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                • Evaluación formativa no obligatoria (retroalimentación sin notas)
              </li>
              <li style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                • Autoevaluación básica sin Portfolio Europeo oficial
              </li>
              <li style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                • Heteroevaluación dominante con exámenes estatales (egzamin ósmoklasisty)
              </li>
            </ul>
          </div>
        </div>
      )
    },
    hablandis: {
      titulo: 'Evaluación en Hablandis',
      contenido: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: colors.verdeTurquesa + '20' }}>
              <span style={{ display: 'block', width: '100%', height: '100%' }}></span>
            </div>
            <div>
              <h5 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', fontWeight: 600, color: colors.azulOscuro }}>
                Test de nivel al principio
              </h5>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                Evaluación diagnóstica completa para establecer el punto de partida real del estudiante
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: colors.verdeTurquesa + '20' }}>
              <span style={{ display: 'block', width: '100%', height: '100%' }}></span>
            </div>
            <div>
              <h5 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', fontWeight: 600, color: colors.azulOscuro }}>
                Diagnóstico del aprendizaje lingüístico
              </h5>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                Análisis profundo de competencias comunicativas, gramaticales y culturales
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: colors.verdeTurquesa + '20' }}>
              <span style={{ display: 'block', width: '100%', height: '100%' }}></span>
            </div>
            <div>
              <h5 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', fontWeight: 600, color: colors.azulOscuro }}>
                Preparación de una propuesta educativa personalizada
              </h5>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                Diseño específico según objetivos del centro y necesidades del grupo
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: colors.verdeTurquesa + '20' }}>
              <span style={{ display: 'block', width: '100%', height: '100%' }}></span>
            </div>
            <div>
              <h5 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', fontWeight: 600, color: colors.azulOscuro }}>
                Evaluación formativa integrativa a través de una tarea
              </h5>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                Se evalúa el nuevo nivel del estudiante considerando toda su labor durante el período del viaje de estudio. Esto incluye minitareas y la tarea final
              </p>
            </div>
          </div>
        </div>
      )
    },
    integracion: {
      titulo: 'Integración',
      contenido: (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h5 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px', fontWeight: 600, color: colors.azulOscuro }}>
              Adaptamos la propuesta evaluativa a la demanda curricular del centro
            </h5>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '14px', color: colors.grisOscuro, marginTop: '8px' }}>
              Personalizamos nuestra propuesta para cada institución educativa
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: pastelColors.azulOscuro }}>
              <h6 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '14px', fontWeight: 600, color: colors.azulOscuro, marginBottom: '4px' }}>
                Respetamos
              </h6>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                Currículo oficial polaco y objetivos institucionales
              </p>
            </div>
            
            <div className="p-4 rounded-lg" style={{ backgroundColor: pastelColors.lila }}>
              <h6 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '14px', fontWeight: 600, color: colors.azulOscuro, marginBottom: '4px' }}>
                Enriquecemos
              </h6>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                Con metodologías comunicativas y contextos reales
              </p>
            </div>
            
            <div className="p-4 rounded-lg" style={{ backgroundColor: pastelColors.verdeTurquesa }}>
              <h6 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '14px', fontWeight: 600, color: colors.azulOscuro, marginBottom: '4px' }}>
                Documentamos
              </h6>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                Portfolio digital con evidencias del progreso
              </p>
            </div>
            
            <div className="p-4 rounded-lg" style={{ backgroundColor: pastelColors.amarillo }}>
              <h6 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '14px', fontWeight: 600, color: colors.azulOscuro, marginBottom: '4px' }}>
                Certificamos
              </h6>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: colors.grisOscuro }}>
                Certificado como centro acreditado del Instituto Cervantes
              </p>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{ 
        background: `linear-gradient(135deg, ${colors.verdeClaro}30 0%, ${colors.blanco} 100%)`
      }}
    >
      {/* Logo en esquina superior derecha */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 right-8 z-10"
      >
        <img 
          src="/hablandis.png" 
          alt="Hablandis" 
          className="h-20"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
            img.parentElement!.innerHTML = `
              <div style="text-align: right;">
                <div style="font-family: 'Aglet Mono', monospace; color: ${colors.azulOscuro}; font-size: 28px; font-weight: 600;">
                  Hablandis
                </div>
                <div style="font-family: 'Raleway', sans-serif; color: ${colors.verdeTurquesa}; font-size: 12px;">
                  Centro Internacional de Idiomas
                </div>
              </div>
            `;
          }}
        />
      </motion.div>

      <div className="h-screen flex flex-col p-8">
        
        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 mt-4"
          style={{
            fontFamily: 'Aglet Mono, monospace',
            fontSize: '34px',
            fontWeight: 600,
            color: colors.azulOscuro
          }}
        >
          ¿Cómo se estructura el proceso de aprendizaje<br/>
          en los viajes escolares?
        </motion.h1>

        {/* Contenido principal */}
        <div className="flex-1 flex gap-6">
          
          {/* Columna principal */}
          <div className="flex-1 flex flex-col">
            
            {/* Sección del proceso formativo */}
            <div className="mb-6">
              <h2 style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: '22px',
                fontWeight: 500,
                color: colors.azulOscuro,
                marginBottom: '16px'
              }}>
                Del ejercicio a la tarea
              </h2>

              {/* Tarjetas horizontales del proceso */}
              <div className="flex gap-4 h-32">
                {Object.entries(procesosFormativos).map(([key, proceso]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 relative overflow-hidden rounded-xl shadow-md cursor-pointer transition-all"
                    style={{
                      backgroundColor: activeProcess === key ? proceso.color : colors.blanco,
                      border: `1px solid ${activeProcess === key ? proceso.borderColor : colors.grisOscuro + '20'}`
                    }}
                    onClick={() => setActiveProcess(activeProcess === key ? null : key)}
                    whileHover={{ y: -2 }}
                  >
                    <div className="p-4 h-full flex flex-col">
                      <div className="flex items-center gap-3 mb-2">
                        <div style={{ color: proceso.borderColor }}>
                          {proceso.icon}
                        </div>
                        <div>
                          <h3 style={{
                            fontFamily: 'Raleway, sans-serif',
                            fontSize: '16px',
                            fontWeight: 600,
                            color: colors.azulOscuro
                          }}>
                            {proceso.titulo}
                          </h3>
                          <p style={{
                            fontFamily: 'Raleway, sans-serif',
                            fontSize: '12px',
                            color: colors.grisOscuro
                          }}>
                            {proceso.subtitulo}
                          </p>
                        </div>
                      </div>
                      
                      {activeProcess === key && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{
                            fontFamily: 'Raleway, sans-serif',
                            fontSize: '12px',
                            color: colors.grisOscuro,
                            lineHeight: '1.4'
                          }}
                        >
                          {proceso.descripcion}
                        </motion.p>
                      )}
                    </div>
                    
                    {/* Indicador visual de conexión */}
                    {key !== 'tarea' && (
                      <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18l6-6-6-6" stroke={colors.grisOscuro} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sistema de evaluación */}
            <div className="flex-1 flex flex-col">
              <h3 style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: '20px',
                fontWeight: 500,
                color: colors.azulOscuro,
                marginBottom: '6px'
              }}>
                Una propuesta evaluativa adaptativa
              </h3>
              <p style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: '13px',
                color: colors.grisOscuro,
                marginBottom: '16px'
              }}>
                Integramos el sistema educativo polaco con metodologías comunicativas innovadoras
              </p>

              {/* Tabs de evaluación */}
              <div className="flex gap-2 mb-4">
                {Object.keys(evaluacionCompleta).map((key) => (
                  <button
                    key={key}
                    onClick={() => setEvaluationTab(evaluationTab === key ? null : key as any)}
                    className="px-4 py-2 rounded-lg transition-all"
                    style={{
                      backgroundColor: evaluationTab === key ? colors.azulOscuro : colors.blanco,
                      color: evaluationTab === key ? colors.blanco : colors.azulOscuro,
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: '14px',
                      fontWeight: 500,
                      border: `1px solid ${colors.azulOscuro}20`
                    }}
                  >
                    {evaluacionCompleta[key as keyof typeof evaluacionCompleta].titulo.split(' - ')[0]}
                  </button>
                ))}
              </div>

              {/* Contenido de evaluación */}
              <div className="flex-1 bg-white rounded-xl shadow-md p-5 overflow-auto">
                {evaluationTab ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h4 style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: colors.azulOscuro,
                      marginBottom: '12px'
                    }}>
                      {evaluacionCompleta[evaluationTab].titulo}
                    </h4>
                    {evaluacionCompleta[evaluationTab].contenido}
                  </motion.div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: '14px',
                      color: colors.grisOscuro,
                      opacity: 0.6,
                      textAlign: 'center'
                    }}>
                      Haz clic en una pestaña para ver más información
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna de videos y QR */}
          <div className="w-[25%] flex flex-col gap-4">
            {/* Videos */}
            {[
              { title: 'Inmersión real', file: '/video1.mp4' },
              { title: 'Evaluación activa', file: '/video2.mp4' }
            ].map((video, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="relative rounded-lg overflow-hidden shadow-md group cursor-pointer"
                style={{ height: '160px', backgroundColor: colors.grisClaro }}
              >
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src={video.file}
                  muted
                  loop
                  playsInline
                />
                
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <div className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={colors.azulOscuro}>
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <p style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: '13px',
                    color: colors.blanco,
                    fontWeight: 500
                  }}>
                    {video.title}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {/* Código QR */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-lg shadow-md p-4 text-center"
            >
              <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center mb-2">
                <div style={{ color: colors.grisOscuro }}>
                  {LineIcons.qr}
                  <p style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: '10px',
                    marginTop: '4px'
                  }}>
                    [Código QR]
                  </p>
                </div>
              </div>
              <p style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: '12px',
                color: colors.azulOscuro,
                fontWeight: 500
              }}>
                Más información
              </p>
            </motion.div>
          </div>
        </div>

        {/* Footer ampliado con logo */}
        <div className="bg-gray-50 rounded-t-lg px-6 py-4 flex items-center justify-center gap-3 mt-4">
          <p style={{ 
            fontFamily: 'Raleway, sans-serif',
            fontSize: '12px',
            color: colors.grisOscuro,
            opacity: 0.7
          }}>
            © 2025
          </p>
          <img 
            src="/hablandis.png" 
            alt="Hablandis" 
            className="h-8 opacity-70"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
              const parent = img.parentElement!;
              const span = document.createElement('span');
              span.style.cssText = `font-family: 'Aglet Mono', monospace; color: ${colors.grisOscuro}; font-size: 14px; opacity: 0.7; font-weight: 600;`;
              span.textContent = 'Hablandis';
              parent.insertBefore(span, parent.querySelector('p:last-child'));
            }}
          />
          <p style={{ 
            fontFamily: 'Raleway, sans-serif',
            fontSize: '12px',
            color: colors.grisOscuro,
            opacity: 0.7
          }}>
            Centro Internacional de Idiomas - Todos los derechos reservados
          </p>
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 3
// =======================================================================

// =======================================================================
// DIAPOSITIVA 4: PRESENTAMOS A EVALIA
// =======================================================================
const Diapositiva4 = () => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [showElements, setShowElements] = useState({
    title: false,
    cards: false,
    info: false
  });

  // Colores del brandbook
  const slide4Colors = {
    verdeClaro: '#C4D4A4', // PANTONE 580 C
    turquoise: '#007567', // PANTONE 3295 C
    purple: '#B9ABE4', // PANTONE 2092 C
    yellow: '#FFC846', // PANTONE 1225 C
    darkBlue: '#12055F', // PANTONE 2755 C
    white: '#FFFFFF',
    black: '#000000',
    grisOscuro: '#666666'
  };

  // Animaciones de entrada
  useEffect(() => {
    const timers = [
      setTimeout(() => setShowElements(prev => ({...prev, title: true})), 300),
      setTimeout(() => setShowElements(prev => ({...prev, cards: true})), 600),
      setTimeout(() => setShowElements(prev => ({...prev, info: true})), 900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Datos de los tipos de test (simplificados para ganar espacio)
  const testTypes = [
    {
      id: 'rapido',
      name: 'Test Rápido',
      subtitle: 'Evaluación diagnóstica inicial',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      features: [
        '16 preguntas adaptativas por nivel',
        'Algoritmo de progresión validado',
        'Retroalimentación instantánea con IA',
        'Lector inmersivo integrado',
        'Tiempo estimado: 15-20 minutos'
      ],
      color: slide4Colors.yellow,
      highlight: 'Ideal para diagnóstico inicial rápido'
    },
    {
      id: 'completo',
      name: 'Test Completo',
      subtitle: 'Evaluación integral de competencias',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9h6M9 12h6M9 15h4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      features: [
        '20 preguntas por competencia lingüística',
        '4 módulos especializados completos',
        'Evaluación oral opcional con profesor',
        'Certificación digital de nivel incluida',
        '45-60 minutos'
      ],
      color: slide4Colors.turquoise,
      highlight: 'Certificación completa multidimensional'
    },
    {
      id: 'interactivo',
      name: 'Test Interactivo',
      subtitle: 'Conversación natural con IA',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
          <circle cx="12" cy="12" r="1"/>
          <circle cx="8" cy="12" r="1"/>
          <circle cx="16" cy="12" r="1"/>
        </svg>
      ),
      features: [
        'Chatbot conversacional con IA generativa',
        'Adaptación dinámica según respuestas',
        'Análisis de patrones por lengua materna',
        'Evaluación continua y natural',
        'Duración adaptativa'
      ],
      color: slide4Colors.purple,
      highlight: 'Experiencia conversacional innovadora'
    }
  ];

  // Tabla de progresión con explicaciones detalladas
  const progressionTable = [
    { 
      level: 'A1', 
      ranges: [
        { min: 0, max: 50, action: 'Nivel A1 básico', detail: 'Email confirmando nivel A1 inicial', color: '#FF6B6B' },
        { min: 50, max: 80, action: 'A1.2 umbral', detail: 'Se propone prueba escrita opcional', color: '#FFE66D' },
        { min: 80, max: 100, action: 'Avanza a A2', detail: 'Pasa automáticamente al siguiente nivel', color: '#4ECDC4' }
      ]
    },
    { 
      level: 'A2', 
      ranges: [
        { min: 0, max: 50, action: 'A2.1 básico', detail: 'Email confirmando nivel A2.1', color: '#FF6B6B' },
        { min: 50, max: 70, action: 'A2.1 consolidación', detail: 'Se propone prueba escrita', color: '#FFE66D' },
        { min: 71, max: 85, action: 'A2.2 avanzado', detail: 'Prueba escrita y oral recomendada', color: '#95E1D3' },
        { min: 85, max: 100, action: 'Avanza a B1', detail: 'Salta automáticamente a B1', color: '#4ECDC4' }
      ]
    },
    { 
      level: 'B1', 
      ranges: [
        { min: 0, max: 70, action: 'B1 básico', detail: 'Email confirmando nivel B1', color: '#FF6B6B' },
        { min: 71, max: 84, action: 'B1.1 intermedio', detail: 'Puede realizar prueba adicional', color: '#FFE66D' },
        { min: 85, max: 89, action: 'B1.2 avanzado', detail: 'Prueba escrita y oral sugerida', color: '#95E1D3' },
        { min: 90, max: 100, action: 'Avanza a B2', detail: 'Progresa automáticamente a B2', color: '#4ECDC4' }
      ]
    },
    { 
      level: 'B2', 
      ranges: [
        { min: 0, max: 60, action: 'B2 básico', detail: 'Email confirmando nivel B2', color: '#FF6B6B' },
        { min: 60, max: 74, action: 'B2.1 intermedio', detail: 'Prueba opcional disponible', color: '#FFE66D' },
        { min: 75, max: 79, action: 'B2.2 umbral', detail: 'Evaluación completa recomendada', color: '#95E1D3' },
        { min: 80, max: 100, action: 'Pasa a C1', detail: 'Accede al test de nivel C1', color: '#4ECDC4' }
      ]
    }
  ];

  // Características principales
  const coreFeatures = [
    {
      id: 'precision',
      title: 'Precisión',
      value: '97.7%',
      description: 'Diagnóstico validado'
    },
    {
      id: 'corpus',
      title: 'Base de datos',
      value: '46K+',
      description: 'Muestras reales'
    },
    {
      id: 'lenguas',
      title: 'L1 analizadas',
      value: '11+',
      description: 'Personalización'
    },
    {
      id: 'tiempo',
      title: 'Respuesta IA',
      value: '<2s',
      description: 'Instantánea'
    }
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${slide4Colors.verdeClaro}40 0%, ${slide4Colors.yellow}20 50%, ${slide4Colors.turquoise}30 100%)`
      }}
    >
      {/* Efectos de fondo decorativos con nuevos colores */}
      <div 
        className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl opacity-25"
        style={{ backgroundColor: slide4Colors.yellow }}
      />
      <div 
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: slide4Colors.turquoise }}
      />

      <div className="relative z-10 h-screen flex flex-col p-6">
        
        {/* Header - SIN LOGO EN ESQUINA SUPERIOR */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showElements.title ? 1 : 0, y: showElements.title ? 0 : -20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h1 
            className="text-5xl md:text-6xl font-light mb-3"
            style={{ 
              color: slide4Colors.darkBlue,
              fontFamily: 'Aglet Mono, monospace',
              letterSpacing: '2px'
            }}
          >
            Presentamos a EVALIA
          </h1>
          <p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            style={{ 
              color: slide4Colors.turquoise,
              fontFamily: 'Raleway, sans-serif'
            }}
          >
            Sistema inteligente de evaluación de español con IA
          </p>
        </motion.div>

        {/* Contenido principal - Grid optimizado con QR en columna izquierda */}
        <div className="flex-1 flex gap-6 max-h-[calc(100vh-240px)]">
          
          {/* Columna izquierda - CON QR INTEGRADO */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: showElements.cards ? 1 : 0, x: showElements.cards ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-[500px] overflow-y-auto pr-2"
          >
            <h3 className="text-2xl font-semibold mb-3" style={{ 
              color: slide4Colors.darkBlue,
              fontFamily: 'Raleway, sans-serif'
            }}>
              Modalidades de Evaluación
            </h3>
            
            <div className="space-y-3">
              {testTypes.map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showElements.cards ? 1 : 0, y: showElements.cards ? 0 : 20 }}
                  transition={{ delay: 0.1 * index }}
                  className={`
                    bg-white rounded-xl p-4 cursor-pointer transition-all duration-300
                    ${selectedTest === test.id ? 'shadow-2xl scale-102' : 'shadow-lg hover:shadow-xl'}
                  `}
                  style={{
                    borderLeft: `5px solid ${test.color}`,
                    backgroundColor: selectedTest === test.id ? `${test.color}05` : 'white'
                  }}
                  onClick={() => setSelectedTest(selectedTest === test.id ? null : test.id)}
                >
                  <div className="flex items-start gap-3">
                    <div style={{ color: test.color }} className="flex-shrink-0">
                      {test.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold" style={{ 
                        color: slide4Colors.darkBlue,
                        fontFamily: 'Aglet Mono, monospace'
                      }}>
                        {test.name}
                      </h4>
                      <p className="text-base text-gray-600 mb-1" style={{ fontFamily: 'Raleway, sans-serif' }}>
                        {test.subtitle}
                      </p>
                      
                      {!selectedTest && (
                        <p className="text-sm font-semibold" style={{ 
                          color: test.color,
                          fontFamily: 'Raleway, sans-serif'
                        }}>
                          {test.highlight}
                        </p>
                      )}
                      
                      {selectedTest === test.id && (
                        <motion.ul 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-1 mt-2"
                        >
                          {test.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={test.color} strokeWidth="2" className="mr-2 mt-0.5 flex-shrink-0">
                                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className="text-gray-700" style={{ fontFamily: 'Raleway, sans-serif' }}>
                                {feature}
                              </span>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Código QR con la imagen del repositorio */}
              <div className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-4 mt-4">
                <div className="w-32 h-32 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img 
                    src="/qr-code.png" 
                    alt="QR Code Presentación EVALIA" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1" style={{ 
                    color: slide4Colors.darkBlue,
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Materiales de Presentación
                  </h3>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>
                    Escanea para acceder a recursos y documentación
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Columna derecha - SIN QR */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: showElements.info ? 1 : 0, x: showElements.info ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 flex flex-col gap-4 overflow-y-auto pl-2"
          >
            {/* Características principales */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="text-xl font-semibold mb-3" style={{ 
                color: slide4Colors.darkBlue,
                fontFamily: 'Raleway, sans-serif'
              }}>
                Tecnología Validada
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {coreFeatures.map((feature) => (
                  <div 
                    key={feature.id}
                    className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-2xl font-bold" style={{ 
                      color: slide4Colors.turquoise,
                      fontFamily: 'Aglet Mono, monospace'
                    }}>
                      {feature.value}
                    </div>
                    <div className="text-xs font-semibold text-gray-800 mt-1" style={{ fontFamily: 'Raleway, sans-serif' }}>
                      {feature.title}
                    </div>
                    <div className="text-xs text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>
                      {feature.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabla de Progresión con explicaciones */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="text-xl font-semibold mb-3" style={{ 
                color: slide4Colors.darkBlue,
                fontFamily: 'Raleway, sans-serif'
              }}>
                Sistema de Progresión Adaptativo
              </h3>
              <p className="text-sm text-gray-700 mb-3" style={{ fontFamily: 'Raleway, sans-serif' }}>
                El estudiante avanza de nivel según su porcentaje de respuestas correctas
              </p>
              <div className="space-y-3">
                {progressionTable.map((level) => (
                  <div key={level.level}>
                    <div className="font-bold text-base mb-1" style={{ color: slide4Colors.darkBlue }}>
                      Nivel {level.level}
                    </div>
                    <div className="space-y-1">
                      {level.ranges.map((range, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div 
                            className="w-24 h-6 rounded text-xs flex items-center justify-center text-white font-medium"
                            style={{ backgroundColor: range.color }}
                          >
                            {range.min}-{range.max}%
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-semibold" style={{ color: slide4Colors.darkBlue }}>
                              {range.action}:
                            </span>
                            <span className="text-sm text-gray-600 ml-1" style={{ fontFamily: 'Raleway, sans-serif' }}>
                              {range.detail}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer copyright DELGADO con logo al lado */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-0 left-0 right-0 py-3 flex items-center justify-center gap-3"
          style={{ 
            backgroundColor: slide4Colors.white + '90',
            backdropFilter: 'blur(10px)',
            borderTop: `1px solid ${slide4Colors.darkBlue}20`
          }}
        >
          <img 
            src="/hablandis.png" 
            alt="Hablandis Logo" 
            className="h-10"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
              img.parentElement!.innerHTML = img.parentElement!.innerHTML + `
                <div style="font-family: 'Aglet Mono', monospace; color: ${slide4Colors.darkBlue}; font-size: 24px; font-weight: 800; margin-right: 12px;">
                  Hablandis
                </div>
              `;
            }}
          />
          <p style={{ 
            fontFamily: 'Raleway, sans-serif',
            fontSize: '14px',
            color: slide4Colors.darkBlue,
            letterSpacing: '0.5px',
            fontWeight: 500
          }}>
            © 2025 Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 4
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