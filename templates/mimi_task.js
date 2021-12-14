
// All HTML pages to be loaded
var pages = [
    "demographics.html",
    "ELS.html",
    "pss.html",
    "instruct-1.html",
    "instruct-2.html",
];



/********************
 * HTML manipulation
 * All HTML files in the templates directory are requested
 * from the server when the PsiTurk object is created above. We
 * need code to get those pages from the PsiTurk object and
 * insert them into the document.
 *
 ********************/

var check_demo = function() {
    var demoNames = ["Gender", "Ethnicity", "Race"];
    var demoResponses = [];
    for (var j = 0; j < demoNames.length; j++) {
        var checkit = 0;
        var demoVal = document.getElementsByName(demoNames[j]);
        for (var i = 0, l = demoVal.length; i < l; i++) {
            if (demoVal[i].checked) {
                demoResponses[j] = demoVal[i].value;
                checkit++;
            }
        }
        if (checkit === 0) {
            alert("If you wish to participate, you must answer the demographic questions.'");
            result=true
            return false;
        } else {
            result=false
        }
    }
    var ageN=document.getElementById("Age").value
    if (ageN.length < 2){
        alert("Please enter your age, or N/A")
        result2=true;
    }else{
        demoResponses.push(ageN);
        jsPsych.data.addProperties({demographics: demoResponses});
        result2=false;
    }
    if (result === true || result2 === true) {
        return false;
    } else {
        return true;
    }
}

var check_PSS = function() {
    var pssNames = ["1","2","3","4","5","6","7","8","9","10"];
    var pssResponses = [];
    let result;
    for (var j = 0; j < pssNames.length; j++) {
        var checkit = 0;
        var pssVal = document.getElementsByName(pssNames[j]);
        for (var i = 0; i < pssVal.length; i++) {
            if (pssVal[i].checked) {
                pssResponses[j] = pssVal[i].value; //
                checkit++;
            }
        }
        if (checkit === 0) {
            alert("Please answer all of the questions on this page to complete the study.");
            result = true;
            return false;
        } else {
            result = false
        }
    }
    if (result === true) {
        return false;
    } else {
        jsPsych.data.addProperties({pssResp: pssResponses});
        return true;
    }
};


var check_ELS = function() {
    var elsNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];
    var ageIDs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];
    var elsResponses = [];
    var elsAges = [];
    let result;
    for (var j = 0; j < elsNames.length; j++) {
        var checkit = 0;
        var checktxt = 0;
        var checkNotxt = 0;
        var elsVal = document.getElementsByName(elsNames[j]);
        var elsText = document.getElementById(ageIDs[j]).value;
        for (var i = 0; i < elsVal.length; i++) {
            if (elsVal[i].checked) {
                elsResponses[j] = elsVal[i].value; // yes=0 and no=1
                checkit++;
                if (elsVal[i].value === "0/" && elsText.length < 1) { //if question marked yes & no txt
                    checktxt++;
                } else if (elsVal[i].value === "1/" && elsText.length >=1) { //if question marked yes & no txt
                    checkNotxt++;
                } else if (elsVal[i].value === "0/" && elsText.length >=1) {
                    elsAges[j]=elsText;
                } else if (elsVal[i].value === "1/" ) {
                    elsAges[j]=0;
                }
            }
        }
        if (checkit > 0 && checktxt+checkNotxt > 0) {
            if (checktxt > 0) {
                alert("For every item checked Yes, please enter your age in the corresponding text box.");
                result = true;
                return false;
            } else if (checkNotxt > 0) {
                alert("Do not enter an age unless checking Yes.");
                result = true;
                return false;
            }
        } else if (checkit === 0) {
            alert("Please answer all of the questions on this page to complete the study.");
            result = true;
            return false;
        } else if (checkit > 0 && checktxt+checkNotxt === 0) {
            result = false;
        }
    }
    if (result === true) {
        return false;
    } else {
        jsPsych.data.addProperties({elsResp: elsResponses});
        jsPsych.data.addProperties({elsAge: elsAges});
        return true;
    }
};

// specify the questionnaire files
var demographics = {
    type: 'external-html',
    url: "demographics.html",
    cont_btn: "submitDemo",
    check_fn: check_demo
}

var pssquestionnaire = {
    type:'external-html',
    url: "PSS.html",
    execute_script: true,
    cont_btn: "submitPSS",
    check_fn: check_PSS
};

var elsquestionnaire = {
    type:'external-html',
    url: "ELS.html",
    execute_script: true,
    cont_btn: "submitELSQ",
    check_fn: check_ELS
};

/********************
 * EXPLORATION GAME*
 ********************/

// Welcome & Instruction Pages
var instruction1 = {
    type: 'external-html',
    url: "instruct-1.html",
    cont_btn: "next",
};

var instruction2 = {
    type: 'external-html',
    url: "instruct-2.html",
    cont_btn: "next",
};

var instructions = {
    type: "instructions",
    pages: ['<img src="../static/images/Instructions3.png">',
        '<img src="../static/images/Instructions4.png">',
        '<img src="../static/images/Instructions5.png">',
        '<img src="../static/images/Instructions6.png">',
        '<img src="../static/images/Instructions7.png">',
        '<img src="../static/images/Instructions8.png">'],
    show_clickable_nav: true
};


// Global variables:
var experiment = [];
var roundInfo = [  // roundInfo matrix specifies the low info position (table1 (1), table2 (2), or neither (0) is low info),
// horizon (5 or 10 trials) and bandit means (for table1 and table2) for each game. The low info table always has the lower
// mean reward.
    [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10], [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10],
    [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10], [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10],
    [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10], [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10],
    [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10], [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10],
    [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10], [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10],
    [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10], [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10],
    [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10], [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10],
    [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10], [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10],
    [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10], [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10],
    [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10], [1, 5], [2, 5], [0, 5], [1, 10], [2, 10], [0, 10],
];
var randRoundInfo = jsPsych.randomization.shuffle(roundInfo); //Randomized order of the rounds
// var currentRound = []; // currentRound holds the round specs during a particular round.
var trialInfo = []; // trialInfo holds the info for all trials generated during a particular game.
var numTrials = null; // numTrials counts trials in a game, with free choice starting at 4
var chosBandit = null;
var select = null;
var reward = null;
var availU = [0, 0, 0, 1];
var availB = [0, 0, 1, 1];


/* Stimulus HTML template for the choice screen: USE TABLE FOR TRIAL INFO*/
var trialStimTemplate =
    "<table id='table1'>" +
    "<tr id='tr1'>" +
    "<td> </td>" +
    "</tr>" +
    "</table>" +
    "<table id='table2'>" +
    "<tr id='tr2'>" +
    "<td> </td>" +
    "</tr>" +
    "</table>" +
    "<div>" +
    "<img src='../static/images/blank.png' alt='blank'  id='blank' onload='setDisplay()'> " +
    "</div>" +
    "<div id='prompt'>" +
    "<p id='left_selection_prompt' > Press LEFT arrow to select. </p>" +
    "<p id='right_selection_prompt' > Press RIGHT arrow to select. </p>" +
    "</div>";

function setDisplay() {
    for (let t=0; t<numCells-1; t++) {
        var row = document.getElementById("table1").insertRow(table1.length);
        row.id = "tr1";
        row.insertCell(0);
        var row = document.getElementById("table2").insertRow(table2.length);
        row.id = "tr2";
        row.insertCell(0);
    }
    if (numCells===10) {
        document.getElementById('left_selection_prompt').style.top = "680px";
        document.getElementById('right_selection_prompt').style.top = "680px";
    } else if (numCells===5) {
        document.getElementById('left_selection_prompt').style.top = "620px";
        document.getElementById('right_selection_prompt').style.top = "620px";
    }
    if (select === 0 || select === 1) {
        // change color of available cell(s)
        if (numTrials<=4) {
            if ((currentRound[0] === 1 && avail[numTrials-1] === 1) || (currentRound[0] === 2 && avail[numTrials-1] === 0)
                || (currentRound[0] === 0 && avail[numTrials-1] === 1)) {
                document.getElementById("table1").rows[trialInfo.length].cells[0].bgColor = "green";
                document.getElementById("table2").rows[trialInfo.length].cells[0].innerHTML = "XX";
                document.getElementById('left_selection_prompt').style.display = "inline";
            } else if ((currentRound[0] === 2 && avail[numTrials-1] === 1) || (currentRound[0] === 1 && avail[numTrials-1] === 0)
                || (currentRound[0] === 0 && avail[numTrials-1] === 0)) {
                document.getElementById("table2").rows[trialInfo.length].cells[0].bgColor = "green";
                document.getElementById("table1").rows[trialInfo.length].cells[0].innerHTML = "XX";
                document.getElementById('right_selection_prompt').style.display = "inline";
            }
        } else if (numTrials>4) {
            document.getElementById("table1").rows[trialInfo.length].cells[0].bgColor = "green";
            document.getElementById("table2").rows[trialInfo.length].cells[0].bgColor = "green";
            document.getElementById('right_selection_prompt').style.display = "inline";
            document.getElementById('left_selection_prompt').style.display = "inline";
        }
        if (select === 1) {
            // show selection square
            // Get coordidnates from selection side (x-axis) + y*numTrials (y-axis)
            if (chosBandit === 37) {
                if (document.getElementById("table1").rows[trialInfo.length].cells[0].bgColor !== "green") {
                    alert("You can only select green slots.");
                    chosBandit=39;
                    document.getElementById("table2").rows[trialInfo.length].cells[0].bgColor = "gray";
                } else if (document.getElementById("table1").rows[trialInfo.length].cells[0].bgColor === "green"){
                    document.getElementById("table1").rows[trialInfo.length].cells[0].bgColor = "gray";
                }
            } else if (chosBandit === 39) {
                if (document.getElementById("table2").rows[trialInfo.length].cells[0].bgColor !== "green") {
                    alert("You can only select green slots.");
                    chosBandit=37;
                    document.getElementById("table1").rows[trialInfo.length].cells[0].bgColor = "gray";
                } else if (document.getElementById("table2").rows[trialInfo.length].cells[0].bgColor === "green"){
                    document.getElementById("table2").rows[trialInfo.length].cells[0].bgColor = "gray";
                }
            }
        }
    } else if (select === 2) {
        // display reward info and print table-specific txt strings reflecting XXs or $ amount in trialInfo
        if (chosBandit === 37) {
            document.getElementById("table1").rows[trialInfo.length].cells[0].innerHTML = reward;
            document.getElementById("table2").rows[trialInfo.length].cells[0].innerHTML = "XX";
            trialInfo[numTrials-1]=[reward, "XX"];
        } else if (chosBandit === 39) {
            document.getElementById("table2").rows[trialInfo.length].cells[0].innerHTML = reward;
            document.getElementById("table1").rows[trialInfo.length].cells[0].innerHTML = "XX";
            trialInfo[numTrials-1]=["XX", reward];
        }
    }
    // display previous rewards and XXs
    for (let i = 0; i < trialInfo.length; i++) {
        document.getElementById("table1").rows[i].cells[0].innerHTML = trialInfo[i][0];
        document.getElementById("table2").rows[i].cells[0].innerHTML = trialInfo[i][1];
    }
}

function normalDistribution() {
    var u1 = Math.random();
    var u2 = Math.random();
    while(u1 === 0) u1 = Math.random(); //Converting [0,1) to (0,1)
    while(u2 === 0) u2 = Math.random();
    var z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(Math.PI*2 * u2);
    var z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(Math.PI*2 * u2);

    return {Dist1: z0, Dist2: z1};
}

function determineReward() {
    let lowRewList = [0.4, 0.8, 1.2, 2.0];
    let highRewList = [4, 6];
    let RewList = [1, 2];
    let lowRew = lowRewList[Math.floor(Math.random() * lowRewList.length)];
    let highRew = highRewList[Math.floor(Math.random() * highRewList.length)];
    let Rew = RewList[Math.floor(Math.random() * RewList.length)];
    let normDist;
    normDist=normalDistribution();
    if (chosBandit === 37) {
        if (currentRound[0] === 1) {
            reward = Math.round(((normDist.Dist1 + (highRew - lowRew))*0.8)*10)/10;
        } else if (currentRound[0] === 2) {
            reward = Math.round(((normDist.Dist1 + highRew)*0.8)*10)/10;
        } else if (currentRound[0] === 0) {
            if (Rew === 1) {
                reward = Math.round(((normDist.Dist1 + highRew) * 0.8) * 10) / 10;
            } else if (Rew === 2) {
                reward = Math.round(((normDist.Dist1 + (highRew - lowRew)) * 0.8) * 10) / 10;
            }
        }
    } else if (chosBandit === 39) {
        if (currentRound[0] === 2) {
            reward = Math.round(((normDist.Dist2 + (highRew - lowRew))*0.8)*10)/10;
        } else if (currentRound[0] === 1) {
            reward = Math.round(((normDist.Dist2 + highRew)*0.8)*10)/10;
        } else if (currentRound[0] === 0) {
            if (Rew === 1) {
                reward = Math.round(((normDist.Dist2 + highRew) * 0.8) * 10) / 10;
            } else if (Rew === 2) {
                reward = Math.round(((normDist.Dist2 + (highRew - lowRew)) * 0.8) * 10) / 10;
            }
        }
    }
    return reward;
}


var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
};

var blank = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;"></div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
};

var nxtRound = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:35px;">Wait for the next gambling round to begin</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
    on_finish: function() {
        currentRound=randRoundInfo.shift();
        if (currentRound[0]===1 || currentRound[0]===2) {
            avail = jsPsych.randomization.shuffle(availU);
        } else if (currentRound[0]===0) {
            avail = jsPsych.randomization.shuffle(availB);
        }
        numTrials=0;
        trialInfo=[];
        numCells=currentRound[1];
    }
};

/* Shows the choice in a room - 2 pie charts */
var showTrial = {
    type: "html-keyboard-response",
    choices: [37,39],
    data: {availKey: null, rewVal: null, trialNum: null, roundNum: null, currRound: null},
    stimulus: function() {
        numTrials++;
        select = 0;
        return trialStimTemplate
    },
    on_finish: function(data) {
        chosBandit = data.key_press;
        if (numTrials<=4) {
            if ((currentRound[0] === 1 && avail[numTrials-1] === 1) || (currentRound[0] === 2 && avail[numTrials-1] === 0)
                || (currentRound[0] === 0 && avail[numTrials-1] === 1)) {
                data.availKey=37;
            } else if ((currentRound[0] === 2 && avail[numTrials-1] === 1) || (currentRound[0] === 1 && avail[numTrials-1] === 0)
                || (currentRound[0] === 0 && avail[numTrials-1] === 0)) {
                data.availKey = 39;
            }
        } else if (numTrials>4) {
            data.availKey=0;
        }
        reward = determineReward();
        data.rewVal = reward;
        data.trialNum = numTrials;
        data.roundNum = roundInfo.length - randRoundInfo.length;
        data.currRound = currentRound;
    }
};

var showSelect = {
    type: "html-keyboard-response",
    trial_duration: 200,
    choices: jsPsych.NO_KEYS,
    stimulus: function() {
        select = 1;
        return trialStimTemplate
    }
};

var showReward = {
    type: "html-keyboard-response",
    trial_duration: 1000,
    choices: jsPsych.NO_KEYS,
    stimulus: function() {
        select = 2;
        return trialStimTemplate
    }
};

//experiment.push(instruction1, demographics, pssquestionnaire, instruction2, instructions);
//experiment.push(instructions)

//for (let i=0; i<randRoundInfo.length; i++) {
for (let i=0; i<1; i++) {
    experiment.push(nxtRound)
    for (let j=0; j<randRoundInfo[i][1]; j++) {
        experiment.push(fixation, showTrial, showSelect, showReward);
    }
    experiment.push(blank)
}



/*******************
 * Run Task
 ******************/

jsPsych.init({
    timeline: experiment,
    on_finish: function() {
        alert("The experiment has finished.");
        let saveData;
        saveData = jsPsych.data.get().ignore(['stimulus', 'trial_type', 'trial_index', 'internal_node_id']).filterCustom(function(trial) {return trial.key_press != null});
        saveData.localSave('csv','testdata.csv');
    }
});