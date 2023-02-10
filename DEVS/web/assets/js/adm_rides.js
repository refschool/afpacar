// CONFIGURATION DATATABLE
const configuration = {
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

var tables;
var aModeration=[];
var statut; 
$(document).ready(function () {
	adm_moderation()

	
	// INIT DATATABLE
	tables = $('#tb_rides').DataTable(configuration);

});


function changeStatusModeration(iIndice) {

	 statut = $('#sel_status_moderation_' + iIndice).val();


	

	if (statut == "1") {

		$("#area" + iIndice).hide();

	}

	else if (statut == "2") {
		$("#area" + iIndice).show();


	}

	if (statut != "0") {
		$("#submitchoice" + iIndice).show();


	}

	else {
		$("#submitchoice" + iIndice).hide();
		$("#area" + iIndice).hide();
	}
}

//construction du datatable
function constructTable() 
{
	
	var sHTML = "<thead>";
	sHTML += "<tr>";
	sHTML += "<th scope='col'>Emetteur</th>";
	sHTML += "<th scope='col'>Date</th>";
	sHTML += "<th scope='col'>Message</th>";
	sHTML += "<th scope='col'>Valider/Refuser</th>";
	sHTML += "</tr>";
	sHTML += "</thead>";
	sHTML += "<tbody>";
	for (var i = 0; i < aModeration.length; i++) {
		sHTML += "<tr>";
		sHTML += "<td>" + aModeration[i]["firstname_user"] + " " + aModeration[i]["name_user"] + "</td>"
		sHTML += "<td>" + aModeration[i]["datetime_creation_ad"] + "</td>";
        sHTML += "<td>" + aModeration[i]["content_ad"] + "</td>";
		sHTML += "<td>";
		sHTML += "<select class='input_select input_select_red' id=\"sel_status_moderation_" + i + "\" onChange=\"changeStatusModeration(" + i + ")\">";
		if (aModeration[i]["status_report_ad"] == "0") {
			sHTML += "<option value=\"0\" selected>A modérer</option>";
		} else {
			sHTML += "<option value=\"0\">A modérer</option>";
		}
		if (aModeration[i]["status_report_ad"] == "1") {
			sHTML += "<option value=\"1\" selected>Validé</option>";
		} else {
			sHTML += "<option value=\"1\">Validé</option>";
		}
		if (aModeration[i]["status_report_ad"] == "2") {
			sHTML += "<option value='2' selected>Refusé</option>";
		} else {
			sHTML += "<option value=\"2\">Refusé</option>";
		}
		sHTML += "</select>";
		sHTML += "<textarea id=area" + i + " class='rides_hide' rows='5' cols='33'></textarea>"
		sHTML += "<button onClick=\"adm_moderator(" + i + ")\"  id=submitchoice" + i + " class='btn btn_pink rides_hide '>Enregistrer</button>"
		sHTML += "</td>"
		sHTML += "</tr>";
	}
	sHTML += "</tbody>";
	$('#tb_rides').html(sHTML);
}

//requetes Ajax
/**
 * function call ajax for delet element in to the json and datatable
 * @param { Integer } index 
 * @returns err
*/
function adm_moderation() {


	//init var datas and add setting index and token  
	var datas = {
		bJSON: 1,
		page: "adm_rides__adm_moderation"
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
			console.log(result);
			aModeration= result;
			constructTable();
		})
		//if call ajax dont work  
		.fail(function (err) {
			//send in to the console the errors code 
			console.log('newAdmin Error:' + err.status);
		})
}

// 1/ Creation de la requete Ajax dans adm_infos.js 
// 2/ L'appel AJAX est envoyé au php  "adm_rides__adm_moderation" que nous venons de creer, avec les datas si il en a.
// 3/ Dans adm_info nous allons traiter l'appel AJAX pour l'envoyer de la couche métier à la couche service.
// 4/ La couche service va nous renvoyer le flux Json à notre vue. Et celle-ci l'a renvoie à notre appel AJAX (.done(function (result))
// 5/ Création du doc en .sql avec la requête nécessaire.

/**
 * function call ajax for delet element in to the json and datatable
 * @param { Integer } index 
 * @returns err
*/
function adm_moderator(iIndice) {

	//init var datas and add setting index and token  
	var datas = {
		bJSON: 1,
		page: "adm_rides__adm_moderator",
		id_ad: aModeration[iIndice]["id_ad"],
		status_report_ad:$('#sel_status_moderation_'+ iIndice).val(),
		subject_report_ad:$('#area'+ iIndice).val()

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
			console.log(result)
			changeStatusModeration(iIndice);
			$("#submitchoice" + iIndice).hide();
			$("#area" + iIndice).hide();
		})
		//if call ajax dont work  
		.fail(function (err) {
			//send in to the console the errors code 
			console.log('newAdmin Error:' + err.status);
		})
}
