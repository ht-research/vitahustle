var quizModalFunction;
class quizModal extends HTMLElement {
    constructor() {
        super();

        quizModalFunction = this;
        this.stepObject = {
            active: 0,
            totalStep: window.totalStep
        }

        for (var i = 1; i <= window.totalStep; i++) {
            const ques = document.querySelector(`.quiz_step__${i}`).querySelector('.step__heading').innerHTML;
            this.stepObject[`step_${i}`] = {}
            this.stepObject[`step_${i}`]['ques'] = ques;
            this.stepObject[`step_${i}`]['answer'] = [];
        }

        this.startedQuiz = document.querySelector('.btn--started');
        this.nextStepbtn = document.querySelector('.btn--next_step');
        this.prevStepbtn = document.querySelector('.btn--prev_step');

        // get active step data;
        this.getDataFromLocalStorage();

        this.init();

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
                alert('Choose any one .....')
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

        document.querySelector('.klaviyo_submit_button').addEventListener('click', this.loadingAnimation.bind(this));
    }

    variantChange(evt) {
        const currentStep = evt.currentTarget.closest(`.step`).dataset.step;
        var stepArray = this.stepObject[`step_${currentStep}`]['answer'];

        const currentStepAnswer = evt.currentTarget.value;

        if (evt.currentTarget.checked) {
            stepArray.push(currentStepAnswer);
        } else {

            const valueToRemove = 3;
            const index = stepArray.indexOf(currentStepAnswer);

            if (index !== -1) {
                stepArray.splice(index, 1);
            }
        }


        // console.log('this.stepObject========>', this.stepObject);

    }

    init() {
        this.startedQuiz.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector('.quiz-wrapper').classList.add('hidden');
            document.querySelector('.quiz_started').classList.add('active');
            quizModalFunction.stepObject.active = 1
            quizModalFunction.stepStarted()
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
                document.querySelector('.quiz-wrapper').classList.add('hidden');
            } else {
                document.querySelector('.quiz-wrapper').classList.add('hidden');
                document.querySelector('.quiz_started').classList.add('active');
            }
            this.getNextStepNumber(this.stepObject.active)
            this.getPrevStepNumber(this.stepObject.active)

            for (var i = 1; i <= window.totalStep; i++) {
                const answerValue = this.stepObject[`step_${i}`]['answer'];
                answerValue.forEach(ans => {
                    document.querySelector(`input[value="${ans}"]`).checked = true
                })
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

    loadingAnimation(evt) {
        evt.preventDefault();
        document.querySelector('.quiz__klaviyoForm').classList.remove('active');
        document.querySelector('.loading__screen').classList.add('active');
        var elem = document.getElementById("loading_bar");
        var width = 1;
        var id = setInterval(frame, 20);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width++;
                elem.style.width = width + '%';
            }
        }
    }
}

customElements.define('quiz-modal', quizModal);