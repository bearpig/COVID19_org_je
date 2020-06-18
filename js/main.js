// Gets data from JSON

$.ajax({
    type: "GET",
    url: "https://data.openrock.xyz/feeds/covid19full",
    success: function (raw_data) {

        data = raw_data.data[0]
        deaths_age = raw_data.data[1]
        deaths_place = raw_data.data[2]
        deaths_gender = raw_data.data[3]
        deaths_classification = raw_data.data[4]


        // Format numbers with commas
        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }

        // Assign variables from JSON data
        var date_val = data.COVID19[0].DateTime.replace("string;#", "");
        var confirmed_val = formatNumber(data.COVID19[0].Confirmedcases);
        var pending_val = formatNumber(data.COVID19[0].Pendingresults);
        var negative_val = formatNumber(data.COVID19[0].Negativetests);

        var active_val = formatNumber(data.COVID19[0].KnownActiveCases);
        var recovered_val = formatNumber(data.COVID19[0].Recovered);
        var deaths_val = formatNumber(data.COVID19[0].Deaths);

        var tested_people_val = formatNumber(data.COVID19[0].Totalpeopletested);
        var tested_population_val = (data.COVID19[0].Totalpeopletested / 107800) * 100;   // tested population percentage
        var tested_population_rounded_val = (Number(tested_population_val * 100) / 100).toFixed(1) + '%'; // population percentage rounded
        var tested_results_val = formatNumber(data.COVID19[0].Totalresultsback);
        var tested_samples_val = formatNumber(data.COVID19[0].Totalsamplestested);

        var average_positive_val = data.COVID19[0].Averageagetestedpositive;
        var average_recovered_val = data.COVID19[0].Averageagerecovered;

        var male_positive_val = data.COVID19[0].Malepositivepercentage + '%';
        var female_positive_val = data.COVID19[0].Femalepositivepercentage + '%';
        var male_recovered_val = data.COVID19[0].Malerecoveredpercentage + '%';
        var female_recovered_val = data.COVID19[0].Femalerecoveredpercentage + '%';

        var hospital_occupancy_percentage_val = data.COVID19[0].Hospitaloccupancyratepercentage + '%';
        var hospital_beds_occupied_val = data.COVID19[0].Numberofhospitalbedsoccupied;
        var hospital_beds_available_val = data.COVID19[0].Numberofhospitalbedsavailable;
        var hospital_beds_total_val = Number(hospital_beds_occupied_val) + Number(hospital_beds_available_val);
        var hospital_covid19_val = data.COVID19[0]['NumberofpatientswithCovid-19inhospital'];

        var deaths_lab_proven_val = deaths_classification.COVID19DeathsClassification[0]['LaboratoryProvenCovid-19'];
        var deaths_lab_presumed_val = deaths_classification.COVID19DeathsClassification[0]['ProbableCovid-19'];

        var hospital_deaths_val = Number(deaths_place.COVID19DeathsPlace[0].GeneralHospital) + Number(deaths_place.COVID19DeathsPlace[0].OverdaleHospital) + Number(deaths_place.COVID19DeathsPlace[0].StSaviours);
        var carehome_deaths_val = deaths_place.COVID19DeathsPlace[0].CareHome;
        var domestic_deaths_val = deaths_place.COVID19DeathsPlace[0].Community;

        var male_deaths_val = deaths_gender.COVID19DeathsGender[0].Male + '%';
        var female_deaths_val = deaths_gender.COVID19DeathsGender[0].Female + '%';

        // 24 hour difference
        var tested_people_24_val = (((Number(data.COVID19[0].Totalpeopletested) - Number(data.COVID19[1].Totalpeopletested)) / Number(data.COVID19[0].Totalpeopletested)) * 100).toFixed(1) + '%';
        var confirmed_24_val = (((Number(data.COVID19[0].Confirmedcases) - Number(data.COVID19[1].Confirmedcases)) / Number(data.COVID19[0].Confirmedcases)) * 100).toFixed(1) + '%';
        var pending_24_val = (((Number(data.COVID19[0].Pendingresults) - Number(data.COVID19[1].Pendingresults)) / Number(data.COVID19[0].Pendingresults)) * 100).toFixed(1) + '%';
        var negative_24_val = (((Number(data.COVID19[0].Negativetests) - Number(data.COVID19[1].Negativetests)) / Number(data.COVID19[0].Negativetests)) * 100).toFixed(1) + '%';
        var active_yesterday_val = Number(data.COVID19[1].Confirmedcases) - (Number(data.COVID19[1].Recovered) + Number(deaths_classification.COVID19DeathsClassification[1]['LaboratoryProvenCovid-19']));
        var active_24_val = (((active_val - active_yesterday_val) / active_val) * 100).toFixed(1) + '%';
        var recovered_24_val = (((Number(data.COVID19[0].Recovered) - Number(data.COVID19[1].Recovered)) / Number(data.COVID19[0].Recovered)) * 100).toFixed(1) + '%';
        var deaths_24_val = (((Number(data.COVID19[0].Deaths) - Number(data.COVID19[1].Deaths)) / Number(data.COVID19[0].Deaths)) * 100).toFixed(1) + '%';

        var hospital_covid19_24_val = (((Number(data.COVID19[0]['NumberofpatientswithCovid-19inhospital']) - Number(data.COVID19[1]['NumberofpatientswithCovid-19inhospital'])) / Number(data.COVID19[0]['NumberofpatientswithCovid-19inhospital'])) * 100).toFixed(1) + '%';
        var hospital_deaths_yesterday_val = Number(deaths_place.COVID19DeathsPlace[1].GeneralHospital) + Number(deaths_place.COVID19DeathsPlace[1].OverdaleHospital) + Number(deaths_place.COVID19DeathsPlace[1].StSaviours);
        var hospital_deaths_24_val = (((hospital_deaths_val - hospital_deaths_yesterday_val) / hospital_deaths_val) * 100).toFixed(1) + '%';
        var carehome_deaths_24_val = (((Number(deaths_place.COVID19DeathsPlace[0].CareHome) - Number(deaths_place.COVID19DeathsPlace[1].CareHome)) / Number(deaths_place.COVID19DeathsPlace[0].CareHome)) * 100).toFixed(1) + '%';
        var domestic_deaths_24_val = (((Number(deaths_place.COVID19DeathsPlace[0].Community) - Number(deaths_place.COVID19DeathsPlace[1].Community)) / Number(deaths_place.COVID19DeathsPlace[0].Community)) * 100).toFixed(1) + '%';

        // 7 day difference
        var tested_people_7_val = (((Number(data.COVID19[0].Totalpeopletested) - Number(data.COVID19[6].Totalpeopletested)) / Number(data.COVID19[0].Totalpeopletested)) * 100).toFixed(1) + '%';
        var confirmed_7_val = (((Number(data.COVID19[0].Confirmedcases) - Number(data.COVID19[6].Confirmedcases)) / Number(data.COVID19[0].Confirmedcases)) * 100).toFixed(1) + '%';
        var pending_7_val = (((Number(data.COVID19[0].Pendingresults) - Number(data.COVID19[6].Pendingresults)) / Number(data.COVID19[0].Pendingresults)) * 100).toFixed(1) + '%';
        var negative_7_val = (((Number(data.COVID19[0].Negativetests) - Number(data.COVID19[6].Negativetests)) / Number(data.COVID19[0].Negativetests)) * 100).toFixed(1) + '%';
        var active_lastweek_val = Number(data.COVID19[6].Confirmedcases) - (Number(data.COVID19[6].Recovered) + Number(deaths_classification.COVID19DeathsClassification[6]['LaboratoryProvenCovid-19']));
        var active_7_val = (((active_val - active_yesterday_val) / active_val) * 100).toFixed(1) + '%';
        var recovered_7_val = (((Number(data.COVID19[0].Recovered) - Number(data.COVID19[6].Recovered)) / Number(data.COVID19[0].Recovered)) * 100).toFixed(1) + '%';
        var deaths_7_val = (((Number(data.COVID19[0].Deaths) - Number(data.COVID19[6].Deaths)) / Number(data.COVID19[0].Deaths)) * 100).toFixed(1) + '%';

        var hospital_covid19_7_val = (((Number(data.COVID19[0]['NumberofpatientswithCovid-19inhospital']) - Number(data.COVID19[6]['NumberofpatientswithCovid-19inhospital'])) / Number(data.COVID19[0]['NumberofpatientswithCovid-19inhospital'])) * 100).toFixed(1) + '%';
        var hospital_deaths_lastweek_val = Number(deaths_place.COVID19DeathsPlace[6].GeneralHospital) + Number(deaths_place.COVID19DeathsPlace[6].OverdaleHospital) + Number(deaths_place.COVID19DeathsPlace[6].StSaviours);
        var hospital_deaths_7_val = (((hospital_deaths_val - hospital_deaths_yesterday_val) / hospital_deaths_val) * 100).toFixed(1) + '%';
        var carehome_deaths_7_val = (((Number(deaths_place.COVID19DeathsPlace[0].CareHome) - Number(deaths_place.COVID19DeathsPlace[6].CareHome)) / Number(deaths_place.COVID19DeathsPlace[0].CareHome)) * 100).toFixed(1) + '%';
        var domestic_deaths_7_val = (((Number(deaths_place.COVID19DeathsPlace[0].Community) - Number(deaths_place.COVID19DeathsPlace[6].Community)) / Number(deaths_place.COVID19DeathsPlace[0].Community)) * 100).toFixed(1) + '%';


        // Add numbers from variables into HTML
        $("#date").append(document.createTextNode(date_val));
        $("#confirmedcases").append(document.createTextNode(confirmed_val));
        $("#pendingresults").append(document.createTextNode(pending_val));
        $("#negativetests").append(document.createTextNode(negative_val));
        $("#active").append(document.createTextNode(active_val));
        $("#recovered").append(document.createTextNode(recovered_val));
        $("#deaths").append(document.createTextNode(deaths_val));

        $("#tested_people").append(document.createTextNode(tested_people_val));
        $("#tested_population").append(document.createTextNode(tested_population_rounded_val));
        $("#tested_results").append(document.createTextNode(tested_results_val));
        $("#tested_samples").append(document.createTextNode(tested_samples_val));

        $("#average_positive").append(document.createTextNode(average_positive_val));
        $("#average_recovered").append(document.createTextNode(average_recovered_val));

        $("#male_positive").append(document.createTextNode(male_positive_val));
        $("#female_positive").append(document.createTextNode(female_positive_val));

        $("#male_recovered").append(document.createTextNode(male_recovered_val));
        $("#female_recovered").append(document.createTextNode(female_recovered_val));

        $("#hospital_occupancy_percentage").append(document.createTextNode(hospital_occupancy_percentage_val));
        $("#hospital_beds_occupied").append(document.createTextNode(hospital_beds_occupied_val));
        $("#hospital_beds_total").append(document.createTextNode(hospital_beds_total_val));
        $("#hospital_covid19").append(document.createTextNode(hospital_covid19_val));

        $("#deaths_total").append(document.createTextNode(deaths_val));
        $("#deaths_lab_proven").append(document.createTextNode(deaths_lab_proven_val));
        $("#deaths_lab_presumed").append(document.createTextNode(deaths_lab_presumed_val));

        $("#hospital_deaths").append(document.createTextNode(hospital_deaths_val));
        $("#carehome_deaths").append(document.createTextNode(carehome_deaths_val));
        $("#domestic_deaths").append(document.createTextNode(domestic_deaths_val));

        $("#male_deaths").append(document.createTextNode(male_deaths_val));
        $("#female_deaths").append(document.createTextNode(female_deaths_val));

        $("#tested_24").append(document.createTextNode(tested_people_24_val));
        $("#confirmed_24").append(document.createTextNode(confirmed_24_val));
        $("#pending_24").append(document.createTextNode(pending_24_val));
        $("#negative_24").append(document.createTextNode(negative_24_val));
        $("#active_24").append(document.createTextNode(active_24_val));
        $("#recovered_24").append(document.createTextNode(recovered_24_val));
        $("#deaths_24").append(document.createTextNode(deaths_24_val));
        $("#hospital_covid19_24").append(document.createTextNode(hospital_covid19_24_val));
        $("#hospital_deaths_24").append(document.createTextNode(hospital_deaths_24_val));
        $("#carehome_deaths_24").append(document.createTextNode(carehome_deaths_24_val));
        $("#domestic_deaths_24").append(document.createTextNode(domestic_deaths_24_val));

        $("#tested_7").append(document.createTextNode(tested_people_7_val));
        $("#confirmed_7").append(document.createTextNode(confirmed_7_val));
        $("#pending_7").append(document.createTextNode(pending_7_val));
        $("#negative_7").append(document.createTextNode(negative_7_val));
        $("#active_7").append(document.createTextNode(active_7_val));
        $("#recovered_7").append(document.createTextNode(recovered_7_val));
        $("#deaths_7").append(document.createTextNode(deaths_7_val));
        $("#hospital_covid19_7").append(document.createTextNode(hospital_covid19_7_val));
        $("#hospital_deaths_7").append(document.createTextNode(hospital_deaths_7_val));
        $("#carehome_deaths_7").append(document.createTextNode(carehome_deaths_7_val));
        $("#domestic_deaths_7").append(document.createTextNode(domestic_deaths_7_val));



        // Set widths for bar charts
        document.getElementById('bar-left-positive').style.width = male_positive_val;
        document.getElementById('bar-right-positive').style.width = female_positive_val;
        document.getElementById('bar-left-recovered').style.width = male_recovered_val;
        document.getElementById('bar-right-recovered').style.width = female_recovered_val;
        document.getElementById('bar-full-hospital').style.width = hospital_occupancy_percentage_val;
        document.getElementById('bar-left-deaths').style.width = male_deaths_val;
        document.getElementById('bar-right-deaths').style.width = female_deaths_val;
    }
});