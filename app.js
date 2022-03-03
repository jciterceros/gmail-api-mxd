const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// I need this id's and secrets should come from .env file.
const CLIENT_ID = '1051303266738-2uru9v19cp89ga1f6a7r08qcoe70hj8f.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04H1-LL9228xgCgYIARAAGAQSNwF-L9IrqbAQuG254uBlQrP2gjSd69CcNitNaKt4TJFha0F9I-5-A4ok53l62g7mgtAtkFpebKw';

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
        user: 'fernando@mxdrive.com.br',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'Fernando Terceros <fernando@mxdrive.com.br>',
      to: 'cassio.omura@mxdrive.com.br',
      cc: 'rodrigo@mxdrive.com.br',
      co: 'jciterceros@gmail.com',
      subject: 'Enviado pelo gmail Usando GoogleAPI',
      text: 'Teste de envio de email com autenticacao de seguranca, quem diz que ao pode ser feito...',
      html: '<h1>Teste de envio de email com autenticacao de seguranca, quem diz que ao pode ser feito...</h1>',
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
