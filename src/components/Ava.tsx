import React, { useState, useRef } from 'react';
import Typed from 'react-typed';
import { useSpring, animated, config } from 'react-spring';
import { Step1, Step2, Step3 } from './avaSteps';

const avaMemory: Array<string[]> = [
  ['Hello, my name is Ava.', 'I will help you send your message.', 'What is your name?'],
  ['What is your email?'],
  ['Type your message below'],
  ['Your message was sent, Thank you.']
];

export default () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const typedInstance = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    const newFormState = { ...formState, [name]: value };
    setFormState(newFormState);
  }

  const handleCurrentStep = (nextcurrentStep: number) => {
    setCurrentStep(currentStep + (Math.sign(nextcurrentStep)));
    const typedRef: any = typedInstance.current;
    if (typedRef) typedRef.typed.reset();
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    const isFormValid = currentStep === 3;
    
    if (isFormValid) {
      console.log(formState)
      //post
    } else {
      //invalid form
    }
    handleCurrentStep(1);
    e.preventDefault();
  }

  return (
    <div className="ava-container">
      <input type='button' className="btn ava-close-btn" value='x' />
      <span className="ava-output">
        <Typed ref={typedInstance} strings={avaMemory[currentStep - 1]} typeSpeed={60} cursorChar={'<'} />
      </span>
      <form action="#" className='contact-me-form' onSubmit={(e) => handleSubmit(e)}>
        {currentStep === 1 && <Step1 handleChange={handleChange} value={formState.name} handleCurrentStep={handleCurrentStep} />}
        {currentStep === 2 && <Step2 handleChange={handleChange} value={formState.email} handleCurrentStep={handleCurrentStep} />}
        {currentStep === 3 && <Step3 handleChange={handleChange} value={formState.message} handleCurrentStep={handleCurrentStep} />}
        {currentStep === 4 && <input type='button' className="btn confirm" value='ok' />}
      </form>
    </div>
  );
}