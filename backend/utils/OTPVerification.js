const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP email
const sendOTPEmail = (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "OTP Verification",
    text: `Hello Sir/Madam,

Here is your One-Time Password (OTP) for verification:

OTP: ${otp}

Thank you,
Mint App`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("OTP Email sent: " + info.response);
    }
  });
};

// Send application confirmation email
const sendApplicationEmail = (to) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Application Confirmation",
    text: `Hello Sir/Madam,

Thank you for submitting your application. Your application has been received and will be reviewed by our team. Please allow 2-3 business days for confirmation.

Thank you,
Mint App`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Application Email sent: " + info.response);
    }
  });
};

// Send application approval email
const sendApprovalEmail = (to) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Application Approved",
    text: `Hello Sir/Madam,

We are pleased to inform you that your application has been approved! Congratulations! You can now proceed with the next steps.

Thank you,
Mint App`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Approval Email sent: " + info.response);
    }
  });
};

// Send application rejection email
const sendRejectionEmail = (to) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Application Rejected",
    text: `Hello Sir/Madam,

We regret to inform you that your application has been rejected. Thank you for your interest and effort.

Best regards,
Mint App`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Rejection Email sent: " + info.response);
    }
  });
};
// Send KYC approval email
const sendKycApproveEmail = (to) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Application Approved",
    text: `Hello Sir/Madam,

We are pleased to inform you that your KYC has been verified! Congratulations! You can now proceed with the next steps.

Thank you,
Mint App`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Approval Email sent: " + info.response);
    }
  });
};

// Send KYC rejection email
const sendKycRejectEmail = (to) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Application Rejected",
    text: `Hello Sir/Madam,

We regret to inform you that your kyc has been rejected. Please try again later!

Best regards,
Mint App`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Rejection Email sent: " + info.response);
    }
  });
};

module.exports = {
  sendOTPEmail,
  sendApplicationEmail,
  sendApprovalEmail,
  sendRejectionEmail,
  sendKycApproveEmail,
  sendKycRejectEmail,
};
