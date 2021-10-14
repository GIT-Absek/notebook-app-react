import React from 'react'

const About = () => {

    return (
        <div>
            <div class="accordion accordion-flush " id="accordionFlushExample">
                <div class="accordion-item border border-dark">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            About
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse border border-dark" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">This Notebook App can be used to store your notes.</div>
                    </div>
                </div>
                <div class="accordion-item border border-dark">
                    <h2 class="accordion-header" id="flush-headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Security
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse  border border-dark" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">This Notebook App is secure and safe, your notes are in safe hands.</div>
                    </div>
                </div>
                <div class="accordion-item border border-dark">
                    <h2 class="accordion-header" id="flush-headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            Facts
                        </button>
                    </h2>
                    <div id="flush-collapseThree" class="accordion-collapse collapse border border-dark" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">This Notebook App is developed in ReactJS Functional Components, HTML and Bootstrap framework of CSS.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
