export const getResponseErrorMessage = (error: unknown): string => {
    console.log(error)
  return (error as Error).message;
};