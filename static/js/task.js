/* Set up the experiment. Define variables and preload images. */
// Create timeline
// Mimi comments
// Garrett test


var experiment = [];
experiment.push({
    type: "fullscreen",
    fullscreen_mode: true,
});
var chosBandit = []

var roundInfoInit = [[0, 1], [1, 0], [2, 3], [3, 2], // this will be the matrix which holds the variable info for each round
    [4, 5], [5, 4]];
var roundInfo = [];

function push(fromArray, toArray) {
    for(let i = 0, len = fromArray.length; i < len; i++) {
        toArray.push(fromArray[i]);
    }
    return toArray;
}


for (let t = 0; t < 17; t++){
    push(roundInfoInit, roundInfo)
}


var randRoundInfo = jsPsych.randomization.shuffle(roundInfo);
console.log(randRoundInfo)
var trialInfo = [];
var condition = [];
var initCondition = [0, 1, 2, 3];
var currentCondition = [];


for (let i = 0; i < 26; i++){
    var randCondition = jsPsych.randomization.shuffle(initCondition);
    push(randCondition, condition);
}

for (let i = 0; i < 2; i++) {
    condition.pop()
    randRoundInfo.pop()
}
console.log(condition)

condition.pop()
condition.pop()
console.log(condition)
var consensusCond = []
var initConsCond = [1,0,0,0,0,0,0,0,0,0]

for (let i = 0;i<10;i++){
    var randConsCond = jsPsych.randomization.shuffle(initConsCond)
    push(randConsCond,consensusCond)
}
console.log(consensusCond)

var conditionZip = condition.map(function(e, i) {
    return [e, consensusCond[i]];
});



console.log(conditionZip)


numTrials = 0


var images = ["../static/images/star.png",
    "../static/images/circle.png",
    "../static/images/diamond.png",
    "../static/images/gear.png",
    "../static/images/heart.png",
    "../static/images/moon.png"];

/* Stimulus HTML template for the choice screen: USE TABLE FOR TRIAL INFO*/

var trialStimTemplate =

    "<p style=\"position:absolute;margin-top: 86px;top:80px;left:120px;\" id='p1string' ></p>" +
    "<p style=\"position:absolute;margin-top: 86px;top:80px;left:465px;\" id='p2string' ></p>" +
    "<p style=\"position:absolute;margin-top: 86px;top:80px;left:805px;\" id='p3string' ></p>" +
    "<p style=\"position:absolute;margin-top: 86px;top:80px;left:1145px;\" id='userstring' ></p>" +
    "<img style=\"position:absolute;outline-color:black;outline-style: solid; margin-top: 40px;top:180px;left:115px;width:160px;height:160px;\" id='p1'> " +
    "<img style=\"position:absolute;outline-color:black;outline-style: solid; margin-top: 40px;top:180px;left:465px;width:160px;height:160px;\" id='p2'> " +
    "<img style=\"position:absolute;outline-color:black;outline-style: solid; margin-top: 40px;top:180px;left:805px;width:160px;height:160px;\" id='p3'> " +
    "<img style=\"position:absolute;outline-color:black;outline-style: solid; margin-top: 40px;top:180px;left:1115px;width:160px;height:160px;\" id='user'> " +
    "<hr style='position:absolute;height:2px;border-width:0;left:135px;color:black;background-color:black;width:1200px;margin-top: 1px;'>" +
    "<img src='../static/images/blank.png' alt='blank'  id='blank' onload='setDisplay()'> " +
    "<img style=\"position:absolute;outline-color:black;outline-style: solid;padding:25px;margin-top: 80px;top:430px;left:425px;width:160px;height:160px;\" id='imgLeft'> " +
    "<img style=\"position:absolute;outline-color:black;outline-style: solid;padding:25px;margin-top: 80px;top:430px;left:850px;width:160px;height:160px;\" id='imgRight'> " +
    "<div id='prompt'>" +
    "<p style=\"position:absolute;top:700px;left:385px;display:inline-block;\" id='left_selection_prompt' ></p>" +
    "<p style=\"position:absolute;top:700px;left:800px;display:inline-block;\" id='right_selection_prompt' ></p>" +
    "</div>"




var cellColors = ["IndianRed", "SkyBlue", "PaleGreen", "LemonChiffon"]




var currImgLeft = []
var currImgRight = []
var currentRound = 0



function setDisplay() {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    console.log(getRandomInt(3));

    var leftPrompt = document.getElementById('left_selection_prompt')
    var rightPrompt = document.getElementById('right_selection_prompt')

    leftPrompt.innerHTML = 'Press LEFT arrow to select.'
    rightPrompt.innerHTML = 'Press RIGHT arrow to select.'
    leftPrompt.style.fontSize = "20px";
    rightPrompt.style.fontSize = "20px";

    if (select === 2) {
        leftPrompt.style.top = "700px";
        rightPrompt.style.top = "700px";
        leftPrompt.style.left = "458px";
        rightPrompt.style.left = "878px";
        leftPrompt.style.fontSize = "40px";
        rightPrompt.style.fontSize = "40px";
        leftPrompt.innerHTML = '$' + rewRight[0]
        rightPrompt.innerHTML = '$' + rewRight[1]
        console.log(leftPrompt)
    }


    var p1string = document.getElementById("p1string")
    var p2string = document.getElementById("p2string")
    var p3string = document.getElementById("p3string")
    var userstring = document.getElementById("userstring")
    p1string.innerHTML = "Player 1"
    p2string.innerHTML = "Player 2"
    p3string.innerHTML = "Player 3"
    userstring.innerHTML = "You"
    p1string.style.fontSize = "43px"
    p2string.style.fontSize = "43px"
    p3string.style.fontSize = "43px"
    userstring.style.fontSize = "43px"



    var p1 = document.getElementById("p1")
    var p2 = document.getElementById("p2")
    var p3 = document.getElementById("p3")
    var user = document.getElementById("user")
    p1.style.outlineStyle = "solid"
    p2.style.outlineStyle = "solid"
    p3.style.outlineStyle = "solid"
    user.style.outlineStyle = "solid"
    p1.style.outlineColor = "black"
    p2.style.outlineColor = "black"
    p3.style.outlineColor = "black"
    user.style.outlineColor = "black"



    var leftCell = document.getElementById('imgLeft')
    var rightCell = document.getElementById('imgRight')
    currImgLeft = currentRound[0]
    currImgRight = currentRound[1]
    leftCell.src = images[currImgLeft];
    rightCell.src = images[currImgRight];
    leftCell.style.position = "absolute"
    rightCell.style.position = "absolute"
    leftCell.style.backgroundColor = cellColors[currentCondition[0]]
    rightCell.style.backgroundColor = cellColors[currentCondition[0]]



    if (select === 0) {

        p1.src = '../static/images/grayx.png'
        p2.src = '../static/images/grayx.png'
        p3.src = '../static/images/grayx.png'
        user.src = '../static/images/question.png'

    } else if (select === 1) {
        p1.src = '../static/images/grayx.png'
        p2.src = '../static/images/grayx.png'
        p3.src = '../static/images/grayx.png'
        user.src = '../static/images/question.png'



        if (chosBandit === 37){
            leftCell.style.outlineWidth = "10px";
            rightCell.style.outlineWidth = "3px";
        } else if (chosBandit === 39) {
            leftCell.style.outlineWidth = "3px";
            rightCell.style.outlineWidth = "10px";
        }

    } else if (select === 2) {
        p1.style.padding = "25px";
        p2.style.padding = "25px";
        p3.style.padding = "25px";
        user.style.padding = "25px";
        user.style.opacity = 1.0
        if (chosBandit === 37){
            leftCell.style.outlineWidth = "10px";
            rightCell.style.outlineWidth = "3px";
        } else if (chosBandit === 39) {
            leftCell.style.outlineWidth = "3px";
            rightCell.style.outlineWidth = "10px";
        }
        var randPlayer = Math.floor(Math.random() * 3) // gets random number for 1 of the players
        console.log(currentCondition[1])
        console.log(randPlayer)

        if (currentCondition[0] === 0) { // condition 1
            if (currentCondition[1] === 0) {
                if (chosBandit === 37) {
                    p1.src = images[currImgLeft]
                    p2.src = images[currImgLeft]
                    p3.src = images[currImgLeft]
                    user.src = images[currImgLeft]
                } else if (chosBandit === 39) {
                    p1.src = images[currImgRight]
                    p2.src = images[currImgRight]
                    p3.src = images[currImgRight]
                    user.src = images[currImgRight]
                }
            } else if (currentCondition[1] === 1) {
                if (chosBandit === 37) {
                    if (randPlayer === 0) {
                        p1.src = images[currImgRight]
                        p2.src = images[currImgLeft]
                        p3.src = images[currImgLeft]
                        user.src = images[currImgLeft]
                    } else if (randPlayer === 1) {
                        p1.src = images[currImgLeft]
                        p2.src = images[currImgRight]
                        p3.src = images[currImgLeft]
                        user.src = images[currImgLeft]
                    } else if (randPlayer === 2) {
                        p1.src = images[currImgLeft]
                        p2.src = images[currImgLeft]
                        p3.src = images[currImgRight]
                        user.src = images[currImgLeft]
                    }

                } else if (chosBandit === 39) {
                    if (randPlayer === 0) {
                        p1.src = images[currImgLeft]
                        p2.src = images[currImgRight]
                        p3.src = images[currImgRight]
                        user.src = images[currImgRight]
                    } else if (randPlayer === 1) {
                        p1.src = images[currImgRight]
                        p2.src = images[currImgLeft]
                        p3.src = images[currImgRight]
                        user.src = images[currImgRight]
                    } else if (randPlayer === 2) {
                        p1.src = images[currImgRight]
                        p2.src = images[currImgRight]
                        p3.src = images[currImgLeft]
                        user.src = images[currImgRight]
                    }

                }
            }


        } else if (currentCondition[0] === 1) { // condition 2
            if (currentCondition[1] === 0) {
                if (chosBandit === 37) {
                    p1.src = images[currImgRight]
                    p2.src = images[currImgRight]
                    p3.src = images[currImgRight]
                    user.src = images[currImgLeft]
                } else if (chosBandit === 39) {
                    p1.src = images[currImgLeft]
                    p2.src = images[currImgLeft]
                    p3.src = images[currImgLeft]
                    user.src = images[currImgRight]
                }
            } else if (currentCondition[1] === 1){
                if (chosBandit === 37) {
                    if (randPlayer === 0) {
                        p1.src = images[currImgLeft]
                        p2.src = images[currImgRight]
                        p3.src = images[currImgRight]
                        user.src = images[currImgLeft]
                    } else if (randPlayer === 1) {
                        p1.src = images[currImgRight]
                        p2.src = images[currImgLeft]
                        p3.src = images[currImgRight]
                        user.src = images[currImgLeft]
                    } else if (randPlayer === 2) {
                        p1.src = images[currImgRight]
                        p2.src = images[currImgRight]
                        p3.src = images[currImgLeft]
                        user.src = images[currImgLeft]
                    }
                } else if (chosBandit === 39) {
                    if (randPlayer === 0) {
                        p1.src = images[currImgRight]
                        p2.src = images[currImgLeft]
                        p3.src = images[currImgLeft]
                        user.src = images[currImgRight]
                    } else if (randPlayer === 1) {
                        p1.src = images[currImgLeft]
                        p2.src = images[currImgRight]
                        p3.src = images[currImgLeft]
                        user.src = images[currImgRight]
                    } else if (randPlayer === 2) {
                        p1.src = images[currImgLeft]
                        p2.src = images[currImgLeft]
                        p3.src = images[currImgRight]
                        user.src = images[currImgRight]
                    }
                }
            }
        } else if (currentCondition[0] === 2) { // condition 3
            if (currentCondition[1] === 0) {
                if (chosBandit === 37) {
                    p1.src = images[currImgLeft]
                    p2.src = images[currImgLeft]
                    p3.src = images[currImgLeft]
                    user.src = images[currImgLeft]
                } else if (chosBandit === 39) {
                    p1.src = images[currImgRight]
                    p2.src = images[currImgRight]
                    p3.src = images[currImgRight]
                    user.src = images[currImgRight]
                }
            } else if (currentCondition[1] === 1) {
                if (chosBandit === 37) {
                    if (randPlayer === 0) {
                        p1.src = images[currImgRight]
                        p2.src = images[currImgLeft]
                        p3.src = images[currImgLeft]
                        user.src = images[currImgLeft]
                    } else if (randPlayer === 1) {
                        p1.src = images[currImgLeft]
                        p2.src = images[currImgRight]
                        p3.src = images[currImgLeft]
                        user.src = images[currImgLeft]
                    } else if (randPlayer === 2) {
                        p1.src = images[currImgLeft]
                        p2.src = images[currImgLeft]
                        p3.src = images[currImgRight]
                        user.src = images[currImgLeft]
                    }

                } else if (chosBandit === 39) {
                    if (randPlayer === 0) {
                        p1.src = images[currImgLeft]
                        p2.src = images[currImgRight]
                        p3.src = images[currImgRight]
                        user.src = images[currImgRight]
                    } else if (randPlayer === 1) {
                        p1.src = images[currImgRight]
                        p2.src = images[currImgLeft]
                        p3.src = images[currImgRight]
                        user.src = images[currImgRight]
                    } else if (randPlayer === 2) {
                        p1.src = images[currImgRight]
                        p2.src = images[currImgRight]
                        p3.src = images[currImgLeft]
                        user.src = images[currImgRight]
                    }

                }
            }
        } else if (currentCondition[0] === 3) { // condition 4
            if (currentCondition[1] === 0) {
                if (chosBandit === 37) {
                    p1.src = images[currImgRight]
                    p2.src = images[currImgRight]
                    p3.src = images[currImgRight]
                    user.src = images[currImgLeft]
                } else if (chosBandit === 39) {
                    p1.src = images[currImgLeft]
                    p2.src = images[currImgLeft]
                    p3.src = images[currImgLeft]
                    user.src = images[currImgRight]
                }
            } else if (currentCondition[1] === 1){
                if (chosBandit === 37) {
                    if (randPlayer === 0) {
                        p1.src = images[currImgLeft]
                        p2.src = images[currImgRight]
                        p3.src = images[currImgRight]
                        user.src = images[currImgLeft]
                    } else if (randPlayer === 1) {
                        p1.src = images[currImgRight]
                        p2.src = images[currImgLeft]
                        p3.src = images[currImgRight]
                        user.src = images[currImgLeft]
                    } else if (randPlayer === 2) {
                        p1.src = images[currImgRight]
                        p2.src = images[currImgRight]
                        p3.src = images[currImgLeft]
                        user.src = images[currImgLeft]
                    }
                } else if (chosBandit === 39) {
                    if (randPlayer === 0) {
                        p1.src = images[currImgRight]
                        p2.src = images[currImgLeft]
                        p3.src = images[currImgLeft]
                        user.src = images[currImgRight]
                    } else if (randPlayer === 1) {
                        p1.src = images[currImgLeft]
                        p2.src = images[currImgRight]
                        p3.src = images[currImgLeft]
                        user.src = images[currImgRight]
                    } else if (randPlayer === 2) {
                        p1.src = images[currImgLeft]
                        p2.src = images[currImgLeft]
                        p3.src = images[currImgRight]
                        user.src = images[currImgRight]
                    }
                }
            }
        }

        p1.style.backgroundColor = cellColors[currentCondition[0]]
        p2.style.backgroundColor = cellColors[currentCondition[0]]
        p3.style.backgroundColor = cellColors[currentCondition[0]]
        user.style.backgroundColor = cellColors[currentCondition[0]]



    }
}

// returns a gaussian random function with the given mean and stdev.
function gaussian(mean, std) {
    var y2;
    var use_last = false;
    var y1;
    if (use_last) {
        y1 = y2;
        use_last = false;
    } else {
        var x1, x2, w;
        do {
            x1 = 2.0 * Math.random() - 1.0;
            x2 = 2.0 * Math.random() - 1.0;
            w = x1 * x1 + x2 * x2;
        } while (w >= 1.0);
        w = Math.sqrt((-2.0 * Math.log(w)) / w);
        y1 = x1 * w;
        y2 = x2 * w;
        use_last = true;
    }

    var retval = mean + std * y1;
    retval = retval.toFixed(2)
    if (retval > 0)
        return retval;
    return -retval;
}


function determineReward() {
    console.log('current condition:', currentCondition[0])
    function myRew(event) {
        var x = event.key;
        if (x === "ArrowLeft") {
            chosBandit = 37
        } else if (x === "ArrowRight") {
            chosBandit = 39
        }
        return chosBandit
    }

    myRew(event)
    if (currentRound[0] === 0 || currentRound[0] === 1) {
        rewardLeft = gaussian(1.6, 0.2);
        rewardRight = gaussian(1.6, 0.2);
    } else if (currentRound[0] === 2 || currentRound[0] === 3) {
        rewardLeft = gaussian(1.0, 0.2);
        rewardRight = gaussian(1.0, 0.2);
    } else if (currentRound[0] === 4 || currentRound[0] === 5) {
        rewardLeft = gaussian(0.4, 0.2);
        rewardRight = gaussian(0.4, 0.2);
    }
    var difference = Math.abs(rewardLeft - rewardRight)
    console.log(difference)
    difference = difference.toFixed(2)
    console.log(difference)
    if (currentCondition[0] === 0) {
        if (chosBandit === 37) {
            if (+rewardRight > +rewardLeft) {
                actualRewardLeft = rewardRight
                actualRewardRight = rewardLeft

            } else if (+rewardRight < +rewardLeft) {
                actualRewardLeft = rewardLeft
                actualRewardRight = rewardRight
            }
            if (difference < 0.2){
                console.log(actualRewardLeft)
                actualRewardLeft = parseFloat(actualRewardLeft) + parseFloat(0.2)
                actualRewardLeft = actualRewardLeft.toFixed(2)
                console.log(actualRewardLeft)
            }
        } else if (chosBandit === 39) {
            if (+rewardLeft > +rewardRight) {
                actualRewardLeft = rewardRight
                actualRewardRight = rewardLeft
            } else if (+rewardLeft < +rewardRight) {
                actualRewardLeft = rewardLeft
                actualRewardRight = rewardRight
            }
            if (difference < 0.2){
                console.log(actualRewardRight)
                actualRewardRight = parseFloat(actualRewardRight) + parseFloat(0.2)
                actualRewardRight = actualRewardRight.toFixed(2)
                console.log(actualRewardRight)
            }
        }
    } else if (currentCondition[0] === 1) {
        if (chosBandit === 37) {
            if (+rewardLeft > +rewardRight) {
                actualRewardLeft = rewardRight
                actualRewardRight = rewardLeft
            } else if (+rewardLeft < +rewardRight) {
                actualRewardLeft = rewardLeft
                actualRewardRight = rewardRight
            }
            if (difference < 0.2){
                console.log(actualRewardRight)
                actualRewardRight = parseFloat(actualRewardRight) +  parseFloat(0.2)
                actualRewardRight = actualRewardRight.toFixed(2)
                console.log(actualRewardRight)
            }
        } else if (chosBandit === 39) {
            if (+rewardRight > +rewardLeft) {
                actualRewardLeft = rewardRight
                actualRewardRight = rewardLeft
            } else if (+rewardRight < +rewardLeft) {
                actualRewardLeft = rewardLeft
                actualRewardRight = rewardRight
            }
            if (difference < 0.2){
                console.log(actualRewardLeft)
                actualRewardLeft = parseFloat(actualRewardLeft) + parseFloat(0.2)
                actualRewardLeft = actualRewardLeft.toFixed(2)
                console.log(actualRewardLeft)
            }
        }

    } else if (currentCondition[0] === 2) {
        console.log('else if currentCondition = 2')
        if (chosBandit === 37) {
            if (+rewardRight > +rewardLeft) {
                console.log('rewardRight > left')
                actualRewardLeft = rewardRight
                actualRewardRight = rewardLeft
            } else if (+rewardRight < +rewardLeft) {
                actualRewardLeft = rewardLeft
                actualRewardRight = rewardRight
            }
            if (difference < 0.2){
                console.log(actualRewardLeft)
                actualRewardLeft = parseFloat(actualRewardLeft) +  parseFloat(0.2)
                actualRewardLeft = actualRewardLeft.toFixed(2)
                console.log(actualRewardLeft)
            }
        } else if (chosBandit === 39) {
            if (+rewardLeft > +rewardRight) {
                actualRewardLeft = rewardRight
                actualRewardRight = rewardLeft
            } else if (+rewardLeft < +rewardRight) {
                actualRewardLeft = rewardLeft
                actualRewardRight = rewardRight
            }
            if (difference < 0.2){
                console.log(actualRewardRight)
                actualRewardRight = parseFloat(actualRewardRight) + parseFloat(0.2)
                actualRewardRight = actualRewardRight.toFixed(2)
                console.log(actualRewardRight)
            }
        }
    } else if (currentCondition[0] === 3) {

        if (chosBandit === 37) {
            if (+rewardRight > +rewardLeft) {
                actualRewardLeft = rewardLeft
                actualRewardRight = rewardRight
            } else if (+rewardRight < +rewardLeft) {
                actualRewardLeft = rewardRight
                actualRewardRight = rewardLeft
            }
            if (difference < 0.2){
                console.log(actualRewardRight)
                actualRewardRight = parseFloat(actualRewardRight) +  parseFloat(0.2)
                actualRewardRight = actualRewardRight.toFixed(2)
                console.log(actualRewardRight)
            }
        } else if (chosBandit === 39) {
            if (+rewardRight > +rewardLeft) {
                actualRewardLeft = rewardRight
                actualRewardRight = rewardLeft
            } else if (+rewardRight < +rewardLeft) {
                actualRewardLeft = rewardLeft
                actualRewardRight = rewardRight
            }
            if (difference < 0.2){
                console.log(actualRewardLeft)
                actualRewardLeft = parseFloat(actualRewardLeft) +  parseFloat(0.2)
                actualRewardLeft = actualRewardLeft.toFixed(2)
                console.log(actualRewardLeft)
            }
        }
    }
    return [actualRewardLeft, actualRewardRight];


};


var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;width: 800px;border-radius: 5px;height: 50px;top: 370px;left:330px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1500,
};



var blank = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;"></div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
};


var nxtRound = {
    type: 'html-keyboard-response',

    stimulus: '<div style="font-size:35px;width: 800px;border-radius: 5px;height: 50px;position: absolute;top: 410px;left:330px;"></div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1,
    on_finish: function() {
        currentRound=randRoundInfo.shift();
        currentCondition = conditionZip.shift()
    }
};


var rewLeft = 0
var rewRight = 0

var showTrial = {
    type: "html-keyboard-response",
    choices: [37,39],
    // data: {availKey: null, rewVal: null, trialNum: null, roundNum: null, currRound: null},
    stimulus: function() {
        numTrials++;
        select = 0;
        return trialStimTemplate
    },
    on_finish: function() {
        //chosBandit === data.key_press

        rewLeft,rewRight = determineReward();
        /*const rewards = determineReward();
        console.log(rewards.actualRewardLeft)
        console.log(rewards.actualRewardRight)*/

        //data.rewVal = [rewLeft,rewRight];
        //data.trialNum = numTrials;
        //data.roundNum = roundInfo.length - randRoundInfo.length;
        //data.currRound = currentRound;
    }
};


var showSelect = {
    type: "html-keyboard-response",
    trial_duration: 2000,
    choices: jsPsych.NO_KEYS,
    stimulus: function() {
        select = 1;
        return trialStimTemplate
    }
};


var showReward = {
    type: "html-keyboard-response",
    trial_duration: 4000,
    choices: jsPsych.NO_KEYS,
    stimulus: function() {
        select = 2;
        return trialStimTemplate
    }
};


for (let i=0; i<1; i++) {
    console.log('i=0 loop')
    experiment.push(nxtRound)
    for (let j=0; j<100; j++) {
        experiment.push(nxtRound, fixation, showTrial, showSelect, showReward);
        console.log('new trial')
    }
    experiment.push(blank)
}

jsPsych.init({
    timeline: experiment,
    on_finish: function() {
        alert("The experiment has finished.");
        let saveData;
        saveData = jsPsych.data.get().ignore(['stimulus', 'trial_type', 'trial_index', 'internal_node_id']).filterCustom(function(trial) {return trial.key_press != null});
        saveData.localSave('csv','testdata.csv');
    }
});