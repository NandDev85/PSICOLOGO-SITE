const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

router.post('/send', async (req, res) => {
  const { nome, email, telefone, tipoConsulta, mensagem, assunto } = req.body;

  try {
    // Configura o e-mail de notificação para você
    await transporter.sendMail({
      from: `"Site Alex Ferreira" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject: assunto || 'Novo contato do site',
      html: `
        <h2 style="color: #006e8e;">Novo Agendamento Solicitado</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f8f9fa;"><strong>Nome:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${nome}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f8f9fa;"><strong>Telefone:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${telefone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f8f9fa;"><strong>E-mail:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f8f9fa;"><strong>Tipo de Consulta:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${tipoConsulta}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f8f9fa;"><strong>Mensagem:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${mensagem || 'Nenhuma mensagem adicional'}</td>
          </tr>
        </table>
        <p style="margin-top: 20px;">Por favor, responda a este e-mail ou entre em contato com o cliente o mais breve possível.</p>
        <hr>
        <p style="font-size: 0.9em; color: #6c757d;">Mensagem enviada automaticamente pelo site em ${new Date().toLocaleString()}</p>
      `
    });

    // Configura o e-mail de confirmação para o cliente
    await transporter.sendMail({
      from: `"Alex Ferreira - Psicólogo" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Recebemos seu agendamento',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background-color: #006e8e; padding: 20px; text-align: center;">
            <h2 style="color: white; margin: 0;">Alex Ferreira - Psicólogo Clínico</h2>
          </div>
          
          <div style="padding: 20px;">
            <h3 style="color: #006e8e;">Olá ${nome.split(' ')[0]},</h3>
            <p>Recebemos sua solicitação de agendamento para consulta <strong>${tipoConsulta.toLowerCase()}</strong>.</p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <p style="margin: 0;"><strong>Detalhes do agendamento:</strong></p>
              <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                <li><strong>Nome:</strong> ${nome}</li>
                <li><strong>Telefone:</strong> ${telefone}</li>
                <li><strong>Tipo de consulta:</strong> ${tipoConsulta}</li>
                ${mensagem ? `<li><strong>Mensagem:</strong> ${mensagem}</li>` : ''}
              </ul>
            </div>
            
            <p>Entraremos em contato em até <strong>24 horas úteis</strong> para confirmar o horário disponível mais adequado.</p>
            
            <p>Se preferir, você também pode entrar em contato diretamente:</p>
            <ul>
              <li>Telefone: (71) 99701-0328</li>
              <li>E-mail: alexferreiram3@gmail.com</li>
            </ul>
            
            <p>Atenciosamente,</p>
            <p><strong>Alex Ferreira</strong><br>Psicólogo Clínico - CRP 03/18232</p>
          </div>
          
          <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 0.8em; color: #6c757d;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Alex Ferreira. Todos os direitos reservados.</p>
          </div>
        </div>
      `
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.' 
    });
  }
});

module.exports = router;