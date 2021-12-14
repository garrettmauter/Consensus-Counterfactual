/*
 * Requires:
 *     psiturk.js
 *     utils.js
*/
// Initalize psiturk object
/*var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);
*/

/*

var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to
var subject_id = uniqueID();

// All HTML pages to be loaded
var pages = [
    "demographics.html",
    "ELS.html",
    "pss.html",
    "instruct-1.html",
    "instruct-2.html",
];

/!* Subject ID generation *!/
function uniqueID() {
    let id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    return id;
}

/!********************
 * HTML manipulation
 * All HTML files in the templates directory are requested
 * from the server when the PsiTurk object is created above. We
 * need code to get those pages from the PsiTurk object and
 * insert them into the document.
 *
 ********************!/

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

/!********************
 * EXPLORATION GAME*
 ********************!/

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
    pages: ['<img src="/static/images/Instructions3.png">',
        '<img src="/static/images/Instructions4.png">',
        '<img src="/static/images/Instructions5.png">',
        '<img src="/static/images/Instructions6.png">',
        '<img src="/static/images/Instructions7.png">',
        '<img src="/static/images/Instructions8.png">'],
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


/!* Stimulus HTML template for the choice screen: USE TABLE FOR TRIAL INFO*!/

 */
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
    "<img src='static/images/blank.png' alt='blank'  id='blank' onload='setDisplay()'> " +
    "</div>" +
    "<div id='prompt'>" +
    "<p id='left_selection_prompt' > Press LEFT arrow to select. </p>" +
    "<p id='right_selection_prompt' > Press RIGHT arrow to select. </p>" +
    "</div>";
/*
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
        document.getElementById('left_selection_prompt').style.top = "600px";
        document.getElementById('right_selection_prompt').style.top = "600px";
    } else if (numCells===5) {
        document.getElementById('left_selection_prompt').style.top = "500px";
        document.getElementById('right_selection_prompt').style.top = "500px";
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
            // Get coordinates from selection side (x-axis) + y*numTrials (y-axis)
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
*/

/*

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

/* Returns the stimulus HTML string for the room choice page with the images replaced */
function roundSetImages(prev1, prev2, prev3, you, imgLeft, imgRight, config, stimTemplate) {
    var imgMap = {
        prev_1: prev1 + ".png",
        prev_2: prev2 + ".png",
        prev_3: prev3 + ".png",
        prev_4: prev4 + ".png",
        img_left: imgLeft + ".png",
        img_right: imgRight + ".png",
    };
    return stimTemplate.replace(/prev_1|prev_2|prev_3|prev_4|imgLeft|imgRight/gi, function(matched) {
        return imgMap[matched];
    });
}


/* Returns the stimulus HTML string for the room trial page with the images and rewards replaced */
function trialSetImages(img1, img2, redReward, greenReward, blueReward, stimTemplate) {
    var imgMap = {
        img_1: img1 + ".png",
        img_2: img2 + ".png",
        red_amt: redReward,
        green_amt: greenReward,
        blue_amt: blueReward,

    };
    return stimTemplate.replace(/img_1|img_2|blue_amt|green_amt|red_amt/gi, function(matched) {
        return imgMap[matched];
    });
}


/* Returns the stimulus HTML string for the result page with the images and rewards replaced */
function rewardSetImages(amount, color, stimTemplate) {
    var imgMap = {
        reward_value: amount,
        color_selected: color + ".png",
        text_color: color.substring(0, color.length - 1)
    };
    return stimTemplate.replace(/reward_value|color_selected|text_color/gi, function(matched) {
        return imgMap[matched];
    });
}

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
experiment.push(elsquestionnaire)

//for (let i=0; i<randRoundInfo.length; i++) {
for (let i=0; i<1; i++) {
    experiment.push(nxtRound)
    for (let j=0; j<randRoundInfo[i][1]; j++) {
        experiment.push(fixation, showTrial, showSelect, showReward);
    }
    experiment.push(blank)
}
*!/
*/


/*******************
 * Run Task
 ******************/


/*******************
 * Garrett new (9/9/21)
 *
 */

/* create timeline */
var timeline = [];


/* define welcome message trial */
var participant_num = {
    type: "survey-text",
    questions: [
        {prompt: 'Participant Number: '}
    ]
};
timeline.push(participant_num);

var condition_num = {
    type: "survey-text",
    questions: [
        {prompt: 'Condition: '}
    ]
};
timeline.push(condition_num);

/* define instructions trial */
var instructions = {
    type: "html-keyboard-response",
    stimulus: `
        <p style="font-weight:bold;font-size:35px;"> Instructions</p><p style="font-size:25px;"">In this experiment, you will play a game in which on each trial, 
        you must choose</p><p style="font-size:25px;""> between various available slots on a gambling board. 
        Each slot yields a monetary</p><p style="font-size:25px;""> reward, and your goal is to maximize your 
        earnings by selecting the slot with the </p><p style="font-size:25px;"">greatest average payoff.
        On each trial, you will be gambling in a different “room”, </p><p style="font-size:25px;"">
        indicated by the color of the screen. While gambling, in addition to 
        monetary</p><p style="font-size:25px;""> outcomes, you will be given access to information about the 
        decisions of prior</p><p style="font-size:25px;""> participants given the same slot options in the 
        same room. You will be represented by</p><p style="font-size:25px;""> an avatar in the center of the 
        screen and the choices of previous participants will be</p><p style="font-size:25px;""> indicated by a 
        set of avatars aligned above the available slots.
        </p>
        <p style="font-size:28px;">Press the space bar to continue.</p>
      `,
    post_trial_gap: 2000
};
timeline.push(instructions);


var slot_condition = [[1,7,3], [1,8,3], [1,9,3], [1,10,3], [1,11,3], [1,12,2], [2,7,2], [2,8,3], [2,9,3], [2,10,3], [2,11,3], [2,12,3],
    [3,7,3], [3,8,3], [3,9,3], [3,10,3], [3,11,3], [3,12,3], [4,7,2], [4,8,3], [4,9,3], [4,10,3], [4,11,3], [4,12,3],
    [5,7,2], [5,8,3], [5,9,3], [5,10,3], [5,11,2], [5,12,2], [6,7,2], [6,8,2], [6,9,3], [6,10,3], [6,11,3], [6,12,3]
] //numbers correspond to the 12 images (1:arrow, 2:circle, etc.)

var length_ = 100

function randomizer(slot_condition, length){

    var result_list = [None] * 104;
    var list_slotL = [];
    var list_slotR = [];

    for (slotL, slotR, num_trials in slot_condition){
        list_slotL+=[int(slotL)]*num_trials
        list_slotR+=[int(slotR)]*num_trials
    }
    function shuffle(array){

        var j, x, i;
        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        return array;
    }
    shuffle(list_slotL)
    shuffle(list_slotR)

    for (i = 0; i < length_.length; i++){
        prob_left=list_slotL[i]
        prob_right=list_slotR[i]
        result_list[i]=[prob_left, prob_right]
    }
}


/* start the experiment */
jsPsych.init({
    timeline: timeline,
    on_finish: function() {
        jsPsych.data.displayData();
    }

});
