
// CONFIGURATION DATATABLE
const jInfoDatatableConfig = {
    "stateSave": false,
    "order": [[1, "asc"]],
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [[10, 25, 50, 100, -1], ["Dix", "Vingt cinq", "Cinquante", "Cent", "Ze total stp"]],
    "language": {
        "info": "Utilisateurs _START_ à _END_ sur _TOTAL_ sélectionnées",
        "emptyTable": "Aucun utilisateur",
        "lengthMenu": "_MENU_ Utilisateurs par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "Utilisateurs 0 à 0 sur 0 sélectionnée",
    },
    "columns": [
        // {
            //     "orderable": true
            // },
            {
                "orderable": true
            },
            {
                "orderable": true
            },
            {
                "orderable": true
            },
            {
                "orderable": false
            },
            {
                "orderable": false
            }
        ],
    'retrieve': true
};
/**
 * @var {string} sPageName The name of the page which is clicked on
 */
var sPageName;
var aOfAdmInfo = [];
var iIndiceEditionToKeep;
var iIndiceToPage;
var tables;

// permet de montrer cacher a partir du meme bouton (fait par Damien) et à revoir
$(document).ready(function () {
    getInfo();

    console.log("test1 chargement");
    console.log(aOfAdmInfo);

    // INIT DATATABLE
    tables = $('#table_personnes').DataTable(jInfoDatatableConfig);
    $('#addInfo_button').click(function () {
        const $modal = $('#myLargeModalLabel');
        $('[data-info-action="add_info"]', $modal).show();
        $('[data-info-action="edit_info"]', $modal).hide();
    })

});



function constructTable(data) {
    aOfAdmInfo= data;

    var sDate;
    var sHTML = "<thead>";
    sHTML += "<tr>";
    sHTML += "<th>Titre</th>";
    sHTML += "<th>Dernière Modification</th>";
    // sHTML += "<th>Date_Heure</th>";
    sHTML += "<th>Auteur</th>";
    sHTML += "<th>Editer</th>";
    sHTML += "<th class='d-flex justify-content-center'>Supprimer</th>";
    sHTML += "</tr>";
    sHTML += "</thead>";
    sHTML += "<tbody>";
    for (var i = 0; i < aOfAdmInfo.length; i++) {
        
            sHTML += "<tr>";
            sHTML +=    "<td>" + aOfAdmInfo[i]["label_page"] + "</td>";
            sHTML +=    "<td>" + aOfAdmInfo[i]["datetime_creation_page"] + "</td>";
            // sHTML += "<td>" + aOfAdmInfo[i]["Date_heure"] + "</td>";
            sHTML +=    "<td>" + aOfAdmInfo[i]["author_page"] + "</td>";
            // " + aOfAdmInfo[i].pageName + "
            sHTML +=    `<td data-bs-toggle='modal' data-bs-target='#myLargeModalLabel' onClick="updatePageName(`+aOfAdmInfo[i]["id_page"]+`); eeditInfo(`+aOfAdmInfo[i]["id_page"]+`)"><i class='fas fa-pen fa-2x'></i></td>`;
            sHTML +=    `<td data-bs-toggle='modal' data-bs-target='#modalSupp' class='d-flex justify-content-center' onClick="updatePageName(`+aOfAdmInfo[i]["id_page"]+`)"><i class='fas fa-trash-alt fa-2x'></i></td>`;
            sHTML += "</tr>";
            iIndiceEditionToKeep = i;
            iIndiceToPage = aOfAdmInfo[i].id_page;
        
    }
    console.log("i="+i+"longueur="+aOfAdmInfo.length);
    sHTML += "</tbody>";
    $('#table_personnes').html(sHTML);
}

function eeditInfo(iIndiceEdition) {
    
    iIndiceEditionToKeep = iIndiceEdition;
    alert(iIndiceEditionToKeep);
    const $modal = $('#myLargeModalLabel');
    // hide/show modal buttons

    const editedInfo = aOfAdmInfo.find(element => element.id_page == iIndiceEditionToKeep);
    console.log(editedInfo);
    $('#modal-title-content').val(editedInfo.label_page);
    $('#summernote').value(editedInfo.content_page);
    console.log($modal);
    $('[data-info-action="add_info"]', $modal).hide();
    $('[data-info-action="edit_info"]', $modal).show();
    console.log("indice en cours : " + iIndiceEdition +editedInfo.content_page);
    console.log(aOfAdmInfo);
    console.log($('[data-info-action="edit_info"]', $modal));
    $( '[data-info-action="edit_info"]' ).click(function() {
       
        editInfo();
      });
}



function supprPersonne(iIndiceEditionToKeep) {

    aOfAdmInfo.splice(iIndiceEditionToKeep, 1);
    console.log(iIndiceEditionToKeep);

    tables.clear();
    tables.destroy();
    constructTable();
    tables = $('#table_personnes').DataTable(jInfoDatatableConfig);

}

function Ajout() {

    sTitreModal = $('#modal-title-content').value();
    sContenu = $('#summernote').value();
    var iNew = aOfAdmInfo.length;
    aOfAdmInfo[iNew] = [];
    aOfAdmInfo[iNew]["Auteur"] = "ntr";
    aOfAdmInfo[iNew]["Date_heure"] = "13h10";
    aOfAdmInfo[iNew]["Titre"] = sTitreModal;
    aOfAdmInfo[iNew]["Derniere_Modif"] = "date et time";
    aOfAdmInfo[iNew]["Contenu"] = sContenu;


    tables.clear();
    tables.destroy();
    constructTable();
    tables = $('#table_personnes').DataTable(jInfoDatatableConfig);
}

// function sauv() {

//     sTitreModal = $('#modal-title-content').val();
//     sContenu = $('#summernote').value();
//     aOfAdmInfo[iIndiceEditionToKeep]["Titre"] = sTitreModal;
//     aOfAdmInfo[iIndiceEditionToKeep]["Contenu"] = sContenu;

//     tables.clear();
//     tables.destroy();
//     constructTable();
//     tables = $('#table_personnes').DataTable(jInfoDatatableConfig);
// }



function inverseDate(sDate) {
    var aOfDates = sDate.split("-");
    return aOfDates[2] + "/" + aOfDates[1] + "/" + aOfDates[0];
}


/**
 * function call ajax for delet element in to the json and datatable -----------------------------------------------------------------------------------
 * @param { Integer } index 
 * @returns err
 */

function getInfo() {


    //init var datas and add setting index and token  
    var datas = {
        bJSON: 1,
        page: "adm_info__getInfo"
    }
    //init call ajax 
    $.ajax({
        type: "POST", // method="POST"
        url: "route.php", // action="./php/route.php"
        data: datas,
        async: false, // allows synchronous or asynchronous multiple JS calls to PHP
        dataType: "json", // format expected of return PHP
        cache: false, // stock in to the cache false
    })
        //if the call ajax is ok
        .done(function (result) {
            // aOfAdmInfo = result;
            console.log(result);
            constructTable(result);
        })
        //if call ajax dont work  
        .fail(function (err) {
            //send in to the console the errors code 
            console.log('newAdmin Error:' + err.status);
        })
}

// 1/ Creation de la requete Ajax dans adm_infos.js 
// 2/ L'appel AJAX est envoyé au php  "adm_info__getInfo" que nous venons de creer, avec les datas si il en a.
// 3/ Dans adm_info nous allons traiter l'appel AJAX pour l'envoyer de la couche métier à la couche service.
// 4/ La couche service va nous renvoyer le flux Json à notre vue. Et celle-ci l'a renvoie à notre appel AJAX (.done(function (result))
// 5/ Création du doc en .sql avec la requête nécessaire.
// Voir les fichiers : 
// - service(adm_info_service.php)
// - metier(adm_info__getInfo.php) dans laquelle on a "$this->aResult = $this->oService->getInfo(); "
// - adm_info__getInfo.html a été crée avec dedans "<?php
//    echo json_encode ($oMain->aResult);
//    ?>""



/**
 * function call ajax for delet element in to the json and datatable -----------------------------------------------------------------------------------
 * @returns err
 */
function suppInfo() {
    
    //init var datas and add setting index and token  
    var datas = {
        bJSON: 1,
        page: "adm_info__suppInfo",
        is_active_page: 0,
        sPageName: sPageName
    }
    //init call ajax 
    $.ajax({
        type: "POST", // method="POST"
        url: "route.php", // action="./php/route.php"
        data: datas,
        async: true, // allows synchronous or asynchronous multiple JS calls to PHP
        dataType: "json", // format expected of return PHP
        cache: false, // stock in to the cache false
    })
        //if the call ajax is ok
        .done(function (result) {
            if (result.error != null && result.error == "") {
                getInfo();

            }
            $("errtest").show()
        })
        //if call ajax dont work  
        .fail(function (err) {
            //send in to the console the errors code 
            console.log('newAdmin Error:' + err.status);
        })

}
function Date_time() {
    var d = new Date();
    var date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var fullDate = date + ' ' + hours;
    console.log(fullDate);
    return fullDate;
}


/**
 * function call ajax for delet element in to the json and datatable -----------------------------------------------------------------------------------
 * @param { Integer } index 
 * @returns err
 */
function addInfo() {

    /*

    */



    //init var datas and add setting index and token  
    var datas = {
        bJSON: 1,
        page: "adm_info__addInfo",
        content_page: $('#summernote').value(),
        label_page: $('#modal-title-content').value()
    }
    //init call ajax 
    $.ajax({
        type: "POST", // method="POST"
        url: "route.php", // action="./php/route.php"
        data: datas,
        async: false, // allows synchronous or asynchronous multiple JS calls to PHP
        dataType: "json", // format expected of return PHP
        cache: false, // stock in to the cache false
    })
        //if the call ajax is ok
        .done(function (result) {
            // if (result.error != null && result.error == ""){
            
            // getInfo();
            sTitreModal = $('#modal-title-content').value();
            sContenu = $('#summernote').value();
            var iNew = aOfAdmInfo.length;
            aOfAdmInfo[iNew] = [];
            aOfAdmInfo[iNew]["label_page"] = sTitreModal;
            aOfAdmInfo[iNew]["content_page"] = sContenu;
            aOfAdmInfo[iNew]["datetime_creation_page"] = Date_time();
            aOfAdmInfo[iNew]["author_page"] = "Jijou";
            aOfAdmInfo[iNew]["id_page"] = result[0]["id_page_created"];
            aOfAdmInfo[iNew]["is_active_page"] = 1;

             tables.clear();
             tables.destroy();
            constructTable(aOfAdmInfo);
            tables = $('#table_personnes').DataTable(jInfoDatatableConfig);

        })
        //if call ajax dont work  
        .fail(function (err) {
            //send in to the console the errors code 
            console.log('newAdmin Error:' + err.status);
        })

}






function editInfo() {
    //init var datas and add setting index and token  
    alert("coucou");
    var datas = {
        bJSON: 1,
        page: "adm_info__editInfo",
        label_page : $('#modal-title-content').value() ,  
        content_page:  $('#summernote').value(), 
        iIndiceToPage:  iIndiceEditionToKeep
    }
    //init call ajax 
    $.ajax({
        type: "POST", // method="POST"
        url: "route.php", // action="./php/route.php"
        data: datas,
        async: true, // allows synchronous or asynchronous multiple JS calls to PHP
        dataType: "json", // format expected of return PHP
        cache: false, // stock in to the cache false
    })
        //if the call ajax is ok
        .done(function (result) {
            {
                console.log(result)
                getInfo();
            }
        })
        //if call ajax dont work  
        .fail(function (err,err2,err3) {
            //send in to the console the errors code 
            console.log(err);
            console.log(err2);
            console.log(err3);
        })

}

/**
 * Updates the page name in global var (sPageName)
 * 
 * @param {string} sNewPageName The new page name
 */
function updatePageName(sNewPageName)
{
    sPageName = sNewPageName;
}