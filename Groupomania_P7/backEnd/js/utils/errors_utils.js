// ===================================================
// signUpErrors Handling
// ===================================================
module.exports.signUpErrors = (err) => 
{
    if (!err) return "";

    let errors = {pseudo: "", email: "", password: ""};

    if (err.message.includes('pseudo'))
    {
        errors.pseudo = "Pseudo non valide ou deja utilisé.";
    }
    
    if (err.message.includes('email'))
    {
        errors.email = "Email non valide ou deja utilisé.";
    }
    
    if (err.message.includes('password'))
    {
        errors.password = "Le password est incorrect";
    }

    if (err.message.includes('unique_pseudo'))
    {
        errors.pseudo = "Pseudo deja enregistré.";
    }
    else if (err.message.includes('unique_email'))
    {
        errors.email = "Email deja utilisé.";
    }

    return errors;
}

// ===================================================
// signInErrors Handling
// ===================================================
module.exports.signInErrors = (err) => 
{
    let errors = { email: '', password: ''}
  
    if (err.message.includes("email")) 
      errors.email = "Email inconnu";
    
    if (err.message.includes('password'))
      errors.password = "Le mot de passe ne correspond pas"
  
    return errors;
  }

// ===================================================