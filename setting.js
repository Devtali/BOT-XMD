const { Client } = require('whatsapp-web.js');
const fs = require('fs');

// Vérifier si une session existe
let sessionData;
if (fs.existsSync('./session.json')) {
    sessionData = require('./session.json');
}

const client = new Client({
    session: sessionData // Utiliser les données de session si elles existent
});

module.exports = {
    phoneNumber: 'NUMERO_DE_TON_BOT', // Remplace par le numéro de ton bot au format international
    prefix: '!', // Préfixe pour les commandes
    ownerID: 'VOTRE_ID_DU_PROPRIETAIRE', // Remplace par ton ID utilisateur
    status: {
        activity: {
            name: 'Votre activité ici',
            type: 'LISTENING' // Types possibles : PLAYING, LISTENING, WATCHING
        },
        status: 'available' // Statut du bot : available, unavailable
    },
    session: sessionData // Exporter la session pour l'utiliser dans index.js
};

// Sauvegarder la session lors de la connexion
client.on('authenticated', (session) => {
    console.log('Bot authentifié avec succès !');
    fs.writeFileSync('./session.json', JSON.stringify(session));
});

// Gérer le pair code ici si nécessaire
client.on('pair', (pairCode) => {
    console.log(`Pair Code : ${pairCode}. Utilisez-le pour vous connecter.`);
});

// Initialiser le client
client.initialize();