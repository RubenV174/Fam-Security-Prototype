'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, AlertCircle, Info, RefreshCw, Loader2 } from 'lucide-react'; // Added RefreshCw, Loader2
import Header from '@/components/Header';
import type { GenerateRiskAssessmentReportOutput } from '@/ai/flows/generate-risk-assessment-report';

// Basic sentiment analysis (placeholder - consider a more robust NLP approach for production)
// Note: Accuracy for Spanish might be limited.
const analyzeSentiment = (report: string): { positivo: number; negativo: number; neutral: number } => {
  const positiveWords = ['bien', 'seguro', 'apoyo', 'positivo', 'saludable', 'calma', 'tranquilo', 'armonía', 'conexión'];
  const negativeWords = ['riesgo', 'preocupación', 'inseguro', 'tenso', 'miedo', 'control', 'discusión', 'violencia', 'peligro', 'conflicto', 'distancia', 'gritos'];

  const words = report.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/\s+/);
  let positivo = 0;
  let negativo = 0;

  words.forEach(word => {
    if (positiveWords.some(pw => word.includes(pw))) positivo++;
    if (negativeWords.some(nw => word.includes(nw))) negativo++;
  });

  // Very basic scaling - Adjust weights or logic as needed
  const significantWords = positivo + negativo || 1;
  const positiveScore = Math.min(100, Math.round((positivo / significantWords) * 100));
  const negativeScore = Math.min(100, Math.round((negativo / significantWords) * 100));
  const neutralScore = Math.max(0, 100 - positiveScore - negativeScore);

  return {
    positivo: positiveScore,
    negativo: negativeScore,
    neutral: neutralScore,
  };
};

export default function ResultsPage() {
  const [result, setResult] = useState<GenerateRiskAssessmentReportOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading initially
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const storedResult = localStorage.getItem('riskAssessmentResult');
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult);
        if (parsedResult && typeof parsedResult.report === 'string' && typeof parsedResult.resources === 'string') {
          setResult(parsedResult);
          setError(null);
        } else {
          throw new Error('Formato de resultado inválido.');
        }
      } catch (e: any) {
        console.error("Error parsing result from localStorage:", e);
        setError(`Error al cargar resultados: ${e.message || 'Formato inválido.'}`);
        setResult(null); // Clear potentially bad data
      } finally {
        setIsLoading(false);
      }
    } else {
       setError("No se encontraron resultados. Por favor, completa el test.");
       setResult(null);
       setIsLoading(false);
       // Redirect after a delay if no results found
       const timer = setTimeout(() => router.push('/test'), 4000);
       return () => clearTimeout(timer);
    }
  }, [router]);

   const sentimentData = useMemo(() => {
    if (!result?.report) return [];
    const sentiment = analyzeSentiment(result.report);
    return [
      { name: 'Positivo', value: sentiment.positivo, fill: 'hsl(var(--chart-2))' },
      { name: 'Preocupación', value: sentiment.negativo, fill: 'hsl(var(--destructive))' }, // Use destructive color
      { name: 'Neutral', value: sentiment.neutral, fill: 'hsl(var(--muted-foreground))' }, // Use muted-foreground
    ];
  }, [result]);

   const resourcesList = useMemo(() => {
    if (!result?.resources) return [];
    return result.resources.split(/[\n]+/) // Split only by newline
             .map(item => item.trim())
             .filter(item => item.length > 5) // Filter out very short lines
             .map((item, index) => {
               const key = `${index}-${item.slice(0, 10)}`; // More stable key
               // Basic URL detection
               if (item.match(/^https?:\/\/\S+$/)) {
                 try {
                   const url = new URL(item);
                   return { type: 'link', value: url.toString(), key: key };
                 } catch (_) { /* Ignore if invalid URL */ }
               }
               // Treat as text if not a valid URL or doesn't look like one
               return { type: 'text', value: item, key: key };
             });
  }, [result]);

  const handleRetakeTest = () => {
     localStorage.removeItem('riskAssessmentResult');
     router.push('/test');
  };

   // Loading State UI
  if (isLoading) {
    return (
       <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background to-primary/10 dark:from-background dark:via-background dark:to-primary/5">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
             <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
             <p className="text-muted-foreground text-lg">Cargando resultados...</p>
          </div>
        </main>
       </div>
    );
  }

  // Error State UI
  if (error) {
    return (
       <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background to-destructive/10 dark:from-background dark:via-background dark:to-destructive/5">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
             <Card className="w-full max-w-lg shadow-lg rounded-xl animate-fadeIn border border-destructive/50">
               <CardHeader className="items-center">
                 <AlertCircle className="h-10 w-10 text-destructive mb-3" />
                 <CardTitle className="text-xl sm:text-2xl text-center text-destructive">Error al Cargar Resultados</CardTitle>
               </CardHeader>
               <CardContent>
                 <Alert variant="destructive" className="text-center">
                    <AlertDescription>{error}</AlertDescription>
                 </Alert>
               </CardContent>
               <CardFooter className="justify-center pt-6">
                  <Button onClick={() => router.push('/test')} variant="destructive">
                    Volver al Test
                  </Button>
               </CardFooter>
             </Card>
          </main>
       </div>
    );
  }

   // No Results Found UI (specific case after loading)
   if (!result && !isLoading) {
     // This case is handled by the error state now after the useEffect logic change.
     // If needed, a specific "No Results" UI can be added here.
     // For now, the error state covers this.
     return null; // Should not be reached if error handling is correct
   }

   // Results Display UI
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background to-primary/10 dark:from-background dark:via-background dark:to-primary/5">
       <Header />
       <main className="flex-grow container mx-auto px-4 py-8">
          {/* Wider card on larger screens */}
          <Card className="w-full max-w-3xl lg:max-w-4xl mx-auto shadow-xl rounded-xl animate-fadeIn border border-border/50">
             <CardHeader className="p-4 sm:p-6">
               <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mb-3">Tu Informe de Evaluación</CardTitle>
                <Alert variant="default" className="bg-primary/10 border-primary/30 text-primary-foreground dark:bg-primary/20 dark:border-primary/40 dark:text-primary-foreground/90">
                    <Info className="h-4 w-4 stroke-current" />
                    <AlertTitle className="font-semibold">Nota Importante</AlertTitle>
                    <AlertDescription className="text-sm">
                    Esta es una herramienta de reflexión. No sustituye el consejo profesional. Si necesitas apoyo urgente, contacta servicios de emergencia o una línea de ayuda. Los recursos abajo pueden ser útiles.
                    </AlertDescription>
                </Alert>
             </CardHeader>
             <CardContent className="p-4 sm:p-6 pt-0">
               {/* Improved Tabs Styling */}
               <Tabs defaultValue="report" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/60">
                     <TabsTrigger value="report" className="text-xs sm:text-sm">Informe Detallado</TabsTrigger>
                     <TabsTrigger value="visualization" className="text-xs sm:text-sm">Resumen Visual</TabsTrigger>
                     <TabsTrigger value="resources" className="text-xs sm:text-sm">Recursos</TabsTrigger>
                  </TabsList>

                  {/* Tab Content Panels */}
                  <TabsContent value="report">
                     <Card className="border-border/50 shadow-inner">
                       <CardHeader>
                          <CardTitle className="text-lg sm:text-xl">Análisis de tus Respuestas</CardTitle>
                       </CardHeader>
                       <CardContent>
                          {/* Increased height and better padding */}
                          <ScrollArea className="h-80 w-full rounded-md border border-border/50 p-4 bg-background/50">
                            <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
                               {result?.report ?? 'No se pudo cargar el informe.'}
                            </p>
                          </ScrollArea>
                       </CardContent>
                     </Card>
                  </TabsContent>

                  <TabsContent value="visualization">
                      <Card className="border-border/50 shadow-inner">
                        <CardHeader>
                           <CardTitle className="text-lg sm:text-xl">Tendencias Generales</CardTitle>
                           <CardDescription className="text-sm">Visualización basada en el análisis del informe.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px] sm:h-[350px] p-2 sm:p-4">
                           {sentimentData.length > 0 ? (
                             <ResponsiveContainer width="100%" height="100%">
                               <BarChart data={sentimentData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                  <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={11} tickLine={false} axisLine={false} />
                                  <YAxis stroke="hsl(var(--foreground))" fontSize={11} tickLine={false} axisLine={false} width={30} />
                                  <Tooltip
                                     cursor={{ fill: 'hsl(var(--accent))', radius: 'var(--radius)' }}
                                     contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', boxShadow: 'hsl(var(--shadow))' }}
                                     labelStyle={{ color: 'hsl(var(--foreground))', fontSize: '12px', fontWeight: '500' }}
                                     itemStyle={{ color: 'hsl(var(--foreground))', fontSize: '12px' }}
                                  />
                                   <Bar dataKey="value" radius={[5, 5, 0, 0]} />
                               </BarChart>
                             </ResponsiveContainer>
                            ) : (
                             <div className="flex items-center justify-center h-full text-muted-foreground">
                                No hay datos suficientes para la visualización.
                             </div>
                           )}
                        </CardContent>
                      </Card>
                  </TabsContent>

                   <TabsContent value="resources">
                      <Card className="border-border/50 shadow-inner">
                        <CardHeader>
                           <CardTitle className="text-lg sm:text-xl">Recursos Sugeridos</CardTitle>
                           <CardDescription className="text-sm">Organizaciones y materiales que podrían ayudarte.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           {resourcesList.length > 0 ? (
                             <ScrollArea className="h-80 w-full">
                                <ul className="space-y-4 pr-4">
                                {resourcesList.map(resource => (
                                  <li key={resource.key} className="flex items-start space-x-3 border-b border-border/50 pb-3 last:border-b-0">
                                    {resource.type === 'link' ? (
                                      <>
                                        <ExternalLink className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                                        <div>
                                            <a
                                            href={resource.value}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline font-medium break-words text-sm sm:text-base"
                                            >
                                            {/* Attempt to display a cleaner link text if possible */}
                                            {resource.value.replace(/^https?:\/\/(www\.)?/,'').split('/')[0]} {/* Show domain */}
                                            </a>
                                            <p className="text-xs text-muted-foreground break-all">{resource.value}</p> {/* Show full URL muted */}
                                        </div>

                                      </>
                                    ) : (
                                      <>
                                         <Info className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
                                         <span className="text-sm sm:text-base">{resource.value}</span>
                                      </>

                                    )}
                                  </li>
                                ))}
                              </ul>
                             </ScrollArea>
                           ) : (
                             <p className="text-muted-foreground italic text-center py-4">No se sugieren recursos específicos basados en esta evaluación. Busca ayuda profesional si tienes preocupaciones.</p>
                           )}
                        </CardContent>
                      </Card>
                  </TabsContent>
               </Tabs>
             </CardContent>
             <CardFooter className="flex justify-center p-4 sm:p-6 border-t border-border/50">
                 <Button onClick={handleRetakeTest} variant="outline">
                   <RefreshCw className="mr-2 h-4 w-4" />
                   Repetir Test
                 </Button>
             </CardFooter>
          </Card>
       </main>
       <footer className="text-center py-6 text-xs sm:text-sm text-muted-foreground">
         Fam Security - Un paso hacia el bienestar familiar
       </footer>
    </div>
  );
}
