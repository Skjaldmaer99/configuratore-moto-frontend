import { useState } from 'react';
import {
    Stepper,
    StepperContent,
    StepperIndicator,
    StepperItem,
    StepperNav,
    StepperPanel,
    StepperSeparator,
    StepperTrigger,
} from '@/components/ui/stepper';
import { Button } from './ui/button-1';

const steps = [1, 2, 3, 4];

export default function StepperForm() {
    const [currentStep, setCurrentStep] = useState(2);

    return (
        <div className="flex flex-col gap-5 p-10 w-full mx-auto max-w-[600px] justify-center items-center"> {/* h-screen */}
            <Stepper value={currentStep} onValueChange={setCurrentStep} className="space-y-8">
                <StepperNav>
                    {steps.map((step) => (
                        <StepperItem key={step} step={step}>
                            <StepperTrigger asChild>
                                <StepperIndicator className="data-[state=completed]:bg-red-700 data-[state=completed]:text-white data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-500">
                                    {step}
                                </StepperIndicator>
                            </StepperTrigger>
                            {steps.length > step && <StepperSeparator className="group-data-[state=completed]/step:bg-red-700" />}
                        </StepperItem>
                    ))}
                </StepperNav>

                <StepperPanel className="text-sm">
                    {steps.map((step) => (
                        <StepperContent className="w-full flex items-center justify-center" key={step} value={step}>
                            Step {step} content
                        </StepperContent>
                    ))}
                </StepperPanel>

                <div className="flex items-center justify-between gap-2.5">
                    <Button
                        className='rounded-full bg-white'
                        variant="outline"
                        onClick={() => setCurrentStep((prev) => prev - 1)}
                        disabled={currentStep === 1}>
                        Previous
                    </Button>
                    <Button
                        className='rounded-full bg-white'
                        variant="outline"
                        onClick={() => setCurrentStep((prev) => prev + 1)}
                        disabled={currentStep === steps.length}
                    >
                        Next
                    </Button>
                </div>
            </Stepper>
        </div>
    );
}
