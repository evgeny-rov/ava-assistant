import React, { FunctionComponent } from 'react';
import { useSpring, animated, config } from 'react-spring';

interface stepProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
  value: string;
  handleCurrentStep: (nextStage: number) => void;
}

export const Step1:FunctionComponent<stepProps> = ({ handleChange, value }) => {
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

export const Step2:FunctionComponent<stepProps> = ({ handleChange, value, handleCurrentStep }) => {
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
        <animated.input type='button' className="form-back btn" style={buttonSpring} onClick={() => handleCurrentStep(-1)} value="back" />
        <animated.input type='submit' className="confirm btn" style={buttonSpring} value="next" />
      </div>
    </>
  );
}


export const Step3:FunctionComponent<stepProps> = ({ handleChange, value, handleCurrentStep }) => {
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
        <animated.input type='button' className="form-back btn" style={buttonSpring} onClick={() => handleCurrentStep(-1)} value="back" />
        <animated.input type='submit' className="confirm btn" style={buttonSpring} value="submit" />
      </div>
    </>
  );
}
