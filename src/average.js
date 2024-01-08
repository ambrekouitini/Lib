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
