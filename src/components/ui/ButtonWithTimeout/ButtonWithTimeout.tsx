import React from 'react';
import Button from '../Button';
import dayjs from 'dayjs';

interface ButtonWithTimeoutProps {
  text?: string;
  type?: 'button' | 'reset' | 'submit';
  variant?: 'FilledPrimary' | 'OutlinedPrimary' | 'Transparent' | 'OutlinedSecondary';
  disabled?: boolean;
  onClick?: () => void;
  timeout: number;
  timeoutOnMount?: boolean;
}

const ButtonWithTimeout: React.FC<ButtonWithTimeoutProps> = ({
  text,
  type,
  variant,
  disabled,
  onClick,
  timeout,
  timeoutOnMount = true,
}) => {
  const [disableBtn, setDisableBtn] = React.useState<boolean>(false);
  const [timer, setTimer] = React.useState<string>('');
  const intervalId = React.useRef<number>();
  const timeoutId = React.useRef<number>();

  function startTimer() {
    let ms = timeout;
    setTimer(dayjs(ms).format('mm:ss'));
    intervalId.current = window.setInterval(() => {
      ms -= 1000;
      setTimer(dayjs(ms).format('mm:ss'));
      if (ms <= 0) {
        clearInterval(intervalId.current);
      }
    }, 1000);
  }

  function startTimeout() {
    setDisableBtn(true);
    startTimer();
    timeoutId.current = window.setTimeout(() => {setDisableBtn(false)}, timeout);
  }

  function handleClick() {
    startTimeout();
    onClick && onClick();
  }

  React.useEffect(() => {
    timeoutOnMount && !disabled && startTimeout();
    return () => {
      clearInterval(intervalId.current);
      clearTimeout(timeoutId.current);
    };
  }, []);

  return (
    <Button
      text={disableBtn ? timer : text}
      type={type}
      variant={variant}
      disabled={disabled || disableBtn}
      onClick={handleClick}
    />
  );
};

export default ButtonWithTimeout;
