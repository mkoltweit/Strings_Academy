/*
Assignment 10

Author: Michelle Koltweit
Filename: myCode.js
Date: 12/5/19
*/

"use strict";

//global variables
var results = [];
var teacherName;
var selectedInstrument;
var totalAmount;

var instrumentList = ["Violin", "Viola", "Cello"];
var lessonPrices = [12, 15, 18];


window.onload = init;


function init() {
    $("#violaSchedule").hide();
    $("#celloSchedule").hide();
    $("#firstName").focus();
    $("#privateLesson").hide();
    $("#showViolinBio").css("display", "none");
    $("#showViolaBio").css("display", "none");
    $("#showCelloBio").css("display", "none");
}

function showSchedule() {
    var schedule = $("#instrumentChoice option:selected").val();

    if (schedule === "Violin") {
        $("#violinSchedule").show();
        $("#signUpB").show();
    }
    else {
        $("#violinSchedule").hide();
    }

    if (schedule === "Viola") {
        $("#violaSchedule").show();
        $("#signUpB").show();
    }
    else {
        $("#violaSchedule").hide();
    }
    
    if (schedule === "Cello") {
        $("#celloSchedule").show();
        $("#signUpB").show();
    }
    else {
        $("#celloSchedule").hide();
    }
}
function instrumentDecision() {
    for (var i = 0; i < instrumentList.length; i++) {
        if (selectedInstrument == instrumentList[i]) {
            selectedInstrument = lessonPrices[i]; 
            
        }
    }
}
function calculateClass() {
    var instrumentSelection = document.getElementById("instrument");
    selectedInstrument = instrumentSelection.options[instrumentSelection.selectedIndex].value; 
    instrumentDecision();

    getTotal();
    document.getElementById("indivClass").value = selectedInstrument;
    document.getElementById("total").value = totalAmount;
}
var getTotal = function() {
    totalAmount = selectedInstrument * 12;
    return totalAmount;
};


function showLesson() {
    $("#lesson").on('change', function(){
        if($(this).is(':checked')) {
            $(this).attr('value', 'true');
            $("#privateLesson").show();
        } else {
            $(this).attr('value', 'false');
            $("#privateLesson").hide();
        }
    });
}
function callJSON(teacherName) {
    $.ajax({
        type: "get",
        url: "instructorBio.json",
        error: function (xhr, status, error) {
            alert("Error: " + xhr.status + " - " + error);
        },
        dataType: "json",
        success: function (data) {
            $("#showViolinBio").html("");
            $("#showViolinBio").css("display", "none");
            $("#showViolaBio").html("");
            $("#showViolaBio").css("display", "none");
            $("#showCelloBio").html("");
            $("#showCelloBio").css("display", "none");
            $.each(data, function(i, val) {
                if (val.Name === teacherName) {
                    if (i <= 2) {
                        results.push(val);
                        $("#showViolinBio").css("display", "block");
                        $("#showViolinBio").html(val.Name + "<br><br>" 
                        + "<strong>Instrument:</strong> " + val.Instrument + "<br>" 
                        + "<strong>Education:</strong> " + val.Education + "<br>" 
                        + "<strong>Experience:</strong> " + val.Experience + "<br>" 
                        + "<strong>Orchestras:</strong> " + val.Orchestras + "<br><br>");
                    }
                    else if (i > 2 && i <= 5) {
                        results.push(val);
                        $("#showViolaBio").css("display", "block");
                        $("#showViolaBio").html(val.Name + "<br><br>" 
                        + "<strong>Instrument:</strong> " + val.Instrument + "<br>" 
                        + "<strong>Education:</strong> " + val.Education + "<br>" 
                        + "<strong>Experience:</strong> " + val.Experience + "<br>" 
                        + "<strong>Orchestras:</strong> " + val.Orchestras + "<br><br>");
                    }
                    else {
                        results.push(val);
                        $("#showCelloBio").css("display", "block");
                        $("#showCelloBio").html(val.Name + "<br><br>" 
                        + "<strong>Instrument:</strong> " + val.Instrument + "<br>" 
                        + "<strong>Education:</strong> " + val.Education + "<br>" 
                        + "<strong>Experience:</strong> " + val.Experience + "<br>" 
                        + "<strong>Orchestras:</strong> " + val.Orchestras + "<br><br>");
                    }
                    
                }
            });
        }
    });
    console.log(results);
}
    

function showBio(bioID) {
    
    
  // If the about button is clicked, display the output text 
  
    if (bioID === "martinicInfo" ) {
        callJSON("Maggie Martinic-Jercic");
    }
    if (bioID === "livingstonInfo" ) {
        callJSON("Nancy Livingston");
    }
    if (bioID === "moeckelInfo" ) {
        callJSON("Steven Moeckel");
    }
    if (bioID === "deatherageInfo" ) {
        callJSON("Mark Deatherage");
    }
    if (bioID === "mckayInfo" ) {
        callJSON("Christopher McKay");
    }
    if (bioID === "beaInfo" ) {
        callJSON("Karen Bea");
    }
    if (bioID === "hunsingerInfo" ) {
        callJSON("Melita Hunsinger");
    }
    if (bioID === "simizInfo" ) {
        callJSON("Jan Simiz");
    }
    if (bioID === "andereggInfo" ) {
        callJSON("Peter Anderegg");
    }

}