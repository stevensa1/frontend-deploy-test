const loadTag = () => `
    <div class="loader" >
        <div class="inner_loader"></div>
        <div class="inner_loader"></div>
        <div class="inner_loader"></div>
        <div class="inner_loader"></div>
    </div>`;

const errorTag = () => `
    <h3 class="failed">
        <i class="fa-solid fa-triangle-exclamation fa-lg" style="color: #ff4d4d; margin-bottom: 10px"></i>
        Error data failed to load
    </h3>`;

const Handler = {
  loaderRender(tag) {
    const loader = document.getElementById('loader');
    const id = tag;
    loader.innerHTML = loadTag();

    // loader
    setTimeout(async () => {
      id.style.display = 'grid';
      loader.remove();
    }, 1000);
  },

  errorRender() {
    setTimeout(() => {
      document.getElementById('failed').innerHTML = errorTag();
    }, 1500);
    errorTag();
  },
};

export default Handler;
