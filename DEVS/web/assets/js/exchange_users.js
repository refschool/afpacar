/**
 * My global variable for user writer or user recipient
 */

var message_recipient_send, message_writer_send, idUser, id_message_report, test;

/**
 * Function that will be executed when the page is loaded for the first time
 */

$(document).ready(function () {
    displayUsers();
    $(".exc_inputTarea ").hide();
    $("#error_report_message").hide();
});

/**
 * Function to display all the message you have send or receive with ajax call
 */

function displayMessage(result) {
    idUser = result;
    var datas = {
        bJSON: 1,
        page: "exc_users__displayMessage",
        id_user: result
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
            template_bubbleMessage(result);
        })

        .fail(function (err) {
            //send in to the console the errors code 
            console.log('Load Error: ' + err.status);
        });
}

/**
 * function to display just all users you have chatted with
 */

function displayMessageLoadPage(idUser) {
    var datas = {
        bJSON: 1,
        page: "exc_users__displayMessageLoadPage",
        idUser: idUser

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
            template_bubbleMessage(result);
        })

        .fail(function (err) {
            //send in to the console the errors code 
            console.log('Load Error: ' + err.status);
        });
}

/**
 * function to adding new message at database 
 */

function addMessage() {
    var datas = {

        bJSON: 1,
        sendMessage: $("#writted_message").val(),
        page: "exc_users__addMessage",
        message_recipient_send: message_recipient_send,
        status: 0,
        is_active: 1

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
            $("#writted_message").val("");
            displayMessageLoadPage(idUser);
        })

        .fail(function (err) {
            //send in to the console the errors code 
            console.log('Load Error: ' + err.status);
        });


}

/**
 * function to create a template for messages
 */

function template_bubbleMessage(datas) {
    var sHtml = "";
    var photo_writer = datas[0]["photo_writer"]
    var photo_recip = datas[0]["photo_recip"]


    for (i = 0; i < datas.length; i++) {
        message_writer_send = datas[i]["id_user__message_recipient"];
        if (datas[i]["id_user__message_writer"] == 3) {

            sHtml += "<div id='user_writer'>"
            sHtml += "<div class='exc_bubble_from-me d-flex flex-row-reverse align-items-center' >"
            sHtml += "<img class='exc_img_user_from-me rounded-circle ' src='./assets/img/" + photo_writer + "' alt='exc_img_user_from-me'>"
            sHtml += "<p id='message1' class='content exc_from-me' >" + datas[i]["content_message"] + "</p>"
            sHtml += "</div>"
            sHtml += "</div>"
        }

        else {

            test = i
            sHtml += "<div id='user_recipient'>"
            sHtml += "<div class='exc_bubble_from-them  d-flex align-items-center'>"
            sHtml += "<div class='dropdown'>"
            sHtml += "<a class='dropdown-toggle' href='#' role='button' id='dropdownMenuLink' data-bs-toggle='dropdown' aria-expanded='false'>"
            sHtml += "<i class='exc_fas fas fa-ellipsis-v '  onClick='recoverId(" + datas[i]["id_message"] + ")'></i>"
            sHtml += "</a>"

            sHtml += "<ul class='dropdown-menu text-center' aria-labelledby='dropdownMenuLink'>"
            sHtml += "<li><a class='dropdown-item_supp exc_link_report' href='#' data-bs-toggle='modal' data-bs-target='#exc_modal_report'>Signaler le message</a></li>"
            sHtml += "</ul >"
            sHtml += "</div>"
            sHtml += "<img class='exc_img_user_from-them rounded-circle' src='./assets/img/" + photo_recip + "' alt='exc_img_user_from-me'>"
            if (datas[i]["status_report_message"] == 0) {
                sHtml += "<p id='message1' class='content exc_from-them' >" + datas[i]["content_message"] + "</p>"
            }
            else if (datas[i]["status_report_message"] == 1) {
                sHtml += "<p id='message1' class='content exc_from-them' >" + datas[i]["content_message"] + "<i class='fas ms-2 fa-exclamation-triangle text-danger'></i></p>"
            }
            sHtml += "</div>"
            sHtml += "</div>"
        }
    }
    sHtml += "<div class='exc_inputTarea row my-auto'>"
    sHtml += "<div class='input-group  exc_input_grp '>"
    sHtml += "<textarea id='writted_message' type='text' class='form-control exc_form_control ms-4' placeholder='Écrivez votre message...' aria-label='Recipient\'s username' aria-describedby='send_button' rows='1'></textarea >"
    sHtml += "<button id='send_button' class='btn btn_green me-4' type='button' onclick='addMessage()'>Envoyer</button>"
    sHtml += "</div >"
    sHtml += "</div >"
    $("#template").html(sHtml);
}

function recoverId(datas) {
    id_message_report = datas;
}

function displayUsers() {
    var datas = {
        bJSON: 1,
        page: "exc_users__getUsers",
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

            getUsers(result);
        })

        .fail(function (err) {
            //send in to the console the errors code 
            console.log('Load Error: ' + err.status);
        });
}

/**
 * functio to display user's messages on click 
 */

function getUsers(datas) {
    var sHtml = "";

    for (i = 0; i < datas.length; i++) {
        if (datas[i]["id_user__message_recipient"] != 3) {

            sHtml += "<a onClick='getIdRecip(" + datas[i]["id_user__message_recipient"] + ")' class='exc_link_menu my-2 href=''>"
            sHtml += "<div class='exc_user d-flex flex-column align-items-center'>"
            sHtml += "<img class='exc_img_user_menu w-50 rounded-circle' src='./assets/img/" + datas[i]["filename_photo_user"] + "' alt='img_user'>"
            sHtml += "<figcaption class='my-2'>" + datas[i]["name_recip"] + "</figcaption>"
            sHtml += "</div>"
            sHtml += "</a>"
        }
    }
    $("#contentBubble").html(sHtml);

}


/**
 * 
 * @param {int} result 
 */
function getIdRecip(result) {
    displayMessage(result);
    message_recipient_send = result;
}

/**
 * function to empty modal input
 */

function emptyInput() {
    $("#reg_inp_forget_pw").val('');
    $("#exc_modal_area").val('');
}

function addMessageReport() {
    var datas = {
        bJSON: 1,
        page: "exc_users__addMessageReport",
        objectReport: $("#reg_inp_forget_pw").val(),
        contentReport: $("#exc_modal_area").val(),
        id_message_report: id_message_report,
        status_report_message: 1

    }
    $.ajax({
        type: "POST", // method="POST"
        url: "route.php", // action="lecture_fichier_retour_json.php"
        async: true, // allows synchronous or asynchronous multiple JS calls to PHP
        data: datas, // past the lsit of variable to send (datas)
        dataType: "json", //  format expected of return PHP
        cache: false, // stock in to the cache false
    })
        .done(function (error) {
            console.log(error)
            if (error.error == 0) {
                $("#error_report_message").show();
            }
            else if (error.error == 1) {

                $("#exc_select" + test).append("<i class='fas ms-2 fa-exclamation-triangle text-danger'></i>")
                $('#exc_modal_report').modal('hide');
            }
        })

        .fail(function (err) {
            //send in to the console the errors code 
            console.log('Load Error: ' + err.status);
        });
}

/**
 * Hide or Show responsive menu
 */

function hideAside() {
    var aside = $(".amineAside");
    if (aside.hasClass("anim_hide_aside")) {
        aside.removeClass("anim_hide_aside").addClass("anim_show_aside");
    } else {
        aside.removeClass("anim_show_aside").addClass("anim_hide_aside");
    }
    var sectionHide = $('.z-index')
    if (sectionHide.hasClass('z-100')) {
        sectionHide.removeClass("z-100").addClass("z-0");
    } else {
        sectionHide.removeClass("z-0").addClass("z-100");
    }

    var icon = $(".showIcon");
    if (icon.hasClass("fa-arrow-circle-left")) {
        icon.removeClass("fa-arrow-circle-left").addClass("fa-arrow-circle-right");

    } else {
        icon.removeClass("fa-arrow-circle-right").addClass("fa-arrow-circle-left");
    }




    var asideBtn = $(".amineBtn");
    if (asideBtn.hasClass("anim_hide_btn")) {
        asideBtn.removeClass("anim_hide_btn").addClass("anim_show_btn");
    } else {
        asideBtn.removeClass("anim_show_btn").addClass("anim_hide_btn");
    }
}
