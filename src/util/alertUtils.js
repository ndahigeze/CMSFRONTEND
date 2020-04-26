import Swal from 'sweetalert2/dist/sweetalert2.js';

export const alert = {
  success: msg => {
    Swal.fire({
      icon: "success",
      position: "top-end",
      showConfirmButton: false,
      toast: "true",
      timer: 5000,
      text: "   " + msg
    });
  },
  promptDelete: (data, deleteFn) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete !"
    }).then(result => {
      if (result.value) {
        deleteFn(data);
      }
    });
  },
  promptWithContent: (placeholder, callFn, param) => {
    Swal.fire({
      input: 'textarea',
      inputPlaceholder: placeholder,
      showCancelButton: true
    }).then(result => {
      if (result.value) {
        callFn(result.value, param);
      }
    })
  },
  promptTopUp: (callFn, param) => {
    Swal.fire({
      html: "<input type='number' placeholder='Amount' id='amountTop' class='form-control form-control-alternative' min=0/>",
      confirmButtonText: "Top Up",
      showCancelButton: true,
      preConfirm: () => [document.getElementById('amountTop').value]
    }).then(result => {
      if (result.value) {
        callFn(result.value[0], param);
      }
    })
  },
  error: msg => {
    Swal.fire({
      icon: "error",
      position: "center",
      showConfirmButton: false,
      timer: 5000,
      html: " " + msg
    });
  },
  promptPay: (callFn, param) => {
    Swal.fire({
      html: "<input type='number' placeholder='Amount' id='amountTop' class='form-control form-control-alternative' min=0/>",
      confirmButtonText: "Pay Restaurant",
      showCancelButton: true,
      preConfirm: () => [document.getElementById('amountTop').value]
    }).then(result => {
      if (result.value) {
        callFn(result.value[0], param);
      }
    })
  }
}