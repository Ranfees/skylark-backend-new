const nodemailer = require('nodemailer');

async function sendMail(to, message) {
  try {
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,     
        pass: process.env.EMAIL_PASS,        
      },
      tls: {
    rejectUnauthorized: false   // 🔴 allow self-signed cert
  }
    });

 
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: "verification otp [do not share]",
 
      html: `<h3><b>Skylark OTP</b></h3>
            <h1 style="text-align:center;">[${message}]</h1>` 
    };

  
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
    return info; 
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    throw error; 
  }
}

module.exports = sendMail;
