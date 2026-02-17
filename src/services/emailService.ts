// To set up EmailJS:
// 1) Go to emailjs.com
// 2) Create free account
// 3) Add Gmail service (connect nirmilshah1@gmail.com)
// 4) Create email template with variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 5) Copy Service ID, Template ID, and Public Key into the constants below

import emailjs from '@emailjs/browser';

// These are publishable client-side keys, safe to store in code.
// Replace these placeholder values with your actual EmailJS credentials.
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_email: 'nirmilshah1@gmail.com',
  });
};
