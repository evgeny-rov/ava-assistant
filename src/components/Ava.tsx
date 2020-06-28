import React, { useState, useRef } from 'react';
import Typed from 'react-typed';
import { useSpring, animated, config } from 'react-spring';
import { Step1, Step2, Step3 } from './avaSteps';

const avaMemory: Array<string[]> = [
  ['Hello, my name is Ava.', 'I will help you send your message.', 'What is your name?'],
  ['What is your email?'],
  ['Type your message below'],
  ['Sending your message...'],
  ['Your message was sent, Thank you.']
];

interface props {
  setShow: (toShow: boolean) => void;
}

export default ({ setShow }: props) => {
  const [stage, setStage] = useState(1);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const typedInstance = useRef(null);
  const containerSpring = useSpring({ config: config.molasses, width: '100%', height: '100vh', opacity: 1, from: { width: '1%', height: '1vh', opacity: 0 } })

  const resetTyped = () => {
    const typedRef: any = typedInstance.current;
    if (typedRef) typedRef.typed.reset();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    const newFormState = { ...formState, [name]: value };
    setFormState(newFormState);
  }

  const handleStage = (modifier: number) => {
    const nextStage = stage + Math.sign(modifier);
    setStage(nextStage);
    resetTyped();
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    const isFormFilled = stage === 3;
    e.preventDefault();
    handleStage(1);
    
    if (isFormFilled) {
      // post form here, mock bellow
      setTimeout(() => {
        setStage(5);
        resetTyped();
      }, 4000)
    } 
  }

  return (
    <animated.div className="ava-container" style={containerSpring}>
      <input type='button' className="btn ava-close-btn" value='x' onClick={() => setShow(false)} />
      <span className="ava-output">
        <Typed ref={typedInstance} strings={avaMemory[stage - 1]} typeSpeed={60} cursorChar={'<'} />
      </span>
      <form action="#" className='contact-me-form' onSubmit={(e) => handleSubmit(e)}>
        {stage === 1 && <Step1 handleChange={handleChange} value={formState.name} handleStage={handleStage} />}
        {stage === 2 && <Step2 handleChange={handleChange} value={formState.email} handleStage={handleStage} />}
        {stage === 3 && <Step3 handleChange={handleChange} value={formState.message} handleStage={handleStage} />}
        {stage === 5 && <input type='button' className="btn ava-confirm-btn" value='ok' onClick={() => setShow(false)} />}
      </form>
    </animated.div>
  );
}