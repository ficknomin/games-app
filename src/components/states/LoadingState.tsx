import { Spinner } from "../ui/spinner"

export const LoadingState = () => {
  return (
    <div className="flex min-h-screen">
      <Spinner className="animate-spin max-w-* mx-auto my-auto w-8 h-8" />
    </div>
  )
} 
