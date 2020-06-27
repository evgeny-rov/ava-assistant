import React, { useState, useRef } from 'react';
import Typed from 'react-typed';
import { useSpring, animated, config } from 'react-spring';

const avaMemory: Array<string[]> = [
  ['Hello, my name is Ava.', 'I will help you send your message.', 'What is your name?'],
  ['What is your email?'],
  ['Type your message below'],
  ['Your message was sent, Thank you.']
];

const Step1 = ({ handleChange, value, handleStage }) => {
  const inputSpring = useSpring({ config: config.slow, delay: 300, width: '200px', opacity: 1, from: { width: '1px', opacity: 0 } })
  const buttonSpring = useSpring({ config: config.slow, delay: 500, opacity: 1, from: { opacity: 0 } })

  return (
    <>
      <animated.input 
      type='text' 
      className='input-box' 
      name='name' 
      style={inputSpring} 
      value={value} 
      onChange={(e) => handleChange(e)}
      required />
      <div className="button-form-wrapper">
        <animated.input type='submit' className="confirm btn" style={buttonSpring} value="next" />
      </div>
    </>
  );
}

const Step2 = ({ handleChange, value, handleStage }) => {
  const inputSpring = useSpring({ config: config.slow, width: '200px', opacity: 1, from: { width: '1px', opacity: 0 } })
  const buttonSpring = useSpring({ config: config.slow, opacity: 1, from: { opacity: 0 } })

  return (
    <>
      <animated.input 
      type='text' 
      className='input-box' 
      name='email' 
      style={inputSpring} 
      value={value} 
      onChange={(e) => handleChange(e)}
      required 
      pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$' 
      title='email@domain.something' />
      <div className="button-form-wrapper">
        <animated.input type='button' className="form-back btn" style={buttonSpring} onClick={() => handleStage(-1)} value="back" />
        <animated.input type='submit' className="confirm btn" style={buttonSpring} value="next" />
      </div>
    </>
  );
}


const Step3 = ({ handleChange, value, handleStage }) => {
  const inputSpring = useSpring({ config: config.slow, width: '80vmin', height: '60vmin', opacity: 1, from: { width: '1vmin', opacity: 0 } })
  const buttonSpring = useSpring({ config: config.slow, opacity: 1, from: { opacity: 0 } })

  return (
    <>
      <animated.textarea 
      className='input-box' 
      name='message' 
      style={inputSpring} 
      value={value} 
      onChange={(e) => handleChange(e)} 
      required />
      <div className="button-form-wrapper">
        <animated.input type='button' className="form-back btn" style={buttonSpring} onClick={() => handleStage(-1)} value="back" />
        <animated.input type='submit' className="confirm btn" style={buttonSpring} value="submit" />
      </div>
    </>
  );
}

const Step4 = ({ formData }) => {
  return (
    <>
      <div className="contact-me-form">
        {Object.entries(formData).map((el, index) => {
          const [ name, value ] = el;
          return (
            <p key={index}>{`${name}: ${value}`}</p>
          );
        })}
        <input type='button' className="btn confirm" value='ok' />
      </div>
    </>
  );
}

export default () => {
  const [stage, setStage] = useState(1);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const typedInstance = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    const newFormState = { ...formState, [name]: value };
    setFormState(newFormState);
  }

  const handleStage = (nextStage: number) => {
    setStage(stage + (Math.sign(nextStage)));
    typedInstance.current.typed.reset();
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    const isFormValid = stage === 3;
    
    if (isFormValid) {
      console.log(formState)
      //post
    } else {
      //invalid form
    }
    handleStage(1);
    e.preventDefault();
  }

  return (
    <div className="ava-container">
      <input type='button' className="btn ava-close-btn" value='x' />
      <span className="ava-output">
        <Typed ref={typedInstance} strings={avaMemory[stage - 1]} typeSpeed={60} cursorChar={'<'} />
      </span>
      <form action="#" className='contact-me-form' onSubmit={(e) => handleSubmit(e)}>
        {stage === 1 && <Step1 handleChange={handleChange} value={formState.name} handleStage={handleStage} />}
        {stage === 2 && <Step2 handleChange={handleChange} value={formState.email} handleStage={handleStage} />}
        {stage === 3 && <Step3 handleChange={handleChange} value={formState.message} handleStage={handleStage} />}
        {stage === 4 && <Step4 formData={formState} />}
      </form>
    </div>
  );
}