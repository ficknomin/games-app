import { Button } from "../ui/button"

type ErrorStateProps = {
  message: string | undefined;
  onRetry: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="text-center py-10">
      <p className="text-destructive">{message === undefined ? "Error loading. Please, try again." : `${message} Please, try again.`}</p>
      <Button className="rounded-sm" onClick={onRetry}>Retry</Button>
    </div>
  )
}
