import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { CardWrapper } from './card-wrapper';

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops, something went wrong!"
      backButtonLabel="Go back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex justify-center items-center w-full">
        <FaExclamationTriangle className="text-red-700 h-8 w-8" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
