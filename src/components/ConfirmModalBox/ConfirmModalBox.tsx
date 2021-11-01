import React from 'react';
import styled from 'styled-components';
import { Button } from 'src/components/ui';

interface ConfirmModalBoxProps {
  title: string;
  descr: string;
  confirmButtonText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose: () => void;
}

const ConfirmModalBox: React.FC<ConfirmModalBoxProps> = ({
  title,
  descr,
  confirmButtonText = 'OK',
  onCancel,
  onConfirm,
  onClose,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const element = modalRef.current;
      const target = event.target as Node;
      if (element && !element.contains(target)) {
        onClose();
      }
    }
    document.addEventListener('click', handleOutsideClick);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.body.style.overflow = 'unset';
    }
  }, []);

  return (
    <Background>
      <Modal ref={modalRef}>
        <Title>{title}</Title>
        <Description>{descr}</Description>
        <Buttons>
          <Button
            type="button"
            variant="OutlinedDanger"
            text={confirmButtonText}
            customStyle={{ flex: 1 }}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          />
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </Buttons>
      </Modal>
    </Background>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  z-index: 999;
`;

const Modal = styled.div`
  max-width: 333px;
  padding: 40px 24px 24px 24px;
  background-color: #FFFFFF;
  border-radius: 6px;
`;

const Title = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  text-align: center;
  color: #122434;
`;

const Description = styled.p`
  margin-top: 8px;
  margin-bottom: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  text-align: center;
  color: #122434;
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 40px;
`;

const CancelButton = styled.button`
  flex: 1;
  margin-left: 8px;
  padding: 9px 20px;
  background-color: #FFFFFF;
  border: 1px solid #E8E8E8;
  border-radius: 6px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 155%;
  color: #122434;
  text-align: center;
  cursor: pointer;
  transition: border 0.2s;

  &:hover {
    border: 1px solid #BFBFBF;
  }

  &:active {
    border: 1px solid #2BAEE0;
  }
`;

export default ConfirmModalBox;
