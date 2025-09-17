import { Button } from "../ui/button";

export interface ErrorMessage {
  message: string;
}

const ErrorState = ({ message }: ErrorMessage) => {
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <p className="text-xl text-(--chart-3)">Error: {message}</p>
      <Button className="text-base" onClick={() => window.location.reload()}>
        Retry
      </Button>
    </div>
  );
};

export default ErrorState;
