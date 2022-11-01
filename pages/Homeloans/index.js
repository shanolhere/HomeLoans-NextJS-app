import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Homeloanstyles from "../styles/HomeloanIndex.module.css";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { GoCheck } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft
} from "react-icons/fa";
import Link from "next/link";
import Accordion from "./Accordion";

const Homeloans = () => {
  const router = useRouter();
  const [loanData, setloanData] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch("https://mailalerts.sabiyatabassum.repl.co");
      const data = await res.json();

      setloanData([...data.hits]);
    } catch (err) {
      console.error(err.message, "from catch");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //Find the particular data from id
  const requiredData = loanData.filter((data) => {
    return data.uuid === router.query.id;
  });

  return (
    <div className={styles.App}>
      <Navbar />

      <div className={Homeloanstyles.HomeloanContainer}>
        <Link href="/" className={Homeloanstyles.back}>
          <div className={Homeloanstyles.backContainer}>
            <FaRegArrowAltCircleLeft />
            <p>Go Back</p>
          </div>
        </Link>
        <div className={Homeloanstyles.fluidContainer}>
          {loanData.length === 0 ? (
            <p>Loading...</p>
          ) : (
            requiredData.map((data) => {
              return (
                <div className={Homeloanstyles.container} key={data.uuid}>
                  <div className={Homeloanstyles.title}>
                    <h3>{data.name}</h3>
                  </div>

                  <div className={Homeloanstyles.externalContainer}>
                    <img
                      src={data.companyLogo}
                      className={styles.companyLogo}
                      alt="companyLogo"
                    />
                    <a
                      className={styles.goSite}
                      href={data.gotoSiteUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p>Go to Site </p>
                      <FaRegArrowAltCircleRight />
                    </a>
                  </div>

                  <div className={Homeloanstyles.rates}>
                    <div className={Homeloanstyles.rate1}>
                      <p className={styles.rateHeading}>Advertised rate </p>
                      <p className={styles.ratePercent}>
                        {data.advertisedRate} <small>%</small>
                      </p>
                    </div>

                    <div className={Homeloanstyles.rate2}>
                      <p className={styles.rateHeading}>Comparison rate </p>
                      <p className={styles.ratePercent}>
                        {data.comparisonRate} <small>%</small>
                      </p>
                    </div>

                    <div className={Homeloanstyles.rate3}>
                      <p className={styles.rateHeading}>maxLVR </p>
                      <p className={styles.ratePercent}>{data.maxLVR}</p>
                    </div>
                    <div className={Homeloanstyles.rate3}>
                      <p className={styles.rateHeading}>minLVR </p>
                      <p className={styles.ratePercent}>{data.minLVR}</p>
                    </div>
                  </div>

                  <div className={Homeloanstyles.proContainer}>
                    <div className={Homeloanstyles.pros}>
                      <p className={Homeloanstyles.heading}>Pros:</p>
                      {data.pros.map((pro, index) => {
                        return (
                          <p key={index} className={styles.pro}>
                            <GoCheck
                              size={18}
                              className={Homeloanstyles.goCheck}
                            />
                            {pro}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                  <div className={Homeloanstyles.proContainer}>
                    <div className={Homeloanstyles.cons}>
                      <p className={Homeloanstyles.heading}>Cons:</p>
                      {data.cons.map((cons, index) => {
                        return (
                          <p key={index} className={styles.pro}>
                            <IoMdClose
                              size={18}
                              className={Homeloanstyles.mdClose}
                            />
                            {cons}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  <div className={Homeloanstyles.proContainer}>
                    <div className={Homeloanstyles.typeContainer}>
                      <p className={Homeloanstyles.heading}>
                        About the Company:
                      </p>

                      <div className={Homeloanstyles.companyName}>
                        <p className={Homeloanstyles.heading}>Name:</p>
                        {data.specials[0] ? (
                          <p>{data.specials[0].company.name}</p>
                        ) : (
                          <p> NA </p>
                        )}
                      </div>

                      <div className={Homeloanstyles.types}>
                        <p className={Homeloanstyles.heading}>Type:</p>
                        {data.companyType.map((type, index) => {
                          return (
                            <span key={type} className={styles.pro}>
                              {type}
                            </span>
                          );
                        })}
                      </div>
                      <div className={Homeloanstyles.companyName}>
                        <p className={Homeloanstyles.heading}>Code:</p>
                        {data.specials[0] ? (
                          <p>{data.specials[0].company.slug}</p>
                        ) : (
                          <p> NA </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={Homeloanstyles.proContainer}>
                    <p className={Homeloanstyles.heading}>FAQs:</p>
                    <div className={Homeloanstyles.faqWholeContainer}>
                      <div className={Homeloanstyles.faqContainer}>
                        {data.faqs.map((faq, index) => {
                          return <Accordion faq={faq} index={index} />;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Homeloans;
