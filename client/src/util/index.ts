export const getError = (error: {value: unknown, status: unknown}) => {
  const value = error?.value as Record<string, any>;
    if (typeof value === "string") {
      return value;
    }
    if (value?.message) {
      return value.message
    }
  return
}