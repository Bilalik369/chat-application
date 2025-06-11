export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    return password && password.length >= 6;
  };
  
  export const validateName = (name) => {
    return name && name.trim().length >= 2;
  };
  
  export const validateForm = (formData, type = 'login') => {
    const errors = {};
  
    if (!formData.email) {
      errors.email = 'Email requis';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }
  
    if (!formData.password) {
      errors.password = 'Mot de passe requis';
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
  
    if (type === 'signup') {
      if (!formData.name) {
        errors.name = 'Nom requis';
      } else if (!validateName(formData.name)) {
        errors.name = 'Le nom doit contenir au moins 2 caractères';
      }
  
      if (formData.confirmPassword !== formData.password) {
        errors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  