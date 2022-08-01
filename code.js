const CAPSULE_COUNT = 100;

const nameInput = document.querySelector("#guest");
const capInput = document.querySelector("#bookingCapsule");
const checkoutInput = document.querySelector("#checkOutCapsule");
const bookForm = document.querySelector("#bookForm");
const msg = document.querySelector("#message");
const checkoutForm = document.querySelector("#checkoutForm"); // check out room input

const book = (evt) => {
  evt.preventDefault();
  const capNum = capInput.value;
  const name = nameInput.value;
  const capsule = document.querySelector(`#capsuleLabel${capNum}`);
  const guest = document.querySelector(`#guest${capNum}`);
  if (!name || !capNum) {
    let emptyErrorText = "";
    {
      emptyErrorText += `<div>
    <span id ="msgLabel" class="alert-danger">All fields must be filled out to book</span></div>`;
    }
    messages.innerHTML = emptyErrorText;
  } else if (capInput.value > CAPSULE_COUNT) {
    let notACapMsg = "";
    {
      notACapMsg += `<div>
    <span id ="msgLabel" class="alert-danger">That is not a valid capsule.</span></div>`;
    }
    messages.innerHTML = notACapMsg;
  } else if (
    guest.innerHTML != "Unoccupied" &&
    capsule.classList != "badge-success"
  ) {
    let overbookMsg = "";
    {
      overbookMsg += `<div>
    <span id ="msgLabel" class="alert-danger">That capsule is occupied.</span></div>`;
    }
    messages.innerHTML = overbookMsg;
  } else {
    guest.innerText = name;
    capsule.classList.remove("badge-success");
    capsule.classList.add("badge-danger");

    let bookingComplete = "";
    {
      bookingComplete += `<div>
    <span id ="msgLabel" class="alert-info">Guest:&nbsp; ${name} booked in capsule ${capNum}. </span></div>`;
    }
    messages.innerHTML = bookingComplete;
  }
};

function init() {
  const capsuleContainer = document.getElementById("capsules");

  let html = "";
  for (let i = 0; i < CAPSULE_COUNT; i++) {
    html += `<div>
            <span id="capsuleLabel${
              i + 1
            }" class="badge badge-pill badge-success">Capsule #${i + 1}</span>
            &nbsp;<span id="guest${i + 1}">Unoccupied</span>
        </div>`;
  }

  capsuleContainer.innerHTML = html;
}
init();

const checkout = (evt, checkoutInput) => {
  evt.preventDefault();
  const capNum = capInput.value;
  const name = nameInput.value;
  const checkoutNum = checkoutInput.value;
  const guest = document.querySelector(`#guest${capNum}`);
  const capsule = document.querySelector(`#capsuleLabel${capNum}`);
  if (checkoutNum >= 101) {
    let notACapMsg = "";
    {
      notACapMsg += `<div>
    <span id ="msgLabel" class="alert alert-danger">That is not a valid capsule.</span></div>`;
    }
    messages.innerHTML = notACapMsg;
  } else if (checkoutNum <= 100 && guest.innerHTML == "Unoccupied") {
    let invalid = "";
    {
      invalid += `<div>
    <span id ="msgLabel" class="alert-danger">That capsule is unoccupied.</span></div>`;
    }
    messages.innerHTML = invalid;
  } else if (checkoutNum === capNum || name) {
    const guest = document.querySelector(`#guest${capNum}`);
    guest.innerText = "Unoccupied";
    capsule.classList.remove("badge-danger");
    capsule.classList.add("badge-success");
    let html = "";
    {
      html += `<div>
  <span id ="confMsg" class="alert alert-info">Guest:&nbsp;
  ${name} has checked out of capsule #${capNum}. </span></div>`;
    }
    messages.innerHTML = html;
  } else {
    let html = "";
    {
      html += `<div>
<span id ="confMsg" class="alert alert-danger">Error</span></div>`;
    }
    messages.innerHTML = html;
  }
};
checkoutForm.addEventListener("submit", checkout);

bookForm.addEventListener("submit", book);
//current questions
//
