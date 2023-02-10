// // ******
// // Je crée mon tableau à plusieurs dimensions
// // ******


// // aOfNotifications[0] = [];
// // aOfNotifications[0]["type"] = "message(s)";
// // aOfNotifications[0]["contenu"] = "Bonjour, je voudrais aller à  l'Afpa mais je tiens à préciser que je ne roule que dans des voitures de 198 chevaux. Si c\'est une berline allemande c\'est encore mieux.<br>Cordialement, Léopoldine.Bonjour, je voudrais aller à  l'Afpa mais je tiens à préciser que je ne roule que dans des voitures de 198 chevaux. Si c\'est une berline allemande c\'est encore mieux.<br>Cordialement, Léopoldine.Bonjour, je voudrais aller à  l'Afpa mais je tiens à préciser que je ne roule que dans des voitures de 198 chevaux. Si c\'est une berline allemande c\'est encore mieux.<br>Cordialement, Léopoldine.Bonjour, je voudrais aller à  l'Afpa mais je tiens à préciser que je ne roule que dans des voitures de 198 chevaux. Si c\'est une berline allemande c\'est encore mieux.<br>Cordialement, Léopoldine.Bonjour, je voudrais aller à  l'Afpa mais je tiens à préciser que je ne roule que dans des voitures de 198 chevaux. Si c\'est une berline allemande c\'est encore mieux.<br>Cordialement, Léopoldine.Bonjour, je voudrais aller à  l'Afpa mais je tiens à préciser que je ne roule que dans des voitures de 198 chevaux. Si c\'est une berline allemande c\'est encore mieux.<br>Cordialement, Léopoldine.Bonjour, je voudrais aller à  l'Afpa mais je tiens à préciser que je ne roule que dans des voitures de 198 chevaux. Si c\'est une berline allemande c\'est encore mieux.<br>Cordialement, Léopoldine.";
// // aOfNotifications[0]["etat"] = 0;

// // aOfNotifications[1] = [];
// // aOfNotifications[1]["type"] = "avis";
// // aOfNotifications[1]["contenu"] = "Un conducteur exceptionnel. Une playlist de malade. Mais hélas il portait des crocs.";
// // aOfNotifications[1]["etat"] = 0;

// // aOfNotifications[2] = [];
// // aOfNotifications[2]["type"] = "avis";
// // aOfNotifications[2]["contenu"] = "Cet homme vous mettra très bien.";
// // aOfNotifications[2]["etat"] = 0;

// // aOfNotifications[3] = [];
// // aOfNotifications[3]["type"] = "note(s)";
// // aOfNotifications[3]["contenu"] = "5/5";
// // aOfNotifications[3]["etat"] = 0;

// // aOfNotifications[4] = [];
// // aOfNotifications[4]["type"] = "message(s)";
// // aOfNotifications[4]["contenu"] = "Bonjour.";
// // aOfNotifications[4]["etat"] = 0;

// // aOfNotifications[5] = [];
// // aOfNotifications[5]["type"] = "message(s)";
// // aOfNotifications[5]["contenu"] = "Comment vas-tu ?";
// // aOfNotifications[5]["etat"] = 0;

// let iNombreMessages=0;
// let iNombreNotes=0;
// let iNombreAvis=0;

var aOfNotifications;

// cette partie permet de mettre le nombre de notifications dans le badge de la cloche dès que la page se lance
$(document).ready
(function()
    {
        getNotificationsServer();
        $(".notif_numero_total").html(iTotalNotifications);
        showNotifications();
    }
)

/******************************************************************************************************************************************************
 * HERE WE START THE AJAX FUNCTIONS
*****************************************************************************************************************************************************/

function getNotificationsServer()
{
      //init var datas and add setting index and token  
      var datas = {
        bJSON: 1,
        page: "notifications_user__getNotifications"
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
        // console.log("message");
        // console.log(result["message"]);
        
        // console.log("trajet");
        // console.log(result["trajet_ad"]);

        // console.log("opinion");
        // console.log(result["opinion"]);

        aOfNotifications = result;

        iTotalNotifications = aOfNotifications["opinion"].length + aOfNotifications["message"].length + aOfNotifications["trajet_ad"].length;


    })
    //if call ajax dont work  
    .fail(function (err) {
        //send in to the console the errors code 
        console.log('newAdmin Error:' + err.status);
    })
}

function updateNotificationsServer()
{
      //init var datas and add setting index and token  
      var datas = {
        bJSON: 1,
        page: "notifications_user__updateNotifications"
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
        // console.log("message");
        // console.log(result["message"]);
        
        // console.log("trajet");
        // console.log(result["trajet_ad"]);

        // console.log("opinion");
        // console.log(result["opinion"]);

        aOfNotifications = result;

        iTotalNotifications = aOfNotifications["opinion"].length + aOfNotifications["message"].length + aOfNotifications["trajet_ad"].length;

        $(".notif_numero_total").html(iTotalNotifications);

        showNotifications();
    })
    //if call ajax dont work  
    .fail(function (err) {
        //send in to the console the errors code 
        console.log('newAdmin Error:' + err.status);
    })
}

/******************************************************************************************************************************************************
 *                                                  HERE WE DO THE FRONT
*****************************************************************************************************************************************************/

function showNotifications()
{
    if(aOfNotifications["message"].length==0)
    {
        $(".notif_nombre_messages").hide();
    }
    else
    {
        $(".notif_nombre_messages").html(aOfNotifications["message"].length);
    }

    if(aOfNotifications["trajet_ad"].length==0)
    {
        $(".notif_nombre_trajets").hide();
    }
    else
    {
        $(".notif_nombre_trajets").html(aOfNotifications["trajet_ad"].length);
    }

    if(aOfNotifications["opinion"].length==0)
    {
        $(".notif_nombre_avis").hide();
    }
    else
    {
        $(".notif_nombre_avis").html(aOfNotifications["opinion"].length);
    }
}




















// // ******
// // Fonction qui permet de déterminer le type de notifications et leur nombre.
// // ******

// function notif_nombreType()
// { 
//     for(let i=0; i<aOfNotifications.length; i++)
//     {
//         if(aOfNotifications[i]["type"]=="message(s)"&& aOfNotifications[i]["etat"]==0)
//         {
//             iNombreMessages+=1;
//         }

//         if(aOfNotifications[i]["type"]=="note(s)"&& aOfNotifications[i]["etat"]==0)
//         {
//             iNombreNotes+=1;
//         }

//         if(aOfNotifications[i]["type"]=="avis"&& aOfNotifications[i]["etat"]==0)
//         {
//             iNombreAvis+=1;
//         }
//     }
//     // console.log("Nombre de notes : " + iNombreNotes);
//     // console.log("Nombre d'avis : " + iNombreAvis);
//     // console.log("Nombre de messages : " + iNombreMessages);
// }

// // ******
// // Fonction qui permet d'afficher le contenu des indices du tableau dans le modal.
// // ******

// let sIncrement=0;
// function notif_check_array()
// {
//     let sMessage="";     
//     // console.log(aOfNotifications.length);

//     // ******
//     // Cette partie supprime tous les éléments inutiles une fois que toutes les notifications ont été delete.
//     // ******

//     if (aOfNotifications.length==0)
//     {
//         $("#notif_contenu").html("Vous n'avez plus aucune notification non lue.");
//         $(".not_fas").hide();
//         $(".not_nombre-notifs").hide();
//         $(".not_non-lu").hide();
//         $("#not_bouton_fermer").hide();
//         $(".not_btn-liens").hide();
//         $(".not_nombre_messages").hide();
//         $(".not_nombre-notes").hide();
//         $(".not_nombre-avis").hide();
//         $(".notif_numero_total").hide();
//         $(".not_type_selection").removeClass("active");
//     }

//     // ******
//     // sIncrement sera l'indice du tableau à afficher. Il vaut 0 au début de la fonction. La fonction parcourt le tableau dans la boucle for puis sMessage prend le contenu de l'indice sIncrement. sIncrement change constamment à cause des autres fonctions qui permettent de "supprimer" une notif déjà lue ou de naviguer entre les notifs.
//     // ****** 

//     // ******
//     // ce "else if" affiche les contenus du tableau tant que sIncrement vaut moins que la longueur du tableau et plus que -1. 
//     // ****** 
//     else if (sIncrement<inombre && sIncrement>-1)
//     {
//         var icompteur;
//         for(let i=0; i<aOfNotifications["trajet_ad"].length; i++)
//         {
            
//             if(aOfNotifications["trajet_ad"][i]["isNotif"]==1 )
//             {
//                 // fait appel à la fonction détaillée plus bas
                
//                 icompteur++;
//             }
//         }
//         for(let i=0; i<aOfNotifications["message"].length; i++)
//         {
            
//             if(aOfNotifications["message"][i]["isNotif"]==1 )
//             {
//                 // fait appel à la fonction détaillée plus bas
                
//                 icompteur++;
//             }
//         }
//         for(let i=0; i<aOfNotifications["opinion"].length; i++)
//         {
            
//             if(aOfNotifications["opinion"][i]["isNotif"]==1 )
//             {
//                 // fait appel à la fonction détaillée plus bas
                
//                 icompteur++;
//             }
//         }

//         if(icompteur==inombre)
//         {
//             notif_afficheContenu();
//         }


//     // notif_numero_en cours est un span pour afficher le numéro de la notification vue par l'utilisateur
//         $("#notif_numero_encours").html(sIncrement+1);
//     // notif_numero_total est un span pour afficher le nombre total de notifications de l'utilisateur (en gros la longueur du tableau)
//         $(".notif_numero_total").html(aOfNotifications.length);
//         $(".not_nombre_messages").html(iNombreMessages);
//         $(".not_nombre-notes").html(iNombreNotes);
//         $(".not_nombre-avis").html(iNombreAvis);
//     }
    
//     // si l'utilisateur a cliqué sur la flèche de droite pour passer à la notification suivante et qu'il a atteint la dernière notification, il peut cliquer encore à droite pour revenir à la première notification. Dans ce cas, sIncremet a dépassé la longueur du tableau. Cette partie de la fonction permet de la remettre à 0 et de relancer l'affichage à partir de la première notif.
//     else if (sIncrement>=aOfNotifications.length)
//     {
//         sIncrement=0;
//         for(let i=0; i<aOfNotifications.length; i++)
//         {
            
//             if(aOfNotifications[sIncrement]["etat"]==0)
//             {
//                 // fait appel à la fonction détaillée plus bas
//                 notif_afficheContenu()
//             }
//         }
//         $("#notif_numero_encours").html(sIncrement+1);
//         $(".notif_numero_total").html(aOfNotifications.length);
//         $(".not_nombre_messages").html(iNombreMessages);
//         $(".not_nombre-notes").html(iNombreNotes);
//         $(".not_nombre-avis").html(iNombreAvis);
//     }

//     // si l'utilisateur a cliqué sur la flèche de gauche pour passer à la notification précédente et qu'il a atteint la première notification, il peut cliquer encore à gauche pour revenir à la dernière notification. Dans ce cas, sIncremet est devenu inférieur à 0. Cette partie de la fonction permet de lui donner la valeur de la longueur du tableau pour relancer l'affichage à partir de la dernière notif.
//     else if (sIncrement<0)
//     {
//         sIncrement=aOfNotifications.length-1;
//         for(let i=0; i<aOfNotifications.length; i++)
//         {
            
//             if(aOfNotifications[sIncrement]["etat"]==0)
//             {
//                 // fait appel à la fonction détaillée plus bas
//                 notif_afficheContenu()
//             }
//         }
//         $("#notif_numero_encours").html(sIncrement+1);
//         $(".notif_numero_total").html(aOfNotifications.length);
//         $(".not_nombre_messages").html(iNombreMessages);
//         $(".not_nombre-notes").html(iNombreNotes);
//         $(".not_nombre-avis").html(iNombreAvis);
//     }

//     //ici on remet le nombre de notifications selon leur type à 0 sinon elles s'aditionnent à cause du i++ dans la fonction "notif_nombreType()""
//     iNombreMessages=0;
//     iNombreNotes=0;
//     iNombreAvis=0;

//     // console.log(aOfNotifications);
// }

// // cette fonction permet d'augmenter sIncrement de 1 pour pouvoir afficher l'indice suivant du tableau en cliquant sur la flèche de droite
// function notif_next()
// {
//     sIncrement+=1;
//     notif_nombreType()
//     notif_check_array()
// }

// // cette fonction permet de diminuer sIncrement de 1 pour pouvoir afficher l'indice suivant du tableau en cliquant sur la flèche de gauche
// function notif_previous()
// {
//     sIncrement-=1;
//     notif_nombreType()
//     notif_check_array()
// }

// // cette fonction permet de supprimer l'indice vu par l'utilisateur en cliquant sur l'icône poubelle (ou oeil)
// function notif_deleteNotification()
// {
//     aOfNotifications.splice(sIncrement,1);
//     notif_nombreType()
//     notif_check_array()
//     console.log(aOfNotifications.length);
// }

// // ********************************************************************
// // Cette partie est le corps de la fonction, appelée 3 fois dans la fonction "notif_check_array()". Elle permet également d'appliquer le rectangle rose qui indique quel type de contenu est en cours sur la page.
// // ********************************************************************

// function notif_afficheContenu()
// {
//     alert("ok");
//     // ici on met le contenu du tableau dans la variable sMessage, puis on affiche cette variable dans le span "#notif_contenu".
//     sMessage=aOfNotifications["trajet_ad"][sIncrement]["name_user"]+ " " +aOfNotifications["trajet_ad"][sIncrement]["firstname_user"]+ " a réservé votre trajet du " + aOfNotifications["trajet_ad"][sIncrement]["date_start_ad"] +"." + "<br>";

//     sAvis= aOfNotifications["opinion"][sIncrement]["contet_message"]
//     console.log("incremente"+sIncrement);
//     $("#notif_contenu").html("<br>" + sMessage);

//     // tous ces if servent à afficher le type des notifications et leur nombre.                    
//     if(aOfNotifications[sIncrement]["type"]=="message(s)")
//     {
//         // $(".not_nombre-type-notifs").html(iNombreMessages);
//         // $(".not_type-notifs").html(aOfNotifications[sIncrement]["type"]+ " non lu(s)");
//         changeClass("not_messages");
//     }

//     if(aOfNotifications[sIncrement]["type"]=="note(s)")
//     {
//         // $(".not_nombre-type-notifs").html(iNombreNotes);
//         // $(".not_type-notifs").html(aOfNotifications[sIncrement]["type"]+ " non lue(s)");
//         changeClass("not_notes");
//     }

//     if(aOfNotifications[sIncrement]["type"]=="avis")
//     {
//         // $(".not_nombre-type-notifs").html(iNombreAvis);
//         // $(".not_type-notifs").html(aOfNotifications[sIncrement]["type"] + " non lu(s)");
//         changeClass("not_avis");
//     }

//     // cette partie de la fonction sert à gérer le style rectangle rose qui s'applique selon le type de notification en cours
//     function changeClass(newClass)
//     {
//         $(".not_type_selection").removeClass("active");
//         $(".not_type_selection"+"."+newClass).addClass("active");

//         $(".not_btn-liens").addClass("d-none");
//         $(`.not_btn-liens[data-type="${newClass}"]`).removeClass("d-none");
//     }
// }


// // ***********************************************************************
// // cette fonction trie les notifications selon leur type (message, avis ou note) lorsqu'on clique sur le bouton correspondant, puis renvoie à la première notif (en mettant sIncrement à 0). Utilise un tri à bulle. 
// // ***********************************************************************

// function not_triAvis()
// {
//     for(i=0; i<aOfNotifications.length-1; i++)
//     {
//         for(j=0; j<aOfNotifications.length-1; j++)
//         {
//             if(aOfNotifications[j]["type"]!="avis"  && aOfNotifications[j+1]["type"]=="avis")
//             {
//                 [aOfNotifications[j], aOfNotifications[j+1]]=[aOfNotifications[j+1], aOfNotifications[j]];
//             }
//         }
//     }
//     // console.log(aOfNotifications);
//     sIncrement=0;
//     notif_nombreType()
//     notif_check_array()
// }

// function not_triMessages()
// {
//     for(i=0; i<aOfNotifications.length-1; i++)
//     {
//         for(j=0; j<aOfNotifications.length-1; j++)
//         {
//             if(aOfNotifications[j]["type"]!="message(s)"  && aOfNotifications[j+1]["type"]=="message(s)")
//             {
//                 [aOfNotifications[j], aOfNotifications[j+1]]=[aOfNotifications[j+1], aOfNotifications[j]];
//             }
//         }
//     }
//     // console.log(aOfNotifications);
//     sIncrement=0;
//     notif_nombreType()
//     notif_check_array()
// }

// function not_triNotes()
// {
//     for(i=0; i<aOfNotifications.length-1; i++)
//     {
//         for(j=0; j<aOfNotifications.length-1; j++)
//         {
//             if(aOfNotifications[j]["type"]!="note(s)"  && aOfNotifications[j+1]["type"]=="note(s)")
//             {
//                 [aOfNotifications[j], aOfNotifications[j+1]]=[aOfNotifications[j+1], aOfNotifications[j]];
//             }
//         }   
//     }
//     // console.log(aOfNotifications);
//     sIncrement=0;
//     notif_nombreType()
//     notif_check_array()
// }