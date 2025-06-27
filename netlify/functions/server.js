const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  const { nome, tel, email, assunto, mensagem } = data;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: 'gtechstudioweb@gmail.com, studioquinzedance@gmail.com',
    subject: assunto,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px;">
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Celular:</strong> ${tel}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${assunto}</p>
        <p><strong>Mensagem:</strong></p>
        <p style="white-space: pre-line;">${mensagem}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'E-mail enviado com sucesso!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao enviar o e-mail: ' + error }),
    };
  }
};
