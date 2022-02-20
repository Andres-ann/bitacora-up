const frases = [
    "le llovió caca ☔💩 - (Dijo Flor)",
    "Se transplantó un culo 🍑 - (dijo Maria Laura)",
    "PERO LO ESTA ENGAÑANDO FAVIO!!!! - (dijo Facu)",
    "Che… Ayer me lleve la yerba… 🐱‍👤 - (dijo Silvina (Chorra))",
    "Sos negro en todas partes? (dijo Marisa)… Creo que si 🤔 - (dijo Andres)",
    "Hablé con una persona MUERTA 💀 - (dijo Silvina)",
    "Me llamaron de Mar del Plata y me dijeron TU PERRO ME CAGO TODA LA VEREDA 💩 - (dijo Flor)",
    "Yo no voy al telo hace años 💋 - (dijo Marisa)",
    "Cerra la puerta que se nos escapan las ondas - (dijo Hugo)",
    "El menú de hoy es la comida de mañana… en otro lado - (dijo Andres)",
    "Quiero probarle la silla a Facu - (dijo Mica)",
    "Esta te deja sentado en la puntita… Mica probala… 😏 - (dijo Andres)",
    "Cuidado cuidado! Es grande esto eh!! - (dijo Facu al Presidente)",
    "No me acuerdo los nombres de todos.. Vamos a hacer cartelitos (Alberto)",
    "Yo… No se para que vine 😤 - (dijo Favio)",
    "Alguna vez fui bombero 👨‍🚒 - (dijo Facu)",
    "Me gusta bien negro - (dijo Maria Laura)",
    "Pero que.. El nombre tambien se lo robaron? - (dijo German)",
    "Precaución: febrero/marzo se viene LA OLA 🌊 - (dijo Facu)",
    "El sexo es solo para procrear 💦 - (dijo Facu)",
    "Estamos hablando del perro o de tu hija? 🤔 - (dijo Nacho)",
    "Necesito bajar un poco los pantalones 👖 - (dijo Favio)",
    "Mi tema es el tamaño… pero no el envase - (dijo Maria Laura)",
    "Mi amigo debuto con una oveja 😦  - (dijo Nati)",
    "Me lo comi, esta muy rico - (dijo Juan Pablo)",
    "Me atraganto con el sushi - (dijo Mica)",
    "apa - apa - apa …. Se puso caldoso - (dijo Maria Laura)",
    "El brocoli tiene olor a mierda 🥦 - (dijo Nati)",
    "Me quiero operar las tetas - (dijo Flor)",
    "A mi me gustaba uno de locomia, estaba bueno (? - (dijo Silvina)",
    "(Caso estacionamiento) Si sos el hijo del playero que haces? Nacho, le tenes que matar a la madre - (dijo Favia)",
    "Yo me la siento caliente - (dijo Mica)",
    "Si queres la pongo, no miro y vos me decis… Y si queres la saco - (dijo Nacho)",
    "Se le escapa mucho el pichin - (dijo Rodrigo)",
    "En qué te convertiste Favio? - (dijo Andres Mantenimiento)",
    "Ese negrito es rico (Flor) SI SI 😏 - (dijo Hugo)",
    "Yo no sy rapida - (dijo Flavia)",
    "No me toquen a mi chiquita!! - (dijo Facu)",
    "Vos sos mas facil… - (dijo Flavia a Nacho)",
    "Donde esta mi rata… De aca no se va nadie - (dijo Facu)",
    "Tengo trastornos voy a empezar a gritar - (dijo Facu)",
    "Huguito queres venir a chupar con nosotros? - (dijo Rodrigo)",
    "Vas sola a buscar comida? Somos un monton… Maxi acompañala, mañana voy yo. - (dijo Silvina (Mañana era feriado))",
    "Yo engorde un pajarito hasta matarlo - (dijo Silvina)",
    "A mi no me funciona - (dijo Facu)",
    "Ya pasamos por esto y no te funciono - (dijo Silvina)",
    "No quiero estar en la vitacora 💁‍♀️ - (dijo Cami)",
    "Igual hay bastantes bolas - (dijo Marisa)",
    "Necesito que me ayudes con eso (Silvina) - Hombre o Mujer? - (dijo Facu)",
    "Tengo varios amigos invisibles adentro - (dijo Nacho)",
    "Que olor feo.. Que olor a huevos No??? Deben estar calentando huevos ahí - (dijo Facu)",
    "Vos cuantas te comes huguito? (Nacho) - Y depende.. ALGUNAS SON GIGANTESCAS - (dijo Hugo)",
    "Respira cuatro, mantene cuatro y SOLTA EN CUATRO - (dijo Andres)",
    "Yo tengo una, pero la tengo chiquita - (dijo Facu)",
    "Camila yo soy Dina. Hace 20 meses que no voy a la ofi - (dijo Dina)",
    "Fijate lo que me vas a decir por que estoy menstruando - (dijo Flor)",
    "Telepatia, es un televisor para la hermana de mamá - - (dijo Marisa)",
    "Esta bien que la acogote, por que le dijo pleado puto - (dijo German)",
    "Nadie traga, todos escupen - (dijo Flavia)",
    "Lo importante es que no se muera el enano - (dijo Marisa a Cristina)",
    "Soy yo sola y dos gatos - (dijo Mica)",
    "Sos muy buena haciendo esto Marisa (Nacho a Marisa) Es por que tengo las manos grandes (dijo Marisa)",
    "Andaba lamiendo picaportes - (dijo Maria Laura)",
    "El otro dia me trague una y la tuve una semana atragantada - (dijo Rodrigo)",
    "No Fabio, esta es mas larga - (dijo Rodrigo)",
    "Estoy probando la tuya (Flor a Nacho) y no esta funcionando - (dijo Flor)",
    "No me quiero comer la banana de nadie - (dijo Flor)",
    "Si... 📞 Esperame que esta entrando 😲 - (dijo Rodrigo)",
    "La tercera me la puso bien puesta 💉 - (dijo Nacho)",
    "Le muevo el dedo gordo y que se vea por la zapatilla - (dijo JuanP)"
]

const cantFrases = frases.length
const numRandom = random(0, cantFrases - 1);
var counterVal = 0;

function random(min, max) { //FUNCION QUE DEVUELVE UN NUMERO AL AZAR

    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function incrementClick() { //CONTADOR DE CLICKS
    updateDisplay(++counterVal);
}

function writeFront() { //ENVIA UNA FRASE ALEATORIA AL MODAL
    document.getElementById('fraseFront').innerHTML = frases[numRandom];
}

function updateDisplay(val) {//ENVIA EL CONTADOR AL FRONT
    document.getElementById("counter-label").innerHTML = val;
}