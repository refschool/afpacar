// CONFIGURATION DATATABLE
const jInfoDatatableConfig = {
    "stateSave": false,
    "order": [[3, "asc"]],
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [[10, 25, 50, 100, -1], ["Dix", "Vingt cinq", "Cinquante", "Cent", "Ze total stp"]],
    "language": {
        "info": "Questions _START_ à _END_ sur _TOTAL_ sélectionnées",
        "emptyTable": "Aucune question",
        "lengthMenu": "_MENU_ questions par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "Question 0 à 0 sur 0 sélectionnée",
    },
    "columns": [
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
        ,
        {
            "orderable": false
        }
    ],
    'retrieve': true
};

var iIndiceEditionToKeep;
var tables;
var iPourEditerToKeep;
var iIndiceQuestion;
var iIndiceASupprimer;
var aOfFaq;

$(document).ready(function () {
    getFaq();
});


function constructTable() {
    var sChecked;
    var sHtml = "<thead>";
    sHtml += "<tr>";
    sHtml += "<th>Question</th>";
    sHtml += "<th>Réponse</th>";
    sHtml += "<th>Date de création</th>";
    // sHtml+= "<th>Date de dernière modification</th>";
    // sHtml+= "<th>Auteur</th>";
    sHtml += "<th>Editer</th>";
    sHtml += "<th>Supprimer</th>";
    sHtml += "<th>Désactiver</th>";
    sHtml += "</tr>";
    sHtml += "</thead>";
    sHtml += "<tbody>";

    for (var i = 0; i < aOfFaq.length; i++) {
        sHtml += "<tr id='numero_tr_table" + i + "'>";
        sHtml += "<td class='align-middle size1'>" + aOfFaq[i]["content_question"] + "</td>";
        sHtml += "<td class='align-middle size2'>" + aOfFaq[i]["content_response"] + "</td>";
        sHtml += "<td class='align-middle size3'>" + aOfFaq[i]["datetime_question"] + "</td>";
        // sHtml+="<td class='align-middle'>"+aOfFaq[i].sDerniereModification+"</td>";
        // sHtml+="<td class='align-middle'>"+aOfFaq[i].sAuteur+"</td>";
        sHtml += "<td data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='editFaq(" + i + ")' class='text-center pointer pointer-to-change" + i + " align-middle modal-to-disable'><i class='fas fa-pen fa-2x'></i></td>";
        sHtml += "<td data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='recupIndice(" + i + ")' class='pointer text-center align-middle'><i class='fas fa-trash-alt fa-2x'></td>";
        sChecked = "";
        if (aOfFaq[i]["is_active_question"] == 1) {
            sChecked = " checked";
        }
        sHtml += "<td onclick='recupIndice(" + i + ")' class='pointer text-center align-middle'><label  class='rd_switch switch-value'><input class='test' " + sChecked + " onclick='recupIndice(" + i + "); unableFaqServer(" + i + ")' type='checkbox' id='adm_faq_chk_enable_" + i + "'><span title=\"Ce bouton, une fois activé, permet de rendre visible ici et sur le site côté client. \nUne fois sur désactivé il reste visible côté administrateur (ici) mais n'est plus disponible en ligne (côté utilisateur/client).\" class='rd_slider round'></span></label></td>";
        sHtml += "</tr>";
    }
    
    sHtml += "</tbody>";
    $("#table_faq").html(sHtml);
    if (tables != null) {
        tables.clear();
        tables.destroy();
    }

    for (j = 0; j < aOfFaq.length; j++) {
        if (aOfFaq[j]["is_active_question"] == 0) {
            $row = $("#numero_tr_table" + j + "");
            $cellsToDisable = $row.find(".modal-to-disable")//cible les cellules qui sont censées ouvrir un modal quand on clique dessus

            $row.attr("disabled", true);//cible l'attribut "disabled" ou le crée s'il n'existe pas et lui affecte la valeur !bIsToActivate càd l'inverse de bIsToActivate
            $cellsToDisable.attr("data-bs-toggle", 'modal_disabled');//change la valeur de l'attribut qui a été ciblé pour que le modal ne s'ouvre plus
            $(".pointer-to-change" + j).addClass("forbidden").removeClass('pointer');//ici on cible les éléments qui ont la classe
        }
    }

    tables = $('#table_faq').DataTable(jInfoDatatableConfig);
}

function editFaq(iPourEditer) {
    //on a besoin d'attribuer la valeur iPourEditer à une autre variable (ici iPourEditerToKeep) car on ne pourra pas réutiliser iPourEditer en tant que paramètre dans une autre fonction sans ça. iPourEditerToKeep ne sert à rien ici mais il servira dans d'autres fonctions et aura donc la même valeur que le paramètre iPoutEditer. 
    iPourEditerToKeep = iPourEditer;
    

    $(".conteneur-editer").show(); //affiche les boutons dont on a besoin pour cette fonction
    $(".conteneur-ajouter").hide();//sert juste à cacher les boutons dont on a pas besoin pour cette fonction 
    $(".conteneur-supprimer").hide();
    $(".question-summernote").value(aOfFaq[iPourEditer]["content_question"]); // puisqu'on a mis une valeur dans le paramètre, l'élément ".question-summernote" prend la valeur du paramètre.
    $(".reponse-summernote").value(aOfFaq[iPourEditer]["content_response"]);//donc ici ".reponse-summernote" prend la valeur de "aOfFaq[iPourEditer].sAnswer".
    iIndiceQuestion=aOfFaq[iPourEditer]["id_question"];//on affecte à la variable iIndiceQuestion l'id de la base de données
    // console.log(iIndiceQuestion)
}

function recupIndice(iIndiceEdition) {
    iIndiceEditionToKeep = iIndiceEdition;
    $(".conteneur-ajouter").hide();
    $(".conteneur-editer").hide();
    $(".conteneur-supprimer").show();
    // console.log(iIndiceEditionToKeep);
    iIndiceASupprimer=aOfFaq[iIndiceEditionToKeep]["id_question"];//on affecte à la variable iIndiceASupprimer l'id de la base de données
}


function controleSaisieAjout()
{
    var bValid = 1;//à la fin, si bValid vaut 1, on appelle la fonction ajouter et on ferme le modal.
    var bQuestion =0;//idem
    var bReponse = 0;//idem

    if (!isAjoutQuestionValid()) //si la fonction renvoie "false",
    {
        $(".controle-question").show();//tu m'affiches le message d'erreur
        bValid=0;//bValid prend 0 pour empêcher de lancer la fonction ajouter
    }
    else//si la fonction renvoie "true"
    {
        $(".controle-question").hide();//cache le message d'erreur
        bQuestion=1;//permet de lancer la fonction ajouter et de fermer le modal.
    }
    if(!isAjoutReponseValid())
    {
        $(".controle-reponse").show();
        bValid=0;
    }
    else
    {
        $(".controle-reponse").hide();
        bReponse=1
    }
    
    if(bValid==1 && bReponse==1 && bQuestion==1)//si les conditions sont remplies, on lance la fonction ajouter et on cache le modal
    {
        $('#exampleModal').modal('hide');
        addFaqServer()
    }
}

function hideAlertSaisie()
{
    $(".controle-reponse").hide();
    $(".controle-question").hide();
}

/**
 * cette fonction est un contrôle de saisie qui empêche le user d'éditer si les champs sont vides
 * @param {number} iIndiceQuestion on attend un integer
 * @returns 
 */
function controleSaisieEdit() 
{
    var bValid = 1;
    var bQuestion =0;
    var bReponse = 0;
    if (!isQuestionValid()) 
    {
        $(".controle-question").show();
        bValid=0;
    }
    else
    {
        $(".controle-question").hide();
        bQuestion=1;
    }
    if(!isResponseValid())
    {
        $(".controle-reponse").show();
        bValid=0;
    }
    else
    {
        $(".controle-reponse").hide();
        bReponse=1
    }
    
    if(bValid==1 && bReponse==1 && bQuestion==1)
    {
        $('#exampleModal').modal('hide');
        editValidateFaqServer(iIndiceQuestion)
    }
}
/**
 * returns if question field is valid
 * @returns {boolean}
 */
function isQuestionValid()
{
    if ( $(".question-summernote").value()=="") 
    {
        return false
    }
    
    return true
    
}

/**
 * returns if response field is valid
 * @returns {boolean}
 */
function isResponseValid()
{
    if($(".reponse-summernote").value()=="")
    {
        return false
    }
    
    return true
    
}

/**
 * returns if question field is valid
 * @returns {boolean}
 */
function isAjoutQuestionValid()
{
    if ( $(".ajout-question").value()=="") 
    {
        return false
    }
    
    return true
}

/**
 * returns if response field is valid
 * @returns {boolean}
 */
function isAjoutReponseValid()
{
    if ( $(".ajout-reponse").value()=="") 
    {
        return false
    }
    
    return true
}

function editFaqValidate() {
    // ici on récupère la valeur de l'élément ".question-summernote" ou ".reponse-summernote" et on la remet dans le tableau à l'indice "iPourEditerToKeep". Le tableau est ainsi modifié.
    aOfFaq[iPourEditerToKeep]["content_question"] = $(".question-summernote").value();
    aOfFaq[iPourEditerToKeep]["content_response"] = $(".reponse-summernote").value();

    // on rappelle la fonction qui construit le tableau, elle prend en compte les modifications saisies précédemment dans la fonction.
    // console.log(iPourEditerToKeep);
    // controleSaisieEdit();
    // constructTable();
}

function deleteFaq() {
    // .splice permet de supprimer un indice du tableau et de le redimensionne automatiquement. On lui indique l'indice à supprimer et le nombre d'indices à supprimer/
    aOfFaq.splice(iIndiceEditionToKeep, 1);
}

function addFaq() {

    $(".conteneur-ajouter").show();
    $(".conteneur-editer").hide();
    $(".conteneur-supprimer").hide();
    $(".ajout-question").value("");
    $(".ajout-reponse").value("");
}

function Date_time() {
    var d = new Date();
    var date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var fullDate = date + ' ' + hours;
    // console.log(fullDate);
    return fullDate;
}

function addFaqValidate(id_faq_created) {
    var iAddNew = aOfFaq.length;
    aOfFaq[iAddNew] = [];
    aOfFaq[iAddNew]["content_question"] = $(".ajout-question").val();
    aOfFaq[iAddNew]["content_response"] = $(".ajout-reponse").val();
    aOfFaq[iAddNew]["datetime_question"] = Date_time();
    aOfFaq[iAddNew]["is_active_question"] = 1;
    aOfFaq[iAddNew]["id_question"] = id_faq_created;
    // console.log(aOfFaq);
}

function unableFaq() 
{
    let bIsToActivate = $('#adm_faq_chk_enable_' + iIndiceEditionToKeep).prop("checked");
    if (bIsToActivate) {
        aOfFaq[iIndiceEditionToKeep]["is_active_question"] = 1;
    }
    else {
        aOfFaq[iIndiceEditionToKeep]["is_active_question"] = 0;
    }
    $row = $("#numero_tr_table" + iIndiceEditionToKeep + "");
    $cellsToDisable = $row.find(".modal-to-disable")//cible les cellules qui sont censées ouvrir un modal quand on clique dessus

    $row.attr("disabled", !bIsToActivate);//cible l'attribut "disabled" ou le crée s'il n'existe pas et lui affecte la valeur !bIsToActivate càd l'inverse de bIsToActivate
    if (!bIsToActivate) {
        $cellsToDisable.attr("data-bs-toggle", 'modal_disabled');//change la valeur de l'attribut qui a été ciblé pour que le modal ne s'ouvre plus
        $(".pointer-to-change" + iIndiceEditionToKeep).addClass("forbidden").removeClass('pointer');//ici on cible les éléments qui ont la classe
    }
    else {
        $cellsToDisable.attr("data-bs-toggle", 'modal');//change la valeur de l'attribut qui a été ciblé pour que le modal ne s'ouvre plus
        $(".pointer-to-change" + iIndiceEditionToKeep).addClass("pointer").removeClass('forbidden');
    }

}

function getFaq() 
{
    //init var datas and add setting index and token  
    var datas = {
        bJSON: 1,
        page: "adm_faq__getfaq"
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
        // console.log(result);
        aOfFaq = result;
        constructTable();
    })
    //if call ajax dont work  
    .fail(function (err) {
        //send in to the console the errors code 
        console.log('newAdmin Error:' + err.status);
    })
}

function deleteFaqServer(iIndiceASupprimer) {
    //init var datas and add setting index and token  
    var datas = {
        bJSON: 1,
        page: "adm_faq__deleteFaq",
        iIndiceASupprimer:iIndiceASupprimer
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
        deleteFaq();
        constructTable(aOfFaq);
    })
    //if call ajax dont work  
    .fail(function (err) {
        console.log(err);
        //send in to the console the errors code 
        console.log('newAdmin Error:' + err.status);
    })
}

function editValidateFaqServer(iIndiceQuestion) {

    //init var datas and add setting index and token  
    var datas = {
        bJSON: 1,
        page: "adm_faq__editFaq",
        question_summernote: $(".question-summernote").val(),
        reponse_summernote : $(".reponse-summernote").val(),
        iIndiceQuestion:iIndiceQuestion
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
        // if (result.error != null && result.error == ""){
            // }
            console.log(result);
            editFaqValidate();
            constructTable(aOfFaq);
            // getFaq()
    })
    //if call ajax dont work  
    .fail(function (err) {
        //send in to the console the errors code 
        console.log('newAdmin Error:' + err.status);
    })
}

function addFaqServer() {

    //init var datas and add setting index and token  
    var datas = {
        bJSON: 1,
        page: "adm_faq__addFaq",
        question_summernote: $(".ajout-question").value(),
        reponse_summernote : $(".ajout-reponse").value(),
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
        // if (result.error != null && result.error == ""){
            // }
        // console.log("id_faq_created = " + result["id_faq_created"]);
        addFaqValidate(result["id_faq_created"]);
        constructTable(aOfFaq);

    })
    //if call ajax dont work  
    .fail(function (err) {
        //send in to the console the errors code 
        console.log('newAdmin Error:' + err.status);
    })
}

function unableFaqServer(iIndiceToUnable) {

    //init var datas and add setting index and token  
    var datas = {
        bJSON: 1,
        page: "adm_faq__unableFaq",
        iIndiceToUnable:aOfFaq[iIndiceToUnable]["id_question"]
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
        // if (result.error != null && result.error == ""){
            // }
        unableFaq();
        constructTable(aOfFaq);

    })
    //if call ajax dont work  
    .fail(function (err) {
        //send in to the console the errors code 
        console.log('newAdmin Error:' + err.status);
    })
}