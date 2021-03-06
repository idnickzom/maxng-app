const express = require('express');
const route = express.Router();
var url = require('url');

var response = {};
var people;

route.get('/', async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    var q = url.parse(req.url, true).query;

    var page = (q.page == null) ? 1 : q.page;
    var sort_type = (q.sort_type == null) ? 'name' : q.sort_type;
    var order = (q.order == null) ? 'asc' : q.order;
    var gender = q.gender;
    var search = q.search;
    var is_gender = false;
    var is_search = false;

    if (gender != null){
        if (!((gender == 'male') || (gender == 'female') || (gender == 'n/a'))){
            res.send({status: '701', message: 'Incorrect gender value'});
            return;
        }
        else{
            is_gender = true;
        }
    }
    if (search != null){
        is_search = true;
    }

    var request = require('request');
        var options = {
        'method': 'GET',
        'url': 'http://swapi.dev/api/people/?page='+page+'',
        'headers': {
        },
        formData: {

        }
    };
    request(options, async function (error, response) {
    if (error) throw new Error(error);
        var data = JSON.parse(response.body);

        if (data['results'] == null){
            res.send({status: '808', message: 'Not Found'});
            return;
        }

        people = data['results'];

        if (is_search){
            people = people.filter(function( obj ) {
                return ((obj.name).toLowerCase()).includes((search).toLowerCase());
            });
        }

        if (is_gender){
            people = people.filter(function( obj ) {
                return obj.gender === (gender).toLowerCase();
            });
        }
            
        if ((sort_type == 'name') && (order == 'asc')){
            people.sort((a, b) => (a.name > b.name) ? 1 : -1);
        }
        else if ((sort_type == 'name') && (order == 'desc')){
            people.sort((a, b) => (a.name < b.name) ? 1 : -1);
        }
        else if ((sort_type == 'height') && (order == 'asc')){
            people.sort((a, b) => (parseInt(a.height) > parseInt(b.height)) ? 1 : -1);
        }
        else if ((sort_type == 'height') && (order == 'desc')){
            people.sort((a, b) => (parseInt(a.height) < parseInt(b.height)) ? 1 : -1);
        }

        var total_height = 0;
        for (var i = 0; i < people.length; i++){
            total_height = total_height + parseFloat(people[i]['height']);
        }

        var total_height_cm = total_height+" cm";
        var total_height_ft_in = toFeetInches(total_height);

        res.send({count: people.length, total_height: {cm: total_height_cm, ft_in: total_height_ft_in}, data: people});

    });
    
});

function toFeetInches(n) {
    var realFeet = ((n * 0.393700) / 12);
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    return feet + " ft and " + inches + ' inches';
}

module.exports = route;