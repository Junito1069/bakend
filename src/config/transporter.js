import nodemailer from 'nodemailer';
// process.loadEnvFile();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});