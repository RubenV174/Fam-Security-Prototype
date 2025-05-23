'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/componentes/ui/boton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/componentes/ui/tarjeta';
import { RadioGroup, RadioGroupItem } from "@/componentes/ui/radio-group";
import { Label } from "@/componentes/ui/label";
import { Progress } from "@/componentes/ui/barra_progreso";
import { Alert, AlertDescription, AlertTitle } from "@/componentes/ui/alert";
import { AlertCircle, Loader2, ArrowRight, ArrowLeft, Image as ImageIcon, CheckCircle } from 'lucide-react';
import Header from '@/componentes/Encabezado';
import { generateRiskAssessmentReportAction } from '@/biblioteca/acciones';
import type { GenerateRiskAssessmentReportOutput } from '@/ia/flows/generar_informe_evaluacion_riesgo';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import VirtualPet from '@/components/pets/VirtualPet';
import CentralPetArea from '@/components/pets/CentralPetArea';

const AnimatedIllustrationPlaceholder = ({ id }: { id: number }) => {
  // Mapeo de mascotas por pregunta
  const pets: Record<number, 'dog' | 'cat' | 'seal' | 'redPanda'> = {
    1: 'dog',
    2: 'cat',
    3: 'seal',
    4: 'redPanda',
    5: 'dog',
  };
  return (
    <div className="w-full aspect-video bg-muted/50 rounded-lg flex items-center justify-center p-4 border border-border/30">
      {/* Eliminamos la mascota de aquí ya que ahora usamos el contenedor fijo */}
      <div className="animate-pulse opacity-30">
        <ImageIcon className="w-16 h-16 sm:w-24 sm:h-24" />
      </div>
    </div>
  );
};


interface Question {
  id: number;
  type: 'multiple-choice' | 'image-interpretation';
  text: string;
  options?: { value: string; label: string }[];
  imageSrc?: string;
  illustration?: React.ReactNode; // Make illustration optional
  imageHint?: string; // Add hint for AI image search
}

const questions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    text: "¿Con qué frecuencia te sientes tenso/a o ansioso/a en casa?",
    options: [
      { value: "nunca", label: "Nunca" },
      { value: "raramente", label: "Raramente" },
      { value: "a_veces", label: "A veces" },
      { value: "a_menudo", label: "A menudo" },
    ],
     illustration: <AnimatedIllustrationPlaceholder id={1} />,
  },
  {
    id: 2,
    type: 'multiple-choice',
    text: "Cuando surgen desacuerdos, ¿cómo se resuelven típicamente?",
    options: [
      { value: "discusion_calmada", label: "Discusión calmada" },
      { value: "voces_altas", label: "Voces altas" },
      { value: "evitacion", label: "Evitación / Ignorarlo" },
      { value: "discusiones_intensas", label: "Discusiones intensas / Gritos" },
    ],
    illustration: <AnimatedIllustrationPlaceholder id={2} />,
  },
  {
    id: 3,
    type: 'multiple-choice',
    text: "¿Alguna vez sientes miedo de la reacción de alguien en tu hogar?",
    options: [
      { value: "nunca", label: "Nunca" },
      { value: "raramente", label: "Raramente" },
      { value: "a_veces", label: "A veces" },
      { value: "a_menudo", label: "A menudo" },
    ],
    illustration: <AnimatedIllustrationPlaceholder id={3} />,
  },
   {
    id: 4,
    type: 'multiple-choice',
    text: "¿Qué tan apoyado/a te sientes por las personas con las que vives?",
    options: [
      { value: "muy_apoyado", label: "Muy apoyado/a" },
      { value: "algo_apoyado", label: "Algo apoyado/a" },
      { value: "poco_apoyado", label: "Poco apoyado/a" },
      { value: "nada_apoyado", label: "Nada apoyado/a" },
    ],
    illustration: <AnimatedIllustrationPlaceholder id={4} />,
  },
   {
    id: 5,
    type: 'multiple-choice',
    text: "¿Has notado comportamientos controladores (p. ej., revisar tu teléfono, decirte qué vestir, limitar tus salidas)?",
    options: [
      { value: "nunca", label: "Nunca" },
      { value: "raramente", label: "Raramente" },
      { value: "a_veces", label: "A veces" },
      { value: "a_menudo", label: "A menudo" },
    ],
    illustration: <AnimatedIllustrationPlaceholder id={5} />,
  },
  {
      id: 6,
      type: 'image-interpretation',
      text: "¿Qué emoción o situación te sugiere esta imagen?",
      // Placeholder image using picsum with a specific seed for consistency
      imageSrc: 'https://picsum.photos/seed/famsec_harmony/400/300',
      imageHint: 'abstract family harmony peace', // Added hint
      options: [
          { value: 'armonia_paz', label: 'Armonía / Paz' },
          { value: 'tension_conflicto', label: 'Tensión / Conflicto' },
          { value: 'tristeza_soledad', label: 'Tristeza / Soledad' },
          { value: 'indiferencia', label: 'Indiferencia' },
      ],
      illustration: undefined, // No placeholder needed if imageSrc is present
  },
  {
      id: 7,
      type: 'image-interpretation',
      text: "Observa la imagen. ¿Qué dinámica familiar representa mejor para ti?",
      // Placeholder image using picsum with a different seed
      imageSrc: 'https://picsum.photos/seed/famsec_dynamics/400/300',
      imageHint: 'abstract family dynamics connection distance', // Added hint
      options: [
          { value: 'conexion_apoyo', label: 'Conexión y apoyo' },
          { value: 'distanciamiento', label: 'Distanciamiento' },
          { value: 'jerarquia_control', label: 'Jerarquía / Control' },
          { value: 'caos_confusion', label: 'Caos / Confusión' },
      ],
       illustration: undefined, // No placeholder needed
  },
];

export default function TestPage() {
  const [logoVariant, setLogoVariant] = useState<'light' | 'dark'>('light');
  // Estado para controlar el tipo de mascota según la pregunta actual
  const [currentPetType, setCurrentPetType] = useState<'dog' | 'cat' | 'seal' | 'redPanda'>('dog');

  function handleToggle() {
    document.documentElement.classList.toggle('dark');
    setLogoVariant((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [currentQuestionIndex]);
  const progressValue = useMemo(() => ((currentQuestionIndex + 1) / questions.length) * 100, [currentQuestionIndex]);

  const handleOptionChange = useCallback((value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    setError(null);
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (answers[currentQuestion.id]) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setError(null);
      }
    } else {
      setError("Por favor, selecciona una opción para continuar.");
    }
  }, [currentQuestionIndex, answers, currentQuestion]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setError(null);
    }
  }, [currentQuestionIndex]);

  const handleSubmit = useCallback(async () => {
    // Verificar si la pregunta actual está respondida
    if (!answers[currentQuestion.id]) {
      setError("Por favor, responde la pregunta actual antes de enviar.");
      return;
    }
    
    // Verificar si todas las preguntas están respondidas
    const allQuestionsAnswered = questions.every(q => answers[q.id]);
    if (!allQuestionsAnswered) {
      // Encontrar la primera pregunta sin responder
      const firstUnanswered = questions.find((q) => !answers[q.id]);
      if (firstUnanswered) {
        setCurrentQuestionIndex(questions.findIndex((q) => q.id === firstUnanswered.id));
        setError("Por favor, responde todas las preguntas antes de enviar.");
        return;
      }
    }

    // Iniciar estado de carga y envío
    setIsLoading(true);
    setIsSubmitting(true);
    setError(null);

    const formattedAnswers = JSON.stringify(
      questions.map((q) => ({
        id: q.id,
        question: q.text,
        type: q.type,
        answer: answers[q.id] || 'No respondido',
      }))
    );

    try {
      // Guardar las respuestas en localStorage antes de enviarlas
      localStorage.setItem('testAnswers', JSON.stringify(answers));
      
      const result: GenerateRiskAssessmentReportOutput = await generateRiskAssessmentReportAction({
        testResponses: formattedAnswers,
      });

      if (result && result.report) {
        // Guardar el resultado en localStorage
        localStorage.setItem('riskAssessmentResult', JSON.stringify(result));
        console.log('Informe generado y guardado correctamente:', result);
        
        // Cambiar estado para mostrar la animación de éxito
        setIsSubmitting(false);
        
        // Mantener el estado de carga activo para mostrar la palomita
        // Esperar un momento para mostrar la palomita de éxito
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Redirigir a la página de resultados
        router.push('/resultados');
      } else {
        let errorMsg = 'Respuesta inesperada al generar el informe.';
        if (!result?.report) errorMsg += ' Falta el contenido del informe.';
        throw new Error(errorMsg);
      }
    } catch (err: any) {
      console.error('Error al generar el informe:', err);
      setError(err.message || "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
      setIsSubmitting(false);
      setIsLoading(false);
      
      // Si hay un error pero tenemos todas las respuestas, intentamos guardarlas de todos modos
      // para que el usuario pueda intentar generar el informe nuevamente desde la página de resultados
      if (questions.every(q => answers[q.id])) {
        localStorage.setItem('testAnswers', JSON.stringify(answers));
      }
    }
  }, [answers, router]);

  // Mapeo de mascotas por pregunta (referencia del componente AnimatedIllustrationPlaceholder)
  const pets: Record<number, 'dog' | 'cat' | 'seal' | 'redPanda'> = {
    1: 'dog',
    2: 'cat',
    3: 'seal',
    4: 'redPanda',
    5: 'dog',
  };

  // Actualizar el tipo de mascota cuando cambia la pregunta
  React.useEffect(() => {
    const petType = currentQuestion.id <= 5 ? 
      (pets[currentQuestion.id] || 'dog') as 'dog' | 'cat' | 'seal' | 'redPanda' : 'dog';
    setCurrentPetType(petType);
  }, [currentQuestion]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background/90 to-primary/10 dark:from-background dark:via-background/90 dark:to-primary/20">
      {/* Área central con mascota interactiva que cambia según la pregunta actual */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CentralPetArea activePetType={currentPetType} showInTest={true} />
      </div>
      {/* Implementación del Header con el botón */}
      <Header logoVariant={logoVariant} onToggleMode={handleToggle} />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        {/* Card container */}
        <Card className="w-full max-w-md md:max-w-lg shadow-xl rounded-xl animate-fadeIn border border-border/50 relative z-20">
          <CardHeader className="p-4 sm:p-6">
            <Progress value={progressValue} className="mb-4 h-2 [&>div]:bg-primary" />
            <CardTitle className="text-lg sm:text-xl font-semibold text-center mb-1">
              Pregunta {currentQuestion.id} de {questions.length}
            </CardTitle>
            <div className="my-4 p-4 bg-muted/40 rounded-lg border border-border/30">
              {currentQuestion.type === 'image-interpretation' && currentQuestion.imageSrc && (
                <div className="mb-4 rounded-lg overflow-hidden border shadow-sm aspect-video relative">
                  <Image
                    src={currentQuestion.imageSrc}
                    alt={`Imagen para la pregunta ${currentQuestion.id}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority={currentQuestionIndex < 2}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={false}
                    data-ai-hint={currentQuestion.imageHint || 'abstract family scene'}
                  />
                </div>
              )}
              {currentQuestion.type !== 'image-interpretation' && currentQuestion.illustration && (
                <div className="mb-4">{currentQuestion.illustration}</div>
              )}
              <CardDescription className="text-center text-base sm:text-lg text-foreground font-medium">
                {currentQuestion.text}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            {error && (
              <Alert variant="destructive" className="mb-4 animate-shake">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {currentQuestion.options && (
              <RadioGroup
                key={currentQuestion.id}
                value={answers[currentQuestion.id] || ""}
                onValueChange={handleOptionChange}
                className="space-y-3 relative z-50"
              >
                {currentQuestion.options.map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={`${currentQuestion.id}-${option.value}`}
                    className={cn(
                      "flex items-center space-x-3 p-3 sm:p-4 border rounded-lg transition-all duration-200 cursor-pointer hover:bg-accent hover:border-primary/50",
                      answers[currentQuestion.id] === option.value
                        ? 'bg-primary/10 border-primary ring-2 ring-primary/70 shadow-inner'
                        : 'border-border'
                    )}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`${currentQuestion.id}-${option.value}`}
                      className="h-5 w-5 border-muted-foreground text-primary focus:ring-primary"
                    />
                    <span className="flex-1 text-sm sm:text-base">{option.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            )}
          </CardContent>
          <CardFooter className="flex justify-between p-4 sm:p-6 border-t border-border/50">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0 || isLoading}
              aria-label="Pregunta anterior"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            {currentQuestionIndex === questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={!answers[currentQuestion.id] || isLoading}
                aria-label="Enviar respuestas y ver informe"
                className="relative"
              >
                {isLoading ? (
                  isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4 text-white animate-pulse" />
                      Completado
                    </>
                  )
                ) : (
                  'Ver Informe'
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id] || isLoading}
                aria-label="Siguiente pregunta"
              >
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>
      <footer className="text-center py-6 text-xs sm:text-sm text-muted-foreground">
        Fam Security - Un paso hacia el bienestar familiar
      </footer>
    </div>
  );
}