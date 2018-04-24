$(document).ready(function () {

    $.ajaxSetup({ cache: false });

    $('.plus').click(function () {
        var plusspan  = $('.getprice').attr('price');
        var plusitem  = parseInt( $('.getNumber').val());
        plusitem++;
        $('.getNumber').val(plusitem);
        var total = plusitem * plusspan;
        $('.getprice').text(total);
    });

    $('.mins').click(function () {

        var minsspan = parseInt($('.getprice').attr('price'));
        var minsitem = parseInt($('.getNumber').val());
        minsitem--;
        if (minsitem <= 0) {

            $(".choose-meal").hide();
        } else {
            $('.getNumber').val(minsitem);
            var total = minsitem * minsspan;
            $('.getprice').text(total);

        }

    });


    $('input#from ').on("change paste keyup", function() {
        var dateFrom=document.getElementById("from").value;
        var dateTo=document.getElementById("to").value;
        alert(dateFrom);
        alert(dateTo);
        $.ajax({
            url:"http://localhost:9090/user/date",
            type:"GET",
            data:{
                from:dateFrom,
                to:dateTo
            }});
    });

    document.getElementById("from").value="10-10-2018";

    // var today = new Date();
    // var dd = today.getDate();
    // var mm = today.getMonth() + 1;
    // var yyyy = today.getFullYear();
    // today = mm+ '/' + dd + '/' + yyyy ;
    // $("input#from").attr("value", today);

    $(".plus").on('click',function(){

        var cellar = 0;
        var cell = $('.choose-meal .getprice').text();
        cellar =cell.match(/\S+/g);
        var c = 0;
        for(i=0;i<cellar.length;i++){
            c += parseInt(cellar[i]);
        }
        $(".gettotal").text(c)
    });

});



