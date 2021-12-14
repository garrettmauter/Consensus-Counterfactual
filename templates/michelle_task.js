var check_demo = function() {
    var demoNames = ["Gender", "Ethnicity", "Race"];
    var demoResponses = [];
    let result;
    for (let j = 0; j < demoNames.length; j++) {
        var checkit = 0;
        var demoVal = document.getElementsByName(demoNames[j]);
        for (let i = 0, l = demoVal.length; i < l; i++) {
            if (demoVal[i].checked) {
                demoResponses[j] = demoVal[i].value;
                checkit++;
            }
        }
        if (checkit === 0) {
            alert("If you wish to participate, you must answer the demographic questions.'");
            result = true;
            return false;
        } else {
            result = false
        }
    }
    var ageN=document.getElementById("Age").value;
    let result2;
    if (ageN.length < 2){
        alert("Please enter your age, or N/A");
        result2 = true;
    } else {
        demoResponses.push(ageN);
        jsPsych.data.addProperties({demographics: demoResponses});
        result2 = false;
    }
    if (result === true || result2 === true) {
        return false;
    } else {
        return true;
    }
};


// All HTML pages to be loaded
var pages = [
    "demographics.html",
];

/* Subject ID generation */
function uniqueID() {
    let id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    return id;
}

// specify the demographics file
var demographics = {
    type: 'external-html',
    url: "demographics.html",
    cont_btn: "submitDemo",
    check_fn: check_demo
};

/* Set up the experiment. Define variables and preload images. */
// Create timeline
var timeline = [];

// Set up the arrow direction values
const LEFT = 0;
const RIGHT = 1;

// Set up token probabilities based on room divergence and arrow choice
var hd_left_probabilities = [0.7, 0.1, 0.2, 0, 0];
var hd_right_probabilities = [0.1, 0.7, 0, 0.2, 0];
var ld_left_probabilities = [0, 0.1, 0.2, 0, 0.7];
var ld_right_probabilities = [0, 0.1, 0, 0.2, 0.7];

var token_probabilities = new Map();
token_probabilities.set('HD', [hd_left_probabilities, hd_right_probabilities]);
token_probabilities.set('LD', [ld_left_probabilities, ld_right_probabilities]);

// Set up token value distributions
tv1 = [3, 0, 1, 1, 3];
tv2 = [0, 3, 1, 1, 3];
tv3 = [0, 0, 1, 3, 0];
all_value_distributions = [tv1, tv2, tv3];

// Randomize colors in experiment
var colors = ['blue', 'green', 'orange', 'purple', 'red'];
var randomized_colors = jsPsych.randomization.repeat(colors, 1);

// Map divergence to room pattern
var room_divergence = ['HD', 'LD'];
var randomized_room_divergence = jsPsych.randomization.repeat(room_divergence, 1);
var room_patterns = ['pattern1', 'pattern2'];
var randomized_room_patterns = jsPsych.randomization.repeat(room_patterns, 1);
var room_divergence_pattern_map = new Map();
room_divergence_pattern_map.set(randomized_room_divergence[0], randomized_room_patterns[0]);
room_divergence_pattern_map.set(randomized_room_divergence[1], randomized_room_patterns[1]);

// Map room patterns to room number
var room_numbers = ['room1', 'room2'];
var randomized_room_numbers = jsPsych.randomization.repeat(room_numbers, 1);
var room_pattern_number_map = new Map();
room_pattern_number_map.set(randomized_room_patterns[0], randomized_room_numbers[0]);
room_pattern_number_map.set(randomized_room_patterns[1], randomized_room_numbers[1]);

// Randomize the token positions and image pathways for the row formation of tokens (Learning Phase)
row_pos_learning = [165, 365, 565, 765, 965];
rand_row_pos_learning = jsPsych.randomization.repeat(row_pos_learning, 1);
color_path_learning = ["../static/images/red.png", "../static/images/orange.png", "../static/images/green.png",
    "../static/images/blue.png", "../static/images/purple.png"];
rand_color_path_learning = jsPsych.randomization.repeat(color_path_learning, 1);

var learning_token1_str = '<img src="' + rand_color_path_learning[0] + '" style="width:150px; position:absolute;top:218px; left:' + rand_row_pos_learning[0] + 'px;">';
var learning_token2_str = '<img src="' + rand_color_path_learning[1] + '" style="width:150px; position:absolute;top:218px; left:' + rand_row_pos_learning[1] + 'px;">';
var learning_token3_str = '<img src="' + rand_color_path_learning[2] + '" style="width:150px; position:absolute;top:218px; left:' + rand_row_pos_learning[2] + 'px;">';
var learning_token4_str = '<img src="' + rand_color_path_learning[3] + '" style="width:150px; position:absolute;top:218px; left:' + rand_row_pos_learning[3] + 'px;">';
var learning_token5_str = '<img src="' + rand_color_path_learning[4] + '" style="width:150px; position:absolute;top:218px; left:' + rand_row_pos_learning[4] + 'px;">';

// Randomize the token positions and image pathways for the row formation of tokens (Gambling Phase)
row_pos_gambling = [115, 315, 515, 715, 915];
rand_row_pos_gambling = jsPsych.randomization.repeat(row_pos_gambling, 1);
color_path_gambling = ["../static/images/red.png", "../static/images/orange.png", "../static/images/green.png",
    "../static/images/blue.png", "../static/images/purple.png"];
rand_color_path_gambling = jsPsych.randomization.repeat(color_path_gambling, 1);

// Preload images
var images = ['../static/images/pattern1.png', '../static/images/pattern1.png', "../static/images/red.png",
    "../static/images/orange.png", "../static/images/green.png", "../static/images/blue.png",
    "../static/images/purple.png", "../static/images/red.png", "../static/images/leftarrow.png",
    "../static/images/rightarrow.png", "../static/images/square.png", "../static/images/i1.png",
    "../static/images/i2.png", "../static/images/i3.png", "../static/images/i4.png"];

var preload = {
    type: 'preload',
    images: images
}

timeline.push(preload);

// Generate List of Tokens Based on Probability (without randomizing token list yet). We are not using random because this does not work well for small samples
var learning_token_list = function(divergence, direction_index, colors_list) {
    const token_probability = token_probabilities.get(divergence)[direction_index];
    let token_list = [];
    for (let i = 0; i < token_probability.length; i++) {
        let num_token_appearance = token_probability[i] * 10;
        while (num_token_appearance > 0) {
            token_list.push(colors_list[i]);
            num_token_appearance--;
        }
    }
    return token_list;
}

// Display the arrow direction and room number
function display_direc_room_num(arrow_direction, room_num) {
    if (arrow_direction === LEFT && room_num === 'room1') {
        return '<p style=\'font-size:50px;\'>Left Arrow in Room 1</p>';
    }
    else if (arrow_direction === RIGHT  && room_num === 'room1') {
        return '<p style=\'font-size:50px;\'>Right Arrow in Room 1</p>';
    }
    else if (arrow_direction === LEFT && room_num === 'room2') {
        return '<p style=\'font-size:50px;\'>Left Arrow in Room 2</p>';
    }
    else if (arrow_direction === RIGHT && room_num === 'room2') {
        return '<p style=\'font-size:50px;\'>Right Arrow in Room 2</p>';
    }
}

// Display the room based on the pattern and room number
function display_pattern_room_num(pattern, room_num) {
    if (pattern === 'pattern1' && room_num === 'room1') {
        return '<img src= "../static/images/pattern1.png" style="width:1200px; position:absolute; top:5px; left:20px"/>\n' +
            '<p style=\'position:absolute; font-size:55px; left:535px; top:30px;\'>Room 1</p>';
    }
    else if (pattern === 'pattern2' && room_num === 'room1') {
        return '<img src= "../static/images/pattern2.png" style="width:1200px; position:absolute; top:5px; left:20px"/>\n' +
            '<p style=\'position:absolute; font-size:55px; left:535px; top:30px;\'>Room 1</p>';
    }
    else if (pattern === 'pattern1' && room_num === 'room2') {
        return '<img src= "../static/images/pattern1.png" style="width:1200px; position:absolute; top:5px; left:20px"/>\n' +
            '<p style=\'position:absolute; font-size:55px; left:535px; top:30px;\'>Room 2</p>';
    }
    else if (pattern === 'pattern2' && room_num === 'room2') {
        return '<img src= "../static/images/pattern2.png" style="width:1200px; position:absolute; top:5px; left:20px"/>\n' +
            '<p style=\'position:absolute; font-size:55px; left:535px; top:30px;\'>Room 2</p>';
    }
}

// Display the token according to its color
function display_token(color) {
    if (color === 'red') {
        return '<img src="../static/images/red.png" style="width:150px; position:absolute; top:220px; left:565px"/>'
    }
    else if (color === 'orange') {
        return '<img src="../static/images/orange.png" style="width:150px; position:absolute; top:220px; left:565px"/>'
    }
    else if (color === 'green') {
        return '<img src="../static/images/green.png" style="width:150px; position:absolute; top:220px; left:565px"/>'
    }
    else if (color === 'blue') {
        return '<img src="../static/images/blue.png" style="width:150px; position:absolute; top:220px; left:565px"/>'
    }
    else if (color === 'purple') {
        return '<img src="../static/images/purple.png" style="width:150px; position:absolute; top:220px; left:565px"/>'
    }
}

// Display gambling tokens in a circle formation
function display_gambling_tokens() {
    return '<img src="../static/images/red.png" style="width:150px; position:absolute; top:120px; left:565px"/>'
}

// Display the token according to its color in the Learning Rewards Phase
function display_rewards_token(color) {
    if (color === 'red') {
        return '<img src="../static/images/red.png" style="width:150px; position:absolute; top:100px; right:570px"/>'
    }
    else if (color === 'orange') {
        return '<img src="../static/images/orange.png" style="width:150px; position:absolute; top:100px; right:570px"/>'
    }
    else if (color === 'green') {
        return '<img src="../static/images/green.png" style="width:150px; position:absolute; top:100px; right:570px"/>'
    }
    else if (color === 'blue') {
        return '<img src="../static/images/blue.png" style="width:150px; position:absolute; top:100px; right:570px"/>'
    }
    else if (color === 'purple') {
        return '<img src="../static/images/purple.png" style="width:150px; position:absolute; top:100px; right:570px"/>'
    }
}

// Display the token according to its color in the Gambling Phase
function gambling_token_display(color) {
    if (color === 'red') {
        return '<img src="../static/images/red.png" style="width:150px; position:absolute; top:200px; right:545px"/>'
    }
    else if (color === 'orange') {
        return '<img src="../static/images/orange.png" style="width:150px; position:absolute; top:200px; right:545px"/>'
    }
    else if (color === 'green') {
        return '<img src="../static/images/green.png" style="width:150px; position:absolute; top:200px; right:545px"/>'
    }
    else if (color === 'blue') {
        return '<img src="../static/images/blue.png" style="width:150px; position:absolute; top:200px; right:545px"/>'
    }
    else if (color === 'purple') {
        return '<img src="../static/images/purple.png" style="width:150px; position:absolute; top:200px; right:545px"/>'
    }
}

// Set the participant response to the actual token value
function slider_tick_token_value(response) {
    let token_values = [0, 1, 3];
    for (let i = 0; i <= 100; i += 50) {
        if (response === i) {
            let value_index = i / 50;
            let token_value_chosen = token_values[value_index];
            return token_value_chosen;
        }
    }
}

var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<p style=\'font-size:70px;\'>+</p>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000
}

/* Learning Phase of the Experiment */
// Provide participant with instructions
/*
var learning_instructions = {
    timeline: [
    {
        type: 'html-keyboard-response',
        stimulus: '<img src="../static/images/i1.png" style="width: 100%; height: 100vh; overflow: hidden;"/>',
        choices: [" "]
    },
    {
        type: 'html-keyboard-response',
        stimulus: '<img src="../static/images/i2.png" style="width: 100%; height: 100vh; overflow: hidden;"/>',
        choices: [" "]
    }],
    type: 'image-keyboard-response',
    choices: [" "]
}

timeline.push(learning_instructions);

for (let j = 0; j < 2 ; j++){

    var show_first_room_num_left = {
        type: 'html-keyboard-response',
        stimulus: display_direc_room_num(LEFT, randomized_room_numbers[j]),
        choices: jsPsych.NO_KEYS,
        trial_duration: 500
    }

    timeline.push(show_first_room_num_left);

    for (let i = 0; i < 10; i++){
        var learn_left = {
            timeline: [
                {
                    type: 'html-keyboard-response',
                    stimulus: function () {
                        return display_pattern_room_num(randomized_room_patterns[j], randomized_room_numbers[j]) +
                        '    <img src="../static/images/leftarrow.png" style="width:120px; position:absolute; top:500px; left:350px"/>\n' +
                        '    <img src="../static/images/grayedrightarrow.png" style="width:120px; position:absolute; top:500px; left:800px"/>' +
                            learning_token1_str + learning_token2_str + learning_token3_str + learning_token4_str + learning_token5_str;
                    },
                    choices: ["ArrowLeft"]
                },
                {
                    type: 'html-keyboard-response',
                    stimulus: display_pattern_room_num(randomized_room_patterns[j], randomized_room_numbers[j]) +
                        '    <img src="../static/images/leftarrow.png" style="width:120px; position:absolute; top:500px; left:350px"/>\n' +
                        '    <img src="../static/images/square.png" style="width:130px; position:absolute; top:482px; left:345px"/>\n'  +
                        '    <img src="../static/images/grayedrightarrow.png" style="width:120px; position:absolute; top:500px; left:800px"/>',
                    choices: jsPsych.NO_KEYS,
                    trial_duration: 500
                },
                {
                    type: 'html-keyboard-response',
                    stimulus: display_pattern_room_num(randomized_room_patterns[j], randomized_room_numbers[j]) +
                        '    <img src="../static/images/leftarrow.png" style="width:120px; position:absolute; top:500px; left:350px"/>\n' +
                        '    <img src="../static/images/square.png" style="width:130px; position:absolute; top:482px; left:345px"/>\n'  +
                        '    <img src="../static/images/grayedrightarrow.png" style="width:120px; position:absolute; top:500px; left:800px"/>\n' +
                        display_token(learning_token_list(randomized_room_divergence[j], RIGHT, randomized_colors)[i]),
                    choices: jsPsych.NO_KEYS,
                    trial_duration: 500
                },
                fixation]
        }
        timeline.push(learn_left);
    }

    var show_first_room_num_right = {
        type: 'html-keyboard-response',
        stimulus: display_direc_room_num(RIGHT, randomized_room_numbers[j]),
        choices: jsPsych.NO_KEYS,
        trial_duration: 500
    }

    timeline.push(show_first_room_num_right);

    for (let i = 0; i < 10; i++){
        var learn_right = {
            timeline: [
                {
                    type: 'html-keyboard-response',
                    stimulus: function() {
                        return display_pattern_room_num(randomized_room_patterns[j], randomized_room_numbers[j]) +
                        '    <img src="../static/images/grayedleftarrow.png" style="width:120px; position:absolute; top:500px; left:350px"/> \n' +
                        '    <img src="../static/images/rightarrow.png" style="width:120px; position:absolute; top:500px; left:800px"/>' +
                            learning_token1_str + learning_token2_str + learning_token3_str + learning_token4_str + learning_token5_str;
                    },
                    choices: ["ArrowRight"]
                },
                {
                    type: 'html-keyboard-response',
                    stimulus: display_pattern_room_num(randomized_room_patterns[j], randomized_room_numbers[j]) +
                        '    <img src="../static/images/grayedleftarrow.png" style="width:120px; position:absolute; top:500px; left:350px"/> \n' +
                        '    <img src="../static/images/rightarrow.png" style="width:120px; position:absolute; top:500px; left:800px"/>\n' +
                        '    <img src="../static/images/square.png" style="width:130px; position:absolute; top:482px; left:795px"/>\n' +
                        display_token(learning_token_list(randomized_room_divergence[j], RIGHT, randomized_colors)[i]),
                    choices: jsPsych.NO_KEYS,
                    trial_duration: 500
                },
                {
                    type: 'html-keyboard-response',
                    stimulus: display_pattern_room_num(randomized_room_patterns[j], randomized_room_numbers[j]) +
                        '    <img src="../static/images/grayedleftarrow.png" style="width:120px; position:absolute; top:500px; left:350px"/> \n' +
                        '    <img src="../static/images/rightarrow.png" style="width:120px; position:absolute; top:500px; left:800px"/>\n' +
                        '    <img src="../static/images/square.png" style="width:130px; position:absolute; top:482px; left:795px"/>\n' +
                        display_token(learning_token_list(randomized_room_divergence[j], RIGHT, randomized_colors)[i]),
                    choices: jsPsych.NO_KEYS,
                    trial_duration: 500
                },
                fixation
            ]
        }
        timeline.push(learn_right);
    }
}

 */

/* Learning Rewards Phase */
var reward_trial_num = 0;
var token_value_index = 0;
var last_trial_correct;
var num_guesses = 0;

var gambling_instructions = {
    type: 'html-keyboard-response',
    stimulus: '<img src="../static/images/i3.png" style="width: 100%; height: 100vh; overflow: hidden;"/>',
    choices: [" "]
}

timeline.push(gambling_instructions);

var reward_notif = {
    type: "html-keyboard-response",
    stimulus: '<img src="../static/images/i4.png" style="width: 100%; height: 100vh; overflow: hidden;"/>',
    choices: [" "]
}

var reward_learning_procedure = {
    timeline: [
        {
            type: 'html-button-response',
            stimulus: jsPsych.timelineVariable('token') + '<p style=\'font-size:70px;\'>What is the current value of the token shown above?</p>',
            choices: [" ", " ", " "],
            button_html: '<button class="jspsych-btn" style="border-radius: 50%">%choice%</button>',
            on_finish: function (data) {
                function convert_button_values(button_num) {
                    if (button_num === 2) {
                        return 3;
                    }
                }
                // Score the response as correct or incorrect
                data.correct = jsPsych.pluginAPI.compareKeys(convert_button_values(data.response),
                    all_value_distributions[reward_trial_num][token_value_index]);
                if (!data.correct) {
                    num_guesses++;
                }
            }
        },
        {
            type: 'html-keyboard-response',
            stimulus: function(){
                last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
                if(last_trial_correct){
                    return "<p style='color:green; font-size:50px;'>CORRECT</p>";
                } else {
                    return "<p style='color:darkred; font-size:50px;'>INCORRECT</p>";
                }
            },
            trial_duration: 1000
        },
        {
            type: 'html-keyboard-response',
            stimulus: "<p style='font-size:100px'>+</p>",
            choices: jsPsych.NO_KEYS,
            trial_duration: 1000
        }
    ]
}

var loop_learning_token_rewards = {
    timeline: [reward_learning_procedure],
    loop_function: function(){
        if (last_trial_correct){
            token_value_index++;
            if (token_value_index === 5) {
                token_value_index = 0;
            }
            return false;
        }
        else {
            return true;
        }
    }
}

var reward_learning_procedure_tokens = {
    timeline: [loop_learning_token_rewards],
    timeline_variables: [
        { token: display_rewards_token(randomized_colors[0]) },
        { token: display_rewards_token(randomized_colors[1]) },
        { token: display_rewards_token(randomized_colors[2]) },
        { token: display_rewards_token(randomized_colors[3]) },
        { token: display_rewards_token(randomized_colors[4]) }
    ]
}

var loop_learning_rewards = {
    timeline: [reward_learning_procedure_tokens],
    loop_function: function(){
        if (num_guesses === 0){
            reward_trial_num++;
            return false;
        }
        else {
            num_guesses = 0;
            return true;
        }
    }
}

/* Gambling Phase */
var total_gambling_trial_num = 0;
var gambling_trial_num = 0;
var room_index_list = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
var rand_room_index_list = jsPsych.randomization.shuffle(room_index_list);
var participant_arrow_press;

var money_loss_tracker;

function select_gambling_token_color(divergence, direction_index) {
    // Get the probabilities of the tokens according to room divergence and direction chosen by user. Sample a token
    // based on the probability associated with the token color.
    const token_probability = token_probabilities.get(divergence)[direction_index];
    let chosen_token = jsPsych.randomization.sampleWithReplacement(randomized_colors, 1, token_probability);
    return chosen_token[0];
}

var initial_gambling_countdown = {
    // Display the room and the money lost timer
    type: 'html-keyboard-response',
    stimulus: function() {
        return display_pattern_room_num(randomized_room_patterns[rand_room_index_list[gambling_trial_num]], randomized_room_numbers[rand_room_index_list[gambling_trial_num]]) +
            '<p style=\'position:absolute; font-size:35px; left:1000px; top:10px\'>-$<span id="clock">0.00</span>' +
            '<img src="../static/images/leftarrow.png" style="width:120px; position:relative; top:400px; right:592px"/>' +
            '<img src="../static/images/rightarrow.png" style="width:120px; position:absolute; top:400px; right:460px"/>';
    },
    choices: ["ArrowLeft", "ArrowRight"],
    on_load: function() {
        const amount_lost = 0.01;
        var total_amount_lost = 0;
        var money_loss = function () {
            let rounded_total_amount_lost = (Math.round(total_amount_lost * 100) / 100).toFixed(2);
            document.querySelector('#clock').innerHTML = rounded_total_amount_lost.toString();
            total_amount_lost = total_amount_lost + amount_lost;
        }
        money_loss_tracker = setInterval(money_loss, 500);
    },
    on_finish: function (data) {
        clearInterval(money_loss_tracker);
        if (data.response === "arrowleft") {
            participant_arrow_press = LEFT;
        }
        else if (data.response === "arrowright") {
            participant_arrow_press = RIGHT;
        }
    }
}

var pressed_arrow = {
    type: 'html-keyboard-response',
    stimulus: function(){
        if (participant_arrow_press === LEFT) {
            return display_pattern_room_num(randomized_room_patterns[rand_room_index_list[gambling_trial_num]], randomized_room_numbers[rand_room_index_list[gambling_trial_num]]) +
                '<img src="../static/images/leftarrow.png" style="width:120px; position:relative; top:150px; right:63px"/>' +
                '<img src="../static/images/rightarrow.png" style="width:120px; position:absolute; top:410px; right:507px"/>' +
                '<img src="../static/images/square.png" style="width:130px; position:absolute; top:385px; right:630px"/>';
        } else if (participant_arrow_press === RIGHT) {
            return display_pattern_room_num(randomized_room_patterns[rand_room_index_list[gambling_trial_num]], randomized_room_numbers[rand_room_index_list[gambling_trial_num]]) +
                '<img src="../static/images/leftarrow.png" style="width:120px; position:relative; top:150px; right:63px"/>' +
                '<img src="../static/images/rightarrow.png" style="width:120px; position:absolute; top:410px; right:513px"/>' +
                '<img src="../static/images/square.png" style="width:130px; position:absolute; top:400px; right:510px"/>';
        }
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000
}


var display_gambling_token = {
    type: 'html-keyboard-response',
    stimulus: function(){
        if (participant_arrow_press === LEFT) {
            return display_pattern_room_num(randomized_room_patterns[rand_room_index_list[gambling_trial_num]], randomized_room_numbers[rand_room_index_list[gambling_trial_num]]) +
                '<img src="../static/images/leftarrow.png" style="width:120px; position:relative; top:150px; right:63px"/>' +
                '<img src="../static/images/rightarrow.png" style="width:120px; position:absolute; top:410px; right:507px"/>' +
                '<img src="../static/images/square.png" style="width:130px; position:absolute; top:385px; right:630px"/>' +
                gambling_token_display(select_gambling_token_color(randomized_room_divergence[rand_room_index_list[gambling_trial_num]], LEFT));
        }
        else if (participant_arrow_press === RIGHT) {
            return display_pattern_room_num(randomized_room_patterns[rand_room_index_list[gambling_trial_num]], randomized_room_numbers[rand_room_index_list[gambling_trial_num]]) +
                '<img src="../static/images/leftarrow.png" style="width:120px; position:relative; top:150px; right:63px"/>' +
                '<img src="../static/images/rightarrow.png" style="width:120px; position:absolute; top:410px; right:513px"/>' +
                '<img src="../static/images/square.png" style="width:130px; position:absolute; top:400px; right:510px"/>' +
                gambling_token_display(select_gambling_token_color(randomized_room_divergence[rand_room_index_list[gambling_trial_num]], RIGHT));
        }
    },
    on_finish: function() {
        console.log("This is total_gambling_trial_num before: ");
        console.log(total_gambling_trial_num);
        total_gambling_trial_num++;
        console.log("This is total_gambling_trial_num after: ");
        console.log(total_gambling_trial_num);
        gambling_trial_num++;
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000
}

var gambling_trials = {
    timeline: [initial_gambling_countdown, pressed_arrow, display_gambling_token, fixation],
    loop_function: function(){
        if (gambling_trial_num < 16) {
            return true;
        }
        else {
            gambling_trial_num = 0;
            return false;
        }
    }
}

var reward_gambling_trials = {
    timeline: [reward_notif, loop_learning_rewards, gambling_trials],
    loop_function: function(){
        console.log("total_gambling_trial_num (in all_reward_trials): ");
        console.log(total_gambling_trial_num);
        if (total_gambling_trial_num < 48) {
            return true;
        }
        else {
            return false;
        }
    }
}

timeline.push(reward_gambling_trials);

/* Probability Assessment */
/*
function randomize_20_questions(token_colors) {
    let question_content = [];
    for (let color_index = 0; color_index < token_colors.length; color_index++) {
        for (let room_index = 0; room_index < 2; room_index++) {
            for (let direction_index = 0; direction_index < 2; direction_index++)  {
                question_content.push([room_index, direction_index, token_colors[color_index]]);
            }
        }
    }
    return jsPsych.randomization.repeat(question_content, 1);
}

var randomized_question_content = randomize_20_questions(randomized_colors);

var question_room_number;
var question_direction;
var question_token_color;
var questions_index = 0;

function assign_labels() {
    if (randomized_room_numbers[randomized_question_content[questions_index][0]] === "room1") {
        question_room_number = "Room 1";
    }
    else if (randomized_room_numbers[randomized_question_content[questions_index][0]] === "room2") {
        question_room_number = "Room 2";
    }

    if (randomized_question_content[questions_index][1] === 0) {
        question_direction = "left";
    }
    else if (randomized_question_content[questions_index][1] === 1) {
        question_direction = "right";
    }

    question_token_color = randomized_question_content[questions_index][2];

}

assign_labels();

var questions_section = {
    type: 'html-slider-response',
    stimulus: function() {
        return display_rewards_token(question_token_color);
    },
    labels: ['0.0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1.0'],
    step: 10,
    prompt: function() {
        return "What is the probability of receiving the " + question_token_color + " token when pressing the " +
            question_direction + " arrow in " + question_room_number + "?  ";
    },
    on_finish: function() {
        questions_index++;
        assign_labels();
    }
}

var loop_questions_section = {
    timeline: [questions_section, fixation],
    loop_function: function() {
        if (questions_index < randomized_question_content.length) {
            return true;
        }
        else {
            return false;
        }
    }
}

timeline.push(loop_questions_section);

 */

/* Run the experiment. */
jsPsych.init({
    timeline: timeline
})
