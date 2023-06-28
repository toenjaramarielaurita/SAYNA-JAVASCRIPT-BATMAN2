$(document).ready(function () {

    //DEFINITION DES INDEPENDANTE AU QUIZZ

    //Click sur le bouton demarrer le quizz
    $('#demarrer').click(function () {
        $('#quiz-box').slideDown(1000);
        $('#entete').slideUp(2000);



        $.ajax({
            url: './assets/json/questions.json',
            datatype: 'json',
            success: (questions) => {

                //DECLARATION DES VARIABLES LOCALE
                let totalPoint = 0;
                let currentQuiz = 0;
                let totalQuiz = questions.length;

                $('#total').text(totalQuiz);
                setFormulaire(questions[currentQuiz].question, questions[currentQuiz].response, currentQuiz );
                
                $('#question-suivante').click(function () {
                    let chooseResponse = isChooseResponse(questions, currentQuiz);
                    let isChoose = chooseResponse[0];
                    let userResponse = chooseResponse[1];
        
                    if(currentQuiz < (totalQuiz - 1)) {
        
                        if(isChoose) {
                            
                            $('#quiz-box').slideUp(1000).slideDown(1000);
                            currentQuiz++;
        
                            setTimeout(() => {
                                if (currentQuiz < totalQuiz) {
                                    setFormulaire(questions[currentQuiz].question, questions[currentQuiz].response, currentQuiz);
                                }
                                
                            }, 1000);
        
                            if (currentQuiz === totalQuiz) {
                                $('#btn-next').val('Voir le resultat').attr("id", "btn-resume");
                            }
                            console.log(userResponse);
                            totalPoint = userResponse === true ? (totalPoint + 1) : totalPoint;
                            userResponse = "false";
                            console.log(totalPoint);
                        }
                    }
                    else {
                            if (isChoose) {
                                console.log(userResponse);
                                totalPoint = userResponse === true ? (totalPoint + 1) : totalPoint;
                                console.log(totalPoint);
                                if(totalPoint <= (totalQuiz / 3)) {
                                    $('#titre').text("0" + totalPoint + "/" + totalQuiz + "c'est pas tout à fait ça...");
                                    $('#msg-result').text("Oula ! Heureusement que le Riddler est sous verrous... Il faut que <br> vous vous repassiez les films, cette fois en enlevant peut-être le <br> masque qui vous a bloqué la vue! Aller, rien n'est perdu!");
        
                                }else if (totalPoint <= (totalQuiz / 2)) {
                                    $('#titre').text(totalPoint + "/" + totalQuiz + " pas mal !");
                                    $('#msg-result').text("Encore un peu d'entrainement avec le Chevalier Noir vous serait <br> bénéfique, mais vous pouvez marcher la tête haute vos <br> connaissances sont là. A vous de les consolider, foncez Gotham est <br> votre terrain de chasse!.");
                                }else {
                                    $('#titre').text(totalPoint + "/" + totalQuiz + " bravo !");
                                    $('msg-result').text("Vous êtes véritablement un super fan de l'univers de Batman! <br> Comics, films, rien ne vous échappe. Bruce Wayne a de quoi être fier, <br> Gotham est en paix et Batman peut prendre sa retraite, vous veillez <br> aux grains!")
                                }
                                $('#popup-result').css("display", "flex");
                            }
                        }
                    
                });
            },
            error: function (questions) {
                console.log(questions);
            }
        });

    });

    function setFormulaire(question, response, nbreQuiz) {
        $('#img-illustrate').attr("src", "./assets/Illustrations_game/Batgame_" + (3 + nbreQuiz) + ".png");
        $('#current-question').text(nbreQuiz + 1);
        $('#question-quizz').empty();
        $('#question-quizz').append("<p class='question' id='question'></p>");
        $('#question').text(question);
        $('#choisirReponse').empty();
        for (let i = 0; i < response.length; i++) {
            $('#choisirReponse').append("<div class='qcm' id='qcm"+ i + "'></div>");
            $('#qcm'+i).append("<input type='checkbox' name='choix' id='checkbox" + i + "'>");
            $('#qcm'+i).append("<label for='checkbox" + i + "' class='response' id='" + i + "'>"+ response[i].text + "</label>");
        
                    // $('#' + i).append("<p id='response" + i + "'>" + questions[currentQuiz].response[i].text + "</p>");
        }
        $('#qcm').append("<span id='error-message'></span>");
    }

    function isChooseResponse(questions, currentQuiz) {
        //Variable Locale
        let notChoose = true;
        let userResponse = false;

        for (let i = 0; i < questions[currentQuiz].response.length; i++) {
            if ($('#checkbox' + i).is(":checked")) {
                notChoose = false;
                userResponse = questions[currentQuiz].response[i].isGood;
                console.log(questions[currentQuiz].response[i].isGood);
            }
        }

        if (notChoose) {
            $('#error-message').css("color", "red").text("Choisissez une reponse");
            return [false, userResponse];
        } else {
            $('#error-message').css("color", "black").text("");
            return [true, userResponse];
        }
    }

    //Fin bouton demarrer

    //Effet scroll
    $('#top-arrow').click(function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    $('#down-arrow').click(function () {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });




});


