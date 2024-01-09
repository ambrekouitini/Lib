import inquirer from 'inquirer';
import { convertCurrency, listAvailableCurrencies, getExchangeRateHistory } from './src/converter.js';

const apiKey = '36e2991d88d74ffe4e463dd0'; 

async function main() {
    try {
        console.log("Bienvenue dans le convertisseur de devises !");

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choisissez une option:',
                choices: [
                    'Convertir une devise',
                    'Voir les devises disponibles',
                    'Historique des taux de change'
                ]
            }
        ]);

        switch(answers.action) {
            case 'Convertir une devise':
                // Logique pour la conversion de devise

                break;
            case 'Voir les devises disponibles':
                await listAvailableCurrencies(apiKey);
                break;
            case 'Historique des taux de change':
                // Logique pour l'historique des taux de change
                break;
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

main();
