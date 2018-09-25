export default function(values) {
  const errors = {};
  const requiredFields = [
    'user',
    'password'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
}
