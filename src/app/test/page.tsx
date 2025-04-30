'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import Header from '@/components/Header'; // Assuming Header component is created
import { generateRiskAssessmentReportAction } from '@/lib/actions';
import type { GenerateRiskAssessmentReportOutput } from '@/ai/flows/generate-risk-assessment-report';

interface Question {
  id: number;
  text: string;
  options: { value: string; label: string }[];
  illustration: React.ReactNode; // Placeholder for animated illustration
}

const questions: Question[] = [
  {
    id: 1,
    text: "How often do you feel tense or anxious at home?",
    options: [
      { value: "never", label: "Never" },
      { value: "rarely", label: "Rarely" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Often" },
    ],
    illustration: <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center text-muted-foreground animate-pulse">Illustration 1</div>,
  },
  {
    id: 2,
    text: "When disagreements arise, how are they typically resolved?",
    options: [
      { value: "calm_discussion", label: "Calm discussion" },
      { value: "raised_voices", label: "Raised voices" },
      { value: "avoidance", label: "Avoidance" },
      { value: "physical_arguments", label: "Physical arguments" },
    ],
    illustration: <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center text-muted-foreground animate-pulse">Illustration 2</div>,
  },
  {
    id: 3,
    text: "Do you ever feel afraid of someone in your household?",
    options: [
      { value: "never", label: "Never" },
      { value: "rarely", label: "Rarely" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Often" },
    ],
    illustration: <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center text-muted-foreground animate-pulse">Illustration 3</div>,
  },
   {
    id: 4,
    text: "How supported do you feel by your family?",
    options: [
      { value: "very_supported", label: "Very Supported" },
      { value: "somewhat_supported", label: "Somewhat Supported" },
      { value: "not_really_supported", label: "Not Really Supported" },
      { value: "not_supported_at_all", label: "Not Supported at All" },
    ],
    illustration: <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center text-muted-foreground animate-pulse">Illustration 4</div>,
  },
   {
    id: 5,
    text: "Have there been instances of controlling behavior (e.g., limiting contact with friends/family, controlling finances)?",
    options: [
      { value: "never", label: "Never" },
      { value: "rarely", label: "Rarely" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Often" },
    ],
    illustration: <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center text-muted-foreground animate-pulse">Illustration 5</div>,
  },
];

export default function TestPage() {
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
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (answers[currentQuestion.id]) {
       if (currentQuestionIndex < questions.length - 1) {
         setCurrentQuestionIndex((prev) => prev + 1);
         setError(null); // Clear error on successful next
       }
    } else {
       setError("Please select an option before proceeding.");
    }
  }, [currentQuestionIndex, answers, currentQuestion]);


  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setError(null); // Clear error when going back
    }
  }, [currentQuestionIndex]);

  const handleSubmit = useCallback(async () => {
    // Final check if all questions answered (optional, depends on logic)
    if (Object.keys(answers).length !== questions.length) {
        setError("Please answer all questions before submitting.");
        return;
    }

    setIsLoading(true);
    setIsSubmitting(true);
    setError(null);

    const formattedAnswers = JSON.stringify(
       questions.map(q => ({ question: q.text, answer: answers[q.id] || 'Not Answered' }))
    );

    try {
        const result: GenerateRiskAssessmentReportOutput = await generateRiskAssessmentReportAction({
           testResponses: formattedAnswers,
        });

        console.log("Report generation result:", result);

        if (result && result.report && result.report.startsWith('Error generating report:')) {
          throw new Error(result.report); // Throw error if action returned an error message
        }

        if (result && result.report) {
           // Store result in localStorage or pass via query params (localStorage is simpler for larger data)
           localStorage.setItem('riskAssessmentResult', JSON.stringify(result));
           router.push('/results'); // Navigate to results page
        } else {
           throw new Error('Failed to generate report. Unexpected response from AI.');
        }

    } catch (err: any) {
        console.error("Error submitting test:", err);
        setError(err.message || "An unexpected error occurred while generating the report. Please try again later.");
        setIsSubmitting(false); // Allow retry on error
    } finally {
        setIsLoading(false);
        // Do not set isSubmitting to false here if navigation happens, prevents double clicks
    }
  }, [answers, router]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-lg shadow-lg animate-fadeIn">
          <CardHeader>
            <Progress value={progressValue} className="mb-4" />
            <CardTitle className="text-xl font-semibold text-center mb-2">Question {currentQuestion.id} of {questions.length}</CardTitle>
            <CardDescription className="text-center text-muted-foreground">{currentQuestion.text}</CardDescription>
             <div className="mt-4 aspect-video overflow-hidden rounded-lg">
               {/* Placeholder for potentially animated illustration */}
               {currentQuestion.illustration}
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 animate-shake"> {/* Add shake animation */}
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
             <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={handleOptionChange}
                className="space-y-3"
             >
                {currentQuestion.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-accent transition-colors duration-200">
                    <RadioGroupItem value={option.value} id={`${currentQuestion.id}-${option.value}`} />
                    <Label htmlFor={`${currentQuestion.id}-${option.value}`} className="flex-1 cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between pt-4 border-t">
             <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0 || isLoading}
             >
                Previous
             </Button>
             {currentQuestionIndex === questions.length - 1 ? (
               <Button
                 onClick={handleSubmit}
                 disabled={!answers[currentQuestion.id] || isLoading || isSubmitting}
               >
                 {isLoading ? (
                   <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Generating Report...
                   </>
                 ) : (
                    'Submit & View Report'
                 )}
               </Button>
             ) : (
               <Button
                 onClick={handleNext}
                 disabled={!answers[currentQuestion.id] || isLoading}
               >
                 Next
               </Button>
             )}
          </CardFooter>
        </Card>
      </main>
       <footer className="text-center py-4 text-sm text-muted-foreground">
         FamilySafe AI - Prevention through Awareness
       </footer>
    </div>
  );
}

// Simple shake animation for error
const styles = `
@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
.animate-shake {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
}
`;

// Inject styles into the head
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
