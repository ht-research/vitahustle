var quizModalFunction;
class quizModal extends HTMLElement {
    constructor() {
        super();

        const getEnabledORNot = localStorage.getItem('quiz_enabled');
        const quiz_step = localStorage.getItem('quiz_step') ? JSON.parse(localStorage.getItem('quiz_step')) : false ;
        var tempArray = [];
        const Quiz_question = JSON.stringify(["main_goal","fruits_veggies","exercise","motivated"]);
        const quiz_question = localStorage.setItem('quiz_question',Quiz_question);
        // console.log('quiz_step',quiz_step);

        if(quiz_step){
            tempArray = Object.keys(quiz_step);
        }
        if(tempArray.length>0){
            tempArray.map((item)=>{
                if(item.includes('step_')){
                    document.querySelectorAll('.item').forEach(function(e){
                        // console.log("e",e);
                        // console.log(e.querySelector('input').className.includes(item))
                        if(e.querySelector('input').className.includes(item) && quiz_step[item].answer.includes(e.querySelector('input').value) ){
                            e.querySelector('input').setAttribute("checked","");
                        }
                    })
                    // quiz_step[item].answer[0]
                }
            })
        }
        if(getEnabledORNot == 'true') {
            // document.querySelector('quiz-modal').remove();
            // window.location.href = '/';
        }


        quizModalFunction = this;
        this.stepObject = {
            active: 0,
            totalStep: window.totalStep            
        }
        this.skipObject = {
            enabled: false,
            step: 0
        }

        for (var i = 1; i <= window.totalStep; i++) {
            const ques = document.querySelector(`.quiz_step__${i}`).querySelector('.step__heading').dataset.heading;
            this.stepObject[`step_${i}`] = {}
            this.stepObject[`step_${i}`]['ques'] = ques;
            this.stepObject[`step_${i}`]['answer'] = [];
        }

        this.startedQuiz = document.querySelector('.btn--started');
        this.stepClose = document.querySelector('.stepClose');
        this.nextStepbtn = document.querySelector('.btn--next_step');
        this.prevStepbtn = document.querySelector('.btn--prev_step');


        // get active step data;
        this.getDataFromLocalStorage();

        this.init();
        this.skipBtn();
        const stepData = document.querySelectorAll('.item');
        stepData.forEach(stepItem => {
            stepItem.querySelector('input').addEventListener('change', this.variantChange.bind(this));
        })




        // nextbutton click event
        this.nextStepbtn.addEventListener('click', (e) => {
            e.preventDefault();
            const nextStep = e.currentTarget.dataset.next;
            const active = e.currentTarget.dataset.active;
            if (quizModalFunction.stepObject[`step_${active}`].answer.length == 0) {
                var errorMessage = document.querySelector(`.quiz_step__${active}`).querySelector('.step_subheading').innerHTML
                alert(errorMessage)
                return false
            }
            quizModalFunction.stepNext(active, nextStep);
        });


        // Previous button click 
        this.prevStepbtn.addEventListener('click', (e) => {
            e.preventDefault();
            const prevStep = e.currentTarget.dataset.prev;
            const active = e.currentTarget.dataset.active;
            quizModalFunction.setpPrev(active, prevStep);
        })


        KlaviyoSubscribe.attachToForms('#email_signup', {
            hide_form_on_success: true,
            custom_success_message: false,
            // success_url:"/products/magic-lawn-plan",
            success: function ($form) {
                console.log("$form",$form);
                console.log("Form data:", $form.serializeArray());

                quizModalFunction.loadingAnimation();
                // dataLayer.push({
                //     'event': 'Quiz Completed',
                //     'event_action': 'Klaviyo form submission',
                //     'event_label': 'Quiz submission',
                //     'event_value': ''
                // });
            }
        });

        // document.querySelector('.klaviyo_submit_button').addEventListener('click', );

        this.stepClose.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector('.quiz__modal').classList.add('hidden');
            document.querySelector('.quiz_started').classList.remove('active');
            localStorage.setItem('quiz_enabled', true);
            window.location.href = '/';
        })
    }

    skipBtn() {
        this.skipBtnElement = this.querySelector('.btn--skip');
        this.skipBtnElement.addEventListener('click', function(e) {
            e.preventDefault();
            quizModalFunction.skipObject.enabled = true;
            quizModalFunction.skipObject.step = quizModalFunction.stepObject.active;
            quizModalFunction.stepObject['skip'] = quizModalFunction.skipObject;

            document.querySelector('.quiz_started').classList.remove('active');
            document.querySelector('.quiz__klaviyoForm').classList.add('active');
            document.querySelector('#email_signup').classList.remove('quiz_klaviyo_form');
            
            localStorage.setItem('quiz_step', JSON.stringify(quizModalFunction.stepObject))
            if(quizModalFunction.skipObject.enabled) {
                document.querySelector(`input[name="skip"]`).value = quizModalFunction.skipObject.enabled;
            }
        })
    }

    variantChange(evt) {
        let currentElement_ID = evt.target.id
        let currentElement_type = $(`#${currentElement_ID}`).attr('type');
        const currentStep = evt.currentTarget.closest(`.step`).dataset.step;
        var stepArray = this.stepObject[`step_${currentStep}`]['answer'];

        const currentStepAnswer = evt.currentTarget.value;

        if (evt.currentTarget.checked) {
            if(currentElement_type=="radio"){
                stepArray[0] = currentStepAnswer;
            }
            else{

                stepArray.push(currentStepAnswer);
            }
        } else {

            const valueToRemove = 3;
            const index = stepArray.indexOf(currentStepAnswer);

            if (index !== -1) {
                stepArray.splice(index, 1);
            }
        }

        for (var i = 1; i <= window.totalStep; i++) {
            const answerValue = this.stepObject[`step_${i}`]['answer'];
            answerValue.forEach(ans => {
                document.querySelector(`input[value="${ans}"]`).checked = true;
            })

            const question = this.stepObject[`step_${i}`]['ques'];
            document.querySelector(`input[name="${question}"]`).value = JSON.stringify(this.stepObject[`step_${i}`]['answer']);

        }

        // console.log('this.stepObject========>', this.stepObject);

    }

    init() {

        this.startedQuiz.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector('.quiz__modal').classList.remove('hidden');
            // document.querySelector('.quiz-wrapper').classList.add('hidden');
            document.querySelector('.quiz_started').classList.add('active');
            quizModalFunction.stepObject.active = 1
            quizModalFunction.stepStarted();

        })


    }

    stepStarted() {
        localStorage.setItem('quiz_step', JSON.stringify(this.stepObject))
    }

    stepNext(active, next) {
        const activeStep = parseInt(active);
        const nextStep = parseInt(next);
        this.stepObject.active = nextStep;
        this.removeActiveStep();

        if (this.stepObject.active > this.stepObject.totalStep) {
            this.nextStepbtn.classList.add('hidden');
            document.querySelector('.quiz_started').classList.remove('active');
            document.querySelector('.quiz__klaviyoForm').classList.add('active');
        }

        if (next > 1) {
            this.prevStepbtn.classList.remove('hidden');
        }
        if (document.querySelector(`.quiz_step__${activeStep}`) != null) {
            document.querySelector(`.quiz_step__${activeStep}`).classList.remove('active');
        }
        if (document.querySelector(`.quiz_step__${nextStep}`) != null) {
            document.querySelector(`.quiz_step__${nextStep}`).classList.add('active');
        }
        this.progressBar();

        localStorage.setItem('quiz_step', JSON.stringify(this.stepObject))
        quizModalFunction.getNextStepNumber(nextStep);
        quizModalFunction.getPrevStepNumber(nextStep);


    }

    setpPrev(active, prev) {
        const activeStep = parseInt(active);
        const prevStep = parseInt(prev);
        this.stepObject.active = prevStep;
        this.nextStepbtn.classList.remove('hidden');
        this.removeActiveStep()
        if (prev == 1) {
            this.prevStepbtn.classList.add('hidden');
        }
        if (document.querySelector(`.quiz_step__${activeStep}`) != null) {
            document.querySelector(`.quiz_step__${activeStep}`).classList.remove('active');
        }
        if (document.querySelector(`.quiz_step__${prevStep}`) != null) {
            document.querySelector(`.quiz_step__${prevStep}`).classList.add('active');
        }
        this.progressBar();

        localStorage.setItem('quiz_step', JSON.stringify(this.stepObject))
        quizModalFunction.getPrevStepNumber(prevStep);
        quizModalFunction.getNextStepNumber(prevStep);
    }

    progressBar() {
        const processBar = document.querySelector('.progressBar');
        const percentageCount = (100 * parseInt(this.stepObject.active)) / this.stepObject.totalStep;
        processBar.querySelector('span').style.width = `${percentageCount}%`;
        document.querySelector(`.activestep`).innerHTML = this.stepObject.active;
    }

    removeActiveStep() {
        document.querySelectorAll('.step').forEach(item => {
            item.classList.remove('active');
        })
    }

    getDataFromLocalStorage() {
        const getstepData = localStorage.getItem('quiz_step');
        
        if (getstepData != undefined || getstepData != null) {
            this.stepObject = JSON.parse(getstepData)
            this.stepNext(this.stepObject.active - 1, this.stepObject.active);
            if (this.stepObject.active > this.stepObject.totalStep) {
                this.stepObject = {
                    ...this.stepObject,
                    active: 1
                }
                if (document.querySelector('.quiz-wrapper') != null) {
                    document.querySelector('.quiz-wrapper').classList.add('hidden');
                }
            
                document.querySelector('.quiz__modal').classList.remove('hidden');
                document.querySelector('.quiz_started').classList.add('active');
                document.querySelector('.quiz__klaviyoForm').classList.remove('active');
                document.querySelector('.step.quiz_step__1').classList.add('active');
                document.querySelector('.btn.btn--prev_step').classList.add('hidden');
                document.querySelector('.btn.btn--next_step').classList.remove('hidden');
                document.querySelector('.activestep').textContent = 1;
                this.progressBar();
 
            } else {
                if (document.querySelector('.quiz-wrapper') != null) {
                    document.querySelector('.quiz-wrapper').classList.add('hidden');
                }
                document.querySelector('.quiz__modal').classList.remove('hidden');
                document.querySelector('.quiz_started').classList.add('active');
            }
            this.getNextStepNumber(this.stepObject.active)
            this.getPrevStepNumber(this.stepObject.active)

            if (this.stepObject.active > this.stepObject.totalStep) {
                for (var i = 1; i <= window.totalStep; i++) {
                    const answerValue = this.stepObject[`step_${i}`]['answer'];
                    answerValue.forEach(ans => {
                        document.querySelector(`input[value="${ans}"]`).checked = true;
                    })

                    const question = this.stepObject[`step_${i}`]['ques'];
                    document.querySelector(`input[name="${question}"]`).value = JSON.stringify(this.stepObject[`step_${i}`]['answer']);
                }
            }
            
            if(this.stepObject.skip != undefined) {
                if(this.stepObject.skip.enabled) {
                    document.querySelector('.quiz_started').classList.remove('active');
                    document.querySelector('.quiz__klaviyoForm').classList.add('active');
                    document.querySelector(`input[name="skip"]`).value = this.stepObject.skip.enabled;
                }
            }
        }
    }

    getNextStepNumber(currentStep) {
        this.nextStepbtn.setAttribute('data-next', parseInt(currentStep) + 1);
        this.nextStepbtn.setAttribute('data-active', parseInt(currentStep));
    }

    getPrevStepNumber(currentStep) {
        this.prevStepbtn.setAttribute('data-prev', parseInt(currentStep) - 1);
        this.prevStepbtn.setAttribute('data-active', parseInt(currentStep));
    }

    loadingAnimation() {
        document.querySelector('.quiz__klaviyoForm').classList.remove('active');
        document.querySelector('.loading__screen').classList.add('active');
        var elem = document.getElementById("loading_bar");
        var width = 1;
        var id = setInterval(frame, 20);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                if(window.discountCode != undefined){
                  window.location.href = `https://vitahustle.com/discount/${window.discountCode}?redirect=/products/one-superfood-protein-shake-strawberry&quiz_results_redirect=true`;

                } else{
                  window.location.href = `https://vitahustle.com/products/one-superfood-protein-shake-strawberry?quiz_results_redirect=true`;

                }
                
              

            } else {
                width++;
                elem.style.width = width + '%';
            }
        }
    }
}

customElements.define('quiz-modal', quizModal);