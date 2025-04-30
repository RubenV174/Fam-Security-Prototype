'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, AlertCircle, Info } from 'lucide-react';
import Header from '@/components/Header';
import type { GenerateRiskAssessmentReportOutput } from '@/ai/flows/generate-risk-assessment-report';

// Basic sentiment analysis (placeholder - replace with more robust analysis if needed)
// NOTE: This basic analysis might not be accurate for Spanish. Consider a more sophisticated approach.
const analyzeSentiment = (report: string): { positivo: number; negativo: number; neutral: number } => {
  const positiveWords = ['bien', 'seguro', 'apoyado', 'positivo', 'saludable', 'calma', 'tranquilo'];
  const negativeWords = ['riesgo', 'preocupación', 'inseguro', 'tenso', 'miedo', 'controlador', 'discusión', 'violencia', 'peligro'];

  const words = report.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/\s+/); // Basic normalization for Spanish
  let positivo = 0;
  let negativo = 0;

  words.forEach(word => {
    if (positiveWords.includes(word)) positivo++;
    if (negativeWords.includes(word)) negativo++;
  });

  // Basic scaling for demo purposes
  const total = positivo + negativo || 1;
  return {
    positivo: Math.min(100, Math.round((positivo / total) * 100)),
    negativo: Math.min(100, Math.round((negativo / total) * 100)),
    neutral: Math.max(0, 100 - Math.min(100, Math.round((positivo / total) * 100)) - Math.min(100, Math.round((negativo / total) * 100))),
  };
};

export default function ResultsPage() {
  const [result, setResult] = useState<GenerateRiskAssessmentReportOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedResult = localStorage.getItem('riskAssessmentResult');
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult);
        if (parsedResult && typeof parsedResult.report === 'string' && typeof parsedResult.resources === 'string') {
          setResult(parsedResult);
          // Optional: Clear storage after loading
          // localStorage.removeItem('riskAssessmentResult');
        } else {
          throw new Error('Formato de resultado inválido encontrado en el almacenamiento.');
        }
      } catch (e: any) {
        console.error("Error al parsear resultado desde localStorage:", e);
        setError(`Error al cargar los resultados: ${e.message || 'Formato de datos inválido.'}`);
      }
    } else {
       setError("No se encontraron resultados de la evaluación. Por favor, completa el test primero.");
      // Redirect back to test after a delay if no results
       const timer = setTimeout(() => router.push('/test'), 3000);
       return () => clearTimeout(timer);
    }
  }, [router]);

   const sentimentData = useMemo(() => {
    if (!result?.report) return [];
    const sentiment = analyzeSentiment(result.report);
    return [
      { name: 'Aspectos Positivos', value: sentiment.positivo, fill: 'hsl(var(--chart-2))' }, // Use theme colors
      { name: 'Áreas de Preocupación', value: sentiment.negativo, fill: 'hsl(var(--chart-1))' }, // Use theme colors (adjust as needed)
      { name: 'Neutral', value: sentiment.neutral, fill: 'hsl(var(--muted))' },
    ];
  }, [result]);

   const resourcesList = useMemo(() => {
    if (!result?.resources) return [];
    // Basic parsing, assuming comma-separated or newline-separated URLs/descriptions
    return result.resources.split(/[\n,]+/)
             .map(item => item.trim())
             .filter(item => item.length > 0)
             .map((item, index) => {
               // Try to detect if it's a URL
               try {
                 // Basic check if it looks like a URL before trying new URL()
                 if (item.startsWith('http://') || item.startsWith('https://')) {
                   const url = new URL(item);
                   return { type: 'link', value: url.toString(), key: `${index}-${url.toString()}` };
                 }
                 throw new Error('Not a standard URL');
               } catch (_) {
                 // If not a valid URL, treat as text
                 return { type: 'text', value: item, key: `${index}-text` };
               }
             });
  }, [result]);

  const handleRetakeTest = () => {
     localStorage.removeItem('riskAssessmentResult'); // Clear old results
     router.push('/test');
  };

  if (error) {
    return (
       <div className="flex flex-col min-h-screen bg-background">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
             <Card className="w-full max-w-lg shadow-lg animate-fadeIn">
               <CardHeader>
                 <CardTitle className="text-center text-destructive">Error al Cargar Resultados</CardTitle>
               </CardHeader>
               <CardContent>
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                 </Alert>
               </CardContent>
               <CardFooter className="justify-center pt-4">
                  <Button onClick={() => router.push('/test')}>Volver al Test</Button>
               </CardFooter>
             </Card>
          </main>
       </div>
    );
  }

  if (!result) {
    return (
       <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
             <svg className="animate-spin h-10 w-10 text-primary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
             <p className="text-muted-foreground">Cargando resultados...</p>
          </div>
        </main>
       </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
       <Header />
       <main className="flex-grow container mx-auto px-4 py-8">
          <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fadeIn mb-8">
             <CardHeader>
               <CardTitle className="text-2xl font-bold text-center mb-2">Tu Informe de Evaluación de Riesgo</CardTitle>
               <CardDescription className="text-center text-muted-foreground mb-4">
                  Este informe proporciona información basada en tus respuestas. Recuerda, esto no es un diagnóstico clínico.
               </CardDescription>
                <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300">
                    <Info className="h-4 w-4 stroke-current" />
                    <AlertTitle>Nota Importante</AlertTitle>
                    <AlertDescription>
                    Esta evaluación es una herramienta para la reflexión y la conciencia. Si estás en peligro inmediato o necesitas apoyo urgente, por favor contacta a los servicios de emergencia o una línea de ayuda local. Los recursos proporcionados a continuación también pueden ofrecer ayuda.
                    </AlertDescription>
                </Alert>
             </CardHeader>
             <CardContent>
               <Tabs defaultValue="report" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                     <TabsTrigger value="report">Detalles del Informe</TabsTrigger>
                     <TabsTrigger value="visualization">Visualización</TabsTrigger>
                     <TabsTrigger value="resources">Recursos</TabsTrigger>
                  </TabsList>
                  <TabsContent value="report">
                     <Card>
                       <CardHeader>
                          <CardTitle>Informe Generado</CardTitle>
                       </CardHeader>
                       <CardContent>
                          <ScrollArea className="h-72 w-full rounded-md border p-4 whitespace-pre-wrap">
                            {result.report}
                          </ScrollArea>
                       </CardContent>
                     </Card>
                  </TabsContent>
                  <TabsContent value="visualization">
                      <Card>
                        <CardHeader>
                           <CardTitle>Resumen General</CardTitle>
                           <CardDescription>Una visión general de los temas identificados en el informe.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                           <ResponsiveContainer width="100%" height="100%">
                             <BarChart data={sentimentData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} />
                                <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
                                <Tooltip
                                   cursor={{ fill: 'hsl(var(--accent))', opacity: 0.5 }}
                                   contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                                   labelStyle={{ color: 'hsl(var(--foreground))' }}
                                   itemStyle={{ color: 'hsl(var(--foreground))' }}
                                />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                             </BarChart>
                           </ResponsiveContainer>
                        </CardContent>
                      </Card>
                  </TabsContent>
                   <TabsContent value="resources">
                      <Card>
                        <CardHeader>
                           <CardTitle>Recursos Sugeridos</CardTitle>
                           <CardDescription>Aquí tienes algunos recursos que podrían ser útiles basados en tu evaluación.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           {resourcesList.length > 0 ? (
                             <ul className="space-y-3">
                               {resourcesList.map(resource => (
                                 <li key={resource.key} className="flex items-start space-x-2 border-b pb-2 last:border-b-0 last:pb-0">
                                   {resource.type === 'link' ? (
                                     <>
                                       <ExternalLink className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                       <a
                                         href={resource.value}
                                         target="_blank"
                                         rel="noopener noreferrer"
                                         className="text-primary hover:underline break-all"
                                       >
                                         {resource.value}
                                       </a>
                                     </>
                                   ) : (
                                     <>
                                        <Info className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                                        <span>{resource.value}</span>
                                     </>

                                   )}
                                 </li>
                               ))}
                             </ul>
                           ) : (
                             <p className="text-muted-foreground italic">No se identificaron recursos específicos para ti en este momento. Considera contactar un centro de apoyo local para información general.</p>
                           )}
                        </CardContent>
                      </Card>
                  </TabsContent>
               </Tabs>
             </CardContent>
             <CardFooter className="flex justify-center pt-6 border-t">
                 <Button onClick={handleRetakeTest} variant="outline">
                   Repetir Test
                 </Button>
             </CardFooter>
          </Card>
       </main>
       <footer className="text-center py-4 text-sm text-muted-foreground">
         FamilySafe AI - Prevención a través de la Conciencia
       </footer>
    </div>
  );
}
