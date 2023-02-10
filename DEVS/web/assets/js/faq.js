// var aOfFaq = [
//     {
//         sQuestion: "Les trajets sont-ils payants ?",
//         sAnswer: "Pas forcément. Cela est déterminé entre le conducteur et le passager. Néanmoins, si c'est le cas, une trace du tarif choisi est conservée sur Afpacar."
//     },
//     {
//         sQuestion: "Est-ce que je peux écouter du Céline Dion dans ma voiture lors d'un trajet matinal ?",
//         sAnswer: "Bien sûr que non espèce de psychopathe.Bien sûr que non espèce de psychopathe.Bien sûr que non espèce de psychopathe.Bien sûr que non espèce de psychopathe.Bien sûr que non espèce de psychopathe.Bien sûr que non espèce de psychopathe."
//     },
//     {
//         sQuestion: "Insane ?",
//         sAnswer: "Insane."
//     }
// ]

$(function () {
    getFaqUser()
}
)

// fonction lecture tableau jAdress=JSON en cours
function loadFaq() {
    $("#container_faq").html("");//la div est ici vidée de tout contenu.
    for (let i = 0; i < aOfFaq.length; i++)//cette boucle sert simplement à donner l'argument "i" à la fonction 
    {
        loadTemplateFaq(i);
    }
    for (let i = 0; i < aOfFaq.length; i++) {
        loadTableauFaq(i);//cette boucle sert simplement à donner l'argument "i" à la fonction 
    }
}

function loadTemplateFaq(iIndiceAOfFaq) {
    // on affecte le contenu de l'id "template_faq" à la variable templateFaq
    var templateFaq = $("#template_faq").html();

    // modify content from JSON
    templateFaq = templateFaq.replace(/%id_faq%/g, iIndiceAOfFaq);

    // append result to the adresses container
    $("#container_faq").html($("#container_faq").html() + templateFaq);
}

//prendre les contenus du tableau et les injecter dans les inputs qui sont crées
function loadTableauFaq(iIndiceAOfFaq) {
    $('#question_' + iIndiceAOfFaq).html(aOfFaq[iIndiceAOfFaq]["content_question"]);
    $('#reponse_' + iIndiceAOfFaq).html(aOfFaq[iIndiceAOfFaq]["content_response"]);
}

function getFaqUser() {
    var datas= {
        bJSON:1,
        page:"faq__getFaq"
    }

    $.ajax({
        type: "POST", // method="POST"
        url: "route.php", // action="./php/route.php"
        data: datas,
        async: true, // allows synchronous or asynchronous multiple JS calls to PHP
        dataType: "json", // format expected of return PHP
        cache: false, // stock in to the cache false
    })

    .done(function (result){
        console.log(result);
        aOfFaq=result;
        loadFaq(aOfFaq);//generer le tableau JSON
    })

    .fail(function (err){
        
        console.log('Erreur:' + err.status);
    })
}
