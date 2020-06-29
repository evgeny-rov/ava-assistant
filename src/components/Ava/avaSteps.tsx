import React, { FunctionComponent } from "react";
import { useSpring, animated, config } from "react-spring";

interface stepProps {
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  value: string;
  handleStage: (nextStage: number) => void;
}

export const Step1: FunctionComponent<stepProps> = ({
  handleChange,
  value,
}) => {
  const inputSpring = useSpring({
    config: config.molasses,
    delay: 300,
    width: "18em",
    opacity: 1,
    from: { width: "1em", opacity: 0 },
  });
  const buttonSpring = useSpring({
    config: config.molasses,
    delay: 500,
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <>
      <animated.input
        type="text"
        className="input-box"
        name="name"
        style={inputSpring}
        value={value}
        onChange={(e) => handleChange(e)}
        required
      />
      <div className="ava-btn-wrapper">
        <animated.input
          type="submit"
          className="ava-confirm-btn btn"
          style={buttonSpring}
          value="next"
        />
      </div>
    </>
  );
};

export const Step2: FunctionComponent<stepProps> = ({
  handleChange,
  value,
  handleStage,
}) => {
  const inputSpring = useSpring({
    config: config.molasses,
    width: "18em",
    opacity: 1,
    from: { width: "1em", opacity: 0 },
  });
  const buttonSpring = useSpring({
    config: config.molasses,
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <>
      <animated.input
        type="text"
        className="input-box"
        name="email"
        style={inputSpring}
        value={value}
        onChange={(e) => handleChange(e)}
        required
        autoFocus
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        title="email@domain.something"
      />
      <div className="ava-btn-wrapper">
        <animated.input
          type="button"
          className="ava-back-btn btn"
          style={buttonSpring}
          onClick={() => handleStage(-1)}
          value="back"
        />
        <animated.input
          type="submit"
          className="ava-confirm-btn btn"
          style={buttonSpring}
          value="next"
        />
      </div>
    </>
  );
};

export const Step3: FunctionComponent<stepProps> = ({
  handleChange,
  value,
  handleStage,
}) => {
  const inputSpring = useSpring({
    config: config.molasses,
    width: "80vmin",
    height: "60vmin",
    opacity: 1,
    from: { width: "1vmin", opacity: 0 },
  });
  const buttonSpring = useSpring({
    config: config.molasses,
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <>
      <animated.textarea
        className="input-box"
        name="message"
        style={inputSpring}
        value={value}
        onChange={(e) => handleChange(e)}
        autoFocus
        required
      />
      <div className="ava-btn-wrapper">
        <animated.input
          type="button"
          className="ava-back-btn btn"
          style={buttonSpring}
          onClick={() => handleStage(-1)}
          value="back"
        />
        <animated.input
          type="submit"
          className="ava-confirm-btn btn"
          style={buttonSpring}
          value="submit"
        />
      </div>
    </>
  );
};
