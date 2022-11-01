import Homeloanstyles from "../styles/HomeloanIndex.module.css";
import React, { useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const Accordion = ({ faq, index }) => {
  const [showFaq, setShowFaq] = useState(false);

  const showFaqHandler = () => {
    setShowFaq(true);
  };

  const unShowFaqHandler = () => {
    setShowFaq(false);
  };

  return (
    <div className={Homeloanstyles.faq} key={index}>
      <div className={Homeloanstyles.faqBox}>
        <p className={Homeloanstyles.faqHeader}>{faq.header}</p>
        {!showFaq && (
          <button
            className={Homeloanstyles.plusBtn}
            onClick={() => showFaqHandler(faq.body)}
          >
            <AiOutlinePlusCircle size={18} />
          </button>
        )}
        {showFaq && (
          <button
            className={Homeloanstyles.minusBtn}
            onClick={unShowFaqHandler}
          >
            <AiOutlineMinusCircle size={18} />
          </button>
        )}
      </div>
      {showFaq && <p className={Homeloanstyles.faqBody}>{faq.body}</p>}
    </div>
  );
};
export default Accordion;
