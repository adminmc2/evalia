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
// DIAPOSITIVA 1: PORTADA INTERACTIVA VISUAL
// =======================================================================
const Diapositiva1 = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);

  // Seguimiento del mouse para efectos interactivos
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Efecto de pulso automático
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${colors.verdeClaro} 0%, ${colors.verdeTurquesa} 40%, ${colors.lila} 100%)`
      }}
    >
      {/* Círculos flotantes interactivos */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-30"
        animate={{
          x: mousePos.x * 0.5,
          y: mousePos.y * 0.5,
        }}
        transition={{ type: "spring", damping: 50 }}
        style={{ backgroundColor: colors.lila }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-20"
        animate={{
          x: -mousePos.x * 0.3,
          y: -mousePos.y * 0.3,
        }}
        transition={{ type: "spring", damping: 50 }}
        style={{ backgroundColor: colors.verdeClaro }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full opacity-25"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ backgroundColor: colors.verdeTurquesa }}
      />

      <div className="relative z-10 h-screen flex flex-col p-12">
        
        {/* Header con logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-start"
        >
          {/* Logo Hablandis */}
          <div className="bg-white/90 backdrop-blur-md rounded-xl p-5 shadow-2xl">
            <img 
              src="/Hablandis_Kit de marca_Logo + tagline-04_Negro.svg" 
              alt="Hablandis Centro Internacional de Idiomas" 
              className="h-16"
            />
          </div>

          {/* Elementos decorativos animados */}
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="text-4xl"
            style={{ color: colors.amarillo }}
          >
            ✨
          </motion.div>
        </motion.div>

        {/* Contenido central */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            
            {/* Título EVALIA con efecto 3D */}
            <motion.div
              ref={titleRef}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="relative cursor-pointer mb-8"
            >
              <motion.h1 
                animate={{
                  rotateY: isHovering ? 15 : 0,
                  scale: isHovering ? 1.1 : 1,
                }}
                transition={{ type: "spring" }}
                className="text-8xl font-bold"
                style={{ 
                  fontFamily: 'Aglet Mono, monospace',
                  color: colors.blanco,
                  textShadow: `
                    0 2px 10px rgba(0,0,0,0.3),
                    0 5px 20px ${colors.verdeTurquesa}80,
                    0 10px 40px ${colors.lila}60
                  `,
                  transform: 'perspective(1000px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                EVALIA
              </motion.h1>

              {/* Efecto de pulso alrededor del título */}
              <motion.div
                key={pulseCount}
                initial={{ scale: 0.8, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 rounded-full"
                style={{ 
                  border: `2px solid ${colors.amarillo}`,
                  pointerEvents: 'none'
                }}
              />
            </motion.div>

            {/* Subtítulo animado */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl mb-12"
              style={{ 
                fontFamily: 'Raleway, sans-serif',
                color: colors.blanco,
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              Mejorando la experiencia de evaluación
              <br />
              <span style={{ color: colors.amarillo }}>con IA generativa</span>
            </motion.h2>

            {/* Elementos interactivos flotantes */}
            <div className="relative h-32 mb-12">
              {['📚', '🤖', '✨', '🎯', '💡'].map((emoji, index) => (
                <motion.div
                  key={index}
                  className="absolute text-4xl cursor-pointer"
                  initial={{ 
                    x: (index - 2) * 100,
                    y: 0,
                    opacity: 0
                  }}
                  animate={{ 
                    y: [0, -20, 0],
                    opacity: 1,
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    delay: 0.8 + index * 0.1,
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: index * 0.5
                  }}
                  whileHover={{ scale: 1.5, rotate: 360 }}
                  style={{ left: '50%', marginLeft: (index - 2) * 100 }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>

            {/* Información del ponente con diseño moderno */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="inline-block"
            >
              <div 
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border"
                style={{ borderColor: `${colors.amarillo}40` }}
              >
                <p className="text-lg mb-3" style={{ color: colors.verdeClaro }}>
                  Taller impartido por:
                </p>
                <p className="text-3xl font-bold mb-2" style={{ 
                  fontFamily: 'Aglet Mono, monospace',
                  color: colors.blanco 
                }}>
                  Armando Cruz Crespillo
                </p>
                <p className="text-lg" style={{ 
                  fontFamily: 'Raleway, sans-serif',
                  color: colors.amarillo 
                }}>
                  Director de Innovación - Hablandis
                  <br />
                  CTO - Emc2
                </p>
              </div>
            </motion.div>

            {/* Fecha con animación */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-8 flex items-center justify-center gap-8"
              style={{ color: colors.blanco }}
            >
              <motion.span 
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2"
              >
                📅 26 de mayo de 2025
              </motion.span>
              <motion.span 
                animate={{ x: [5, -5, 5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2"
              >
                📍 Varsovia, Polonia
              </motion.span>
            </motion.div>
          </div>
        </div>

        {/* Footer minimalista */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center text-sm"
          style={{ color: colors.blanco + '80' }}
        >
          © 2025 Hablandis - www.hablandis.com
        </motion.div>

        {/* Indicador de interactividad */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 right-8 text-white/60 text-sm flex items-center gap-2"
        >
          <span>Mueve el ratón</span>
          <span className="text-2xl">👆</span>
        </motion.div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 1
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