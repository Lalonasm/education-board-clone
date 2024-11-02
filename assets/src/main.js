const studentCreateForm = document.getElementById('student-create-form');
const studentResultForm = document.getElementById('student-result-form');
const studentDataList = document.getElementById("student-data-list");
const msg = document.querySelector('.msg');
const btnClose = document.querySelector('btn-close')


//show all data
const getAllStudents = () => {
    //get all data from LS
    const data = JSON.parse(localStorage.getItem("students"));
    let listData = "";
    if (data) {
        data.map((item, index) => {
            listData += `
           <tr>
             <td>${index + 1}</td>
             <td>${item.name}</td>
             <td>${item.roll}</td>
             <td>${item.reg}</td>
             <td>${item.board}</td>
             <td>${timeAgo(item.createdAt)}</td>
             <td>

              ${item.results
                    ?
                    '<button class="btn btn-sm btn-success"  > View Result</button> '
                    :
                    '<button class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#student-result-form" onclick="addStudentResultModal(\'' + item.id + "')\" > Add Result</button>"


                }             



             </td>
             <td>
             <button class="btn btn-sm btn-info"><i class="fa fa-eye"></i></button>
             <button class="btn btn-sm btn-warning"><i class="fa fa-edit"></i></button>
             <button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
             </td>
           </tr>
           `
        });
    } else {
    }

    studentDataList.innerHTML = listData;
};
getAllStudents();

/**
 * Student create form submit
 */
studentCreateForm.onsubmit = (e) => {
    e.preventDefault();


    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());
    console.log(data);


    //form validation
    if (!data.father || !data.mother || !data.roll || !data.reg) {
        msg.innerHTML = createAlert("All field are required!")
    }
    else {
        let oldData = []
        //check data exist or not
        if (localStorage.getItem("students")) {
            oldData = JSON.parse(localStorage.getItem("students"))
        }
        //new push data
        oldData.push({
            ...data,
            id: createID(),
            createdAt: Date.now(),
            updatedAt: null,
            results: null
        })

        //send data to LS
        localStorage.setItem('students', JSON.stringify(oldData))

        e.target.reset();
        btnClose.click();
        getAllStudents();
    }
}

//add student modal

const addStudentResultModal = (id) => {
    studentResultForm.querySelector('input[name="id"]').value = id
}

//student result form
studentResultForm.onsubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries())

    console.log(data)


    //get all students
    const students = JSON.parse(localStorage.getItem('students'));

    //add result
    const updatedData = students.map((item) => {
        if (item.id === data.id) {
            return {
                ...item,
                results: {
                    bangla: data.bangla,
                    english: data.englis,
                    math: data.math,
                    science: data.science,
                    social: data.social,
                    religion: data.religion
                }
            }
        }
        else {
            return item;
        }
    })

    // now update LS
    localStorage.setItem("students", JSON.stringify(updatedData))

    e.target.reset();
    btnClose.click();
    getAllStudents();

}

