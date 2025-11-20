import React from 'react'
import CommitteeCard from './committee-card';
import Link from 'next/link';
import { motion } from "framer-motion";

const CommitteeCards = () => {
      const committees = [
        {// for redirect use /conference/committee-name. eg. /conference/unhrc
          // name: "UNGA",
          redirect: " ",
          imageUrl:
            "https://mun-website-images.s3.ap-south-1.amazonaws.com/tba.jpg",
        //   details:
        //     "The United Nations General Assembly (UNGA) is the main deliberative, policymaking, and representative body of the UN.",
        },
        {
          // name: "UNHRC",
          redirect: " ",
          imageUrl:
            "https://mun-website-images.s3.ap-south-1.amazonaws.com/tba.jpg",
          // details:
          //   "The United Nations Human Rights Council (UNHRC) addresses human rights violations and promotes the protection of fundamental freedoms worldwide.",
        },

        {
          // name: "UNCSW",
          redirect: " ",
          imageUrl:
            "https://mun-website-images.s3.ap-south-1.amazonaws.com/tba.jpg",
          // details:
          //   "The United Nations Commission on the Status of Women (UNCSW) promotes gender equality and the empowerment of women globally.",
        },

        {
          // name: "AIPPM",
          redirect: " ",
          imageUrl:
            "https://mun-website-images.s3.ap-south-1.amazonaws.com/tba.jpg",
          // details:
          //   "The All India Political Parties Meet (AIPPM) is a platform for political representatives to discuss national issues.",
        },
        {
          // name: "Lok Sabha",
          redirect: " ",
          imageUrl:
            "https://mun-website-images.s3.ap-south-1.amazonaws.com/tba.jpg",
          // details:
          //   "The Lok Sabha is the lower house of the Parliament of India, responsible for making laws and overseeing the executive.",
        },
        {
          // name: "International Press",
          redirect: " ",
          imageUrl:
            "https://mun-website-images.s3.ap-south-1.amazonaws.com/tba.jpg",
          // details:
          //   "This committee focuses on the role of the press in promoting freedom of speech, democracy, and ethical journalism worldwide.",
        },
      ];
  return (
    <div id="committee">
      <div className="my-12">
        <div className="text-3xl font-bold mb-6">Committees</div>
      </div>
      <div className=" ">
        <motion.div
          key="senior-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {" "}
          {committees.map((committee, index) => (
            <Link href={committee.redirect} key={index}>
              <CommitteeCard key={index} committee={committee} />
            </Link>
          ))}
        </motion.div>

      </div>
    </div>
  );
}

export default CommitteeCards
