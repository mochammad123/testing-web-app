export const getResponseErrorMessage = (error: unknown): string => {
  return (error as Error).message;
};