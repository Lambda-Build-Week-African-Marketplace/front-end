import { useLocalStorage } from "./useLocalStorage";

export const useForm = (key, initialState, submitLogic) => {
  const [values, setValues] = useLocalStorage(key, initialState);

  const handleChanges = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSetObj = (newObj) => {
    setValues(newObj);
  };

  const clearForm = (e) => {
    setValues(initialState);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogic();
    //clearForm();
  };

  //return [values, handleChanges, clearForm];
  return [values, handleChanges, clearForm, handleSubmit, handleSetObj];
};
