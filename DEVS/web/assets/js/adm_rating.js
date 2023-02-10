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


$(document).ready(function () {
	displayRating();
	constructTable();
	changeStatusModeration();
	// INIT DATATABLE
	tables = $('#tb_adm_rating').DataTable(configuration);

});






function displayRating() {
	var datas = {
		bJSON: 1,
		page: "rating__displayRating"
	}

	$.ajax({
		type: "POST", // method="POST"
		url: "route.php", // action="lecture_fichier_retour_json.php"
		async: true, // allows synchronous or asynchronous multiple JS calls to PHP
		data: datas, // past the lsit of variable to send (datas)
		dataType: "json", //  format expected of return PHP
		cache: false, // stock in to the cache false
	})

	.done(function (result) {
		console.log("result", result);
	})

	.fail(function (err) {
		//send in to the console the errors code 
		console.log('Load Error: ' + err.status);
	});
}
function changeStatusModeration(iIndice) {

	var statut = $('#sel_status_moderation_' + iIndice).val();


	aNoticeUsersModeration[iIndice]["status_moderation"] = statut;

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

function constructTable() {
	var sHTML = "<thead>";
	sHTML += "<tr>";
	sHTML += "<th scope='col'>Emetteur</th>";
	sHTML += "<th scope='col'>Concerne</th>";
	sHTML += "<th scope='col'>Date</th>";
	sHTML += "<th scope='col'>Type</th>";
	sHTML += "<th scope='col'>Objet</th>";
	sHTML += "<th scope='col'>Motif</th>";
	sHTML += "<th scope='col'>Valider/Refuser</th>";
	sHTML += "</tr>";
	sHTML += "</thead>";
	sHTML += "<tbody>";
	for (var i = 0; i < aNoticeUsersModeration.length; i++) {
		sHTML += "<tr>";
		sHTML += "<td>" + aNoticeUsersModeration[i]["prenom_emetteur"] + " " + aNoticeUsersModeration[i]["nom_emetteur"] + "</td>"
		sHTML += "<td>" + aNoticeUsersModeration[i]["prenom_concerne"] + " " + aNoticeUsersModeration[i]["nom_concerne"] + "</td>"
		sHTML += "<td>" + aNoticeUsersModeration[i]["Date"] + "</td>";
		sHTML += "<td>" + aNoticeUsersModeration[i]["Type"] + "</td>";
		sHTML += "<td>" + aNoticeUsersModeration[i]["Objet"] + "</td>";
		sHTML += "<td>" + aNoticeUsersModeration[i]["Motif"] + "</td>";
		sHTML += "<td>";
		sHTML += "<select class='input_select input_select_red' id=\"sel_status_moderation_" + i + "\" onChange=\"changeStatusModeration(" + i + ")\">";
		if (aNoticeUsersModeration[i]["status_moderation"] == "0") {
			sHTML += "<option value=\"0\" selected>A modérer</option>";
		} else {
			sHTML += "<option value=\"0\">A modérer</option>";
		}
		if (aNoticeUsersModeration[i]["status_moderation"] == "1") {
			sHTML += "<option value=\"1\" selected>Validé</option>";
		} else {
			sHTML += "<option value=\"1\">Validé</option>";
		}
		if (aNoticeUsersModeration[i]["status_moderation"] == "2") {
			sHTML += "<option value='2' selected>Refusé</option>";
		} else {
			sHTML += "<option value=\"2\">Refusé</option>";
		}
		sHTML += "</select>";
		sHTML += "<textarea id=area" + i + " class='rating_hide' rows='5' cols='33'placeholder='Veuillez indiquer le motif de refus :'></textarea>"
		sHTML += "<button id=submitchoice" + i + " class='btn btn_pink rating_hide '>Enregistrer</button>"
		sHTML += "</td>"
		sHTML += "</tr>";
	}
	sHTML += "</tbody>";
	$('#tb_adm_rating').html(sHTML);
}

