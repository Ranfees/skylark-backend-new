
const User = require('../models/User')
const sendCookie = require('../utils/sendCookie')
const uploadImage = require('../utils/uploadImage')
const generateRandomOTP = require('../utils/otpGenerator')
const sendMail = require('../utils/otpMailer')

exports.Login = async (req, res) => {
  try {
    const { username, password } = req.body
  

    const user = await User.findOne({ username: username })
    if (!user) {
      return res.status(400).json({ message: "User not found" })
   
    }

    const validation = await user.isValidatedPassword(password)

    if (!validation) {
      return res.status(400).json({ message: "password is incorrect" })
   
    }
    console.log(user)
    if (!(user.role !== 'block')) {
      return res.status(400).json({ message: "user is blocked" })
    
    }
    req.user = username

    return sendCookie(user, res)

  } catch (e) {
    console.log(e)
    return res.send('error')
  }
}

exports.Register = async (req, res) => {
  try {
    let {
      name,
      username,
      email,
      phone,
      role,
      password,
      confirmPassword
    } = req.body
    role = role.toLowerCase()
    console.log('BODY:', req.body)
    console.log('FILES:', req.files)

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: 'Passwords do not match'
      })
    }

    let dp = null

    if (req.files?.photo) {
      dp = await uploadImage(req.files.photo, 400, 400, 'dp')
    }

    await User.create({
      id: Date.now(),
      name,
      username,
      mail: email,
      phone,
      role,
      password,
      dp: dp ? dp.url : null,
      otp: ''
    })

    return res.status(200).json({
      message: 'Registration successful'
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
}


exports.GenerateOtp = async (req, res) => {
  try{
    let { email } = req.body
    console.log(email)
  let result = await User.findOne({ mail: email })
  if (!result) {
    return res.json({ status: false })
  }
  console.log(result)
  var otp = generateRandomOTP()

  await sendMail(result.mail, otp)
  
  result.otp = otp
  await result.save()
  
  
  return res.json({ status: true })
  
  }catch(e){
    console.log(e)
    return res.status(400).json({message:"error while generating otp",status:false})
  }
}

exports.VerifyOtp =  async (req,res) => {
  try{
    let {otp,email} = req.body
  let result = await User.findOne({mail: email})
  if(!(result.otp == otp)) return res.status(400).json({message:'wrong otp entered'})
  console.log(result)
  result.otp = ""
  await result.save()
  
  return sendCookie(result,res)
  }catch(e){
    console.log(e)
    return res.status(400).json({message:"error while verifying otp"})
  }
}

exports.Logout = (req, res) => {
  try{
    console.log('logout called')
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, 
      sameSite: "Lax",
      path: "/"
    });
    return res.status(200).json({ message: "Logout successful" });
  }catch(e){
    console.log(e)
  return res.status(400).json({message:'logout failed'})
 
  }
  
}