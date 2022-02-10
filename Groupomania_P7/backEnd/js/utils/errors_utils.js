// ===================================================
// signUpErrors Handling
// ===================================================
exports.signUpErrors = (err) => 
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

    if (err.code == 1062)
    {
        errors.email = "Email deja enregistré.";
    }


    return errors;
}