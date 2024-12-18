let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    // Asegurarse de que las variables estén definidas y sean números
    user.successfulCrimes = user.successfulCrimes ? user.successfulCrimes : 0;
    user.failedCrimes = user.failedCrimes ? user.failedCrimes : 0;

    // Asegurarse de que respeto esté definido y no sea un valor negativo
    if (typeof user.respeto !== 'number') {
        user.respeto = 0;
    }

    let timeDiff = new Date() - user.lastCrime;
    let waitTime = 120000;  // 2 minutos de espera entre crímenes

    if (timeDiff < waitTime)
        return m.reply(`⏰ *DEBES ESPERAR ${Math.ceil((waitTime - timeDiff) / 1000)} SEGUNDOS ANTES DE COMETER OTRO CRIMEN.*`, null, { contextInfo: null });

    let didCrime = Math.random() < 0.6;  // Probabilidad de éxito en el crimen
    let moneyStolen = Math.floor(Math.random() * 501) + 1500;

    if (user.money < 3000 || didCrime) {
        user.money += moneyStolen;
        user.lastCrime = new Date();
        user.successfulCrimes += 1;
        let crimeMessage = `*${getCrimeDetails()} y conseguiste: ${moneyStolen} ROBLECOINS 🤑, ahora tienes: ${user.money}*`;

        // Restar 1 de respeto cuando el jugador comete un crimen, sin dejar que sea negativo
        user.respeto = Math.max(user.respeto - 1, 0);

        return m.reply(crimeMessage + `\nTu respeto ahora es: ${user.respeto}`, null, { contextInfo: null });
    } else {
        let chance = Math.random();
        if (chance < 0.6) {
            user.money += moneyStolen;
            user.lastCrime = new Date();
            user.successfulCrimes += 1;
            let successMessage = `*${getCrimeDetails()} y conseguiste: ${moneyStolen} ROBLECOINS 🤑, ahora tienes: ${user.money}*`;

            // Restar 1 de respeto cuando el jugador comete un crimen, sin dejar que sea negativo
            user.respeto = Math.max(user.respeto - 1, 0);

            return m.reply(successMessage + `\nTu respeto ahora es: ${user.respeto}`, null, { contextInfo: null });
        } else {
            let stolenMoney = Math.floor(Math.random() * 501) + 1500;
            user.money -= stolenMoney;
            user.lastCrime = new Date();
            user.failedCrimes += 1;
            let failureMessage = `*${getCrimeDetails()} pero fuiste atrapado por la policía y tuviste que pagar una fianza de: ${stolenMoney} ROBLECOINS* 🤕`;

            // Restar 1 de respeto cuando el jugador comete un crimen, sin dejar que sea negativo
            user.respeto = Math.max(user.respeto - 1, 0);

            return m.reply(failureMessage + `\nTu respeto ahora es: ${user.respeto}`, null, { contextInfo: null });
        }
    }
}

function getCrimeDetails() {
    let crimeDetails = [
        "Robaste un banco",
        "Entraste a una casa",
        "Asaltaste una tienda",
        "Secuestraste a alguien",
        "Hiciste pintadas en la calle",
        "Hackeaste una computadora",
        "Realizaste tráfico de objetos robados",
        "Atracaste a alguien en la calle",
        "Saboteaste un evento",
        "Extorsionaste a un comerciante",
        "Realizaste vandalismo en un vehículo",
        "Infiltraste una organización rival"
    ];

    return crimeDetails[Math.floor(Math.random() * crimeDetails.length)];
}

handler.help = ['crime', 'crimen', 'crímen'];
handler.tags = ['economy'];
handler.command = /^(crime|crimen|crímen)$/i;
export default handler;
