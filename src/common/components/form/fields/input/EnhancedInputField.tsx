import React from 'react';
import { Field, FieldAttributes } from 'formik';

import { validateRequire } from '../../validationUtils';

interface Props {
  required?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EnhancedInputField: React.FC<Props & FieldAttributes<any>> = ({
  required,
  validate,
  ...rest
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleValidation = (value: any) => {
    if (!value && required) {
      return validateRequire(value);
    }
    if (validate) {
      return validate(value);
    }
  };
  return (
    <Field
      validate={handleValidation}
      required={required}
      aria-required={required}
      {...rest}
    />
  );
};

export default EnhancedInputField;
