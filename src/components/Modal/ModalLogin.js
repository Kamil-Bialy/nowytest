import { useState } from "react";
import Modal from "./Modal";

function ModalLogin({data}){
  const [modal, setModal] = useState(data);
  console.log(data)
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }
  return(
    <div>
      <div>
        <p>witam</p>
      </div>
    </div>
  )
}
export default ModalLogin;