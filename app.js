const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// I need this id's and secrets should come from .env file.
const CLIENT_ID = '';
const CLIENT_SECRET = '';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'nome@organizacao.com.br',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'nome sobrenome <nome@organizacao.com.br>',
      to: 'nome_destino@organizacao.com.br',
      cc: 'nome_destino_em_copia@organizacao.com.br',
      co: 'nome_destino_copia_oculta@organizacao.com.br',
      subject: 'Enviado pelo gmail Usando GoogleAPI',
      text: 'Teste de envio de email com autenticacao de seguranca',
      html: '<h1>Teste de envio de email com autenticacao de seguranca</h1>',
      attachments:[
          {filename:'Liguagem.jpg',path:'./Liguagem.jpg'}
      ]
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));
