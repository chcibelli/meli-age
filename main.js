$( document ).ready(function() {


$( "#main-btn" ).click(function() {
    
    $('#result').hide();
    
    let nickname = $('#nickname').val();
    
    if(nickname == '') {
        return false;
    }
    
    let site = 'MLA';
    var url = 'https://api.mercadolibre.com/sites/'+site+'/search?nickname='+nickname.trim();
    
    $.getJSON( url, function( data ) {
        
        if (typeof data.seller === "undefined") {
            $('#result').html('<p>No encontre el apodo/nickname :(</p>');
            $('#result').show();
        } else {
            var difference = getDifference(new Date(data.seller.registration_date),new Date());
            
            let result = '<p>Te registraste el ' + formatDate(new Date(data.seller.registration_date)) + '</p>';
            
            result += '<p>Estas usando Mercado Libre hace ';
            if(difference.y >0) { result += difference.y + (difference.y > 1 ? ' años' : ' año') + ', '; }
            if(difference.m >0) { result += difference.m + (difference.m > 1 ? ' meses' : ' mes') + ', '; }
            if(difference.d >0) { result += difference.d + (difference.d > 1 ? ' días' : ' día'); }
            result += '</p>';
            
            $('#result').html(result);
            $('#result').show();
            
        }
    });			
    
    
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