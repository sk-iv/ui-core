import { useState, useEffect } from 'react';

// reference https://medium.com/@krzakmarek88/complex-form-validation-in-react-hooks-cb07367196b9

const useForm = (initModel, submitCallback, defaultValues) => {
  const [inputs, setInputs] = useState(initModel);
  useEffect(() => {
    if (defaultValues) {
      Object.keys(initModel).forEach((i) => {
        if (defaultValues[i] && (initModel[i].name === i)) {
          initModel[i].value = defaultValues[i];
        }
      });
      setInputs({ ...initModel });
    }
  }, [initModel, defaultValues]);

  const handleChange = (e) => {
    e.persist();

    const { [e.target.name]: lens, ...other } = inputs;

    const newLens = {
      ...lens,
      value: parseInput(lens, e),
      ...(validateInput(lens)),
    };

    setInputs({ ...other, [e.target.name]: newLens });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.keys(inputs).forEach((i) => validateInput(inputs[i]));
    Object.keys(inputs).some((i) => inputs[i].error) ? setInputs([...inputs]) : submitCallback();
  };

  const parseInput = (input, e) => {
    if (input.type === 'checkbox') {
      return e.target.checked;
    }

    return input.parseFun ? input.parseFun(e.target.value) : e.target.value;
  };

  const validateInput = (input) => {
    let error = null;

    input.validators.map((v) => {
      error = v.isValidFun && !v.isValidFun(input.value) ? v.error : error;
      return error;
    });

    return { error: !!error, helperText: error };
  };

  return [inputs, handleChange, handleSubmit];
};

export default useForm;
