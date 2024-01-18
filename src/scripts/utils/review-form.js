/* eslint-disable no-alert */

import ENDPOINT from '../globals/end-point';

const form = () => `
    <form action="" id="review_form">
        <h1>Tambah Review</h1>
        <input type="text" id="nama" maxlength="30" class="form-control" placeholder="Masukkan nama anda" required>
        <span>
          <textarea type="text" id="review" style="resize: none" rows="4" class="form-control" placeholder="Masukan review..." required></textarea>
        </span>
        <button type="submit" class="reveiw_btn">Kirim</button>
    </form>`;

const ReviewForm = {
  async init({ reviewConteiner, idRestaurant }) {
    this._formContainer = reviewConteiner;
    this._id = idRestaurant;

    this._renderForm();
  },

  _renderForm() {
    this._formContainer.innerHTML = form();
    this.formHandler();
  },

  async formHandler() {
    const reviewForm = document.getElementById('review_form');

    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('nama');
      const review = document.getElementById('review');

      if (name.value === '' || review.value === '') {
        alert('Ensure you input a value in both fields!');
      } else {
        const names = name.value.length >= 30 ? `${name.value.slice(1, 30)}...` : name.value;
        this.submitHandler(names, review.value);
      }
    });
  },

  async submitHandler(name, review) {
    const requestData = {
      id: this._id,
      name,
      review,
    };

    fetch(ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Request failed with status: ${response.status}`);
      })
      .then(
        this.successHandler,
      )
      .catch(() => {
        // Handle any errors that occurred during the fetch
        alert('Error gagal menambahkan review');
      });
  },

  successHandler() {
    alert('Berhasil menambahkan review');
    // eslint-disable-next-line no-restricted-globals
    window.location.reload(true);
  },
};

export default ReviewForm;
