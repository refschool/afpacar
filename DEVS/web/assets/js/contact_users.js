var aOfCoordonnees=[
    {
        sAdress : "12 rue Jean Mermoz",
        sAdditionalAdress:"",
        sPostalCode: "34430",
        sCity: "Saint-Jean-de-Védas",
        sCountry: "France",
        sPhoneNumber: "09.72.72.39.36"
    }
]

var aOfContactAfpa=[
    {
        sName:"Pignon",
        sFirstName:"Eddy",
        sPhoneNumber:"06.06.06.05.04"
    },
    {
        sName:"Patulacci",
        sFirstName:"Robert",
        sPhoneNumber:"06.07.09.05.04"
    }
]

var aOfHoraires=[
    {
        sMonday:"08:00-12:30, 13:30-16",
        sTuesday:"08:00-12:30, 13:30-16",
        sWednesday:"08:00-12:30, 13:30-16",
        sThursday:"08:00-12:30, 13:30-16",
        sFriday:"08:00-12:30"
    }
]

$(document).ready
(function()
    {
    $(".adresse").html(aOfCoordonnees[0].sAdress);
    $(".adresse-complement").html(aOfCoordonnees[0].sAdditionalAdress);
    $(".code-postal").html(aOfCoordonnees[0].sPostalCode);
    $(".ville").html(aOfCoordonnees[0].sCity);
    $(".pays").html(aOfCoordonnees[0].sCountry);
    $(".téléphone").html(aOfCoordonnees[0].sPhoneNumber);
    $(".contact-afpa").html(aOfContactAfpa[0].sName+" "+aOfContactAfpa[0].sFirstName);
    $(".num-contact-afpa").html(aOfContactAfpa[0].sPhoneNumber);
    $(".contact-afpa2").html(aOfContactAfpa[1].sName+" "+aOfContactAfpa[1].sFirstName);
    $(".num-contact-afpa2").html(aOfContactAfpa[1].sPhoneNumber);
    $(".horaires-semaine").html(aOfHoraires[0].sMonday);
    $(".horaires-vendredi").html(aOfHoraires[0].sFriday);

    if(aOfCoordonnees[0].sAdditionalAdress=="")
    {
        $(".to-hide").hide();
    }
    }

)

function controleDeSaisie()
{
    inputNom=document.getElementById("cont_inputNom").value;
    inputPrenom=document.getElementById("cont_inputPrenom").value;
    inputEmail=document.getElementById("cont_inputEmail").value;
    inputMessage=document.getElementById("cont_inputMessage").value;

    if (inputNom=="") 
    {
        document.getElementById("texteNom").style.display= "block";
    }
    else
    {
        document.getElementById("texteNom").style.display= "none";
    }

    if(inputPrenom=="")
    {
        document.getElementById("textePrenom").style.display= "block";
    }
    else
    {
        document.getElementById("textePrenom").style.display= "none";
    }

    if(inputEmail=="")
    {
        document.getElementById("texteEmail").style.display= "block";
    }
    else
    {
        document.getElementById("texteEmail").style.display= "none";
    }

    if(inputMessage=="")
    {
        document.getElementById("texteMessage").style.display= "block";
    }
    else
    {
        document.getElementById("texteMessage").style.display= "none";
    }
}

function sendMail()
{
    var datas={
        bJSON:1,
        page:"contact_users__mailing",
        champ_nom:$("#cont_inputNom").val(),
        champ_prenom:$("#cont_inputPrenom").val(),
        champ_mail:$("#cont_inputEmail").val(),
        champ_message:$("#cont_inputMessage").val(),
    }

    $.ajax({
        type: "POST", // method="POST"
        url: "route.php", // action="./php/route.php"
        data: datas,
        async: true, // allows synchronous or asynchronous multiple JS calls to PHP
        dataType: "json", // format expected of return PHP
        cache: false, // stock in to the cache false
    })

    .done(function(result){
        console.log(result["nb_errors"]);
        if(result["nb_errors"]==1)
        {
            document.getElementById("texteNom").style.display= "block";
        }

        if(result["nb_errors"]==2)
        {
            document.getElementById("textePrenom").style.display= "block";
        }

        if(result["nb_errors"]==3)
        {
            document.getElementById("texteEmail").style.display= "block";
        }

        if(result["nb_errors"]==4)
        {
            document.getElementById("texteMessage").style.display= "block";
        }

        if(result["nb_errors"]==0)
        {
            $("#email-envoye").css({"background-color":"#D4EDDA", "padding":"16px", "border-radius": "10px", "width":"100%","color":"#155724"})
            $("#email-envoye").html('Votre message a été envoyé avec succès.')
        }
    })

    .fail(function(err){
        console.log('Erreur back '+err.status);
    })
}