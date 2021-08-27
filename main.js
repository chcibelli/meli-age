$( document ).ready(function() {
    
    $( "#main-btn" ).click(function() {
        
        $('#result').hide();
        
        let nickname = $('#nickname').val();
        
        if(nickname == '') {
            $('#result').html('<p>Ingresá tu apodo/nickname :(</p>');
            $('#result').show();
            return false;
        }
        
        let site = 'MLA';
        let url = 'https://api.mercadolibre.com/sites/'+site+'/search?nickname='+nickname.trim();
        
        $.getJSON( url, function( data ) {
            
            if (typeof data.seller === "undefined") {
                $('#result').html('<p>No encontre el apodo/nickname :(</p>');
                $('#result').show();
            } else {
                var difference = getDifference(new Date(data.seller.registration_date),new Date());
                
                let result = '<p>Te registraste el ' + formatDate(new Date(data.seller.registration_date)) + '</p>';
                
                result += '<p>Estas usando Mercado Libre hace ';
                if(difference.y >0) { result += difference.y + (difference.y > 1 ? ' años' : ' año'); }
                if(difference.m >0) { result += ', ' + difference.m + (difference.m > 1 ? ' meses' : ' mes'); }
                if(difference.d >0) { result += ' y ' + difference.d + (difference.d > 1 ? ' días' : ' día'); }
                result += '</p>';
                
                let tweet = 'Llevo usando Mercado Libre ';
                if(difference.y >0) { tweet += difference.y + (difference.y > 1 ? ' años' : ' año'); }
                if(difference.m >0) { tweet += ', ' + difference.m + (difference.m > 1 ? ' meses' : ' mes'); }
                if(difference.d >0) { tweet += ' y ' + difference.d + (difference.d > 1 ? ' días' : ' día'); }
                tweet += ' ¿Y vos? // ';

                $('#share').html('<a class="twitter-share-button" href="https://twitter.com/intent/tweet" data-size="large"  data-url="https://chcibelli.github.io/meli-how-old-are-u/" data-text="'+tweet+'">Tweet</a>');
                twttr.widgets.load();

                $('#result').html(result);
                $('#result').show();
                
            }
        });			
        
        
    });	
    
    /*$('#nickname').on('keyup',function(e) {
        $(this).val($(this).val().toUpperCase());
    });*/

    $('#nickname').on('keypress',function(e) {
        if(e.which == 13) {
            $('#main-btn').click();
        }
    });

});	

function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

function formatDate(date) {
    return pad(date.getUTCDate()) + '/' + pad(date.getUTCMonth()+1) + '/' + date.getUTCFullYear();
}

function getDifference(startdate, enddate) {
    var startdateMoment = moment(startdate);
    var enddateMoment = moment(enddate);
    if (startdateMoment.isValid() === true && enddateMoment.isValid() === true) {
        var years = enddateMoment.diff(startdateMoment, 'years');				
        var months = enddateMoment.diff(startdateMoment, 'months') - (years * 12);
        startdateMoment.add(years, 'years').add(months, 'months');
        var days = enddateMoment.diff(startdateMoment, 'days')
        return {y:years, m:months, d:days};				
    }
}