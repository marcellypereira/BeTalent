import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Employee } from '../types/employee';
import { addEmployee } from '../services/api';
import styles from '../styles/employeeForm.module.css';

type EmployeeFormProps = {
  onSuccess?: (employee: Employee) => void;
};

type FormField = 'name' | 'job' | 'admission_date' | 'phone' | 'image';

type FormState = Record<FormField, string>;

type FormErrors = Partial<Record<FormField, string>>;

const INITIAL_FORM_STATE: FormState = {
  name: '',
  job: '',
  admission_date: '',
  phone: '',
  image: '',
};

const employeeSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),
    
  job: yup
    .string()
    .trim()
    .required('Cargo é obrigatório')
    .min(2, 'Cargo deve ter pelo menos 2 caracteres'),
    
  admission_date: yup
    .string()
    .required('Data de admissão é obrigatória')
    .test('valid-date', 'Data inválida', value => !value || !isNaN(Date.parse(value)))
    .test('not-future', 'Data não pode ser futura', value => {
      if (!value) return true;
      const date = new Date(value);
      return date <= new Date();
    }),
    
  phone: yup
    .string()
    .required('Telefone é obrigatório')
    .test('valid-phone', 'Telefone deve estar no formato (XX) XXXXX-XXXX', value => {
      const digitsOnly = value.replace(/\D/g, '');
      return /^\d{10,11}$/.test(digitsOnly);
    }),
    
  image: yup
    .string()
    .required('URL da foto é obrigatória')
    .url('Por favor, insira uma URL válida')
});

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const formatPhoneInput = (phone: string): string => {
    const digitsOnly = phone.replace(/\D/g, '').slice(0, 11);
    
    if (digitsOnly.length <= 2) {
      return digitsOnly;
    } 
    
    if (digitsOnly.length <= 6) {
      return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2)}`;
    } 
    
    return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7)}`;
  };
  
  const resetForm = (): void => {
    setForm(INITIAL_FORM_STATE);
    setErrors({});
    setSubmitError(null);
  };
  
  const validateForm = async (): Promise<boolean> => {
    try {
      await employeeSchema.validate(form, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const newErrors: FormErrors = {};
        
        validationError.inner.forEach(error => {
          if (error.path) {
            newErrors[error.path as FormField] = error.message;
          }
        });
        
        setErrors(newErrors);
      }
      return false;
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const fieldName = name as FormField;
    
    if (fieldName === 'phone') {
      setForm(prev => ({
        ...prev,
        [fieldName]: formatPhoneInput(value),
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [fieldName]: value,
      }));
    }
    
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: undefined,
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    const isValid = await validateForm();
    if (!isValid) return;
    
    try {
      setLoading(true);
      setSubmitError(null);
      
      const formattedData = {
        ...form,
        phone: form.phone.replace(/\D/g, ''),
        isAddedManually: true
      };
      
      const newEmployee = await addEmployee(formattedData);
      
      if (newEmployee) {
        if (onSuccess) {
          onSuccess(newEmployee);
        }
        
        resetForm();
        navigate('/');
      } else {
        setSubmitError('Erro ao adicionar funcionário. Tente novamente.');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      setSubmitError('Ocorreu um erro ao salvar o funcionário. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Adicionar Novo Funcionário</h2>
      
      {submitError && (
        <div className={styles.error}>{submitError}</div>
      )}
      
      <div className={styles.formGroup}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Digite o nome completo"
          className={errors.name ? styles.inputError : ''}
        />
        {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="job">Cargo</label>
        <input
          type="text"
          id="job"
          name="job"
          value={form.job}
          onChange={handleChange}
          placeholder="Digite o cargo"
          className={errors.job ? styles.inputError : ''}
        />
        {errors.job && <span className={styles.errorMessage}>{errors.job}</span>}
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="admission_date">Data de Admissão</label>
        <input
          type="date"
          id="admission_date"
          name="admission_date"
          value={form.admission_date}
          onChange={handleChange}
          max={new Date().toISOString().split('T')[0]}
          className={errors.admission_date ? styles.inputError : ''}
        />
        {errors.admission_date && <span className={styles.errorMessage}>{errors.admission_date}</span>}
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="phone">Telefone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="(00) 00000-0000"
          className={errors.phone ? styles.inputError : ''}
        />
        {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="image">URL da Foto</label>
        <input
          type="text"
          id="image"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Insira a URL da imagem (http:// ou https://)"
          className={errors.image ? styles.inputError : ''}
        />
        {errors.image && <span className={styles.errorMessage}>{errors.image}</span>}
      </div>
      
      <div className={styles.formActions}>
        <button 
          type="button" 
          onClick={() => navigate('/')} 
          className={styles.cancelButton}
          disabled={loading}
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          className={styles.submitButton} 
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;