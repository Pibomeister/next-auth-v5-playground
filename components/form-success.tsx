import { BsCheckCircleFill } from 'react-icons/bs';

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex justify-center items-center gap-x-2 text-sm text-emerald-500">
      <BsCheckCircleFill className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
