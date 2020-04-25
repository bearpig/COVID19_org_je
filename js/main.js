// Gets data from JSON

$.ajax({
    type: "GET",
    url: "https://covid19.openrock.xyz/",
    success: function(data)
    {
        console.log(data);

// Format numbers with commas
 function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// Assign variables from JSON data
            var date_val = data.COVID19[0].DateTime.replace("string;#",""); 
            var confirmed_val = formatNumber(data.COVID19[0].Confirmedcases);
            var pending_val = formatNumber(data.COVID19[0].Pendingresults);
            var negative_val = formatNumber(data.COVID19[0].Negativetests);
            
            var active_val = Number(data.COVID19[0].Confirmedcases) - (Number(data.COVID19[0].Recovered) + Number(data.COVID19[0].Deaths));
            var recovered_val = formatNumber(data.COVID19[0].Recovered);
            var deaths_val = formatNumber(data.COVID19[0].Deaths);
            

            var tested_people_val = formatNumber(data.COVID19[0].Totalpeopletested);
            var tested_population_val = (data.COVID19[0].Totalpeopletested / 106800) * 100;   // tested population percentage 
            var tested_population_rounded_val = Math.round(tested_population_val * 100) / 100 + '%'; // population perecentage rounded
            var tested_results_val = formatNumber(data.COVID19[0].Totalresultsback);
            var tested_samples_val = formatNumber(data.COVID19[0].Totalsamplestested);

            var average_positive_val = data.COVID19[0].Averageagetestedpositive ;
            var average_recovered_val = data.COVID19[0].Averageagerecovered ;

            var male_positive_val = data.COVID19[0].Malepositivepercentage + '%';
            var female_positive_val = data.COVID19[0].Femalepositivepercentage + '%';
            var male_recovered_val = data.COVID19[0].Malerecoveredpercentage + '%';
            var female_recovered_val = data.COVID19[0].Femalerecoveredpercentage + '%';

            var hospital_occupancy_percentage_val = data.COVID19[0].Hospitaloccupancyratepercentage + '%';
            var hospital_beds_occupied_val = data.COVID19[0].Numberofhospitalbedsoccupied;
            var hospital_beds_available_val = data.COVID19[0].Numberofhospitalbedsavailable;
            var hospital_beds_total_val = Number(hospital_beds_occupied_val) + Number(hospital_beds_available_val);
            var hospital_covid19_val = data.COVID19[0]['NumberofpatientswithCovid-19inhospital'];
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

// Set widths for bar charts
            document.getElementById('bar-left-positive').style.width = male_positive_val;
            document.getElementById('bar-right-positive').style.width = female_positive_val;
            document.getElementById('bar-left-recovered').style.width = male_recovered_val;
            document.getElementById('bar-right-recovered').style.width = female_recovered_val; 
            document.getElementById('bar-full-hospital').style.width = hospital_occupancy_percentage_val;
    }
});

window.onload = function ()
{

}