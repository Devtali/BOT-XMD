// je suis limule hinugera le developpeur du bot
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('whatsapp-web.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let paircodeMap = {}; // Pour stocker les paircodes et les numéros

function generatePaircode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

client.on('qr', (qr) => {
    console.log('QR Code :', qr); // Pour information, mais non utilisé ici.
});

client.on('ready', () => {
    console.log('Bot prêt !');
});

client.initialize();

app.post('/login', (req, res) => {
    const { phoneNumber } = req.body;
    const paircode = generatePaircode(6);
    
    // Associer le paircode avec le numéro de téléphone
    paircodeMap[paircode] = phoneNumber;

    res.send(`Votre paircode est : ${paircode}. Veuillez l'utiliser pour vous connecter.`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, () => {
    console.log('Serveur en cours d\'écoute sur http://localhost:3000');
});
// Route pour afficher le formulaire de saisie du paircode
app.get('/validate', (req, res) => {
    res.sendFile(__dirname + '/public/validate.html');
});
// Route pour valider le paircode
app.post('/validate', (req, res) => {
    const { paircode } = req.body;

    // Vérifie si le paircode existe dans la map
    if (paircodeMap[paircode]) {
        const phoneNumber = paircodeMap[paircode];
        delete paircodeMap[paircode]; // Supprime le paircode après utilisation

        // Ici, tu peux ajouter la logique pour connecter l'utilisateur via WhatsApp
        // Par exemple, envoyer un message ou faire autre chose avec le numéro de téléphone
        res.send(`Connexion réussie pour le numéro : ${phoneNumber}`);
    } else {
        res.send('Paircode invalide. Veuillez réessayer.');
    }
});
const express = require('express');
const bodyParser = require('body-parser');
const settings = require('./settings'); // Importer les paramètres de configuration

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Démarrer le serveur Express
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

// Initialiser le client WhatsApp
const { Client } = require('whatsapp-web.js');
const client = new Client({
    session: settings.session // Utiliser la session du fichier settings.js
});

// Authentification et événements du client
client.on('authenticated', (session) => {
    console.log('Bot authentifié avec succès !');
    // Optionnel : sauvegarder la session ici si tu ne l'as pas déjà fait dans settings.js
});

client.on('ready', () => {
    console.log('Bot WhatsApp prêt !');
});

// Initialiser le client
client.initialize();