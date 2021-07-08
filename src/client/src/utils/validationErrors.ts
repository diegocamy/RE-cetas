interface ValidationError {
  children: any[];
  constraints: {
    [key: string]: string;
  };
  property: string;
}

export const getFormValidationErrors = (err: any) => {
  const errors: { [key: string]: string } = {};

  if (err.graphQLErrors.length > 0) {
    err.graphQLErrors[0].extensions.exception.validationErrors.forEach(
      (validationError: ValidationError) => {
        errors[validationError.property] = Object.values(
          validationError.constraints
        )[0];
      }
    );
  }

  return errors;
};
