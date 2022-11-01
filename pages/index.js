import { useState, useEffect } from "react";
import { GoCheck } from "react-icons/go";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import styles from "./styles/Home.module.css";
import Navbar from "./components/Navbar";
import Link from "next/link";

export default function Index() {
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

  return (
    <div className={styles.App}>
      <Navbar />
      <div className={styles.loanContainer}>
        {loanData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          loanData.map((data) => {
            return (
              <div className={styles.container} key={data.uuid}>
                <div className={styles.titleContainer}>
                  <p className={styles.title}>{data.name}</p>
                </div>
                <div className={styles.rates}>
                  <div className={styles.rate1}>
                    <p className={styles.rateHeading}>Advertised rate </p>
                    <p className={styles.ratePercent}>
                      {data.advertisedRate} <small>%</small>
                    </p>
                  </div>

                  <div className={styles.rate2}>
                    <p className={styles.rateHeading}>Comparison rate </p>
                    <p className={styles.ratePercent}>
                      {data.comparisonRate} <small>%</small>
                    </p>
                  </div>
                </div>

                <div className={styles.pros}>
                  {data.pros.slice(0, 4).map((item, index) => {
                    return (
                      <p key={index} className={styles.pro}>
                        <GoCheck
                          color="grey"
                          size={18}
                          className={styles.goCheck}
                        />
                        {item}
                      </p>
                    );
                  })}
                </div>

                <div className={styles.moreInfoContainer}>
                  <div className={styles.checkBoxContainer}>
                    <input type="checkbox" />
                    <p>Compare </p>
                  </div>
                  <Link
                    href={{
                      pathname: "/Homeloans",
                      query: { id: data.uuid }
                    }}
                    className={styles.moreInfo}
                  >
                    More Information
                  </Link>
                </div>

                <div className={styles.externalContainer}>
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
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
