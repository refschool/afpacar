

var aExchangeUsersModeration = [];
aExchangeUsersModeration[0] = [];
aExchangeUsersModeration[0]["prenom_emetteur"] = "Ted";
aExchangeUsersModeration[0]["nom_emetteur"] = "Bundy";
aExchangeUsersModeration[0]["prenom_recepteur"] = "Giovanno";
aExchangeUsersModeration[0]["nom_recepteur"] = "Argento";
aExchangeUsersModeration[0]["Date/Heure"] = "12/06/2021 12:23:45";
aExchangeUsersModeration[0]["Objet"] = "Plagiat";
aExchangeUsersModeration[0]["Motif"] = "Bonjour, cet homme à copié mon travail avec moins de classe !";
aExchangeUsersModeration[0]["status_moderation"] = "0";

aExchangeUsersModeration[1] = [];
aExchangeUsersModeration[1]["prenom_emetteur"] = "Bonnie";
aExchangeUsersModeration[1]["nom_emetteur"] = "Parker";
aExchangeUsersModeration[1]["prenom_recepteur"] = "Clide";
aExchangeUsersModeration[1]["nom_recepteur"] = "Barreauw";
aExchangeUsersModeration[1]["Date/Heure"] = "21/16/2021 10:52:21";
aExchangeUsersModeration[1]["Objet"] = "Usurpation d'identité";
aExchangeUsersModeration[1]["Motif"] = "	Bonjour, cet homme se fait passer pour mon Clyde !";
aExchangeUsersModeration[1]["status_moderation"] = "0";

aExchangeUsersModeration[2] = [];
aExchangeUsersModeration[2]["prenom_emetteur"] = "Karl";
aExchangeUsersModeration[2]["nom_emetteur"] = "Marx";
aExchangeUsersModeration[2]["prenom_recepteur"] = "Donald";
aExchangeUsersModeration[2]["nom_recepteur"] = "Trump";
aExchangeUsersModeration[2]["Date/Heure"] = "28/26/2021 14:31:45";
aExchangeUsersModeration[2]["Objet"] = "Capitaliste";
aExchangeUsersModeration[2]["Motif"] = "Bonjour Camarade, mefiez vous de cet homme, il est pro capitaliste !";
aExchangeUsersModeration[2]["status_moderation"] = "0";

aExchangeUsersModeration[3] = [];
aExchangeUsersModeration[3]["prenom_emetteur"] = "Simone";
aExchangeUsersModeration[3]["nom_emetteur"] = "Weil";
aExchangeUsersModeration[3]["prenom_recepteur"] = "Sacha";
aExchangeUsersModeration[3]["nom_recepteur"] = "Guitry";
aExchangeUsersModeration[3]["Date/Heure"] = "28/26/2021 14:31:45";
aExchangeUsersModeration[3]["Objet"] = "Misogyne";
aExchangeUsersModeration[3]["Motif"] = "Bonjour, cet homme à tenu des propos misogyne envers les femmes! C'est un scandale !";
aExchangeUsersModeration[3]["status_moderation"] = "0";




function changeStatusModeration(iIndice) {

	var statut = $('#sel_status_moderation_' + iIndice).val();


	aExchangeUsersModeration[iIndice]["status_moderation"] = statut;

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
	sHTML += "<th scope='col'>Récepteur</th>";
	sHTML += "<th scope='col'>Date/Heure</th>";
	sHTML += "<th scope='col'>Objet</th>";
	sHTML += "<th scope='col'>Motif</th>";
	sHTML += "<th scope='col'>Valider/Refuser</th>";
	sHTML += "</tr>";
	sHTML += "</thead>";
	sHTML += "<tbody>";
	for (var i = 0; i < aExchangeUsersModeration.length; i++) {
		sHTML += "<tr>";
		sHTML += "<td>" + aExchangeUsersModeration[i]["prenom_emetteur"] + " " + aExchangeUsersModeration[i]["nom_emetteur"] + "</td>"
		sHTML += "<td>" + aExchangeUsersModeration[i]["prenom_recepteur"] + " " + aExchangeUsersModeration[i]["nom_recepteur"] + "</td>";
		sHTML += "<td>" + aExchangeUsersModeration[i]["Date/Heure"] + "</td>";
		sHTML += "<td>" + aExchangeUsersModeration[i]["Objet"] + "</td>";
		sHTML += "<td>" + aExchangeUsersModeration[i]["Motif"] + "</td>";
		sHTML += "<td>";
		sHTML += "<select class='input_select input_select_red' id=\"sel_status_moderation_" + i + "\" onChange=\"changeStatusModeration(" + i + ")\">";
		if (aExchangeUsersModeration[i]["status_moderation"] == "0") {
			sHTML += "<option value=\"0\" selected>A modérer</option>";
		} else {
			sHTML += "<option value=\"0\">A modérer</option>";
		}
		if (aExchangeUsersModeration[i]["status_moderation"] == "1") {
			sHTML += "<option value=\"1\" selected>Validé</option>";
		} else {
			sHTML += "<option value=\"1\">Validé</option>";
		}
		if (aExchangeUsersModeration[i]["status_moderation"] == "2") {
			sHTML += "<option value='2' selected>Refusé</option>";
		} else {
			sHTML += "<option value=\"2\">Refusé</option>";
		}
		sHTML += "</select>";
		sHTML += "<textarea id=area" + i + " class='exc_users_hide' rows='5' cols='33' placeholder='Veuillez indiquer le motif du refus :'></textarea>"
		sHTML += "<button id=submitchoice" + i + " class='btn btn_pink exc_users_hide '>Enregistrer</button>"
		sHTML += "</td>"
		sHTML += "</tr>";
	}
	sHTML += "</tbody>";
	$('#tb_exc_users').html(sHTML);
}


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
	constructTable();
	changeStatusModeration();
	// INIT DATATABLE
	tables = $('#tb_rides').DataTable(configuration);

});