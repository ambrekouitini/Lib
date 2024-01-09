// Fonction pour obtenir les taux de change
async function getExchangeRate(baseCurrency, targetCurrency) {
    const apiKey = '36e2991d88d74ffe4e463dd0'; // Remplacez ceci par votre clé API
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === 'success') {
            return data.conversion_rates[targetCurrency];
        } else {
            throw new Error(`Erreur lors de la récupération des taux de change: ${data['error-type']}`);
        }
    } catch (error) {
        console.error("Erreur réseau ou autre problème:", error);
        return null;
    }
}

// Fonction pour convertir une devise
export async function convertCurrency(amount, baseCurrency, targetCurrency) {
    const rate = await getExchangeRate(baseCurrency, targetCurrency);
    if (rate !== null) {
        return amount * rate;
    } else {
        return NaN;
    }
}

// Fonction pour obtenir la liste des devises disponibles
export async function listAvailableCurrencies(apiKey) {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === 'success') {
            console.log("Devises disponibles:");
            data.supported_codes.forEach(code => {
                console.log(`${code[0]} - ${code[1]}`);
            });
        } else {
            throw new Error(`Erreur lors de la récupération de la liste des devises: ${data['error-type']}`);
        }
    } catch (error) {
        console.error("Erreur réseau ou autre problème:", error);
    }
}

// Fonction pour obtenir l'historique des taux de change
export async function getExchangeRateHistory(apiKey, baseCurrency, date) {
    // Découpe la date en composants année, mois, jour
    const [year, month, day] = date.split('-');

    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/history/${baseCurrency}/${year}/${month}/${day}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('La réponse n\'est pas au format JSON');
        }

        const data = await response.json();

        if (data.result === 'success') {
            console.log(`Taux de change pour ${baseCurrency} le ${date}:`);
            for (let currency in data.conversion_rates) {
                console.log(`${currency}: ${data.conversion_rates[currency]}`);
            }
        } else {
            throw new Error(`Erreur lors de la récupération de l'historique des taux de change: ${data['error-type']}`);
        }
    } catch (error) {
        console.error("Erreur réseau ou autre problème:", error);
    }
}
