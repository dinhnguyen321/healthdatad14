import Auth from "../models/authModel"

exports.registerChallenge = async (req,res)=>{
    const authUsers = await Auth.getAuthUsers();
    res.json(authUsers);
}

exports.registerResponse = async (req,res)=>{
    const register = await Auth.postRegisterResponse();
    res.json(register);
}

exports.loginChallenge = async (req,res)=>{
    const login = await Auth.getLogin();
    res.json(login);
}

exports.loginResponse = async (req,res)=>{
    const loginRes = await Auth.postLoginResponse();
    res.json(loginRes);
}
