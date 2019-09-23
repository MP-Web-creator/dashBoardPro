var obj, dbParam, xmlhttp, myObj, x, txt = "";
obj = { table: "affiliates"};
dbParam = JSON.stringify(obj);
xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
    txt += "<table border='1'>"
    txt +=   "<tr>" 
                + "<th>" + "date affiliate" + "</th>"
                + "<th>" + "country code" + "</th>"
                + "<th>" + "affiliate id" + "</th>"
                + "<th>" + "leads" + "</th>"
                + "<th>" + "conversions" + "</th>"
                + "<th>" + "is profit" + "</th>"
            + "</tr>";
    for (x in myObj) {
      txt += "<tr>"
        txt += "<td>" + myObj[x].dt + "</td>";
        txt += "<td>" + myObj[x].country_code + "</td>";
        txt += "<td>" + myObj[x].affiliate_id + "</td>";
        txt += "<td>" + myObj[x].leads + "</td>";
        txt += "<td>" + myObj[x].conversions + "</td>";
        txt += "<td>" + myObj[x].is_profit + "</td>";
        txt += "</tr>";
    }
    txt += "</table>";    
    document.getElementById("demo").innerHTML = txt;
  }
};
xmlhttp.open("POST", "server.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send("x=" + dbParam);















/* var path_to_json = "http://honest.co.il/Tools/matias/7/json/";
var myData =[];

$(function () {

    affiliates();
    
   
})

function affiliates() {

    var g_data = path_to_json + "data.json";
    var xmlhttp = new XMLHttpRequest();
    var url = g_data;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var tmp_xml = xmlhttp.responseText;
            if (!isNull(tmp_xml)) {
                var myArr = JSON.parse(tmp_xml);
            }
            get_affiliates(myArr);
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function get_affiliates(arr) {
    var my_body = "";
    myData = arr.affiliates;


    DisplayBoxes();
 }

 function DisplayBoxes() {
    var dt = "";
    var country_code = "";
    var affiliate_id = "";
    var leads = 0;
    var conversions = 0;
    var is_profit="";

    var html = "";
    for (var i = 0; i < myData.length; i++) {
        dt = myData[i].dt;
        country_code = myData[i].country_code;
        affiliate_id = myData[i].affiliate_id;
        leads = myData[i].leads;
        conversions = myData[i].conversions;
        is_profit = myData[i].is_profit;
 
         html += "<div class='box'>"
            html += "<div style='text-align:left;font-size:18px;font-family:sans-serif;'>"
                html += "<span style='font-weight:bold;'>" + dt + "</span><br />"
                html += country_code + "<br />"
                html += affiliate_id + "<br />"
                html += leads + "<br />"
                html += conversions + "<br />"
                html += is_profit + "<br />"

            html += "</div>";
        html += "</div>";

    }
    
    document.getElementById("test").innerHTML = html;*/
    
/* 
    document.getElementsByTagName("h1")[0].style.textAlign= "center";

    for (var xx=0; xx<= myData.length; xx++){
        document.getElementsByClassName("box")[xx].style.padding = "20px";
        document.getElementsByClassName("box")[xx].style.display= "inline-block";
        document.getElementsByClassName("box")[xx].style.textAlign= "center";
    }
 }*/

/*function isNull(str_input) {
    var bNull = true;
    if (str_input != "" && str_input != null && str_input != undefined) {
        bNull = false;
    }
    return bNull;
} */