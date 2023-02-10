
$(function() {
    console.log('header_nc : JS chargé');
})

var aOfPersonnes = [];
aOfPersonnes[0] = [];
aOfPersonnes[0]["benef"] = "12";
aOfPersonnes[0]["nom"] = "Ivre";
aOfPersonnes[0]["prenom"] = "Yves";

aOfPersonnes[1] = [];
aOfPersonnes[1]["benef"] = "187";
aOfPersonnes[1]["nom"] = "Tablo";
aOfPersonnes[1]["prenom"] = "Pablo";

aOfPersonnes[2] = [];
aOfPersonnes[2]["benef"] = "145";
aOfPersonnes[2]["nom"] = "Matin";
aOfPersonnes[2]["prenom"] = "Martin";


/* Si le code bénef est ok, affiche les inputs nom/prénom en disable et le mot de passe */
function reg_code_benef() {
    var benef_user, cond_ok;

    benef_user = $("#reg_inp_benef").val();

    for (i = 0; i < aOfPersonnes.length; i++) {
        if (benef_user === aOfPersonnes[i]["benef"]) {
            $('#reg_modal').modal('show');
            $("#reg_benef_invalid").hide();
            $("#reg_benef_ok").show();
            $('#reg_inp_prenom').val(aOfPersonnes[i]["prenom"]);
            $('#reg_inp_prenom').prop('disabled', true);
            $('#reg_inp_nom').val(aOfPersonnes[i]["nom"]);
            $('#reg_inp_nom').prop('disabled', true);

            cond_ok = true;
        }
        else {
            $("#reg_benef_invalid").show();
            $('#reg_modal').modal('hide');
        }

    }
    if (cond_ok == true) {
        $("#reg_modal_forget_pw").hide();
        $('#reg_modal_inscript').show();

    }
}

/* Affiche l'interface d'inscription et efface les données de connexion */
function reg_show_insc() {
    $("#reg_sec_inscription").show();
    $("#reg_sec_connexion").hide();
    $('#reg_inp_mail').val("");
    $('#reg_inp_pw').val("");

}
/* Afficher modal mot de passe oublié */
function reg_show_fgt_pwd() {
    $("#reg_modal_forget_pw").show();
    $('#reg_modal_inscript').hide();
}

/*Affiche l'interface de connexion et efface les données des inputs d'inscription*/

function reg_show_connexion() {
    $("#reg_sec_inscription").hide();
    $("#reg_benef_ok").hide();
    $('#nom').val("");
    $('#prenom').val("");
    $('#reg_inp_benef').val("");
    $("#reg_sec_connexion").show();
    $("#reg_benef_invalid").hide();
}

/* Afficher/cacher mot de passe*/

function Showpass() {
    if ($('.ShowPass').hasClass("fa-eye-slash")) {
        $('.ShowPass').removeClass("fa-eye-slash").addClass("fa-eye")
        $("[name='password']").attr("type", "text");
    } else {
        $('.ShowPass').removeClass("fa-eye").addClass("fa-eye-slash")
        $("[name='password']").attr("type", "password");
    }
}
