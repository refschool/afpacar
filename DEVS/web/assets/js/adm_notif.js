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
        page: "adm_notif__getNotifications"
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
        // console.log(result);

        aOfNotifications = result;

        iTotalNotifications= aOfNotifications["adm_message"].length + aOfNotifications["adm_trajet"].length+ aOfNotifications["adm_avis"].length;
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

// function showNotifications()
// {
//     $(".notif_nombre_messages").html(aOfNotifications["adm_message"].length);
//     $(".notif_nombre_trajets").html(aOfNotifications["adm_trajet"].length);
//     $(".notif_nombre_avis").html(aOfNotifications["adm_avis"].length);
// }

function showNotifications()
{
    if(aOfNotifications["adm_message"].length==0)
    {
        $(".notif_nombre_messages").hide();
    }
    else
    {
        $(".notif_nombre_messages").html(aOfNotifications["adm_message"].length);
    }

    if(aOfNotifications["adm_trajet"].length==0)
    {
        $(".notif_nombre_trajets").hide();
    }
    else
    {
        $(".notif_nombre_trajets").html(aOfNotifications["adm_trajet"].length);
    }

    if(aOfNotifications["adm_avis"].length==0)
    {
        $(".notif_nombre_avis").hide();
    }
    else
    {
        $(".notif_nombre_avis").html(aOfNotifications["adm_avis"].length);
    }
}