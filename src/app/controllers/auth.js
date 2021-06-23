const UserModel = require("../models/user");

const Login = (req, res) => {
  res.render("site/login", { data: {} });
};

const postLogin = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const pass = req.body.pass;
  let error;
  
  /**
   * email,password: là tên 2 trường trong collection user
   * lấy ra data và lưu vào user
   */
  const user = await UserModel.find({ email: email, password: pass });
  const roleadmin = await UserModel.find({ email: email, role:"admin" });

  //console.log(user);

  if (email === "" || pass === "") {
    error = "Thông tin không được để trống!";
  } else if (user.length > 0) {
    if(roleadmin.length>0){
    // khoi tao session mail, pass
    req.session.email_admin = email;
    req.session.pass_admin = pass; 

    res.redirect("/admin");
    }
    else{
      req.session.email_user = email;
      req.session.pass_user = pass; 
      res.redirect("/");
    }
    
  } else {
    error = "Tài khoản không hợp lệ!";
  }
  res.render("site/login", { data: { error: error } });
};


const register = (req, res)=>{
    res.render("site/register",{ data: {} });
}
const registersuccess = async (req, res)=>{
    const body = req.body;
    let error;
    const email = body.email;
    const emailduplicate = await UserModel.find({email:email});
    if(emailduplicate.length>0){
      error = "Email đã tồn tại !";
    }
    else{
      const user = {
        full_name: body.full_name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        password: body.pass,
        }
        
        await new UserModel(user).save();
        res.render("site/registersuccess");
    }
  
    res.render("site/register",{data: {error: error}});
}
module.exports = {
    Login: Login,
    postLogin: postLogin,
    register:register,
    registersuccess:registersuccess,
};