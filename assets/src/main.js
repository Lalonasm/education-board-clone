const studentCreateForm = document.getElementById('student-create-form');
const msg = document.querySelector('msg');

/**
 * Student create form submit
 */
studentCreateForm.onsubmit = (e) => {
    e.preventDefault();


    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());
    console.log(data)

}

//form validation
if(!data.father||!data.mother||!data.roll||!data.reg){

}