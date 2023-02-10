var srch_sIdRide;
var tables;
var srch_sHTMLGlobal;
var srch_html_i;
var $container;
var srch_html_info;
var $container_info;
var id_city_selected_datalist;
var srch_aRides;
var iIcompteur_modal;
var srch_aIdUser;



//CONFIGURATION DATATABLE
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
    selectTrajet();

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
            else {
                iIcompteur_modal = 0;
            }


        })
        .fail(function (err) {
            console.log('error : ' + err.status);

            alert("Erreur aucune valeur JSON");

        });

}

// *********************************************************************APPEL AJAX****************************************************************
// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// ***********************************************************************************************************************************************
// *********************************************************************APPEL AJAX****************************************************************





function generateHTML(aRides) {

    srch_aRides = aRides["result_final"];
    var srch_iRides = srch_aRides.length;
    var srch_jRide;
    var srch_bSmoke;
    var srch_bHandicap;
    var srch_bLuggage;
    srch_sHTMLGlobal = "<thead><tr><td></td></tr></thead><tbody>";
    var sToFind;


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
        srch_sHTML = srch_sHTML.replace('___sDate_time___', srch_jRide.nom_jour);
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
        // if (srch_jRide.id_user == srch_aIdUser) {
        if (srch_jRide.id_user == 7) {

            sToFind = "___sclassReserver___";
            srch_sHTML = srch_sHTML.replace(sToFind, "srch_div_icon_modif");
            srch_sHTML = srch_sHTML.replace('___sIconResever___', '<i class="far fa-edit"></i>');
            srch_sHTML = srch_sHTML.replace('___classModif___', 'srch_div_modif_total');
            srch_sHTML = srch_sHTML.replace('___sTxt_Reserver___', "Modifier");

        }
        else 
        {
            sToFind = "___sclassReserver___";
            srch_sHTML = srch_sHTML.replace(sToFind, "srch_div_icon_modif");
            srch_sHTML = srch_sHTML.replace('___sIconResever___', '<i class="far fa-check-circle"></i>');
            srch_sHTML = srch_sHTML.replace('___classModif___', 'srch_div_modif_total');
            srch_sHTML = srch_sHTML.replace('___sTxt_Reserver___', "Réservé");

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

function inverseDate(sDate) {
    var aOfDates = sDate.split("-");
    return aOfDates[2] + "/" + aOfDates[1] + "/" + aOfDates[0];
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




function SelectAjaxIdUser() {
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
function SelectIdUser(idUser) {
    srch_aIdUser = idUser;
}


function selectTrajet() {



    // Json de mes données à transmettre au php
    var datas = {
        bJSON: 1,
        page: "search_historic_list",
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
            generateHTML(result);


        })
        .fail(function (err) {
            console.log('error : ' + err.status);

            alert("Erreur aucune valeur JSON");

        });
}


// function SelectBookAdd() {

//     // Json de mes données à transmettre au php
//     var datas = {
//         bJSON: 1,
//         page: "search__historic_get_book",
//         id_user: 7,


//     }

//     $.ajax({
//         type: "POST",
//         url: "route.php",
//         async: true,
//         data: datas,
//         dataType: "json",
//         cache: false,
//     })
//         .done(function (result) {
//             console.log(result);
//             generateHTML(result);

//         })
//         .fail(function (err) {
//             console.log('error : ' + err.status);

//             alert("Erreur aucune valeur JSON");

//         });
// }
