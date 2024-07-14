import React, { useState } from 'react';
import '../../styles/FormModal.css';

const FormModal = ({ title, fields, validationSchema, onSubmit, onClose }) => {
  const initialState = fields.reduce((acc, field) => {
    if (field.type === 'array') {
      acc[field.name] = [{ ProductID: '', Quantity: '', UnitPrice: '' }];
    } else {
      acc[field.name] = field.value ?? '';
    }
    return acc;
  }, {});

  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleValidation = async () => {
    try {
      await validationSchema.validate(formState, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors = validationErrors.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    console.log(errors);
    e.preventDefault();
    if (await handleValidation()) {
      try {
        await onSubmit(formState);
        onClose();
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ submit: 'Failed to submit the form. Please try again.' });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleArrayChange = (index, field, value) => {
    const newItems = [...formState.Items];
    newItems[index][field] = value;
    setFormState((prevState) => ({ ...prevState, Items: newItems }));
  };

  const handleAddItem = () => {
    setFormState((prevState) => ({
      ...prevState,
      Items: [...prevState.Items, { ProductID: '', Quantity: '', UnitPrice: '' }]
    }));
  };

  const handleRemoveItem = (index) => {
    setFormState((prevState) => ({
      ...prevState,
      Items: prevState.Items.filter((_, idx) => idx !== index)
    }));
  };

  return (
    <div className="ModalBackdrop">
      <div className="ModalContent">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => {
            if (field.type === 'array') {
              return (
                <div key={field.name}>
                  {formState.Items.map((item, index) => (
                    <div key={index} className="item-group">
                      {field.fields.map((subField) => (
                        <div key={subField.name}>
                          {subField.type === 'select' ? (
                            <select
                              name={`${field.name}.${index}.${subField.name}`}
                              value={item[subField.name] || ''}
                              onChange={(e) => handleArrayChange(index, subField.name, e.target.value)}
                            >
                              <option value="" disabled>{subField.placeholder}</option>
                              {subField.options.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={subField.type}
                              name={`${field.name}.${index}.${subField.name}`}
                              value={item[subField.name]}
                              onChange={(e) => handleArrayChange(index, subField.name, e.target.value)}
                              placeholder={subField.placeholder}
                              step={subField.step}
                            />
                          )}
                          {errors[`${field.name}[${index}].${subField.name}`] && (
                            <div className="error">{errors[`${field.name}[${index}].${subField.name}`]}</div>
                          )}
                        </div>
                      ))}
                      <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={handleAddItem}>Add Item</button>
                </div>
              );
            }

            return (
              <div key={field.name}>
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formState[field.name] || ''}
                    onChange={handleChange}
                    disabled={field.readOnly}
                  >
                    <option value="" disabled>{field.placeholder}</option>
                    {field.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={formState[field.name]}
                    onChange={!field.readOnly ? handleChange : undefined}
                    placeholder={field.placeholder}
                    readOnly={field.readOnly}
                  />
                ) : (
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={formState[field.name]}
                    onChange={!field.readOnly ? handleChange : undefined}
                    placeholder={field.placeholder}
                    readOnly={field.readOnly}
                    step={field.step}
                  />
                )}
                {errors[field.name] && <div className="error">{errors[field.name]}</div>}
              </div>
            );
          })}
          {errors.submit && <div className="error">{errors.submit}</div>}
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
