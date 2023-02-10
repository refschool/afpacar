var srch_sIdRide;
var tables;
var srch_sHTMLGlobal;
var srch_html_i;
var $container;
var srch_html_info;
var $container_info;
var id_city_selected_datalist;
var srch_aRides;
var iDate;
var iIcompteur_modal;
var srch_aIdUser;




// CONFIGURATION DATATABLE
const configuration = {
    "stateSave": false,
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [[5, 10, 15, -1], ["5", "10", "15", "Tous"]],
    "language": {
        "info": "Annonces _START_ à _END_ sur _TOTAL_ sélectionnées",
        "emptyTable": "Aucune annonce",
        "lengthMenu": "_MENU_ Annonces par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "Annonces 0 à 0 sur 0 sélectionnée",
    },
    "columns": [
        {
            "orderable": false
        }
    ],
    'retrieve': true
};

$(document).ready(function () {
    //call function getAdminUsers
    // ajax();
    SelectCity();
    $('#search_city').bind('input', function () {
        var city_id = $('#list_result_city option[value="' + $('#search_city').val() + '"]').data('id');
        if (typeof city_id != "undefined") {
            console.log("data id  = " + city_id);
            id_city_selected_datalist = city_id;
        }
    });
    fill_for_test();
    SelectAjaxIdUser();
    
    console.log(srch_aIdUser);

});


/**
 * Add a reservation
 * 
 * @param {HTMLElement} srch_h_i The reserve i element clicked
 * @param commenter
 */
function book(srch_h_i) {
    // srch_h_i contiendra le this du i sur lequel on a cliqué
    // je stock l'element html i dans la variable
    srch_html_i = srch_h_i;
    // il recupere l'element ancetre qui a l'attribut data-ride
    $container = $(srch_html_i).closest('[data-ride]');
    // recupere la valeur de l'attribut data-ride
    srch_sIdRide = $container.data('ride');
    // alert(srch_sIdRide);
    if (iIcompteur_modal != 1) {
        $("#resultat_modale").show();
        $("#btn_modal_confirmer").show();
        $("#btn_modal_annuler").show();
        $("#btn_modal_fermer").hide();
        $("#resultat_modale").html("Etes vous sur de réserver le Trajet?");
    }

    else {

        $("#resultat_modale").hide();
        $("#btn_modal_confirmer").hide();
        $("#btn_modal_fermer").hide();
        $("#btn_modal_annuler").show();
        $("#resultat_modale").hide();
        $("#resultat_modale_refus").html("Trajet déja réserver");

    }

}


function book_ok() {
    let iId_user = Math.floor(Math.random() * 8);
    var datas = {
        bJSON: 1,
        page: "search_book",
        id_ad: srch_sIdRide,
        id_user: iId_user
        // id_user: 7
    }



    $.ajax({
        type: "POST",
        url: "route.php",
        async: false,
        data: datas,
        dataType: "json",
        cache: false,
    })
        .done(function (result) {
            if (result == 0) {
                iIcompteur_modal = 1;
                $(srch_html_i).removeClass("fas fa-plus-circle").addClass("far fa-check-circle");
                // cherche l'element enfant du conteneur qui a la class txt_label
                let $srch_text = $container.find(".txt_label");
                // remplace le code html de l'element 
                $srch_text.html("Trajet réservé");

            }
            else{
                iIcompteur_modal=0;
            }
           

        })
        .fail(function (err) {
            console.log('error : ' + err.status);

            alert("Erreur aucune valeur JSON");

        });

}
/**
 * Convert date aaaa-mm-jj into jj/mm/aaaa
 */
function convertDate(sDate) {
    var aOfDates = sDate.split("-");
    return aOfDates[2] + "/" + aOfDates[1] + "/" + aOfDates[0];
}

// *********************************************************************APPEL AJAX****************************************************************
// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// *********************************************************************APPEL AJAX****************************************************************




function Datalist(aOfCity) {
    console.log(aOfCity);
    // contiendra toute les villes et les id 
    var sHtmlDatalist;
    // contient la longueur du tableau
    var iOfCity;
    // contient tout le contenue de l'indice
    var jOfCity;

    iOfCity = aOfCity.length;


    for (var i = 0; i < iOfCity; i++) {
        var sDataliste = $("#city").html();
        jOfCity = aOfCity[i];
        sDataliste = sDataliste.replace("___NameCity___", jOfCity.nom_ville);
        sDataliste = sDataliste.replace("___IdCity___", jOfCity.id_city);
        sHtmlDatalist += sDataliste;
    }
    $("#list_result_city").html(sHtmlDatalist);

}


function detectIEorSafari() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older
        return true;
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11
        return true;
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+)
        return true;
    }

    var safari = ua.indexOf('Safari/');
    var chrome = ua.indexOf('Chrome/');
    if ((safari > 0) && (chrome == -1)) {
        // Safari
        return true;
    }

    // other browser
    return false;
}






function FilterTrueFalse() {

    var bSmoke, bLuggage, bHandicap, bDriver, bDrive, bPassenger;
    // Recupere les données des checkbox par true ou false

    bDrive = $('#srch_radio_driver').is(':checked');
    bPassenger = $('#srch_radio_passenger').is(':checked');
    bSmoke = $('#smoke').is(':checked');
    bLuggage = $('#luggage').is(':checked');
    bHandicap = $('#handicap').is(':checked');

    if (bDrive == true && bPassenger == false) {
        bDriver = 1;
    }
    else {
        bDriver = 0;

    }

    var aFilter = {
        "bDriver": bDriver,
        "smoke": bSmoke,
        "luggage": bLuggage,
        "handicap": bHandicap
    }





    // filtre smoke
    switch (aFilter["smoke"]) {

        case true:
            aFilter["smoke"] = 1;
            break;

        case false:
            aFilter["smoke"] = 0;
            break;
    }

    // filtre luggage
    switch (aFilter["luggage"]) {

        case true:
            aFilter["luggage"] = 1;
            break;

        case false:
            aFilter["luggage"] = 0;
            break;
    }

    // filtre handicap
    switch (aFilter["handicap"]) {

        case true:
            aFilter["handicap"] = 1;
            break;

        case false:
            aFilter["handicap"] = 0;
            break;
    }
    return aFilter;

}

/**
 * Convert date jj/mm/aaaa into aaaa-mm-jj
 */
function inverseDate(sDate) {
    var aOfDates = sDate.split("/");
    return aOfDates[2] + "-" + aOfDates[1] + "-" + aOfDates[0];
}



function generateHTML(aRides) {

    srch_aRides = aRides;
    var srch_iRides = srch_aRides.length;
    var srch_jRide;
    var srch_bSmoke;
    var srch_bHandicap;
    var srch_bLuggage;
    srch_sHTMLGlobal = "<thead><tr><td></td></tr></thead><tbody>";
    var sToFind;
    iDate = convertDate($('#date_trajet').val());


    for (var j = 0; j < srch_iRides; j++) {
        let Result = $("#resultat").val();

        var srch_sHTML = "<tr><td>" + $('#div_template_resultat').html() + "</td></tr>";
        srch_jRide = srch_aRides[j];
        // si la ville recherchév  est egale a la ville d'un JSON alors il boucle, sinon il ne boucle pas sur le Json 


        srch_bSmoke = srch_jRide.bSmoke;
        srch_bLuggage = srch_jRide.bLuggage;
        srch_bHandicap = srch_jRide.bHandicap;
        srch_boffer = srch_jRide.bIsOffer;
        srch_bAdmin = srch_jRide.sAdmin;
        srch_bGoming = srch_jRide.aller;
        srch_bComing = srch_jRide.retour;
        srch_jRide.filename_photo_user = getImageFileName(srch_jRide.filename_photo_user)
        srch_sHTML = srch_sHTML.replace('___sIdRide___', srch_jRide.id_ad);
        srch_sHTML = srch_sHTML.replace('___sIdInfo___', srch_jRide.id_ad);
        //genere la date et heure   
        srch_sHTML = srch_sHTML.replace('___sDate_time___', iDate);
        // genere le nom du fichier image
        srch_sHTML = srch_sHTML.replace('___sImageFilename___', srch_jRide.filename_photo_user);
        // genere les noms et prenom
        srch_sHTML = srch_sHTML.replace('___sName___', srch_jRide.name_user);
        srch_sHTML = srch_sHTML.replace('___SfirstName___', srch_jRide.firstname_user);

        srch_sHTML = srch_sHTML.replace('___sIdAd___', srch_jRide.id_ad);
        srch_sHTML = srch_sHTML.replace('___sIboucle___', j);

        // genere les etoiles pleines 
        for (i = 1; i <= srch_jRide.average_score_user; i++) {
            sToFind = '___star' + i + '___';
            srch_sHTML = srch_sHTML.replace(sToFind, "fas");
        }
        // genere les etoiles vides 

        for (i = (srch_jRide.average_score_user); i <= 5; i++) {
            var sToFind = '___star' + i + '___';
            srch_sHTML = srch_sHTML.replace(sToFind, "far");
        }
        // genere la ville de depart 
        srch_sHTML = srch_sHTML.replace('___sCity___', srch_jRide.sCity);
        // si il fait un aller et un retour = fleche aller-retour
        if (srch_bComing != "" && srch_bGoming != "") {
            srch_sHTML = srch_sHTML.replace('___Arrow___', '  <i class="fas fa-arrows-alt-h"></i>');
            srch_sHTML = srch_sHTML.replace('___aller_retour___', '  Aller-Retour');

        }
        // sinonsi il fait un aller  = fleche droite

        else if (srch_bGoming != "") {
            srch_sHTML = srch_sHTML.replace('___Arrow___', '  <i class="fas fa-arrow-right"></i>');
            srch_sHTML = srch_sHTML.replace('___aller_retour___', '  Aller');


        }
        // sinon il fait un retour = fleche left

        else {
            srch_sHTML = srch_sHTML.replace('___Arrow___', '  <i class="fas fa-arrow-left"></i>');
            srch_sHTML = srch_sHTML.replace('___aller_retour___', '  Retour');


        }


        // si il est fumeur  alors il mets la bonne classe 
        if (srch_bSmoke == 1) {
            srch_sHTML = srch_sHTML.replace('___smoking___', `<i class="fas fa-smoking"></i>`);
        }
        // sinon il utilise  une autre class pour le rendre gris
        else {
            srch_sHTML = srch_sHTML.replace('___smoking___', `<i class="fas text-secondary fa-smoking"></i>`);
        }


        // si il a des bagages alors il mets la bonne classe 
        if (srch_bLuggage == 1) {
            srch_sHTML = srch_sHTML.replace('___sLuggage___', `  <i class="fas fa-suitcase"></i>    `);
        }
        // sinon il utilise  une autre class pour le rendre gris
        else {
            srch_sHTML = srch_sHTML.replace('___sLuggage___', `<i class="fas text-secondary fa-suitcase"></i>`);

        }
        // si il a des bagages alors il mets la bonne classe 
        if (srch_bHandicap == 1) {
            srch_sHTML = srch_sHTML.replace('___sHandic___', ` <i class="fas fa-wheelchair"></i> `);
        }
        // sinon il utilise  une autre class pour le rendre gris
        else {
            srch_sHTML = srch_sHTML.replace('___sHandic___', `<i class="fas text-secondary fa-wheelchair"></i>`);

        }
        // il trouve la ville et le remplace
        srch_sHTML = srch_sHTML.replace('___iSeats___', srch_jRide.seat);
        //  il  ecrit si 'cest une offre
        if (srch_jRide.is_driver_ad == 1) {

            srch_sHTML = srch_sHTML.replace('___sOffer___', "Conducteur");

        }
        // sinon il ecrit c'est une demande
        else {
            srch_sHTML = srch_sHTML.replace('___sOffer___', "Passager");

        }
        // si c'est l'utilisateur qui a publié il peut modifier son offre 
        if (srch_jRide.id_user != srch_aIdUser) {
            
            sToFind = "___sclassReserver___";
            srch_sHTML = srch_sHTML.replace(sToFind, "srch_div_icon_modif");
            srch_sHTML = srch_sHTML.replace('___sIconResever___', '<i class="far fa-edit"></i>');
            srch_sHTML = srch_sHTML.replace('___classModif___', 'srch_div_modif_total');
            srch_sHTML = srch_sHTML.replace('___sTxt_Reserver___', "Modifier");

        }
        // sinon il peut que reserver
        else {
            sToFind = "___sclassReserver___";
            srch_sHTML = srch_sHTML.replace(sToFind, "srch_div_icon_reserver");
            srch_sHTML = srch_sHTML.replace('___sIconResever___', '  <i onClick="book(this)"  data-bs-toggle="modal" data-bs-target="#Modal"  class="fas fa-plus-circle "></i>  ');
            srch_sHTML = srch_sHTML.replace('___sTxt_Reserver___', "Réserver");

        }




        srch_sHTMLGlobal += srch_sHTML;
    }




    $('#div_tous_les_resultats').html(srch_sHTMLGlobal + "</tbody>");
    if (tables != null) {
        tables.clear().destroy();
    }
    tables = $('#div_tous_les_resultats').DataTable(configuration);


}

/**
 * Returns the file name of an user image 
 * 
 * @param {string} sName User name
 * @param {string} sFirstName User first name
 * 
 * @returns {string}
 */

function getImageFileName(filename_photo_user) {
    return ('assets/img/users/' + filename_photo_user);
    // return (`${sName}_${sFirstName}.png`);
}





// iIdAd,iIboucle <--en bouclant il contiendra l'indice du trajet et la valeur de j
function Modal_Info(iIdAd, iIboucle) {
    let sResultat;
    let jRide = srch_aRides[iIboucle];
    var sDate_debut = inverseDate(srch_aRides[0].date_debut);
    var sDate_fin = inverseDate(srch_aRides[0].date_fin);
    // Json de mes données à transmettre au php
    var datas = {
        bJSON: 1,
        page: "search_modal",
        id_ad: iIdAd,
        id_user: 7,
    }
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })
        .done(function (result) {
            // j'affiche le nom, le prenom et la date du trajet
            sResultat = "Du " + sDate_debut + " au " + sDate_fin + ".<br><br>";

            sResultat += "<p><b>Contenu de l'annonce : </b><br>" + jRide.content_ad + "</p>";
            // si c'est un aller et retour 
            if (jRide.aller != "" && jRide.retour != "") {
                // je renseigne le depart et l'arriver
                sResultat += "<p><b>Départ : " + jRide.sCity + "</b>" + "___depart___";
                sResultat += "<p><b>Arrivée : Afpa </b>" + "___retour___";
                // si il y a un commentaire de depart alors je remplace ___depart___ par le commentaire
                if (jRide.comment_start_address_ad != "") {
                    sResultat = sResultat.replace("___depart___", '<i>(' + jRide.comment_start_address_ad + ')</i></p>');
                }
                // si y a pas de commentaire alors il supprime le ___depart___
                else {
                    sResultat = sResultat.replace('___depart___', '</p>');
                }
                // si il y a un commentaire d'arrivée alors je remplace ___arriver___ par le commentaire

                if (jRide.comment_end_address_ad != "") {
                    sResultat = sResultat.replace("___retour___", '<i>(' + jRide.comment_end_address_ad + ')</i></p>');

                }
                // si y a pas de commentaire alors il supprime le ___arriver___


                else {
                    sResultat = sResultat.replace('___retour___', '</p>');
                }


            }
            // sinonsi il fait un aller  

            else if (jRide.aller != "") {

                sResultat += "<p><b>Départ : " + jRide.sCity + "</b>" + "___depart___";
                sResultat += "<p><b>Arrivée : Afpa </b>" + "___retour___";
                if (jRide.comment_start_address_ad != "") {
                    sResultat = sResultat.replace("___depart___", '<i>(' + jRide.comment_start_address_ad + ')</i></p>');
                }

                else {
                    sResultat = sResultat.replace('___depart___', '</p>');
                }

                if (jRide.comment_end_address_ad != "") {
                    sResultat = sResultat.replace("___retour___", '<i>(' + jRide.comment_end_address_ad + ')</i></p>');

                }
                else {
                    sResultat = sResultat.replace('___retour___', '</p>');
                }


            }
            // sinon il fait un retour = fleche left

            else {

                sResultat += "<p><b>Départ : Afpa </b>" + "___depart___";
                sResultat += "<p><b>Arrivée : </b>" + jRide.sCity + "___retour___";

                if (jRide.comment_start_address_ad != "") {
                    sResultat = sResultat.replace('___depart___', '<i>(' + jRide.comment_start_address_ad + ')</i></p>');
                }
                else {
                    sResultat = sResultat.replace('___depart___', '</p>');
                }


                if (jRide.comment_end_address_ad != "") {
                    sResultat = sResultat.replace('___retour___', '<i>(' + jRide.comment_end_address_ad + ')</i></p>');
                }
                else {
                    sResultat = sResultat.replace('___retour___', '</p>');
                }

            }




            for (var i = 0; i < result["add_info"].length; i++) {
                if (i == 0) {
                    sResultat += "<p><b>Étape(s) du Trajet : </b><br>";
                }
                sResultat += "-&nbsp;" + result["add_info"][i]["label_city_etape"] + "&nbsp;";
                sResultat += "<i>(" + result["add_info"][i]["comment_stage"] + ")</i><br>";
            }
            if (result["add_info"].length != 0) {
                sResultat += "</p>";
            }

            for (var i = 0; i < result["add_user"].length; i++) {
                if (i == 0) {
                    sResultat += "<p><b>Passager : </b></p><br>";
                }
                sResultat += "<p>" + result["add_user"][i]["name_user"];
                sResultat += " " + result["add_user"][i]["firstname_user"] + " </p>";
                if (result["add_user"][i]["service_contract__passenger"] != "") {
                    sResultat += ": <i>(" + result["add_user"][i]["service_contract__passenger"] + ")</i><br>";

                }



            }
            if (result["add_user"].length != 0) {
                sResultat += "</p>";
            }

            $("#info_resultat").html(sResultat);

        })
        .fail(function (err) {
            console.log('error : ' + err.status);

            alert("Erreur aucune valeur JSON");

        });

}



function SelectCity() {

    // Json de mes données à transmettre au php

    var datas = {
        bJSON: 1,
        page: "search_city",

    }
    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })
        .done(function (result) {
            Datalist(result);

        })
        .fail(function (err) {
            console.log('error : ' + err.status);

            alert("Erreur aucune valeur JSON");

        });




}

function selectTrajet() {
    var bAller, bRetour, bAllerRetour,

        bAller = $('#aller').is(':checked');
    bRetour = +$('#retour').is(':checked');

    // si c'est un aller et retour alors le booleen bAllerRetour vaut 0
    if (bAller && bRetour) {
        bAllerRetour = 2;
    }
    // si c'est un aller  alors le booleen bAllerRetour vaut 1
    else if (bAller) {
        bAllerRetour = 0;
    }
    // si c'est un aller  alors le booleen bAllerRetour vaut 2
    else if (bRetour) {
        bAllerRetour = 1;
    }
    // si rien n'est selectionner alors il affiche le message d'erreur
    else (
        alert("erreur veuillez saisir un check")
    )
    var aResult = FilterTrueFalse();

    // si je suis sur safari alors il inverse la date
    var dDateTrajet;
    if (detectIEorSafari()) {
        dDateTrajet = inverseDate($('#date_trajet').val());
        // sinon il a recupere sous la forme de l'input
    } else {
        dDateTrajet = $('#date_trajet').val();
    }



    // Json de mes données à transmettre au php
    var datas = {
        bJSON: 1,
        page: "search_list",
        // ville: $('#city').val(),
        ville: id_city_selected_datalist,
        date_trajet: dDateTrajet,
        bAllerRetour: bAllerRetour,
        bDriver: aResult["bDriver"],
        bSmoke: aResult["smoke"],
        bLuggage: aResult["luggage"],
        bHandicap: aResult["handicap"]

    }
    // alert("voila les données :" + datas.ville + " date=" + datas.date_trajet + " json=" + datas.bJSON + " aller ou retour=" + datas.bAllerRetour + " Driver= " + datas.bDriver + " Smoke=" + datas.bSmoke + " Luggage=" + datas.bLuggage + " Handicape=" + datas.bHandicap);

    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })
        .done(function (result) {
            generateHTML(result);


        })
        .fail(function (err) {
            console.log('error : ' + err.status);

            alert("Erreur aucune valeur JSON");

        });
}

function fill_for_test() {
    $('#date_trajet').val("2021-06-01");
    $('#retour').click();
    $('#srch_radio_driver').click();
    $('#luggage').click();
    $('#handicap').click();
}
function SelectAjaxIdUser(){
    // Json de mes données à transmettre au php
    var datas = {
        bJSON: 1,
        page: "search_idUser",


    }

    $.ajax({
        type: "POST",
        url: "route.php",
        async: false,
        data: datas,
        dataType: "json",
        cache: false,
    })
        .done(function (result) {
            SelectIdUser(result);

        })
        .fail(function (err) {
            console.log('error : ' + err.status);

            alert("Erreur aucune valeur JSON");

        });
};
function SelectIdUser(idUser){
    srch_aIdUser=idUser;
}