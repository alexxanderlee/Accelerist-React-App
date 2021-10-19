import React from 'react';
import styled, { CSSProp } from 'styled-components';

interface LikeButtonProps {
  liked: boolean;
  customStyle?: CSSProp;
  onClick?: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ liked, customStyle, onClick }) => {
  return (
    <Button
      customStyle={customStyle}
      onClick={onClick}
    >
      {liked ? (
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.612 1.41452C16.1722 0.966073 15.65 0.610337 15.0752 0.367629C14.5005 0.124922 13.8844 0 13.2623 0C12.6401 0 12.0241 0.124922 11.4493 0.367629C10.8746 0.610337 10.3524 0.966073 9.91255 1.41452L8.99977 2.34476L8.08699 1.41452C7.19858 0.509117 5.99364 0.0004693 4.73725 0.000469309C3.48085 0.000469319 2.27591 0.509117 1.38751 1.41452C0.499101 2.31992 9.36088e-09 3.5479 0 4.82833C-9.36088e-09 6.10875 0.499101 7.33674 1.38751 8.24214L2.30029 9.17238L8.99977 16L15.6992 9.17238L16.612 8.24214C17.0521 7.79391 17.4011 7.26171 17.6393 6.67596C17.8774 6.0902 18 5.46237 18 4.82833C18 4.19428 17.8774 3.56645 17.6393 2.9807C17.4011 2.39494 17.0521 1.86275 16.612 1.41452Z" fill="#F05658"/>
        </svg>
      ) : (
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.612 2.41452C17.1722 1.96607 16.65 1.61034 16.0752 1.36763C15.5005 1.12492 14.8844 1 14.2623 1C13.6401 1 13.0241 1.12492 12.4493 1.36763C11.8746 1.61034 11.3524 1.96607 10.9126 2.41452L9.99977 3.34476L9.08699 2.41452C8.19858 1.50912 6.99364 1.00047 5.73725 1.00047C4.48085 1.00047 3.27591 1.50912 2.38751 2.41452C1.4991 3.31992 1 4.5479 1 5.82833C1 7.10875 1.4991 8.33674 2.38751 9.24214L3.30029 10.1724L9.99977 17L16.6992 10.1724L17.612 9.24214C18.0521 8.79391 18.4011 8.26171 18.6393 7.67596C18.8774 7.0902 19 6.46237 19 5.82833C19 5.19428 18.8774 4.56645 18.6393 3.9807C18.4011 3.39494 18.0521 2.86275 17.612 2.41452Z" stroke="#F05658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </Button>
  );
};

const Button = styled.button<{ customStyle?: CSSProp }>`
  width: 40px;
  height: 40px;
  background-color: #FFFFFF;
  border: 1px solid #E8E8E8;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: border 0.2s;

  &:hover {
    border: 1px solid #F05658;
  }

  ${props => props.customStyle}
`;

export default LikeButton;
